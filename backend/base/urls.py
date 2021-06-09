from django.urls import path
from . import views


urlpatterns = [
    path('users/login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('users/register/', views.registerUser, name='register'),
    path('', views.getRoutes, name="routes"),
    path('products/', views.getProducts, name="products"),
    path('users/', views.getUsers, name="users"),
    path('orders/', views.getOrders, name='orders'),
    path('orders/add/', views.addOrderItems, name='orders-add'),
    path('orders/myorders/', views.getMyOrders, name='myorders'),

    path('orders/<int:pk>/', views.getOrderById, name='user-order'),
    path('orders/<int:pk>/pay', views.updateOrderToPaid, name='pay'),
    path('orders/<int:pk>/deliver/', views.updateOrderToDelivered, name='order-delivered'),



    path('users/profile/', views.getUserProfile, name="user-profile"),
    path('users/<int:pk>/', views.getUserById, name="user"),
    path('users/update/<int:pk>/', views.updateUser, name="user-update"),
    path('users/delete/<int:pk>/', views.deleteUser, name="user-delete"),
    path('users/profile/update/', views.updateUserProfile, name="user-profile-update"),

    path('products/create/', views.createProduct, name="product-create"),
    path('products/upload/', views.uploadImage, name="image-upload"),
    path('products/<int:pk>/review/', views.createProductReview, name="create-review"),
    path('products/<int:pk>/', views.getProduct, name="product"),
    path('products/update/<int:pk>/', views.updateProduct, name="product-update"),
    path('products/delete/<int:pk>/', views.deleteProduct, name="product-delete"),
]