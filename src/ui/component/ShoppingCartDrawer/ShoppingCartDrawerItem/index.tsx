import {GetCartItemDto} from "../../../../data/cartItem/cartItem.type.ts";
import {Divider, ListItem, ListItemAvatar, ListItemText, Typography} from "@mui/material";
import Avatar from "@mui/material/Avatar";

const ShoppingCartDrawerItem = ({name, cart_quantity, price, image_url}: GetCartItemDto) => {
    return (
        <>
            <ListItem alignItems="center">
                <ListItemAvatar>
                    <Avatar variant="rounded" alt={name} src={image_url} sx={{border: "2px groove"}}/>
                </ListItemAvatar>
                <ListItemText
                    primary={name}
                    secondary={`Qty: ${cart_quantity} `}
                />
                <ListItemText
                    sx={{textAlign: "right", my: 2.5}}
                    primary="Total"
                    secondary={
                        <Typography sx={{fontWeight: 300}}>
                            ${(cart_quantity * price).toLocaleString(undefined, {
                            maximumFractionDigits: 2,
                            minimumFractionDigits: 2
                        })}
                        </Typography>
                    }
                />
            </ListItem>
            <Divider variant="middle" sx={{opacity: "0.8"}}/>
        </>
    );
};

export default ShoppingCartDrawerItem;