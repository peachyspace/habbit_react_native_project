import React, {Component} from 'react';
import {View, Text} from 'react-native';
import * as Progress from 'react-native-progress';
import { TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import buttonStyles from '../styles/button'


class StepsComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            totalSteps: 3000,
            dailySteps: 1000,
            stepGoal: 5000,
            enteredSteps: 0
         }
         this.calculateProgress = this.calculateProgress.bind(this)
         this.enterSteps = this.enterSteps.bind(this)
         this.updateSteps = this.updateSteps.bind(this)
    }

    calculateProgress(){
        return this.state.dailySteps / this.state.stepGoal
    }

    enterSteps(steps){
        this.setState({
            enteredSteps: steps
        })
    }

    sendSteps(){
        this.props.getSteps(this.state.totalSteps)
    }
    
    updateSteps() {
        this.setState({
            totalSteps: this.state.totalSteps + parseInt(this.state.enteredSteps),
            dailySteps: this.state.dailySteps + parseInt(this.state.enteredSteps),
            enteredSteps: 0
        }, this.sendSteps)
    }

      render() { 
        return ( 
            <View>

                <Text style={styles.text}>{this.state.dailySteps} / {this.state.stepGoal}
                </Text>

                <Progress.Bar 
                progress={this.calculateProgress()} 
                animated={true}
                width={null}
                height={25}
                color='darkslategrey'
                borderWidth={4}
                borderColor='black'
                style={styles.progressBar}
                />

                <Text style={styles.text}>Manual Step Input:</Text>

                <TextInput 
                    style={styles.textInput} 
                    placeholder="Enter steps" 
                    placeholderTextColor='lightgrey'
                    onChangeText={value => this.enterSteps(value)}
                >
                </TextInput>

                <TouchableOpacity 
                    style={styles.button}
                    onPress={this.updateSteps}
                    >
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>

                <Text style={styles.infoText}>{this.state.totalSteps} (StepsComponent total)</Text>
                <Text style={styles.infoText}>{this.state.dailySteps} (StepsComponent daily)</Text>
                <Text style={styles.infoText}>{this.state.enteredSteps} (StepsComponent entered)</Text>

            </View>
         );
    }
}

const styles = StyleSheet.create({
    text: {
        textAlign: 'center',
        fontSize: 20,
        color: 'ghostwhite',
        fontFamily: 'PressStart2P-Regular'
    },
    infoText: {
        textAlign: 'center',
        fontSize: 15,
        color: 'ghostwhite',
        fontFamily: 'PressStart2P-Regular',
        paddingVertical: 10,
    },
    textInput: {
        textAlign: 'center',
        fontSize: 14,
        color: 'ghostwhite',
        borderWidth: 2,
        borderColor: 'darkslategrey',
        backgroundColor: 'dimgrey',
        paddingVertical: 10,
        marginVertical: 10,
        fontFamily: 'PressStart2P-Regular'
    },
    button: buttonStyles.button,
    buttonText: buttonStyles.buttonText,
    progressBar: {
        marginTop: 20,
        marginBottom: 70,
    }
})
 
export default StepsComponent;