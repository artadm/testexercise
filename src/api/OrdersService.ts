import axios from 'axios'
import { IOrder } from '../modals/IOrder';

export default class OrdersService {
    static async getAll(page = 1) {
        let response = await axios.get(`http://212.112.102.2:5666/api/orders/researches-with-prices`, {
            params: {
                page,
                size: 20,
            }
        })
        return response.data;
    }
}
