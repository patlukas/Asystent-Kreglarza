import React from 'react';
import {onSetHomePlace} from "../../../actions";
import { connect } from "react-redux";
import DropdownWithTextInput from '../../FormForEditResult/SecondSection/DropdownWithTextInput';

const HomePlaceDropdown = ({listWhere, homePlace, onSetHomePlace}) => {
    const label = (homePlace[0] !== -1) ? "Miejsce rozgrywania meczów domowych:" : ""
    return (
        <DropdownWithTextInput 
            label={label}
            labelOfOtherOption="Inne miejsce" 
            labelTextInput='Miejsce "Dom" w lidze'
            selected={homePlace} 
            onChange={onSetHomePlace} 
            listOptions={listWhere}
        />
    );
}

const mapStateToProps = state => ({
    listWhere: state.whereAndEnemy.listWhere,
    homePlace: state.settings.homePlace
})

const mapDispatchToProps = dispatch => ({
    onSetHomePlace: (homePlace) => dispatch(onSetHomePlace(homePlace))
})

export default connect(mapStateToProps, mapDispatchToProps)(HomePlaceDropdown);