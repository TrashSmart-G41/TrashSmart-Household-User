import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { View, Text, Image } from 'react-native';
import { Iconify } from 'react-native-iconify';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL, GOOGLE_MAPS_API_KEY } from '../../utils/config';
import { AuthContext } from '../../context/AuthContext';
import haversine from 'haversine-distance';
import * as Location from 'expo-location';


const Bins = () => {
  const { userToken } = useContext(AuthContext);
  const [binMarkers, setBinMarkers] = useState([]);
  const [clickedMarker, setClickedMarker] = useState();
  const [distance, setDistance] = useState();
  const [origin, setOrigin] = useState({ latitude: 6.902120284441931, longitude: 79.86115289536023 });
  const [destination, setDestination] = useState();
  const [nearestBin, setNearestBin] = useState(null);
  const [address, setAddress] = useState(null); 
  const [currentLocation, setCurrentLocation] = useState(null); 

  const getCurrentLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('Permission to access location was denied');
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = currentLocation.coords;

      console.log( latitude + "      " + longitude)
    } catch (error) {
      console.error('Error fetching current location:', error);
      setError('Failed to get current location');
    }
  }

  const getAddressFromCoordinates = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_API_KEY}`
      );
  
      if (response.data.results.length > 0) {
        const addressComponents = response.data.results[0].address_components;
  
        // Extract street name (route)
        const street = addressComponents.find(component =>
          component.types.includes("route")
        )?.long_name;
  
        // Extract locality (e.g., Colombo)
        const locality = addressComponents.find(component =>
          component.types.includes("locality")
        )?.long_name;
  
        // Combine the street and locality
        const shortAddress = `${street || ''}, ${locality || ''}`.trim();
        setAddress(shortAddress);
      } else {
        setAddress('No address found');
      }
    } catch (error) {
      console.error('Error fetching address:', error);
      setAddress('Failed to fetch address');
    }
  };
  

  const fetchBins = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/v1/communal_bin`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      const binData = response.data;
      console.log(binData);

      // Transform API response
      const transformedMarkers = binData.map((bin) => ({
        id: bin.id.toString(),
        latitude: bin.latitude, // Correct coordinate
        longitude: bin.longitude,
        fillLevel: bin.fillLevel,
      }));

      setBinMarkers(transformedMarkers); // Update state
      findNearestBin(transformedMarkers);
    } catch (error) {
      console.error('Error fetching bin data:', error.response?.data || error.message);
    }
  };

  const findNearestBin = (bins) => {
    let closestBin = null;
    let shortestDistance = Infinity;

    bins.forEach((bin) => {
      const binLocation = { latitude: bin.latitude, longitude: bin.longitude };
      const distance = haversine(origin, binLocation); // Distance in meters

      if (distance < shortestDistance) {
        shortestDistance = distance;
        closestBin = { ...bin, distance: (distance / 1000).toFixed(2) }; // Convert to km and format
      }
    });

    setNearestBin(closestBin);
    setDestination({ latitude : closestBin.latitude , longitude : closestBin.longitude });
    getAddressFromCoordinates(closestBin.latitude, closestBin.longitude);
  };


  useEffect(() => {
    getCurrentLocation();
    fetchBins(); // Fetch bins on component mount
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
        {/* Current Location Marker */}
        <Marker
          key="Current Location"
          coordinate={{ latitude: 6.902120284441931, longitude: 79.86115289536023 }}
          title="Current Location"
          pinColor="blue"
          onPress={() => console.log('Current Location pressed!')}
        />

        {/* Bin Markers */}
        {binMarkers.map(marker => {
          return(
            <Marker
              key={marker.id}
              coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
              title={`Bin ID: ${marker.id}`}
              description={ `Fill Level: ${marker.fillLevel}%` }
              onPress={() => {
                setNearestBin(null);
                setDestination({ latitude: marker.latitude, longitude: marker.longitude });
                setClickedMarker({ 
                  id: marker.id, 
                  fillLevel: marker.fillLevel
                });
                getAddressFromCoordinates(marker.latitude, marker.longitude);
              }}
            >
              {/* Custom Icon */}
              <Image
                source={require('../../assets/icons/trash_bin.png')}
                className="h-6 w-6"
              />
              {/*<Callout>
                <View className="w-28 p-2">
                  <Text className="font-semibold text-base">{`Bin ID: ${marker.id}`}</Text>
                  <Text className="text-base">{`Fill Level: ${marker.fillLevel}%`}</Text>
                  <Text className="text-blue-500 underline">
                    Tap for more details
                  </Text>
                </View>
              </Callout>*/}

            </Marker>
          );
        })}
  
        {origin != undefined && destination != undefined ? 
          <MapViewDirections
              origin={origin}
              destination={destination}
              apikey={GOOGLE_MAPS_API_KEY}
              strokeWidth={3}
              strokeColor="#00FF00"
              onReady={result => {
                console.log(`Distance: ${result.distance} km`);
                console.log(`Duration: ${result.duration} min.`);  
              }}
          /> : null}

      </MapView>

      {/* Bottom Info Section */}
      <View className="flex-1 items-center bg-white rounded-t-2xl mt-[-14]">
        <View className="h-1.5 w-12 bg-[#E3E3E3] rounded-full mt-3 " />

        {((distance && clickedMarker) || nearestBin) && address && <View className="mt-3 items-center">
          <Text numberOfLines={2} className="text-black text-lg font-semibold leading-5 text-center ">
            {nearestBin != null 
              ? `Nearest Bin, at ${address}` 
              : clickedMarker   
                ? `Distance to Bin, at ${address}` 
                : ''}
          </Text>
          <Text className="text-[#808080] text-sm font-normal mt-2.5">
              {distance} km away</Text>
        </View>}

        <View className="flex-row items-center justify-center space-x-3 bg-[#7ED957]/20 py-2.5 px-6 rounded-xl mt-5">
          <View className="bg-[#46AA62] p-2 rounded-full">
            <Iconify icon="gravity-ui:trash-bin" size={22} color="white" />
          </View>
          <Text className="text-gray-600 text-lg font-semibold">
            Fill Level: {nearestBin != null 
              ? ` ${nearestBin.fillLevel}%` 
              : clickedMarker 
                ? ` ${clickedMarker.fillLevel}%` 
                : ''}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Bins;
