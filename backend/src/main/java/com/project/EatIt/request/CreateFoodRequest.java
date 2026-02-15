package com.project.EatIt.request;

import com.project.EatIt.model.Category;
import com.project.EatIt.model.IngredientsItem;
import lombok.Data;
import java.util.List;

@Data
public class CreateFoodRequest {

    private String name;
    private String description;
    private Long price;
    private Category category;
    private List<String> images;
    private Long restaurantId;
    private boolean veg;
    private boolean seasional;
    private List<IngredientsItem> ingredients;
}
