package com.project.EatIt.controller;


import com.project.EatIt.model.Food;
import com.project.EatIt.model.Restaurant;
import com.project.EatIt.model.User;
import com.project.EatIt.request.CreateFoodRequest;
import com.project.EatIt.service.FoodService;
import com.project.EatIt.service.RestaurantService;
import com.project.EatIt.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/food")
public class FoodController {
    @Autowired
    private FoodService foodService;

    @Autowired
    private UserService userService;

    @Autowired
    private RestaurantService restaurantService;

    @GetMapping("/search")
    public ResponseEntity<List<Food>> searchFood(@RequestParam String name,
                                                 @RequestHeader("Authorization") String jwt) throws Exception {

        User user = userService.findUserByJWT(jwt);
        List<Food> foods = foodService.searchFood(name);

        return new ResponseEntity<>(foods, HttpStatus.OK);
    }

    @GetMapping("/restaurant/{restaurantId}")
    public ResponseEntity<List<Food>> getRestaurantFood(@PathVariable Long restaurantId,
                                                        @RequestParam boolean veg,
                                                        @RequestParam boolean seasonal,
                                                        @RequestParam boolean nonVeg,
                                                        @RequestParam(required = false) String foodCategory,
                                                        @RequestHeader("Authorization") String jwt) throws Exception {

        User user = userService.findUserByJWT(jwt);
        List<Food> foods = foodService.getRestaurantsFood(restaurantId, veg, nonVeg, seasonal, foodCategory);

        return new ResponseEntity<>(foods, HttpStatus.OK);
    }

}