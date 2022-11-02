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
        const {actuallyWindow, onSelectWindow} = this.props;
        const {backgroundColor, colorBtnChecked, colorBtnNoChecked} = this.props.kolorystyka;
        return (
            <>
                <View style={styles.contenerMain(this.props.colors)}>
                    <AllButtons 
                        actuallyWindow={actuallyWindow}
                        onSelectWindow={onSelectWindow}
                        colorBtnChecked={colorBtnChecked}
                        colorBtnNoChecked={colorBtnNoChecked}
                        colors={this.props.colors}
                    />
                </View>
            </>
            );
    }
}
const AllButtons = ({actuallyWindow, onSelectWindow, colorBtnChecked, colorBtnNoChecked, colors}) => {
    let code = [];
    const path = [
        require('../../assets/images/home.png'),
        require('../../assets/images/stat.png'),
        require('../../assets/images/settings.png'),
    ];
    for (let i = 1; i <= path.length; i++) {
        var isSelected = (i == actuallyWindow);
        var colorBtn = isSelected ? colorBtnChecked : colorBtnNoChecked;
        code.push(
            <MenuBarBtn
                key={i}
                idBtn={i}
                onSelectWindow={onSelectWindow}
                imageSource={path[i - 1]}
                colorBtn={colorBtn}
                isSelected={isSelected}
                colors={colors}
            />,
        );
    }
    return code;
}
const MenuBarBtn = (props) => {
    const {idBtn, onSelectWindow, imageSource, colorBtn, isSelected, colors} = props; 
    return (
        <View style={styles.widthBtn}>
            <TouchableOpacity onPress={() => {onSelectWindow(idBtn)}} style={styles.touchableArea}>
                <Image
                    source={imageSource}
                    style={styles.imageStyle}
                    tintColor={colorBtn}
                />
                <View style={styles.lineContener}>
                    <View style={[styles.line, {backgroundColor: colorBtn, height: isSelected ? 1 : 0}]}/>
                </View>
            </TouchableOpacity>
        </View>
    );
}

/*MenuBar.propTypes = {
    kolorystyka: PropTypes.object.isRequired,
}*/

const mapStateToProps = state => ({
    actuallyWindow: state.selectedWindow,
    colors: state.theme.colors
})

const mapDispatchToProps = dispatch => ({
    onSelectWindow: (idWindow) => dispatch(onSelectWindow(idWindow))
})

export default connect(mapStateToProps, mapDispatchToProps)(MenuBar);