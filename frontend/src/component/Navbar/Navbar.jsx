import { IconButton, Badge } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Avatar from '@mui/material/Avatar';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import "./Navbar.css"

export const Navbar = () => {
    const { itemCount } = useCart();
    const navigate = useNavigate();

    return (
        <nav className="navbar">
            <div className="navbar-logo-container">
                <Link to="/" className="navbar-logo-link">
                    <span className="navbar-logo-text">
                        Eat It
                    </span>
                </Link>
            </div>

            <div className="navbar-icons-container">
                <IconButton sx={{ color: "white" }}>
                    <SearchIcon sx={{ fontSize: "1.5rem" }} />
                </IconButton>

                <Avatar className="navbar-avatar">
                    EI
                </Avatar>
                <IconButton onClick={() => navigate('/cart')} aria-label="cart">
                    <Badge color='secondary' badgeContent={itemCount}>
                        <ShoppingCartIcon sx={{ fontSize: "1.5rem", color: "white" }} />
                    </Badge>
                </IconButton>
            </div>
        </nav>
    );
};
