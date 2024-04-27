import axios, {AxiosError} from 'axios';
import {GetAllProductsDto} from "../data/products/products.type.ts";
import {GetProductDto} from "../data/product/product.type.ts";
import getEnvConfig from "../config/EnvConfig.ts";

const baseUrl = getEnvConfig().baseUrl;

export const getAllProducts = async () => {
    try {
        const res = await axios.get<GetAllProductsDto[]>(`${baseUrl}/public/product`)
        return res.data
    } catch (err) {
        if (axios.isAxiosError(err)) {
            const axiosError = err as AxiosError;
            console.error("Error fetching products", axiosError);
        } else {
            console.error("An unknown error occurred", err);
        }
        throw err;
    }
}

export const getProductDetail = async (pid: string) => {
    try {
        const res = await axios.get<GetProductDto>(`${baseUrl}/public/product/${pid}`)
        return res.data
    } catch (err) {
        if (axios.isAxiosError(err)) {
            const axiosError = err as AxiosError;
            console.error(`Error fetching product ${pid}`, axiosError);
        } else {
            console.error("An unknown error occurred", err);
        }
        throw err;
    }
}