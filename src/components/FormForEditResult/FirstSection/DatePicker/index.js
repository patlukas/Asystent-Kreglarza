import React, {useState} from 'react';
import {Text, TouchableOpacity, Image, View} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import {styles} from "./styles";

const DatePicker = ({colors, onChange, selectedDate}) => {   
    // selectedDate - liczba dni od 01.01.1970, jak -1 to pokazuje dzisiejszą datę 
    const unixTime = (selectedDate < 0) ? (new Date()).getTime() : selectedDate*24*3600*1000;

    let date = new Date(unixTime)
    const [show, setShow] = useState(false);

    const onCloseDatePicker = (event, newDate) => {
        setShow(false);
        console.log(event, newDate)
        if(event.type == "set" && (newDate.getTime() != date.getTime() || selectedDate == -1)) {
            date = new Date(newDate)
            var selectedDateString = getDateToString(newDate)
            var dateMidnight = new Date(selectedDateString)
            onChange(dateMidnight.getTime() / (24 * 3600 * 1000));
        }
    };

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
                    onChange={(e, d) => onCloseDatePicker(e, d)}
                    maximumDate={new Date(getUnixTimeToday())}
                    minimumDate={new Date("2000-06-06")}
                />
            )}
        </TouchableOpacity>
    );
}

const getDateToString = (date) => {
    return date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2)+"-"+("0" + date.getDate()).slice(-2);
}

const getUnixTimeToday = () => {
    var dateSting = getDateToString(new Date())
    var dateToday = new Date(dateSting);
    return dateToday.getTime();
}

const onDateToString = (date) => {
    return ("0" + date.getDate()).slice(-2) + "." + ("0" + (date.getMonth() + 1)).slice(-2) + "." + date.getFullYear();
}

DatePicker.propTypes = {
    selectedDate: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    colors: state.theme.colors
})

export default connect(mapStateToProps, null)(DatePicker);