import React from 'react';
import {StyleSheet, View} from 'react-native';
import { OutlinedTextField } from 'react-native-material-textfield';
import { connect } from "react-redux";
import PropTypes from 'prop-types';

const CommentInput = ({colors, rememberedComment, onChange}) => {
    return (
        <View style={styles.container}>
            <OutlinedTextField
                value={rememberedComment}
                onEndEditing={(event) => onChange(event.nativeEvent.text)}                
                label='Komentarz (opcjonalny)'
                characterRestriction={100}
                maxLength={100}
                textColor={colors.form.input}
                tintColor={colors.form.main}
                baseColor={colors.form.main}
                titleTextStyle={{bottom: 20}}
                contentInset={styles.contentInset}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        width: '96%',
        marginLeft: '2%',
        height: 57
    },
    contentInset: {
        input: 14, 
        label: 2
    }
})

CommentInput.propTypes = {
    rememberedComment: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    colors: state.theme.colors
})

export default connect(mapStateToProps, null)(CommentInput);