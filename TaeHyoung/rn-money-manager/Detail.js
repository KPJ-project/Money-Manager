import React from 'react';
import { StyleSheet, Text, View, Button, Alert,ScrollView, AsyncStorage, Image } from 'react-native';
import { Actions } from 'react-native-router-flux'



export default class Detail extends React.Component{

    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
          datas: [],
        };
      }
      
      componentDidMount() {
        this.getListData()
      }
      
      getListData() {
        return fetch('http://localhost:8080/api/list/' + this.props.id)
          .then((response) => response.json())
          .then((responseJson) => {
      
            this.setState({
              datas: responseJson,
            });

            
            console.log("componentDidMount");
            console.log(this.state.datas);
      
            return responseJson;
            
          }).catch((error) => {
            console.error(error);
          });
      }
      
      
    //   async _calCost (result) {
    //     await AsyncStorage.setItem("cost", result.toString());
        
    //   }
      
      
         render(){
            let {date, _id, category, contents, price, etc, cc, receipt_img} = this.state.datas;
            console.log(this.state.datas)
            console.log(date);
            //let crop_date = date.split("T")[0];
            //let crop_date= "2015-04-12"
            return (
                <View style={styles.container}>

                <View style={styles.image}>
                    <Image style={{width: 200, height: 200}} source={{uri: 'http://localhost:8080/image/house@2x.png'}}/>

                </View>
                <View style={styles.contents}>
                    <View style={styles.dateInText}>
                        <Text style={styles.text}>
                            { date == null ? date : date.split("T")[0]}
                        </Text>
                        <Text style={styles.text}>
                            {category} / {price}
                        </Text>
                    </View>
                    <View style={styles.contentsInText}>
                        <Text style={styles.text}>
                            내용
                        </Text>                    
                        <Text style={styles.textContents}>
                            {contents}
                        </Text>
                    </View>
                    <View style={styles.contentsInText}>
                        <Text style={styles.text}>
                            기타
                        </Text>                    
                        <Text style={styles.textContents}>
                            {etc}
                        </Text>
                    </View>
                
                </View>
                                                                                
                </View>
                );
         }
          
  
        }  


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        //justifyContent: 'space-evenly',
    },
    toptitle: {
        marginTop:100,
        marginBottom:50,
        fontSize:40
    },
    cost: {
    marginTop:30,
    marginBottom:50,
    fontSize:40,
    },
    image:{
        paddingTop:50,
        paddingBottom:50
    },
    contents:{
        fontSize:25
    },
    text:{
        fontSize:30,
        paddingBottom:10
    },
    dateInText:{
        alignItems:"center"
    },
    contentsInText:{
        paddingTop:20,
        alignItems:"center"
    },
    textContents:{
        fontSize:15
    }
    });
      