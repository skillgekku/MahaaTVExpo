import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import LinearGradient from 'react-native-linear-gradient';
// import FastImage from 'react-native-fast-image';
//import Icon from 'react-native-vector-icons/Ionicons';
import { RootStackParamList } from '../types';
import { CHANNELS } from '../constants';
import { useTheme } from '../hooks/useTheme';
import Header from '../components/Header';
const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2;

type NavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { theme, isDarkMode } = useTheme();
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  }, []);

  const handleChannelPress = (channel: any) => {
    if (channel.id === 'mahaa-usa') {
      navigation.navigate('Playlist', { channel });
    } else {
      navigation.navigate('Player', { channel });
    }
  };

  const getChannelImage = (channelId: string) => {
    const imageMap: Record<string, string> = {
      'mahaa-news': 'https://raw.githubusercontent.com/skillgekku/media-assets/refs/heads/main/news.png',
      'mahaa-bhakti': 'https://raw.githubusercontent.com/skillgekku/media-assets/refs/heads/main/baks.png',
      'mahaa-max': 'https://raw.githubusercontent.com/skillgekku/media-assets/refs/heads/main/max.png',
      'mahaa-usa': 'https://raw.githubusercontent.com/skillgekku/media-assets/refs/heads/main/MAHAA%20USA%20PNG.png'
    };
    return imageMap[channelId] || '';
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <Header />
      
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.content}>
          <Text style={[styles.title, { color: theme.text }]}>
            Select Your Channel
          </Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            Experience premium live streaming
          </Text>

          <View style={styles.channelGrid}>
            {CHANNELS.map((channel) => (
              <TouchableOpacity
                key={channel.id}
                style={styles.cardContainer}
                onPress={() => handleChannelPress(channel)}
                activeOpacity={0.8}>
                <View style={[styles.card, { backgroundColor: theme.card }]}>
               {/*    <FastImage
                    source={{ uri: getChannelImage(channel.id) }}
                    style={[
                      styles.channelImage,
                      channel.id === 'mahaa-usa' && styles.usaChannelImage
                    ]}
                    resizeMode={channel.id === 'mahaa-usa' ? 'contain' : 'cover'}
                  /> */}
                  
                  <LinearGradient
                    colors={channel.bgGradient}
                    style={styles.cardGradient}
                  />
                  
                  <View style={styles.cardContent}>
                    <Text style={styles.channelIcon}>{channel.icon}</Text>
                    <Text style={styles.channelName}>{channel.name}</Text>
                    <Text style={styles.channelDescription}>
                      {channel.description}
                    </Text>
                    
                    {channel.isYoutube && (
                      <View style={styles.youtubeBadge}>
                 {/*       <Icon name="logo-youtube" size={14} color="#FF0000" /> */}
                        <Text style={styles.youtubeBadgeText}>YouTube</Text>
                      </View>
                    )}
                  </View>
                  
                  <TouchableOpacity 
                    style={[styles.playButton, { backgroundColor: channel.bgGradient[0] }]}
                    onPress={() => handleChannelPress(channel)}>
                    {/* <Icon name="play" size={20} color="#FFF" /> */}
                    <Text style={styles.playButtonText}>
                      {channel.id === 'mahaa-usa' ? 'Browse' : 'Watch'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
  },
  channelGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cardContainer: {
    width: CARD_WIDTH,
    marginBottom: 16,
  },
  card: {
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  channelImage: {
    width: '100%',
    height: 120,
  },
  usaChannelImage: {
    backgroundColor: '#FFF',
  },
  cardGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 120,
    opacity: 0.7,
  },
  cardContent: {
    padding: 16,
    alignItems: 'center',
  },
  channelIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  channelName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 4,
  },
  channelDescription: {
    fontSize: 12,
    color: '#E0E0E0',
    marginBottom: 12,
  },
  youtubeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 12,
  },
  youtubeBadgeText: {
    fontSize: 10,
    color: '#FFF',
    marginLeft: 4,
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  playButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default HomeScreen;