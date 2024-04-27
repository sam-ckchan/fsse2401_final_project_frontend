import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import {Fab, Fade, useScrollTrigger} from '@mui/material';
import {Fragment, MouseEvent, ReactElement} from "react";
import Box from "@mui/material/Box";

type ScrollTopProps = {
    children: ReactElement;
    window?: () => Window;
}

const ScrollTop = ({children, window}: ScrollTopProps) => {
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
        disableHysteresis: true,
        threshold: 64,
    });

    const handleClick = (event: MouseEvent<HTMLDivElement>) => {
        const anchor = ((event.target as HTMLElement).ownerDocument || document).querySelector('#back-to-top-anchor');
        if (anchor) {
            anchor.scrollIntoView({behavior: 'smooth', block: 'start'});
        }
    };

    return (
        <Fade in={trigger}>
            <Box
                onClick={handleClick}
                role="presentation"
                sx={{position: 'fixed', bottom: 16, right: 16}}
            >
                {children}
            </Box>
        </Fade>
    );
};

const ScrollToTopBtn = () => {
    return (
        <Fragment>
            <ScrollTop>
                <Fab color="primary" size="large" aria-label="scroll back to top">
                    <KeyboardDoubleArrowUpIcon/>
                </Fab>
            </ScrollTop>
        </Fragment>
    )
}

export default ScrollToTopBtn;