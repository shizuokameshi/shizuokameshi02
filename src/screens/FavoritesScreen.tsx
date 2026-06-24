import React, { useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { useFavorites } from '../hooks/useFavorites';
import StoreCard from '../components/StoreCard';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export default function FavoritesScreen() {
  const navigation = useNavigation<Nav>();
  const { favorites, loading, reload } = useFavorites();

  useFocusEffect(
    useCallback(() => {
      reload();
    }, [reload])
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.center}>
          <Text style={styles.emptyText}>読み込み中…</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.title}>お気に入り</Text>
        <Text style={styles.count}>{favorites.length}件</Text>
      </View>
      {favorites.length === 0 ? (
        <View style={styles.center}>
          <Text style={styles.emptyEmoji}>🍽️</Text>
          <Text style={styles.emptyText}>お気に入りがまだありません</Text>
          <Text style={styles.emptyHint}>店舗詳細から♡をタップして追加しよう</Text>
        </View>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(s) => s.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <StoreCard
              store={item}
              isFavorite
              onPress={(s) => navigation.navigate('StoreDetail', { store: s })}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FAFAFA' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    backgroundColor: '#fff',
  },
  title: { fontSize: 20, fontWeight: '800', color: '#1a1a1a' },
  count: { fontSize: 14, color: '#FF6B35', fontWeight: '600' },
  list: { padding: 16 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32 },
  emptyEmoji: { fontSize: 60, marginBottom: 16 },
  emptyText: { fontSize: 16, fontWeight: '600', color: '#888', marginBottom: 8 },
  emptyHint: { fontSize: 13, color: '#bbb', textAlign: 'center' },
});
