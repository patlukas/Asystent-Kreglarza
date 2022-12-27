import React from 'react';
import { Text, Button, Animated} from 'react-native';
import MenuBar from '../MenuBar';
import {styles} from "./styles";
import {connect} from "react-redux";
import { onChangeTheme } from '../../actions';
import Results_Window from '../Results_Window/Results_Window';
import Create_Window from '../Create_Window/Create_Window';


class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render () {
        const {selectedWindow, colors, onChangeTheme} = this.props;

        switch(selectedWindow) {
            case 1: 
                return <Animated.View style={styles.container(colors)}><Results_Window/></Animated.View>
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
}

const mapStateToProps = state => ({
    selectedWindow: state.selectedWindow,
    colors: state.theme.colors
})

const mapDispatchToProps = dispatch => ({
  onChangeTheme: () => dispatch(onChangeTheme())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
