import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { DUMMY_STORES } from '../data/stores';
import StoreCard from '../components/StoreCard';
import VideoCard from '../components/VideoCard';
import { useFavorites } from '../hooks/useFavorites';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export default function HomeScreen() {
  const navigation = useNavigation<Nav>();
  const [searchText, setSearchText] = useState('');
  const { checkFavorite } = useFavorites();

  const handleSearch = () => {
    if (searchText.trim()) {
      navigation.navigate('Chat');
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.appName}>ごちそうがかりAI</Text>
          <Text style={styles.subtitle}>静岡グルメをAIが案内します🍽️</Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchRow}>
          <TextInput
            style={styles.input}
            placeholder="例：静岡駅で昼飲みしたい"
            placeholderTextColor="#bbb"
            value={searchText}
            onChangeText={setSearchText}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
          />
          <TouchableOpacity style={styles.searchBtn} onPress={handleSearch}>
            <Text style={styles.searchBtnText}>🔍</Text>
          </TouchableOpacity>
        </View>

        {/* AI Chat CTA */}
        <TouchableOpacity style={styles.ctaButton} onPress={() => navigation.navigate('Chat')}>
          <Text style={styles.ctaText}>💬 AIに相談する</Text>
          <Text style={styles.ctaSub}>「清水で子連れランチ」など自由に入力</Text>
        </TouchableOpacity>

        {/* Popular Stores */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>人気のお店</Text>
          {DUMMY_STORES.map((store) => (
            <StoreCard
              key={store.id}
              store={store}
              isFavorite={checkFavorite(store.id)}
              onPress={(s) => navigation.navigate('StoreDetail', { store: s })}
            />
          ))}
        </View>

        {/* Recommended Videos */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>おすすめ動画</Text>
          <VideoCard />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FAFAFA' },
  scroll: { paddingBottom: 32 },
  header: {
    backgroundColor: '#FF6B35',
    paddingTop: 24,
    paddingBottom: 28,
    paddingHorizontal: 20,
  },
  appName: {
    fontSize: 26,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: -0.5,
  },
  subtitle: { fontSize: 13, color: 'rgba(255,255,255,0.85)', marginTop: 4 },
  searchRow: {
    flexDirection: 'row',
    margin: 16,
    marginTop: -16,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  input: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 14,
    color: '#1a1a1a',
  },
  searchBtn: {
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  searchBtnText: { fontSize: 20 },
  ctaButton: {
    backgroundColor: '#1a1a1a',
    marginHorizontal: 16,
    borderRadius: 14,
    padding: 16,
    marginBottom: 24,
  },
  ctaText: { color: '#fff', fontSize: 17, fontWeight: '700' },
  ctaSub: { color: 'rgba(255,255,255,0.65)', fontSize: 12, marginTop: 4 },
  section: { paddingHorizontal: 16, marginBottom: 8 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 12,
  },
});
