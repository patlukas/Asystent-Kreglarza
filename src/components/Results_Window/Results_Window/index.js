import React, {Component} from 'react';
import {FlatList, View} from 'react-native';
import { connect } from "react-redux";
import MenuBar from '../../MenuBar';
import Results_ButtonAddNewResult from '../Results_ButtonAddNewResult';
import Results_ResultItem from '../Results_ResultItem';

class Results_Window extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const {listOfResults} = this.props;
        return (
            <>
                <View style={{height: 50, width: "100%"}} />
                <View style={{marginBottom: 42, flex: 1}}>
                    <FlatList 
                        data={listOfResults} 
                        renderItem={({item}) => <Results_ResultItem item={item} />}    
                    />
                    <Results_ButtonAddNewResult />
                </View>
                <MenuBar />
            </>
        );
    }
    /*getList() {
        var list = [];
        for(var i=-2; i<1000000; i++) list.push({id: i});
        return list;
    }*/
}

const mapStateToProps = state => ({
    listOfResults: state.listOfResults
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Results_Window);