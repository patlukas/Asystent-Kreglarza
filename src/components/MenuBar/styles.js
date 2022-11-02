import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    contenerMain: colors => ({
        flexDirection: 'row',
        width: '100%',
        height: 42,
        bottom: 0,
        position: 'absolute',
        backgroundColor: colors.menuBar_bg
    }),
    btnView: {
        width: '33.33%',
    },
    btnTouchableArea: {
        width: '100%',
        height: '100%',
    },
    btnImageStyle: {
        height: 31,
        width: 31,
        marginTop: 6,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    btnLineContener: {
        width: '100%',
        position: 'absolute',
        bottom: 0,
    },
    btnSelectedLine: (colors, isSelected) => ({
        marginLeft: 'auto',
        marginRight: 'auto',
        width: 50,
        height: isSelected ? 1 : 0,
        backgroundColor: colors.menuBar_btnChecked
    }),
    btnImageColor: (colors, isSelected) => (
        isSelected ? colors.menuBar_btnChecked : colors.menuBar_btnNoChecked
    )
})