import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import LinearGradient from 'react-native-linear-gradient';
//import FastImage from 'react-native-fast-image';
import { RootStackParamList } from '../types';
import { MAHAA_USA_PLAYLIST } from '../constants';
import { useTheme } from '../hooks/useTheme';
import { YouTubeVideo } from '../types';

const { width } = Dimensions.get('window');

type PlaylistScreenRouteProp = RouteProp<RootStackParamList, 'Playlist'>;
type NavigationProp = StackNavigationProp<RootStackParamList, 'Playlist'>;

const PlaylistScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<PlaylistScreenRouteProp>();
  const { channel } = route.params;
  const { theme, isDarkMode } = useTheme();
  
  const [selectedVideo, setSelectedVideo] = useState<YouTubeVideo | null>(null);
  const [isShuffled, setIsShuffled] = useState(false);
  const [playlist, setPlaylist] = useState(MAHAA_USA_PLAYLIST);

  const handleBack = () => {
    navigation.goBack();
  };

  const playVideo = (video: YouTubeVideo) => {
    const modifiedChannel = {
      ...channel,
      youtubeVideoId: video.youtubeId,
    };
    navigation.navigate('Player', { channel: modifiedChannel });
  };

  const toggleShuffle = () => {
    if (!isShuffled) {
      const shuffled = [...MAHAA_USA_PLAYLIST].sort(() => Math.random() - 0.5);
      setPlaylist(shuffled);
    } else {
      setPlaylist(MAHAA_USA_PLAYLIST);
    }
    setIsShuffled(!isShuffled);
  };

  const getCategoryColor = (category: string): string => {
    const colors: Record<string, string> = {
      'Conference': '#2563eb',
      'Youth Event': '#16a34a',
      'Political': '#dc2626',
      'Awards': '#eab308',
      'Entertainment': '#9333ea',
      'Interview': '#ea580c',
      'Pageant': '#ec4899',
    };
    return colors[category] || '#6b7280';
  };

  const renderVideoItem = ({ item, index }: { item: YouTubeVideo; index: number }) => (
    <TouchableOpacity
      style={[styles.videoCard, { backgroundColor: theme.card }]}
      onPress={() => playVideo(item)}
      activeOpacity={0.8}>
      <View style={styles.thumbnailContainer}>
       {/*  <FastImage
          source={{
            uri: `https://img.youtube.com/vi/${item.youtubeId}/mqdefault.jpg`
          }}
          style={styles.thumbnail}
          resizeMode={FastImage.resizeMode.cover}
        /> */}
        <View style={styles.durationBadge}>
          <Text style={styles.durationText}>{item.duration}</Text>
        </View>
        <View 
          style={[styles.categoryBadge, { backgroundColor: getCategoryColor(item.category) }]}>
          <Text style={styles.categoryText}>{item.category}</Text>
        </View>
      </View>
      
      <View style={styles.videoInfo}>
        <Text style={[styles.videoTitle, { color: theme.text }]} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={[styles.videoDescription, { color: theme.textSecondary }]} numberOfLines={2}>
          {item.description}
        </Text>
        <View style={styles.videoMeta}>
          {/* <Icon name="time-outline" size={14} color={theme.textSecondary} /> */}
          <Text style={[styles.scheduledTime, { color: theme.textSecondary }]}>
            {item.scheduledTime}
          </Text>
          <View style={styles.youtubeBadge}>
            {/* <Icon name="logo-youtube" size={14} color="#FF0000" /> */}
            <Text style={styles.youtubeText}>YouTube</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <LinearGradient
        colors={['#dc2626', '#b91c1c']}
        style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          {/* <Icon name="arrow-back" size={24} color="#FFF" /> */}
        </TouchableOpacity>
        
        <View style={styles.headerContent}>
          <View style={styles.headerInfo}>
            <Text style={styles.headerTitle}>Mahaa USA</Text>
            <Text style={styles.headerSubtitle}>
              US Telugu Content • {playlist.length} Videos
            </Text>
          </View>
          
          <TouchableOpacity 
            onPress={toggleShuffle}
            style={[styles.shuffleButton, isShuffled && styles.shuffleButtonActive]}>
            {/* <Icon name="shuffle" size={20} color="#FFF" /> */}
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Video List */}
      <FlatList
        data={playlist}
        renderItem={renderVideoItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 16,
    paddingBottom: 20,
    paddingHorizontal: 16,
  },
  backButton: {
    padding: 8,
    marginBottom: 8,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerInfo: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 4,
  },
  shuffleButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shuffleButtonActive: {
    backgroundColor: 'rgba(255,255,255,0.4)',
  },
  listContent: {
    padding: 16,
  },
  videoCard: {
    flexDirection: 'row',
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  thumbnailContainer: {
    width: 120,
    height: 90,
    position: 'relative',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  durationBadge: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    backgroundColor: 'rgba(0,0,0,0.8)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  durationText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  categoryBadge: {
    position: 'absolute',
    top: 4,
    left: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  categoryText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  videoInfo: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  videoTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  videoDescription: {
    fontSize: 12,
    marginBottom: 8,
  },
  videoMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scheduledTime: {
    fontSize: 12,
    marginLeft: 4,
    marginRight: 12,
  },
  youtubeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  youtubeText: {
    fontSize: 10,
    color: '#FF0000',
    marginLeft: 4,
  },
});

export default PlaylistScreen;