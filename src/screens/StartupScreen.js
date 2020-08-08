import React, { useEffect } from 'react'
import { View, ActivityIndicator, StyleSheet, AsyncStorage } from 'react-native';
import { Colours } from '../constants/Colours';
import { authenticate } from '../store/actions/authAct';
import { useDispatch } from 'react-redux';

export const StartupScreen = ({navigation}) => {
    const dispatch = useDispatch();
    useEffect(() => {
        const tryLogin = async () => {
            const userData = await AsyncStorage.getItem('userData');
            if(!userData) {
                navigation.navigate({
                    routeName: 'Auth'
                });
                return;
            }
            const transformedData = JSON.parse(userData);
            const { token, userId, expiryDate } = transformedData;
            const expirationDate = new Date(expiryDate);

            if(expirationDate <= new Date() || !token || !userId) {
                navigation.navigate('Auth');
                return;
            }

            navigation.navigate('Shop');
            dispatch(authenticate(userId, token));
        }

        tryLogin();
    }, [dispatch]);

    return (
        <View style={styles.screen}>
            <ActivityIndicator size={'large'} color={Colours.PRIMARY}/>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});