import React, { Component, useEffect, useState } from 'react'
import { Text, View, ScrollView } from 'react-native'
import { data } from '../../data/Data'
import OfferCard from './OfferCard'
import Icon from 'react-native-vector-icons/Ionicons'
import axios from 'axios'
import Loader from '../Global/Loader'
import { useLoader } from '../../features/context/LoaderContext'

const Offer = () => {
    const [restaurant, setRestaurant] = useState(null);
    const [menu, setMenu] = useState([])
    const { setLoader } = useLoader()

    useEffect(() => {
        const fetchRestaurant = async () => {
            setLoader(true)
            const res = await axios.get('http://192.168.6.50:3000/restaurant/getbyphone/8591941194', {
                headers: {
                    auth: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU5vIjoiODU5MTk0MTE5NCIsImlhdCI6MTcwNjUyNDg0NiwiZXhwIjoxNzA2NjExMjQ2fQ.Y7geCO8XXT2UG_bTMnyJaMSTQumcqtTbGMcnJYA5Was',
                    'Content-Type': 'application/json'
                }
            });
            if (res.status === 200) {
                setRestaurant(res.data.result);
                setMenu(res.data.result['menu']);

            }
            setLoader(false);
        }
        fetchRestaurant();

    }, [])
    console.log(restaurant);

    return (
        <View className='mt-3'>
            <View className='px-3 pt-3 pb-2'>
                <View className='flex-row justify-between align-center'>
                    <Text className="font-bold text-2xl text-gray-800">Offers near you!</Text>
                    <Icon name='md-arrow-forward-sharp' size={25} color='#e46c47' />
                </View>
                <Text className='text-gray-600'>Why not support your local resturant tonight</Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{
                paddingTop: 10,
                paddingHorizontal: 7,
            }}>
                {
                    menu?.map((offer) => {
                        return (restaurant ?
                            <View key={offer.name}>
                                <OfferCard id={offer.id} img={offer.image} name={offer.name} rating={offer.rating} cat={offer.category} price={offer.price} location={restaurant['address']['area']} des={offer.description} />
                            </View> :
                            <Loader />
                        )
                    })
                }
            </ScrollView>
        </View>
    )

}

export default Offer
