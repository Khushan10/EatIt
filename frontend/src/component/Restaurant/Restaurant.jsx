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
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Checkbox
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime"
import CloseIcon from '@mui/icons-material/Close';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { getRestaurantById } from '../Home/RestaurantData';
import { FOOD_TYPES, FOOD_CATEGORIES, MenuItems } from './MenuData';
import { useCart } from '../../context/CartContext';
import './Restaurant.css';

const CustomizeDialog = ({ open, item, onClose }) => {
    const ingredients = item?.ingredients ?? [];
    const { addItem } = useCart();

    // track which ingredients are selected, seeded from their `included` default
    const [selected, setSelected] = useState({});
    const [quantity, setQuantity] = useState(1);

    // reset selections whenever a new item's dialog opens
    React.useEffect(() => {
        if (open && item) {
            const initial = {};
            ingredients.forEach((ing, index) => {
                initial[index] = !!ing.included;
            });
            setSelected(initial);
            setQuantity(1);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open, item]);

    if (!item) return null;

    const toggle = (index) => {
        setSelected((prev) => ({ ...prev, [index]: !prev[index] }));
    };

    const addOnsTotal = ingredients.reduce(
        (sum, ing, index) => (selected[index] ? sum + ing.price : sum),
        0
    );
    const unitTotal = item.price + addOnsTotal;
    const grandTotal = unitTotal * quantity;

    const handleAdd = () => {
        // only the extras the customer added on top of the defaults
        const chosen = ingredients
            .filter((ing, index) => selected[index] && !ing.included)
            .map((ing) => ing.name);
        addItem({
            id: item.id,
            name: item.name,
            image: item.image,
            basePrice: item.price,
            unitPrice: unitTotal,
            customizations: chosen,
            quantity
        });
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
            <DialogTitle className='customize-dialog-title'>
                Customize {item.name}
                <IconButton onClick={onClose} sx={{ color: 'inherit' }} aria-label='close'>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers>
                <p className='customize-base-price'>
                    Base price: {`\u20B9${item.price}`}
                </p>
                {ingredients.length === 0 ? (
                    <p className='customize-empty'>No customizations available for this item.</p>
                ) : (
                    <Table size='small' className='customize-table'>
                        <TableHead>
                            <TableRow>
                                <TableCell>Add</TableCell>
                                <TableCell>Ingredient</TableCell>
                                <TableCell align='right'>Price</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {ingredients.map((ing, index) => (
                                <TableRow key={ing.name}>
                                    <TableCell padding='checkbox'>
                                        <Checkbox
                                            color='primary'
                                            checked={!!selected[index]}
                                            onChange={() => toggle(index)}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        {ing.name}
                                        {ing.included && (
                                            <span className='customize-default-tag'>included</span>
                                        )}
                                    </TableCell>
                                    <TableCell align='right'>
                                        {ing.price === 0 ? 'Free' : `+\u20B9${ing.price}`}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}

                <div className='customize-quantity'>
                    <span>Quantity</span>
                    <div className='customize-quantity-controls'>
                        <IconButton
                            size='small'
                            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                            disabled={quantity <= 1}
                            sx={{ color: 'white' }}
                        >
                            <RemoveIcon fontSize='small' />
                        </IconButton>
                        <span className='customize-quantity-value'>{quantity}</span>
                        <IconButton
                            size='small'
                            onClick={() => setQuantity((q) => q + 1)}
                            sx={{ color: 'white' }}
                        >
                            <AddIcon fontSize='small' />
                        </IconButton>
                    </div>
                </div>
            </DialogContent>
            <DialogActions className='customize-actions'>
                <Button
                    variant='contained'
                    color='primary'
                    fullWidth
                    startIcon={<AddShoppingCartIcon />}
                    onClick={handleAdd}
                >
                    {`Add to Cart \u00B7 \u20B9${grandTotal}`}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

const MenuItemRow = ({ item }) => {
    const [expanded, setExpanded] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);

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
                        onClick={() => setDialogOpen(true)}
                    >
                        Add to Cart
                    </Button>
                </div>
            </Collapse>
            <CustomizeDialog
                open={dialogOpen}
                item={item}
                onClose={() => setDialogOpen(false)}
            />
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
