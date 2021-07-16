import React, { useState } from 'react';
import './App.css';
import GameContainer from './Components/GameContainer';
import i18n from './i18n_NEW';

function App(props: AppProps): JSX.Element {
    const [language, setLanguage] = useState('en');

    function toggleLanguage() {
        if (language === 'en') {
            setLanguage('es');
            props.i18n.changeLanguage('es');
        } else {
            setLanguage('en');
            props.i18n.changeLanguage('en');
        }
    }

    return (
        <div className="App">
            <button onClick={() => toggleLanguage()}> Toggle Language</button>
            <GameContainer></GameContainer>
        </div>
    );
}

export default App;

type AppProps = { i18n: typeof i18n };
