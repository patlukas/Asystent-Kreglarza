import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import {connect} from "react-redux";


const ClearFilterButton = ({colors, onPress}) => {
    const {btnBgColor, btnColor} = colors.result.filter
    return (
        <TouchableOpacity style={styles.container(btnBgColor)} onPress={onPress}>
            <Text style={styles.text(btnColor)}>Wyczyść filtry</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: (backgroundColor) => ({
        backgroundColor,
        paddingVertical: 8,
        paddingHorizontal: 8,
        marginBottom: 7,
        marginHorizontal: 6,
        marginTop: 8,
        borderRadius: 30
    }),
    text: (color) => ({
        color,
        textAlign: "center",
        fontWeight: "bold"
    })
})

const mapStateToProps = state => ({
    colors: state.theme.colors
})

export default connect(mapStateToProps, undefined)(ClearFilterButton);