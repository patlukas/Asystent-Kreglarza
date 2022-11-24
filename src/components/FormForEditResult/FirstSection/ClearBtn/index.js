import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import { connect } from "react-redux";
import PropTypes from 'prop-types';

const ClearBtn = ({colors, visible, onPress}) => {
    if(!visible) return null;
    return (
        <TouchableOpacity style={styles.button(colors)} onPress={onPress} >
            <Text style={styles.buttonText(colors)}>Wyczyść formularz</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: (colors) => ({
        width: 200,
        padding: 10,
        alignItems: "center",
        marginRight: 'auto',
        marginLeft: 'auto',
        backgroundColor: colors.formForCreateResult.clearBtnBg
    }),
    buttonText: (colors) => ({
        color: colors.formForCreateResult.clearBtnColor
    })
})

ClearBtn.propTypes = {
    visible: PropTypes.bool.isRequired,
    onPress: PropTypes.func
}

const mapStateToProps = state => ({
    colors: state.theme.colors
})

export default connect(mapStateToProps, null)(ClearBtn);