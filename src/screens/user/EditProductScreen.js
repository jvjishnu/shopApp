import React, { useEffect, useCallback, useReducer } from 'react'
import { View, StyleSheet, ScrollView, Platform, Alert, KeyboardAvoidingView } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { CustomHeaderButton, Input } from '../../components';
import { useSelector, useDispatch } from 'react-redux';
import { createProduct, editProduct } from '../../store/actions/productsAct';

const FORM_UPDATE = 'FORM_UPDATE'

const formReducer = (state, action) => {
    if(action.type === FORM_UPDATE) {
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        };
        const updatedValidites = {
            ...state.inputValidities,
            [action.input]: action.isValid
        }
        let formIsValid = true;
        for(const key in updatedValidites) {
            formIsValid = formIsValid && updatedValidites[key];
        }
        return {
            inputValues: updatedValues,
            inputValidities: updatedValidites,
            isFormValid: formIsValid
        }
    }
    return state;
}

const isAndroid = Platform.OS === 'android' ? true : false;
export const EditProductScreen = ({navigation}) => {
    const dispatch = useDispatch();
    const prodId = navigation.getParam('productId')
    const selectedProduct = useSelector(state => state.products.userProducts.find(product => product.id === prodId));

    const [formState, dispatchFormState] = useReducer(formReducer, { 
        inputValues: {
            title: selectedProduct ? selectedProduct.title : '',
            imgUrl: selectedProduct ? selectedProduct.imageUrl : '',
            price: '',
            desc: selectedProduct ? selectedProduct.description : ''
        }, 
        inputValidities: {
            title: selectedProduct ? true : false,
            imgUrl: selectedProduct ? true : false,
            price: selectedProduct ? true : false,
            desc: selectedProduct ? true : false
        }, 
        isFormValid: selectedProduct ? true : false }
    );

    const submitHandler = useCallback(() => {
        if(!formState.isFormValid) {
            Alert.alert('Wrong Input', 'Please check the value you have entered', [
                {text: 'Okay'}
            ])
            return;
        }
        if(selectedProduct) {
            dispatch(editProduct(
                prodId, 
                formState.inputValues.title, 
                formState.inputValues.imgUrl, 
                formState.inputValues.desc
            ));
        } else {
            dispatch(createProduct(
                formState.inputValues.title, 
                formState.inputValues.imgUrl, 
                +formState.inputValues.price, 
                formState.inputValues.desc
            ));
        }
        navigation.pop();
    }, [dispatch, prodId, formState]);

    useEffect(() => {
        navigation.setParams({ submit: submitHandler })
    }, [submitHandler]);

    const inputChangeHandler = useCallback((inputId, value, isValid) => {
        dispatchFormState({
            type: FORM_UPDATE,
            value: value,
            isValid: isValid,
            input: inputId
        })
    }, [dispatchFormState]);

    return (
        <KeyboardAvoidingView behavior={'padding'} keyboardVerticalOffset={100}>
            <ScrollView>
                <View style={styles.form}>
                    <Input 
                        id={'title'}
                        initialValue={selectedProduct ? selectedProduct.title : ''}
                        initialValid={!!selectedProduct}
                        label={'Title'}
                        keyboardType={'default'}
                        returnKeyType={'next'}
                        autoCorrect
                        autoCapitalize={'sentences'}
                        onInputChange={inputChangeHandler}
                        required
                    />
                    <Input 
                        id={'imgUrl'}
                        initialValue={selectedProduct ? selectedProduct.imgUrl : ''}
                        initialValid={!!selectedProduct}
                        label={'Image URL'}
                        keyboardType={'default'}
                        returnKeyType={'next'}
                        onInputChange={inputChangeHandler}
                        required
                    />
                    {selectedProduct ? null :
                        <Input 
                            id={'price'}
                            initialValue={selectedProduct ? selectedProduct.price : ''}
                            initialValid={!!selectedProduct}
                            label={'Price'}
                            keyboardType={'decimal-pad'}
                            returnKeyType={'next'}
                            onInputChange={inputChangeHandler}
                            required
                            min={0.1}
                        />
                    }
                    <Input 
                        id={'desc'}
                        initialValue={selectedProduct ? selectedProduct.desc : ''}
                        initialValid={!!selectedProduct}
                        label={'Description'}
                        keyboardType={'default'}
                        multiline
                        numberOfLines={3}
                        autoCapitalize={'sentences'}
                        onInputChange={inputChangeHandler}
                        required
                        minLength={5}
                    />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

EditProductScreen.navigationOptions = (navData) => {
    const subHandler = navData.navigation.getParam('submit')
    return {
        title: navData.navigation.getParam('productId') ? 'Edit Product' : 'Add Product',
        headerRight: () =>
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item title={'Save'} iconName={isAndroid ? 'md-checkmark' : 'ios-checkmark'} onPress={subHandler}/>
            </HeaderButtons>,
    }
}

const styles = StyleSheet.create({
    form: {
        margin: 20
    },
    formControl: {
        width: '100%'
    },
    label: {
        fontFamily: 'open-sans-bold',
        marginVertical: 8
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    }
});