package com.project.EatIt.controller;

import com.project.EatIt.model.IngredientsCategory;
import com.project.EatIt.model.IngredientsItem;
import com.project.EatIt.request.IngredientCategoryRequest;
import com.project.EatIt.request.IngredientRequest;
import com.project.EatIt.service.IngredientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/ingredients")
public class IngredientController {
    @Autowired
    private IngredientService ingredientService;

    @PostMapping("/category")
    private ResponseEntity<IngredientsCategory> createIngredientCategory(@RequestBody IngredientCategoryRequest request) throws Exception {
        IngredientsCategory ingredientsCategory = ingredientService.createIngredientCategory(request.getName(), request.getRestaurantId());
        return new ResponseEntity<>(ingredientsCategory, HttpStatus.CREATED);
    }

    @PostMapping()
    private ResponseEntity<IngredientsItem> createIngredientItem(@RequestBody IngredientRequest request) throws Exception {
        IngredientsItem ingredientsItem = ingredientService.createIngredientItem(request.getRestaurantId(), request.getName(), request.getCategoryId());
        return new ResponseEntity<>(ingredientsItem, HttpStatus.CREATED);
    }

    @PutMapping("/{id}/stock")
    private ResponseEntity<IngredientsItem> updateIngredientStock(@PathVariable Long id) throws Exception {
        IngredientsItem item = ingredientService.updateStock(id);
        return new ResponseEntity<>(item, HttpStatus.OK);
    }

    @GetMapping("/restaurant/{id}")
    private ResponseEntity<List<IngredientsItem>> getRestaurantIngredient(@PathVariable Long id) throws Exception {
        List<IngredientsItem> items = ingredientService.findRestaurantIngredients(id);
        return new ResponseEntity<>(items, HttpStatus.OK);
    }

    @GetMapping("/restaurant/{id}/category")
    private ResponseEntity<List<IngredientsCategory>> getRestaurantIngredientCategory(@PathVariable Long id) throws Exception {
        List<IngredientsCategory> items = ingredientService.findIngredientCategoryByRestaurantId(id);
        return new ResponseEntity<>(items, HttpStatus.OK);
    }
}
