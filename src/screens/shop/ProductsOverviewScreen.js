import React from 'react';
import { StyleSheet, FlatList, Platform, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { ProductItem } from '../../components';
import { addToCart } from '../../store/actions/cartAct';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { CustomHeaderButton } from '../../components';
import { Colours } from '../../constants/Colours';

const isAndroid = Platform.OS === 'android' ? true : false
export const ProductsOverviewScreen = ({navigation}) => {
    const products = useSelector(state => state.products.availableProducts);
    const dispatch = useDispatch();

    const selectHandler = (id, title) => navigation.navigate({ routeName: 'ProductDetails', params: { 
        productId: id,
        productTitle: title
    }})

    return (
        <FlatList 
            data={products} 
            keyExtractor={item => item.id} 
            renderItem={itemData =>
                <ProductItem 
                    title={itemData.item.title} 
                    price={itemData.item.price} 
                    image={itemData.item.imageUrl} 
                    onSelect={() => selectHandler(itemData.item.id, itemData.item.title)} >
                        <Button color={Colours.PRIMARY} title={'Details'} onPress={() => selectHandler(itemData.item.id, itemData.item.title)}/>
                        <Button color={Colours.PRIMARY} title={'Add to Cart'} onPress={() => {
                            dispatch(addToCart(itemData.item))
                        }}/>
                </ProductItem>
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
            </HeaderButtons>,
        headerLeft: () => 
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item title={'Menu'} iconName={isAndroid ? 'md-menu' : 'ios-menu'} onPress={() => {
                    navData.navigation.toggleDrawer();
                }}/>
            </HeaderButtons>,
    }
}

const style = StyleSheet.create({

});