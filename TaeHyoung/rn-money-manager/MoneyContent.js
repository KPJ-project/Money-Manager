import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native';
import { Container, Header, Content, Button } from 'native-base';

class MoneyContent extends React.Component {

    render () {
        let date = new Date();
        let now = date.toLocaleString()

        return (

            <View style={styles.container}>
                <Text style={[styles.index]}>{(this.props.id)+ ". "}</Text>
                <Text style={[styles.category]}>{(this.props.category || 'Contents')}</Text>
                <View style={[styles.pricepart]}>
                    <View>
                        <Text style={[styles.name]}>{this.props.contents || 'Price'}</Text>
                    </View>

                    <View style={{
                        flexDirection: 'row',
                        marginTop: 10,
                        marginBottom: 5,
                        alignItems: 'center'
                    }}>
                        <Text>$:</Text><Text style={[styles.price]}>{(this.props.price || 0)} 원</Text>
                    </View>
                </View>
                {/* <Text style={[styles.rank]}>{(this.props.etc || 'Contents')}</Text> */}
                <View style={styles.rightButton}>
                <Button danger iconRight>
                    <Text style={{color:"white",paddingLeft:10, paddingRight:10}}>
                        보기
                    </Text>
                </Button>
                </View>

                
            </View>
        )
    }
}

//<Text style={[styles.text, {flex: 1}]}>{'Updated: ' + (this.props.time || now)}</Text>

const styles = StyleSheet.create({


    container: {
        width: '100%',
        height: 80,
        flexDirection: 'row',
        backgroundColor: 'white',
        alignItems: 'center',
        //justifyContent: 'space-around',
        marginTop: 5,
        marginBottom: 5,
        borderBottomColor: '#bbb',
        borderBottomWidth: 1,
        

    },
    index: {
        marginRight:10,
    },
    pricepart: {
        marginLeft: 20,
        marginRight: 20
    },
    text: {
        color: 'black',
    },
    category: {
        fontSize: 18,
        marginLeft: 5,
    },
    name: {
        fontSize: 13,
        marginRight: 15,
    },
    price: {
        marginLeft: 5,
        fontSize: 13,
        fontWeight: 'bold',
        marginRight: 15,
    },
    volumn: {
        marginTop: 3,
        fontSize: 13,
        color: '#a8a5a5',
        marginRight: 15,
    },
    rightButton: {
        alignItems:"flex-end"
    } 
});

export default MoneyContent;