import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import { OutlinedTextField } from 'react-native-material-textfield';
import { connect } from "react-redux";
import PropTypes from 'prop-types';

class SumTeamInput extends Component {
    constructor(props) {
        super(props);
        this.ref = React.createRef();
    }
    componentDidUpdate() {
        let value = this.props.value
        if(value == -1) value = ""
        if(this.ref.current.value() != value) {
            this.ref.current.setValue(value)
        }
    }
    formatText = (text) => {
        text = text.replace(/[^0-9]+/g, '');
        if(text.length > 1) text = text.replace(/^0+/, "")
        return text
    };
    beforeChange = (text) => {
        if(text === "") text = -1
        else text = parseInt(text)
        this.props.onChange(text)
    }
    render() {
        let {colors, value} = this.props;
        if(value == -1) value = ""
        return (
            <View style={styles.container}>
                <OutlinedTextField
                    ref={this.ref}
                    keyboardType='numeric'
                    value={value}
                    onChangeText={this.beforeChange}       
                    label='Suma drużyny'
                    maxLength={5}
                    formatText={this.formatText}
                    textColor={colors.form.input}
                    tintColor={colors.form.main}
                    baseColor={colors.form.main}
                    labelTextStyle={styles.labelTextStyle}
                    contentInset={styles.contentInset}
                    inputContainerStyle={styles.inputContainerStyle}
                    inputStyleOverrides={styles.inputStyleOverrides}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 26,
        width: '47%',
        marginLeft: '2%',
    },
    contentInset: {
        input: 14, 
        label: 2
    },
    inputContainerStyle: {
        paddingBottom: 6, 
        height: 36, 
        paddingTop: 5
    },
    inputStyleOverrides: { 
        textAlign: 'right', 
        fontSize: 20, 
        paddingRight: "10%"
    },
    labelTextStyle: {
        top: -12
    }
})

SumTeamInput.propTypes = {
    value: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    colors: state.theme.colors
})

export default connect(mapStateToProps, null)(SumTeamInput);