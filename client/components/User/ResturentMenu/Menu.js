import React from 'react'
import { Text, View } from 'react-native'
import { data } from '../../../data/Data'
import MenuItemCard from './MenuItemCard'

const Menu = ({ menu, resID }) => {

    return (
        <View>
            {
                menu?.map((info) => {
                    return (
                        <MenuItemCard key={info._id} resID={resID} id={info._id} img={info.img} name={info.name} desc={info.description} price={info.price} rating={info.rating} />
                    )
                })
            }
        </View>
    )

}

export default Menu
