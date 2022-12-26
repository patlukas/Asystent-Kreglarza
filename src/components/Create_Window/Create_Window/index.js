import React, {Component} from 'react';
import { connect } from "react-redux";
import { onSelectWindow, onEditCreateResult } from '../../../actions';
import BarTopTwoBtn from '../../BarTopTwoBtn';
import FormForEditResult from '../../FormForEditResult/FormForEditResult';
import MenuBar from '../../MenuBar';

class Create_Window extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const {onSelectWindow, createResult, onEditCreateResult} = this.props;
        const clearResult = {
            id: -1,
            gameType: {
                id: -1,
                name: "",
                keyHowManyLanes: -1
            },
            date: -1, //liczba dni od 01.01.1970
            leagueData: {
                team: {
                    sum: -1,
                    teamPoints: -1,
                    setPoints: [1, 23]-1,
                },
                player: {
                    teamPoints: -1,
                    setPoints: []
                },
                enemyTeam: -1,
                inHome: -1,
            },
            results: {
                suma: [],
                pelne: [],
                zbierane: [],
                dziury: [],
            },
            numberOfLanes: -1,
            numberOfThrowsInLane: -1,
            where: -1,
            comment: "",
            season: ""
        };
        return (
            <>
                <BarTopTwoBtn 
                    leftBtnTitle="Powrót" leftBtnOnPress={() => {onSelectWindow(1)}}
                    rightBtnTitle="Zapisz" rightBtnOnPress={() => {console.log("Tworzenie")}}
                />
                <FormForEditResult 
                    title={"New Wynik"}
                    nameClearButton={"Wyczyść formularz"} 
                    onChange={onEditCreateResult}
                    editedResult={createResult}
                    initialEditedResult={clearResult}
                />
                <MenuBar />
            </>
        );
    }
}

const mapStateToProps = state => ({
    createResult: state.createResult
})

const mapDispatchToProps = dispatch => ({
    onSelectWindow: (windowId) => dispatch(onSelectWindow(windowId)),
    onEditCreateResult: (resultItem) => dispatch(onEditCreateResult(resultItem)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Create_Window);