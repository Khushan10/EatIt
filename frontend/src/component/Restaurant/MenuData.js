// Food type values used by the "Food Type" filter
export const FOOD_TYPES = ["Vegetarian Only", "Non-Vegetarian Only", "Seasonal"];

// Food category values used by the "Food Category" filter
export const FOOD_CATEGORIES = ["Pizza", "Biryani", "Burger", "Chicken", "Poha"];

// Menu items. `type` maps to a Food Type, `category` maps to a Food Category.
export const MenuItems = [
    {
        id: 1,
        name: "Burger",
        price: 499,
        description:
            "A hamburger or simply burger is a food consisting of fillings\u2014usually a patty of ground meat, placed inside a sliced bun or bread roll.",
        image: "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=400",
        type: "Non-Vegetarian Only",
        category: "Burger"
    },
    {
        id: 2,
        name: "Chicken breast",
        price: 399,
        description:
            "Crispy Chicken Parmesan: Golden-fried chicken cutlets, smothered in rich marinara sauce, topped with melted mozzarella cheese, and garnished with fresh basil.",
        image: "https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=400",
        type: "Non-Vegetarian Only",
        category: "Chicken"
    },
    {
        id: 3,
        name: "biryani",
        price: 599,
        description: "delicius biryani",
        image: "https://images.pexels.com/photos/12737656/pexels-photo-12737656.jpeg?auto=compress&cs=tinysrgb&w=400",
        type: "Non-Vegetarian Only",
        category: "Biryani"
    },
    {
        id: 4,
        name: "Margherita Pizza",
        price: 449,
        description:
            "Classic Margherita: hand-stretched dough topped with San Marzano tomato sauce, fresh mozzarella, and basil leaves.",
        image: "https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=400",
        type: "Vegetarian Only",
        category: "Pizza"
    },
    {
        id: 5,
        name: "Veg Biryani",
        price: 349,
        description:
            "Fragrant basmati rice layered with garden vegetables and aromatic spices, slow-cooked to perfection.",
        image: "https://images.pexels.com/photos/7394819/pexels-photo-7394819.jpeg?auto=compress&cs=tinysrgb&w=400",
        type: "Vegetarian Only",
        category: "Biryani"
    },
    {
        id: 6,
        name: "Poha",
        price: 99,
        description:
            "Light and fluffy flattened rice cooked with onions, peanuts, curry leaves and a hint of lemon \u2014 a classic breakfast.",
        image: "https://images.pexels.com/photos/4449068/pexels-photo-4449068.jpeg?auto=compress&cs=tinysrgb&w=400",
        type: "Vegetarian Only",
        category: "Poha"
    },
    {
        id: 7,
        name: "Mango Seasonal Special",
        price: 199,
        description:
            "A refreshing seasonal mango bowl available only during summer \u2014 sweet, juicy and chilled to perfection.",
        image: "https://images.pexels.com/photos/918327/pexels-photo-918327.jpeg?auto=compress&cs=tinysrgb&w=400",
        type: "Seasonal",
        category: "Poha"
    }
];
