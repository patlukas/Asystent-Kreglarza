import React from 'react';
import {StyleSheet, View} from 'react-native';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import {Dropdown} from 'react-native-material-dropdown';

const GameTypeDropdown = ({colors, listOfGameTypes, selectedGameTypeId, onChange}) => {
    var data = [];
    listOfGameTypes.forEach(el => { data.push({ label: el.name, value: el.id }) });

    return (
        <View style={styles.container}>
            <Dropdown
                label={"Rodzaj gry"}
                data={data}
                baseColor={colors.form.main}
                itemColor={colors.form.dropdownItemTextSelected}
                textColor={colors.form.dropdownItemTextNoSelected}
                pickerStyle={{backgroundColor: colors.form.dropdownPickerBackground}}
                value={selectedGameTypeId}
                itemCount={5.35}
                onChangeText={onChange}
                fontSize={14}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "49%", 
        marginLeft: "2%"
    }
})

GameTypeDropdown.propTypes = {
    selectedGameTypeId: PropTypes.number,
    onChange: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    colors: state.theme.colors,
    listOfGameTypes: state.listOfGameTypes
})

export default connect(mapStateToProps, null)(GameTypeDropdown);