import {
    Container,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {GetCartItemDto} from "../../../../../data/cartItem/cartItem.type.ts";
import ShoppingCartTableRow from "../ShppingCartTableRow";
import {Dispatch, SetStateAction} from "react";
import {Link, useNavigate} from "react-router-dom";
import * as transactionApi from "../../../../../api/transactionApi.ts"

type CartTableProps = {
    setCartItems: Dispatch<SetStateAction<GetCartItemDto[] | undefined>>
    cartItems: GetCartItemDto[],
    setIsBackdropOpen: Dispatch<SetStateAction<boolean>>
}

const ShoppingCartTable = ({cartItems, setCartItems, setIsBackdropOpen}: CartTableProps) => {
    const navigate = useNavigate()

    const handlePay = async () => {
        setIsBackdropOpen(true)
        const newTransaction = await transactionApi.createATransaction()
        setIsBackdropOpen(false)
        navigate("/checkout/" + newTransaction.tid)
    }

    const renderTotalAndPayButton = () => {
        const totalPrice = cartItems.reduce((total, currItem) => {
            return total + (currItem.cart_quantity * currItem.price)
        }, 0).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })
        return <Stack direction="column" alignItems="flex-end" gap={3} paddingRight={4} mt={4} whiteSpace="nowrap">
            <Box>
                <Typography variant="h4">
                    Total: $ {totalPrice}
                </Typography>
            </Box>
            <Box>
                <Button variant="contained" color="success" onClick={handlePay}>
                    <Typography variant="h4">
                        Pay Now
                    </Typography>
                </Button>
            </Box>
        </Stack>
    }
    return (
        <Container sx={{p: 3}}>
            {cartItems.length > 0
                ? <><TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}}>
                        {/*accessibility*/}
                        <caption>Shopping Cart Checkout</caption>
                        <TableHead>
                            <TableRow>
                                <TableCell>Thumbnail</TableCell>
                                <TableCell>Product Name</TableCell>
                                <TableCell>Unit Price</TableCell>
                                <TableCell align="center">
                                    <Typography component="span" mr={4}>Quantity</Typography>
                                    <Typography component="span" fontSize={12} color="error">(Remove)</Typography>
                                </TableCell>
                                <TableCell>Sub-total</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {cartItems.map(cartItem => (
                                <ShoppingCartTableRow
                                    key={cartItem.pid}
                                    setCartItems={setCartItems}
                                    cartItems={cartItems}
                                    cartItem={cartItem}
                                />))}
                        </TableBody>
                    </Table>
                </TableContainer>
                    {renderTotalAndPayButton()}
                </>
                : <Typography variant="h4" textAlign="center">
                    No items in cart 😱
                    <Link to="/"><Button variant="contained">Go shopping</Button></Link>
                </Typography>
            }
        </Container>
    );
};

export default ShoppingCartTable;