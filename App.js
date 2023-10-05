import React, { useState } from 'react';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export default function App() {
  const [mapLat, setMapLat] = useState(36.8065); // Updated latitude for Tunisia
  const [mapLong, setMapLong] = useState(10.1815); // Updated longitude for Tunisia
  const [markers, setMarkers] = useState([]); // State to store markers
  const [showPolyline, setShowPolyline] = useState(false); // State to show/hide polyline

  const locationData = [
    { latitude: 36.8065, longitude: 10.1815 }, // Coordinates for Tunisia
    { latitude: 6.84076664, longitude: 79.871323 },
  ];

  // Function to add a marker
  const addMarker = (latitude, longitude) => {
    // Allow adding only two markers
    if (markers.length < 2) {
      const newMarker = { latitude, longitude };
      setMarkers([...markers, newMarker]);

      // Show the polyline when two markers are added
      if (markers.length === 1) {
        setShowPolyline(true);
      }
    }
  };

  // Function to handle map click
  const handleMapPress = (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    addMarker(latitude, longitude);
  };

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
        onPress={handleMapPress} // Handle map clicks
      >
        {/* Display markers from state */}
        {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={marker}
            title={`Marker ${index + 1}`}
            description={`Latitude: ${marker.latitude}, Longitude: ${marker.longitude}`}
          />
        ))}

        {/* Display fixed location markers */}
        {locationData.map((data, index) => (
          <Marker
            key={`fixed_${index}`}
            coordinate={data}
            title={`Marker ${index + 1}`}
            description={`Weight: ${data.weight}`}
          />
        ))}

        {/* Display polyline when two markers are added */}
        {showPolyline && markers.length === 2 && (
          <Polyline
            coordinates={markers}
            strokeWidth={2}
            strokeColor="blue"
          />
        )}
      </MapView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => addMarker(36.8065, 10.1815)} // Add a marker at Tunisia's coordinates
        >
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  
});
