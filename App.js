import { NavigationContainer } from "@react-navigation/native";
import Homepage from "./Homepage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Entypo from '@expo/vector-icons/Entypo';
import User from "./User";
const Tab = createBottomTabNavigator();

export default function App() {
 
  return (
   <NavigationContainer>
    <Tab.Navigator>
      
      <Tab.Screen name="Home" component={Homepage}  options={{
            tabBarIcon: ({ color, size }) => (
              <Entypo name="home" size={size} color={color} />
            ),
          }} />
          <Tab.Screen name="User" component={User}  options={{
            tabBarIcon: ({ color, size }) => (
              <Entypo name="user" size={size} color={color} />
            ),
          }} />
    </Tab.Navigator>
   </NavigationContainer>
  );
}

