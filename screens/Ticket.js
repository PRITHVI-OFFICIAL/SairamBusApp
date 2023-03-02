import {React,useState,useLayoutEffect} from 'react';
import { View, Text,TouchableOpacity,ScrollView,Platform } from 'react-native';
import { StyleSheet } from 'react-native';
import colors from '../colors';
import DropCard from '../component/DropCard';
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import { useNavigation } from '@react-navigation/native';
import { auth, database } from '../config/firebase';
import {collection,orderBy,query,onSnapshot, getDoc, getDocs,setDoc,doc} from 'firebase/firestore';
import * as FileSystem from 'expo-file-system';


function Ticket() {
 
const navigation= useNavigation();
const [ticket,setTicket]=useState([]);
const [BookedTime,SetBookedTime]=useState("");


const currentmail=auth.currentUser.email;
const id=currentmail.split("@")[0];


const collectionRef = collection(database, `users/sec20it040/BookingHistory`);
    useLayoutEffect(() => {

        const unsubscribe = onSnapshot(collectionRef, querySnapshot => {
          setTicket(
            querySnapshot.docs.map(doc => 
              (
              {
                Name:doc.data().Name, 
                Email:doc.data().Email,
                destination:doc.data().destination ,
                time:doc.data().time,
                price:doc.data().price,
                transactionId:doc.data().transactionId
            }))
          )
          
          console.log(querySnapshot.size);
        });        
      
      return unsubscribe;
      }, 
      
      []); 

      async function generateTicket(ticket) {

        if (!ticket) {
          console.error(`Ticket with ID ${id} not found`);
          return;
        }

const html=
`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<style>
    th,td{
       border:1px solid black; 
       vertical-align: top;
       padding-left: 10px;
    }
    #tu{
        text-align: left;
    }
    *{
        font-family: Arial, Helvetica, sans-serif;
    }
</style>

    <header>
        <img style="width: 102%;" src="https://firebasestorage.googleapis.com/v0/b/taxautomation-1214c.appspot.com/o/Group%20622header.jpg?alt=media&token=1a8d4207-2939-43fc-80ff-25ac5b85df1a">
    </header>
    <div style="display: flex;justify-content: space-between;padding: 0 40px 0 40px; margin-bottom: 20px;" >
   <div>
        <div style="display: flex;">
            <p style="font-weight: bold;">Transaction Id : </h1>
            <p>&nbsp${ticket.transactionId}</p>
        </div>
        <div style="display: flex;">
            <p  style="font-weight: bold;">Student Id : </h1>
            <p>&nbsp${id}</p>
        </div>
        <div style="display: flex;">
            <p style="font-weight: bold;">Name : </h1>
            <p>&nbsp DEMO NAME</p>
        </div>
        <div style="display: flex;">
            <p style="font-weight: bold;">Email : </h1>
            <p>&nbsp${ticket.Email}</p>
        </div>
    </div>
    <div>
        <div style="display: flex;">
            <p style="font-weight: bold;">Destination : </h1>
            <p>&nbsp${ticket.destination}</p>
        </div>
        <div style="display: flex;">
            <p style="font-weight: bold;">Price : </h1>
            <p style="padding-left: px;">&nbsp₹2100</p>
        </div>
        <div style="display: flex;">
            <p style="font-weight: bold;">Date : </h1>
            <p>&nbsp${ticket.time}</p>
        </div>
        <div style="display: flex;">
            <p style="font-weight: bold;">Time : </h1>
            <p>&nbsp ${ticket.time}</p>
        </div>
    </div>
</div>
<table style="border: 1px solid black;width: 100%;border-collapse: collapse;">
    <thead>
      <tr>
        <th>S.No</th>
        <th>Fee description</th>
        <th>Amount</th>
      </tr>
    </thead>
    <tbody style="height: 150px;">
      <tr>
        <td>1</td>
        <td>Bus payment</td>
        <td>₹ ${ticket.price}</td>
      </tr>
    </tbody>
    <tbody>
        <tr>
            <td colspan="2" style="text-align: right; padding-right: 20px ;">Total Amount</td>
            <td>₹${ticket.price}</td>
        </tr>
    </tbody>
  </table>
  
  
<div style="margin-top: 20px;">
    <div style="display: flex;justify-content: center;">
        <p>Amount in word:</p>
        <p style="font-weight: bold;padding-left: 10px;">Two Thousand and Hundred</p>
    </div>
    <div  style="display: flex;justify-content: center;">
        <p>Mode of payment:</p>
        <p style="font-weight: bold;padding-left: 10px;">Online</p>
    </div>
</div>
</html>
`

const pdf = await Print.printToFileAsync({ html:html });
console.log(pdf.uri);
shareAsync(pdf.uri, { UTI: '.pdf', mimeType: 'application/pdf' });




// const html = 
//         `
//         <!DOCTYPE html>
//     <html>
//     <head>
//       <title>Ticket Bill</title>
//       <style>
//         body {
//           background-color: #f2f2f2;
//           font-family: Arial, sans-serif;
//           font-size: 14px;
//           line-height: 1.5;
//           padding: 50px;
//         }
    
//         h1 {
//           font-size: 24px;
//           font-weight: bold;
//           margin-bottom: 20px;
//           text-align: center;
//         }
    
//         table {
//           border-collapse: collapse;
//           margin: 0 auto;
//           width: 100%;
//         }
    
//         th, td {
//           border: 2px solid #ddd;
//           padding: 10px;
//           text-align: left;
//         }
    
//         th {
//           background-color: #f2f2f2;
//           font-weight: bold;
//         }
    
//         .total {
//           font-weight: bold;
//         }
//             tr:nth-child(8) {
//               background-color: #dae4ee;
//             }
    
//         .footer {
//           margin-top: 20px;
//           text-align: right;
//         }
            
//       </style>
//     </head>
//     <body>
//         <!-- <img src="headerone.png" alt="Header" width="100%"> -->
//       <embed src="headersvg.svg" width="100%" />
//       <h1>BUS RECIPT BILL</h1>
//       <table>
//         <thead>
//           <tr>
//               <th>S.No</th>
//             <th>Details</th>
//             <th>Information</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <td>1</td>
//             <td>Name</td>
//             <td>${ticket.Name}</td>
//           </tr>
//           <tr>
//             <td>2</td>
//             <td>Email ID</td>
//             <td>${ticket.Email}</td>
//           </tr>
//           <tr>
//             <td>3</td>
//             <td>Place</td>
//             <td>College - ${ticket.destination}</td>
//           </tr>
//             <tr>
//               <td>3</td>
//             <td>Date and Time</td>
//             <td>${ticket.time}</td>
//           </tr>
//             <tr>
//             <td>4</td>
//             <td>Price</td>
//             <td>₹ ${ticket.price}</td>
//           </tr>
//             <tr>
//             <td>5</td>
//             <td>Transaction ID</td>
//             <td>${ticket.transactionId}</td>
//           </tr>
//           <tr class="total">
//             <td colspan="2">Total:</td>
//             <td>₹ ${ticket.price}</td>
//           </tr>
//         </tbody>
//       </table>
//       <br/>
//     </body>
//     </html>`;











}



  return (
    <View>
       <View>
        <Text style={{paddingTop:20,fontSize:15,fontWeight:"bold",paddingLeft:20}}>Booked Tickets</Text>
        {
          (ticket.length==0) ?(<Text style={{textAlign:"center",padding:30,color:"black"}}>No Tickets Booked </Text>) :
          (
          
            <ScrollView>
            {ticket.map((value,key)=>
            //onPress={()=>navigation.navigate('BusRoute',{place:value.name,time:value.time,price:value.price})}
                <TouchableOpacity key={key}  onPress={()=> generateTicket(value)}>
                    <DropCard  place={value.destination} time={value.time} price={value.price} h={120}/>
                </TouchableOpacity>
            )
        }
            </ScrollView>
          )
        }
       </View>
    </View>
  );
}

const styles = StyleSheet.create({

 
});

export default Ticket;