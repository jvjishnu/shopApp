import React, { useState, useReducer, useCallback, useEffect } from 'react';
import { ScrollView, View, KeyboardAvoidingView, Button, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { Input, Card } from '../../components';
import { Colours } from '../../constants/Colours';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch } from 'react-redux';
import { signup, login } from '../../store/actions/authAct';

const FORM_UPDATE = "FORM_UPDATE";

const formReducer = (state, action) => {
    if (action.type === FORM_UPDATE) {
      const updatedValues = {
        ...state.inputValues,
        [action.input]: action.value,
      };
      const updatedValidites = {
        ...state.inputValidities,
        [action.input]: action.isValid,
      };
      let formIsValid = true;
      for (const key in updatedValidites) {
        formIsValid = formIsValid && updatedValidites[key];
      }
      return {
        inputValues: updatedValues,
        inputValidities: updatedValidites,
        isFormValid: formIsValid,
      };
    }
    return state;
  };
  

export const AuthScreen = ({navigation}) => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const dispatch = useDispatch();

    useEffect(() => {
        if(error) {
            Alert.alert('An Error Occured', error, [{ text: 'Okay' }])
        }

    }, [error]);

    const authHandler = async () => {
        let action;
        if(isSignUp) {
            action = signup(formState.inputValues.email, formState.inputValues.password);
        } else {
            action = login(formState.inputValues.email, formState.inputValues.password);
        }  
        setError(null);
        setIsLoading(true);
        try {
            await dispatch(action);
            navigation.navigate({
                routeName: 'Shop'
            })
        }
        catch(err) {
            setError(err.message);
            setIsLoading(false);
        }
    }

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
          email: '',
          password: ''
        },
        inputValidities: {
          email: false,
          password: false
        },
        isFormValid: false
      });

    const inputChangeHandler = useCallback(
    (inputId, value, isValid) => {
        dispatchFormState({
        type: FORM_UPDATE,
        value: value,
        isValid: isValid,
        input: inputId,
        });
    },
    [dispatchFormState]
    );

    return (
        <KeyboardAvoidingView behavior={'height'} keyboardVerticalOffset={20} style={styles.screen}>
            <LinearGradient colors={['#ffedff', '#ffe3ff']} style={styles.gradient}>
                <Card style={{width: '80%', alignItems: 'center'}}>
                    <ScrollView style={styles.authContainer}>
                        <Input 
                            id={'email'}
                            label={'Email'}
                            keyboardType={'email-address'}
                            required
                            email
                            autoCapitalize={'none'}
                            onInputChange={inputChangeHandler}
                            initalValue={''}
                        />
                        <Input 
                            id={'password'}
                            label={'Password'}
                            keyboardType={'default'}
                            secureTextEntry
                            required
                            minLength={5}
                            autoCapitalize={'none'}
                            onInputChange={inputChangeHandler}
                            initalValue={''}
                        />
                        <View style={styles.buttonContainer}>
                            {isLoading ? 
                                <ActivityIndicator color={Colours.PRIMARY} size={'small'}/>
                                :<Button title={isSignUp ? 'Sign Up' :'Login'} color={Colours.PRIMARY} onPress={authHandler}/>}
                        </View>
                        <View style={styles.buttonContainer}>
                            <Button title={`Switch to ${isSignUp ? 'Login' : 'Sign Up'}`} color={Colours.ACCENT} onPress={() =>
                                setIsSignUp(prevState => !prevState)
                            }/>
                        </View>
                    </ScrollView>
                </Card>
            </LinearGradient>
        </KeyboardAvoidingView>
    );
}

AuthScreen.navigationOptions = {
    title: 'Authenticate'
}

const styles = StyleSheet.create({
    authContainer: {
        width: '80%',
        maxWidth: 400,
        maxHeight: 400,
        padding: 20
    },
    screen: {
        flex: 1,
    },
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        marginTop: 10
    }
});