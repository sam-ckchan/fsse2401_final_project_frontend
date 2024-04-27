import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import Paper from "@mui/material/Paper";
import {GetTransactionDto} from "../../../../../data/transaction/transaction.type.ts";
import CheckoutTableRow from "../CheckoutTableRow";

type Props = { transaction: GetTransactionDto }

const CheckoutTable = ({transaction}: Props) => {
    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} size="small" aria-label="transaction table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Unit Price</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell>Sub-total</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {transaction.items.map(transactionProduct =>(
                        <CheckoutTableRow
                            key={transactionProduct.tpid} {...transactionProduct}/>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default CheckoutTable;