package com.project.EatIt.service;

import com.project.EatIt.constants.OrderStatus;
import com.project.EatIt.model.Order;
import com.project.EatIt.model.User;
import com.project.EatIt.request.OrderRequest;

import java.util.List;

public interface OrderService {
    public Order createOrder(OrderRequest order, User user) throws Exception;
    public Order updateOrder(Long orderId, OrderStatus orderStatus) throws Exception;
    public void cancelOrder(Long orderId) throws Exception;
    public List<Order> getUserOrders(Long userId) throws Exception;
    public List<Order> getRestaurantOrders(Long restaurantId, OrderStatus orderStatus) throws Exception;
    public Order findOrderById(Long orderId) throws Exception;
}
