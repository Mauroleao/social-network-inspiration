
from django.contrib.auth import authenticate
from .models import CustomUser, Post, Follow
from .serializer.serializers import UserRegistrationSerializer, PostSerializer
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken


class UserRegistrationView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserRegistrationSerializer


class UserLoginView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        user = authenticate(request, email=email, password=password)
        if user:
            token, _ = Token.objects.get_or_create(user=user)
            return Response({'token': token.key}, status=status.HTTP_200_OK)
        return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)    
# Create your views here.
# Novo endpoint para criar e listar posts (tweets)
class PostListCreateView(generics.ListCreateAPIView):
    queryset = Post.objects.all().order_by('-created_at')
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

# Novo endpoint para exibir o feed do usuário (posts dos usuários seguidos)
class FeedView(generics.ListAPIView):
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if not user.is_authenticated:
            return Post.objects.none()
        following_ids = Follow.objects.filter(follower=user).values_list('followed_id', flat=True)
        return Post.objects.filter(user__id__in=following_ids).order_by('-created_at')

# Novo endpoint para seguir/desseguir um usuário
class FollowUserView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        try:
            to_follow = CustomUser.objects.get(pk=pk)
        except CustomUser.DoesNotExist:
            return Response({'detail': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        
        if request.user == to_follow:
            return Response({'detail': 'You cannot follow yourself'}, status=status.HTTP_400_BAD_REQUEST)
        
        Follow.objects.get_or_create(follower=request.user, followed=to_follow)
        return Response({'detail': 'Now following user'}, status=status.HTTP_201_CREATED)

    def delete(self, request, pk):
        try:
            to_unfollow = CustomUser.objects.get(pk=pk)
        except CustomUser.DoesNotExist:
            return Response({'detail': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        
        follow = Follow.objects.filter(follower=request.user, followed=to_unfollow)
        if follow.exists():
            follow.delete()
            return Response({'detail': 'Unfollowed successfully'}, status=status.HTTP_200_OK)
        return Response({'detail': 'Not following user'}, status=status.HTTP_400_BAD_REQUEST)
