import React, {useState} from 'react';
import {Text, TouchableOpacity, Image, View} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import {styles} from "./styles";

const DatePicker = ({colors, onChange, selectedDate}) => {   
    /*
        selectedDate - liczba dni od 01.01.1970, jak -1 to pokazuje dzisiejszą datę, 
                       jak -2 to pokazuje dzisiejszą i zwraca ją do onChange
    */
    if(selectedDate == -2) onChange(getUnixTimeToday());
    const unixTime = (selectedDate < 0) ? getUnixTimeToday() : selectedDate*24*3600*1000;

    const [date, setDate] = useState(new Date(unixTime));
    const [show, setShow] = useState(false);
    
    return (
        <TouchableOpacity style={styles.mainContainers(colors)} onPress={() => setShow(true)}>
            <View style={styles.container}>
                <Text style={styles.dateText(colors)}>{onDateToString(date)}</Text>
                <Image 
                    source={require("../../../../assets/images/calender.png")}
                    style={styles.calenderIcon} 
                    tintColor={colors.form.dataPicker} 
                />
            </View>
            {show && (
                <DateTimePicker
                    value={date}
                    onChange={(e, d) => onCloseDatePicker(e, d, setShow, setDate, onChange, date)}
                    maximumDate={new Date(getUnixTimeToday())}
                    minimumDate={new Date("2000-06-06")}
                />
            )}
        </TouchableOpacity>
    );
}

const getUnixTimeToday = () => {
    var date = new Date();
    var dateSting = date.getFullYear() + "-" + (date.getMonth()+1)+"-"+date.getDate();
    var dateToday = new Date(dateSting);
    return dateToday.getTime();
}

const onDateToString = (date) => {
    return date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear();
}

const onCloseDatePicker = (event, selectedDate, setShow, setDate, onChange, date) => {
    setShow(false);
    if(event.type == "set" && selectedDate.getTime() != date.getTime()) {
        setDate(selectedDate);
        onChange(selectedDate);
    }
};

DatePicker.propTypes = {
    selectedDate: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    colors: state.theme.colors
})

export default connect(mapStateToProps, null)(DatePicker);