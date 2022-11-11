import React from 'react';
import {Text, StyleSheet, View, TextInput} from 'react-native';
import { connect } from "react-redux";
import PropTypes from 'prop-types';

const CommentInput = ({colors, rememberedComment, onChange}) => {
    return (
        <View style={styles.container(colors)} >
            <Text style={styles.text(colors)}>Komentarz (opcjonalne) (max 80 znaków)</Text>
            <TextInput maxLength={80} style={styles.textInput(colors)} onChangeText={(text) => onChange(text)}>
                {rememberedComment}
            </TextInput>
        </View>
    )
}

const styles = StyleSheet.create({
    container: (colors) => ({
        color: colors.form.main,
        borderColor: colors.form.main,
        width: '96%',
        borderWidth: 1,
        marginLeft: '2%',
        height: 50,
        marginTop: 25,
    }),
    text: (colors) => ({
        color: colors.form.main,
        paddingLeft: "2%",
    }),
    textInput: (colors) => ({
        color: colors.form.input,
        marginLeft: 5,
        marginRight: 5,
        bottom: 2
    })
})

CommentInput.propTypes = {
    rememberedComment: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    colors: state.theme.colors
})

export default connect(mapStateToProps, null)(CommentInput);