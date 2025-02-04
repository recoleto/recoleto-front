import { ActivityIndicator, StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { requestForegroundPermissionsAsync, getCurrentPositionAsync, LocationObject } from 'expo-location';
import { useEffect, useState } from "react";
import { SelectedMapSheet } from "@/components/selected-map-sheet";
import { useCollectPointsUser } from "api/hooks/useCollectPointsUser";
import { UrbanSolidWasteCategory } from "@/utils/types";
import Toast from "react-native-toast-message";
import { MapFilterChip } from "@/components/map-filter-chip";
import { useCategory } from "@/contexts/map-filter-context";
import React from "react";

export default function PontosDeColeta() {
  const [location, setLocation] = useState<LocationObject | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<any>();
  const { selectedCategory } = useCategory();
  const [loading, setLoading] = useState<boolean>(false);
  const { filteredCollectPoints = [], fetchCollectPointsByCategory, fetchAllCollectPoints } = useCollectPointsUser();
  const [region, setRegion] = useState<any>();

  async function getLocation() {
    try {
      const { granted } = await requestForegroundPermissionsAsync();
      if (granted) {
        const currentLocation = await getCurrentPositionAsync();
        setLocation(currentLocation);
      } else {
        Toast.show({
          type: 'error',
          text1: 'Permissão de localização negada.',
          position: 'top',
          visibilityTime: 3000,
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Erro ao obter localização.',
        position: 'top',
        visibilityTime: 3000,
      });
    }
  }

  useEffect(() => {
    getLocation();
  }, [selectedCategory]);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      if (selectedCategory && selectedCategory !== UrbanSolidWasteCategory.TODOS) {
        await fetchCollectPointsByCategory(selectedCategory as UrbanSolidWasteCategory);
      } else {
        await fetchAllCollectPoints();
      }
      setLoading(false);
    }
    fetchData();
  }, [selectedCategory]);

  useEffect(() => {
    if (!loading && selectedCategory) {
      if (filteredCollectPoints && filteredCollectPoints.length === 0) {
        Toast.show({
          type: 'info',
          text1: 'Nenhum ponto de coleta encontrado.',
          position: 'top',
          visibilityTime: 3000,
        });
      }
    }
  }, [filteredCollectPoints, loading]);

  return (
    <View style={{ flex: 1 }}>
      {location ?
        <MapView
          showsUserLocation
          followsUserLocation
          showsMyLocationButton
          style={styles.map}
          region={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}>
          {filteredCollectPoints && filteredCollectPoints.length > 0 ? filteredCollectPoints.map((loc, index) => (
            <Marker
              key={loc.pointUUID}
              onPress={() => setSelectedLocation(loc)}
              image={require('../../../../../assets/icons/marker.png')}
              coordinate={{
                latitude: Number(loc.latitude),
                longitude: Number(loc.longitude)
              }} />
          )) : null}
        </MapView> : <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size='large' color='#000' />
        </View>}
      {selectedLocation && (
        <SelectedMapSheet
          loc={selectedLocation}
          userLocation={location}
          collectPoint={selectedLocation}
        />
      )}
      <MapFilterChip />
    </View>
  )
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
    width: '100%',
    position: 'relative'
  },
})