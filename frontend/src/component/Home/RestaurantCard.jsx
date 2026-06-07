import React, { useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import './RestaurantCard.css';

const RestaurantCard = ({ image, title, description, open, favourite }) => {
    const [isFavourite, setIsFavourite] = useState(favourite);

    return (
        <div className={`restaurant-card ${open ? 'is-open' : 'is-closed'}`}>
            <div className='restaurant-card-image-wrapper'>
                <span className={`restaurant-status ${open ? 'status-open' : 'status-closed'}`}>
                    {open ? 'Open' : 'Closed'}
                </span>
                <img className='restaurant-card-image' src={image} alt={title} />
                {!open && (
                    <div className='restaurant-closed-overlay'>
                        <HighlightOffIcon className='closed-icon' />
                    </div>
                )}
            </div>
            <div className='restaurant-card-content'>
                <div className='restaurant-card-header'>
                    <p className='restaurant-card-title'>{title}</p>
                    <button
                        className='restaurant-favourite-btn'
                        onClick={() => setIsFavourite(!isFavourite)}
                        aria-label='toggle favourite'
                    >
                        {isFavourite
                            ? <FavoriteIcon className='favourite-icon-active' />
                            : <FavoriteBorderIcon className='favourite-icon' />}
                    </button>
                </div>
                <p className='restaurant-card-description'>{description}</p>
            </div>
        </div>
    );
};

export default RestaurantCard;
