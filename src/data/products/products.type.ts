export interface GetAllProductsDto {
    pid:         number;
    description: null | string;
    image_url:   string;
    name:        string;
    price:       number;
    has_stock:   number;
}
