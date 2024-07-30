import MapView , { Marker } from 'react-native-maps';
import { View , Text , Image } from 'react-native';
import { Iconify } from 'react-native-iconify';

const houseMarkers = [
  { id: '1', title: 'House 1', description: 'Residential house in Rajagiriya.', latitude: 6.916409, longitude: 79.900338 },
  { id: '2', title: 'House 2', description: 'Residential house in Rajagiriya.', latitude: 6.917021, longitude: 79.900252 },
  { id: '4', title: 'House 4', description: 'Residential house in Rajagiriya.', latitude: 6.916731, longitude: 79.900084 },
  { id: '5', title: 'House 5', description: 'Residential house in Rajagiriya.', latitude: 6.917457, longitude: 79.900374 },
  { id: '6', title: 'House 6', description: 'Residential house in Rajagiriya.', latitude: 6.916612, longitude: 79.899593 },
  { id: '7', title: 'House 7', description: 'Residential house in Rajagiriya.', latitude: 6.915626, longitude: 79.898911 },
  { id: '8', title: 'House 8', description: 'Residential house in Rajagiriya.', latitude: 6.917276, longitude: 79.900648 },
  { id: '9', title: 'House 9', description: 'Residential house in Rajagiriya.', latitude: 6.916145, longitude: 79.899832 },
  { id: '10', title: 'House 10', description: 'Residential house in Rajagiriya.', latitude: 6.916790, longitude: 79.900131 },
  { id: '12', title: 'House 12', description: 'Residential house in Rajagiriya.', latitude: 6.916272, longitude: 79.900184 },
  { id: '13', title: 'House 13', description: 'Residential house in Rajagiriya.', latitude: 6.917340, longitude: 79.900573 },
  { id: '14', title: 'House 14', description: 'Residential house in Rajagiriya.', latitude: 6.916420, longitude: 79.900420 },
  { id: '15', title: 'House 15', description: 'Residential house in Rajagiriya.', latitude: 6.915769, longitude: 79.899467 },
  { id: '16', title: 'House 16', description: 'Residential house in Rajagiriya.', latitude: 6.917065, longitude: 79.900088 },
  { id: '17', title: 'House 17', description: 'Residential house in Rajagiriya.', latitude: 6.916567, longitude: 79.899770 },
  { id: '18', title: 'House 18', description: 'Residential house in Rajagiriya.', latitude: 6.917016, longitude: 79.900447 },
  { id: '19', title: 'House 19', description: 'Residential house in Rajagiriya.', latitude: 6.916788, longitude: 79.899918 },
  { id: '21', title: 'House 21', description: 'Residential house in Rajagiriya.', latitude: 6.917152, longitude: 79.900227 },
  { id: '22', title: 'House 22', description: 'Residential house in Rajagiriya.', latitude: 6.916308, longitude: 79.899469 },
  { id: '23', title: 'House 23', description: 'Residential house in Rajagiriya.', latitude: 6.915810, longitude: 79.899681 },
  { id: '24', title: 'House 24', description: 'Residential house in Rajagiriya.', latitude: 6.917202, longitude: 79.900093 },
  { id: '26', title: 'House 26', description: 'Residential house in Rajagiriya.', latitude: 6.916496, longitude: 79.900028 },
  { id: '27', title: 'House 27', description: 'Residential house in Rajagiriya.', latitude: 6.917080, longitude: 79.900191 },
  { id: '28', title: 'House 28', description: 'Residential house in Rajagiriya.', latitude: 6.915951, longitude: 79.898673 },
  { id: '29', title: 'House 29', description: 'Residential house in Rajagiriya.', latitude: 6.916457, longitude: 79.899565 },
  { id: '30', title: 'House 30', description: 'Residential house in Rajagiriya.', latitude: 6.917291, longitude: 79.900236 },
  { id: '31', title: 'House 31', description: 'Residential house in Rajagiriya.', latitude: 6.916162, longitude: 79.899377 },
  { id: '32', title: 'House 32', description: 'Residential house in Rajagiriya.', latitude: 6.917006, longitude: 79.900548 },
  { id: '34', title: 'House 34', description: 'Residential house in Rajagiriya.', latitude: 6.917067, longitude: 79.900388 },
  { id: '35', title: 'House 35', description: 'Residential house in Rajagiriya.', latitude: 6.916601, longitude: 79.899650 },
  { id: '36', title: 'House 36', description: 'Residential house in Rajagiriya.', latitude: 6.916950, longitude: 79.900493 },
  { id: '37', title: 'House 37', description: 'Residential house in Rajagiriya.', latitude: 6.917364, longitude: 79.900349 },
  { id: '38', title: 'House 38', description: 'Residential house in Rajagiriya.', latitude: 6.915747, longitude: 79.898936 },
  { id: '39', title: 'House 39', description: 'Residential house in Rajagiriya.', latitude: 6.916809, longitude: 79.900042 },
  { id: '40', title: 'House 40', description: 'Residential house in Rajagiriya.', latitude: 6.917236, longitude: 79.900131 }
];


const Truck = () => {

  return (
    <View className='flex-1 bg-white' >
      <MapView
        className='basis-3/4'
        provider={MapView.PROVIDER_DEFAULT} // Use default provider
        initialRegion={{
          latitude: 6.916299,
          longitude: 79.899684,
          latitudeDelta: 0.0100,
          longitudeDelta: 0.0058,
        }}
        zoomEnabled={true}
        scrollEnabled={true}
        zoomControlEnabled={true}
      >

        <Marker
            key={'Current Location'}
            coordinate={{ latitude: 6.916299, longitude: 79.899684 }}
            title={'Current Location'}
            onPress={() => console.log('Current Location pressed!')}
          >
            <Image
                source={require('../../assets/icons/driver_icon.png')}
                className='h-11 w-11'
              />
          </Marker>

        {houseMarkers.map((marker) => (
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