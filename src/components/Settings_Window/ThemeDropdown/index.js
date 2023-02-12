import React from 'react';
import {StyleSheet, View} from 'react-native';
import {onSetTheme} from "../../../actions";
import { connect } from "react-redux";
import {Dropdown} from 'react-native-material-dropdown';

const ThemeDropdown = ({theme, onSetTheme}) => {
    const {selectedTheme, listTheme, colors} = theme
    let data = [];
    let value = null;
    listTheme.forEach(el => { 
        if(selectedTheme == el) value = selectedTheme;
        data.push({label: el, value: el}) 
    });

    return (
        <View style={styles.container}>
            <Dropdown
                label={"Kolorysyka aplikacji"}
                data={data}
                baseColor={colors.form.main}
                itemColor={colors.form.dropdownItemTextSelected}
                textColor={colors.form.dropdownItemTextNoSelected}
                pickerStyle={{backgroundColor: colors.form.dropdownPickerBackground}}
                value={value}
                itemCount={5.35}
                onChangeText={(selected) => onSetTheme(selected)}
                fontSize={16}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "96%", 
        marginLeft: "2%"
    }
})

const mapStateToProps = state => ({
    theme: state.theme
})

const mapDispatchToProps = dispatch => ({
    onSetTheme: (theme) => dispatch(onSetTheme(theme))
})

export default connect(mapStateToProps, mapDispatchToProps)(ThemeDropdown);