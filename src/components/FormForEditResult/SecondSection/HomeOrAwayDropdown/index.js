import React from 'react';
import {StyleSheet, View} from 'react-native';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import {Dropdown} from 'react-native-material-dropdown';

const HomeOrAwayDropdown = ({selected, onChange, colors}) => {
    var data = [{label: "W Domu", value: 1}, {label: "Na Wyjeździe", value: 0} ];
    if(selected != 0 && selected != 1) selected = null;

    return (
        <View style={styles.container}>
            <Dropdown
                label={"Mecz odbył się:"}
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

HomeOrAwayDropdown.propTypes = {
    onChange: PropTypes.func.isRequired,
    selected: PropTypes.number,
}

const mapStateToProps = state => ({
    colors: state.theme.colors,
})

export default connect(mapStateToProps, null)(HomeOrAwayDropdown);