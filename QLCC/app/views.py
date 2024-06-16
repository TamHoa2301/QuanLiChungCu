from django.db import transaction
from rest_framework import viewsets, generics, status, parsers, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from app.models import Apartment, Location, Storage, Item, Bill, User, Report, ApartmentCardRequest, ApartmentCard, Survey
from app import serializers, paginators, perms


class LocationViewset(viewsets.ViewSet, generics.ListAPIView):
    queryset = Location.objects.all()
    serializer_class = serializers.LocationSerializer


class ApartmentViewset(viewsets.ViewSet, generics.ListAPIView, generics.UpdateAPIView):
    queryset = Apartment.objects.all()
    serializer_class = serializers.ApartmentSerializer
    # pagination_class = paginators.ApartmentPaginator

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

    @action(methods=['post'], detail=True, url_path='move-in')
    def move_in(self, request, pk):
        apartment = self.get_object()

        # vi du: /apartments/{pk}/move-in/
        user_id = request.data.get('user_id')
        if not user_id:
            return Response({'error': 'User ID must be provided'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

        # Kiểm tra và cập nhật trường isFull của Apartment
        if apartment.isFull:
            return Response({'error': 'Apartment is already full'}, status=status.HTTP_400_BAD_REQUEST)

        # Chuyển user vào căn hộ
        user.apartment = apartment
        user.save()

        # Cập nhật trạng thái isFull của apartment
        apartment.isFull = True
        apartment.save()

        return Response({'message': f'User {user.username} moved into apartment {apartment.apartmentName}'},
                        status=status.HTTP_200_OK)

    @action(methods=['post'], detail=True, url_path='move-out')
    def move_out(self, request, pk):
        apartment = self.get_object()

        user_id = request.data.get('user_id')
        if not user_id:
            return Response({'error': 'User ID must be provided'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            with transaction.atomic():
                user = User.objects.select_for_update().get(
                    id=user_id)  # Sử dụng select_for_update để khóa dữ liệu trong transaction

                if user.apartment != apartment:
                    return Response({'error': 'User is not in this apartment'}, status=status.HTTP_400_BAD_REQUEST)

                user.apartment = None
                user.is_active = False  # Đặt is_active = False

                user.save()
                # Để đảm bảo rằng căn hộ chỉ được đánh dấu là không đầy khi
                # không có người dùng nào còn sống trong đó.
                if not apartment.user_set.filter(is_active=True).exists():
                    apartment.isFull = False
                    apartment.save()

        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

        return Response({'message': f'User {user.username} moved out and account is deactivated'},
                        status=status.HTTP_200_OK)


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


class BillViewset(viewsets.ViewSet, generics.RetrieveAPIView, generics.CreateAPIView, generics.UpdateAPIView):
    queryset = Bill.objects.filter(active=True)
    serializer_class = serializers.BillDetailsSerializer

    def get_permissions(self):
        if self.action in []:
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]

    @action(methods=['post'], url_path='pay-bill', detail=True)
    def pay_bill(self, request, pk=None):
        try:
            bill = self.get_object()
            if bill.is_paid:
                return Response({'message': 'Bill has already been paid'}, status=status.HTTP_400_BAD_REQUEST)

            bill.is_paid = True
            bill.save()

            return Response({'message': 'Bill paid successfully'}, status=status.HTTP_200_OK)

        except Bill.DoesNotExist:
            return Response({'error': 'Bill not found'}, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def list(self, request):
        queryset = self.queryset
        bill_type_id = request.query_params.get('billType_id')  # Lấy billType_id từ query params

        if bill_type_id:
            queryset = queryset.filter(billType_id=bill_type_id)

        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class UserViewset(viewsets.ViewSet, generics.CreateAPIView, generics.ListAPIView):
    queryset = User.objects.filter(is_active=True)
    serializer_class = serializers.UserSerializer
    parser_classes = [parsers.MultiPartParser, ]

    def get_permissions(self):
        if self.action in ['get_current_user', 'create_report']:
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

    @action(methods=['post'], url_path='card-request', detail=True)
    def request_card(self, request, pk):
        user = self.get_object()
        report = self.get_object().apartmentcardrequest_set.create(title=request.data.get('title'),
                                                     content=request.data.get('content'), user=user)
        return Response(serializers.CardRequestSerializer(report).data, status=status.HTTP_201_CREATED)

    @action(methods=['post'], url_path='card-create', detail=True)
    def create_card(self, request, pk):
        try:
            user = User.objects.get(pk=pk)  # Lấy user thông qua pk được truyền vào
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

        data = request.data.copy()
        data['user'] = user.id  # Gán user_id vào dữ liệu request

        serializer = serializers.CardSerializer(data=data)
        if serializer.is_valid():
            card = serializer.save()
            return Response(serializers.CardSerializer(card).data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['post'], url_path='toggle-active')
    def toggle_active(self, request, pk=None):
        user = self.get_object()
        user.is_active = not user.is_active  # Toggle active state
        user.save()

        return Response({'message': f'User {user.username} {"activated" if user.is_active else "deactivated"}'},
                        status=status.HTTP_200_OK)

    @action(methods=['get'], url_path='get-cards', detail=True)
    def get_cards(self, request, pk):
        user = self.get_object()

        cards = user.apartmentcard_set.filter(active=True).select_related('billType')

        return Response(serializers.CardSerializer(cards, many=True).data, status=status.HTTP_200_OK)

    @action(methods=['get'], url_path='get-bills', detail=True)
    def get_bills(self, request, pk):
        user = self.get_object()
        bill_type_id = request.query_params.get('billType_id')

        bills = user.bill_set.filter(active=True).select_related('billType')

        if bill_type_id:
            bills = bills.filter(billType_id=bill_type_id)

        return Response(serializers.BillSerializer(bills, many=True).data, status=status.HTTP_200_OK)

    @action(methods=['get'], url_path='get-bills-paid', detail=True)
    def get_bills_paid(self, request, pk):
        user = self.get_object()
        bill_type_id = request.query_params.get('billType_id')

        bills = user.bill_set.filter(active=True, is_paid=True).select_related('billType')

        if bill_type_id:
            bills = bills.filter(billType_id=bill_type_id)

        return Response(serializers.BillSerializer(bills, many=True).data, status=status.HTTP_200_OK)

    @action(methods=['get'], url_path='get-bills-not-paid', detail=True)
    def get_bills_not_paid(self, request, pk):
        user = self.get_object()
        bill_type_id = request.query_params.get('billType_id')

        bills = user.bill_set.filter(active=True, is_paid=False).select_related('billType')

        if bill_type_id:
            bills = bills.filter(billType_id=bill_type_id)

        return Response(serializers.BillSerializer(bills, many=True).data, status=status.HTTP_200_OK)

    @action(methods=['get'], url_path='get-reports', detail=True)
    def get_report(self, request, pk):
        receipts = self.get_object().report_set.filter(active=True)

        return Response(serializers.ReportSerializer(receipts, many=True).data, status=status.HTTP_200_OK)

    @action(methods=['post'], url_path='create-survey', detail=True)
    def create_survey(self, request, pk):
        user = self.get_object()
        survey = user.survey_set.create(title=request.data.get('name'),
                                                     content=request.data.get('link'))
        return Response(serializers.ReportSerializer(survey).data, status=status.HTTP_201_CREATED)

    @action(methods=['get'], url_path='storage', detail=True)
    def get_storage(self, request, pk):
        user = self.get_object()
        storage = Storage.objects.filter(user=user, active=True).first()  # Lấy storage của user

        if not storage:
            return Response({'message': 'Storage not found'}, status=status.HTTP_404_NOT_FOUND)

        items = storage.item_set.filter(isReceive=False)

        q = request.query_params.get('q')
        if q:
            items = items.filter(name__icontains=q)

        return Response(serializers.ItemSerializer(items, many=True).data, status=status.HTTP_200_OK)


class ReportViewset(viewsets.ViewSet, generics.ListAPIView, generics.UpdateAPIView, generics.RetrieveAPIView, generics.DestroyAPIView):
    queryset = Report.objects.filter(active=True)
    serializer_class = serializers.ReportSerializer
    parser_classes = [parsers.MultiPartParser, ]


class CardRequestViewset(viewsets.ViewSet, generics.ListAPIView, generics.RetrieveAPIView, generics.DestroyAPIView):
    queryset = ApartmentCardRequest.objects.filter(active=True)
    serializer_class = serializers.CardRequestSerializer


class CardViewset(viewsets.ViewSet, generics.ListAPIView, generics.CreateAPIView):
    queryset = ApartmentCard.objects.filter(active=True)
    serializer_class = serializers.CardSerializer


class SurveyViewset(viewsets.ViewSet, generics.ListAPIView, generics.CreateAPIView, generics.RetrieveAPIView, generics.DestroyAPIView):
    queryset = Survey.objects.filter(active=True)
    serializer_class = serializers.SurveySerializer
