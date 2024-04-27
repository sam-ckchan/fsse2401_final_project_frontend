import axios from "axios";
import getEnvConfig from "../config/EnvConfig.ts";
import getAuthConfig from "../authService/getAuthConfig.ts";
import {GetTransactionDto} from "../data/transaction/transaction.type.ts";

const baseUrl = getEnvConfig().baseUrl

export const createATransaction = async () => {
    const res = await axios.post<GetTransactionDto>(`${baseUrl}/transaction/prepare`,
        null,
        await getAuthConfig()
    )
        .catch(err => {
            console.warn("Error posting transaction")
            throw err
        })
    return res.data
}

export const getTransaction = async (tid: string): Promise<GetTransactionDto> => {
    try {
        const res = await axios.get<GetTransactionDto>(
            `${baseUrl}/transaction/${tid}`,
            await getAuthConfig()
        )
        return res.data
    } catch (err) {
        console.warn("Error getting transaction: " + tid)
        throw err
    }
}

export const finishTransaction = async (tid: string): Promise<void> => {
    try {
        await axios.patch(`${baseUrl}/transaction/${tid}/pay`, null, await getAuthConfig())
        await axios.patch(`${baseUrl}/transaction/${tid}/finish`, null, await getAuthConfig())
    } catch (err) {
        console.warn("Error completing transaction", err)
        throw err
    }
}