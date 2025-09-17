package com.project.EatIt.controller;

import com.project.EatIt.dto.RestaurantDTO;
import com.project.EatIt.model.Restaurant;
import com.project.EatIt.model.User;
import com.project.EatIt.request.CreateRestaurantRequest;
import com.project.EatIt.service.RestaurantService;
import com.project.EatIt.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/restaurants")
public class RestaurantController {
    @Autowired
    private RestaurantService restaurantService;

    @Autowired
    private UserService userService;

    @GetMapping("/search")
    public ResponseEntity<List<Restaurant>> searchRestaurant(
            @RequestHeader("Authorization") String jwt,
            @RequestParam String keyword
    ) throws Exception {

        User user = userService.findUserByJWT(jwt);
        List<Restaurant> restaurant = restaurantService.searchRestaurant(keyword);

        return new ResponseEntity<>(restaurant, HttpStatus.OK);
    }

    @GetMapping()
    public ResponseEntity<List<Restaurant>> getAllRestaurant(
            @RequestHeader("Authorization") String jwt
    ) throws Exception {

        User user = userService.findUserByJWT(jwt);
        List<Restaurant> restaurant = restaurantService.getAllRestaurants();

        return new ResponseEntity<>(restaurant, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Restaurant> findRestaurantById(
            @RequestHeader("Authorization") String jwt,
            @PathVariable Long id
    ) throws Exception {

        User user = userService.findUserByJWT(jwt);
        Restaurant restaurant = restaurantService.findRestaurantById(id);

        return new ResponseEntity<>(restaurant, HttpStatus.OK);
    }

    @PutMapping("/{id}/add-favourites")
    public ResponseEntity<RestaurantDTO> addToFavourite(
            @RequestHeader("Authorization") String jwt,
            @PathVariable Long id
    ) throws Exception {

        User user = userService.findUserByJWT(jwt);
        RestaurantDTO restaurant = restaurantService.addToFavorites(id, user);
        
        return new ResponseEntity<>(restaurant, HttpStatus.OK);
    }
}
