import React, { Component, useEffect, useState } from 'react'
import { Text, View, ScrollView } from 'react-native'
import { data } from '../../data/Data'
import OfferCard from './OfferCard'
import Icon from 'react-native-vector-icons/Ionicons'
import axios from 'axios'
import Loader from '../Global/Loader'
import { useLoader } from '../../features/context/LoaderContext'

const Offer = () => {
    const [restaurant, setRestaurant] = useState([]);
    const { setLoader } = useLoader()

    useEffect(() => {
        const fetchRestaurant = async () => {
            setLoader(true)
            try {
                const res = await axios.post('http://192.168.1.4:3000/user/getAllRestaurants', {
                    city: 'chd'
                });
                console.log(res.data);
                if (res.status === 200) {
                    setRestaurant(res.data.result);
                }
            }
            catch (err) {
                console.log(err);
            } finally {
                setLoader(false);
            }
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
                    restaurant?.map((offer) => {
                        return (restaurant ?
                            <View key={offer.name}>
                                <OfferCard id={offer.id} img={offer?.img} />
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
