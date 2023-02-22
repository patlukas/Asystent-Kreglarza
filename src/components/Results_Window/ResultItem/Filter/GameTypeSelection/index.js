import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {connect} from "react-redux";
import Checkbox from 'expo-checkbox';


const GameTypeSelection = ({colors, listOptions, onChange}) => {
    const {main, second} = colors.result.filter
    return (
        <View>
            <Text style={styles.mainText(main)}>Rodzaj gry</Text>
            {getListOptions(listOptions, onChange, second)}
        </View>
    )
}

const getListOptions = (listOptions, onChange, color) => {
    let listComponents = []
    listOptions.forEach((el, index) => {
        listComponents.push(
            <GameTypeCheckbox 
                key={index}
                selected={el.value}
                name={el.name}
                onClick={() => onClickGameType(listOptions, index, onChange)}
                color={color}
            />
        )
    })
    return listComponents
}

const onClickGameType = (listOptions, index, onChange) => {
    listOptions[index].value = !listOptions[index].value
    onChange(listOptions)
}

const GameTypeCheckbox = ({selected, name, onClick, color}) => {
    return (
        <TouchableOpacity onPress={onClick} style={styles.optionContainer}>
            <Checkbox value={selected} onValueChange={onClick} color={color}/>
            <Text style={styles.optionText(color)}>{name}</Text>
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
    mainText: (color) => ({
        color,
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 15
    })
})

const mapStateToProps = state => ({
    colors: state.theme.colors
})

export default connect(mapStateToProps, undefined)(GameTypeSelection);