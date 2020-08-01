import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TouchableNativeFeedback, Platform } from 'react-native';
import { Card } from '../UI/Card';

const isAndroid = Platform.OS === 'android' ? true : false;
export const ProductItem = ({title, price, image, onSelect, children}) => {
    const TouchableComp = (isAndroid && Platform.Version >= 21) ? TouchableNativeFeedback : TouchableOpacity
    return (
        <Card style={styles.product}>
            <View style={styles.touchable}>
                <TouchableComp onPress={onSelect} useForeground>
                    <View>
                        <View style={styles.imageContainer}>
                            <Image style={styles.image} source={{uri: image}}/>
                        </View>
                        <View style={styles.details}>
                            <Text style={styles.title}>{title}</Text>
                            <Text style={styles.price}>${price.toFixed(2)}</Text>
                        </View>
                        <View style={styles.buttonContainer}>
                            {children}
                        </View>
                    </View>
                </TouchableComp>
            </View>
        </Card>     
    );
}

const styles = StyleSheet.create({
    product: {
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
        height: '23%',
        paddingHorizontal: 20
    },
    details: {
        alignItems: 'center',
        height: '17%',
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