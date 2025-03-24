#### python
# filepath: /home/lca/social-network-inspiration/backend/api/models.py
from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    following = models.ManyToManyField(
        'self',
        through='Follow',
        symmetrical=False,
        # "followers" será o reverse lookup para quem segue esse usuário.
        related_name='followers'
    )

    def __str__(self):
        return self.username

class Follow(models.Model):
    follower = models.ForeignKey(
        CustomUser,
        on_delete=models.CASCADE,
        # Relação para acessar as ações de seguir (use um nome que não conflite)
        related_name='following_relation'
    )
    followed = models.ForeignKey(
        CustomUser,
        on_delete=models.CASCADE,
        # Usando '+' desabilita o reverse lookup para esse campo, evitando conflito com "followers"
        related_name='+'
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('follower', 'followed')

    def __str__(self):
        return f'{self.follower.username} -> {self.followed.username}'

class Post(models.Model):
    user = models.ForeignKey(
        CustomUser,
        on_delete=models.CASCADE,
        related_name='posts'
    )
    text = models.TextField(max_length=280)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.user.username}: {self.text[:50]}'