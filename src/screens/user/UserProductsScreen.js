import React from 'react'
import { FlatList, Platform, Button, Alert } from 'react-native';
import { ProductItem } from '../../components';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { CustomHeaderButton } from '../../components';
import { Colours } from '../../constants/Colours';
import { deleteProduct } from '../../store/actions/productsAct';

const isAndroid = Platform.OS === 'android' ? true : false;
export const UserProductScreen = ({navigation}) => {
    const userProducts = useSelector(state => state.products.userProducts);
    const dispatch = useDispatch();

    const deleteHandler = (id) => {
        Alert.alert('Are you sure?', 'Do you really want to delete this product?', [
            {text: 'No', style: 'default'},
            {text: 'Yes', style: 'destructive', onPress: () => {
                dispatch(deleteProduct(id))
            }}
        ]);
    }

    const selectHandler = (id) => navigation.navigate({ routeName: 'EditProducts', params: { 
        productId: id,
    }})

    return (
        <FlatList 
            data={userProducts}
            keyExtractor={item => item.id}
            renderItem={itemData =>
                <ProductItem 
                    title={itemData.item.title} 
                    price={itemData.item.price} 
                    image={itemData.item.imageUrl} 
                    onSelect={() => selectHandler(itemData.item.id)} > 
                        <Button color={Colours.PRIMARY} title={'Edit'} onPress={() => selectHandler(itemData.item.id)}/>
                        <Button color={Colours.PRIMARY} title={'Delete'} onPress={() => deleteHandler(itemData.item.id)}/>
                    </ProductItem>}/>
    );
}

UserProductScreen.navigationOptions = (navData) => {
    return {
        title: 'Your Products',
        headerLeft: () => 
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item title={'Menu'} iconName={isAndroid ? 'md-menu' : 'ios-menu'} onPress={() => {
                    navData.navigation.toggleDrawer();
                }}/>
            </HeaderButtons>,
        headerRight: () => 
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item title={'Add Product'} iconName={isAndroid ? 'md-create' : 'ios-create'} onPress={() => {
                    navData.navigation.navigate({
                        routeName: 'EditProducts'
                    });
                }}/>
            </HeaderButtons>,
    }
}