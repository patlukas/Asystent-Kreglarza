import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    containers: (colors) => ({
      position: 'absolute',
      alignSelf:'flex-end',
      width: 65,
      height: 65,
      bottom: 11,
      right: 11,
      borderRadius: 90,
      backgroundColor: colors.result.btnAddNewResult.backgroundColor
    }),
    plusSign: (colors) => ({
      textAlign: 'center',
      color: colors.result.btnAddNewResult.color,
      lineHeight: 60,
      fontSize: 45
    })
})