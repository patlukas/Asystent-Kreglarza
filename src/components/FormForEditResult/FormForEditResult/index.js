import React, {Component} from 'react';
import {Text, StyleSheet, ScrollView, View} from 'react-native';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import FirstSection from '../FirstSection/FirstSection';
import SecondSection from '../SecondSection/SecondSection';
import { onPrepareResultObject } from './script';
import ThirdSection from '../ThirdSection/ThirdSection';
import { onCheckResultIsComplete, onPrepareResultsToSave } from './scriptCheckAndPrepareResult';
import AlertTwoOption from '../../Alerty/AlertTwoOption';

class FormForEditResult extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAlertClear: false
        }
        this.onPrepareResultItemAfterChange = this.onPrepareResultItemAfterChange.bind(this)
        this.onClear = this.onClear.bind(this)
    }
    render() {
        const {colors, title, nameClearButton, editedResult} = this.props;
        return (
            <>
                <ScrollView style={{backgroundColor: colors.BACKGROUND}}>
                    <Text style={styles.title(colors)}>{title}</Text>
                    <FirstSection 
                        title="Nowy Wynik"
                        nameClearButton={nameClearButton} 
                        onChange={this.onPrepareResultItemAfterChange}
                        resultItem={editedResult}
                    />
                    <SecondSection
                        onChange={this.onPrepareResultItemAfterChange}
                        resultItem={editedResult}
                    />
                    <ThirdSection
                        onChange={this.onPrepareResultItemAfterChange}
                        resultItem={editedResult}
                    />
                    <View style={{height: 80}}/>
                </ScrollView>
                <AlertTwoOption
                    visible={this.state.showAlertClear}
                    title="Czy na pewno chcesz wycofać wprowadzone zmiany?"
                    onPressNo={() => this.setState({showAlertClear: false})}
                    onPressYes={this.onClear}
                />
            </>
        );
    }

    onPrepareResultItemAfterChange = ({key, value}) => {
        const {listWhere, listEnemy, homePlace, trainingPlace, listOfGameTypes, initialEditedResult, editedResult} = this.props
        if(key !== "clear") {
            let resultObject = onPrepareResultObject(editedResult, key, value, listWhere, listEnemy, homePlace, trainingPlace, listOfGameTypes)
            if(resultObject !== undefined) this.props.onChange(resultObject)
        }
        else if(!compareTwoResults(editedResult, initialEditedResult)) this.setState({showAlertClear: true})
    }

    onClear = () => {
        this.props.onChange(JSON.parse(JSON.stringify(this.props.initialEditedResult)))
        this.setState({showAlertClear: false})
    }
}

export const checkResultIsComplete = onCheckResultIsComplete
export const prepareResultsToSave = onPrepareResultsToSave
export const compareTwoResults = (r1, r2) => {return JSON.stringify(r1) === JSON.stringify(r2)}

const styles = StyleSheet.create({
    title: (colors) => ({
        width: '100%',
        textAlign: 'center',
        fontSize: 25,
        paddingTop: 10,
        paddingBottom: 15,
        fontWeight: '700',
        color: colors.formForCreateResult.fontHead
    })
})

FormForEditResult.propTypes = {
    nameClearButton: PropTypes.string.isRequired,
    onPressClearBtn: PropTypes.func
}

const mapStateToProps = state => ({
    colors: state.theme.colors,
    listWhere: state.whereAndEnemy.listWhere,
    listEnemy: state.whereAndEnemy.listEnemy,
    homePlace: state.settings.homePlace,
    trainingPlace: state.settings.trainingPlace,
    listOfGameTypes: state.listOfGameTypes
})

export default connect(mapStateToProps, undefined)(FormForEditResult);