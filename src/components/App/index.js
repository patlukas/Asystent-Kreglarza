import React from 'react';
import { Text, Button, Animated} from 'react-native';
import MenuBar from '../MenuBar';
import {styles} from "./styles";
import {connect} from "react-redux";
import { onChangeTheme, onSetTheme, onSetListOfResults, onSetCreateResult, onLoadSettings } from '../../actions';
import Results_Window from '../Results_Window/Results_Window';
import Settings_Window from '../Settings_Window/Settings_Window';
import Create_Window from '../Create_Window/Create_Window';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SplashScreen from 'expo-splash-screen';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.loadDataFromLocalStorage()
    }
    render () {
        const {selectedWindow, colors, onChangeTheme} = this.props;
        switch(selectedWindow) {
            case 1: 
                return <Animated.View style={styles.container(colors)}><Results_Window/></Animated.View>
            case 3: 
                return <Animated.View style={styles.container(colors)}><Settings_Window/></Animated.View>
            case 4: 
                return <Animated.View style={styles.container(colors)}><Create_Window/></Animated.View>
            default:
                return (
                    <Animated.View style={styles.container(colors)}>
                        <Text style={styles.text}>Open up App.js to start working on your app!</Text>
                        <Button onPress={onChangeTheme} title={"CLICK"} color={"#ffff00"}/>
                        <MenuBar />
                    </Animated.View>
                )
        }
    }
    async loadDataFromLocalStorage () {
        try {
            const theme = await AsyncStorage.getItem('@theme')
            const listOfResults = await AsyncStorage.getItem('@listOfResults')
            const createResult = await AsyncStorage.getItem('@createResult')
            const settings = await AsyncStorage.getItem('@settings')
            if(theme !== null) this.props.onSetTheme(theme)
            if(listOfResults !== null) this.props.onSetListOfResults(JSON.parse(listOfResults))
            if(createResult !== null) this.props.onSetCreateResult(JSON.parse(createResult))
            if(settings !== null) this.props.onLoadSettings(JSON.parse(settings))
            setTimeout(SplashScreen.hideAsync, 500)
        } catch(e) {console.log(e)}
    }
}

const mapStateToProps = state => ({
    selectedWindow: state.selectedWindow,
    colors: state.theme.colors
})

const mapDispatchToProps = dispatch => ({
    onChangeTheme: () => dispatch(onChangeTheme()),
    onSetTheme: (theme) => dispatch(onSetTheme(theme)),
    onSetListOfResults: (listOfResults) => dispatch(onSetListOfResults(listOfResults)),
    onSetCreateResult: (createResult) => dispatch(onSetCreateResult(createResult)),
    onLoadSettings: (settings) => dispatch(onLoadSettings(settings))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
