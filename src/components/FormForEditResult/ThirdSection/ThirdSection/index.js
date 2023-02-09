import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import Headline from "../Headline"

const ThirdSection = ({onChange, resultItem, listOfGameTypes, colors}) => {
    const {gameType} = resultItem;
    if(gameType.keyHowManyLanes == -1) return <></>
    const gameTypeObject = getGameTypeObject(listOfGameTypes, gameType.id)
    const withSetPoints = gameTypeObject.details.isLeague;

    return (
        <View style={styles.oneLineContainer(colors.form.main)}>
            <Headline withSetPoints={withSetPoints}/>
        </View>
    ); 
}

const getGameTypeObject = (listOfGameTypes, id) => {
    for(const element of listOfGameTypes) {
        if(element.id == id) return element;
    }
    return false;
}

const styles = StyleSheet.create({
    oneLineContainer: (color) => ({
        borderTopColor: color,
        borderTopWidth: 2,
        marginTop: 20,
        paddingTop: 10,
        flexWrap: 'wrap', 
        flexDirection: 'row'
    })
})

ThirdSection.propTypes = {
    onChange: PropTypes.func.isRequired,
    resultItem: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    listOfGameTypes: state.listOfGameTypes,
    colors: state.theme.colors,
})

export default connect(mapStateToProps, null)(ThirdSection);