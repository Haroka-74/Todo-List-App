import React, { useState } from 'react';
import { View , TextInput , Button , Text , Pressable } from 'react-native';
import { router } from 'expo-router';
import { register } from '../firebase/auth';

const Register = () => {

    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');
    const [error , setError] = useState('');

    const handlePress = async () => {
        try {
            const credentials = await register(email , password);
            console.log(`credentials ${credentials}`);
            router.navigate('/account/login');
        } catch (error) {
            console.log(`Error ${JSON.stringify(error)}`);
            setError(error);
        }
    };

    return (
        <View style = {{ flex: 1 , justifyContent: 'center' , alignItems: 'center' , backgroundColor: '#F5F5F5' }}>
            <View style={{ width: '80%' , marginBottom: 20 }}>
                <TextInput placeholder = 'Email' value = {email} onChangeText = {setEmail} style = {{ borderWidth: 1 , borderColor: '#ccc' , paddingVertical: 12 , paddingHorizontal: 20 , marginBottom: 20 , width: '100%' , borderRadius: 10 , backgroundColor: '#FFF' }} />
                <TextInput placeholder = 'Password' value = {password} onChangeText = {setPassword} secureTextEntry style = {{ borderWidth: 1 , borderColor: '#ccc' , paddingVertical: 12 , paddingHorizontal: 20 , marginBottom: 20 , width: '100%' , borderRadius: 10 , backgroundColor: '#FFF' }} />
                <Button title = 'Register' onPress = {handlePress} color = '#5E8B7E' />
                {error ? <Text style = {{ color: 'red' , marginTop: 10 , fontSize: 16 , fontWeight: 'bold' , textAlign: 'center' }}> {error.code} </Text> : null}
            </View>
            <View style = {{ alignItems: 'center' }}>
                <Pressable onPress = {() => router.replace('/account/login')}>
                    <Text style = {{ color: '#5E8B7E' , textDecorationLine: 'underline' }}> Already have an account? Login </Text>
                </Pressable>
            </View>
        </View>
    );
};

export default Register;