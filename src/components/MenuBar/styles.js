import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    containerMain: colors => ({
        flexDirection: 'row',
        height: 42,
        bottom: 0,
        position: 'absolute',
        backgroundColor: colors.menuBar.backgroundColor
    }),
    btnView: {
        // width: '33.33%',
        width: '50%',
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
    btnLineContainer: {
        width: '100%',
        position: 'absolute',
        bottom: 0,
    },
    btnSelectedLine: (colors, isSelected) => ({
        marginLeft: 'auto',
        marginRight: 'auto',
        width: 50,
        height: isSelected ? 1 : 0,
        backgroundColor: colors.menuBar.btnChecked 
    }),
    btnImageColor: (colors, isSelected) => (
        isSelected ? colors.menuBar.btnChecked : colors.menuBar.btnNoChecked
    )
})