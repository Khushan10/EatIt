package com.project.EatIt.service;

import com.project.EatIt.dto.RestaurantDTO;
import com.project.EatIt.model.Restaurant;
import com.project.EatIt.model.User;
import com.project.EatIt.request.CreateRestaurantRequest;

import java.util.List;

public interface RestaurantService {
    public Restaurant createRestaurant(CreateRestaurantRequest req, User user);

    public Restaurant updateRestaurants(Long restaurantId, CreateRestaurantRequest updatedRestaurant) throws Exception;

    public void deleteRestaurant(Long restaurantId) throws Exception;

    public List<Restaurant> getAllRestaurants();

    public List<Restaurant> searchRestaurant(String keyword);

    public Restaurant findRestaurantById(Long id) throws Exception;

    public Restaurant getRestaurantByOwnerId(Long ownerId) throws Exception;

    public RestaurantDTO addToFavorites(Long restaurantId, User user) throws Exception;

    public Restaurant updateRestaurantStatus(Long restaurantId) throws Exception;
}
