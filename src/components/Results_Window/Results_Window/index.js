import React, {Component} from 'react';
import {FlatList, View, Text, StyleSheet} from 'react-native';
import { connect } from "react-redux";
import { onDeleteResult } from '../../../actions';
import AlertTwoOption from '../../Alerty/AlertTwoOption';
import Edit_Window from '../../Edit_Window';
import MenuBar from '../../MenuBar';
import ResultItem from '../ResultItem/ResultItem';
import Results_ButtonAddNewResult from '../Results_ButtonAddNewResult';

class Results_Window extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editedResult: null,
            idDeleteResult: null
        }
        this.beforeOnDeleteResult = this.beforeOnDeleteResult.bind(this)
    }
    render() {
        const {listOfResults, colors} = this.props;
        let code = []
        if(this.state.editedResult !== null) {
            return(
                <Edit_Window 
                    editedResult={this.state.editedResult}
                    onEndEdit={() => this.setState({editedResult: null})}
                />
            )
        }
        if(listOfResults.length == 0) code.push(<WelcomeWindow key={0} color={colors.TEXT} colorSecond={colors.TEXT_SECONDARY}/>)
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
                <Text style={styles.topBar(colors.barTop.backgroundColor, colors.barTop.color)}>Wyniki</Text>
                <View style={styles.resultsContainer}>
                    {code}
                    <Results_ButtonAddNewResult />
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
}

const WelcomeWindow = ({color, colorSecond}) => {
    return (
        <>
            <Text style={styles.textWelcome(color)}>Witaj w aplikacji</Text>
            <Text style={styles.textWelcomeBold(color)}>ASYSTENT KRĘGLARZA</Text>
            <Text style={styles.textTip(colorSecond)}>
                Aby dodać pierwszy wynik kliknij przycisk ze znakiem "+" znajdujący się w prawym dolnym rogu
            </Text>
        </>
    )
}

const styles = StyleSheet.create({
    textWelcome: (color) => ({
        color,
        fontSize: 20, 
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
        height: 50,
        width: "100%",
        textAlign: "center",
        textAlignVertical: "center",
        fontSize: 25,
        fontWeight: "bold"
    })
})

const mapStateToProps = state => ({
    listOfResults: state.listOfResults,
    colors: state.theme.colors
})

const mapDispatchToProps = dispatch => ({
    onDeleteResult: (idDeleteResult) => dispatch(onDeleteResult(idDeleteResult))
})

export default connect(mapStateToProps, mapDispatchToProps)(Results_Window);