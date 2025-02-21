# filepath: /home/lca/social-network-inspiration/backend/api/urls.py
from django.urls import path

from .views import (
    UserRegistrationView,
    UserLoginView,
    PostListCreateView,
    FeedView,
    FollowUserView,
)

urlpatterns = [
    path('register/', UserRegistrationView.as_view(), name='register'),
    path('login/', UserLoginView.as_view(), name='login'),
    path('posts/', PostListCreateView.as_view(), name='posts'),
    path('feed/', FeedView.as_view(), name='feed'),
    path('users/<int:pk>/follow/', FollowUserView.as_view(), name='follow-user'),
]