import {TableCell, TableRow} from "@mui/material";
import {TransactionProductDto} from "../../../../../data/transaction/transaction.type.ts";

const CheckoutTableRow = ({product, quantity, subtotal}: TransactionProductDto) => {
    return (
        <TableRow
            sx={{'&:last-child td, &:last-child th': {border: 0}}}
        >
            <TableCell component="th" scope="row">
                {product.name}
            </TableCell>
            <TableCell>$ {product.price.toLocaleString()}</TableCell>
            <TableCell>{quantity}</TableCell>
            <TableCell>
                $ {subtotal.toLocaleString(undefined, {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2
            })}
            </TableCell>
        </TableRow>
    );
};

export default CheckoutTableRow;