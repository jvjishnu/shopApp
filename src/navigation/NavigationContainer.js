import React, { useEffect, useRef } from 'react'
import { ShopNavigator } from './ShopNavigator';
import { useSelector } from 'react-redux';
import { NavigationActions } from 'react-navigation';

export const NavigationContainer = () => {
    const navRef = useRef();
    const isAuth = useSelector(state => !!state.auth.token);

    useEffect(() => {
        if(!isAuth) {
            navRef.current.dispatch(NavigationActions.navigate({
                routeName: 'Auth'
            }))
        }
    }, [isAuth]);

    return <ShopNavigator ref={navRef}/>
}