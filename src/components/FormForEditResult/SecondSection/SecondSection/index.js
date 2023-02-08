import React from 'react';
import {View, StyleSheet} from 'react-native';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import LeaguePointsDropdown from '../LeaguePointsDropdown';
import HomeOrAwayDropdown from '../HomeOrAwayDropdown';
import SumTeamInput from '../SumTeamInput';
import DropdownWithTextInput from '../DropdownWithTextInput';
import HowManyLanesDropdown from '../HowManyLanesDropdown';
import DuelResultDropdown from '../DuelResultDropdown';

const SecondSection = ({onChange, resultItem, listOfGameTypes, listWhere, listEnemy}) => {
    const {gameType} = resultItem;

    const gameTypeObject = getGameTypeObject(listOfGameTypes, gameType.id)
    if(gameTypeObject === false) return <></>

    const {player, team, inHome, enemyTeam} = resultItem.leagueData;
    const {question, options} = gameTypeObject.howManyLanes;
    const {keyHowManyLanes} = resultItem.gameType;

    if(gameTypeObject.details.isLeague) {
        const {sumTeamPoints, sumSetPoints} = gameTypeObject.details;
        const {teamPoints, setPoints, sum} = team;
        return (
            <View style={styles.oneLineContainer}>
                <LeaguePointsDropdown label="Punkty drużynowe" onChange={(value) => onChange({key: "teamPoints", value})} selected={teamPoints} sumPoints={sumTeamPoints} />
                <LeaguePointsDropdown label="Punkty setowe" onChange={(value) => onChange({key: "setPoints", value})} selected={setPoints} sumPoints={sumSetPoints} />
                <HomeOrAwayDropdown onChange={(value) => onChange({key: "inHome", value})} selected={inHome} />
                <SumTeamInput onChange={(value) => onChange({key: "teamSum", value})} value={sum} />
                <DropdownWithTextInput 
                    label="Gdzie:" labelOfOtherOption="Inne miejsce" labelTextInput='Nazwa miejsca'
                    selected={resultItem.where} 
                    onChange={(value) => onChange({key: "where", value})} 
                    listOptions={listWhere} 
                />
                <DropdownWithTextInput 
                    label="Z kim:" labelOfOtherOption="Inny rywal" labelTextInput='Nazwa rywala'
                    selected={enemyTeam} 
                    onChange={(value) => onChange({key: "enemyTeam", value})} 
                    listOptions={listEnemy} 
                />
                <HowManyLanesDropdown label={question} options={options} selected={keyHowManyLanes} onChange={(value) => onChange({key: "lanes", value})}/>
                <DuelResultDropdown canWinDuel={player.canWinDuel} selected={player.teamPoints} onChange={(value) => onChange({key: "duel", value})} />
            </View>
        )
    }
    
    return (
        <View style={styles.oneLineContainer}>
            <DropdownWithTextInput 
                label="Gdzie:" labelOfOtherOption="Inne miejsce" labelTextInput='Nazwa miejsca' 
                selected={resultItem.where} 
                onChange={(value) => onChange({key: "where", value})} 
                listOptions={listWhere} 
            />
            <HowManyLanesDropdown label={question} options={options} selected={keyHowManyLanes} onChange={(value) => onChange({key: "lanes", value})}/>
            <DuelResultDropdown canWinDuel={player.canWinDuel} selected={player.teamPoints} onChange={(value) => onChange({key: "duel", value})}
            />
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