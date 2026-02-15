package com.project.EatIt.repository;

import com.project.EatIt.model.IngredientsCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IngredientsCategoryRepository extends JpaRepository<IngredientsCategory, Long> {
    List<IngredientsCategory> findByRestaurantId(Long id);
}
