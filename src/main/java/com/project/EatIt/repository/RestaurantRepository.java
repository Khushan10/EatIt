package com.project.EatIt.repository;

import com.project.EatIt.model.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {

    @Query("SELECT R FROM RESTAURANT R WHERE LOWER(R.NAME) LIKE LOWER(CONCAT('%', :query, '%'))" +
            "OR LOWER(R.cuisineType) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<Restaurant> findBySearchQuery(String query);

    Restaurant findByOwnerId(Long userId);
}
