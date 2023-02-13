import React, {Component} from 'react';
import { connect } from "react-redux";
import { BackHandler } from 'react-native';
import { onSelectWindow, onEditCreateResult, onCreateNewResult } from '../../../actions';
import AlertOneOption from '../../Alerty/AlertOneOption';
import BarTopTwoBtn from '../../BarTopTwoBtn';
import FormForEditResult, {checkResultIsComplete, prepareResultsToSave} from '../../FormForEditResult/FormForEditResult';
import MenuBar from '../../MenuBar';

class Create_Window extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAlertSave: false
        }
        this.clearResult = {
            id: -1,
            gameType: {
                id: -1,
                name: "",
                keyHowManyLanes: -1,
                isLeague: false
            },
            date: -1, //liczba dni od 01.01.1970
            leagueData: {
                team: {
                    sum: -1,
                    teamPoints: [],
                    setPoints: [],
                },
                player: {
                    canWinDuel: false,
                    teamPoints: -1,
                    setPoints: []
                },
                enemyTeam: [],
                inHome: -1,
            },
            results: {
                suma: [],
                pelne: [],
                zbierane: [],
                dziury: [],
            },
            lanes: {
                numberOfLanes: -1,
                numberOfLanesInForm: -1,
                numberOfThrowsInLane: []
            },
            where: [],
            comment: "",
            season: ""
        };
        this.onBack = this.onBack.bind(this)
        this.onCreateResult = this.onCreateResult.bind(this)
    }
    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.onBack)
    }
    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.onBack)
    }
    onBack() {
        this.props.onSelectWindow(1)
        return true
    }
    render() {
        const {onSelectWindow, createResult, onEditCreateResult} = this.props;
        return (
            <>
                <BarTopTwoBtn 
                    leftBtnTitle="Powrót" leftBtnOnPress={() => onSelectWindow(1)}
                    rightBtnTitle="Zapisz" rightBtnOnPress={this.onCreateResult}
                />
                <FormForEditResult 
                    title="Tworzenie wyniku"
                    nameClearButton="Wyczyść formularz"
                    onChange={onEditCreateResult}
                    editedResult={createResult}
                    initialEditedResult={this.clearResult}
                />
                <MenuBar />
                <AlertOneOption 
                    visible={this.state.showAlertSave}
                    onPress={() => this.setState({showAlertSave: false})}
                    title="Brakujące dane"
                    subtitle={this.state.subtitleAlertSave}
                    optionName="Zamknij powiadomienie"
                />
            </>
        );
    }
    onCreateResult() {
        const {createResult, listOfGameTypes, onCreateNewResult, onEditCreateResult, onSelectWindow} = this.props
        const checkResult = checkResultIsComplete(createResult, listOfGameTypes)
        if(!checkResult[0]) {
            this.setState({showAlertSave: true, subtitleAlertSave: checkResult[1]})
            return
        }
        prepareResultsToSave(createResult)
        onCreateNewResult(createResult)
        onEditCreateResult(this.clearResult)
        onSelectWindow(1)
    }
}

const mapStateToProps = state => ({
    createResult: state.createResult,
    listOfGameTypes: state.listOfGameTypes
})

const mapDispatchToProps = dispatch => ({
    onSelectWindow: (windowId) => dispatch(onSelectWindow(windowId)),
    onEditCreateResult: (resultItem) => dispatch(onEditCreateResult(resultItem)),
    onCreateNewResult: (resultItem) => dispatch(onCreateNewResult(resultItem))
})

export default connect(mapStateToProps, mapDispatchToProps)(Create_Window);