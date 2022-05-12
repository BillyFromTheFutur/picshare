import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

const IconComponent = ({ iconName, onPress, size, color }) => {
  return (
    <Pressable onPress={onPress} android_ripple={{ radius: 6 }}>
      <Ionicons name={iconName} size={size} color={color} />
    </Pressable>
  );
};

export default IconComponent;
