import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import { version } from '../../../../package.json';
import { connect } from "react-redux";

const Version = ({colors}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text(colors.form.main)}>Wersja aplikacji</Text>
            <Text style={styles.text(colors.form.second, "bold")}>v{version}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "96%", 
        marginLeft: "2%"
    },
    text: (color, fontWeight="normal") => ({
        color, fontWeight,
        textAlign: "center",
        fontSize: 18
    })
})

const mapStateToProps = state => ({
    colors: state.theme.colors
})

export default connect(mapStateToProps, undefined)(Version);