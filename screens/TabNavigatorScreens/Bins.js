import MapView , { Marker } from 'react-native-maps';
import { View , Text , Image } from 'react-native';
import { Iconify } from 'react-native-iconify';

const binMarkers = [
  { id: '1', title: 'University of Colombo', description: 'A leading university in Sri Lanka.', latitude: 6.9000, longitude: 79.8607 },
  { id: '2', title: 'Royal College Colombo', description: 'A prestigious boys\' school.', latitude: 6.9055, longitude: 79.8605 },
  { id: '3', title: 'Viharamahadevi Park', description: 'A large public park in Colombo.', latitude: 6.9218, longitude: 79.8612 },
  { id: '4', title: 'Independence Square', description: 'A national monument in Sri Lanka.', latitude: 6.9057, longitude: 79.8617 },
  { id: '5', title: 'Nelum Pokuna Mahinda Rajapaksa Theatre', description: 'A performing arts center in Colombo.', latitude: 6.9147, longitude: 79.8604 },
  { id: '6', title: 'Gangaramaya Temple', description: 'A famous Buddhist temple in Colombo.', latitude: 6.9162, longitude: 79.8566 },
  { id: '7', title: 'Beira Lake', description: 'A large lake in the heart of the city.', latitude: 6.9217, longitude: 79.8559 },
  { id: '8', title: 'Colombo National Museum', description: 'The largest museum in Sri Lanka.', latitude: 6.9271, longitude: 79.8609 },
  { id: '9', title: 'Galle Face Green', description: 'A popular ocean-side urban park.', latitude: 6.9271, longitude: 79.8449 },
  { id: '10', title: 'Old Parliament Building', description: 'A historic building in Colombo.', latitude: 6.9303, longitude: 79.8413 },
  { id: '11', title: 'Dutch Hospital Shopping Precinct', description: 'A popular shopping and dining venue.', latitude: 6.9342, longitude: 79.8429 },
  { id: '12', title: 'Crescat Boulevard', description: 'A shopping mall in Colombo.', latitude: 6.9225, longitude: 79.8483 },
  { id: '13', title: 'Liberty Plaza', description: 'A well-known shopping complex.', latitude: 6.9173, longitude: 79.8523 },
  { id: '14', title: 'Colpetty Market', description: 'A busy market in Colombo.', latitude: 6.9165, longitude: 79.8504 },
  { id: '15', title: 'Colombo Town Hall', description: 'The headquarters of the Colombo Municipal Council.', latitude: 6.9182, longitude: 79.8595 },
  { id: '16', title: 'National Art Gallery', description: 'An art gallery in Colombo.', latitude: 6.9178, longitude: 79.8605 },
  { id: '17', title: 'Sapumal Foundation', description: 'An art gallery in Colombo.', latitude: 6.9048, longitude: 79.8534 },
  { id: '18', title: 'Sri Lanka Planetarium', description: 'A planetarium in Colombo.', latitude: 6.9005, longitude: 79.8602 },
  { id: '19', title: 'Colombo Racecourse', description: 'A sporting venue in Colombo.', latitude: 6.9041, longitude: 79.8620 },
  { id: '20', title: 'Laksala', description: 'A state-owned gift and souvenir boutique.', latitude: 6.9104, longitude: 79.8624 },
  { id: '21', title: 'St. Michael\'s Church', description: 'A historic church in Colombo.', latitude: 6.9236, longitude: 79.8500 },
  { id: '22', title: 'Temple Trees', description: 'The official residence of the Prime Minister.', latitude: 6.9097, longitude: 79.8530 },
  { id: '23', title: 'Majestic City', description: 'A popular shopping mall.', latitude: 6.9061, longitude: 79.8536 },
  { id: '24', title: 'Marino Mall', description: 'A shopping mall in Colombo.', latitude: 6.9053, longitude: 79.8535 },
  { id: '25', title: 'Lakpahana', description: 'A handicrafts store in Colombo.', latitude: 6.9127, longitude: 79.8547 },
  { id: '26', title: 'Barefoot Gallery', description: 'An art gallery and shop.', latitude: 6.9021, longitude: 79.8524 },
  { id: '27', title: 'Saskia Fernando Gallery', description: 'An art gallery in Colombo.', latitude: 6.9068, longitude: 79.8591 },
  { id: '28', title: 'Independence Memorial Hall', description: 'A national monument in Colombo.', latitude: 6.9057, longitude: 79.8617 },
  { id: '29', title: 'Green Path', description: 'A popular walking path.', latitude: 6.9128, longitude: 79.8612 },
  { id: '30', title: 'Colombo City Centre', description: 'A mixed-use development.', latitude: 6.9173, longitude: 79.8615 },
  { id: '31', title: 'Excel World Entertainment Park', description: 'An amusement park.', latitude: 6.9210, longitude: 79.8686 },
  { id: '32', title: 'Slave Island Railway Station', description: 'A railway station in Colombo.', latitude: 6.9254, longitude: 79.8568 },
  { id: '33', title: 'Lake House', description: 'A newspaper and publishing house.', latitude: 6.9337, longitude: 79.8501 },
  { id: '34', title: 'Kollupitiya Railway Station', description: 'A railway station in Colombo.', latitude: 6.9162, longitude: 79.8491 },
  { id: '35', title: 'Bally\'s Casino', description: 'A casino in Colombo.', latitude: 6.9274, longitude: 79.8530 },
  { id: '36', title: 'Bellagio Colombo', description: 'A casino in Colombo.', latitude: 6.9166, longitude: 79.8538 },
  { id: '37', title: 'Galle Face Hotel', description: 'A historic hotel.', latitude: 6.9259, longitude: 79.8485 },
  { id: '38', title: 'Hilton Colombo', description: 'A luxury hotel.', latitude: 6.9341, longitude: 79.8440 },
  { id: '39', title: 'Cinnamon Grand Colombo', description: 'A luxury hotel.', latitude: 6.9219, longitude: 79.8482 },
  { id: '40', title: 'Mandarina Colombo', description: 'A modern hotel.', latitude: 6.9020, longitude: 79.8542 },
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
          latitudeDelta: 0.0160,
          longitudeDelta: 0.0090,
        }}
        zoomEnabled={true}
        scrollEnabled={true}
        zoomControlEnabled={true}
      >
        <Marker
            key={'Current Location'}
            coordinate={{ latitude: 6.902120284441931, longitude: 79.86115289536023 }}
            title={'Current Location'}
            pinColor={'blue'} // Change to desired color
            onPress={() => console.log('Current Location pressed!')}
          />


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
                className='h-6 w-6'
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