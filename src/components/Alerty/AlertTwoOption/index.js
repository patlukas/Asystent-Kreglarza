import React from 'react';
import { connect } from "react-redux";
import {Text, View, TouchableOpacity, Modal} from 'react-native';
import PropTypes from 'prop-types';
import { styles } from "./styles";

const AlertTwoOption = (props) => {
    const {visible, title, onPressNo, onPressYes, colors} = props
    const {backgroundColor, borderColor, titleColor, noBgColor, yesBgColor, noColor, yesColor} = colors.alert

    return (
        <Modal transparent={true} visible={visible} onRequestClose={onPressNo} animationType="fade">
            <TouchableOpacity onPress={onPressNo} style={styles.touchableAllView}/>
            <View style={styles.container}>
                <View style={styles.viewContainer(backgroundColor, borderColor)}>
                    <Text style={styles.textMain(titleColor)}>{title}</Text>
                    <View style={styles.viewBtnContainerMain}>
                        <TouchableOpacity style={styles.buttonTouchableOpacity(noBgColor)} onPress={onPressNo}>
                            <Text style={styles.buttonText(noColor)}>NIE</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.buttonTouchableOpacity(yesBgColor)} onPress={onPressYes}>
                            <Text style={styles.buttonText(yesColor)}>TAK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

AlertTwoOption.propTypes = {
  visible: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  onPressYes: PropTypes.func.isRequired,
  onPressNo: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    colors: state.theme.colors
})

export default connect(mapStateToProps, undefined)(AlertTwoOption);