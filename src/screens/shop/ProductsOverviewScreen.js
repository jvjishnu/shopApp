import React from 'react';
import { StyleSheet, FlatList, Platform } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { ProductItem } from '../../components';
import { addToCart } from '../../store/actions/cartAct';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { CustomHeaderButton } from '../../components';

const isAndroid = Platform.OS === 'android' ? true : false
export const ProductsOverviewScreen = ({navigation}) => {
    const products = useSelector(state => state.products.availableProducts);
    const dispatch = useDispatch();
    return (
        <FlatList 
            data={products} 
            keyExtractor={item => item.id} 
            renderItem={itemData =>
                <ProductItem 
                    title={itemData.item.title} 
                    price={itemData.item.price} 
                    image={itemData.item.imageUrl} 
                    onViewDetial={() => navigation.navigate({ routeName: 'ProductDetails', params: { 
                        productId: itemData.item.id,
                        productTitle: itemData.item.title
                    }})} 
                    addToCart={() => {
                        dispatch(addToCart(itemData.item))
                    }} />
            }
        />
    )
}

ProductsOverviewScreen.navigationOptions = (navData) => {
    return {
        title: 'All Products',
        headerRight: () =>
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item title={'Cart'} iconName={isAndroid ? 'md-cart' : 'ios-cart'} onPress={() => {
                    navData.navigation.navigate({routeName: 'Cart'})
                }}/>
            </HeaderButtons>
    }
}

const style = StyleSheet.create({

});