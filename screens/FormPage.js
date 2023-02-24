import React, { Component,useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image, SafeAreaView, TouchableOpacity, StatusBar, Alert,  } from "react-native";
import { getAuth} from "firebase/auth";
import colors from '../colors';
import { Dimensions } from "react-native";
import { auth, database} from '../config/firebase'; 
import {  fetchSignInMethodsForEmail } from 'firebase/auth';
import { signOut } from 'firebase/auth';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import {collection,addDoc,orderBy,query,onSnapshot,getDocs,docRef,getDoc,setDoc,doc,QuerySnapshot,collectionGroup,getCountFromServer} from 'firebase/firestore';
//import { TouchableOpacity } from 'react-native-gesture-handler';




const FormPage = ({route}) =>  {

  const {mail}=route.params;
  const navigation=useNavigation();
  const [name,setname]=useState(); 
  const [phone,setphone]=useState();

  function onsubmit(){
    setDoc(doc(database, "users", mail.split('@')[0]), {
      name: name,
      mail: mail, 
      mobile:phone
    })
    navigation.navigate('Home');
  }

  
  
  
    
   {
    return (
        <View style={styles.container}>
       
      
        <View style={styles.subcontainer}> 
        <Text style={{fontSize:20,fontWeight:"bold",padding:10,color:"black"}}> Enter your Details</Text>
        <TextInput
                  style={styles.loginbox}
                  placeholder="Enter Your Name"
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={name} 
                  onChangeText={(text) => setname(text)}
          />

          <TextInput
                  style={styles.loginbox}
                  placeholder="Enter Your mail"
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={mail}
                  editable = {false}
            
          />

          <TextInput
                  style={styles.loginbox}
                  placeholder="  Enter your mobile Number"
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={phone}
                  onChangeText={(num) => setphone(num)}
          />
  
        </View>
        <TouchableOpacity style={{justifyContent:"center",alignItems:"center",bottom:30}} onPress={onsubmit}  >
        <View style={{height:60,width:150,backgroundColor:colors.primary,borderRadius:6,justifyContent:"center",alignItems:"center",marginTop:50}}>
            <Text style={{fontSize:15,color:"white",fontWeight:"bold"}}>Submit</Text>
        </View>
      </TouchableOpacity>
  
        </View>
    );
  }
}
export default FormPage;
const styles = StyleSheet.create({

container:{
    paddingTop:40,
    flex:1, 
    justifyContent :"center"
},
subcontainer:{
    height:350, 
    justifyContent:"space-evenly", 
    alignItems:"center" ,
    
},
loginbox:{
  borderWidth:1,
  borderColor:colors.primary, 
  width:"90%", 
  height:50,  
  borderRadius:5,
  paddingHorizontal: 20,
}, 

});     