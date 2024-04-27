import axios, {AxiosError} from "axios";
import {GetCartItemDto} from "../data/cartItem/cartItem.type.ts";
import getAuthConfig from "../authService/getAuthConfig.ts";
import getEnvConfig from "../config/EnvConfig.ts";

const baseUrl = getEnvConfig().baseUrl;

export const putCartItem = async (pid: number, quantity: number) => {
    try {
        await axios.put(
            `${baseUrl}/cart/${pid}/${quantity}`,
            null,
            await getAuthConfig()
        )
    } catch (err) {
        if (axios.isAxiosError(err)) {
            const axiosError = err as AxiosError;
            console.error(`Error putting cart items ${pid}`, axiosError);
        } else {
            console.warn("An unknown error occurred", err);
            throw err;
        }
    }
}

export const getCartItem = async () => {
    try {
        const res = await axios.get<GetCartItemDto[]>(
            `${baseUrl}/cart`,
            await getAuthConfig()
        )
        return res.data
    } catch (err) {
        if (axios.isAxiosError(err)) {
            const axiosError = err as AxiosError;
            console.error(`Error getting cart items`, axiosError);
        } else {
            console.warn("An unknown error occurred", err);
            throw err;
        }
    }
}

export const patchCartItem = async (pid: number, quantity: number) => {
    try {
        const res = await axios.patch<GetCartItemDto>(
            `${baseUrl}/cart/${pid}/${quantity}`,
            null,
            await getAuthConfig()
        )
        return res.data
    } catch (err) {
        if (axios.isAxiosError(err)) {
            const axiosError = err as AxiosError;
            console.error(`Error patching cart items`, axiosError);
        } else {
            console.error("An unknown error occurred", err);
        }
        throw err;
    }
}

export const removeCartItem = async (pid: number) => {
    try {
        const res = await axios.delete<GetCartItemDto>(
            `${baseUrl}/cart/${pid}`,
            await getAuthConfig()
        )
        return res.data
    } catch (err) {
        if (axios.isAxiosError(err)) {
            const axiosError = err as AxiosError;
            console.error(`Error removing cart items`, axiosError);
        } else {
            console.error("An unknown error occurred", err);
        }
        throw err;
    }
}
