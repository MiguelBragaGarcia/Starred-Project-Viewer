import React from 'react';
import {StatusBar} from 'react-native';
import './config/ReactotronConfig';
// Por questões de debug mantenha todas as importações de código criado depois do reactotron
import Routes from './routes';

export default function App() {
    return (
        <>
            <StatusBar backgroundColor="#7159c1" barStyle="ligh-content" />
            <Routes />
        </>
    );
}
