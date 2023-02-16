import React, {Component} from 'react';
import {TouchableOpacity, Text} from 'react-native';
import { connect } from "react-redux";
import { onSelectWindow } from '../../../actions';
import { styles } from './styles';

class Results_ButtonAddNewResult extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const {colors, onSelectWindow} = this.props;
        return (
            <TouchableOpacity
                onPress={() => {onSelectWindow(4)}}
                style={styles.containers(colors)}
            >
                <Text style={styles.plusSign(colors)}>+</Text>
            </TouchableOpacity>
        );
    }
}

const mapStateToProps = state => ({
    colors: state.theme.colors
})

const mapDispatchToProps = dispatch => ({
    onSelectWindow: (windowId) => dispatch(onSelectWindow(windowId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Results_ButtonAddNewResult);