import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { useTheme } from '../hooks/useTheme'; // Assuming useTheme provides theme styles

type PlaylistScreenRouteProp = RouteProp<RootStackParamList, 'Playlist'>;
type PlaylistScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Playlist'>;

type Props = {
  route: PlaylistScreenRouteProp;
  navigation: PlaylistScreenNavigationProp;
};

const PlaylistScreen: React.FC<Props> = ({ route }) => {
  const { channel } = route.params;
  const { theme } = useTheme(); // Or however your theme is accessed

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>Playlist Screen</Text>
      <Text style={[styles.text, { color: theme.textSecondary }]}>
        Content for channel: {channel.name}
      </Text>
      <Text style={[styles.text, { color: theme.textSecondary }]}>
        (This is a placeholder screen)
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default PlaylistScreen;
