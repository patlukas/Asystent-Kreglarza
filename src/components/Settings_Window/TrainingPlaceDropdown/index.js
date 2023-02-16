import React from 'react';
import {onSetTrainingPlace} from "../../../actions";
import { connect } from "react-redux";
import DropdownWithTextInput from '../../FormForEditResult/SecondSection/DropdownWithTextInput';

const TrainingPlaceDropdown = ({listWhere, trainingPlace, onSetTrainingPlace}) => {
    const label = (trainingPlace[0] !== -1) ? "Domyślne miejsce treningowe:" : ""
    return (
        <DropdownWithTextInput 
            label={label}
            labelOfOtherOption="Inne miejsce" 
            labelTextInput='Miejsce treningowe'
            selected={trainingPlace} 
            onChange={onSetTrainingPlace} 
            listOptions={listWhere}
        />
    );
}

const mapStateToProps = state => ({
    listWhere: state.whereAndEnemy.listWhere,
    trainingPlace: state.settings.trainingPlace
})

const mapDispatchToProps = dispatch => ({
    onSetTrainingPlace: (trainingPlace) => dispatch(onSetTrainingPlace(trainingPlace))
})

export default connect(mapStateToProps, mapDispatchToProps)(TrainingPlaceDropdown);