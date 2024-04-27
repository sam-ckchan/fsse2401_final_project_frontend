import Button from "@mui/material/Button";
import * as FirebaseAuthService from "../../../../../authService/firebaseAuthService.ts";


const SignOutButton = () => {
    return (
        <Button
            sx={{ml: 1, fontSize: "0.7em"}}
            variant="contained"
            onClick={FirebaseAuthService.handleSignOut}
        >
            Sign Out
        </Button>
    );
};

export default SignOutButton;