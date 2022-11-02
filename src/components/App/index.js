import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View, Button } from 'react-native';
import MenuBar from '../MenuBar';
import {styles} from "./styles";
import {connect} from "react-redux";
import { onChangeTheme } from '../../actions';


class App extends React.Component {
    render () {
      return (
        <View style={styles.container(this.props.colors)}>
          <Text style={styles.text}>Open up App.js to start working on your app!</Text>
          <StatusBar style="auto" />
          <MenuBar kolorystyka={{backgroundColor: '#000000', colorBtnChecked: "#ff00ff", colorBtnNoChecked: "#00ff00"}}/>
          <Button onPress={() => {this.props.onChangeTheme()}} title={"CLICK"} color={"#ffff00"}/>
        </View>
      );
    }
  }

const mapStateToProps = state => ({
    colors: state.theme.colors
})

const mapDispatchToProps = dispatch => ({
  onChangeTheme: () => dispatch(onChangeTheme())
})


export default connect(mapStateToProps, mapDispatchToProps)(App);
