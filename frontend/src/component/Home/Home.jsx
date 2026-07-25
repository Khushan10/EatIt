import React from 'react'
import './Home.css'
import Carousel from '../common/Carousel'
import CarouselItem from './CarouselItem'
import RestaurantCard from './RestaurantCard'
import { TopMeals } from './TopMeals'
import { HandpickedRestaurants } from './RestaurantData'

export const Home = () => {
    const mealSettings = {
        dots: true,
        infinite: true,
        slidesToShow: 5,
        autoplay: true,
        autoplaySpeed: 2000,
    };

    const restaurantSettings = {
        dots: true,
        infinite: true,
        slidesToShow: 4,
        autoplay: true,
        autoplaySpeed: 2000,
    };

    return(
        <div className=''>
            <section className='banner home-banner home-banner-image'>
                <div className='home-banner-content'>
                    <p className='home-title'>
                        Eat It
                    </p>
                    <p className='home-subtitle'>
                        Welcome to our food delivery service! We are dedicated to bringing delicious meals right to your doorstep.
                    </p>
                </div>
                <div className='cover'>
                </div>
            </section>
            <section className='top-meals-section'>
                <p className='top-meals-title'>Top Meals</p>
                <Carousel
                    items={TopMeals}
                    settings={mealSettings}
                    renderItem={(item) => <CarouselItem image={item.image} title={item.title} />}
                />
            </section>
            <section className='handpicked-section'>
                <p className='handpicked-title'>Order From Our Handpicked Favorites</p>
                <Carousel
                    items={HandpickedRestaurants}
                    settings={restaurantSettings}
                    slideClassName='spaced'
                    renderItem={(item) => (
                        <RestaurantCard
                            id={item.id}
                            image={item.image}
                            title={item.title}
                            description={item.description}
                            open={item.open}
                            favourite={item.favourite}
                        />
                    )}
                />
            </section>
        </div>
    )
}
