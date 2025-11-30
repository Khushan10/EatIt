package com.project.EatIt.service;

import com.project.EatIt.model.Category;
import com.project.EatIt.model.Food;
import com.project.EatIt.model.Restaurant;
import com.project.EatIt.request.CreateFoodRequest;
import java.util.List;

public interface FoodService {

    public Food createFood(CreateFoodRequest req, Category category, Restaurant restaurant);
    public void deleteFood(Long foodId) throws Exception;
    public List<Food> getRestaurantsFood(Long restaurantId, boolean isVeg, boolean isNonVeg, boolean isSeasonal, String foodCategory);
    public List<Food> searchFood(String keyword);
    public Food findFoodById(Long foodId) throws Exception;
    public Food updateAvailability(Long foodId) throws Exception;

}
