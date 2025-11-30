package com.project.EatIt.controller;


import com.project.EatIt.model.Food;
import com.project.EatIt.model.Restaurant;
import com.project.EatIt.model.User;
import com.project.EatIt.request.CreateFoodRequest;
import com.project.EatIt.response.MessageResponse;
import com.project.EatIt.service.FoodService;
import com.project.EatIt.service.RestaurantService;
import com.project.EatIt.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/food")
public class AdminFoodController {

    @Autowired
    private FoodService foodService;

    @Autowired
    private UserService userService;

    @Autowired
    private RestaurantService restaurantService;

    @PostMapping
    public ResponseEntity<Food> createFood(@RequestBody CreateFoodRequest request,
                                           @RequestHeader("Authorization") String jwt) throws Exception {

        User user = userService.findUserByJWT(jwt);
        Restaurant restaurant = restaurantService.findRestaurantById(request.getRestaurantId());
        Food food = foodService.createFood(request, request.getCategory(), restaurant);

        return new ResponseEntity<>(food, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<MessageResponse> deleteFood(@PathVariable Long ID,
                                                      @RequestHeader("Authorization") String jwt) throws Exception {

        foodService.deleteFood(ID);
        MessageResponse response = new MessageResponse();
        response.setMessage("Food deleted successfully");


        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Food> updateFoodAvailability(@PathVariable Long ID,
                                                       @RequestHeader("Authorization") String jwt) throws Exception {

        User user = userService.findUserByJWT(jwt);
        Food food = foodService.updateAvailability(ID);

        return new ResponseEntity<>(food, HttpStatus.OK);
    }

}
