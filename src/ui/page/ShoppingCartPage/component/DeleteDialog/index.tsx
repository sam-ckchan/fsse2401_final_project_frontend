import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import {Dispatch, SetStateAction} from "react";

type Props = {
    isOpen: boolean,
    setIsOpen: Dispatch<SetStateAction<boolean>>,
    handleRemove: () => Promise<void>
}

export default function DeleteDialog({isOpen, setIsOpen, handleRemove}: Props) {

    const handleConfirmDelete = async () => {
        await handleRemove().catch()
        setIsOpen(false);
    };

    return (
        <Dialog
            open={isOpen}
            onClose={() => setIsOpen(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                Do you confirm deletion of this cart item?
            </DialogTitle>
            <DialogActions>
                <Button onClick={() => setIsOpen(false)} variant="contained" autoFocus>No</Button>
                <Button onClick={handleConfirmDelete} color="inherit">Yes</Button>
            </DialogActions>
        </Dialog>
    )
}