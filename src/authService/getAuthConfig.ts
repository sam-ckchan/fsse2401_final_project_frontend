import * as FirebaseAuthService from "./firebaseAuthService.ts";

export default async () => {
    const accessToken = await FirebaseAuthService.getAccessToken()
    // if accessToken is null, sign in not success
    if (!accessToken) throw new Error("authentication required")
    return {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    }
}

