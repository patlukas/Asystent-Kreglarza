import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import Headline from "../Headline"
import ResultSum from '../ResultSum';

const ThirdSection = ({onChange, resultItem, listOfGameTypes, colors}) => {
    const {gameType} = resultItem;
    if(gameType.keyHowManyLanes == -1) return <></>
    const gameTypeObject = getGameTypeObject(listOfGameTypes, gameType.id)
    const withSetPoints = gameTypeObject.details.isLeague;
    const listResults = getListResults(resultItem)
    return (
        <View style={styles.oneLineContainer(colors.form.main)}>
            <Headline withSetPoints={withSetPoints}/>
            <ResultSum withSetPoints={withSetPoints} result={listResults[0]}/>
        </View>
    ); 
}

const getGameTypeObject = (listOfGameTypes, id) => {
    for(const element of listOfGameTypes) {
        if(element.id == id) return element;
    }
    return false;
}

const getListResults = (resultItem) => {
    let data = [];
    const {results, lanes, leagueData} = resultItem;
    const {suma, pelne, zbierane, dziury} = results;
    const {setPoints} = leagueData.player;
    for(let i=0; i<=lanes.numberOfLanesInForm; i++) {
        data.push([pelne[i], zbierane[i], dziury[i], suma[i], setPoints[i]])
    }
    return data;
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