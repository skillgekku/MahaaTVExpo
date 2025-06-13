import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
// import Icon from 'react-native-vector-icons/Ionicons';
import { CHANNELS } from '../constants';
import { useTheme } from '../hooks/useTheme';
import Header from '../components/Header';
import { Program, ScheduleDay } from '../types';

const { width } = Dimensions.get('window');

const ScheduleScreen = () => {
  const { theme, isDarkMode } = useTheme();
  const [selectedChannel, setSelectedChannel] = useState(0);
  const [selectedDay, setSelectedDay] = useState(0);

  const getCurrentTime = () => {
    const now = new Date();
    return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
  };

  const currentTime = getCurrentTime();

  // Mock schedule data
  const scheduleData: ScheduleDay[][] = [
    // Mahaa News
    [
      {
        day: 'Today',
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        programs: [
          { time: '06:00', title: 'Morning Headlines', genre: 'Breaking News', duration: '60 min', rating: 4.8, isLive: false },
          { time: '07:00', title: 'News Breakfast', genre: 'News', duration: '90 min', rating: 4.5, isLive: false },
          { time: '08:30', title: 'Political Roundtable', genre: 'Politics', duration: '60 min', rating: 4.3, isLive: false },
          { time: '10:00', title: 'Live Press Conference', genre: 'Live Event', duration: '60 min', rating: 4.6, isLive: true },
          { time: '12:00', title: 'Noon News', genre: 'News', duration: '60 min', rating: 4.7, isLive: false },
          { time: '18:00', title: 'Evening Prime Time', genre: 'News', duration: '120 min', rating: 4.9, isLive: false },
          { time: '22:00', title: 'Night Bulletin', genre: 'News', duration: '60 min', rating: 4.5, isLive: false },
        ]
      },
      {
        day: 'Tomorrow',
        date: new Date(Date.now() + 86400000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        programs: [
          { time: '06:00', title: 'Weekend Special', genre: 'Special', duration: '120 min', rating: 4.6, isLive: false },
          { time: '08:00', title: 'Week Review', genre: 'Analysis', duration: '90 min', rating: 4.4, isLive: false },
        ]
      }
    ],
    // Similar data for other channels...
  ];

  const getGenreColor = (genre: string): string => {
    const colors: Record<string, string> = {
      'Breaking News': '#dc2626',
      'News': '#ef4444',
      'Politics': '#2563eb',
      'Live Event': '#9333ea',
      'Prayer': '#ea580c',
      'Devotional Music': '#f97316',
      'Movie': '#dc2626',
      'Comedy': '#84cc16',
      'Music': '#a855f7',
    };
    return colors[genre] || '#6b7280';
  };

  const isCurrentProgram = (program: Program): boolean => {
    if (selectedDay !== 0) return false;
    return program.time <= currentTime && program.isLive;
  };

  const renderProgram = (program: Program, index: number) => {
    const isCurrent = isCurrentProgram(program);
    
    return (
      <View
        key={index}
        style={[
          styles.programCard,
          { 
            backgroundColor: theme.card,
            borderColor: isCurrent ? '#dc2626' : theme.border,
          },
          isCurrent && styles.currentProgramCard
        ]}>
        <View style={styles.programTime}>
          <Text style={[styles.timeText, { color: theme.text }]}>
            {program.time}
          </Text>
          <Text style={[styles.durationText, { color: theme.textSecondary }]}>
            {program.duration}
          </Text>
        </View>
        
        <View style={styles.programInfo}>
          <View style={styles.programHeader}>
            <Text style={[styles.programTitle, { color: theme.text }]} numberOfLines={1}>
              {program.title}
            </Text>
            {program.isLive && (
              <View style={styles.liveBadge}>
                <View style={styles.liveDot} />
                <Text style={styles.liveText}>LIVE</Text>
              </View>
            )}
          </View>
          
          <View style={styles.programMeta}>
            <View 
              style={[styles.genreBadge, { backgroundColor: getGenreColor(program.genre) }]}>
              <Text style={styles.genreText}>{program.genre}</Text>
            </View>
            <View style={styles.rating}>
              {/* <Icon name="star" size={12} color="#FFD700" /> */}
              <Text style={[styles.ratingText, { color: theme.textSecondary }]}>
                {program.rating}
              </Text>
            </View>
          </View>
        </View>
        
        {isCurrent && (
          <TouchableOpacity style={styles.watchButton}>
            {/* <Icon name="play-circle" size={32} color="#dc2626" /> */}
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <Header />
      
      {/* Channel Tabs */}
      <ScrollView 
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.channelTabs}>
        {CHANNELS.map((channel, index) => (
          <TouchableOpacity
            key={channel.id}
            onPress={() => setSelectedChannel(index)}
            style={[
              styles.channelTab,
              selectedChannel === index && styles.channelTabActive
            ]}>
            <LinearGradient
              colors={selectedChannel === index ? channel.bgGradient : ['transparent', 'transparent']}
              style={styles.channelTabGradient}>
              <Text style={styles.channelIcon}>{channel.icon}</Text>
              <Text style={[
                styles.channelTabText,
                { color: selectedChannel === index ? '#FFF' : theme.textSecondary }
              ]}>
                {channel.name}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Day Selector */}
      <View style={styles.daySelector}>
        {scheduleData[selectedChannel].map((day, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setSelectedDay(index)}
            style={[
              styles.dayButton,
              selectedDay === index && styles.dayButtonActive,
              { borderColor: selectedDay === index ? CHANNELS[selectedChannel].bgGradient[0] : theme.border }
            ]}>
            <Text style={[
              styles.dayText,
              { color: selectedDay === index ? CHANNELS[selectedChannel].bgGradient[0] : theme.text }
            ]}>
              {day.day}
            </Text>
            <Text style={[
              styles.dateText,
              { color: theme.textSecondary }
            ]}>
              {day.date}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Schedule List */}
      <ScrollView style={styles.scheduleList}>
        <View style={styles.scheduleContent}>
          {scheduleData[selectedChannel][selectedDay].programs.map((program: Program, index: number) => 
            renderProgram(program, index)
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  channelTabs: {
    maxHeight: 80,
    paddingVertical: 8,
  },
  channelTab: {
    marginHorizontal: 8,
  },
  channelTabActive: {
    transform: [{ scale: 1.05 }],
  },
  channelTabGradient: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  channelIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  channelTabText: {
    fontSize: 12,
    fontWeight: '600',
  },
  daySelector: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  dayButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
  },
  dayButtonActive: {
    borderWidth: 2,
  },
  dayText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  dateText: {
    fontSize: 12,
    marginTop: 2,
  },
  scheduleList: {
    flex: 1,
  },
  scheduleContent: {
    padding: 16,
  },
  programCard: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
  },
  currentProgramCard: {
    borderWidth: 2,
  },
  programTime: {
    marginRight: 16,
    alignItems: 'center',
  },
  timeText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  durationText: {
    fontSize: 10,
    marginTop: 2,
  },
  programInfo: {
    flex: 1,
  },
  programHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  programTitle: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#dc2626',
    marginRight: 4,
  },
  liveText: {
    fontSize: 10,
    color: '#dc2626',
    fontWeight: 'bold',
  },
  programMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  genreBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 12,
  },
  genreText: {
    fontSize: 10,
    color: '#FFF',
    fontWeight: '600',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    marginLeft: 4,
  },
  watchButton: {
    marginLeft: 12,
    justifyContent: 'center',
  },
});

export default ScheduleScreen;