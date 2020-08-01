export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const EDIT_PRODUCT = 'EDIT_PRODUCT';

export const deleteProduct = (productId) => {
    return { type: DELETE_PRODUCT, productId: productId }
}

export const createProduct = (title, imageUrl, price, description) => {
    return { type: CREATE_PRODUCT, productData: { 
        title: title,
        imageUrl: imageUrl,
        price, price,
        description: description
    }}
}

export const editProduct = (id, title, imageUrl, description) => {
    return { type: EDIT_PRODUCT, productId:id , productData: { 
        title: title,
        imageUrl: imageUrl,
        description: description
    }}
}