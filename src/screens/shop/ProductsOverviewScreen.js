import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, FlatList, Platform, Button, ActivityIndicator, View, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { ProductItem } from '../../components';
import { addToCart } from '../../store/actions/cartAct';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { CustomHeaderButton } from '../../components';
import { Colours } from '../../constants/Colours';
import { fetchProducts } from '../../store/actions/productsAct';

const isAndroid = Platform.OS === 'android' ? true : false
export const ProductsOverviewScreen = ({navigation}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState();
    const products = useSelector(state => state.products.availableProducts);
    const dispatch = useDispatch();

    const loadProducts = useCallback(async () => {
        setError(null);
        setIsRefreshing(true);
        try {
            await dispatch(fetchProducts())
        }
        catch(err) {
            setError(err.message)
        }
        setIsRefreshing(false);
    }, [dispatch, setIsLoading, setError])

    useEffect(() => {
        const willFocusSub = navigation.addListener('willFocus', loadProducts);

        return () => {
            willFocusSub.remove();
        }
    }, [loadProducts]);

    useEffect(() => {
        setIsLoading(true);
        loadProducts().then(() => {
            setIsLoading(false);
        });
    }, [dispatch, loadProducts]);

    const selectHandler = (id, title) => navigation.navigate({ routeName: 'ProductDetails', params: { 
        productId: id,
        productTitle: title
    }})

    if(error) {
        return (
            <View style={styles.centered}>
                <Text>An error occured.</Text>
                <Button title={'Retry'} color={Colours.PRIMARY} onPress={loadProducts}/>
            </View>
        )
    }

    if(isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size={'large'} color={Colours.PRIMARY}/>
            </View>
        );
    }

    if(!isLoading && products.length === 0) {
        return (
            <View style={styles.centered}>
                <Text>No data available</Text>
            </View>
        )
    }

    return (
        <FlatList 
            onRefresh={loadProducts}
            refreshing={isRefreshing}
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

const styles = StyleSheet.create({
    centered: { 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center' 
    }
});