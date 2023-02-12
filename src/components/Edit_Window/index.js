import React, {Component} from 'react';
import { connect } from "react-redux";
import { onSaveEditResult } from '../../actions';
import AlertOneOption from '../Alerty/AlertOneOption';
import AlertTwoOption from '../Alerty/AlertTwoOption';
import BarTopTwoBtn from '../BarTopTwoBtn';
import FormForEditResult, {checkResultIsComplete, prepareResultsToSave, compareTwoResults} from '../FormForEditResult/FormForEditResult';

class Edit_Window extends Component {
    constructor(props) {
        super(props);
        this.state = {
            resultToEdit: JSON.parse(JSON.stringify(this.props.editedResult)),
            showAlertSave_noComplete: false,
            subtitleAlertSave_noComplete: "",
            showAlertCancel: false,
            showAlertSave_save: false
        }
        this.beforeOnSave = this.beforeOnSave.bind(this)
        this.onSave = this.onSave.bind(this)
        this.onCancel = this.onCancel.bind(this)
    }
    render() {
        const {editedResult, onEndEdit} = this.props;
        return (
            <>
                <BarTopTwoBtn 
                    leftBtnTitle="Powrót" leftBtnOnPress={this.onCancel}
                    rightBtnTitle="Zapisz" rightBtnOnPress={this.beforeOnSave}
                />
                <FormForEditResult 
                    title="Edycja wyniku"
                    nameClearButton="Wycofaj zmiany"
                    onChange={(resultToEdit) => this.setState({resultToEdit})}
                    editedResult={this.state.resultToEdit}
                    initialEditedResult={editedResult}
                />
                <AlertOneOption 
                    visible={this.state.showAlertSave_noComplete}
                    onPress={() => this.setState({showAlertSave_noComplete: false})}
                    title="Brakujące dane"
                    subtitle={this.state.subtitleAlertSave_noComplete}
                    optionName="Zamknij powiadomienie"
                />
                <AlertTwoOption
                    visible={this.state.showAlertCancel}
                    onPressYes={onEndEdit}
                    onPressNo={() => this.setState({showAlertCancel: false})}
                    title="Czy chcesz porzucić wprowadzone zmiany?"
                />
                <AlertTwoOption
                    visible={this.state.showAlertSave_save}
                    onPressYes={this.onSave}
                    onPressNo={() => this.setState({showAlertSave_save: false})}
                    title="Czy na pewno chcesz zapisać wprowadzone zmiany?"
                />
            </>
        );
    }
    beforeOnSave() {
        const {listOfGameTypes, onEndEdit, editedResult} = this.props
        const checkResult = checkResultIsComplete(this.state.resultToEdit, listOfGameTypes)
        if(!checkResult[0]) {
            this.setState({showAlertSave_noComplete: true, subtitleAlertSave_noComplete: checkResult[1]})
            return
        }
        let preparedResult = JSON.parse(JSON.stringify(this.state.resultToEdit))
        prepareResultsToSave(preparedResult)
        if(compareTwoResults(preparedResult, editedResult)) onEndEdit()
        else this.setState({showAlertSave_save: true})
    }
    onSave() {
        this.setState({showAlertSave_save: false})
        prepareResultsToSave(this.state.resultToEdit)
        this.props.onSaveEditResult(this.state.resultToEdit)
        this.props.onEndEdit()
    }
    onCancel() {  
        const {onEndEdit, editedResult} = this.props   
        let preparedResult = JSON.parse(JSON.stringify(this.state.resultToEdit))
        prepareResultsToSave(preparedResult)
        if(compareTwoResults(preparedResult, editedResult)) onEndEdit()
        else this.setState({showAlertCancel: true})
    }
}

const mapStateToProps = state => ({
    listOfGameTypes: state.listOfGameTypes
})

const mapDispatchToProps = dispatch => ({
    onSaveEditResult: (resultAfterEdit) => dispatch(onSaveEditResult(resultAfterEdit))
})

export default connect(mapStateToProps, mapDispatchToProps)(Edit_Window);