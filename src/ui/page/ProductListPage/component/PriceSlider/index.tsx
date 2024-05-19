import {Typography} from '@mui/material';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import {marks, maxStep, minStep} from "../../../../../data/products/productsSliderMarks.ts";
import {Dispatch, SetStateAction} from "react";

interface Props {
    setSliderVal: Dispatch<SetStateAction<number>>,
    sliderVal: number
}

export default function PriceSlider({setSliderVal, sliderVal}: Props) {

    const handleChange = (_event: Event, newValue: number | number[]) => {
        if (typeof newValue === 'number') {
            setSliderVal(newValue);
        }
    };

    return (
        <Box sx={{width: 300}}>
            <Typography align="center" mb={4} variant="h5">
                Price below: ${sliderVal}
            </Typography>
            <Slider
                defaultValue={maxStep}
                min={minStep}
                max={maxStep}
                marks={marks}
                step={null}
                valueLabelDisplay="on"
                onChange={handleChange}
            />
        </Box>
    );
}
