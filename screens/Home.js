  import React, { useEffect, useState,useLayoutEffect } from "react";
import { View, TouchableOpacity, Text, Image, StyleSheet,TextInput,Button,ScrollView} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from '@expo/vector-icons';
import colors from '../colors';
import { Entypo } from '@expo/vector-icons';
import { auth, database } from '../config/firebase';
import DropCard from "../component/DropCard";
import {collection,addDoc,orderBy,query,onSnapshot,getDocs,docRef,getDoc,doc, QuerySnapshot,collectionGroup,getCountFromServer} from 'firebase/firestore';
//import { Button } from "react-native-web";
const catImageUrl = "dhttps://i.guim.co.uk/img/media/26392d05302e02f7bf4eb143bb84c8097d09144b/446_167_3683_2210/master/3683.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=49ed3252c0b2ffb49cf8b508892e452d";

const Home = () => {



    const navigation = useNavigation();
    const [search,setSearch]=useState("");
    const [routeway,setRouteway]=useState([{id:1,name:"Loading",price:"zero"}]);
    const [area,SetArea]=useState([]);

    //Header
    useEffect(() => {
        navigation.setOptions({

            headerLeft: () => (
                <FontAwesome name="home" size={24} color={colors.gray} style={{marginLeft: 15}}/>
            ),

            headerRight: () => (
                <TouchableOpacity
                  style={{
                    marginRight: 10
                  }}
                  onPress={() => navigation.navigate('Userprofile')}
                >
                  <FontAwesome name="user" size={25} color={'#1C64D1'} style={{marginRight: 10}}/>
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

    const collectionRef = collection(database, 'Route 1');
    useLayoutEffect(() => {

        const q = query(collectionRef, orderBy('time', 'desc'));
        const unsubscribe = onSnapshot(q, querySnapshot => {
          setRouteway(
            querySnapshot.docs.map(doc => 
              (
              {
              name:doc.id,
              price: doc.data().price,
              time:doc.data().time 
            }))
          ),
          SetArea(
            querySnapshot.docs.map(doc => 
                (doc.id))     
          )
          
          console.log(querySnapshot.size);
        });        
      
      return unsubscribe;
      }, 
      
      []); 
console.log(area);

const filteredData = routeway.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

    return (
        <View style={styles.container}>

            {/* Search Field */}

            <View style={styles.subcontainer}>
                <Text style={{color:"white",fontSize:16,fontWeight:"bold",bottom:20}}>Enter your Droping Point</Text>
                <TextInput
                style={styles.input}
                onChangeText={setSearch}
                value={search}
                placeholder="Enter your Destination"
                keyboardType="default"
                />
            </View>
            
            {/* Buttons Field */}
            {/* <DropCard place="Madurai" time="7:30" price="400"/> */}
            <ScrollView>
            {filteredData.map((value,key)=>
            // onPress={()=>navigation.navigate('BusRoute',{place:value.name,time:value.time,price:value.price})}
                <TouchableOpacity key={key}  >
                    <DropCard  place={value.name} time={value.time} price={value.price}/>
                </TouchableOpacity>
            )
        }
            </ScrollView>            
        </View>
    );
    };

    export default Home;

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: "#fff",
        },
        subcontainer: {
            height:200,
            backgroundColor: colors.primary, 
            justifyContent:"center", 
            alignItems:'center'
        },
        input:{
            bottom:10,
            height:50, 
            backgroundColor:"white", 
            borderRadius:10, 
            width:"75%", 
            paddingHorizontal:10
        },
        card:{
            margin:15,
            backgroundColor: colors.mediumGray, 
            height:120,
            flexDirection:"row",
            justifyContent:"space-between",
            paddingLeft:10,
            paddingRight:10,
        }
        
    });
