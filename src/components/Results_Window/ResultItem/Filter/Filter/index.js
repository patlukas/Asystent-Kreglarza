import React from 'react';
import {TouchableOpacity, View, StyleSheet, Animated, ScrollView} from 'react-native';
import {connect} from "react-redux";
import GameTypeSelection from '../GameTypeSelection';
import ClearFilterButton from '../ClearFilterButton';


const Filter = ({colors, onClose, filter, visible, onChange, left}) => {
    const {bgColor, borderColor} = colors.result.filter
    let code = []
    if(visible) code.push(
        <TouchableOpacity key={1} style={styles.screenContainer} activeOpacity={1} onPress={onClose}/>
    )
    return (
        <>
            {code}
            <Animated.View style={styles.mainContainer(bgColor, borderColor, left)}>
                <ScrollView>
                    <View>
                        <ClearFilterButton onPress={() => onClearFilter(onChange)}/>
                        <GameTypeSelection 
                            listOptions={filter.gameTypes}
                            onChange={(newGameTypes) => prepareFilterToSave(filter, onChange, "gameTypes", newGameTypes)}
                        />
                    </View>
                </ScrollView>
            </Animated.View>
        </>
    );
}

const prepareFilterToSave = (filter, onChange, kind, value) => {
    if(kind == "gameTypes") filter.gameTypes = value
    onChange(filter)
}

const onClearFilter = (onChange) => {
    const filter = {
        gameTypes: [
            {value: true, listId: [1, 2], name: "Superliga"},
            {value: true, listId: [3], name: "CLJ"},
            {value: true, listId: [4], name: "Zawody"},
            {value: true, listId: [5], name: "Trening"}
        ]
    }
    onChange(filter)
}

const styles = StyleSheet.create({
    screenContainer: {
        position: "absolute",
        height: "100%",
        width: "100%"
    },
    mainContainer: (backgroundColor, borderColor, left) => ({
        backgroundColor, borderColor, left,
        width: 200,
        height: "100%", 
        position: "absolute", 
        borderRightWidth: 6
    })
})

const mapStateToProps = state => ({
    colors: state.theme.colors
})

export default connect(mapStateToProps, undefined)(Filter);