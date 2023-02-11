import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import { connect } from "react-redux";
import PropTypes from 'prop-types';

const ResultSum = ({withSetPoints, colors, result}) => {
    for(let i=0; i<result.length; i++) {
        if(result[i] === null) result[i] = 0;
    }
    const list_width = withSetPoints ? ["20%", "20%", "16%", "21%", "12%"] : ["24%", "24%", "20%", "22%"];
    let components = [];
    for(let i=0; i<list_width.length; i++) {
        components.push(<Text key={i} style={styles.val(list_width[i], colors.form.second)}>{result[i]}</Text>)
    }
    return <View style={styles.oneLineContainer}>{components}</View>
}

const styles = StyleSheet.create({
    oneLineContainer: {
        flexWrap: 'wrap', 
        flexDirection: 'row'
    },
    val: (width, color) => ({
        width: width,
        color: color,
        textAlign: 'center',
        fontSize: 17.5,
        marginRight: '1%',
        marginLeft: "1%"
    }),
})

ResultSum.propTypes = {
    withSetPoints: PropTypes.bool.isRequired,
    result: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    colors: state.theme.colors
})

export default connect(mapStateToProps, null)(ResultSum);