import { API_BASE } from "./config";

export async function getTags() {
    const token = localStorage.getItem("access"); 
    const res = await fetch(`${API_BASE}/tags/`, {
        headers: {
        "Authorization": `Bearer ${token}`,
        }
    });
    const data = await res.json().catch(() => ([]));
    if (!res.ok) throw new Error(data.detail || "gagal fetch tag");
    return data;
}

export async function createTag(nama) {
    const token = localStorage.getItem("access");
    const res = await fetch(`${API_BASE}/tags/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body:JSON.stringify({ nama }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.detail || "gagal membuat tag");
}

export async function upadateTag(id, nama) {
    const token = localStorage.getItem("access");
    const res = await fetch(`${API_BASE}/tags/${id}/`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body:JSON.stringify({ nama }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.detail || "gagal update tag");
}

export async function deleteTag(id) {
    const token = localStorage.getItem("access");
    const res = await fetch(`${API_BASE}/tags/${id}/`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.detail || "gagal delete tag");
}

// from django.db import models
// from django.contrib.auth.models import AbstractUser, Group, Permission
// from django.db.models.signals import post_save
// from django.dispatch import receiver
// from django.conf import settings

// # class CustomUser(AbstractUser):
// #     ROLE_CHOICES = (
// #         ('admin', 'Admin'),
// #         ('user', 'User'),
// #     )
// #     role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='user')
// #     bio = models.TextField(blank=True)

// # class Profile(models.Model):
// #     user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
// #     avatar = models.ImageField(upload_to='avatars/', null=True, blank=True)
// #     website = models.URLField(blank=True)
    
// #     def __str__(self):
// #         return self.user.username

// class CustomUser(AbstractUser):
//     ROLE_CHOICES = (
//         ('admin', 'Admin'),
//         ('user', 'User'),
//     )
//     role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='user')
//     bio = models.TextField(blank=True)
    
//     # Tambahkan related_name khusus untuk menghindari konflik
//     groups = models.ManyToManyField(
//         Group,
//         verbose_name='groups',
//         blank=True,
//         help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.',
//         related_name="customuser_set",
//         related_query_name="user",
//     )
//     user_permissions = models.ManyToManyField(
//         Permission,
//         verbose_name='user permissions',
//         blank=True,
//         help_text='Specific permissions for this user.',
//         related_name="customuser_set",
//         related_query_name="user",
//     )

// class Profile(models.Model):
//     user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
//     avatar = models.ImageField(upload_to='avatars/', null=True, blank=True)
//     website = models.URLField(blank=True)
    
//     def __str__(self):
//         return self.user.username
      
// # @receiver(post_save, sender=CustomUser)
// # def create_user_profile(sender, instance, created, **kwargs):
// #     if created:
// #         Profile.objects.create(user=instance)

// # class Profile(models.Model):
// #     user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
// #     # Ganti ImageField dengan URLField sementara jika tidak ingin install Pillow
// #     avatar = models.URLField(max_length=500, blank=True, null=True, verbose_name='Avatar URL')
// #     website = models.URLField(blank=True)
    
// #     def __str__(self):
// #         return self.user.username

// @receiver(post_save, sender=settings.AUTH_USER_MODEL)
// def create_user_profile(sender, instance, created, **kwargs):
//     if created:
//         Profile.objects.create(user=instance)

// class Kategori(models.Model):
//     nama = models.CharField(max_length=100)
    
//     def __str__(self):
//         return self.nama

// class Tag(models.Model):
//     nama = models.CharField(max_length=50)
    
//     def __str__(self):
//         return self.nama

// class Artikel(models.Model):
//     STATUS_CHOICES = (
//         ('draft', 'Draft'),
//         ('published', 'Published'),
//     )
//     judul = models.CharField(max_length=200)
//     konten = models.TextField()
//     penulis = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
//     kategori = models.ForeignKey(Kategori, on_delete=models.SET_NULL, null=True)
//     tags = models.ManyToManyField(Tag)
//     status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='draft')
//     dibuat_pada = models.DateTimeField(auto_now_add=True)
//     diperbarui_pada = models.DateTimeField(auto_now=True)
    
//     def __str__(self):
//         return self.judul
