import { Text, View, StyleSheet } from 'react-native';
import ScreenSignUp from './components/screenSignUp';
import ScreenHome from './components/screenHome'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer style={styles.container}>
      <Stack.Navigator initialRouteName="ScreenSignUp"screenOptions={{
          headerStyle: {
            height: 30, // độ dài của thanh  title
          },
          headerTitleStyle: {
            fontSize: 15, // cỡ chữ trong thanh title
          },
        }}> 
        <Stack.Screen name="ScreenSignUp" component={ScreenSignUp}  options={{title: 'ScreenSignUp', headerShown: false }}/>
        <Stack.Screen name="ScreenHome" component={ScreenHome}  options={{title: 'ScreenHome', headerShown: false }}/>
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  
});
