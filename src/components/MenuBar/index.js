import React, {Component} from 'react';
import {View, TouchableOpacity, Image, Keyboard} from 'react-native';
import { connect } from "react-redux";
import { onSelectWindow } from '../../actions';
import { styles } from "./styles";

class MenuBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: true
        }
    }
    componentDidMount() {
        this.keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", this.onShowKeyboard)
        this.keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", this.onHideKeyboard)
    }
    componentWillUnmount() {
        this.keyboardDidShowListener.remove()
        this.keyboardDidHideListener.remove()
    }
    onShowKeyboard = () => this.setState({show: false})
    onHideKeyboard = () => this.setState({show: true})
    render() {
        const {selectedWindow, onSelectWindow, colors} = this.props;
        if(!this.state.show) return null
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
        // require('../../assets/images/stat.png'),
        require('../../assets/images/settings.png'),
    ];
    const listId = [1, 3]
    for (let i = 0; i < path.length; i++) {
        var isSelected = (listId[i] == selectedWindow);
        code.push(
            <MenuBtn
                key={listId[i]}
                idBtn={listId[i]}
                onSelectWindow={onSelectWindow}
                imageSource={path[i]}
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