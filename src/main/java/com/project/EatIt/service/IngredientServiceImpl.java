package com.project.EatIt.service;

import com.project.EatIt.model.IngredientsCategory;
import com.project.EatIt.model.IngredientsItem;
import com.project.EatIt.model.Restaurant;
import com.project.EatIt.repository.IngredientsCategoryRepository;
import com.project.EatIt.repository.IngredientsItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class IngredientServiceImpl implements IngredientService{

    @Autowired
    private IngredientsItemRepository ingredientsItemRepository;

    @Autowired
    private IngredientsCategoryRepository ingredientsCategoryRepository;

    @Autowired
    private RestaurantService restaurantService;

    @Override
    public IngredientsCategory createIngredientCategory(String name, Long restaurantId) throws Exception {
        Restaurant restaurant = restaurantService.findRestaurantById(restaurantId);

        IngredientsCategory ingredientsCategory = new IngredientsCategory();
        ingredientsCategory.setRestaurant(restaurant);
        ingredientsCategory.setName(name);

        return ingredientsCategoryRepository.save(ingredientsCategory);
    }

    @Override
    public IngredientsCategory findIngredientCategoryById(Long id) throws Exception {
        Optional<IngredientsCategory> optionalIngredientsCategory = ingredientsCategoryRepository.findById(id);
        if(optionalIngredientsCategory.isEmpty()) throw new Exception("Ingredient Category Not Found!");

        return optionalIngredientsCategory.get();
    }

    @Override
    public List<IngredientsCategory> findIngredientCategoryByRestaurantId(Long restaurantId) throws Exception {
        restaurantService.findRestaurantById(restaurantId);
        return ingredientsCategoryRepository.findByRestaurantId(restaurantId);
    }

    @Override
    public IngredientsItem createIngredientItem(Long restaurantId, String ingredientName, Long categoryId) throws Exception {
        Restaurant restaurant = restaurantService.findRestaurantById(restaurantId);
        IngredientsCategory ingredientsCategory = findIngredientCategoryById(categoryId);

        IngredientsItem ingredientsItem = new IngredientsItem();
        ingredientsItem.setName(ingredientName);
        ingredientsItem.setRestaurant(restaurant);
        ingredientsItem.setCategory(ingredientsCategory);

        IngredientsItem item = ingredientsItemRepository.save(ingredientsItem);
        ingredientsCategory.getIngredients().add(item);

        return item;
    }

    @Override
    public List<IngredientsItem> findRestaurantIngredients(Long restaurantId) throws Exception {
        restaurantService.findRestaurantById(restaurantId);
        return ingredientsItemRepository.findByRestaurantId(restaurantId);
    }

    @Override
    public IngredientsItem updateStock(Long id) throws Exception {
        Optional<IngredientsItem> optionalIngredientsItem = ingredientsItemRepository.findById(id);
        if(optionalIngredientsItem.isEmpty()){
            throw new Exception("Ingredient not found!");
        }
        IngredientsItem ingredientsItem = optionalIngredientsItem.get();
        ingredientsItem.setInStock(!ingredientsItem.isInStock());

        return ingredientsItemRepository.save(ingredientsItem);
    }
}
