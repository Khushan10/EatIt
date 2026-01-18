package com.project.EatIt.service;

import com.project.EatIt.model.IngredientsCategory;
import com.project.EatIt.model.IngredientsItem;

import java.util.List;

public interface IngredientService {
    public IngredientsCategory createIngredientCategory(String name, Long restaurantId) throws Exception;
    public IngredientsCategory findIngredientCategoryById(Long id) throws Exception;
    public List<IngredientsCategory> findIngredientCategoryByRestaurantId(Long restaurantId) throws Exception;
    public IngredientsItem createIngredientItem(Long restaurantId, String ingredientName, Long categoryId) throws Exception;
    public List<IngredientsItem> findRestaurantIngredients(Long restaurantId) throws Exception;
    public IngredientsItem updateStock(Long id) throws Exception;

}
