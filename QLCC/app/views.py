from rest_framework import viewsets, generics, status, parsers, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from app.models import Apartment, Location, Storage, Item, Bill, User, Report
from app import serializers, paginators, perms


class LocationViewset(viewsets.ViewSet, generics.ListAPIView):
    queryset = Location.objects.all()
    serializer_class = serializers.LocationSerializer


class ApartmentViewset(viewsets.ViewSet, generics.ListAPIView):
    queryset = Apartment.objects.all()
    serializer_class = serializers.ApartmentSerializer
    pagination_class = paginators.ApartmentPaginator

    def get_queryset(self):
        query_set = self.queryset

        if self.action == 'list':
            q = self.request.query_params.get('q')
            if q:
                query_set = query_set.filter(apartmentName__icontains=q)

            loc_id = self.request.query_params.get('location_id')
            if loc_id:
                query_set = query_set.filter(location_id=loc_id)

        return query_set


class StorageViewset(viewsets.ViewSet, generics.ListAPIView):
    query_set = Storage.objects.filter(active=True)
    serializer_class = serializers.StorageSerializer

    def get_permissions(self):
        if self.action in ['add-item']:
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]

    def get_queryset(self):
        query_set = self.query_set

        user_id = self.request.query_params.get('user')
        if user_id:
            query_set = query_set.filter(user=user_id)

        return query_set

    @action(methods=['get'], url_path='items', detail=True)
    def get_items(self, request, pk):
        items = self.get_object().item_set.filter(isReceive=False)

        q = request.query_params.get('q')
        if q:
            items = items.filter(name__icontains=q)

        return Response(serializers.ItemSerializer(items, many=True).data, status=status.HTTP_200_OK)

    @action(methods=['post'], url_path='add-item', detail=True)
    def add_items(self, request, pk):
        storage = self.get_object()
        item = self.get_object().item_set.create(name=request.data.get('name'), image=request.data.get('image'))

        if storage.isEmpty:
            storage.isEmpty = False
            storage.save()

        return Response(serializers.ItemSerializer(item).data, status=status.HTTP_201_CREATED)


class ItemViewset(viewsets.ViewSet, generics.ListAPIView):
    queryset = Item.objects.filter(active=True)
    serializer_class = serializers.ItemSerializer

    def get_permissions(self):
        if self.action in ['change_state']:
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]

    @action(methods=['post'], detail=True)
    def change_state(self, request, pk=None):
        try:
            item = self.get_object()
            item.isReceive = True
            item.save()

            storage = item.storage
            storage.isEmpty = not storage.item_set.filter(isReceive=False).exists()
            storage.save()

            return Response({"message": "State of item changed successfully."}, status=status.HTTP_200_OK)
        except Item.DoesNotExist:
            return Response({"error": "Item not found."}, status=status.HTTP_404_NOT_FOUND)


class BillViewset(viewsets.ViewSet, generics.ListAPIView):
    queryset = Bill.objects.filter(active=True)
    serializer_class = serializers.BillDetailsSerializer


class UserViewset(viewsets.ViewSet, generics.CreateAPIView):
    queryset = User.objects.filter(is_active=True)
    serializer_class = serializers.UserSerializer
    parser_classes = [parsers.MultiPartParser, ]

    def get_permissions(self):
        if self.action in ['get_current_user']:
            return [permissions.IsAuthenticated()]

        return [permissions.AllowAny()]

    @action(methods=['get', 'patch'], url_path='current-user', detail=False)
    def get_current_user(self, request):
        user = request.user
        if request.method.__eq__('PATCH'):
            for k, v in request.data.items():
                setattr(user, k, v)
            user.save()

        return Response(serializers.UserSerializer(request.user).data)

    # @action(methods=['post'], url_path='login', detail=False)
    # def login(self, request):
    #     serializer = serializers.LoginSerializer(data=request.data)
    #     serializer.is_valid(raise_exception=True)
    #     return Response(serializer.validated_data, status=status.HTTP_200_OK)

    @action(methods=['post'], url_path='create-report', detail=True)
    def create_report(self, request, pk):
        user = self.get_object()
        report = self.get_object().report_set.create(title=request.data.get('title'),
                                                     content=request.data.get('content'), user=user)
        return Response(serializers.ReportSerializer(report).data, status=status.HTTP_201_CREATED)


class ReportViewset(viewsets.ViewSet, generics.ListAPIView, generics.UpdateAPIView):
    queryset = Report.objects.filter(active=True)
    serializer_class = serializers.ReportSerializer
    parser_classes = [parsers.MultiPartParser, ]
    # permission_classes = [perms.ReportOwner,] (generics.DestroyAPIView) chua can thiet

