import React from 'react';
import { ProductsOverviewScreen, ProductDetailScreen, CartScreen, OrdersScreen, UserProductScreen, EditProductScreen, AuthScreen, StartupScreen } from '../screens';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Colours } from '../constants/Colours';
import { Platform } from 'react-native';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Ionicons } from '@expo/vector-icons';

const isAndroid = Platform.OS === 'android' ? true : false;
const defNavOptions = {
    headerStyle: {
        backgroundColor: isAndroid ? Colours.PRIMARY : ''
    },
    headerTitleStyle: {
        fontFamily: 'open-sans-bold'
    },
    headerBackTitleStyle: 'open-sans',
    headerTintColor: isAndroid ? 'white' : Colours.PRIMARY
}

const ProductsNavigator = createStackNavigator({
    ProductsOverview: ProductsOverviewScreen,
    ProductDetails: ProductDetailScreen,
    Cart: CartScreen
}, {
    navigationOptions: {
        drawerIcon: drawerConfig => <Ionicons name={isAndroid ? 'md-cart' : 'ios-cart'} size={23} color={drawerConfig.tintColor}/>
    },
    defaultNavigationOptions: defNavOptions
});

const OrdersNavigator = createStackNavigator({
    Orders: OrdersScreen
}, {
    navigationOptions: {
        drawerIcon: drawerConfig => <Ionicons name={isAndroid ? 'md-list' : 'ios-list'} size={23} color={drawerConfig.tintColor}/>
    },
    defaultNavigationOptions: defNavOptions
});

const UserProductsNavigator = createStackNavigator({
    UserProducts: UserProductScreen,
    EditProducts: EditProductScreen
}, {
    navigationOptions: {
        drawerIcon: drawerConfig => <Ionicons name={isAndroid ? 'md-create' : 'ios-create'} size={23} color={drawerConfig.tintColor}/>
    },
    defaultNavigationOptions: defNavOptions
});

const SideDrawerNavigator = createDrawerNavigator({
    Products: ProductsNavigator,
    Orders: OrdersNavigator,
    MyProducts: UserProductsNavigator
}, {
    contentOptions: {
        activeTintColor: Colours.PRIMARY
    }
});

const AuthNavigator = createStackNavigator({
    Auth: AuthScreen
}, {
    defaultNavigationOptions: defNavOptions
});

const MainNavigator = createSwitchNavigator({
    Startup: StartupScreen,
    Auth: AuthNavigator,
    Shop: SideDrawerNavigator
});

export const ShopNavigator = createAppContainer(MainNavigator)