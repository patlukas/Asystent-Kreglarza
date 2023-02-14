import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: (gameTypeId, colors) => ({
        backgroundColor: colors.resultItem.listGameType[gameTypeId],
        paddingTop: 7,
        paddingBottom: 7,
        borderColor: colors.resultItem.borderColor,
        borderBottomWidth: 3,
        borderTopWidth: 3,
        width: "100%"
    }),
    headText: (colors)=> ({
        color: colors.resultItem.fontMain,
        width: "100%",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 19
    }),
    viewRow: {
        width: 'auto',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    league: {
        setPoints: (colors) => ({
            fontSize: 10,
            color: colors.resultItem.fontSecond,
        }),
        teamPoints: (colors) => ({
            color: colors.resultItem.fontMain,
            fontWeight: "bold",
            fontSize: 16
        }),
        matchResultContainer: {
            alignItems: "baseline", 
            justifyContent: "center", 
            flexDirection: 'row', 
            flexWrap: 'wrap'
        },
        resultOfDuel: (colors) => ({
            textAlign: "center",
            color: colors.resultItem.fontMain,
            fontWeight: "bold",
            fontSize: 18,
            marginTop: 4
        }),
    },
    cellMainInfo: (colors, width) => ({
        color: colors.resultItem.fontMain,
        width: width,
        textAlign: "center",
        fontSize: 16
    }),
    playerResults: {
        head: (colors) => ({
            fontWeight: "bold",
            color: colors.resultItem.fontMain,
            fontSize: 17,
            marginTop: 5
        }),
        summary: (colors) => ({
            fontWeight: "bold",
            color: colors.resultItem.fontMain,
            fontSize: 18,
            lineHeight: 18,
        }),
        lane: (colors) => ({
            color: colors.resultItem.fontMain,
            fontSize: 16,
            lineHeight: 16
        }),
        column: (width) => ({
            textAlign: "center",
            width: width
        }),
    },
    comment: (colors) => ({
        color: colors.resultItem.fontMain,
        textAlign: "center",
        fontSize: 12,
        marginLeft: "4%",
        marginRight: "4%",
        marginTop: 4,
    })
})