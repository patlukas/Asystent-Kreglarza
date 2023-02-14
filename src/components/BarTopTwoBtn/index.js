import React, {Component} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { styles } from "./styles";

class BarTopTwoBtn extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const {leftBtnTitle, leftBtnOnPress, rightBtnTitle, rightBtnOnPress} = this.props;
        const {backgroundColor, color, borderColor} = this.props.colors.barTop;
        return (
            <View style={styles.container(backgroundColor, borderColor)} >
                <BarTopBtn onPress={leftBtnOnPress} text={leftBtnTitle} color={color} style={styles.btnLeft}/>
                <BarTopBtn onPress={rightBtnOnPress} text={rightBtnTitle} color={color} style={styles.btnRight} />
            </View>
        )
    }
}

const BarTopBtn = ({onPress, text, color, style}) => {
    return (
        <View style={style}>
            <TouchableOpacity style={styles.btnTouchSpace} onPress={onPress}>
                <Text style={styles.btnText(color)}>{text}</Text>
            </TouchableOpacity>
        </View>
    );
}

BarTopTwoBtn.propTypes = {
    leftBtnOnPress: PropTypes.func.isRequired,
    leftBtnTitle: PropTypes.string.isRequired,
    rightBtnOnPress: PropTypes.func.isRequired,
    rightBtnTitle: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
    colors: state.theme.colors
})

export default connect(mapStateToProps, null)(BarTopTwoBtn);