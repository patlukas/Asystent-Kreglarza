import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView, BackHandler} from 'react-native';
import { connect } from "react-redux";
import {onSelectWindow} from '../../../actions';
import MenuBar from '../../MenuBar';
import HomePlaceDropdown from '../HomePlaceDropdown';
import ThemeDropdown from '../ThemeDropdown';
import TrainingPlaceDropdown from '../TrainingPlaceDropdown';
import UsedMemory from '../UsedMemory';
import Version from '../Version';

class Settings_Window extends Component {
    constructor(props) {
        super(props);
        this.onBack = this.onBack.bind(this)
    }
    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.onBack)
    }
    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.onBack)
    }
    onBack() {
        this.props.onSelectWindow(1)
        return true
    }
    render() {
        const {colors} = this.props
        const {backgroundColor, color} = colors.barTop
        return (
            <>
                <Text style={styles.topBar(backgroundColor, color)}>Ustawienia</Text>
                <ScrollView style={{backgroundColor: colors.backgroundColor, width: "100%"}}>
                    <View style={{height: 20}} />
                    <ThemeDropdown />
                    <View style={styles.separator(colors.form.main)} />
                    <HomePlaceDropdown />
                    <View style={styles.separator(colors.form.main)} />
                    <TrainingPlaceDropdown />
                    <View style={styles.separator(colors.form.main)} />
                    <UsedMemory />
                    <View style={styles.separator(colors.form.main)} />
                    <Version />
                </ScrollView>
                <MenuBar />
            </>
        );
    }
}

const styles = StyleSheet.create({
    topBar: (backgroundColor, color) => ({
        color, backgroundColor,
        height: 39,
        width: "100%",
        textAlign: "center",
        textAlignVertical: "center",
        fontSize: 25,
        fontWeight: "bold"
    }),
    resultsContainer: {
        marginBottom: 42, 
        flex: 1, 
        width: "100%",
        height: "100%"
    },
    separator: (borderColor) => ({
        borderColor, 
        borderTopWidth: 3, 
        marginTop: 15, 
        marginBottom: 15, 
        width: "100%"
    })
})

const mapStateToProps = state => ({
    colors: state.theme.colors
})

const mapDispatchToProps = dispatch => ({
    onSelectWindow: (windowId) => dispatch(onSelectWindow(windowId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Settings_Window);