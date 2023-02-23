import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {connect} from "react-redux";
import BouncyCheckbox from "react-native-bouncy-checkbox";


const GameTypeSelection = ({colors, listOptions, onChange}) => {
    const {main, second, checkboxColor, checkboxIconColor} = colors.result.filter
    return (
        <View>
            <Text style={styles.mainText(main)}>Rodzaj gry</Text>
            {getListOptions(listOptions, onChange, second, checkboxColor, checkboxIconColor)}
        </View>
    )
}

const getListOptions = (listOptions, onChange, color, checkboxColor, checkboxIconColor) => {
    let listComponents = []
    listOptions.forEach((el, index) => {
        listComponents.push(
            <BouncyCheckbox 
                key={index}
                isChecked={el.value}
                onPress={() => onClickGameType(listOptions, index, onChange)} 
                disableBuiltInState={true} 
                size={20} 
                textComponent={<Text style={styles.optionText(color)}>{el.name}</Text>}
                iconImageStyle ={{tintColor: checkboxIconColor}}
                fillColor={checkboxColor}
                style={styles.checkbox}
            />
        )
    })
    return listComponents
}

const onClickGameType = (listOptions, index, onChange) => {
    listOptions[index].value = !listOptions[index].value
    onChange(listOptions)
}

const styles = StyleSheet.create({
    optionText: (color) => ({
        color,
        paddingLeft: 5,
    }),
    mainText: (color) => ({
        color,
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 15
    }),
    checkbox: {
        paddingVertical: 4, 
        paddingLeft: 6
    }
})

const mapStateToProps = state => ({
    colors: state.theme.colors
})

export default connect(mapStateToProps, undefined)(GameTypeSelection);