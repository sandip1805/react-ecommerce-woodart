import { BehaviorSubject } from "rxjs";

export const CartItems = new BehaviorSubject([]);

export const CartService = {
    addCartItem: (item) => {
      CartItems.next(item);
    },
};