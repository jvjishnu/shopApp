import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { CartItem } from './CartItem';
import { Colours } from '../../constants/Colours';
import { Card } from '../UI/Card';

export const OrderItem = ({amount, date, items}) => {
    const [showDetails, setShowDetails] = useState(false);
    return (
        <Card style={styles.orderItem}>
            <View style={styles.summary}>
                <Text style={styles.totalAmount}>${amount.toFixed(2)}</Text>
                <Text style={styles.date}>{date}</Text>
            </View>
            <Button color={Colours.PRIMARY} title={showDetails ? 'Hide Details' : 'Show Details'} onPress={() => 
                setShowDetails(prevState => !prevState)}/>
            {showDetails && 
                <View style={styles.detailItems}>
                    {items.map(item => 
                        <CartItem 
                            key={item.productId}
                            quantity={item.quantity} 
                            title={item.productTitle} 
                            amount={item.sum}/>)}
                </View>}
        </Card>
    );
}

const styles = StyleSheet.create({
    orderItem: {
        margin: 20,
        padding: 10,
        alignItems: 'center'
    },
    summary: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 15
    },
    totalAmount: {
        fontFamily: 'open-sans-bold',
        fontSize: 16
    },
    date: {
        fontFamily: 'open-sans',
        fontSize: 16,
        color: '#888'
    },
    detailItems: {
        width: '100%'
    }
});