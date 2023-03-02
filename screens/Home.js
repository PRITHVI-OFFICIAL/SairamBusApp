import React, { useEffect, useState, useLayoutEffect } from "react";
import {View,TouchableOpacity,Text,Image,StyleSheet,TextInput,Button,ScrollView} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import colors from "../colors";
import { Entypo } from "@expo/vector-icons";
import { auth, database } from "../config/firebase";
import DropCard from "../component/DropCard";
import * as FileSystem from 'expo-file-system';
import { Platform } from 'react-native';
import {collection,orderBy,query,onSnapshot,} from "firebase/firestore";
//import { Button } from "react-native-web";
const catImageUrl =
  "dhttps://i.guim.co.uk/img/media/26392d05302e02f7bf4eb143bb84c8097d09144b/446_167_3683_2210/master/3683.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=49ed3252c0b2ffb49cf8b508892e452d";

const Home = () => {
  const navigation = useNavigation();
  const [search, setSearch] = useState("");
  const [routeway, setRouteway] = useState([{ id: 1, name: "Loading", price: "zero" },]);
  const [area, SetArea] = useState([]);
  const [filename,setfilename]=useState("");


  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <FontAwesome
          name="home"
          size={24}
          color={colors.gray}
          style={{ marginLeft: 15 }}
        />
      ),

      headerRight: () => (
        <TouchableOpacity
          style={{
            marginRight: 10,
          }}
          onPress={() => navigation.navigate("Userprofile")}
        >
          <FontAwesome
            name="user"
            size={25}
            color={"#1C64D1"}
            style={{ marginRight: 10 }}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const collectionRef = collection(database, "Route 1");
  useLayoutEffect(() => {
    const q = query(collectionRef, orderBy("time", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setRouteway(
        querySnapshot.docs.map((doc) => ({
          name: doc.id,
          price: doc.data().price,
          time: doc.data().time,
        }))
      ),
        SetArea(querySnapshot.docs.map((doc) => doc.id));

      console.log(querySnapshot.size);
    });

    return unsubscribe;
  }, []);
  const filteredData = routeway.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      
      <View style={styles.subcontainer}>
        <Text
          style={{
            color: "white",
            fontSize: 16,
            fontWeight: "bold",
            bottom: 20,
          }}
        >Enter your Droping Point
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={setSearch}
          value={search}
          placeholder="Enter your Destination"
          keyboardType="default"
        />
      </View>

      <ScrollView>
        {filteredData.map((value, key) => (
          // onPress={()=>navigation.navigate('BusRoute',{place:value.name,time:value.time,price:value.price})}
          // onPress={() => navigation.navigate("ContactInfo",{price:value.price,place:value.name})}
          <TouchableOpacity
            key={key}
            onPress={()=>navigation.navigate('Ticket')}
          >
            <DropCard
              place={value.name}
              time={value.time}
              price={value.price}
              h={120}
            />
          </TouchableOpacity>
        ))}
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
    height: 200,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    bottom: 10,
    height: 50,
    backgroundColor: "white",
    borderRadius: 10,
    width: "75%",
    paddingHorizontal: 10,
  },
  card: {
    margin: 15,
    backgroundColor: colors.mediumGray,
    height: 120,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 10,
    paddingRight: 10,
  },
});
