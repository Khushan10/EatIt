import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import './RestaurantCard.css';

const RestaurantCard = ({ id, image, title, description, open, favourite }) => {
    const [isFavourite, setIsFavourite] = useState(favourite);
    const navigate = useNavigate();

    const handleCardClick = () => {
        // only open restaurants are navigable
        if (open) {
            navigate(`/restaurant/${id}`);
        }
    };

    return (
        <div
            className={`restaurant-card ${open ? 'is-open' : 'is-closed'}`}
            onClick={handleCardClick}
        >
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
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsFavourite(!isFavourite);
                        }}
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
