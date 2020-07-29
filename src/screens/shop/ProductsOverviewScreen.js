import React from 'react';
import { StyleSheet, FlatList, Text } from 'react-native';
import { useSelector } from 'react-redux';

export const ProductsOverviewScreen = () => {
    const products = useSelector(state => state.products.availableProducts);
    return (
        <FlatList data={products} keyExtractor={item=> item.id} renderItem={itemData => <Text>{itemData.item.title}</Text>}/>
    )
}

ProductsOverviewScreen.navigationOptions = {
    title: 'All Products'
}

const style = StyleSheet.create({

});