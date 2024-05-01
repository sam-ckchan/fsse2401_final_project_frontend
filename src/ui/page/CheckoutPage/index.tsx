import CheckoutTable from "./component/CheckoutTable";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import {Typography} from "@mui/material";
import CheckoutTotalButtons from "./component/CheckoutTotalButtons";
import {useEffect, useState} from "react";
import {GetTransactionDto} from "../../../data/transaction/transaction.type.ts";
import GradientCircularProgress from "../../component/GradientCircularProgress";
import * as transactionApi from "../../../api/transactionApi.ts"
import {useNavigate, useParams} from "react-router-dom";
import {useLoginUserContext} from "../../../context/LoginUserProvider.tsx";

type CheckoutPageParams = { transactionId: string }

export function CheckoutPage() {
    const [transaction, setTransaction] = useState<GetTransactionDto | undefined>(undefined)

    const {transactionId: tid} = useParams<CheckoutPageParams>()
    const navigate = useNavigate()

    const loginUser = useLoginUserContext()

    // actually we can store the GetTransactionDto from createTransaction API, but its more secure to call another API to get the latest state even its slower
    useEffect(() => {
        const fetchTransaction = async (tid: string) => {
            try {
                const transaction = await transactionApi.getTransaction(tid)
                setTransaction(transaction)
            } catch {
                navigate("/error")
            }
        }
        if (tid && loginUser) fetchTransaction(tid)
    }, [loginUser])

    return transaction ? (
        <>
            <Box sx={{mb: 3}}>
                <AppBar position="static" sx={{py: 1.5}}>
                    <Typography variant="h4" gutterBottom textAlign="center" mb={0}>Checkout</Typography>
                </AppBar>
            </Box>
            <CheckoutTable transaction={transaction}/>
            <CheckoutTotalButtons total={transaction.total} tid={tid}/>
        </>
    ) : (
        <Box textAlign="center" mt={20}><GradientCircularProgress size="30rem"/></Box>
    );
}