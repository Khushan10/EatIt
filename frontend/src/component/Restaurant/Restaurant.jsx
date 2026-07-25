import React, { useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    FormLabel,
    Divider,
    IconButton,
    Collapse,
    Button
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime"
import { getRestaurantById } from '../Home/RestaurantData';
import { FOOD_TYPES, FOOD_CATEGORIES, MenuItems } from './MenuData';
import './Restaurant.css';

const MenuItemRow = ({ item }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className='menu-item'>
            <div className='menu-item-main'>
                <img className='menu-item-image' src={item.image} alt={item.name} />
                <div className='menu-item-info'>
                    <p className='menu-item-name'>{item.name}</p>
                    <p className='menu-item-price'>{`\u20B9${item.price}`}</p>
                    <p className='menu-item-description'>{item.description}</p>
                </div>
                <IconButton
                    className={`menu-item-expand ${expanded ? 'expanded' : ''}`}
                    onClick={() => setExpanded(!expanded)}
                    aria-label='expand item'
                    sx={{ color: 'white' }}
                >
                    <ExpandMoreIcon />
                </IconButton>
            </div>
            <Collapse in={expanded} timeout='auto' unmountOnExit>
                <div className='menu-item-actions'>
                    <span className='menu-item-tag'>{item.type}</span>
                    <span className='menu-item-tag'>{item.category}</span>
                    <Button
                        variant='contained'
                        color='primary'
                        size='small'
                        startIcon={<AddShoppingCartIcon />}
                    >
                        Add to Cart
                    </Button>
                </div>
            </Collapse>
        </div>
    );
};

export const Restaurant = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const restaurant = getRestaurantById(id);

    const [foodType, setFoodType] = useState('all');
    const [foodCategory, setFoodCategory] = useState('all');

    const filteredItems = useMemo(() => {
        return MenuItems.filter((item) => {
            const typeMatch = foodType === 'all' || item.type === foodType;
            const categoryMatch = foodCategory === 'all' || item.category === foodCategory;
            return typeMatch && categoryMatch;
        });
    }, [foodType, foodCategory]);

    if (!restaurant) {
        return (
            <div className='restaurant-page'>
                <div className='restaurant-not-found'>
                    <p>Restaurant not found.</p>
                    <Button variant='contained' color='primary' onClick={() => navigate('/')}>
                        Back to Home
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className='restaurant-page'>
            <div className='restaurant-hero'>
                <img className='restaurant-hero-image' src={restaurant.image} alt={restaurant.title} />
                <div className='restaurant-hero-overlay'>
                    <IconButton
                        className='restaurant-back-btn'
                        onClick={() => navigate('/')}
                        aria-label='back'
                        sx={{ color: 'white' }}
                    >
                        <ArrowBackIcon />
                    </IconButton>
                    <div className='restaurant-hero-content'>
                        <h1 className='restaurant-hero-title'>{restaurant.title}</h1>
                        <p className='restaurant-hero-description'>{restaurant.description}</p>
                        <div className='restaurant-hero-meta'>
                            {restaurant.location && (
                                <span className='restaurant-meta-item'>
                                    <LocationOnIcon fontSize='small' />
                                    {restaurant.location}
                                </span>
                            )}
                            {restaurant.hours && (
                                <span className='restaurant-meta-item'>
                                    <AccessTimeIcon fontSize='small' />
                                    {restaurant.hours}
                                    <span
                                        className={`restaurant-open-badge ${restaurant.open ? 'is-open' : 'is-closed'}`}
                                    >
                                        {restaurant.open ? 'Open now' : 'Closed'}
                                    </span>
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className='restaurant-body'>
                <aside className='restaurant-filters'>
                    <FormControl component='fieldset' className='filter-group'>
                        <FormLabel component='legend' className='filter-title'>
                            Food Type
                        </FormLabel>
                        <RadioGroup
                            value={foodType}
                            onChange={(e) => setFoodType(e.target.value)}
                        >
                            <FormControlLabel value='all' control={<Radio color='primary' />} label='All' />
                            {FOOD_TYPES.map((type) => (
                                <FormControlLabel
                                    key={type}
                                    value={type}
                                    control={<Radio color='primary' />}
                                    label={type}
                                />
                            ))}
                        </RadioGroup>
                    </FormControl>

                    <Divider className='filter-divider' />

                    <FormControl component='fieldset' className='filter-group'>
                        <FormLabel component='legend' className='filter-title'>
                            Food Category
                        </FormLabel>
                        <RadioGroup
                            value={foodCategory}
                            onChange={(e) => setFoodCategory(e.target.value)}
                        >
                            <FormControlLabel value='all' control={<Radio color='primary' />} label='All' />
                            {FOOD_CATEGORIES.map((category) => (
                                <FormControlLabel
                                    key={category}
                                    value={category}
                                    control={<Radio color='primary' />}
                                    label={category}
                                />
                            ))}
                        </RadioGroup>
                    </FormControl>
                </aside>

                <main className='restaurant-menu'>
                    {filteredItems.length === 0 ? (
                        <p className='menu-empty'>No items match the selected filters.</p>
                    ) : (
                        filteredItems.map((item) => <MenuItemRow key={item.id} item={item} />)
                    )}
                </main>
            </div>
        </div>
    );
};
