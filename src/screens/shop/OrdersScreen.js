import React, { useEffect, useState } from 'react';
import { FlatList, Platform, View, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { CustomHeaderButton, OrderItem } from '../../components';
import { fetchOrders } from '../../store/actions/ordersAct';
import { Colours } from '../../constants/Colours';

const isAndroid = Platform.OS === 'android' ? true : false
export const OrdersScreen = () => {
    const [isLoading, setIsLoading] = useState(false);
    const orders = useSelector(state => state.orders.orders);
    const dispatch = useDispatch();

    useEffect(() => {
        const loadOrders = async () => {
            setIsLoading(true);
            await dispatch(fetchOrders());
            setIsLoading(false);
        }
        loadOrders();
    }, [dispatch]);

    if(isLoading) {
        <View style={{ flex:1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size={'large'} color={Colours.PRIMARY}/>
        </View>
    }

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