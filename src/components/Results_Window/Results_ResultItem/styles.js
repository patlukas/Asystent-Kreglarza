import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: (gameTypeId, colors) => ({
        backgroundColor: colors.gameType[gameTypeId],
        paddingTop: 7,
        paddingBottom: 7,
        borderColor: colors.listResultsBorder,
        borderBottomWidth: 3,
        borderTopWidth: 3
    }),
    headText: (colors)=> ({
        color: colors.font.basic,
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
            color: colors.font.notImportant,
        }),
        teamPoints: (colors) => ({
            color: colors.font.basic,
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
            color: colors.font.basic,
            fontWeight: "bold",
            fontSize: 18,
            marginTop: 4
        }),
    },
    cellMainInfo: (colors, width) => ({
        color: colors.font.basic,
        width: width,
        textAlign: "center",
        fontSize: 16
    }),
    playerResults: {
        head: (colors) => ({
            fontWeight: "bold",
            color: colors.font.basic,
            fontSize: 17,
            marginTop: 5
        }),
        summary: (colors) => ({
            fontWeight: "bold",
            color: colors.font.basic,
            fontSize: 18,
            lineHeight: 18,
        }),
        lane: (colors) => ({
            color: colors.font.basic,
            fontSize: 16,
            lineHeight: 16
        }),
        column: (width) => ({
            textAlign: "center",
            width: width
        }),
    },
    comment: (colors) => ({
        color: colors.font.basic,
        textAlign: "center",
        fontSize: 12,
        marginLeft: "4%",
        marginRight: "4%",
        marginTop: 4,
    })
})