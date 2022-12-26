import React from 'react';
import {View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import ClearBtn from '../ClearBtn';
import CommentInput from '../CommentInput';
import GameTypeDropdown from '../GameTypeDropdown';
import DatePicker from '../DatePicker';

const FirstSection = ({nameClearButton, onChange, resultItem}) => {
    const {comment, gameType, date} = resultItem;
    return (
        <View style={styles.mainContainers}>
            <ClearBtn name={nameClearButton} onPress={() => onChange({key: "clear", value: undefined})} />
            <CommentInput rememberedComment={comment} onChange={(value) => onChange({key: "comment", value})} />
            <View style={styles.oneLineContainer}>
                <GameTypeDropdown selectedGameTypeId={gameType.id} onChange={(value) => onChange({key: "gameType", value})}/>
                <DatePicker selectedDate={date} onChange={(date) => onChange({key: "date", value: date})}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    oneLineContainer: {
        flexWrap: 'wrap', 
        flexDirection: 'row'
    },
    mainContainers: {
        marginBottom: 20
    }  

})

FirstSection.propTypes = {
    nameClearButton: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    resultItem: PropTypes.object.isRequired
}

export default FirstSection;