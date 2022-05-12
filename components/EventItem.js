import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../constants/Colors';
import MapPreview from './MapPreview';

const EventItem = props => {
  return (
    <TouchableOpacity onPress={props.onSelect} style={styles.eventItem}>
      <View style={styles.info}>
        <Text style={styles.title}>{props.title}</Text>
        {props.address ? (
          <Text style={styles.address} numberOfLines={1}>
            {props.address}
          </Text>
        ) : null}
      </View>

      {props.imageSrc ? (
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: props.imageSrc }} />
        </View>
      ) : null}

      {/* <MapPreview
        style={{
          width: '100%',
          height: '100%'
        }}
        location={{ lat: '45.78', lng: '4.85' }}
      /> */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  eventItem: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    backgroundColor: 'white',
    height: 100,
    width: '100%'
  },
  info: {
    // marginHorizontal: 15,
    marginVertical: 20,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    color: Colors.second,
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  address: {
    color: '#666',
    fontSize: 16
  },
  imageContainer: {},
  image: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.first,
    borderColor: Colors.first,
    borderWidth: 1
  }
});

export default EventItem;
