import { registerRootComponent } from 'expo';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import App from './src/components/App';
import rootReducer from "./src/reducers"
import {createStore} from 'redux';

const store = createStore(rootReducer);

registerRootComponent(() => {
    return (
        <>
            <StatusBar style="light" translucent={false}/>
            <Provider store={store}>
                <App />
            </Provider>
        </>
    )
});
