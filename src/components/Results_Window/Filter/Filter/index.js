import React, {useState} from 'react';
import {TouchableOpacity, View, StyleSheet, Animated, ScrollView, Text, PanResponder} from 'react-native';
import {connect} from "react-redux";
import GameTypeSelection from '../GameTypeSelection';
import ClearFilterButton from '../ClearFilterButton';
import DropdownSelection from '../DropdownSelection';
import CheckboxSelection from '../CheckboxSelection';


const Filter = ({colors, onClose, filter, onChange, listWhere, listEnemy, animatedValue, animatedSortValue}) => {
    const [visible, setVisible] = useState(false)
    const {main, bgColor, borderColor} = colors.result.filter
    animatedValue.addListener(({value}) => {if(visible != (value != 0)) setVisible((value != 0))})

    const left = animatedValue.interpolate({inputRange: [0, 1], outputRange: [-230, 0]})
    let oldDx = 0
    const panResponder = React.useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: (_, gestureState) => {
                oldDx = 0
                return (gestureState.dx > 3 || gestureState.dx < -3)
            },
            onPanResponderMove: (_, gestureState) => {
                if(animatedValue.__getValue() == 0 && gestureState.vx > 0) val = (gestureState.moveX + 6) / 230 
                else val = animatedValue.__getValue() + ((gestureState.dx - oldDx) / 230)
                oldDx = gestureState.dx
                val = (val > 1) ? 1 : ((val < 0) ? 0 : val)
                animatedValue.setValue(val)
                if(animatedSortValue.__getValue() == 1) {
                    const duration = 700 * animatedSortValue._value
                    Animated.timing(animatedSortValue, {toValue: 0, duration, useNativeDriver: false}).start()
                }
            },
            onPanResponderRelease: (_, gestureState) => onEndTouch(animatedValue, gestureState),
            onPanResponderTerminate: (_, gestureState) => onEndTouch(animatedValue, gestureState),
        })
    ).current

    let code = []
    if(visible) code.push(
        <View key={1} {...panResponder.panHandlers} style={styles.screenContainer}>
            <TouchableOpacity style={styles.screenContainer} activeOpacity={1} onPress={onClose}/>
        </View>
    )
    return (
        <>
            {code}
            <View style={styles.additionalColumn} {...panResponder.panHandlers}/>
            <Animated.View style={styles.mainContainer(bgColor, borderColor, left)} {...panResponder.panHandlers}>
                <ScrollView>
                    <View>
                        <ClearFilterButton onPress={() => onClearFilter(onChange)}/>
                        <GameTypeSelection 
                            listOptions={filter.gameTypes}
                            onChange={(newGameTypes) => prepareFilterToSave(filter, onChange, "gameTypes", newGameTypes)}
                        />
                        <DropdownSelection
                            title="Miejsce gry"
                            selectedIndex={filter.whereIndex}
                            listOptions={getListToDropdown(listWhere, "Wszędzie", "Inne miejsce")}
                            onChange={(newIndex) => prepareFilterToSave(filter, onChange, "where", newIndex)}
                        />
                        <DropdownSelection
                            title="Rywal"
                            selectedIndex={filter.enemyIndex}
                            listOptions={getListToDropdown(listEnemy, "Z kimkolwiek", "Inny rywal")}
                            onChange={(newIndex) => prepareFilterToSave(filter, onChange, "enemy", newIndex)}
                        />
                        <Text style={styles.textOtherFilter(main)}>Inne filtry</Text>
                        <CheckboxSelection
                            title="Tylko wyniki pełnej meczówki"
                            value={filter.fullGame}
                            onChange={() => prepareFilterToSave(filter, onChange, "fullGame", !filter.fullGame)}
                        />
                    </View>
                </ScrollView>
            </Animated.View>
        </>
    );
}

const prepareFilterToSave = (filter, onChange, kind, value) => {
    if(kind == "gameTypes") filter.gameTypes = value
    else if(kind == "where") filter.whereIndex = value
    else if(kind == "enemy") filter.enemyIndex = value
    else if(kind == "fullGame") filter.fullGame = value
    onChange(filter)
}

const onClearFilter = (onChange) => {
    const filter = {
        gameTypes: [
            {value: true, listId: [1, 2], name: "Superliga"},
            {value: true, listId: [3], name: "CLJ"},
            {value: true, listId: [4], name: "Zawody"},
            {value: true, listId: [5], name: "Trening"}
        ],
        whereIndex: 0,
        enemyIndex: 0,
        fullGame: false 
    }
    onChange(filter)
}

const getListToDropdown = (list, labelNoMatter, labelOther) => {
    let data = [{value: 0, label: labelNoMatter}]
    list.forEach(el => {
        let label = (el[0] != -1) ? el[1] : labelOther 
        data.push({value: el[0], label})
    })
    return data
}

const onEndTouch = (animatedValue, gestureState) => {
    const val = animatedValue.__getValue()
    if(val == 0 || val == 1) return
    toValue = 1
    if(gestureState.vx < -0.5) toValue = 0
    else if(gestureState.vx > 0.5) toValue = 1
    else if(val < 0.35 ) toValue = 0
    const duration = 700 * Math.abs(toValue - val)
    Animated.timing(animatedValue, {toValue, duration, useNativeDriver: false}).start()
}

const styles = StyleSheet.create({
    screenContainer: {
        position: "absolute",
        height: "100%",
        width: "100%"
    },
    mainContainer: (backgroundColor, borderColor, left) => ({
        backgroundColor, borderColor, left,
        height: "100%", 
        position: "absolute",
        borderRightWidth: 6, 
        width: 230
    }),
    textOtherFilter: (color) => ({
        color,
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 15,
        marginTop: 20
    }),
    additionalColumn: {
        height: "100%", 
        width: 40, 
        position: "absolute", 
        left: 0
    }
})

const mapStateToProps = state => ({
    colors: state.theme.colors,
    listWhere: state.whereAndEnemy.listWhere,
    listEnemy: state.whereAndEnemy.listEnemy
})

export default connect(mapStateToProps, undefined)(Filter);