import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {connect} from "react-redux";
import {Dropdown} from 'react-native-material-dropdown';


const DropdownSelection = ({title, colors, selectedIndex, listOptions, onChange}) => {
    const {main, dropdownPickerBg, dropdownSelected, dropdownNoSelected} = colors.result.filter
    return (
        <View style={styles.constainer}>
            <Text style={styles.mainText(main)}>{title}</Text>
            <Dropdown
                label=""
                data={listOptions}
                baseColor={main}
                itemColor={dropdownNoSelected}
                textColor={dropdownSelected}
                pickerStyle={{backgroundColor: dropdownPickerBg}}
                value={selectedIndex}
                itemCount={5.35}
                onChangeText={(_, index) => onChange(listOptions[index].value)}
                fontSize={14}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    constainer: {
        marginHorizontal: 5,
        marginBottom: 5
    },
    mainText: (color) => ({
        color,
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 15,
        position: "absolute",
        top: 14,
        width: "100%"
    })
})

const mapStateToProps = state => ({
    colors: state.theme.colors
})

export default connect(mapStateToProps, undefined)(DropdownSelection);