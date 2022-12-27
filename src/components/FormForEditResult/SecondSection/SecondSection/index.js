import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import LeaguePointsDropdown from '../LeaguePointsDropdown';
import HomeOrAwayDropdown from '../HomeOrAwayDropdown';

const SecondSection = ({onChange, resultItem, listOfGameTypes}) => {
    const {gameType} = resultItem;

    const gameTypeObject = getGameTypeObject(listOfGameTypes, gameType.id)
    if(gameTypeObject === false) return <></>

    if(gameTypeObject.details.isLeague) {
        const {sumTeamPoints, sumSetPoints} = gameTypeObject.details;
        const {teamPoints, setPoints} = resultItem.leagueData.team;
        return (
            <View style={styles.oneLineContainer}>
                <LeaguePointsDropdown label={"Punkty drużynowe"} onChange={(value) => onChange({key: "teamPoints", value})} selected={teamPoints} sumPoints={sumTeamPoints} />
                <LeaguePointsDropdown label={"Punkty setowe"} onChange={(value) => onChange({key: "setPoints", value})} selected={setPoints} sumPoints={sumSetPoints} />
                <HomeOrAwayDropdown onChange={(value) => onChange({key: "inHome", value})} selected={resultItem.leagueData.inHome} />
            </View>
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
    oneLineContainer: {
        flexWrap: 'wrap', 
        flexDirection: 'row'
    }
})

SecondSection.propTypes = {
    onChange: PropTypes.func.isRequired,
    resultItem: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    listOfGameTypes: state.listOfGameTypes
})

export default connect(mapStateToProps, null)(SecondSection);