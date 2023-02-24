import React, { useState } from "react";
import { StyleSheet, Text, View, Button, TextInput, Image, SafeAreaView, TouchableOpacity, StatusBar, Alert,  } from "react-native";
import { signInWithEmailAndPassword,fetchSignInMethodsForEmail,createUserWithEmailAndPassword } from "firebase/auth";
import { auth, database } from "../config/firebase";
import colors from "../colors";
import { doc, setDoc } from "firebase/firestore"; 
const backImage = require("../assets/backImage.png");
import { useNavigation } from "@react-navigation/native";

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navi = useNavigation();

 

  const onHandleLogin = () => {
    if ((email !== "" && password !== "") && email.split('@')[1]=='sairamtap.edu.in') {

          signInWithEmailAndPassword(auth, email, password)
          .then(() => console.log("Login success"))
          .catch((err) => Alert.alert("Enter correct mailid/Password"));
    }
    else{
      Alert.alert("Enter your College mail id");
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>BUS APP </Text>
      <View style={styles.subcontainer}>
      <Text style={{fontSize:25,fontWeight:"bold",color:colors.primary,textAlign:"center",paddingTop:10}}>Login</Text>
      <View style={styles.logincontainer}> 
      <TextInput
                style={styles.loginbox}
                placeholder="Enter your college id"
                autoCapitalize="none"
                autoCorrect={false}
                
                value={email}
                onChangeText={(text) => setEmail(text)}
        />

      <TextInput
                style={styles.loginbox}
                placeholder="Enter password"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={true}
                textContentType="password"
                value={password}
              
                onChangeText={(text) => setPassword(text)}
       />
      <TouchableOpacity onPress={()=> navi.navigate('ForgetPassword')}>
      <Text>Forgot Password? <Text style={{color:colors.primary}}>Click here</Text></Text>
      </TouchableOpacity>
      
      </View>
      

      <TouchableOpacity style={{justifyContent:"center",alignItems:"center"}} onPress={onHandleLogin} >
        <View style={{height:60,width:150,backgroundColor:colors.primary,borderRadius:6,justifyContent:"center",alignItems:"center",margin:20}}>
            <Text style={{fontSize:15,color:"white",fontWeight:"bold"}}>Login</Text>
        </View>
      </TouchableOpacity>

      <View style={{flexDirection: 'row', alignItems: 'center', alignSelf: 'center',marginBottom:10}}>
        <Text style={{color: 'gray', fontWeight: '600', fontSize: 14}}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navi.navigate('Signup')}>
          <Text style={{color: colors.primary, fontWeight: '600', fontSize: 14}}> Sign Up</Text>
        </TouchableOpacity>
      </View>

      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent:"center", 
    alignItems:"center"
  },
  subcontainer:{
    width:300,
    height: 400,
    backgroundColor:"white",
    borderRadius:15, 
    padding:10
  }, 
  heading:{
    fontSize:40, 
    fontWeight:"bold",
    color:"white", 
    fontStyle:"italic", 
    bottom:20
  },
  logincontainer:{

    height:200, 
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
