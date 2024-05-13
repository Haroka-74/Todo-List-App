import { SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Register from '../components/Register';
export default function Home () {
    return (
        <SafeAreaView style = {{ flex: 1 , backgroundColor: '#FFF' }}>
            <Register />
            <StatusBar style = 'auto' />
        </SafeAreaView>
    );
};