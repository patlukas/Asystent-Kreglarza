import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: props => ({
        flex: 1,
        backgroundColor: props.backgroundColor,
        alignItems: 'center',
        justifyContent: 'center',
    }),
    text: {
        color: "#ffff00"
    }
})