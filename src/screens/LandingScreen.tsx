import { Dimensions, StyleSheet, Text, View } from 'react-native';
import React, { useState, useReducer, useEffect } from 'react';

import * as Location from 'expo-location';

import { Ionicons } from '@expo/vector-icons';

const screenWidth = Dimensions.get('screen').width;

const LandingScreen = () => {
  const [errorMsg, setErrorMsg] = useState('');
  const [address, setAddress] = useState('');

  const [displayAddress, setDisplayAddress] = useState(
    'Waiting for current location'
  );

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});

      const { coords } = location;

      if (coords) {
        const { latitude, longitude } = coords;
        let addressResponse = await Location.reverseGeocodeAsync({
          latitude,
          longitude,
        });

        for (let item of addressResponse) {
          setAddress(item);
          let currentAddress = `${item.name},${item.street},${item.postalCode},${item.country}`;

          setDisplayAddress(currentAddress);
          return;
        }
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.navigation}>
        <Text>Navigation</Text>
      </View>
      <View style={styles.body}>
        <Ionicons name="md-location-sharp" size={58} color="orange" />
        <View style={styles.addressContainer}>
          <Text style={styles.addressTitle}>Your Delivery Address</Text>
        </View>
        <Text style={styles.addressText}>{displayAddress}</Text>
      </View>
      <View style={styles.footer}></View>
    </View>
  );
};

export default LandingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: 'green',
  },
  navigation: {
    flex: 2,
    //backgroundColor: 'red',
  },
  body: {
    flex: 9,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: 'yellow',
  },
  footer: {
    flex: 1,
    //backgroundColor: 'cyan',
  },
  addressContainer: {
    width: screenWidth - 100,
    borderBottomColor: 'red',
    borderBottomWidth: 0.5,
    padding: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  addressTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#7D7D7D',
  },
  addressText: {
    fontSize: 18,
    fontWeight: '200',
    color: '#4F4F4F',
  },
});
