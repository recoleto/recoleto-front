import { StyleSheet, View } from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";
import { requestForegroundPermissionsAsync, getCurrentPositionAsync, LocationObject, watchPositionAsync } from 'expo-location';
import { useEffect, useState } from "react";
import { Text } from "react-native";

export default function PontosDeColeta() {
    const [location, setLocation] = useState<LocationObject | null>(null);

    async function getLocation() {
        const { granted } = await requestForegroundPermissionsAsync();
        if (granted) {
            const currentLocation = await getCurrentPositionAsync();
            setLocation(currentLocation);
        }
    }

    useEffect(() => {
        getLocation();
    }, []);

    return (
        <View style={{ flex: 1 }}>
            {location &&
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421
                    }}>
                    <Marker
                        image={require('../../../assets/icons/marker.png')}
                        coordinate={{
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude
                        }} title="Seu local" description="Você está aqui">
                        <Callout tooltip>
                            <View>
                                <View style={styles.bubble}>
                                    <Text>Seu local</Text>
                                    <Text>Latitude: {location.coords.latitude}</Text>
                                    <Text>Longitude: {location.coords.longitude}</Text>
                                </View>
                            </View>
                        </Callout>
                    </Marker>
                </MapView>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    map: {
        flex: 1,
        width: '100%'
    },
    bubble: {
        flexDirection: 'column',
        alignSelf: 'flex-start',
        backgroundColor: '#fff',
        borderRadius: 6,
        borderColor: '#ccc',
        borderWidth: 0.5,
        padding: 15,
        width: 150
    }
})