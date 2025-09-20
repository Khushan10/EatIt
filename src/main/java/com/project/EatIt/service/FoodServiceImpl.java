package com.project.EatIt.service;

import com.project.EatIt.model.Category;
import com.project.EatIt.model.Food;
import com.project.EatIt.model.Restaurant;
import com.project.EatIt.repository.FoodRepository;
import com.project.EatIt.request.CreateFoodRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class FoodServiceImpl implements FoodService{

    @Autowired
    private FoodRepository foodRepository;

    @Override
    public Food createFood(CreateFoodRequest req, Category category, Restaurant restaurant) {
        Food food = new Food();
        food.setFoodCategory(category);
        food.setRestaurant(restaurant);
        food.setDescription(req.getDescription());
        food.setImages(req.getImages());
        food.setName(req.getName());
        food.setPrice(req.getPrice());
        food.setIngredients(req.getIngredients());
        food.setSeasonal(req.isSeasional());
        food.setVeg(req.isVeg());

        Food savedFood = foodRepository.save(food);
        restaurant.getFoods().add(savedFood);

        return savedFood;
    }

    @Override
    public void deleteFood(Long foodId) throws Exception {

    }

    @Override
    public List<Food> getRestaurantsFood(Long restaurantId, boolean isVeg, boolean isNonVeg, boolean isSeasonal, String foodCategory) {
        return List.of();
    }

    @Override
    public List<Food> searchFood(String keyword) {
        return List.of();
    }

    @Override
    public Food findFoodById(Long foodId) throws Exception {
        return null;
    }

    @Override
    public Food updateAvailability(Long foodId) throws Exception {
        return null;
    }
}
