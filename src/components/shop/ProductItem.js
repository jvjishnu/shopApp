import React from 'react';
import { View, Text, StyleSheet, Image, Button, TouchableOpacity, TouchableNativeFeedback, Platform } from 'react-native'
import { Colours } from '../../constants/Colours';

const isAndroid = Platform.OS === 'android' ? true : false;
export const ProductItem = ({title, price, image, onViewDetial, addToCart}) => {
    const TouchableComp = (isAndroid && Platform.Version >= 21) ? TouchableNativeFeedback : TouchableOpacity
    return (
        <View style={styles.product}>
            <View style={styles.touchable}>
                <TouchableComp onPress={onViewDetial} useForeground>
                    <View>
                        <View style={styles.imageContainer}>
                            <Image style={styles.image} source={{uri: image}}/>
                        </View>
                        <View style={styles.details}>
                            <Text style={styles.title}>{title}</Text>
                            <Text style={styles.price}>${price.toFixed(2)}</Text>
                        </View>
                        <View style={styles.buttonContainer}>
                            <Button color={Colours.PRIMARY} title={'Details'} onPress={onViewDetial}/>
                            <Button color={Colours.PRIMARY} title={'Add to Cart'} onPress={addToCart}/>
                        </View>
                    </View>
                </TouchableComp>
            </View>
        </View>     
    );
}

const styles = StyleSheet.create({
    product: {
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
        height: 250,
        margin: 20
    },
    image: {
        width: '100%',
        height: '100%'
    },
    title: {
        fontSize: 18,
        marginVertical: 2,
        fontFamily: 'open-sans-bold'
    },
    price: {
        fontSize: 14,
        color: '#888',
        fontFamily: 'open-sans'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '25%',
        paddingHorizontal: 20
    },
    details: {
        alignItems: 'center',
        height: '15%',
        padding: 10
    },
    imageContainer: {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: 'hidden',
        width: '100%',
        height: '60%'
    },
    touchable: {
        overflow: 'hidden',
        borderRadius: 10
    }
});