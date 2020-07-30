import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableNativeFeedback, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons'

const isAndroid = Platform.OS === 'android' ? true : false;
export const CartItem = ({onRemove, quantity, title, amount}) => {
    const TouchableComp = (isAndroid && Platform.Version >= 21) ? TouchableNativeFeedback : TouchableOpacity
    return (
        <View style={styles.cardItem}>
            <View style={styles.itemData}>
                <Text style={styles.quantity}>{quantity}  </Text> 
                <Text style={styles.mainText}>{title}</Text>
            </View>
            <View style={styles.itemData}>
                <Text style={styles.mainText}>${amount}  </Text>
                <TouchableComp onPress={onRemove} style={styles.deleteButton}>
                    <Ionicons name={isAndroid ? 'md-trash' : 'ios-trash'} size={23} color={'red'}/>
                </TouchableComp>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    cardItem: {
        padding: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20
    },
    itemData: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    quantity: {
        fontFamily: 'open-sans',
        color: '#888',
        fontSize: 16
    },
    mainText: {
        fontFamily: 'open-sans-bold',
        fontSize: 16
    },
    deleteButton: {
        marginLeft: 20
    }
});