import React, {Component} from 'react';
import {Text, StyleSheet, ScrollView} from 'react-native';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import FirstSection from '../FirstSection/FirstSection';
import SecondSection from '../SecondSection/SecondSection';

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
                
                <Text style={{height: 200}}>TODO dalsza część formularza</Text>
            </ScrollView>
        );
    }

    onPrepareResultItemAfterChange = ({key, value}) => {
        let wasChange = false;
        let editedResult = {...this.props.editedResult};
        switch(key) {
            case "clear": 
                editedResult = {...this.props.initialEditedResult};
                wasChange = true;
                break;
            case "comment":
                if(editedResult.comment != value) {
                    editedResult.comment = value;
                    wasChange = true
                }
                break;
            case "gameType":
                if(editedResult.gameType.id != value.id) {
                    editedResult.gameType.id = value.id;
                    editedResult.gameType.name = value.name;
                    if(editedResult.date == -1) editedResult.date = this.getTodayDate();
                    wasChange = true
                }
                break;
            case "date":
                if(editedResult.date != value) {
                    editedResult.date = value;
                    wasChange = true
                }
                break;
            case "teamPoints":
                if(editedResult.leagueData.team.teamPoints != value) {
                    editedResult.leagueData.team.teamPoints = value;
                    wasChange = true
                }
                break;
            case "setPoints":
                if(editedResult.leagueData.team.setPoints != value) {
                    editedResult.leagueData.team.setPoints = value;
                    wasChange = true
                }
                break;
        }
        if(wasChange) {
            console.log("Była zmiana", editedResult)
            this.props.onChange(editedResult)
        }
        else console.log("Bez zmian", editedResult)
    }

    getTodayDate = () => {
        const date = new Date();
        var dateSting = date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2)+"-"+("0" + date.getDate()).slice(-2);
        var dateToday = new Date(dateSting);
        return dateToday.getTime() / (24*3600*1000);
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
    colors: state.theme.colors
})

export default connect(mapStateToProps, undefined)(FormForEditResult);