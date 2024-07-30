import { TypesItemsFromCart } from "../redux/@types/TypesForRedux-Toolit"

export const getCartFromLS = () => {
    const data = localStorage.getItem('cart')
    return data ? JSON.parse(data) : []
}

export const getPriceFromLS = () => {
    return getCartFromLS().map((elem:TypesItemsFromCart) => elem.counter * elem.price).reduce((sum:number, current:number) => sum + current, 0)
}

export const getAllPizzaFromLS = () => {
    return getCartFromLS().reduce((sum:number, current:TypesItemsFromCart) => sum + current.counter, 0)
}