import React from 'react';
import { connect } from "react-redux";
import {Text, View, TouchableOpacity, Modal} from 'react-native';
import PropTypes from 'prop-types';
import { styles } from "./styles";

const AlertOneOption = (props) => {
    const {visible, onPress, title, optionName, subtitle, colors} = props;
    const {backgroundColor, borderColor, subtitleColor, titleColor, optionBgColor, optionColor} = colors.alert
    return (
        <Modal transparent={true} visible={visible} onRequestClose={onPress} animationType="fade">
            <TouchableOpacity onPress={onPress} style={styles.touchableOpacityContainer}/>
            <View style={styles.container}>
                <View style={styles.viewContainer(backgroundColor, borderColor)}>
                    <Text style={styles.textTitle(titleColor)}>{title}</Text>
                    <Text style={styles.textSubtitle(subtitleColor, (subtitle == '' ? 'none' : 'flex'))}>{subtitle}</Text>
                    <TouchableOpacity style={styles.buttonTouchableOpacity(optionBgColor)} onPress={onPress}>
                        <Text style={styles.buttonText(optionColor)}>{optionName}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
  )
}

AlertOneOption.propTypes = {
    visible: PropTypes.bool.isRequired,
    onPress: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    optionName: PropTypes.string.isRequired,
    subtitle: PropTypes.string
}

AlertOneOption.defaultProps = {
    subtitle: '',
}

const mapStateToProps = state => ({
    colors: state.theme.colors
})

export default connect(mapStateToProps, undefined)(AlertOneOption);