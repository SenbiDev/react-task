const API_BASE = "http://localhost:8000/api"; // alamat backend Django kamu

export const loginUser = async (credentials) => {
  const response = await fetch(`${API_BASE}/login/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error("Login gagal");
  }

  return await response.json();
};

export const registerUser = async (newUser) => {
  const response = await fetch(`${API_BASE}/register/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser),
  });

  if (!response.ok) {
    throw new Error("Register gagal");
  }

  return await response.json();
};

export async function logout() {
  localStorage.removeItem("token");
  return true;
}

// from rest_framework.decorators import api_view, permission_classes
// from rest_framework.response import Response
// from rest_framework import status
// from rest_framework.permissions import IsAuthenticated, AllowAny
// from rest_framework_simplejwt.tokens import RefreshToken
// from .models import CustomUser, Profile, Kategori, Tag, Artikel
// from .serializers import (
//     UserSerializer,
//     RegisterSerializer,
//     ProfileSerializer,
//     KategoriSerializer,
//     TagSerializer,
//     ArtikelSerializer
// )
// from .permissions import is_admin_user, is_owner_or_admin, is_owner_or_read_only
// from django.shortcuts import get_object_or_404
// from django.db.models import Q
// from django.core.paginator import Paginator
// from django.contrib.auth import authenticate

// @api_view(['POST'])
// @permission_classes([AllowAny])
// def login_view(request):
//     username = request.data.get('username')
//     password = request.data.get('password')
    
//     user = authenticate(username=username, password=password)
//     if user:
//         refresh = RefreshToken.for_user(user)
//         return Response({
//             'refresh': str(refresh),
//             'access': str(refresh.access_token),
//             'user': {
//                 'id': user.id,
//                 'username': user.username,
//                 'email': user.email,
//                 'role': user.role
//             }
//         })
//     return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

// @api_view(['POST'])
// @permission_classes([AllowAny])
// def register_view(request):
//     serializer = RegisterSerializer(data=request.data)
//     if serializer.is_valid():
//         user = serializer.save()
//         refresh = RefreshToken.for_user(user)
//         return Response({
//             'user': RegisterSerializer(user).data,
//             'refresh': str(refresh),
//             'access': str(refresh.access_token),
//         }, status=status.HTTP_201_CREATED)
//     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

// # User views
// @api_view(['GET'])
// @permission_classes([IsAuthenticated])
// def user_list(request):
//     if not is_admin_user(request):
//         return Response({'error': 'You do not have permission'}, status=status.HTTP_403_FORBIDDEN)
    
//     users = CustomUser.objects.all()
//     serializer = UserSerializer(users, many=True)
//     return Response(serializer.data)

// @api_view(['GET', 'PUT', 'DELETE'])
// @permission_classes([IsAuthenticated])
// def user_detail(request, pk):
//     user = get_object_or_404(CustomUser, pk=pk)
    
//     # Admin can access all, users can only access themselves
//     if not (request.user == user or is_admin_user(request)):
//         return Response({'error': 'You do not have permission'}, status=status.HTTP_403_FORBIDDEN)
    
//     if request.method == 'GET':
//         serializer = UserSerializer(user)
//         return Response(serializer.data)
    
//     elif request.method == 'PUT':
//         # Only admin can change role
//         if 'role' in request.data and not is_admin_user(request):
//             return Response({'error': 'Only admin can change roles'}, status=status.HTTP_403_FORBIDDEN)
            
//         serializer = UserSerializer(user, data=request.data, partial=True)
//         if serializer.is_valid():
//             serializer.save()
//             return Response(serializer.data)
//         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
//     elif request.method == 'DELETE':
//         # Prevent self-deletion
//         if request.user == user:
//             return Response({'error': 'You cannot delete yourself'}, status=status.HTTP_403_FORBIDDEN)
//         user.delete()
//         return Response(status=status.HTTP_204_NO_CONTENT)

// # Profile views
// @api_view(['GET'])
// @permission_classes([IsAuthenticated])
// def profile_list(request):
//     if is_admin_user(request):
//         profiles = Profile.objects.all()
//     else:
//         profiles = Profile.objects.filter(user=request.user)
    
//     serializer = ProfileSerializer(profiles, many=True)
//     return Response(serializer.data)

// @api_view(['GET', 'PUT'])
// @permission_classes([IsAuthenticated])
// def profile_detail(request, pk):
//     profile = get_object_or_404(Profile, pk=pk)
    
//     # Check permission
//     if not is_owner_or_admin(request, profile):
//         return Response({'error': 'You do not have permission'}, status=status.HTTP_403_FORBIDDEN)
    
//     if request.method == 'GET':
//         serializer = ProfileSerializer(profile)
//         return Response(serializer.data)
    
//     elif request.method == 'PUT':
//         serializer = ProfileSerializer(profile, data=request.data, partial=True)
//         if serializer.is_valid():
//             serializer.save()
//             return Response(serializer.data)
//         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

// # Kategori views
// @api_view(['GET', 'POST'])
// @permission_classes([IsAuthenticated])
// def kategori_list(request):
//     # Only admin can create
//     if request.method == 'POST' and not is_admin_user(request):
//         return Response({'error': 'Only admin can create categories'}, status=status.HTTP_403_FORBIDDEN)
    
//     if request.method == 'GET':
//         kategoris = Kategori.objects.all()
//         serializer = KategoriSerializer(kategoris, many=True)
//         return Response(serializer.data)
    
//     elif request.method == 'POST':
//         serializer = KategoriSerializer(data=request.data)
//         if serializer.is_valid():
//             serializer.save()
//             return Response(serializer.data, status=status.HTTP_201_CREATED)
//         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

// @api_view(['GET', 'PUT', 'DELETE'])
// @permission_classes([IsAuthenticated])
// def kategori_detail(request, pk):
//     kategori = get_object_or_404(Kategori, pk=pk)
    
//     # Only admin can modify
//     if request.method in ['PUT', 'DELETE'] and not is_admin_user(request):
//         return Response({'error': 'Only admin can modify categories'}, status=status.HTTP_403_FORBIDDEN)
    
//     if request.method == 'GET':
//         serializer = KategoriSerializer(kategori)
//         return Response(serializer.data)
    
//     elif request.method == 'PUT':
//         serializer = KategoriSerializer(kategori, data=request.data)
//         if serializer.is_valid():
//             serializer.save()
//             return Response(serializer.data)
//         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
//     elif request.method == 'DELETE':
//         kategori.delete()
//         return Response(status=status.HTTP_204_NO_CONTENT)

// # Tag views
// @api_view(['GET', 'POST'])
// @permission_classes([IsAuthenticated])
// def tag_list(request):
//     # Only admin can create
//     if request.method == 'POST' and not is_admin_user(request):
//         return Response({'error': 'Only admin can create tags'}, status=status.HTTP_403_FORBIDDEN)
    
//     if request.method == 'GET':
//         tags = Tag.objects.all()
//         serializer = TagSerializer(tags, many=True)
//         return Response(serializer.data)
    
//     elif request.method == 'POST':
//         serializer = TagSerializer(data=request.data)
//         if serializer.is_valid():
//             serializer.save()
//             return Response(serializer.data, status=status.HTTP_201_CREATED)
//         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

// @api_view(['GET', 'PUT', 'DELETE'])
// @permission_classes([IsAuthenticated])
// def tag_detail(request, pk):
//     tag = get_object_or_404(Tag, pk=pk)
    
//     # Only admin can modify
//     if request.method in ['PUT', 'DELETE'] and not is_admin_user(request):
//         return Response({'error': 'Only admin can modify tags'}, status=status.HTTP_403_FORBIDDEN)
    
//     if request.method == 'GET':
//         serializer = TagSerializer(tag)
//         return Response(serializer.data)
    
//     elif request.method == 'PUT':
//         serializer = TagSerializer(tag, data=request.data)
//         if serializer.is_valid():
//             serializer.save()
//             return Response(serializer.data)
//         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
//     elif request.method == 'DELETE':
//         tag.delete()
//         return Response(status=status.HTTP_204_NO_CONTENT)

// # Artikel views
// @api_view(['GET', 'POST'])
// @permission_classes([IsAuthenticated])
// def artikel_list(request):
//     if request.method == 'GET':
//         user = request.user
//         queryset = Artikel.objects.all()
        
//         # Apply filters
//         status_param = request.query_params.get('status')
//         kategori_id = request.query_params.get('kategori')
//         tag_id = request.query_params.get('tag')
//         penulis_id = request.query_params.get('penulis')
        
//         if status_param:
//             queryset = queryset.filter(status=status_param)
//         if kategori_id:
//             queryset = queryset.filter(kategori__id=kategori_id)
//         if tag_id:
//             queryset = queryset.filter(tags__id=tag_id)
//         if penulis_id:
//             queryset = queryset.filter(penulis__id=penulis_id)
        
//         # Non-admin users can only see their own articles or published ones
//         if user.role != 'admin':
//             queryset = queryset.filter(
//                 Q(penulis=user) | 
//                 Q(status='published')
//             ).distinct()
        
//         # Pagination
//         page_number = request.query_params.get('page', 1)
//         paginator = Paginator(queryset, 10)
//         page_obj = paginator.get_page(page_number)
        
//         serializer = ArtikelSerializer(page_obj, many=True)
//         return Response({
//             'count': paginator.count,
//             'pages': paginator.num_pages,
//             'current_page': page_obj.number,
//             'results': serializer.data
//         })
    
//     elif request.method == 'POST':
//         data = request.data.copy()
//         data['penulis_id'] = request.user.id  # Set current user as author
        
//         serializer = ArtikelSerializer(data=data)
//         if serializer.is_valid():
//             serializer.save()
//             return Response(serializer.data, status=status.HTTP_201_CREATED)
//         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

// @api_view(['GET', 'PUT', 'DELETE'])
// @permission_classes([IsAuthenticated])
// def artikel_detail(request, pk):
//     artikel = get_object_or_404(Artikel, pk=pk)
    
//     # Check permission
//     if not is_owner_or_read_only(request, artikel):
//         return Response({'error': 'You do not have permission'}, status=status.HTTP_403_FORBIDDEN)
    
//     if request.method == 'GET':
//         serializer = ArtikelSerializer(artikel)
//         return Response(serializer.data)
    
//     elif request.method == 'PUT':
//         # Only owner or admin can update
//         if artikel.penulis != request.user and not is_admin_user(request):
//             return Response({'error': 'You can only edit your own articles'}, status=status.HTTP_403_FORBIDDEN)
        
//         serializer = ArtikelSerializer(artikel, data=request.data, partial=True)
//         if serializer.is_valid():
//             serializer.save()
//             return Response(serializer.data)
//         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
//     elif request.method == 'DELETE':
//         # Only owner or admin can delete
//         if artikel.penulis != request.user and not is_admin_user(request):
//             return Response({'error': 'You can only delete your own articles'}, status=status.HTTP_403_FORBIDDEN)
        
//         artikel.delete()
//         return Response(status=status.HTTP_204_NO_CONTENT)

// # Public Artikel views
// @api_view(['GET'])
// @permission_classes([AllowAny])
// def artikel_public_list(request):
//     queryset = Artikel.objects.filter(status='published')
    
//     # Apply filters
//     kategori_id = request.query_params.get('kategori')
//     tag_id = request.query_params.get('tag')
    
//     if kategori_id:
//         queryset = queryset.filter(kategori__id=kategori_id)
//     if tag_id:
//         queryset = queryset.filter(tags__id=tag_id)
    
//     # Pagination
//     page_number = request.query_params.get('page', 1)
//     paginator = Paginator(queryset, 10)
//     page_obj = paginator.get_page(page_number)
    
//     serializer = ArtikelSerializer(page_obj, many=True)
//     return Response({
//         'count': paginator.count,
//         'pages': paginator.num_pages,
//         'current_page': page_obj.number,
//         'results': serializer.data
//     })

// @api_view(['GET'])
// @permission_classes([AllowAny])
// def artikel_public_detail(request, pk):
//     artikel = get_object_or_404(Artikel, pk=pk, status='published')
//     serializer = ArtikelSerializer(artikel)
//     return Response(serializer.data)