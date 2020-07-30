import React from 'react';
import { ScrollView, Button, StyleSheet, View, Text, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Colours } from '../../constants/Colours';
import { addToCart } from '../../store/actions/cartAct';

export const ProductDetailScreen = ({navigation}) => {
    const productId = navigation.getParam('productId');
    const selectedProduct = useSelector(state => 
        state.products.availableProducts.find(product => product.id === productId)
    );
    const dispatch = useDispatch();

    return (
        <ScrollView>
            <Image style={styles.image} source={{uri: selectedProduct.imageUrl}}/>
            <View style={styles.buttonContainer}>
                <Button color={Colours.PRIMARY} title={'Add to Cart'} onPress={() => {
                    dispatch(addToCart(selectedProduct))
                }}/>
            </View>
            <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
            <Text style={styles.description}>{selectedProduct.description}</Text>
        </ScrollView>
    );
}

ProductDetailScreen.navigationOptions = (navigationData) => {
    return {
        title: navigationData.navigation.getParam('productTitle')
    }
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 300
    },
    price: {
        fontSize: 20,
        color: '#888',
        textAlign: 'center',
        marginVertical: 20,
        fontFamily: 'open-sans-bold'
    },
    description: {
        fontSize: 14,
        textAlign: 'center',
        marginHorizontal: 20,
        fontFamily: 'open-sans'
    },
    buttonContainer: {
        marginVertical: 10,
        alignItems: "center"
    }
});