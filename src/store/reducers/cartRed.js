import { ADD_TO_CART, REMOVE_FROM_CART } from '../actions/cartAct';
import { DELETE_PRODUCT } from '../actions/productsAct';
import { ADD_ORDER } from '../actions/ordersAct';
import { CartItem } from '../../models/cart-item';

const initialState = {
    items: {},
    totalAmount: 0
}

export const cartReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_TO_CART:
            const addedProduct = action.product;
            const productPrice = addedProduct.price;
            const productTitle = addedProduct.title

            let newItem;
            if(state.items[addedProduct.id]) {
                newItem = new CartItem(
                    state.items[addedProduct.id].quantity + 1,
                    productPrice,
                    productTitle,
                    state.items[addedProduct.id].sum + productPrice
                );
            } else {
                newItem = new CartItem(1, productPrice, productTitle, productPrice);
            }
            return {
                ...state,
                items: { ...state.items, [addedProduct.id]: newItem },
                totalAmount: state.totalAmount + productPrice
            };
        case REMOVE_FROM_CART:
            const selectedCartItem = state.items[action.productId]
            const currentQty = selectedCartItem.quantity;
            let updatedCartItem
            if(currentQty > 1) {
                updatedCartItem = new CartItem(
                    selectedCartItem.quantity - 1,
                    selectedCartItem.productPrice,
                    selectedCartItem.productTitle,
                    selectedCartItem.sum - selectedCartItem.productPrice
                )
                updatedCartItem = { ...state.items, [action.productId]: updatedCartItem }
            } else {
                updatedCartItem = { ...state.items };
                delete updatedCartItem[action.productId];
            }
            return {
                ...state,
                items: updatedCartItem,
                totalAmount: state.totalAmount - selectedCartItem.productPrice
            }
        case ADD_ORDER:
            return initialState;
        case DELETE_PRODUCT:
            if (!state.items[action.productId]) {
                return state;
            }
            const updatedItems = { ...state.items }
            const itemTotal = state.items[action.productId].sum
            delete updatedItems[action.productId]
            return { 
                ...state,
                items: updatedItems,
                totalAmount: state.totalAmount - itemTotal
             }
    }
    return state;
}