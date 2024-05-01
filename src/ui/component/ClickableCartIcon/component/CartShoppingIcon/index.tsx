import {useRef, useState} from "react";
import {useCartItemContext} from "../../../../../context/CartItemProvider.tsx";
import IconButton from "@mui/material/IconButton";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCartShopping} from "@fortawesome/free-solid-svg-icons/faCartShopping";
import {styled} from "@mui/material/styles";
import {Badge, BadgeProps} from "@mui/material";
import {AdditionProps} from "../../index.tsx";

export const CartShoppingIcon = ({style, setIsDrawerOpen}: AdditionProps) => {
    const [shake, setShake] = useState(false)
    const shakeTimerId = useRef(0);

    const {cartCount} = useCartItemContext()

    const handleClick = () => {
        clearTimeout(shakeTimerId.current)
        setShake(true)
        shakeTimerId.current = window.setTimeout(() => {
            setIsDrawerOpen && setIsDrawerOpen(true)
            setShake(false)
        }, 400)
    }

    return (
        <IconButton onClick={handleClick} sx={{...style}}>
            <StyledBadge badgeContent={cartCount} color="success" showZero>
                <FontAwesomeIcon
                    icon={faCartShopping}
                    size="lg"
                    style={{color: "white", cursor: "pointer", ...style}}
                    shake={shake}
                />
            </StyledBadge>
        </IconButton>
    );
};

const StyledBadge = styled(Badge)<BadgeProps>(({theme}) => ({
    '& .MuiBadge-badge': {
        right: 25,
        top: 19,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}));