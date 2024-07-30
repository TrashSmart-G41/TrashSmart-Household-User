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

const Bins = () => {

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
                source={require('../../assets/icons/trash_bin.png')}
                className='h-7 w-7'
              />
          </Marker>
        ))}
      </MapView>

      <View className='flex-1 items-center bg-white rounded-t-2xl mt-[-14]'>

          <View className='h-1.5 w-12 bg-[#E3E3E3] rounded-full mt-3' />

          <View className='mt-4 items-center'>
            <Text className='text-black text-lg font-semibold' >
              Nearest bin at Stran Ave
            </Text>
            <Text className='text-[#808080] text-sm font-normal' >
              300m away
            </Text>
          </View>

          <View className='flex-row items-center justify-center space-x-3 bg-[#7ED957]/20 py-3 px-6 rounded-xl mt-4' >
            
            <View className='bg-[#46AA62] p-2 rounded-full' >
              <Iconify icon="gravity-ui:trash-bin" size={22} color="white" />
            </View>
            
            <Text className='text-gray-600 text-lg font-semibold ' >Fill level: 65%</Text>
              
          </View>

      </View>

    </View>
  )
}

export default Bins