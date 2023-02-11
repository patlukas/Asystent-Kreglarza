import React from 'react';
import {View, StyleSheet} from 'react-native';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import Headline from "../Headline"
import ResultSum from '../ResultSum';
import RowWriteResult from '../RowWriteResult';

const ThirdSection = ({onChange, resultItem, listOfGameTypes, colors}) => {
    const {gameType} = resultItem;
    if(gameType.keyHowManyLanes == -1) return <></>
    const gameTypeObject = getGameTypeObject(listOfGameTypes, gameType.id)
    const withSetPoints = gameTypeObject.details.isLeague;
    const listResults = getListResults(resultItem)
    const beforeOnChange = (index, rowResults) => functionBeforeOnChange(index, rowResults, listResults, onChange)
    const numberOfRows = resultItem.lanes.numberOfLanesInForm
    if(numberOfRows === 0) {
        return (
            <View style={styles.oneLineContainer(colors.form.main)}>
                <Headline withSetPoints={withSetPoints}/>
                <RowWriteResult withSetPoints={withSetPoints} result={listResults[0]} onChange={(v) => beforeOnChange(0, v)}/>
            </View>
        )
    }
    let rows = [];
    for(let i=1; i<= numberOfRows; i++) {
        rows.push(<RowWriteResult key={i} withSetPoints={withSetPoints} result={listResults[i]} onChange={(v) => beforeOnChange(i, v)}/>)
    }
    return (
        <View style={styles.oneLineContainer(colors.form.main)}>
            <Headline withSetPoints={withSetPoints}/>
            <ResultSum withSetPoints={withSetPoints} result={listResults[0]}/>
            {rows}
        </View>
    ); 
}

const getGameTypeObject = (listOfGameTypes, id) => {
    for(const element of listOfGameTypes) {
        if(element.id == id) return element;
    }
    return false;
}

const functionBeforeOnChange = (index, rowResults, listResults, onChange) => {
    listResults[index] = rowResults
    if(index > 0) {
        for(let i=0; i<5; i++) {
            let sum = undefined
            for(let j=1; j<listResults.length; j++) {
                if(listResults[j][i] !== undefined) {
                    sum = ((sum === undefined) ? 0 : sum) + listResults[j][i]
                }
            }
            listResults[0][i] = sum
        }
    }
    onChange({key: "results", value: listResults})
}

const getListResults = (resultItem) => {
    const {results, lanes, leagueData} = resultItem;
    const {suma, pelne, zbierane, dziury} = results;
    const {setPoints} = leagueData.player;
    let data = [];
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