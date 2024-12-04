import React, { useState, useEffect, useRef, useContext } from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import PagerView from 'react-native-pager-view';
import Dots from 'react-native-dots-pagination';
import { Iconify } from 'react-native-iconify';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { BASE_URL } from '../../utils/config';

const Home = ({ navigation }) => {
  const [name, onChangeName] = useState('');
  const [address, onChangeAddress] = useState('');
  const [pageIndex, setPageIndex] = useState(0);
  const pagerViewRef = useRef(null);

  const { decodedToken, userToken } = useContext(AuthContext);
  const userId = decodedToken.userId;

  const newTruckDispatches = [
    { date: 'Saturday, 20th July', truckNo: 'PH-2547', address: 'Reid Avenue - Kirulapone' },
    { date: 'Friday, 14th July', truckNo: 'PY-1153', address: 'Fort Railway Station' },
    { date: 'Falafel', truckNo: '$7.50', address: '3C' },
    { date: 'Marinated Olives', truckNo: '$5.00', address: '4D' }
  ];

  const pastTruckDispatches = [
    { date: 'Thursday, 18th July', truckNo: 'PH-2547', address: 'Reid Avenue - Kirulapone' },
    { date: 'Friday, 14th July', truckNo: 'PH-3455', address: 'Fort Railway Station' },
    { date: 'Falafel', truckNo: '$7.50', address: '3C' },
    { date: 'Marinated Olives', truckNo: '$5.00', address: '4D' }
  ];

  const imageSources = [
    require('../../assets/png/Ad_2.png'),
    require('../../assets/png/Ad_1.png'),
    require('../../assets/png/Ad_2.png'),
  ];

  const fetchUser = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/v1/household_user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      const userData = response.data;

      onChangeName(userData.firstName || 'N/A');
      onChangeAddress(userData.address || 'N/A');

    } catch (error) {
      console.error('Error fetching user data:', error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (pagerViewRef.current) {
        setPageIndex((prevIndex) => {
          const nextIndex = (prevIndex + 1) % imageSources.length;
          pagerViewRef.current.setPage(nextIndex);
          return nextIndex;
        });
      }
    }, 3000); // Change page every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const renderNewDispatchesItem = ({ item }) => (
    <NewDispatchesItem date={item.date} truckNo={item.truckNo} address={item.address} />
  );
  const renderPastDispatchesItem = ({ item }) => (
    <PastDispatchesItem date={item.date} truckNo={item.truckNo} address={item.address} />
  );

  const NewDispatchesItem = ({ date, truckNo, address }) => (
    <View className='flex-row flex-1 bg-white py-2 px-4 my-2 rounded-lg'>
      <View className='mr-2 mt-1'>
        <Iconify icon={'mingcute:truck-line'} size={24} color={'#6C6C71'} />
      </View>
      <View className='ml-2'>
        <Text className='text-gray-500 text-sm font-normal leading-none'>{date}</Text>
        <Text className='text-gray-500 text-base font-normal leading-none mt-[-3]'>
          Truck No: <Text className='font-bold'>{truckNo}</Text>
        </Text>
        <Text className='text-gray-500 text-sm font-normal leading-none'>{address}</Text>
      </View>
      <View className='flex-1 justify-center items-end'>
        <Iconify icon={'maki:arrow'} size={22} color={'#46AA62'} />
      </View>
    </View>
  );

  const PastDispatchesItem = ({ date, truckNo, address }) => (
    <View className='flex-row flex-1 bg-white py-2 px-4 my-2 rounded-lg'>
      <View className='mr-2 ml-1 mt-1.5'>
        <Iconify icon={'subway:tick'} size={20} color={'#7ED957'} />
      </View>
      <View className='ml-2'>
        <Text className='text-gray-500 text-sm font-normal leading-none'>{date}</Text>
        <Text className='text-gray-500 text-base font-normal leading-none mt-[-3]'>
          Truck No: <Text className='font-bold'>{truckNo}</Text>
        </Text>
        <Text className='text-gray-500 text-sm font-normal leading-none'>{address}</Text>
      </View>
    </View>
  );

  return (
    <View className='flex-1 px-5 bg-white pt-2'>
      <View className='flex-row justify-between items-center px-1'>
        <Text className='text-2xl text-black font-bold'>
          Good Morning, {name}
        </Text>
        <View className='flex-row justify-between items-center space-x-2'>
          <Ionicons name="globe-outline" size={22} color="gray" />
          <Ionicons name="moon-outline" size={22} color="gray" />
        </View>
      </View>
      <View className='flex-row items-end mt-2'>
        <Ionicons name="location-outline" size={32} color="#22C55E" />
        <Text className='text-lg text-gray-500 font-medium ml-1'>
          {address}
        </Text>
      </View>
    
      <View className='bg-[#F3F2F2] px-5 py-3.5 mt-8 rounded-xl' > 
          <Text className='text-gray-500 text-lg font-medium' >
              Dispatches
          </Text>

          <Text className='text-gray-500 text-base font-medium mt-3' >
              New(01)
          </Text>
        
          <FlatList
            className='h-20 mt-2'
            data={newTruckDispatches}
            keyExtractor={(item) => item.truckNo}
            renderItem={renderNewDispatchesItem}
            />

          <Text className='text-gray-500 text-base font-medium mt-3' >
            Past (07 days)
          </Text>

          <FlatList
            className='h-44 mt-2 mb-1'
            data={pastTruckDispatches}
            keyExtractor={(item) => item.truckNo}
            renderItem={renderPastDispatchesItem}
            />
      </View>

      <PagerView 
          className='h-36 w-full mt-3' 
          initialPage={0}
          ref={pagerViewRef}
          onPageSelected={(e) => setPageIndex(e.nativeEvent.position)}
          >
        {imageSources.map((source, index) => (
          <View className='items-center justify-center mx-4' key={index}>
            <Image
              source={source}
              resizeMode="stretch"
              className="w-full h-full rounded-2xl"
              accessible={true}
              accessibilityLabel={'Advertisement'}
            />
          </View>
        ))}
      </PagerView>

      <View className='mt-[-6] ' >
        <Dots
          length={imageSources.length}
          active={pageIndex}
          activeDotWidth={8.5}
          activeDotHeight={8.5}
          activeDotColor="#7ED957"
          passiveDotColor="#ccc"
          passiveDotWidth={7}
          passiveDotHeight={7}
        />
      </View>

    </View>
  );
};

export default Home;
