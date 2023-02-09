import React, {Component} from 'react';
import {Text, StyleSheet, ScrollView} from 'react-native';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import FirstSection from '../FirstSection/FirstSection';
import SecondSection from '../SecondSection/SecondSection';
import { onPrepareResultObject } from './script';
import ThirdSection from '../ThirdSection/ThirdSection';

class FormForEditResult extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const {colors, title, nameClearButton, editedResult} = this.props;
        return (
            <ScrollView style={{backgroundColor: colors.BACKGROUND}}>
                <Text style={styles.title(colors)}>{title}</Text>
                <FirstSection 
                    title={"Nowy Wynik"} 
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
                
                <Text style={{height: 200}}>TODO dalsza część formularza</Text>
            </ScrollView>
        );
    }

    onPrepareResultItemAfterChange = ({key, value}) => {
        const {listWhere, listEnemy, homePlace, trainingPlace, listOfGameTypes} = this.props
        let editedResult = {...this.props.editedResult};
        let initialEditedResult = {...this.props.initialEditedResult};
        let resultObject = onPrepareResultObject(editedResult, key, value, initialEditedResult, listWhere, listEnemy, homePlace, trainingPlace, listOfGameTypes)
        
        if(resultObject !== undefined) {
            console.log("Była zmiana", resultObject)
            this.props.onChange(resultObject)
        }
        else console.log("Bez zmian", editedResult)
    }
}

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