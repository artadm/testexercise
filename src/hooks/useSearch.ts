import { useMemo } from "react";
import { IOrder } from "../modals/IOrder";

export const useSortedOrders = (orders: any[], params: { value: string, enums: string }) => {
    const sortedPosts = useMemo(() => {
        if (params.enums == "asc") {
            return [...orders].sort((a, b) => a[params.value] - b[params.value])
        } else if (params.enums == "desc") {
            return [...orders].sort((a, b) => b[params.value] - a[params.value])
        } else {
            return orders;
        }

    }, [params, orders])

    return sortedPosts;
}


export const UseSearch = (orders: IOrder[], search: string, params: { value: string, enums: string }) => {
    const sortedOrders = useSortedOrders(orders, params)
    const sortedAndSearchedPosts = useMemo(() => {
        return sortedOrders.filter(order => order.code.toLowerCase().includes(search.toLowerCase()))
    }, [orders])

    return sortedAndSearchedPosts;
}