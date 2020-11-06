import React from 'react'
import { StyleSheet, View, Text, FlatList} from 'react-native'

const CartScreen = props => {
    return (
        <View style={style.screen} >
            <FlatList >
                
            </FlatList>
        </View>
    )
}

const style = StyleSheet.create({
    screen : {
        flex: 1
    }
})

export default CartScreen