import React from 'react';
import {Text, View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {connect} from "react-redux";
import PropTypes from 'prop-types';

const AdditionalOption = ({width, showText, showIcon, onEdit, onDelete, colors}) => {
    const {editBg, editFocusBg, editColor, deleteBg, deleteFocusBg, deleteColor} = colors.resultItem
    return (
        <View style={styles.mainContainer(width, colors.listResultsBorder)}>
            <View style={styles.containerOption(editFocusBg)}>
                <TouchableOpacity style={styles.touchableOption(editBg)} onPress={onEdit}>
                    <Image 
                        source={require("../../../../assets/images/edit.png")} 
                        style={styles.image(showIcon ? 1 : 0)} resizeMode="center" tintColor={editColor}
                    />
                    <Text style={styles.text(editColor)}>{showText ? "EDYTUJ" : ""}</Text>
                </TouchableOpacity>
            </View>
            
            <View style={styles.containerOption(deleteFocusBg)}>
                <TouchableOpacity style={styles.touchableOption(deleteBg)} onPress={onDelete}>
                    <Image 
                        source={require("../../../../assets/images/delete.png")} 
                        style={styles.image(showIcon ? 1 : 0)} resizeMode="center" tintColor={deleteColor}
                    />
                    <Text style={styles.text(deleteColor)}>{showText ? "USUŃ" : ""}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: (width, borderColor) => ({
        width, borderColor,
        backgroundColor: borderColor, 
        borderBottomWidth: 3,
        borderTopWidth: 3,
        flexDirection: "row"
    }),
    containerOption: (backgroundColor) => ({
        backgroundColor,
        width: "50%"
    }),
    touchableOption: (backgroundColor) => ({
        backgroundColor, 
        position: 'absolute', 
        justifyContent: 'center',
        alignItems: 'center',
        width: "100%", 
        height: "100%"
    }),
    image: (opacity) => ({
        opacity,
        height: '40%', 
        width: '40%',
    }),
    text: (color) => ({
        color,
        fontWeight: "bold",
        fontSize: 20,
        paddingBottom: 20
    })
})

AdditionalOption.propTypes = {
    width: PropTypes.number.isRequired,
    showText: PropTypes.bool.isRequired,
    showIcon: PropTypes.bool.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    colors: state.theme.colors
})

export default connect(mapStateToProps, undefined)(AdditionalOption);