import React from 'react';
import { StyleSheet, Text, View, Alert, ScrollView, AsyncStorage, Image } from 'react-native';
import { Container, Header, Content, Button } from 'native-base';
import { Actions } from 'react-native-router-flux'


export default class Detail extends React.Component {

    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            datas: [],
            delete: false,
        };
    }

    componentDidMount() {
        this.getListData()
    }

    getListData() {
        return fetch('http://192.168.200.128:8080/api/list/' + this.props.id)
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

    getDelete() {
        return fetch('http://192.168.200.128:8080/api/delete/' + this.props.id, { "method": "delete" })
            .then((response) => console.log(response))
            .then((responseJson) => {

                this.getListData();
                Actions.costmoney();

            }).catch((error) => {
                console.error(error);
            });
    }

    render() {
        let { date, _id, category, contents, price, etc, cc, receipt_img } = this.state.datas;

        return (
            <View style={styles.container}>

                <View style={styles.image}>
                    <Image style={{ width: 200, height: 200 }} source={{ uri: 'http://192.168.200.128:8080/image/house@2x.png' }} />

                </View>


                <View style={styles.contents}>
                    <View style={styles.dateInText}>
                        <Text style={styles.text}>
                            {date == null ? date : date.split("T")[0]}
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


                <View style={styles.bottomButtons}>
                    <Button style={styles.buttonUpdate} danger iconRight onPress={() => { }}>
                        <Text style={{ color: "white", paddingLeft: 10, paddingRight: 10, fontSize: 30 }}>
                            수정
                            </Text>
                    </Button>

                    <Button style={styles.buttonDelete} danger iconRight onPress={() => {

                        Alert.alert(
                            '삭제',
                            '정말로 삭제하시겠습니까?',
                            [
                                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                                {
                                    text: 'OK', onPress: () => {
                                        this.getDelete();
                                    }
                                },
                            ],
                            { cancelable: false }
                        )

                    }}>
                        <Text style={{ color: "white", paddingLeft: 10, paddingRight: 10, fontSize: 30 }}>
                            삭제
                            </Text>
                    </Button>
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
        marginTop: 100,
        marginBottom: 50,
        fontSize: 40
    },
    cost: {
        marginTop: 30,
        marginBottom: 50,
        fontSize: 40,
    },
    image: {
        paddingTop: 50,
        paddingBottom: 50
    },
    contents: {
        fontSize: 25
    },
    text: {
        fontSize: 30,
        paddingBottom: 10
    },
    dateInText: {
        alignItems: "center"
    },
    contentsInText: {
        paddingTop: 20,
        alignItems: "center"
    },
    textContents: {
        fontSize: 15
    },
    bottomButtons: {
        flexDirection: 'row',
        paddingTop: 50
    },
    buttonUpdate: {
        marginRight: 20
    },
    buttonDelete: {
        marginLeft: 20
    }
});
