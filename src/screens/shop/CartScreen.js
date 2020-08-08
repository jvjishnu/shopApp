import React, { useState } from 'react'
import { View, Text, FlatList, StyleSheet, Button, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Colours } from '../../constants/Colours';
import { CartItem, Card } from '../../components';
import { removeFromCart } from '../../store/actions/cartAct';
import { addOrder } from '../../store/actions/ordersAct';

export const CartScreen = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    const dispatch = useDispatch();
    const totalAmount = useSelector(state => state.cart.totalAmount)
    const cartItems = useSelector(state => {
        const transformedCartItems = []
        for(const key in state.cart.items){
            transformedCartItems.push({
                productId: key,
                productTitle: state.cart.items[key].productTitle,
                productPrice: state.cart.items[key].productPrice,
                quantity: state.cart.items[key].quantity,
                sum: state.cart.items[key].sum
            });
        }
        return transformedCartItems.sort((a,b) => a.productId > b.productId ? 1 : -1)
    });

    const sendOrderHandler = async () => {
        setIsLoading(true)
        await dispatch(addOrder(cartItems, totalAmount))
        setIsLoading(false)
    }

    return (
        <View style={styles.screen}>
            <Card style={styles.summary}>
                <Text style={styles.summaryText}>Total: <Text style={styles.amount}>${Math.round(totalAmount.toFixed(2) * 100 ) / 100}</Text></Text>
                {isLoading ?
                    <ActivityIndicator size={'small'} color={Colours.ACCENT}/> 
                    : <Button 
                        color={Colours.ACCENT} 
                        title={'Order Now'} 
                        disabled={cartItems.length === 0}
                        onPress={sendOrderHandler}
                    />
                }
            </Card>
            <FlatList 
                data={cartItems}
                keyExtractor={item => item.productId}
                renderItem={(itemData) => 
                    <CartItem 
                        onRemove={() => dispatch(removeFromCart(itemData.item.productId))} 
                        quantity={itemData.item.quantity} 
                        title={itemData.item.productTitle} 
                        amount={itemData.item.sum}
                        deletable={true}/>
                }
            />
        </View>
    );
}

CartScreen.navigationOptions = {
    title: 'Your Cart'
}

const styles = StyleSheet.create({
    screen: {
        margin: 20
    },
    summary: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        padding: 10
    },
    summaryText: {
        fontFamily: 'open-sans-bold',
        fontSize: 18
    },
    amount: {
        color: Colours.PRIMARY
    }
});