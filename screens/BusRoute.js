import React from 'react';
import { View, Text, Dimensions, StatusBar,TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import colors from '../colors';
import { useNavigation } from '@react-navigation/native';



const timings = [
  { time: '03:35', stop: 'SRM University Trichy' },
  { time: '03:40', stop: 'No 1 Tollgate' },
  { time: '03:50', stop: 'Trichy TVS Bus Stand' },
  { time: '04:00', stop: 'Central Bus Stand' },
  { time: '04:00', stop: 'Airport' },
];

function BusRoute({route}) {
  const{place}=route.params;
  const{time}=route.params;
  const{price}=route.params;

  const navigation= useNavigation();
  return (
    <View>
      <View style={styles.bluecontainer}>
        <Text style={styles.heading}>College  - {place}</Text>
        <Text style={styles.subheading}>{time}</Text>
      </View>
      <View style={{justifyContentt:"center",alignItems:"center",flex:1}}>
      <TouchableOpacity  onPress={() => navigation.navigate('SeatSelection',{place:place,time:time,price:price})}>
        <View style={{height:60,width:150,backgroundColor:colors.primary,borderRadius:6,justifyContent:"center",alignItems:"center",marginTop:50}}>
            <Text style={{fontSize:15,color:"white",fontWeight:"bold"}}>Book Ticket</Text>
        </View>
      </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({

bluecontainer:{
    height:200,
    backgroundColor: colors.primary, 
    justifyContent:"center", 
    alignItems:'center'
},
heading:{
    color:"white", 
    fontSize:25, 
    fontWeight:"bold",
},
subheading:{
    marginTop:10,
    color:"white", 
    fontSize:15, 

}
 
});

export default BusRoute;