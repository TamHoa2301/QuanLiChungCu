from app.models import Apartment, ApartmentCard, User, Location, Report, Storage, Item, Bill
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken


class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = '__all__'


class ApartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Apartment
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    def to_representation(self, instance):
        rep = super().to_representation(instance)
        avatar = instance.avatar
        if avatar:
            rep['avatar'] = avatar.url
        else:
            rep['avatar'] = None

        return rep

    def create(self, validated_data):
        data = validated_data.copy()
        user = User(**data)
        user.set_password(user.password)
        user.save()

        return user

    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'username', 'password', 'email', 'avatar']
        extra_kwargs = {
            'password': {
                'write_only': 'true'
            }
        }


class ReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Report
        fields = ['title', 'content', 'user', 'created_date']


class StorageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Storage
        fields = ['id', 'user', 'isEmpty']


class ItemSerializer(serializers.ModelSerializer):
    # def to_representation(self, instance):
    #     req = super().to_representation(instance)
    #     req['image'] = instance.image.url
    #     return req

    class Meta:
        model = Item
        fields = ['id', 'name', 'image', 'isReceive']


class BillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bill
        fields = ['id', 'billType', 'user', 'total']


class BillDetailsSerializer(BillSerializer):
    class Meta:
        model = BillSerializer.Meta.model
        fields = BillSerializer.Meta.fields + ['payment_type', 'payment_date', 'description']


class LoginSerializers(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        username = data.get('username')
        password = data.get('password')

        if username is None or password is None:
            raise serializers.ValidationError(
                'username and password is required!'
            )

        user = User.objects.filter(username=username).first()

        if user is None or not user.check_password(password):
            raise serializers.ValidationError(
                'Incorrect username or password!'
            )

        token = RefreshToken.for_user(user)

        return {
            'success': True,
            'refresh': str(token),
            'access': str(token.access_token),
            'user': UserSerializer(user).data
        }
