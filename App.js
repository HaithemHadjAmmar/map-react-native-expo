import React, { useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export default function App() {
  const [mapLat, setMapLat] = useState(36.8065); // Updated latitude for Tunisia
  const [mapLong, setMapLong] = useState(10.1815); // Updated longitude for Tunisia
  const [markers, setMarkers] = useState([]); // State to store markers

  const locationData = [
    { latitude: 36.8065, longitude: 10.1815 }, // Coordinates for Tunisia
    { latitude: 6.84076664, longitude: 79.871323 },
  ];

  // Function to add a marker
  const addMarker = (latitude, longitude) => {
    const newMarker = { latitude, longitude };
    setMarkers([...markers, newMarker]);
  };

  // Function to remove a marker by index
  const removeMarker = (index) => {
    const updatedMarkers = markers.filter((_, i) => i !== index);
    setMarkers(updatedMarkers);
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
      </MapView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => addMarker(36.8065, 10.1815)} // Add a marker at Tunisia's coordinates
        >
          
        </TouchableOpacity>

        {/* Example of removing a marker */}
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => {
            if (markers.length > 0) {
              removeMarker(markers.length - 1); // Remove the last added marker
            }
          }}
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
  // buttonContainer: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   padding: 16,
  // },

});
