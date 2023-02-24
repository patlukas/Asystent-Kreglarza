import React, {useState} from 'react';
import {TouchableOpacity, View, Text, Image, Animated, ScrollView, PanResponder, Dimensions} from 'react-native';
import { connect } from "react-redux";
import CheckMarkImg from "../../../assets/images/checkMark.png"
import {styles} from "./styles";

const Sort = ({colors, selected, onClose, onSelect, animatedValue, onShow, animatedFilterValue}) => {
    const {bgColor, borderColor} = colors.result.sort
    const [visible, setVisible] = useState(false)
    const [listHeight, setListHeight] = useState(undefined)
    const windowHeight = Dimensions.get('window').height
    animatedValue.addListener(({value}) => {if(visible != (value != 0)) setVisible((value != 0))})

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
    let oldDy = 0
    const panResponder = React.useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: (_, gestureState) => {
                oldDy = 0
                return (gestureState.dy > 3 || gestureState.dy < -3)
            },
            onPanResponderMove: (_, gestureState) => {
                val = animatedValue.__getValue() + ((gestureState.dy - oldDy) / (windowHeight*0.5))
                oldDy = gestureState.dy
                val = (val > 1) ? 1 : ((val < 0) ? 0 : val)
                animatedValue.setValue(val)
                if(animatedFilterValue.__getValue() == 1) {
                    const duration = 700 * animatedFilterValue._value
                    Animated.timing(animatedFilterValue, {toValue: 0, duration, useNativeDriver: false}).start()
                }
            },
            onPanResponderRelease: (_, gestureState) => onEndTouch(animatedValue, gestureState),
            onPanResponderTerminate: (_, gestureState) => onEndTouch(animatedValue, gestureState),
            onPanResponderTerminationRequest: () => false,
        })
    ).current

    const top = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [(listHeight == undefined) ? -windowHeight : -listHeight, 0]
    })

    let code = []
    if(visible) code.push(
        <View key={1} style={styles.screenContainer} {...panResponder.panHandlers}>
            <TouchableOpacity style={styles.screenContainer} activeOpacity={1} onPress={onClose}/>
        </View>
    )
    return (
        <>
            {code}
            <View style={styles.btnContainer} {...panResponder.panHandlers}>
                <TouchableOpacity style={styles.btnTouchSpace} onPress={onShow}>
                    <Text style={styles.btnText(colors.barTop.color)}>Sortuj</Text>
                </TouchableOpacity>
            </View>
            <Animated.View 
                {...panResponder.panHandlers}
                style={styles.mainContainer(top, listHeight)}  
                onLayout={({nativeEvent}) => {
                    if(nativeEvent.layout.height > windowHeight*0.75) setListHeight(windowHeight*0.75)
                    else if(listHeight == undefined) setListHeight(nativeEvent.layout.height)
                }}
            >
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

const onEndTouch = (animatedValue, gestureState) => {
    const val = animatedValue.__getValue()
    if(val == 0 || val == 1) return
    toValue = 1
    if(gestureState.vy < -0.5) toValue = 0
    else if(gestureState.vy > 0.5) toValue = 1
    else if(val < 0.85 ) toValue = 0
    const duration = 700 * Math.abs(toValue - val)
    Animated.timing(animatedValue, {toValue, duration, useNativeDriver: false}).start()
}

const mapStateToProps = state => ({
    colors: state.theme.colors
})

export default connect(mapStateToProps, undefined)(Sort);