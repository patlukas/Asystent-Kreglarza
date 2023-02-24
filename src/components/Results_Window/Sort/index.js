import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet, Image, Animated, ScrollView} from 'react-native';
import { connect } from "react-redux";
import CheckMarkImg from "../../../assets/images/checkMark.png"

const Sort = ({colors, selected, onClose, onSelect, height, visible}) => {
    const {bgColor, borderColor} = colors.result.sort
    const listOption = [
        {label: 'Od najnowszego', value: 'date_gain'},
        {label: 'Od najstarszego', value: 'date_cost'},
        {label: 'Wynik: od największego', value: 'sum_gain'},
        {label: 'Wynik: od najmniejszego', value: 'sum_cost'},
        {label: 'Pełne: od największego', value: 'pelne_gain'},
        {label: 'Pełne: od najmniejszego', value: 'pelne_cost'},
        {label: 'Zbierane: od największego', value: 'zbierane_gain'},
        {label: 'Zbierane: od najmniejszego', value: 'zbierane_cost'},
        {label: 'Kolejność dodania: od najnowszego', value: 'id_gain'},
        {label: 'Kolejność dodania: od najstarszego', value: 'id_cost'}
    ]
    let code = []
    if(visible) code.push(
        <TouchableOpacity key={1} style={styles.screenContainer} activeOpacity={1} onPress={onClose}/>
    )
    return (
        <>
            {code}
            <Animated.View style={styles.mainContainer(height)}>
                <ScrollView>
                    <View style={styles.optionsContainer(bgColor, borderColor)}>
                        <Options listOption={listOption} selected={selected} colors={colors} onPress={onSelect}/>
                    </View>
                </ScrollView>
            </Animated.View>
        </>
    );
}

const Options = ({listOption, selected, onPress, colors}) => {
    const {bgColor1, bgColor2, bgColorSelected, color, colorSign} = colors.result.sort
    let code = []
    listOption.forEach((option, index) => {
        let bgColor = index % 2 ? bgColor1 : bgColor2
        if(option.value == selected) bgColor = bgColorSelected
        const displayImg = (selected == option.value) ? 'flex' : 'none'
        code.push(
            <TouchableOpacity 
                key={index} 
                style={styles.optionContainer(bgColor)}
                onPress={() => onPress(option.value)}
            >
                <Text style={styles.optionText(color)}>{option.label}</Text>
                <View style={styles.imgContainer}>
                    <Image
                        source={CheckMarkImg}
                        tintColor={colorSign}
                        style={styles.imgCheckMark(displayImg)}
                    />
                </View>
            </TouchableOpacity>
        )
    });
    return code
}

const styles = StyleSheet.create({
    screenContainer: {
        position: "absolute",
        height: "100%",
        width: "100%",
        zIndex: 2
    },
    mainContainer: (height) => ({
        height, 
        position: "absolute", 
        right: 4,
        zIndex: 3
    }),
    optionsContainer: (backgroundColor, borderColor) => ({
        borderColor, backgroundColor,
        borderWidth: 6,
        borderTopWidth: 0
    }),
    optionContainer: (backgroundColor) => ({
        backgroundColor,
        flexDirection: 'row',
        paddingLeft: 10,
        paddingRight: 30
    }),
    optionText: (color) => ({
        color,
        marginTop: 10,
        marginBottom: 10
    }),
    imgContainer: {
        position: "absolute",
        right: 0,
        height: "100%",
        justifyContent: 'center', 
        alignItems: 'center',
        verticalAlign: "center"
    },
    imgCheckMark: (display) => ({
        display,
        height: 25,
        width: 25,
        marginRight: 5
    })
})

const mapStateToProps = state => ({
    colors: state.theme.colors
})

export default connect(mapStateToProps, undefined)(Sort);