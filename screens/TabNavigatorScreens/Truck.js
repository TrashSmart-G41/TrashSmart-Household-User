import MapView, { Marker, PROVIDER_GOOGLE, Polyline } from 'react-native-maps';
import { View, Text, Image } from 'react-native';
import { Iconify } from 'react-native-iconify';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import PolylineDecoder from '@mapbox/polyline'; // Install this package for decoding the polyline
import { BASE_URL } from '../../utils/config';

const GOOGLE_API_KEY = 'AIzaSyBHtryqWl2vKZFKOFct2o5YSRLhbxqgI3Q'; // Replace with your API Key

const Truck = () => {
  const { userToken } = useContext(AuthContext);
  const [routeCoords, setRouteCoords] = useState([]);
  const [markers, setMarkers] = useState([]);

  const fetchRoute = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/v1/household_dispatch`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      const routeData = response.data;
      console.log(routeData[0]);

      // Parse the URL for origin, destination, and waypoints
      const url = new URL(routeData[0].route); // Adjust key if necessary
      const origin = url.searchParams.get('origin');
      const destination = url.searchParams.get('destination');
      const waypoints = url.searchParams.get('waypoints');

      // Fetch route details from Google Directions API
      const googleResponse = await axios.get(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&waypoints=${waypoints}&key=${GOOGLE_API_KEY}`
      );

      const routePolyline = googleResponse.data.routes[0].overview_polyline.points;
      const decodedPolyline = PolylineDecoder.decode(routePolyline); // Decode the polyline into lat/lng pairs

      // Convert decoded polyline into coordinate objects for Polyline
      const polylineCoords = decodedPolyline.map(([lat, lng]) => ({
        latitude: lat,
        longitude: lng,
      }));
      setRouteCoords(polylineCoords);

      // Add markers for visualization
      const originCoords = origin.split(',').map(Number);
      const destinationCoords = destination.split(',').map(Number);
      const waypointCoords = waypoints
        ? waypoints.split('|').map((point) => point.split(',').map(Number))
        : [];

      setMarkers([
        { coordinate: { latitude: originCoords[0], longitude: originCoords[1] }, title: 'Origin' },
        ...waypointCoords.map((point, index) => ({
          coordinate: { latitude: point[0], longitude: point[1] },
          title: `Waypoint ${index + 1}`,
        })),
        { coordinate: { latitude: destinationCoords[0], longitude: destinationCoords[1] }, title: 'Destination' },
      ]);
    } catch (error) {
      console.error('Error fetching route data:', error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchRoute();
  }, []);

  return (
    <View className="flex-1 bg-white">
      <MapView
        className="basis-3/4"
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 6.902120284441931,
          longitude: 79.86115289536023,
          latitudeDelta: 0.016,
          longitudeDelta: 0.009,
        }}
        showsUserLocation={true}
        showsMyLocationButton={true}
        followsUserLocation={true}
        showsCompass={true}
        scrollEnabled={true}
        zoomEnabled={true}
        pitchEnabled={true}
        rotateEnabled={true}
      >
        {/* Render Markers */}
        {markers.map((marker, index) => (
          <Marker key={index} coordinate={marker.coordinate} title={marker.title} />
        ))}

        {/* Render the Correct Route */}
        {routeCoords.length > 1 && (
          <Polyline coordinates={routeCoords} strokeColor="#7ED957" strokeWidth={4} />
        )}
      </MapView>

      <View className="flex-1 items-center bg-white rounded-t-2xl mt-[-14]">
        <View className="h-1.5 w-12 bg-[#E3E3E3] rounded-full mt-3" />
        <View className="mt-4 items-center">
          <Text className="text-black text-lg font-normal">
            Truck No: <Text className="font-semibold">PH-2547</Text>
          </Text>
          <Text className="text-[#808080] text-sm font-normal">Reid Avenue - Kirulapone</Text>
        </View>

        <View className="flex-row items-center justify-center space-x-3 bg-[#7ED957]/20 py-2.5 px-5 rounded-xl mt-4">
          <View className="mr-1">
            <Iconify icon="mingcute:navigation-fill" size={20} color="#46AA62" />
          </View>
          <View>
            <Text className="text-gray-600 text-base font-semibold mr-1">15km away from your location</Text>
            <Text className="text-gray-600 text-base font-normal mt-[-1]">Arriving in 40min</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Truck;
