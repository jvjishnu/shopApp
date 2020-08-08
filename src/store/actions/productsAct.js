import { Product } from '../../models/product';

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const EDIT_PRODUCT = 'EDIT_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

export const fetchProducts = () => {
    return async dispatch => {
        try {
            const response = await fetch('https://shopapp-62996.firebaseio.com/products.json');

            if(!response.ok) {
                throw new Error('Something went wrong');
            }            

            const resData = await response.json();
            const loadedProducts = [];

            for(const key in resData) {
                loadedProducts.push(new Product(
                    key,
                    'u1',
                    resData[key].title,
                    resData[key].imageUrl,
                    resData[key].description,
                    resData[key].price
                ))
            }
            
            dispatch({ type: SET_PRODUCTS, products: loadedProducts })
        }
        catch(err) {
            throw err;
        }
    }
}

export const deleteProduct = (productId) => {
    return async dispatch => {
        const response = await fetch(`https://shopapp-62996.firebaseio.com/products/${productId}.json`, {
            method: 'DELETE'
        });

        if(!response.ok) {
            throw new Error('Something went wrong')
        }

        dispatch({ type: DELETE_PRODUCT, productId: productId })
    }
}

export const createProduct = (title, imageUrl, price, description) => {
    return async dispatch => {
        const response = await fetch('https://shopapp-62996.firebaseio.com/products.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/.json'
            },
            body: JSON.stringify({
                title,
                imageUrl,
                price,
                description
            })
        });

        const resData = await response.json();

        dispatch({
            id: resData.name,
            type: CREATE_PRODUCT, productData: { 
            title: title,
            imageUrl: imageUrl,
            price, price,
            description: description
        }})
    }
}

export const editProduct = (id, title, imageUrl, description) => {
    return async dispatch => {
        const response = await fetch(`https://shopapp-62996.firebaseio.com/products/${id}.json`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/.json'
            },
            body: JSON.stringify({
                title,
                imageUrl,
                description
            })
        });

        if(!response.ok) {
            throw new Error('Something went wrong')
        }

        dispatch({ type: EDIT_PRODUCT, productId:id , productData: { 
            title: title,
            imageUrl: imageUrl,
            description: description
        }})
    }
}