import { registerRootComponent } from 'expo';
//import react from 'react';
import { Provider } from 'react-redux';
import App from './src/components/App';
import rootReducer from "./src/reducers"
import {createStore} from 'redux';

const store = createStore(rootReducer);

registerRootComponent(function() {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    )
});
