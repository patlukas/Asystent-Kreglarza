import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: (backgroundColor) => ({
        position: 'relative',
        width: '100%',
        height: 39,
        backgroundColor: backgroundColor
    }),
    btnLeft: {
        position: 'absolute',
        left: 0,
    },
    btnRight: {
        position: 'absolute',
        right: 0,
    },
    btnTouchSpace: {
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 2,
        paddingBottom: 2,
    },
    btnText: (color) => ({
        fontSize: 20,
        paddingTop: 3,
        color: color
    })
})