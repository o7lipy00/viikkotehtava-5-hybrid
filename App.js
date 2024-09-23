import { StyleSheet, SafeAreaView } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import Map from './screens/Map';
import MainAppBar from './components/MainAppBar';
import * as Location from 'expo-location';
import { useState } from 'react';

const settings = {
  backgroundColor: '#00a484', // Korjattu väriarvo
};

const icons = {
  location_not_known: 'crosshairs',
  location_searching: 'crosshairs_question',
  location_found: 'crosshairs-gps',
};

export default function App() {
  const [icon, setIcon] = useState(icons.location_not_known);
  const [location, setLocation] = useState({
    latitude: 65.000,
    longitude: 25.4800,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const getUserPosition = async () => {
    console.log("Button pressed!"); // Debugging
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      console.log('Location permission failed');
      return;
    }

    try {
      const position = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: 0.0922, // Lisätty delta-arvot
        longitudeDelta: 0.0421,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PaperProvider>
      <MainAppBar
        title="KARTTA"
        backgroundColor={settings.backgroundColor}
        icon={icon}
        getUserPosition={getUserPosition}
      />
      <SafeAreaView style={styles.container}>
        <Map location={location} />
      </SafeAreaView>
    </PaperProvider>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
