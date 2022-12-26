import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import { connect } from "react-redux";
import PropTypes from 'prop-types';

const SecondSection = ({nameClearButton, onChange, resultItem, listOfGameTypes}) => {
    const {gameType} = resultItem;

    const gameTypeObject = getGameTypeObject(listOfGameTypes, gameType.id)
    if(gameTypeObject === false) return <></>

    if(gameTypeObject.details.isLeague) {
        return (
            <>
                <Text>Druga sekcja ligowa</Text>
            </>
        )
    }
    
    return (
        <>
            <Text>Druga sekcja nie ligowa</Text>
        </>
    ); 
}

const getGameTypeObject = (listOfGameTypes, id) => {
    for(const element of listOfGameTypes) {
        if(element.id == id) return element;
    }
    return false;
}

const styles = StyleSheet.create({

})

SecondSection.propTypes = {
    onChange: PropTypes.func.isRequired,
    resultItem: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    listOfGameTypes: state.listOfGameTypes
})

export default connect(mapStateToProps, null)(SecondSection);