export const HandpickedRestaurants = [
    {
        id: 1,
        title: "Indian Fast Food",
        description: "Crispy Chicken Parmesan: Golden-fried chicken topped with marinara and melted cheese.",
        image: "https://images.pexels.com/photos/29000046/pexels-photo-29000046/free-photo-of-luxurious-hotel-dining-room-interior-design.jpeg",
        open: true,
        favourite: true,
        location: "MG Road, Bengaluru",
        hours: "10:00AM - 11:00 PM"
    },
    {
        id: 2,
        title: "Krishna Restaurant",
        description: "Craving it all? Dive into our global flavours and handcrafted dishes.",
        image: "https://images.pexels.com/photos/26729401/pexels-photo-26729401/free-photo-of-interior-design-of-restaurant.jpeg",
        open: true,
        favourite: false,
        location: "MG Road, Bengaluru",
        hours: "10:00AM - 11:00 PM"
    },
    {
        id: 3,
        title: "Kathyavadi Restaurant",
        description: "Gujrati food",
        image: "https://images.pexels.com/photos/26729395/pexels-photo-26729395/free-photo-of-interior-of-the-melia-vinpearl-thanh-hoa-luxury-hotel-in-thanh-hoa-city-vietnam.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        open: false,
        favourite: false,
        location: "MG Road, Bengaluru",
        hours: "10:00AM - 11:00 PM"
    },
    {
        id: 4,
        title: "Sita Ram Restaurant",
        description: "Best Restaurant Of The Town",
        image: "https://st4.depositphotos.com/8911320/26412/i/450/depositphotos_264129004-stock-photo-render-cafe-restaurant.jpg",
        open: false,
        favourite: false,
        location: "MG Road, Bengaluru",
        hours: "10:00AM - 11:00 PM"
    },
    {
        id: 5,
        title: "Italian Restaurant",
        description: "Aakhri Pasta on London Rasta",
        image: "https://images.pexels.com/photos/29000037/pexels-photo-29000037/free-photo-of-luxurious-buffet-restaurant-with-elegant-seating.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        open: true,
        favourite: true,
        location: "MG Road, Bengaluru",
        hours: "10:00AM - 11:00 PM"
    },
    {
        id: 6,
        title: "Chinese Restaurant",
        description: "Straight from China",
        image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/18/e8/a9/8c/img-20190822-185528-largejpg.jpg?w=500&h=-1&s=1",
        open: true,
        favourite: true,
        location: "MG Road, Bengaluru",
        hours: "10:00AM - 11:00 PM"
    }
];

export const getRestaurantById = (id) =>
    HandpickedRestaurants.find((restaurant) => String(restaurant.id) === String(id));
