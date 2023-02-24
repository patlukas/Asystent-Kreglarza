import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    screenContainer: {
        position: "absolute",
        height: "100%",
        width: "100%"
    },
    mainContainer: (top, height) => ({
        top,
        height,
        position: "absolute", 
        right: 4
    }),
    optionsContainer: (backgroundColor, borderColor) => ({
        borderColor, backgroundColor,
        borderWidth: 6,
        borderTopWidth: 0
    }),
    optionContainer: (backgroundColor) => ({
        backgroundColor,
        flexDirection: 'row',
        paddingLeft: 10,
        paddingRight: 30
    }),
    optionText: (color) => ({
        color,
        marginTop: 10,
        marginBottom: 10
    }),
    imgContainer: {
        position: "absolute",
        right: 0,
        height: "100%",
        justifyContent: 'center', 
        alignItems: 'center',
        verticalAlign: "center"
    },
    imgCheckMark: (display) => ({
        display,
        height: 25,
        width: 25,
        marginRight: 5
    }),
    btnText: (color) => ({
        fontSize: 20,
        paddingTop: 3,
        color: color
    }),
    btnTouchSpace: {
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 2,
        paddingBottom: 2,
        position: "absolute",
        right: 0
    },
    btnContainer: {
        width: "50%", 
        height: 39, 
        top: -39, 
        position: "absolute", 
        right: 0, 
        zIndex: 3
    }
})