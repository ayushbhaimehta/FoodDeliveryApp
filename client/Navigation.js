import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import RestaurantScreen from './screens/RestaurantScreen';
import BasketScreen from './screens/BasketScreen';
import OrderPlacingScreen from './screens/OrderPlacingScreen';
import DeliveryScreen from './screens/DeliveryScreen';

import { store } from './store'
import { Provider } from 'react-redux'

const HomeStack = createNativeStackNavigator();

export const HomeNavigation = () => {
    return (
        <NavigationContainer>
            <Provider store={store}>
                <HomeStack.Navigator>
                    <HomeStack.Screen name="Home" component={HomeScreen}
                        options={{ headerShown: false }} />
                    <HomeStack.Screen name="Restaurant" component={RestaurantScreen}
                        options={{ headerShown: false }} />
                    <HomeStack.Screen name="Basket" component={BasketScreen}
                        options={{ presentation: 'modal', headerShown: false }} />
                    <HomeStack.Screen name="OrderPlacing" component={OrderPlacingScreen}
                        options={{ headerShown: false }} />
                    <HomeStack.Screen name="Delivery" component={DeliveryScreen}
                        options={{ headerShown: false }} />
                </HomeStack.Navigator>
            </Provider>
        </NavigationContainer>
    );
}
