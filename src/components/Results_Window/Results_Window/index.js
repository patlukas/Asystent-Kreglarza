import React, {Component} from 'react';
import {FlatList, View, Text, StyleSheet, Animated} from 'react-native';
import { connect } from "react-redux";
import { onDeleteResult, onSetSortValue } from '../../../actions';
import AlertTwoOption from '../../Alerty/AlertTwoOption';
import BarTopTwoBtn from '../../BarTopTwoBtn';
import Edit_Window from '../../Edit_Window';
import MenuBar from '../../MenuBar';
import ResultItem from '../ResultItem/ResultItem';
import Results_ButtonAddNewResult from '../Results_ButtonAddNewResult';
import Sort from '../Sort';
import { sortListOfResults } from './scriptSort';


class Results_Window extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editedResult: null,
            idDeleteResult: null,
            heightSort: new Animated.Value(0),
            sortVisible: false
        }
        this.beforeOnDeleteResult = this.beforeOnDeleteResult.bind(this)
    }
    render() {
        const heightSort = this.state.heightSort.interpolate({
            inputRange: [0, 1],
            outputRange: ["0%", "75%"]
        })
        let {listOfResults, sortValue, colors} = this.props;
        listOfResults = sortListOfResults(listOfResults, sortValue)
        let code = []
        if(this.state.editedResult !== null) {
            return(
                <Edit_Window 
                    editedResult={this.state.editedResult}
                    onEndEdit={() => this.setState({editedResult: null})}
                />
            )
        }
        if(listOfResults.length == 0) code.push(<WelcomeWindow key={0} color={colors.form.main} colorSecond={colors.form.second}/>)
        else code.push(
            <FlatList 
                key={0}
                data={listOfResults} 
                renderItem={({item}) => 
                    <ResultItem 
                        item={item} 
                        onDeleteResult={() => this.setState({idDeleteResult: item.id})} 
                        onEditResult={() => this.setState({editedResult: item})}
                    />
                }
                contentContainerStyle={{ paddingBottom: 87 }}
            />
        )
        return (
            <>
                <BarTopTwoBtn 
                    leftBtnTitle="" 
                    leftBtnOnPress={() => {}}
                    rightBtnTitle="Sortuj" 
                    rightBtnOnPress={this.animatedSortHeight}
                />
                <View style={styles.resultsContainer}>
                    {code}
                    <Results_ButtonAddNewResult />
                    <Sort 
                        visible={this.state.sortVisible}
                        selected={sortValue}
                        height={heightSort} 
                        onClose={this.animatedSortHeight}
                        onSelect={this.onSelectSortValue}
                    />
                </View>
                <MenuBar />
                <AlertTwoOption
                    visible={this.state.idDeleteResult !== null}
                    title="Czy na pewno chcesz usunąć wynik?"
                    onPressNo={() => this.setState({idDeleteResult: null})}
                    onPressYes={this.beforeOnDeleteResult}
                />
            </>
        );
    }

    beforeOnDeleteResult = () => {
        this.props.onDeleteResult(this.state.idDeleteResult)
        this.setState({idDeleteResult: null})
    }

    animatedSortHeight = () => {
        let toValue = 1
        if(this.state.sortVisible) toValue = 0
        let abs = toValue - this.state.heightSort._value
        if(abs < 0) abs *= -1
        const duration = 750 * abs
        
        Animated.timing(this.state.heightSort, {toValue, duration, useNativeDriver: false}).start()
        if(toValue == 1) this.setState({sortVisible: true})
        else setTimeout(() => this.setState({sortVisible: false}), duration)
    }

    onSelectSortValue = (sortValue) => {
        this.props.onSetSortValue(sortValue)
        this.animatedSortHeight()
    }
}

const WelcomeWindow = ({color, colorSecond}) => {
    return (
        <View style={styles.containerWelcome}>
            <Text style={styles.textWelcome(color)}>Witaj w aplikacji</Text>
            <Text style={styles.textWelcomeBold(color)}>„ASYSTENT KRĘGLARZA”</Text>
            <Text style={styles.textTip(colorSecond)}>
                Aby dodać pierwszy wynik, kliknij przycisk ze znakiem „+” znajdujący się w prawym dolnym rogu
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    containerWelcome: {
        justifyContent: "center", 
        height: "100%"
    },
    textWelcome: (color) => ({
        color,
        fontSize: 25, 
        textAlign: "center"
    }),
    textWelcomeBold: (color) => ({
        ...styles.textWelcome(color),
        fontWeight: "bold"
    }),
    textTip: (color) => ({
        color, 
        fontSize: 16, 
        textAlign: "center", 
        marginTop: 50, 
        padding: 25
    }),
    resultsContainer: {
        marginBottom: 42, 
        flex: 1, 
        width: "100%"
    },
    topBar: (backgroundColor, color) => ({
        color, backgroundColor,
        height: 39,
        width: "100%",
        textAlign: "center",
        textAlignVertical: "center",
        fontSize: 25,
        fontWeight: "bold"
    })
})

const mapStateToProps = state => ({
    listOfResults: state.listOfResults,
    colors: state.theme.colors,
    sortValue: state.settings.sortValue
})

const mapDispatchToProps = dispatch => ({
    onDeleteResult: (idDeleteResult) => dispatch(onDeleteResult(idDeleteResult)),
    onSetSortValue: (sortValue) => dispatch(onSetSortValue(sortValue)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Results_Window);