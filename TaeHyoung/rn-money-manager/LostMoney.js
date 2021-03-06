import React from 'react'
import {
    StyleSheet,
    Text,
    View
} from 'react-native';

import { Actions } from 'react-native-router-flux'


const LostMoney = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.welcome}
            onPress={() => Actions.costmoney()}>
                Lost!!! TaeHyoung!!
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center', //자식 뷰 컴포넌트 간격에 영향을 준다.
        alignItems: 'center',
        backgroundColor: '#666666',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
    },
});

export default LostMoney