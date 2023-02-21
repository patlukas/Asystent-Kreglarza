import React, {Component} from 'react';
import {connect} from "react-redux";
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {onLoadResultsFromBackup} from "../../../actions"
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import {onCheckResultIsComplete, onPrepareResultsToSave} from "../../FormForEditResult/FormForEditResult/scriptCheckAndPrepareResult"
import AlertOneOption from "../../Alerty/AlertOneOption"
import AlertTwoOption from '../../Alerty/AlertTwoOption';


class Backup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAlertErrorLoad: false,
            showAlertBeforeFinishLoad: false,
            loadedList: [],
            showAlertSuccess: false,
        }
    }
    render() {
        const nr = this.state.loadedList.length
        const nrNow = this.props.listOfResults.length
        const {color, backgroundColor} = this.props.colors.form.clearBtn
        return (
            <>
                <View style={styles.mainContainer}>
                    <Text style={styles.title(this.props.colors.form.main)}>Kopia zapasowa</Text>
                    <Button 
                        onPress={this.onCreateBackup} title="Stwórz kopię"
                        color={color} backgroundColor={backgroundColor}
                    />
                    <Button 
                        onPress={this.onLoadBackup} title="Wgraj kopię"
                        color={color} backgroundColor={backgroundColor}
                    />
                </View>
                <AlertOneOption 
                    visible={this.state.showAlertErrorLoad}
                    onPress={() => this.setState({showAlertErrorLoad: false})}
                    title="Nieoczekiwany błąd"
                    optionName="OK"
                    subtitle="Wystąpił błąd podczas wgrywania kopii zapasowej"
                />
                <AlertTwoOption
                    visible={this.state.showAlertBeforeFinishLoad}
                    title={"Czy na pewno chcesz zamienić aktualnie przechowywane " + nrNow + " wyników, na kopię zawierającą "+nr+" wyników?"}
                    onPressNo={() => this.setState({showAlertBeforeFinishLoad: false})}
                    onPressYes={this.onFinishLoadBackup}
                />
                <AlertOneOption 
                    visible={this.state.showAlertSuccess}
                    onPress={() => this.setState({showAlertSuccess: false})}
                    title="Wgrywanie ukończone"
                    optionName="OK"
                    subtitle="Wgrywanie kopii zapasowej ukończyło się pomyślnie"
                />
            </>
        )
    }

    onCreateBackup = async () => {
        try {
            const uri = FileSystem.documentDirectory + `AK-backup(${getDate()}).txt`
            await FileSystem.writeAsStringAsync(uri, JSON.stringify(this.props.listOfResults))
            await Sharing.shareAsync(uri)
        } catch (error) {
            console.log(error);
        }
    }

    onLoadBackup = async () => {
        try {
            result = await DocumentPicker.getDocumentAsync({type: "text/plain"})
            if (result.type === 'success') {
                const fileContent = await FileSystem.readAsStringAsync(result.uri);
                const loadedData = await JSON.parse(fileContent)
                listResult = []
                loadedData.forEach((element, index) => {
                    let isComplete = onCheckResultIsComplete(element, this.props.listOfGameTypes)
                    if(!isComplete[0]) throw false
                    element = onPrepareResultsToSave(element)
                    element.id = index+1
                    listResult.push(element)
                });
                this.setState({showAlertBeforeFinishLoad: true, loadedList: listResult})
            }
        } catch (error) {
            this.setState({showAlertErrorLoad: true})
        }
    }

    onFinishLoadBackup = () => {
        this.props.onLoadResultsFromBackup(this.state.loadedList)
        this.setState({showAlertBeforeFinishLoad: false, showAlertSuccess: true})
    }
}

const Button = ({onPress, title, backgroundColor, color}) => {
    return (
        <TouchableOpacity style={styles.button(backgroundColor)} onPress={onPress} >
            <Text style={styles.buttonText(color)}>{title}</Text>
        </TouchableOpacity>
    )
}

const getDate = () => {
    let yourDate = new Date()
    return yourDate.toISOString().split('T')[0]
}

const styles = StyleSheet.create({
    mainContainer: {
        flexWrap: 'wrap', 
        flexDirection: 'row'
    },
    button: (backgroundColor) => ({
        backgroundColor,
        alignItems: "center",
        borderRadius: 10,
        width: "40%",
        marginLeft: "5%",
        marginRight: "5%",
        paddingTop: 6,
        paddingBottom: 6
    }),
    buttonText: (color) => ({
        color,
        fontWeight: "bold",
        fontSize: 13
    }),
    title: (color) => ({
        color,
        width: "100%",
        textAlign: "center",
        fontSize: 16,
        marginBottom: 6
    })
})

const mapStateToProps = state => ({
    listOfResults: state.listOfResults,
    listOfGameTypes: state.listOfGameTypes,
    colors: state.theme.colors
})

const mapDispatchToProps = dispatch => ({
    onLoadResultsFromBackup: (listOfResults) => dispatch(onLoadResultsFromBackup(listOfResults))
})

export default connect(mapStateToProps, mapDispatchToProps)(Backup);