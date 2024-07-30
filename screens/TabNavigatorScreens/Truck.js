import MapView , { Marker } from 'react-native-maps';
import { View , Text , Image } from 'react-native';
import { Iconify } from 'react-native-iconify';

const binMarkers = [
  { id: '1', title: 'Viharamahadevi Park', description: 'A large public park in Colombo.', latitude: 6.9218381, longitude: 79.861243 },
  { id: '2', title: 'Galle Face Green', description: 'A popular ocean-side urban park.', latitude: 6.9270786, longitude: 79.844909 },
  { id: '3', title: 'Gangaramaya Temple', description: 'A famous Buddhist temple in Colombo.', latitude: 6.916169, longitude: 79.856556 },
  { id: '4', title: 'Beira Lake', description: 'A large lake in the heart of the city.', latitude: 6.921699, longitude: 79.855893 },
  { id: '5', title: 'Colombo National Museum', description: 'The largest museum in Sri Lanka.', latitude: 6.927079, longitude: 79.860964 },
];

const Truck = () => {

  return (
    <View className='flex-1 bg-white' >
      <MapView
        className='basis-3/4'
        provider={MapView.PROVIDER_DEFAULT} // Use default provider
        initialRegion={{
          latitude: 6.902120284441931,
          longitude: 79.86115289536023,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        zoomEnabled={true}
        scrollEnabled={true}
        zoomControlEnabled={true}
      >
        {binMarkers.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
            title={marker.title}
            description={marker.description}
            onPress={() => console.log('Marker pressed!')}
          >
            <Image
                source={require('../../assets/icons/house_icon.png')}
                className='h-8 w-8'
              />
          </Marker>
        ))}
      </MapView>

      <View className='flex-1 items-center bg-white rounded-t-2xl mt-[-14]'>

          <View className='h-1.5 w-12 bg-[#E3E3E3] rounded-full mt-3' />

          <View className='mt-4 items-center'>
            <Text className='text-black text-lg font-normal' >
              Truck No: <Text className='font-semibold' >PH-2547</Text>
            </Text>
            <Text className='text-[#808080] text-sm font-normal' >
              Reid Avenue - Kirulapone
            </Text>
          </View>

          <View className='flex-row items-center justify-center space-x-3 bg-[#7ED957]/20 py-2.5 px-5 rounded-xl mt-4' >
            <View className='mr-1' >
              <Iconify icon="mingcute:navigation-fill" size={20} color="#46AA62" />
            </View>
            <View>
              <Text className='text-gray-600 text-base font-semibold mr-1' >1km away from your location</Text>
              <Text className='text-gray-600 text-base font-normal mt-[-1]' >Arriving in 3min</Text>
            </View>  
          </View>

      </View>

    </View>
  )
}

export default Truck