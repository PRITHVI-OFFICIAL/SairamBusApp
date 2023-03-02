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
    //const {seatid}=route.params;
    const {place}=route.params; 
    const {price}=route.params;
  
  const [details,setdetails]=useState();
  
  const currentmail=getAuth()?.currentUser.email.split('@')[0];
  console.log(currentmail);
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

    <View>
      
      <View style={styles.bluecontainer}>
        <Text style={styles.heading}>College  - {place}</Text>
        <Text style={styles.subheading}>12 Jan 2023 | Mon</Text>
        
        <View style={styles.whitebox}>
        
            <View style={{justifyContent:"space-between"}}> 
                {/* <Text style={{fontSize:15}}>Chennai -Trichy</Text> */}
                <Text style={{fontSize:15}}>6:00 PM - 5:00 AM</Text>
                <Text style={{fontSize:15,fontWeight:"bold",color:"black"}}>Seat Number : <Text style={{color:colors.primary,fontSize:15,fontWeight:"bold"}}>CE</Text></Text>
            </View>
            <View style={{justifyContent:"space-between"}}>
                {/* <Text style={styles.subheading}>12 Jan 2023 | Mon</Text> */}
                <Text style={{fontWeight:"bold",fontSize:20,color:colors.primary}}>{price}</Text>
                <Text>9h</Text>
            </View>
        </View>
      </View>

      <ScrollView>
      <View style={{padding:15}}>
        <Text style={{fontSize:18,fontWeight:"bold",color:"black",marginBottom:20}}>Traveller Information</Text>


        <View style={{flexDirection:"row",justifyContent:"space-around"}}>

        <View>
        <Text style={{marginBottom:10,fontSize:16}}>College ID</Text>
        <Text style={{marginBottom:10,fontSize:16}}>Place</Text>
        <Text style={{marginBottom:10,fontSize:16}}>Price</Text>
        <Text style={{marginBottom:10,fontSize:16}}>Time</Text>


        </View>

        <View>
        <Text style={{marginBottom:10,fontSize:17}}>: </Text>
        <Text style={{marginBottom:10,fontSize:17}}>: </Text>
        <Text style={{marginBottom:10,fontSize:17}}>: </Text>
        <Text style={{marginBottom:10,fontSize:17}}>: </Text>

        </View>


        <View>
        <Text style={{marginBottom:10,fontSize:17}}>{currentmail}</Text>
        <Text style={{marginBottom:10,fontSize:17}}>{place}</Text>
        <Text style={{marginBottom:10,fontSize:17}}>{price}</Text>
        <Text style={{marginBottom:10,fontSize:17}}>{currentmail}</Text>

        </View>

        </View>
      </View>

      {/* <View style={{padding:15}}>
        <Text style={{fontSize:18,fontWeight:"bold",color:"black",marginBottom:20}}>Bus Information</Text>


        <View style={{flexDirection:"row",justifyContent:"space-around"}}>

        <View>
        <Text style={{marginBottom:10,fontSize:16}}>Bus Driver Name</Text>
        <Text style={{marginBottom:10,fontSize:16}}>Bus Number</Text>
        <Text style={{marginBottom:10,fontSize:16}}>Bus Registration Id</Text>


        </View>

        <View>
        <Text style={{marginBottom:10,fontSize:17}}>: </Text>
        <Text style={{marginBottom:10,fontSize:17}}>: </Text>
        <Text style={{marginBottom:10,fontSize:17}}>: </Text>
        <Text style={{marginBottom:10,fontSize:17}}>: </Text>

        </View>


        <View>
        <Text style={{marginBottom:10,fontSize:17}}>Temp Name</Text>
        <Text style={{marginBottom:10,fontSize:17}}></Text>
        <Text style={{marginBottom:10,fontSize:17}}>{price}</Text>


        </View>

        </View>
      </View> */}

      </ScrollView>
 
    </View>

      {/* <View style={{backgroundColor:"white"}}> */}
      <TouchableOpacity style={{alignItems:"center"}}>
        <View style={{height:50,width:170,backgroundColor:colors.primary,borderRadius:6,justifyContent:"center",alignItems:"center",margin:20}}>
            <Text style={{fontSize:15,color:"white",fontWeight:"bold"}}>Proceed  Payment</Text>
        </View>
      </TouchableOpacity>
      {/* </View> */}

    </View>
  );
}

const styles = StyleSheet.create({

bluecontainer:{
    backgroundColor:colors.primary, 
    height:250,
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