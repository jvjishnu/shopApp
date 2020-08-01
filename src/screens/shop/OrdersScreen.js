import React from 'react';
import { FlatList, Text, Platform } from 'react-native';
import { useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { CustomHeaderButton, OrderItem } from '../../components';

const isAndroid = Platform.OS === 'android' ? true : false
export const OrdersScreen = () => {
    const orders = useSelector(state => state.orders.orders)

    return <FlatList 
        data={orders}
        keyExtractor={item => item.id}
        renderItem={(itemData) => 
            <OrderItem amount={itemData.item.totalAmount} date={itemData.item.readableDate} items={itemData.item.items}/>
        }/>
}

OrdersScreen.navigationOptions = (navData) => {
    return {
        title: 'Your Orders',
        headerLeft: () => 
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item title={'Menu'} iconName={isAndroid ? 'md-menu' : 'ios-menu'} onPress={() => {
                    navData.navigation.toggleDrawer();
                }}/>
            </HeaderButtons>
    }
} 