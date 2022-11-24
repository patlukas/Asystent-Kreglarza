import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    mainContainers: (colors) => ({
        borderColor: colors.form.main,
        width: "45%",
        height: 38,
        borderWidth: 1,
        marginTop: 23,
        marginLeft: "2%",
    }),
    container: {
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "auto",
        marginBottom: "auto",
        flexWrap: 'wrap', 
        flexDirection: 'row',
    },
    dateText: (colors) => ({
        color: colors.form.dataPicker,
        fontWeight: "bold",
        fontSize: 16
    }),
    calenderIcon: {
        width: 20,
        height: 20,
        marginLeft: 5,
    }
})