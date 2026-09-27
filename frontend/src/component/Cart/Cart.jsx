import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    IconButton,
    Button,
    Divider,
    TextField,
    Snackbar,
    Alert
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import HomeIcon from '@mui/icons-material/Home';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCart } from '../../context/CartContext';
import './Cart.css';

// Seed a couple of saved addresses (matches the reference mock)
const INITIAL_ADDRESSES = [
    {
        id: 1,
        label: 'Home',
        text: 'Mumbai, gokuldham market, 530068, Maharastra, India'
    },
    {
        id: 2,
        label: 'Work',
        text: 'Pune, tech park, hinjewadi phase 2, 411057, Maharastra, India'
    }
];

const rupee = (amount) => `\u20B9${amount}`;

export const Cart = () => {
    const navigate = useNavigate();
    const {
        items,
        increment,
        decrement,
        clearCart,
        itemTotal,
        deliveryFee,
        platformFee,
        gst,
        totalPay
    } = useCart();

    const [addresses, setAddresses] = useState(INITIAL_ADDRESSES);
    const [selectedAddress, setSelectedAddress] = useState(null);

    // address form state: mode is 'closed' | 'add' | number (id being edited)
    const [formMode, setFormMode] = useState('closed');
    const [formLabel, setFormLabel] = useState('Home');
    const [formText, setFormText] = useState('');

    const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });

    const openAddForm = () => {
        setFormMode('add');
        setFormLabel('Home');
        setFormText('');
    };

    const openEditForm = (address) => {
        setFormMode(address.id);
        setFormLabel(address.label);
        setFormText(address.text);
    };

    const closeForm = () => {
        setFormMode('closed');
        setFormLabel('Home');
        setFormText('');
    };

    const saveAddress = () => {
        const text = formText.trim();
        const label = formLabel.trim() || 'Home';
        if (!text) return;

        if (formMode === 'add') {
            const id = addresses.length ? Math.max(...addresses.map((a) => a.id)) + 1 : 1;
            setAddresses((prev) => [...prev, { id, label, text }]);
        } else {
            // editing an existing address (formMode holds its id)
            setAddresses((prev) =>
                prev.map((a) => (a.id === formMode ? { ...a, label, text } : a))
            );
        }
        closeForm();
    };

    const deleteAddress = (id) => {
        setAddresses((prev) => prev.filter((a) => a.id !== id));
        if (selectedAddress === id) setSelectedAddress(null);
        if (formMode === id) closeForm();
    };

    const handlePlaceOrder = () => {
        if (selectedAddress == null) {
            setToast({
                open: true,
                message: 'Please select a delivery address first.',
                severity: 'warning'
            });
            return;
        }
        setToast({
            open: true,
            message: `Order placed! Paying ${rupee(totalPay)}.`,
            severity: 'success'
        });
        clearCart();
    };

    if (items.length === 0) {
        return (
            <div className='cart-page'>
                <div className='cart-empty'>
                    <ShoppingCartIcon sx={{ fontSize: '3rem', color: '#9ca3af' }} />
                    <p>Your cart is empty.</p>
                    <Button variant='contained' color='primary' onClick={() => navigate('/')}>
                        Browse Restaurants
                    </Button>
                </div>
                <Snackbar
                    open={toast.open}
                    autoHideDuration={3000}
                    onClose={() => setToast((t) => ({ ...t, open: false }))}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                >
                    <Alert severity={toast.severity} variant='filled'>
                        {toast.message}
                    </Alert>
                </Snackbar>
            </div>
        );
    }

    const renderForm = () => (
        <div className='add-address-form'>
            <TextField
                value={formLabel}
                onChange={(e) => setFormLabel(e.target.value)}
                placeholder='Label (e.g. Home, Work)'
                size='small'
                fullWidth
            />
            <TextField
                value={formText}
                onChange={(e) => setFormText(e.target.value)}
                placeholder='Enter full address'
                size='small'
                multiline
                minRows={2}
                fullWidth
            />
            <div className='add-address-form-actions'>
                <Button variant='contained' color='primary' onClick={saveAddress}>
                    Save
                </Button>
                <Button variant='text' color='inherit' onClick={closeForm}>
                    Cancel
                </Button>
            </div>
        </div>
    );

    return (
        <div className='cart-page'>
            {/* ---- Left: cart items + bill ---- */}
            <section className='cart-left'>
                <div className='cart-items'>
                    {items.map((line) => (
                        <div key={line.cartId} className='cart-item'>
                            <img className='cart-item-image' src={line.image} alt={line.name} />
                            <div className='cart-item-mid'>
                                <p className='cart-item-name'>{line.name}</p>
                                <div className='cart-item-qty'>
                                    <IconButton
                                        size='small'
                                        onClick={() => decrement(line.cartId)}
                                        color='primary'
                                        aria-label='decrease quantity'
                                    >
                                        <RemoveCircleOutlineIcon />
                                    </IconButton>
                                    <span className='cart-item-qty-value'>{line.quantity}</span>
                                    <IconButton
                                        size='small'
                                        onClick={() => increment(line.cartId)}
                                        color='primary'
                                        aria-label='increase quantity'
                                    >
                                        <AddCircleOutlineIcon />
                                    </IconButton>
                                </div>
                                {line.customizations.length > 0 && (
                                    <div className='cart-item-tags'>
                                        {line.customizations.map((tag) => (
                                            <span key={tag} className='cart-item-tag'>
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <p className='cart-item-price'>
                                {rupee(line.unitPrice * line.quantity)}
                            </p>
                        </div>
                    ))}
                </div>

                <Divider className='cart-divider' />

                <div className='bill-details'>
                    <p className='bill-title'>Bill Details</p>
                    <div className='bill-row'>
                        <span>Item Total</span>
                        <span>{rupee(itemTotal)}</span>
                    </div>
                    <div className='bill-row'>
                        <span>Delivery Fee</span>
                        <span>{rupee(deliveryFee)}</span>
                    </div>
                    <div className='bill-row'>
                        <span>Platform Fee</span>
                        <span>{rupee(platformFee)}</span>
                    </div>
                    <div className='bill-row'>
                        <span>GST and Restaurant Charges</span>
                        <span>{rupee(gst)}</span>
                    </div>
                    <Divider className='cart-divider' />
                    <div className='bill-row bill-total'>
                        <span>Total Pay</span>
                        <span>{rupee(totalPay)}</span>
                    </div>
                </div>

                <Button
                    variant='contained'
                    color='primary'
                    fullWidth
                    size='large'
                    className='place-order-btn'
                    onClick={handlePlaceOrder}
                >
                    Place Order
                </Button>
            </section>

            {/* ---- Right: delivery address ---- */}
            <section className='cart-right'>
                <h2 className='address-heading'>Choose Delivery Address</h2>

                <div className='address-grid'>
                    {addresses.map((address) =>
                        formMode === address.id ? (
                            <div key={address.id} className='address-card'>
                                <div className='address-card-header'>
                                    <EditIcon />
                                    <span className='address-card-label'>Edit Address</span>
                                </div>
                                {renderForm()}
                            </div>
                        ) : (
                            <div
                                key={address.id}
                                className={`address-card ${selectedAddress === address.id ? 'selected' : ''}`}
                            >
                                <div className='address-card-header'>
                                    <HomeIcon />
                                    <span className='address-card-label'>{address.label}</span>
                                    <div className='address-card-actions'>
                                        <IconButton
                                            size='small'
                                            onClick={() => openEditForm(address)}
                                            aria-label='edit address'
                                            sx={{ color: '#9ca3af' }}
                                        >
                                            <EditIcon fontSize='small' />
                                        </IconButton>
                                        <IconButton
                                            size='small'
                                            onClick={() => deleteAddress(address.id)}
                                            aria-label='delete address'
                                            sx={{ color: '#9ca3af' }}
                                        >
                                            <DeleteIcon fontSize='small' />
                                        </IconButton>
                                    </div>
                                </div>
                                <p className='address-card-text'>{address.text}</p>
                                <Button
                                    variant='outlined'
                                    color='primary'
                                    fullWidth
                                    className='address-select-btn'
                                    onClick={() => setSelectedAddress(address.id)}
                                >
                                    {selectedAddress === address.id ? 'Selected' : 'Select'}
                                </Button>
                            </div>
                        )
                    )}

                    {/* Add New Address card */}
                    <div className='address-card add-address-card'>
                        <div className='address-card-header'>
                            <AddLocationAltIcon />
                            <span className='address-card-label'>Add New Address</span>
                        </div>
                        {formMode === 'add' ? (
                            renderForm()
                        ) : (
                            <Button
                                variant='contained'
                                color='primary'
                                fullWidth
                                className='add-address-btn'
                                onClick={openAddForm}
                            >
                                Add
                            </Button>
                        )}
                    </div>
                </div>
            </section>

            <Snackbar
                open={toast.open}
                autoHideDuration={3000}
                onClose={() => setToast((t) => ({ ...t, open: false }))}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert severity={toast.severity} variant='filled'>
                    {toast.message}
                </Alert>
            </Snackbar>
        </div>
    );
};
