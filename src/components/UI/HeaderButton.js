import React from 'react'
import { HeaderButton } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';
import { Colours } from '../../constants/Colours';
import { Platform } from 'react-native';

const isAndroid = Platform.OS === 'android' ? true : false
export const CustomHeaderButton = (props) => {
    return <HeaderButton {...props} IconComponent={Ionicons} iconSize={23} color={isAndroid ? 'white' : Colours.PRIMARY}/>
}