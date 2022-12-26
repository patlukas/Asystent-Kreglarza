import React from 'react';
import {StyleSheet, View} from 'react-native';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import {Dropdown} from 'react-native-material-dropdown';

const LeaguePointsDropdown = ({label, selected, sumPoints, onChange, colors}) => {
    var data = [];
    for(let i=sumPoints; i>=0; i--) {
        let label = i + " : " + (sumPoints - i)
        data.push({label, value: [i, sumPoints - i], name: label})
        if(i == 0) i = sumPoints + 0.5
    }
    if(selected.length != 2 || selected[0] + selected[1] != sumPoints) selected = undefined;

    return (
        <View style={styles.container}>
            <Dropdown
                label={label}
                data={data}
                baseColor={colors.form.main}
                itemColor={colors.form.dropdownItemTextSelected}
                textColor={colors.form.dropdownItemTextNoSelected}
                pickerStyle={{backgroundColor: colors.form.dropdownPickerBackground}}
                value={selected}
                itemCount={5.35}
                onChangeText={(_, index) => onChange(data[index].value)}
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

LeaguePointsDropdown.propTypes = {
    label: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    selected: PropTypes.array,
    sumPoints: PropTypes.number,
}

const mapStateToProps = state => ({
    colors: state.theme.colors,
})

export default connect(mapStateToProps, null)(LeaguePointsDropdown);