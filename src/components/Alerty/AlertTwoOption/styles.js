import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    touchableAllView: {
        width: '100%',
        height: '100%',
        position:'absolute',
    },
    viewContainer: (backgroundColor, borderColor) => ({
        backgroundColor, borderColor,
        width: '80%',
        borderWidth: 5,
        borderRadius: 25,
        padding: 10,
    }),
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: '10%',
    },
    textMain: (color) => ({
        color,
        textAlign: 'center',
        fontSize: 22,
    }),
    viewBtnContainerMain:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 15,
    },
    buttonTouchableOpacity: (backgroundColor) => ({
        backgroundColor,
        width: 100,
        borderRadius: 15,
        height: 40,
        flex: 1,
        marginLeft: 10,
        marginRight: 10,
    }),
    buttonText: (color) => ({
        color,
        lineHeight: 40,
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold'
    }),
})