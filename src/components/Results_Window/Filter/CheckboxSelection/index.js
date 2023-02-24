import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {connect} from "react-redux";
import BouncyCheckbox from "react-native-bouncy-checkbox";

const CheckboxSelection = ({title, colors, onChange, value}) => {
    const {second, checkboxColor, checkboxIconColor} = colors.result.filter
    return (
        <BouncyCheckbox 
            isChecked={value}
            onPress={onChange} 
            disableBuiltInState={true} 
            size={20} 
            textComponent={<Text style={styles.optionText(second)}>{title}</Text>}
            iconImageStyle ={{tintColor: checkboxIconColor}}
            fillColor={checkboxColor}
            style={styles.checkbox}
            iconStyle ={{borderRadius: 0}}
            innerIconStyle ={{borderRadius: 0}}
            bounceEffectIn={0.7}
            TouchableComponent={TouchableOpacity}
        />
    )
}

const styles = StyleSheet.create({
    optionText: (color) => ({
        color,
        paddingLeft: 5,
    }),
    checkbox: {
        paddingVertical: 6, 
        paddingLeft: 6
    }
})

const mapStateToProps = state => ({
    colors: state.theme.colors
})

export default connect(mapStateToProps, undefined)(CheckboxSelection);