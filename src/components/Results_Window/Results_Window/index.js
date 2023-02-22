import React, {Component} from 'react';
import {FlatList, View, Text, StyleSheet, Animated} from 'react-native';
import {connect} from "react-redux";
import {onDeleteResult, onSetSortValue, onSetFilter} from '../../../actions';
import AlertTwoOption from '../../Alerty/AlertTwoOption';
import BarTopTwoBtn from '../../BarTopTwoBtn';
import Edit_Window from '../../Edit_Window';
import MenuBar from '../../MenuBar';
import Filter from '../ResultItem/Filter/Filter';
import ResultItem from '../ResultItem/ResultItem';
import Results_ButtonAddNewResult from '../Results_ButtonAddNewResult';
import Sort from '../Sort';
import {sortListOfResults} from './scriptSort';
import {filterListOfResults} from './scriptFilter';


class Results_Window extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editedResult: null,
            idDeleteResult: null,
            heightSort: new Animated.Value(0),
            sortVisible: false,
            idResultWithAdditionalOptions: null,
            filter: this.props.filter,
            leftFilter: new Animated.Value(0),
            filterVisible: false,
        }
        this.beforeOnDeleteResult = this.beforeOnDeleteResult.bind(this)
    }
    componentDidUpdate(oldProps) {
        if(JSON.stringify(oldProps.filter) != JSON.stringify(this.props.filter)) {
            this.setState({filter: this.props.filter})
        }
    }
    render() {
        const heightSort = this.state.heightSort.interpolate({
            inputRange: [0, 1],
            outputRange: ["0%", "75%"]
        })
        const leftFilter = this.state.leftFilter.interpolate({
            inputRange: [0, 1],
            outputRange: [-206, 0]
        })
        let {listOfResults, sortValue, colors} = this.props;
        const numberOfResults = listOfResults.length
        listOfResults = filterListOfResults(listOfResults, this.state.filter)
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
        if(listOfResults.length == 0) {
            if(numberOfResults == 0) {
                code.push(<WelcomeWindow key={0} color={colors.form.main} colorSecond={colors.form.second}/>)
            }
            else {
                code.push(<EmptyFilterWindow key={0} color={colors.form.main} colorSecond={colors.form.second}/>)
            }
        }
        else code.push(
            <FlatList 
                key={0}
                data={listOfResults} 
                renderItem={({item}) => 
                    <ResultItem 
                        item={item} 
                        onDeleteResult={() => this.setState({idDeleteResult: item.id})} 
                        onEditResult={() => this.setState({editedResult: item})}
                        showAdditionalOptions={this.state.idResultWithAdditionalOptions == item.id}
                        onShowAdditionalOptions={() => this.setState({idResultWithAdditionalOptions: item.id})}
                    />
                }
                contentContainerStyle={{ paddingBottom: 87 }}
            />
        )
        return (
            <>
                <BarTopTwoBtn 
                    leftBtnTitle="Filtruj" 
                    leftBtnOnPress={this.animatedFilterLeft}
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
                    <Filter
                        visible={this.state.filterVisible}
                        left={leftFilter} 
                        onClose={this.animatedFilterLeft}
                        onChange={(filter) => this.onSaveNewFilter(filter)}
                        filter={this.state.filter}
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
        let toValue = (this.state.sortVisible) ? 0 : 1
        const duration = 750 * Math.abs(toValue - this.state.heightSort._value)
        if(toValue == 1) this.setState({sortVisible: true, filterVisible: false})
        else this.setState({sortVisible: false})
        Animated.parallel([
            Animated.timing(this.state.heightSort, {toValue, duration, useNativeDriver: false}),
            Animated.timing(this.state.leftFilter, {toValue: 0, duration, useNativeDriver: false})
        ]).start() 
    }

    onSelectSortValue = (sortValue) => {
        this.props.onSetSortValue(sortValue)
        this.animatedSortHeight()
    }

    animatedFilterLeft = () => {
        let toValue = (this.state.filterVisible) ? 0 : 1
        const duration = 400 * Math.abs(toValue - this.state.leftFilter._value)
        if(toValue == 1) this.setState({filterVisible: true, sortVisible: false})
        else this.setState({filterVisible: false})
        Animated.parallel([
            Animated.timing(this.state.leftFilter, {toValue, duration, useNativeDriver: false}),
            Animated.timing(this.state.heightSort, {toValue: 0, duration, useNativeDriver: false})
        ]).start()
    }

    onSaveNewFilter = (newFilter) => {
        this.props.onSetFilter(newFilter)
        this.setState({filter: newFilter})
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

const EmptyFilterWindow = ({color, colorSecond}) => {
    return (
        <View style={styles.containerWelcome}>
            <Text style={styles.textWelcome(color)}>Nie masz wyników, które spełniają wybrane filtry</Text>
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
    sortValue: state.settings.sortValue,
    filter: state.settings.filter
})

const mapDispatchToProps = dispatch => ({
    onDeleteResult: (idDeleteResult) => dispatch(onDeleteResult(idDeleteResult)),
    onSetSortValue: (sortValue) => dispatch(onSetSortValue(sortValue)),
    onSetFilter: (filter) => dispatch(onSetFilter(filter)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Results_Window);