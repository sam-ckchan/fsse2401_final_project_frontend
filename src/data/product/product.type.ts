export interface GetProductDto {
    pid: number;
    name: string;
    description: null | string;
    price: number;
    stock: number;
    image_url: string;
}
