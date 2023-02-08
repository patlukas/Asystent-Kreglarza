import React from 'react';
import {StyleSheet, View} from 'react-native';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import {Dropdown} from 'react-native-material-dropdown';

const DuelResultDropdown = ({canWinDuel, selected, onChange, colors}) => {
    if(!canWinDuel) return null
    const data = [{label: "Wygrana", value: 1}, {label: "Remis", value: 0.5}, {label: "Przegrana", value: 0}]
    if(selected == -1) selected = undefined
    return (
        <View style={styles.container}>
            <Dropdown
                label={"Wynik pojedynku"}
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

DuelResultDropdown.propTypes = {
    canWinDuel: PropTypes.bool.isRequired,
    selected: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    colors: state.theme.colors,
})

export default connect(mapStateToProps, null)(DuelResultDropdown);