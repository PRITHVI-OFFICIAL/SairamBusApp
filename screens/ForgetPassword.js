import React, { Component,useLayoutEffect, useState,useEffect} from 'react';
import {StyleSheet,Text,View,Image,Button,TouchableOpacity,TextInput,Alert} from 'react-native';
import { getAuth} from "firebase/auth";
import colors from '../colors';
import { Dimensions } from "react-native";
import { auth, database} from '../config/firebase'; 
import { sendPasswordResetEmail } from 'firebase/auth';
import { signOut } from 'firebase/auth';
import { FontAwesome } from '@expo/vector-icons';
import {collection,addDoc,orderBy,query,onSnapshot,getDocs,docRef,getDoc,doc,where} from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';

//import { TouchableOpacity } from 'react-native-gesture-handler
const ForgetPassword = () =>  {
  const navigation=useNavigation();
  const [email,setEmail]=useState();

 
    
  

  const sendResetEmail = () => {
    
        sendPasswordResetEmail(auth, email)
            .then(() => Alert.alert("Successfully Sent.Kindly Check your Spam folder."))
            .catch((err) => Alert.alert("Login error", err.message));
        navigation.navigate('Login');
    
    
  };


 
   {
    return (
        <View style={{padding:30,backgroundColor:colors.primary,flex:1,justifyContent:"center"}}>
            <View style={styles.logincontainer}> 
            <Text style={{fontSize:15,fontWeight:"bold"}}>Reset Password</Text>
      <TextInput
                style={styles.loginbox}
                placeholder="Enter your college id"
                autoCapitalize="none"
                autoCorrect={false}
                
                //value={email}
                onChangeText={(text) => setEmail(text)}
        />

        <TouchableOpacity style={{justifyContent:"center",alignItems:"center"}} onPress={sendResetEmail} >
        <View style={{height:60,width:150,backgroundColor:colors.primary,borderRadius:6,justifyContent:"center",alignItems:"center",margin:20}}>
            <Text style={{fontSize:15,color:"white",fontWeight:"bold"}}>Login</Text>
        </View>
      </TouchableOpacity>

      </View>
        </View>
    );
  }
}
export default ForgetPassword;
const styles = StyleSheet.create({
    logincontainer:{
        borderRadius:10,
        height:250, 
        backgroundColor:"white", 
        justifyContent:"space-evenly",  
        alignItems:"center"
      },
      loginbox:{
        borderWidth:1,
        borderColor:colors.primary, 
        width:"90%", 
        height:50,  
        borderRadius:5,
        paddingHorizontal:10
        
      }, 
  
});