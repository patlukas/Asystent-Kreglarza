import React from 'react';
import {TouchableOpacity, StyleSheet, Text} from 'react-native';
import {connect} from "react-redux";
import Checkbox from 'expo-checkbox';

const CheckboxSelection = ({title, colors, onChange, value}) => {
    const {second} = colors.result.filter
    return (
        <TouchableOpacity onPress={onChange} style={styles.optionContainer}>
            <Checkbox value={value} onValueChange={onChange} color={second}/>
            <Text style={styles.optionText(second)}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    optionContainer: {
        flexWrap: 'wrap', 
        flexDirection: 'row',
        paddingTop: 5,
        paddingBottom: 5,
        width: "100%",
        paddingLeft: 7
    },
    optionText: (color) => ({
        color,
        paddingLeft: 5,
    }),
})

const mapStateToProps = state => ({
    colors: state.theme.colors
})

export default connect(mapStateToProps, undefined)(CheckboxSelection);