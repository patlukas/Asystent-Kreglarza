import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    touchableOpacityContainer: {
        width:'100%',
        height: '100%',
        position:'absolute'
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: '10%',
    },
    viewContainer: (backgroundColor, borderColor) => ({
        backgroundColor,
        borderColor,
        marginLeft: '5%',
        marginRight: '5%',
        padding: 15,
        borderRadius: 20,
        borderWidth: 5,
    }),
    textTitle: (color) => ({
        color,
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
    }),
    textSubtitle: (color, display) => ({
        color, display,
        fontSize: 17,
        textAlign: 'center',
    }),
    buttonTouchableOpacity: (backgroundColor) => ({
        backgroundColor,
        borderRadius: 15,
        marginTop: 15,
    }),
    buttonText: (color) => ({
        color,
        width: '100%',
        textAlign: 'center',
        lineHeight: 40,
        fontSize: 18,
        paddingLeft: 15,
        paddingRight: 15
    })
})