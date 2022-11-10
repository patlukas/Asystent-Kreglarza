import React, {Component} from 'react';
import {Button, Text, View} from 'react-native';
import { connect } from "react-redux";
import {styles} from "./styles";

class Results_ResultItem extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const {item, colors} = this.props;
        switch(item.gameType.id) {
            case 1:
            case 2:
                return (
                    <View style={styles.container(item.gameType.id, colors)}>
                        <TextHead colors={colors} text={item.gameType.name+" "+item.where[1]}  />
                        <TextHead colors={colors} text={item.leagueData.enemyTeam[1]} />
                        <League_TeamResultsAndDate colors={colors} item={item} />
                        <League_ResultOfDuel colors={colors} result={item.leagueData.player.teamPoints} />
                        <League_PlayerResults colors={colors} item={item} />
                        <TextComment colors={colors} text={item.comment}/>
                    </View>
                )
            case 3:
            case 4:
                return (
                    <View style={styles.container(item.gameType.id, colors)}>
                        <TextHead colors={colors} text={item.gameType.name+" "+item.where[1]}  />
                        <BasicGame_NumberOfThrowsAndDate colors={colors} item={item} />
                        <BasicGame_PlayerResults colors={colors} item={item} />
                        <TextComment colors={colors} text={item.comment}/>
                    </View>
                )
        }
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
        code.push (
            <PlayerResults_Row key={i} listText={listText} listWidth={listWidthColumn} style={style} />
        )
    }
    return code;
}

const PlayerResults_Row = ({listText, listWidth, style}) => {
    var code = [];
    for(var i=0; i<listText.length; i++) {
        code.push(
            <Text key={i} style={[style, styles.playerResults.column(listWidth[i])]}>
                {listText[i]}
            </Text>
        )
    }
    return <View style={styles.viewRow}>{code}</View>
}

const TextComment = ({text, colors}) => {
    if(text == "") return null;
    return <Text style={styles.comment(colors)}>{text}</Text>
}

const BasicGame_NumberOfThrowsAndDate = ({colors, item}) => {
    const {numberOfLanes, numberOfThrowsInLane} = item;
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
        code.push (
            <PlayerResults_Row key={i} listText={listText} listWidth={listWidthColumn} style={style} />
        )
    }
    return code;
}

const getListTextSetPoints = (setPoints) => {
    //Funkcja wyrównuje długość ciągów znaków z punktami setowymi drużyn
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

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Results_ResultItem);