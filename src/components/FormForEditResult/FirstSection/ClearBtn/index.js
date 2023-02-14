import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import { connect } from "react-redux";
import PropTypes from 'prop-types';

const ClearBtn = ({colors, name, onPress}) => {
    return (
        <TouchableOpacity style={styles.button(colors)} onPress={onPress} >
            <Text style={styles.buttonText(colors)}>{name}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: (colors) => ({
        padding: 10,
        paddingLeft: 25,
        paddingRight: 25,
        alignItems: "center",
        marginRight: 'auto',
        marginLeft: 'auto',
        borderRadius: 10,
        backgroundColor: colors.form.clearBtn.backgroundColor
    }),
    buttonText: (colors) => ({
        color: colors.form.clearBtn.color,
        fontWeight: "bold",
        fontSize: 15
    })
})

ClearBtn.propTypes = {
    name: PropTypes.string.isRequired,
    onPress: PropTypes.func
}

const mapStateToProps = state => ({
    colors: state.theme.colors
})

export default connect(mapStateToProps, null)(ClearBtn);