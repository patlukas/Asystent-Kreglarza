import React from 'react';
import {TouchableOpacity, View, StyleSheet, Animated, ScrollView, Text} from 'react-native';
import {connect} from "react-redux";
import GameTypeSelection from '../GameTypeSelection';
import ClearFilterButton from '../ClearFilterButton';
import DropdownSelection from '../DropdownSelection';
import CheckboxSelection from '../CheckboxSelection';


const Filter = ({colors, onClose, filter, visible, onChange, left, listWhere, listEnemy}) => {
    const {main, bgColor, borderColor} = colors.result.filter
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

const styles = StyleSheet.create({
    screenContainer: {
        position: "absolute",
        height: "100%",
        width: "100%"
    },
    mainContainer: (backgroundColor, borderColor, left) => ({
        backgroundColor, borderColor, left,
        width: 230,
        height: "100%", 
        position: "absolute", 
        borderRightWidth: 6
    }),
    textOtherFilter: (color) => ({
        color,
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 15,
        marginTop: 15
    })
})

const mapStateToProps = state => ({
    colors: state.theme.colors,
    listWhere: state.whereAndEnemy.listWhere,
    listEnemy: state.whereAndEnemy.listEnemy
})

export default connect(mapStateToProps, undefined)(Filter);