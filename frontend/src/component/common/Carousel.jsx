import React from 'react';
import Slider from 'react-slick';
import './Carousel.css';

/**
 * Generic horizontal carousel.
 * Knows nothing about the domain (meals, restaurants, etc.).
 *
 * @param {Array}    items        - data to display
 * @param {Function} renderItem   - (item, index) => ReactNode, how to render one slide
 * @param {Object}   settings     - react-slick settings, merged over the defaults
 * @param {String}   slideClassName - optional extra class for each slide wrapper
 */
const Carousel = ({ items = [], renderItem, settings = {}, slideClassName = '' }) => {
    const defaultSettings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: true,
    };

    const mergedSettings = { ...defaultSettings, ...settings };

    return (
        <Slider {...mergedSettings}>
            {items.map((item, index) => (
                <div key={index} className={`carousel-slide ${slideClassName}`}>
                    {renderItem(item, index)}
                </div>
            ))}
        </Slider>
    );
};

export default Carousel;
