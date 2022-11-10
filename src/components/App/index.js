import React from 'react';
import { Text, View, Button } from 'react-native';
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
                return <Results_Window />
            case 4:
                return <Create_Window />;
            default:
                return (
                    <View style={styles.container(colors)}>
                        <Text style={styles.text}>Open up App.js to start working on your app!</Text>
                        <Button onPress={onChangeTheme} title={"CLICK"} color={"#ffff00"}/>
                        <MenuBar />
                    </View>
                );
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
