export const API_BASE = "http://127.0.0.1:8000/api";

export function getAuthHeader() {
    const token = localStorage.getItem("access");
    return token ? { "Authorization" : `Bearer ${token}` } : {};
}

export async function refreshToken() {
    const refresh = localStorage.getItem("refresh");
    if (!refresh) return null;

    try {
        const res = await fetch(`${API_BASE}/token/refresh/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json" 
            },
            body:JSON.stringify({ refresh }),
        });
        if (!res.ok) throw new Error("gagal refresh token");
        const data = await res.json();
        if (data.access) {
            localStorage.setItem("access", data.access);
            return data.access;
        }
        return null;
    } catch (err) {
        console.error("refresh token error", err);
        return null;
    }
}

// from rest_framework import serializers
// from .models import CustomUser, Profile, Kategori, Tag, Artikel
// from django.contrib.auth.password_validation import validate_password
// from rest_framework.validators import UniqueValidator

// class UserSerializer(serializers.ModelSerializer):
//     class Meta:
//         model = CustomUser
//         fields = ('id', 'username', 'email', 'role', 'first_name', 'last_name')

// class RegisterSerializer(serializers.ModelSerializer):
//     email = serializers.EmailField(
//         required=True,
//         validators=[UniqueValidator(queryset=CustomUser.objects.all())]
//     )
//     password = serializers.CharField(
//         write_only=True, required=True, validators=[validate_password]
//     )
//     password2 = serializers.CharField(write_only=True, required=True)

//     class Meta:
//         model = CustomUser
//         fields = ('username', 'email', 'password', 'password2', 'role')
//         extra_kwargs = {
//             'role': {'required': False, 'default': 'user'}
//         }

//     def validate(self, attrs):
//         if attrs['password'] != attrs['password2']:
//             raise serializers.ValidationError(
//                 {"password": "Password fields didn't match."}
//             )
//         return attrs

//     def create(self, validated_data):
//         user = CustomUser.objects.create(
//             username=validated_data['username'],
//             email=validated_data['email'],
//             role=validated_data.get('role', 'user')
//         )
//         user.set_password(validated_data['password'])
//         user.save()
//         return user

// class ProfileSerializer(serializers.ModelSerializer):
//     user = UserSerializer(read_only=True)
    
//     class Meta:
//         model = Profile
//         fields = '__all__'

// class KategoriSerializer(serializers.ModelSerializer):
//     class Meta:
//         model = Kategori
//         fields = '__all__'

// class TagSerializer(serializers.ModelSerializer):
//     class Meta:
//         model = Tag
//         fields = '__all__'

// class ArtikelSerializer(serializers.ModelSerializer):
//     penulis = UserSerializer(read_only=True)
//     kategori = KategoriSerializer(read_only=True)
//     tags = TagSerializer(many=True, read_only=True)
//     penulis_id = serializers.PrimaryKeyRelatedField(
//         queryset=CustomUser.objects.all(), 
//         source='penulis',
//         write_only=True,
//     )
//     kategori_id = serializers.PrimaryKeyRelatedField(
//         queryset=Kategori.objects.all(), 
//         source='kategori',
//         write_only=True
//     )
//     tag_ids = serializers.PrimaryKeyRelatedField(
//         queryset=Tag.objects.all(), 
//         source='tags',
//         many=True,
//         write_only=True
//     )
    
//     class Meta:
//         model = Artikel
//         fields = '__all__'
//         read_only_fields = ('dibuat_pada', 'diperbarui_pada')