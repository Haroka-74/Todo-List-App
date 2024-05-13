import React , { useState } from 'react';
import { View , TextInput , Button , Text , Pressable } from 'react-native';
import { router } from 'expo-router';
import { reset } from '../firebase/auth';

const ForgetPassword = () => {

    const [email , setEmail] = useState('');
    const [error , setError] = useState('');

    const handleReset = async () => {
        try {
            await reset(email);
            // console.log('Password Reset Successfully');
            alert('Email for reset password sent successfully');
        } catch (error) {
            console.log(`Error ${JSON.stringify(error)}`);
            setError(error);
        }
    };

    return (
        <View style = {{ flex: 1 , justifyContent: 'center' , alignItems: 'center' , backgroundColor: '#F5F5F5' }}>
            <View style={{ width: '80%' , marginBottom: 20 }}>
                <TextInput placeholder = 'Email' value = {email} onChangeText = {setEmail} style = {{ borderWidth: 1 , borderColor: '#ccc' , paddingVertical: 12 , paddingHorizontal: 20 , marginBottom: 20 , width: '100%' , borderRadius: 8 , backgroundColor: '#FFF' }} />
                <Button title = 'Reset' onPress = {handleReset} color = '#5E8B7E' />
                {error ? <Text style = {{ color: 'red' , marginTop: 10 , fontSize: 16 , fontWeight: 'bold' , textAlign: 'center' }}> {error.code} </Text> : null}
            </View>
            <View style={{ alignItems: 'center' }}>
                <Pressable onPress = {() => router.replace('/account/register')}>
                    <Text style = {{ color: '#5E8B7E' , textDecorationLine: 'underline' , marginTop: 10 }}> Register </Text>
                </Pressable>
                <Pressable onPress={() => router.replace('/account/login')}>
                    <Text style = {{ color: '#5E8B7E' , textDecorationLine: 'underline' , marginTop: 10 }}> Login </Text>
                </Pressable>
            </View>
        </View>
    );
};

export default ForgetPassword;