import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/Home/HomeScreen';
import RestaurantScreen from './screens/Home/RestaurantScreen';
import BasketScreen from './screens/Home/BasketScreen';
import OrderPlacingScreen from './screens/Home/OrderPlacingScreen';
import DeliveryScreen from './screens/Home/DeliveryScreen';

import { store } from './store'
import { Provider } from 'react-redux'
import SignUpScreen from './screens/SignUp/SignUpScreen';
import OTPScreen from './screens/SignUp/OTPScreen';
import NameEmailInput from './screens/SignUp/NameEmailScreen';
import Address from './screens/SignUp/Address';
import { useAuth } from './features/context/AuthContext';

const HomeStack = createNativeStackNavigator();
const SignUpStack = createNativeStackNavigator();
export const Navigation = () => {
    const { userAdd } = useAuth();
    return (
        <NavigationContainer>
            <Provider store={store}>{!userAdd ?
                <SignUpStack.Navigator initialRouteName='Login'>
                    <SignUpStack.Screen name="Login" component={SignUpScreen}
                        options={{ headerShown: false }} />
                    <SignUpStack.Screen name="OTP" component={OTPScreen}
                        options={{ headerShown: false }} />
                    <SignUpStack.Screen name="Input" component={NameEmailInput}
                        options={{ headerShown: false }} />
                    <SignUpStack.Screen name="Address" component={Address}
                        options={{ headerShown: false }} />
                </SignUpStack.Navigator>
                :
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
            }
            </Provider>
        </NavigationContainer>
    );
}
