import {Backdrop, CircularProgress, Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import * as transactionApi from "../../../../../api/transactionApi.ts"
import {useNavigate} from "react-router-dom";
import {useState} from "react";

type Props = { total: number, tid?: string }

const CheckoutTotalButtons = ({total, tid}: Props) => {
    const [isBackdropOpen, setIsBackdropOpen] = useState(false);

    const navigate = useNavigate()

    const handleFinishPay = async () => {
        if (!tid) return
        setIsBackdropOpen(true)
        await transactionApi.finishTransaction(tid).catch(() => navigate("/error"))
        setIsBackdropOpen(false)
        navigate("/thankyou")
    }

    return (
        <>
            <Stack direction="column" alignItems="flex-end" gap={3} paddingRight={4} mt={4} whiteSpace="nowrap">
                <Box>
                    <Typography variant="h4">
                        Total: $ {total.toLocaleString(undefined, {maximumFractionDigits: 2, minimumFractionDigits: 2})}
                    </Typography>
                </Box>
                <Box>
                    <Button variant="contained" color="success" onClick={handleFinishPay}>
                        <Typography variant="h4">
                            Confirm and Pay
                        </Typography>
                    </Button>
                </Box>
            </Stack>
            <Backdrop
                sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                open={isBackdropOpen}
            >
                <CircularProgress color="inherit"/>
            </Backdrop>
        </>
    );
};

export default CheckoutTotalButtons;