import React from 'react';
import {StyleSheet, View} from 'react-native';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import {Dropdown} from 'react-native-material-dropdown';

const HowManyLanesDropdown = ({label, options, selected, onChange, colors}) => {
    let data = []
    let selected_checked = null
    for(let option of options) {
        if(selected === option.key) selected_checked = selected
        data.push({label: option.label, value: option.key, fullValue: option})
    }
    return (
        <View style={styles.container}>
            <Dropdown
                label={label}
                data={data}
                baseColor={colors.form.main}
                itemColor={colors.form.dropdownItemTextSelected}
                textColor={colors.form.dropdownItemTextNoSelected}
                pickerStyle={{backgroundColor: colors.form.dropdownPickerBackground}}
                value={selected_checked}
                itemCount={5.35}
                onChangeText={(_, index) => onChange(data[index].fullValue)}
                fontSize={14}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "47%",
        marginLeft: "2%"
    }
})

HowManyLanesDropdown.propTypes = {
    label: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    selected: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    colors: state.theme.colors,
})

export default connect(mapStateToProps, null)(HowManyLanesDropdown);