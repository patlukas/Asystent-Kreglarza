import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import { connect } from "react-redux";

const TrainingPlaceDropdown = ({listOfResults, colors}) => {
    const memoryUsed = new Blob([JSON.stringify(listOfResults)]).size - 2
    const limit = 2097000
    const percent = parseFloat(((memoryUsed / limit) * 100).toFixed(3)) + "%"
    const {main, second, dropdownItemTextSelected} = colors.form
    return (
        <>
            <Text style={styles.titleText(main,14)}>Wykorzystana pamięć do przechowywania wyników</Text>
            <Text style={styles.titleText(second, 12)}>
                Aktualnie przechowujesz {listOfResults.length} {getResultUnit(listOfResults.length)}
            </Text>
            <View style={styles.progressBarContainer(dropdownItemTextSelected)}>
                <View style={styles.progressBar(dropdownItemTextSelected, percent)}></View>
                <Text style={styles.percentText(main)}>
                    {percent} ( {getDottedNumber(memoryUsed)}B  z  {getDottedNumber(limit)}B )
                </Text>
            </View> 
        </>
    );
}

const getResultUnit = (numberOfResults) => {
    if(numberOfResults == 1) return "wynik"
    if(numberOfResults >= 2 && numberOfResults <= 4) return "wyniki"
    return "wyników"
}

const getDottedNumber = (number) => {
    let dottedNumber = ""
    while(true) {
        let division = String(number % 1000)
        while(division.length < 3 && number >= 1000) division = "0" + division
        number = parseInt(number / 1000)
        dottedNumber = division + dottedNumber
        if(number != 0) dottedNumber = "." + dottedNumber
        else return dottedNumber
    }
}

const styles = StyleSheet.create({
    progressBarContainer: (borderColor) => ({
        borderColor, 
        borderWidth: 1, 
        height: 25, 
        marginLeft: "10%", 
        marginRight: "10%",
        marginTop: 5
    }),
    progressBar: (backgroundColor, width) => ({
        backgroundColor, width,
        height: "100%"
    }),
    percentText: (color) => ({
        color,
        position: "absolute", 
        textAlign: "center", 
        textAlignVertical: "center",
        width: "100%",
        height: "100%"
    }),
    titleText: (color, fontSize) => ({
        color, fontSize,
        textAlign: "center",
    })
})

const mapStateToProps = state => ({
    listOfResults: state.listOfResults,
    colors: state.theme.colors
})

export default connect(mapStateToProps, undefined)(TrainingPlaceDropdown);