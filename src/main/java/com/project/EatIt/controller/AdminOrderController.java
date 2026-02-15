package com.project.EatIt.controller;

import com.project.EatIt.constants.OrderStatus;
import com.project.EatIt.model.Order;
import com.project.EatIt.model.User;
import com.project.EatIt.request.OrderRequest;
import com.project.EatIt.service.OrderService;
import com.project.EatIt.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminOrderController {
    @Autowired
    private UserService userService;
    @Autowired
    private OrderService orderService;


    @GetMapping("/order/restaurant/{restaurantId}")
    public ResponseEntity<List<Order>> getOrderHistory(@PathVariable Long restaurantId,
                                                       @RequestParam(required = false) OrderStatus orderStatus) throws Exception {

        List<Order> orders = orderService.getRestaurantOrders(restaurantId, orderStatus);
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    @PutMapping("/order/{orderId}/{orderStatus}")
    public ResponseEntity<Order> updateOrderStatus(@PathVariable Long orderId,
                                                   @PathVariable OrderStatus orderStatus) throws Exception {

        Order order = orderService.updateOrder(orderId, orderStatus);
        return new ResponseEntity<>(order, HttpStatus.OK);
    }
}
