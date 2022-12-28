import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import LeaguePointsDropdown from '../LeaguePointsDropdown';
import HomeOrAwayDropdown from '../HomeOrAwayDropdown';
import SumTeamInput from '../SumTeamInput';
import DropdownWithTextInput from '../DropdownWithTextInput';

const SecondSection = ({onChange, resultItem, listOfGameTypes, listWhere, listEnemy}) => {
    const {gameType} = resultItem;

    const gameTypeObject = getGameTypeObject(listOfGameTypes, gameType.id)
    if(gameTypeObject === false) return <></>

    if(gameTypeObject.details.isLeague) {
        const {sumTeamPoints, sumSetPoints} = gameTypeObject.details;
        const {teamPoints, setPoints, sum} = resultItem.leagueData.team;
        return (
            <View style={styles.oneLineContainer}>
                <LeaguePointsDropdown label={"Punkty drużynowe"} onChange={(value) => onChange({key: "teamPoints", value})} selected={teamPoints} sumPoints={sumTeamPoints} />
                <LeaguePointsDropdown label={"Punkty setowe"} onChange={(value) => onChange({key: "setPoints", value})} selected={setPoints} sumPoints={sumSetPoints} />
                <HomeOrAwayDropdown onChange={(value) => onChange({key: "inHome", value})} selected={resultItem.leagueData.inHome} />
                <SumTeamInput onChange={(value) => onChange({key: "teamSum", value})} value={sum} />
                <DropdownWithTextInput 
                    label={"Gdzie:"} labelOfOtherOption={"Inne miejsce"} labelTextInput='Nazwa miejsca'
                    selected={resultItem.where} 
                    onChange={(value) => onChange({key: "where", value})} 
                    listOptions={listWhere} 
                />
                <DropdownWithTextInput 
                    label={"Z kim:"} labelOfOtherOption={"Inny rywal"} labelTextInput='Nazwa rywala'
                    selected={resultItem.leagueData.enemyTeam} 
                    onChange={(value) => onChange({key: "enemyTeam", value})} 
                    listOptions={listEnemy} 
                />
            </View>
        )
    }
    
    return (
        <>
            <DropdownWithTextInput 
                label={"Gdzie:"} labelOfOtherOption={"Inne miejsce"} labelTextInput='Nazwa miejsca'
                selected={resultItem.where} 
                onChange={(value) => onChange({key: "where", value})} 
                listOptions={listWhere} 
            />
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
    listOfGameTypes: state.listOfGameTypes,
    listWhere: state.whereAndEnemy.listWhere,
    listEnemy: state.whereAndEnemy.listEnemy
})

export default connect(mapStateToProps, null)(SecondSection);