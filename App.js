import React, { useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, Text } from 'react-native';

export default function App() {
  const [mapLat, setMapLat] = useState(36.8065); // Updated latitude for Tunisia
  const [mapLong, setMapLong] = useState(10.1815); // Updated longitude for Tunisia

  const locationData = [
    { latitude: 36.8065, longitude: 10.1815 }, // Coordinates for Tunisia
    { latitude: 6.84076664, longitude: 79.871323 },
  ];

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: mapLat,
          longitude: mapLong,
          latitudeDelta: 5, // Adjust the delta values as needed
          longitudeDelta: 5,
        }}
      >
        {locationData.map((data, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: data.latitude,
              longitude: data.longitude,
            }}
            title={`Marker ${index + 1}`}
            description={`Weight: ${data.weight}`}
          />
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
