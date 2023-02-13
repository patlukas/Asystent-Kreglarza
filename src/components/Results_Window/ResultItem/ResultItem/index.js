import React, {Component} from 'react';
import {Animated, Text, View, PanResponder} from 'react-native';
import { connect } from "react-redux";
import AdditionalOption from '../AdditionalOption';
import {styles} from "./styles";

class ResultItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            left: 0,
            dx: 0,
            timeStartTouch: null
        }
        this.panResponderMain = PanResponder.create({
            onStartShouldSetPanResponder: () => {
                this.setState({timeStartTouch: Date.now()})
                return false
            },
            onMoveShouldSetPanResponder: (_, gestureState) => {
                if(gestureState.dx > 8 || gestureState.dx < -8) return true
                if(this.state.timeStartTouch !== null && Date.now() - this.state.timeStartTouch > 500 && this.state.left == 0) {
                    this.setState({left: -161, dx: 0, timeStartTouch: null})
                    return true
                } 
                return false
            },
            onPanResponderMove: (_, gestureState) => {
                const {dx, vx} = gestureState
                let move = dx - this.state.dx
                if(vx > 3 || vx < -3) move *= 8
                else if(vx > 2 || vx < -2) move *= 4
                else if(vx > 1 || vx < -1) move *= 2
                let left = this.state.left + move
                if(left < -200) left = -200
                else if(left > 0) left = 0
                this.setState({left, dx})
            },
            onPanResponderRelease: this.onEndTouch,
            onPanResponderTerminate: this.onEndTouch,
        })
        this.panResponderClose = PanResponder.create({
            onStartShouldSetPanResponder: () => {
                this.setState({timeStartTouch: Date.now()})
                return false
            },
            onMoveShouldSetPanResponder: () => {
                if(this.state.timeStartTouch !== null && Date.now() - this.state.timeStartTouch > 200 && this.state.left == -200) {
                    this.setState({left: 0, dx: 0, timeStartTouch: null})
                } 
                return false
            }
        })
    }
    render() {
        const {item, colors, onEditResult, onDeleteResult} = this.props;
        let code = []
        if(item.gameType.isLeague) {
            code = <>
                <TextHead colors={colors} text={item.leagueData.enemyTeam[1]} />
                <League_TeamResultsAndDate colors={colors} item={item} />
                <League_ResultOfDuel colors={colors} result={item.leagueData.player.teamPoints} />
                <League_PlayerResults colors={colors} item={item} />
            </>
        }
        else {
            code = <>
                <BasicGame_NumberOfThrowsAndDate colors={colors} item={item} />
                <BasicGame_PlayerResults colors={colors} item={item} />
            </>
        }
        return (
            <View style={[{flexDirection: 'row', left: this.state.left}]} {...this.panResponderMain.panHandlers}>
                <Animated.View style={styles.container(item.gameType.id, colors, this.state.left)} 
                    {...this.panResponderClose.panHandlers}
                >
                    <TextHead colors={colors} text={item.gameType.name+" "+item.where[1]}  />
                    {code}
                    <TextComment colors={colors} text={item.comment}/>
                </Animated.View>
                <AdditionalOption 
                    width={-this.state.left} showText={this.state.left < -160}
                    showIcon={this.state.left < -50} onEdit={onEditResult} onDelete={onDeleteResult}
                />
            </View>
            
        )
    }
    onEndTouch = () => {
        if(this.state.left < -150) this.setState({left: -200, dx: 0})
        else this.setState({left: 0, dx: 0})
    }
}

const TextHead = ({text, colors}) => <Text style={styles.headText(colors)}>{text}</Text>;

const League_TeamResultsAndDate = ({colors, item}) => {
    const {sum, teamPoints, setPoints} = item.leagueData.team;
    var textSetPoints = getListTextSetPoints(setPoints);
    return (
        <View style={styles.viewRow}>
            <Text style={styles.cellMainInfo(colors, "31%")}>Suma: {sum}</Text>
            <View style={styles.cellMainInfo(colors, "38%")}>
                <View style={styles.league.matchResultContainer}>
                    <Text style={styles.league.setPoints(colors)}>{textSetPoints[0]}</Text> 
                    <Text style={styles.league.teamPoints(colors)}>{teamPoints[0]} : {teamPoints[1]}</Text>
                    <Text style={styles.league.setPoints(colors)}>{textSetPoints[1]}</Text>
                </View>
            </View>
            <Text style={styles.cellMainInfo(colors, "31%")}>{getDate(item.date)}</Text>
        </View>
    )
}

const League_ResultOfDuel = ({colors, result}) => {
    var textResult = "Pojedynek ";
    if(result == 0) textResult += "przegrany";
    else if(result == 0.5) textResult += "zremisowany";
    else textResult += "wygrany";
    return <Text style={styles.league.resultOfDuel(colors)}>{textResult}</Text>
}

const League_PlayerResults = ({colors, item}) => {
    const {suma, pelne, zbierane, dziury} = item.results;
    const {setPoints} = item.leagueData.player;
    const listWidthColumn = ['26%', '26%', '11%', '11%', '26%'];
    var listText = ["Pełne", "Zbierane", "X", "PS", "Suma"];
    var style = styles.playerResults.head(colors);
    var code = [];
    for(var i=-1; i<suma.length; i++) {
        if(i > -1) {
            style =  (i == 0) ? styles.playerResults.summary(colors) : styles.playerResults.lane(colors);
            listText = [pelne[i], zbierane[i], dziury[i], setPoints[i], suma[i]];
        }
        code.push(<PlayerResults_Row key={i} listText={listText} listWidth={listWidthColumn} style={style} />)
    }
    return code;
}

const PlayerResults_Row = ({listText, listWidth, style}) => {
    var code = [];
    for(var i=0; i<listText.length; i++) {
        code.push(<Text key={i} style={[style, styles.playerResults.column(listWidth[i])]}>{listText[i]}</Text>)
    }
    return <View style={styles.viewRow}>{code}</View>
}

const TextComment = ({text, colors}) => {
    if(text == "") return null;
    return <Text style={styles.comment(colors)}>{text}</Text>
}

const BasicGame_NumberOfThrowsAndDate = ({colors, item}) => {
    const {numberOfLanes, numberOfThrowsInLane} = item.lanes;
    const numberOfThrows = numberOfLanes * (numberOfThrowsInLane[0] + numberOfThrowsInLane[1]);
    return (
        <View style={styles.viewRow}>
            <Text style={styles.cellMainInfo(colors, "31%")}>{numberOfThrows} rzutów</Text>
            <View style={styles.cellMainInfo(colors, "38%")} />
            <Text style={styles.cellMainInfo(colors, "31%")}>{getDate(item.date)}</Text>
        </View>
    )
}

const BasicGame_PlayerResults = ({colors, item}) => {
    const {suma, pelne, zbierane, dziury} = item.results;
    const listWidthColumn = ['29%', '29%', '13%', '29%'];
    var listText = ["Pełne", "Zbierane", "X", "Suma"];
    var style = styles.playerResults.head(colors);
    var code = [];
    for(var i=-1; i<suma.length; i++) {
        if(i > -1) {
            style =  (i == 0) ? styles.playerResults.summary(colors) : styles.playerResults.lane(colors);
            listText = [pelne[i], zbierane[i], dziury[i], suma[i]];
        }
        code.push (<PlayerResults_Row key={i} listText={listText} listWidth={listWidthColumn} style={style}/>)
    }
    return code;
}

const getListTextSetPoints = (setPoints) => {
    var textSetPoints = ["("+setPoints[0]+")", "("+setPoints[1]+")"];
    if(textSetPoints[0].length < textSetPoints[1].length) textSetPoints[0] = " " + textSetPoints[0];
    else if(textSetPoints[0].length > textSetPoints[1].length) textSetPoints[1] += " ";
    return textSetPoints;
}

const getDate = (dateInt) => {
    var date = new Date(dateInt * 1000 * 3600 * 24);
    return ("0" + date.getDate()).slice(-2) + "-" + ("0"+(date.getMonth()+1)).slice(-2) + "-" + date.getFullYear();
}

const mapStateToProps = state => ({
    colors: state.theme.colors
})

export default connect(mapStateToProps, undefined)(ResultItem);