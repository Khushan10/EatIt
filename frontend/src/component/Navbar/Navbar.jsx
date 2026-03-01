import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Avatar from '@mui/material/Avatar';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const colors = {
    pink: "#e91e63",
    white: "#ffffff",
};
const fontSizes = {
    default: "1.5rem",
}

export const Navbar = () => {
    return (
        <nav
            style={{
                backgroundColor: colors.pink,
                paddingBlock: "0.8rem",
                paddingInline: "clamp(1rem, 8vw, 6rem)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
            }}
        >
            <div style={{ display: "flex", alignItems: "center" }}>
                <span style={{ fontWeight: 600, color: colors.white, fontSize: fontSizes.default, whiteSpace: "nowrap" }}>
                    Eat It
                </span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
                <IconButton sx={{ color: colors.white }}>
                    <SearchIcon sx={{ fontSize: fontSizes.default, color: colors.white }} />
                </IconButton>

                <Avatar style={{ backgroundColor: colors.white, color: colors.pink }}>
                    K
                </Avatar>
                <IconButton sx={{ color: colors.white }}>
                    <ShoppingCartIcon sx={{ fontSize: fontSizes.default, color: colors.white }} />
                </IconButton>
            </div>

        </nav>
    );
};
