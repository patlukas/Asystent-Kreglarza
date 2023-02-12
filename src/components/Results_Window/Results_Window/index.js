import React, {Component} from 'react';
import {FlatList, View, Text, StyleSheet} from 'react-native';
import { connect } from "react-redux";
import MenuBar from '../../MenuBar';
import Results_ButtonAddNewResult from '../Results_ButtonAddNewResult';
import Results_ResultItem from '../Results_ResultItem';

class Results_Window extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const {listOfResults, colors} = this.props;
        let code = []
        if(listOfResults.length == 0) code.push(<WelcomeWindow key={0} color={colors.TEXT} colorSecond={colors.TEXT_SECONDARY}/>)
        else code.push(
            <FlatList 
                key={0}
                data={listOfResults} 
                renderItem={({item}) => <Results_ResultItem item={item} />}
                contentContainerStyle={{ paddingBottom: 87 }}
            />
        )
        return (
            <>
                <View style={{height: 50, width: "100%"}} />
                <View style={styles.resultsContainer}>
                    {code}
                    <Results_ButtonAddNewResult />
                </View>
                <MenuBar />
            </>
        );
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
    }
})

const mapStateToProps = state => ({
    listOfResults: state.listOfResults,
    colors: state.theme.colors
})

export default connect(mapStateToProps, undefined)(Results_Window);