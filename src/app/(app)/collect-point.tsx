import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { requestForegroundPermissionsAsync, getCurrentPositionAsync, LocationObject, watchPositionAsync } from 'expo-location';
import { useEffect, useState } from "react";
import { SelectedMapSheet } from "@/components/selected-map-sheet";

export default function PontosDeColeta() {
    const [location, setLocation] = useState<LocationObject | null>(null);
    const [selectedLocation, setSelectedLocation] = useState<any>();

    const locMock = [
        {
            id: 1,
            name: 'Ponto de Coleta 1',
            address: 'Rua das Flores, 123, Bairro das Flores - 85875-000',
            category: 'Lixo Eletrônico',
            contact: '(12)3456789',
            longitude: -54.5748775,
            latitude: -25.5190413
        },
        {
            id: 2,
            name: 'Ponto de Coleta 2',
            address: 'Rua das Flores, 233, Bairro das Flores - 85875-000',
            category: 'Óleo de Cozinha',
            contact: '(12)3456789',
            longitude: -54.5918385,
            latitude: -25.4570113
        },
        {
            id: 3,
            name: 'Ponto de Coleta 3',
            address: 'Rua das Flores, 333, Bairro das Flores - 85875-000',
            category: 'Material Contaminado',
            contact: '(12)3456789',
            longitude: -54.5518385,
            latitude: -25.4910113
        },
    ]

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
                    showsUserLocation
                    followsUserLocation
                    showsMyLocationButton
                    style={styles.map}
                    initialRegion={{
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421
                    }}>
                    {locMock.map((loc, index) => (
                        <Marker
                            
                            onPress={() => setSelectedLocation(loc)}
                            key={index}
                            image={require('../../../assets/icons/marker.png')}
                            coordinate={{
                                latitude: loc.latitude,
                                longitude: loc.longitude
                            }}
                        />))}
                </MapView>}
            <SelectedMapSheet userLocation={location} collectPoint={selectedLocation} />
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