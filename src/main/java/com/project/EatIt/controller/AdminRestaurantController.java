package com.project.EatIt.controller;

import com.project.EatIt.model.Restaurant;
import com.project.EatIt.model.User;
import com.project.EatIt.request.CreateRestaurantRequest;
import com.project.EatIt.response.MessageResponse;
import com.project.EatIt.service.RestaurantService;
import com.project.EatIt.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/restaurants")
public class AdminRestaurantController {

    @Autowired
    private RestaurantService restaurantService;

    @Autowired
    private UserService userService;

    @PostMapping()
    public ResponseEntity<Restaurant> createRestaurant(
            @RequestBody CreateRestaurantRequest restaurantRequest,
            @RequestHeader("Authorization") String jwt
    ) throws Exception {

        User user = userService.findUserByJWT(jwt);
        Restaurant restaurant = restaurantService.createRestaurant(restaurantRequest, user);

        return new ResponseEntity<>(restaurant, HttpStatus.CREATED);
    }

    @PutMapping("/{restaurantId}")
    public ResponseEntity<Restaurant> updateRestaurant(
            @RequestBody CreateRestaurantRequest restaurantRequest,
            @RequestHeader("Authorization") String jwt,
            @PathVariable Long restaurantId
    ) throws Exception {

        User user = userService.findUserByJWT(jwt);
        Restaurant restaurant = restaurantService.updateRestaurants(restaurantId,restaurantRequest);

        return new ResponseEntity<>(restaurant, HttpStatus.CREATED);
    }

    @DeleteMapping("/{restaurantId}")
    public ResponseEntity<MessageResponse> deleteRestaurant(
            @RequestHeader("Authorization") String jwt,
            @PathVariable Long restaurantId
    ) throws Exception {

        User user = userService.findUserByJWT(jwt);
        restaurantService.deleteRestaurant(restaurantId);

        MessageResponse messageResponse = new MessageResponse();
        messageResponse.setMessage("Restaurant is deleted successfully!");
        return new ResponseEntity<>(messageResponse, HttpStatus.OK);
    }

    @PutMapping("/{restaurantId}/status")
    public ResponseEntity<Restaurant> updateRestaurantStatus(
            @RequestHeader("Authorization") String jwt,
            @PathVariable Long restaurantId
    ) throws Exception {

        User user = userService.findUserByJWT(jwt);
        Restaurant restaurant = restaurantService.updateRestaurantStatus(restaurantId);

        return new ResponseEntity<>(restaurant, HttpStatus.OK);
    }

    @GetMapping("/user")
    public ResponseEntity<Restaurant> findRestaurantByOwnerId(
            @RequestHeader("Authorization") String jwt
    ) throws Exception {

        User user = userService.findUserByJWT(jwt);
        Restaurant restaurant = restaurantService.getRestaurantByOwnerId(user.getId());

        return new ResponseEntity<>(restaurant, HttpStatus.OK);
    }
}
