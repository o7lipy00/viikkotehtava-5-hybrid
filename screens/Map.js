import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from 'expo-location';



export default function Map() {
    const [markers, setMarkers] = useState([]);
    const [location, setLocation] = useState(null);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permission to access location was denied');
                return;
            }

            let userLocation = await Location.getCurrentPositionAsync({});
            setLocation({
                latitude: userLocation.coords.latitude,
                longitude: userLocation.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            });
        })();
    }, []);

    const showMarker = (e) => {
        const coords = e.nativeEvent.coordinate;
        setMarkers((prevMarkers) => [...prevMarkers, coords]); // Lisää uusi koordinaatti taulukkoon
    };

    return (
        <MapView
            style={styles.map}
            region={location}
            onLongPress={showMarker}
        >
            {markers.map((marker, index) => (
                <Marker
                    key={index}
                    title={`Marker ${index + 1}`}
                    coordinate={marker} // Käytä suoraan markeria
                />
            ))}
        </MapView>
    );
}

const styles = StyleSheet.create({
    map: {
        height: '100%',
        width: '100%',
    },
});
