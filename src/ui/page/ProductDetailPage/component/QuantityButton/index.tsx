import {Fab} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove'
import {DescProps} from "../Description";

type Props = { onQuant: DescProps["onQuant"], onRemove: DescProps["onRemove"], onAdd: DescProps["onAdd"] }

const QuantityButton = ({onQuant, onRemove, onAdd}: Props) => {
    return (
        <div className="amount">
            <Fab size="medium" color="primary" aria-label="add" onClick={onAdd}>
                <AddIcon/>
            </Fab>
            <p>{onQuant}</p>
            <Fab size="medium" color="secondary" aria-label="add" onClick={onRemove}>
                <RemoveIcon/>
            </Fab>
        </div>
    );
};

export default QuantityButton;
