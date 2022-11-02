import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    contenerMain: colors => ({
        flexDirection: 'row',
        width: '100%',
        height: 42,
        bottom: 0,
        position: 'absolute',
        backgroundColor: colors.bgMenuBar
    }),
    widthBtn: {
        width: '33.33%',
    },
    touchableArea: {
        width: '100%',
        height: '100%',
    },
    imageStyle: {
        height: 31,
        width: 31,
        marginTop: 6,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    lineContener: {
        width: '100%',
        position: 'absolute',
        bottom: 0,
    },
    line: {
        marginLeft: 'auto',
        marginRight: 'auto',
        width: 50,
    }
})