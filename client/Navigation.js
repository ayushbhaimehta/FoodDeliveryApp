import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import { store } from './store'
import { Provider } from 'react-redux'
import { useAuth } from './features/context/AuthContext';

import HomeScreen from './screens/User/Home/HomeScreen';
import RestaurantScreen from './screens/User/Home/RestaurantScreen';
import BasketScreen from './screens/User/Home/BasketScreen';
import OrderPlacingScreen from './screens/User/Home/OrderPlacingScreen';
import DeliveryScreen from './screens/User/Home/DeliveryScreen';
import SignUpScreen from './screens/User/SignUp/SignUpScreen';
import OTPScreen from './screens/User/SignUp/OTPScreen';
import NameEmailInput from './screens/User/SignUp/NameEmailScreen';
import Address from './screens/User/SignUp/Address';
import RestaurantLoginScreen from './screens/Restaurant/SignUp/RestaurantLoginScreen';
import DriverSignUp from './screens/Driver/Signup/DriverSignUp';
import AccountOptions from "./components/User/Home/AccountOptions"
import RestaurantOTPScreen from './screens/Restaurant/SignUp/RestaurantOTPScreen';
import RestaurantNameEmailInput from './screens/Restaurant/SignUp/RestaurantNameEmailScreen';
import RestaurantAddress from './screens/Restaurant/SignUp/RestaurantAddress';
import RestaurantLiveOrders from './screens/Restaurant/Home/RestaurantLiveOrders';
import RestaurantHome from './screens/Restaurant/Home/RestrauntHomeScreen';
import RestaurantOptions from './screens/Restaurant/Home/RestaurantOptions';
import MenuScreen from './screens/Restaurant/Home/MenuScreen';
import AddNewItemPage from './components/Restaurant/Menu/AddNewItem';
import AddressScreen from './screens/User/Home/AddressesScreen';
import AddNewAddress from './screens/User/Home/AddNewAddress';

const HomeStack = createNativeStackNavigator();
const SignUpStack = createNativeStackNavigator();
const RestaurantStack = createNativeStackNavigator();
const RestaurantSignUpStack = createNativeStackNavigator();
const DeliveryStack = createNativeStackNavigator()

export const Navigation = () => {
    const { userAdd, type } = useAuth();
    if (type === "user") {
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
                    <HomeStack.Navigator initialRouteName='Home'>
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
                        <HomeStack.Screen name="AccountOptions" component={AccountOptions}
                            options={{ headerShown: false }} />
                        <HomeStack.Screen name="Addresses" component={AddressScreen}
                            options={{ headerShown: false }} />
                        <HomeStack.Screen name="AddNewAddress" component={AddNewAddress}
                            options={{ headerShown: false }} />
                    </HomeStack.Navigator>
                }
                </Provider>
            </NavigationContainer>
        );
    } else if (type === "restaurant") {
        return (
            <NavigationContainer>
                {!userAdd ?
                    <RestaurantSignUpStack.Navigator
                        screenOptions={{
                            headerShown: false
                        }}
                        initialRouteName='Login'>

                        <RestaurantSignUpStack.Screen name="Login" component={RestaurantLoginScreen} />
                        <RestaurantSignUpStack.Screen name="OTP" component={RestaurantOTPScreen} />
                        <RestaurantSignUpStack.Screen name="Input" component={RestaurantNameEmailInput} />
                        <RestaurantSignUpStack.Screen name="Address" component={RestaurantAddress} />
                    </RestaurantSignUpStack.Navigator>

                    :
                    <RestaurantStack.Navigator initialRouteName='MenuPage'>
                        <RestaurantStack.Screen name="Home" component={RestaurantHome}
                            options={{ headerShown: false }} />
                        <RestaurantStack.Screen name="LiveOrders" component={RestaurantLiveOrders}
                            options={{ headerShown: false }} />
                        <RestaurantStack.Screen name="RestaurantOptions" component={RestaurantOptions}
                            options={{ headerShown: false }} />
                        <RestaurantStack.Screen name="MenuPage" component={MenuScreen}
                            options={{ headerShown: false }} />
                        <RestaurantStack.Screen name="AddNew" component={AddNewItemPage}
                            options={{ headerShown: false }} />
                        {/*<RestaurantStack.Screen name="AccountOptions" component={AccountOptions}
                            options={{ headerShown: false }} /> */}
                    </RestaurantStack.Navigator>

                }
            </NavigationContainer>
        )
    } else if (type === "driver") {
        return (

            <NavigationContainer>
                <DeliveryStack.Navigator
                    screenOptions={{ headerShown: false }}
                    initialRouteName='Login'
                >
                    <DeliveryStack.Screen name='Login' component={DriverSignUp}
                    />
                </DeliveryStack.Navigator>
            </NavigationContainer>
        )
    }
}
