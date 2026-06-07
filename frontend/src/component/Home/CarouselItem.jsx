import React from 'react';
import './CarouselItem.css';

const CarouselItem = ({image, title}) => {
    return(
        <div className='carousel-item'>
            <img className='carousel-image' src={image} alt={title}/>
            <span className='carousel-title'>
                {title}
            </span>
        </div>
    )
}

export default CarouselItem