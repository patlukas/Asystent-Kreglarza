import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import { OutlinedTextField } from 'react-native-material-textfield';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import {Dropdown} from 'react-native-material-dropdown';

class DropdownWithTextInput extends Component {
    constructor(props) {
        super(props);
    }
    shouldComponentUpdate(nextProps) {
        return (this.props.selected.toString() !== nextProps.selected.toString())
    }
    render() {
        let {colors, selected, listOptions, label, labelOfOtherOption, onChange, labelTextInput} = this.props;
        let data = []
        let existSelectedOption = false
        for(option of listOptions) {
            if(selected.length == 2 && selected[0] === option[0]) existSelectedOption = true
            let labelOption = (option[0] != -1) ? option[1] : labelOfOtherOption
            data.push({label: labelOption, value: option[0], fullValue: option})
        }
        if(!existSelectedOption || selected.length == 0) selected = [null, ""]
        const dropdown =    <Dropdown
                                label={label}
                                data={data}
                                baseColor={colors.form.main}
                                itemColor={colors.form.dropdownItemTextSelected}
                                textColor={colors.form.dropdownItemTextNoSelected}
                                pickerStyle={{backgroundColor: colors.form.dropdownPickerBackground}}
                                value={selected[0]}
                                itemCount={5.35}
                                onChangeText={(_, index) => onChange(data[index].fullValue)}
                                fontSize={14}
                            />
        if(selected[0] != -1) 
            return (
                <View style={styles.container(colors)}>
                    <View style={styles.containerOnlyDropdown}>{dropdown}</View>
                </View>
            )
        else {
            return (
                <View style={[styles.container(colors), styles.containerDropdownAndTextInput]}>
                    <View style={styles.containerDropdown}>{dropdown}</View>
                    <View style={styles.containerTextInput}>
                        <OutlinedTextField
                            value={selected[1]}
                            onEndEditing={(event) => onChange([-1, event.nativeEvent.text])}                
                            label={labelTextInput}
                            textColor={colors.form.input}
                            tintColor={colors.form.main}
                            baseColor={colors.form.main}
                            inputContainerStyle={styles.inputContainerStyle}
                            labelTextStyle={styles.labelTextStyle}
                            inputStyleOverrides={styles.inputStyleOverrides}
                        />
                    </View>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: (colors) => ({
        marginTop: 15,
        width: '96%',
        marginLeft: '2%',
        height: 65,
        borderWidth: 1,
        borderColor: colors.form.main
    }),
    containerDropdownAndTextInput: {
        flexWrap: 'wrap', 
        flexDirection: 'row'
    },
    containerDropdown: {
        width: "30%", 
        marginLeft: "2%", 
        height: 40, 
        marginTop: -8
    },
    containerOnlyDropdown: {
        width: "96%", 
        marginLeft: "2%", 
        height: 40, 
        marginTop: -8
    },
    containerTextInput: {
        width: "64%", 
        marginLeft: "2%"
    },
    inputContainerStyle: {
        paddingBottom: 7,
        paddingTop: 6,
        height: 36, 
        marginTop: 18
    },
    labelTextStyle: {
        top: -15,
    },
    inputStyleOverrides: { 
        fontSize: 17, 
    },
})

DropdownWithTextInput.propTypes = {
    label: PropTypes.string.isRequired,
    labelOfOtherOption: PropTypes.string.isRequired,
    labelTextInput: PropTypes.string.isRequired,
    listOptions: PropTypes.array.isRequired,
    selected: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    colors: state.theme.colors
})

export default connect(mapStateToProps, null)(DropdownWithTextInput);