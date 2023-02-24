import { View, TouchableOpacity, Text, Image, StyleSheet,TextInput } from "react-native";
import colors from '../colors';
const ButtonPress = ({}) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onHandleLogin} >
        <View style={{height:60,width:150,backgroundColor:colors.primary,borderRadius:6,justifyContent:"center",alignItems:"center",margin:20}}>
            <Text style={styles.loginbutton}>Login</Text>
        </View>
      </TouchableOpacity>
           
    );
    };

export default DropCard;
const styles=StyleSheet.create({

    container:{
        justifyContent:"center",
        alignItems:"center"    
    },
    loginbutton:
        {
        fontSize:15,
        color:"white",
        fontWeight:"bold"
        }
    
})