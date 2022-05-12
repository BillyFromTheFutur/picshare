import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
  Pressable
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';

import EventItem from '../components/EventItem';
import CodeInput from '../components/CodeInput';
import Colors from '../constants/Colors';
import IconComponent from '../components/IconComponent';
import * as eventsActions from '../store/actions/events';

const EventsOverviewScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const events = useSelector(state => state.events.loadedEvents);
  const token = useSelector(state => state.auth.token);
  const dispatch = useDispatch();

  const loadEvents = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(eventsActions.fetchEvents());
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setError, setIsRefreshing]);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', loadEvents);

    return () => {
      unsubscribe();
    };
  }, [loadEvents]);

  useEffect(() => {
    setIsLoading(true);
    loadEvents().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadEvents]);

  if (error) {
    return (
      <View style={styles.screen}>
        <Text>An error occurred!</Text>
        <Pressable
          style={styles.button}
          onPress={loadEvents}
          android_ripple={{ radius: 10 }}
        >
          <Text>Try again</Text>
        </Pressable>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.screen}>
        <ActivityIndicator size='large' color={Colors.primary} />
      </View>
    );
  }

  if (!isLoading && events.length === 0) {
    return (
      <View style={styles.screen}>
        <Text> Aucun évènement trouvé.</Text>
      </View>
    );
  }

  const publicEvents = events.filter(event => event.notPublic == 0); // set to 0 before prod

  if (publicEvents.length === 0) {
    return (
      <View style={styles.screen}>
        <Text style={styles.noEventText}>Aucun évènement public en cours,</Text>
        <Text style={styles.noEventText}>Reviens plus tard!</Text>
      </View>
    );
  }
  return (
    <LinearGradient
      colors={[Colors.first, Colors.second]}
      end={{ x: 0, y: 0.5 }}
      style={styles.screen}
    >
      <FlatList
        onRefresh={loadEvents}
        refreshing={isRefreshing}
        keyboardShouldPersistTaps='always'
        style={styles.list}
        data={publicEvents}
        keyExtractor={item => item.id}
        keyboardShouldPersistTaps='always'
        renderItem={itemData => (
          <EventItem
            onSelect={() => {
              console.log(itemData.item.name + ' pressed.');
              props.navigation.navigate('PictureMain', {
                eventId: itemData.item.id,
                eventName: itemData.item.name,
                token: token
              });
            }}
            title={itemData.item.name}
          />
        )}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  list: {
    flex: 1
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: Colors.first,
    marginBottom: 10
  },
  noEventText: {
    fontSize: 18
  }
});

export const screenOptions = navData => {
  const privateEvents = useSelector(state => state.events.loadedEvents).filter(
    event => event.notPublic == 1
  ); //set to 1 before prod
  const token = useSelector(state => state.auth.token);
  console.log('PRIVATE EVENTS : ', privateEvents);
  return {
    title: 'Événements publics :)',
    headerRight: () => (
      <IconComponent
        iconName='arrow-forward'
        color={Colors.second}
        size={25}
        onPress={() => {
          console.log('header right button pressed');
          navData.navigation.navigate('CodeInput', { privateEvents, token });
        }}
      />
    )
  };
};

export default EventsOverviewScreen;
