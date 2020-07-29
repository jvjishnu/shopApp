import { ProductsOverviewScreen } from '../screens';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Colours } from '../constants/Colours';
import { Platform } from 'react-native';

const isAndroid = Platform.OS === 'android' ? true : false
const ProductsNavigator = createStackNavigator({
    ProductsOverview: ProductsOverviewScreen
}, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: isAndroid ? Colours.PRIMARY : ''
        },
        headerTintColor: isAndroid ? 'white' : Colours.PRIMARY
    }
});

export const ShopNavigator = createAppContainer(ProductsNavigator)