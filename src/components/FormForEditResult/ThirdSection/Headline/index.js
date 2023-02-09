import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import { connect } from "react-redux";
import PropTypes from 'prop-types';

const Headline = ({withSetPoints, colors}) => {
    const list_width = withSetPoints ? ["20%", "20%", "16%", "21%", "12%"] : ["24%", "24%", "20%", "22%"];
    const list_label = withSetPoints ? ['Pełne', 'Zbierane', 'X', 'Suma', 'PS'] : ['Pełne', 'Zbierane', 'X', 'Suma'];
    let labelComponents = [];
    for(let i=0; i<list_label.length; i++) {
        labelComponents.push(<Text key={i} style={styles.label(list_width[i], colors.form.main)}>{list_label[i]}</Text>)
    }
    return <View style={styles.oneLineContainer}>{labelComponents}</View>
}

const styles = StyleSheet.create({
    oneLineContainer: {
        flexWrap: 'wrap', 
        flexDirection: 'row'
    },
    label: (width, color) => ({
        width: width,
        color: color,
        textAlign: 'center',
        fontSize: 17.5,
        marginRight: '1%',
        marginLeft: "1%"
    }),
})

Headline.propTypes = {
    withSetPoints: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
    colors: state.theme.colors
})

export default connect(mapStateToProps, null)(Headline);