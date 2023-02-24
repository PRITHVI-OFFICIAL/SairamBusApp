import { useNavigation } from '@react-navigation/native';
import React, { useState,useLayoutEffect } from 'react';
import { View, Text, Dimensions, StatusBar,TextInput,Button,TouchableOpacity} from 'react-native';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import colors from '../colors';
import { getAuth} from "firebase/auth";
import {collection,addDoc,orderBy,query,onSnapshot,getDocs,docRef,getDoc,doc,where} from 'firebase/firestore';
import { auth, database} from '../config/firebase'; 



const timings = [
  { time: '03:35', stop: 'SRM University Trichy' },
  { time: '03:40', stop: 'No 1 Tollgate' },
  { time: '03:50', stop: 'Trichy TVS Bus Stand' },
  { time: '04:00', stop: 'Central Bus Stand' },
  { time: '04:00', stop: 'Airport' },
];

function ContactInfo({route}) {
    const navigation=useNavigation();
    const {seatid}=route.params;
    const {place}=route.params; 
    const {price}=route.params;
  
  const [details,setdetails]=useState();
  
  const currentmail=getAuth()?.currentUser.email;
  useLayoutEffect(() => {
    const collectionRef = collection(database, 'users');
      const q = query(collectionRef, where("mail", "==", currentmail));
      const unsubscribe = onSnapshot(q, querySnapshot => {
        setdetails(
          querySnapshot.docs.map(doc => 
            (
            {
            mail:doc.data().mail,
            phone: doc.data().mobile,
            name:doc.data().name
          }))
        ),
        
        console.log(querySnapshot.size);
      });        
    
    return unsubscribe;
    }, 
    
    []);



  return (
    <View>
      <ScrollView>
      <View style={styles.bluecontainer}>
        <Text style={styles.heading}>College  - {place}</Text>
        <Text style={styles.subheading}>12 Jan 2023 | Mon</Text>
        
        <View style={styles.whitebox}>
        
            <View style={{justifyContent:"space-between"}}> 
                {/* <Text style={{fontSize:15}}>Chennai -Trichy</Text> */}
                <Text style={{fontSize:15}}>6:00 PM - 5:00 AM</Text>
                <Text style={{fontSize:15,fontWeight:"bold",color:"black"}}>Seat Number : <Text style={{color:colors.primary,fontSize:15,fontWeight:"bold"}}>{seatid}</Text></Text>
            </View>
            <View style={{justifyContent:"space-between"}}>
                {/* <Text style={styles.subheading}>12 Jan 2023 | Mon</Text> */}
                <Text style={{fontWeight:"bold",fontSize:20,color:colors.primary}}>{price}</Text>
                <Text>9h</Text>
            </View>
        </View>
      </View>

    
      <View style={{padding:15}}>
        <Text style={{fontSize:18,fontWeight:"bold",color:"black",marginBottom:20}}>Traveler Information</Text>
        {/* <Text style={{marginBottom:10}}>Passenger Name</Text> */}
        <TextInput
                style={styles.input}
                placeholder="   Your Name"
                keyboardType="default"
        />
        {/* <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center",marginTop:20}}>
        <TextInput
                style={styles.input1}
                placeholder="   Your Age"
                keyboardType="default"
        />
        <Text>Male</Text>
        <Text>Female</Text>

        </View> */}

      </View>

      <View style={{padding:15}}>
        <Text style={{fontSize:18,fontWeight:"bold",color:"black",marginBottom:20}}>Contact Information</Text>
        <Text>Mobile No</Text>
        <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center",marginTop:10}}>
        <TextInput
                style={styles.input}
                placeholder="   Mobile Number"
                keyboardType="default"
        />

        </View>
        <TouchableOpacity  onPress={() => navigation.navigate('SeatSelection',{place:place,time:time,price:price})}>
        <View style={{height:60,width:150,backgroundColor:colors.primary,borderRadius:6,justifyContent:"center",alignItems:"center",marginTop:50}}>
            <Text style={{fontSize:15,color:"white",fontWeight:"bold"}}>Book Ticket</Text>
        </View>
      </TouchableOpacity>

      </View>
      </ScrollView>
 
    </View>
  );
}

const styles = StyleSheet.create({

bluecontainer:{
    backgroundColor:colors.primary, 
    height:260,
    justifyContent:"center",
    alignItems:"center"
},
heading:{
    color:"white", 
    fontSize:25, 
    fontWeight:"bold",
    // color:"black",
},
subheading:{
    color:"white", 
    fontSize:15, 
    marginTop:10,

},
whitebox:{
    height:100, 
    backgroundColor:"white",
    width:"90%", 
    borderRadius:10,
    marginTop:20,
    flexDirection:"row",
    justifyContent:"space-between",
    padding:20
}, 
input:{
    height:40, 
    backgroundColor:colors.lightGray, 
    borderRadius:5, 
    borderColor:"black",
    width:"80%", 
},
input1:{
    //bottom:10,
    height:40, 
    backgroundColor:colors.lightGray, 
    borderRadius:10, 
    borderColor:"black",
    width:"90%", 
},
 
});

export default ContactInfo;