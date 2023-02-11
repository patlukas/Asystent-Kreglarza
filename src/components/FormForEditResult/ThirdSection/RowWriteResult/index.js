import React, { Component } from 'react';
import {View, StyleSheet, Text, TextInput} from 'react-native';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import {Dropdown} from 'react-native-material-dropdown';

class RowWriteResult extends Component {
    constructor(props) {
        super(props);
        this.state = {
            resultState: this.props.result,
            idElEditedBySum: undefined
        }
        this.setResultState = this.setResultState.bind(this)
        this.setStateIdElEditedBySum = this.setStateIdElEditedBySum.bind(this)
    }
    render() {
        const {withSetPoints, colors, onChange} = this.props
        const {idElEditedBySum, resultState} = this.state
        const list_width = withSetPoints ? ["20%", "20%", "16%", "21%", "12%"] : ["24%", "24%", "20%", "22%", "0%"];
        const beforeOnChange = (index, value) => funcBeforeOnChange(index, value, resultState, onChange, this.setResultState, idElEditedBySum)
        return (
            <View style={styles.oneLineContainer}>
                <NumberInput 
                    value={resultState[0]} colors={colors} width={list_width[0]} max={9999}  
                    onChange={(v) => beforeOnChange(0, v)}
                />
                <NumberInput 
                    value={resultState[1]} colors={colors} width={list_width[1]} max={9999}  
                    onChange={(v) => beforeOnChange(1, v)}
                />
                <NumberInput 
                    value={resultState[2]} colors={colors} width={list_width[2]} max={999}   
                    onChange={(v) => beforeOnChange(2, v)} selectTextOnFocus={true}
                />
                <SumComponent 
                    results={resultState} colors={colors}  width={list_width[3]}  elMax={9999} idElEditedBySum={idElEditedBySum}
                    onChange={(v) => beforeOnChange(3, v)} setStateIdElEditedBySum={this.setStateIdElEditedBySum}
                />
                <SetPointsDropdown 
                    value={resultState[4]} colors={colors} width={list_width[4]} 
                    onChange={(v) => beforeOnChange(4, v)}
                />
            </View>
        )
    }
    componentDidUpdate() {
        for(let i=0; i<this.props.result.length; i++) {
            if(this.props.result[i] !== this.state.resultState[i]) {
                this.setState({resultState: this.props.result})
            }
        }
    }
    setResultState = (resultState) => {this.setState({resultState})}
    setStateIdElEditedBySum = (idElEditedBySum) => {this.setState({idElEditedBySum})}
}

const NumberInput = ({value, width, colors, max, onChange, selectTextOnFocus=false, onEndEditing=()=>{}, onFocus=()=>{}}) => {
    if(width == "0%") return null;
    const startChange = (newVal) => {
        newVal = newVal.replace("-", "").replace(".", "").replace(",", "").replace(" ", "")
        newVal= parseInt(newVal)
        if(isNaN(newVal) || newVal < 0) newVal = undefined
        else if(newVal > max) newVal = value
        onChange(newVal)
    }
    return (
        <TextInput
            keyboardType='numeric'
            style={[styles.numberInput(width, colors.form.main, colors.form.second), styles.cell]}
            onChange={(value) => startChange(value.nativeEvent.text)}
            selectTextOnFocus={selectTextOnFocus}
            onFocus={onFocus}
            onEndEditing={onEndEditing}
        >{value}</TextInput>
    )
}

const SumComponent = ({results, width, colors, elMax, idElEditedBySum,  onChange, setStateIdElEditedBySum}) => {
    if(width == "0%") return null;
    const editId0 = (results[0] === undefined && results[1] !== undefined)
    const editId1 = (results[0] !== undefined && results[1] === undefined)
    if(idElEditedBySum !== undefined || editId0 || editId1) {
        if(editId0) idElEditedBySum = 0
        else if(editId1) idElEditedBySum = 1
        return <NumberInput 
            value={results[3]} 
            colors={colors} 
            width={width} 
            onChange={onChange} 
            selectTextOnFocus={true} 
            onEndEditing={() => setStateIdElEditedBySum(undefined)}
            onFocus={() => setStateIdElEditedBySum(idElEditedBySum)}
            max={elMax + results[1-idElEditedBySum]}
        />
    } 
    const value = (results[3] === undefined) ? 0 : results[3]
    return <Text style={[styles.textSum(width, colors.form.second), styles.cell]}>{value}</Text>
}

const SetPointsDropdown = ({value, width, colors, onChange}) => {
    if(width == "0%") return null;
    const data = [{label: "1", value: 1}, {label: "0.5", value: 0.5}, {label: "0", value: 0}]
    return (
        <Dropdown
            label={"PS"}
            data={data}
            baseColor={colors.form.main}
            itemColor={colors.form.dropdownItemTextSelected}
            textColor={colors.form.dropdownItemTextNoSelected}
            pickerStyle={{backgroundColor: colors.form.dropdownPickerBackground}}
            containerStyle={styles.setPointsDropdown(width)}
            value={value}
            onChangeText={(_, index) => onChange(data[index].value)}
            fontSize={14}
        />
    )
}

const funcBeforeOnChange = (index, value, results, onChange, setResultState, idElEditedBySum) => {
    if(results[index] === value) {
        let copyResults = [...results]
        copyResults[index] = " "
        setResultState(copyResults)
        setTimeout(() => {setResultState(results)}, 1)
        return
    }
    results[index] = value
    const valIsUndefined = [results[0] === undefined, results[1] === undefined]
    if(index == 0 || index == 1) {
        results[3] = (valIsUndefined[0] ? 0 : results[0]) + (valIsUndefined[1] ? 0 : results[1])
    }
    else if(index == 3 && idElEditedBySum !== undefined) {
        if(results[3] > results[1-idElEditedBySum]) results[idElEditedBySum] = results[3] - results[1-idElEditedBySum]
        else results[idElEditedBySum] = undefined
    }
    onChange(results)
} 

const styles = StyleSheet.create({
    oneLineContainer: {
        flexWrap: 'wrap', 
        flexDirection: 'row',
        marginTop: "4%"
    },
    numberInput: (width, borderColor, color) => ({
        width, borderColor, color,
        borderWidth: 1
    }),
    textSum: (width, color) => ({
        width, color,
        textAlignVertical: 'center'
    }),
    setPointsDropdown: (width) => ({
        width,
        marginLeft: '2%',
        marginTop: -20
    }),
    cell: {
        textAlign: 'center',
        marginLeft: '1%',
        marginRight: '1%',
        height: 40,
        fontSize: 18,
        lineHeight: 20
    }
})

RowWriteResult.propTypes = {
    withSetPoints: PropTypes.bool.isRequired,
    result: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    colors: state.theme.colors
})

export default connect(mapStateToProps, null)(RowWriteResult);