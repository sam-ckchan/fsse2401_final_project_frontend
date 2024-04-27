import styled from "styled-components";
import Typography from "@mui/material/Typography";

export const DescContainer = styled(Typography)`
    height: 40px;
    overflow-y: auto;

    ::-webkit-scrollbar {
        width: 2px;
    }

    ::-webkit-scrollbar-track {
        background-color: transparent;
    }

    ::-webkit-scrollbar-thumb {
        border-radius: 30px;
        background: #69ffd2;
    }

    ::-webkit-scrollbar-thumb:hover {
        background: hotpink;
        box-shadow: inset 0 0 10px snow;
    }

    ::-webkit-scrollbar-track {
        background: transparent;
    }




`
