import React, {Component} from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import { connect } from "react-redux";
import { onSelectWindow } from '../../actions';
import { styles } from "./styles";

class MenuBar extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const {selectedWindow, onSelectWindow, colors} = this.props;
        return (
            <View style={styles.containerMain(colors)}>
                <BarOfMenuBtn 
                    selectedWindow={selectedWindow}
                    onSelectWindow={onSelectWindow}
                    colors={colors}
                />
            </View>            
        );
    }
}
const BarOfMenuBtn = ({selectedWindow, onSelectWindow, colors}) => {
    let code = [];
    const path = [
        require('../../assets/images/home.png'),
        require('../../assets/images/stat.png'),
        require('../../assets/images/settings.png'),
    ];
    for (let i = 1; i <= path.length; i++) {
        var isSelected = (i == selectedWindow);
        code.push(
            <MenuBtn
                key={i}
                idBtn={i}
                onSelectWindow={onSelectWindow}
                imageSource={path[i - 1]}
                isSelected={isSelected}
                colors={colors}
            />,
        );
    }
    return code;
}
const MenuBtn = ({idBtn, onSelectWindow, imageSource, isSelected, colors}) => {
    return (
        <View style={styles.btnView}>
            <TouchableOpacity onPress={() => {onSelectWindow(idBtn)}} style={styles.btnTouchableArea} >
                <Image
                    source={imageSource}
                    style={styles.btnImageStyle}
                    tintColor={styles.btnImageColor(colors, isSelected)}
                />
                <View style={styles.btnLineContainer}>
                    <View style={styles.btnSelectedLine(colors, isSelected)}/>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const mapStateToProps = state => ({
    selectedWindow: state.selectedWindow,
    colors: state.theme.colors
})

const mapDispatchToProps = dispatch => ({
    onSelectWindow: (idWindow) => dispatch(onSelectWindow(idWindow))
})

export default connect(mapStateToProps, mapDispatchToProps)(MenuBar);