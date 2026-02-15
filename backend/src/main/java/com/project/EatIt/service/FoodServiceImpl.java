package com.project.EatIt.service;

import com.project.EatIt.model.Category;
import com.project.EatIt.model.Food;
import com.project.EatIt.model.Restaurant;
import com.project.EatIt.repository.FoodRepository;
import com.project.EatIt.request.CreateFoodRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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

        Food food = findFoodById(foodId);
        food.setRestaurant(null);
        foodRepository.save(food);

    }

    @Override
    public List<Food> getRestaurantsFood(Long restaurantId, boolean isVeg, boolean isNonVeg, boolean isSeasonal, String foodCategory) {

        List<Food> foods = foodRepository.findByRestaurantId(restaurantId);

        if(isVeg) foods = filterByVeg(foods);
        if(isNonVeg) foods = filterByNonVeg(foods);
        if(isSeasonal) foods = filterBySeason(foods);
        if(foodCategory != null && !foodCategory.isEmpty()) foods = filterByCategory(foods, foodCategory);

        return foods;
    }

    private List<Food> filterByCategory(List<Food> foods, String foodCategory) {
        return foods.stream().filter(food -> {
            if(food.getFoodCategory() != null) return food.getFoodCategory().getName().equals(foodCategory);
            return false;
        }).collect(Collectors.toList());
    }

    private List<Food> filterBySeason(List<Food> foods) {
        return foods.stream().filter(food -> food.isSeasonal()).collect(Collectors.toList());
    }

    private List<Food> filterByNonVeg(List<Food> foods) {
        return foods.stream().filter(food -> !food.isVeg()).collect(Collectors.toList());
    }

    private List<Food> filterByVeg(List<Food> foods) {
        return foods.stream().filter(food -> food.isVeg()).collect(Collectors.toList());
    }

    @Override
    public List<Food> searchFood(String keyword) {
        return foodRepository.searchFood(keyword);
    }

    @Override
    public Food findFoodById(Long foodId) throws Exception {

        Optional<Food> optionalFood = foodRepository.findById(foodId);
        if(optionalFood.isEmpty()) throw new Exception("Food with ID does not exist...");

        return optionalFood.get();
    }

    @Override
    public Food updateAvailability(Long foodId) throws Exception {
        Food food = findFoodById(foodId);
        food.setAvailable(!food.isAvailable());
        return foodRepository.save(food);
    }
}
