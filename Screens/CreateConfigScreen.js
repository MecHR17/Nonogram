import React, { useState } from 'react';
import { View, FlatList, TouchableOpacity, Text, StyleSheet, TextInput } from 'react-native';

import { showMessage, hideMessage } from "react-native-flash-message";
import FlashMessage from "react-native-flash-message";

const styles = StyleSheet.create({
    checkButton: {
      backgroundColor: '#3C5B6F',
      padding:15,
      borderRadius:15,
      marginHorizontal:100,
      marginTop:10,
    },
    buttonText: {
      color:'white',
      fontWeight:'bold',
      textAlign:'center',
      fontSize:20
    },
    TextInput: {
        backgroundColor:'white',
        fontSize:20,
        margin:5,
        padding:5
    },
    SideText: {
        fontSize:20,
        fontWeight:'bold'
    },
    title:{
        fontSize:30,
        fontWeight:'bold',
        fontStyle:'italic',
        marginBottom:50,
    },
  });

const Validate = (navigation,columns,rows) => {
    if(columns > 15 || rows > 15){
        showMessage({
            message: "Puzzle Dimensions can't exceed 15",
            type: "warning",
          });
        return;
    }
    if(columns <= 0 || rows <= 0){
        showMessage({
            message: "Puzzle Dimensions have to be positive",
            type: "warning",
          });
        return;
    }
    if(isNaN(columns) || isNaN(rows)){
        showMessage({
            message: "Invalid Dimension values",
            type: "warning",
          });
        return;
    }
    navigation.navigate('CreateScreen',
                {cols: parseInt(columns),rows:parseInt(rows)})
}

export default function App({navigation}) {
    const [columns,setColumns] = useState('7');
    const [rows,setRows] = useState('7');
    
    const rarity = 0.5;

    return (
        <View style={{justifyContent:'center',flex:1,alignItems:'center'}}>
            <Text style={styles.title}>Create Puzzle</Text>
            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                <Text style={styles.SideText}>Columns:</Text>
                <TextInput keyboardType='numeric' 
                onChangeText={setColumns} value={columns}
                style={styles.TextInput}/>
            </View>
            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                <Text style={styles.SideText}>Rows:</Text>
                <TextInput keyboardType='numeric' 
                onChangeText={setRows} value={rows}
                style={styles.TextInput}/>
            </View>
            <TouchableOpacity style={styles.checkButton}
            onPress={() => Validate(navigation,columns,rows)
            }>
                <Text style={styles.buttonText}>Generate Puzzle</Text>
            </TouchableOpacity>
            <FlashMessage position="top" floating="true" />
        </View>
    );
}