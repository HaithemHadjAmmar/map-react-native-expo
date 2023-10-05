import React, { useState, useEffect } from 'react';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export default function App() {
  const [mapLat, setMapLat] = useState(36.8065); // Initial latitude for Tunisia
  const [mapLong, setMapLong] = useState(10.1815); // Initial longitude for Tunisia
  const [markers, setMarkers] = useState([]); // State to store markers
  const [showPolyline, setShowPolyline] = useState(false); // State to show/hide polyline
  const [distance, setDistance] = useState(null); // State to store distance

  useEffect(() => {
    // Calculate and update the distance whenever markers change
    if (markers.length === 2) {
      const lat1 = markers[0].latitude;
      const lon1 = markers[0].longitude;
      const lat2 = markers[1].latitude;
      const lon2 = markers[1].longitude;

      const distanceInKm = calculateDistance(lat1, lon1, lat2, lon2);
      setDistance(distanceInKm);
    } else {
      setDistance(null);
    }
  }, [markers]);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const radius = 6371; // Earth's radius in kilometers
    const dLat = degToRad(lat2 - lat1);
    const dLon = degToRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(degToRad(lat1)) * Math.cos(degToRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = radius * c;
    return distance;
  };

  const degToRad = (deg) => {
    return deg * (Math.PI / 180);
  };

  const handleMapPress = (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    if (markers.length < 2) {
      const newMarker = { latitude, longitude };
      setMarkers([...markers, newMarker]);
      if (markers.length === 1) {
        setShowPolyline(true);
      }
    }
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

        {/* Display polyline when two markers are added */}
        {showPolyline && markers.length === 2 && (
          <Polyline
            coordinates={markers}
            strokeWidth={2}
            strokeColor="blue"
          />
        )}
      </MapView>

      <View style={styles.infoContainer}>
        {distance !== null && (
          <Text style={styles.distanceText}>Distance: {distance.toFixed(2)} km</Text>
        )}

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setMarkers([])} // Clear markers
          >
            <Text>Clear Markers</Text>
          </TouchableOpacity>
        </View>
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
  infoContainer: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  distanceText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  addButton: {
    backgroundColor: 'green',
    padding: 8,
    borderRadius: 4,
    marginLeft: 8,
  },
});
