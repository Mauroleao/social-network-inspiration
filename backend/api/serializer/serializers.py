from rest_framework import serializers
from ..models import CustomUser, Post, Follow

class UserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password')
        # Cria uma instância sem salvar ainda
        user = CustomUser(**validated_data)
        # Usa set_password para hashear a senha
        user.set_password(password)
        user.save()
        return user

class PostSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Post
        fields = ('id', 'user', 'text', 'created_at')

class FollowSerializer(serializers.ModelSerializer):
    class Meta:
        model = Follow
        fields = ('id', 'follower', 'followed', 'created_at')    