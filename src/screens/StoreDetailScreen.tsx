import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Linking,
  Alert,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import { useFavorites } from '../hooks/useFavorites';

type Route = RouteProp<RootStackParamList, 'StoreDetail'>;

const GENRE_EMOJI: Record<string, string> = {
  海鮮: '🐟',
  スイーツ: '🍦',
  ハンバーグ: '🍔',
};

export default function StoreDetailScreen() {
  const navigation = useNavigation();
  const { params } = useRoute<Route>();
  const { store } = params;
  const { toggle, checkFavorite, reload } = useFavorites();
  const [fav, setFav] = useState(false);

  useEffect(() => {
    reload().then(() => setFav(checkFavorite(store.id)));
  }, []);

  const handleToggleFav = async () => {
    await toggle(store);
    setFav((prev) => !prev);
  };

  const openUrl = (url?: string) => {
    if (!url) return;
    Linking.canOpenURL(url).then((ok) => {
      if (ok) Linking.openURL(url);
      else Alert.alert('URLを開けません');
    });
  };

  const emoji = GENRE_EMOJI[store.genre] ?? '🍽️';

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Hero */}
        <View style={styles.hero}>
          <Text style={styles.heroEmoji}>{emoji}</Text>
          <TouchableOpacity style={styles.favBtn} onPress={handleToggleFav}>
            <Text style={styles.favIcon}>{fav ? '♥' : '♡'}</Text>
          </TouchableOpacity>
        </View>

        {/* Info Card */}
        <View style={styles.card}>
          <Text style={styles.name}>{store.name}</Text>

          <View style={styles.tagRow}>
            <View style={styles.tag}><Text style={styles.tagText}>{store.area}</Text></View>
            <View style={styles.tag}><Text style={styles.tagText}>{store.genre}</Text></View>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>💴 予算</Text>
            <Text style={styles.infoValue}>{store.budget}</Text>
          </View>

          <View style={styles.divider} />

          <Text style={styles.reasonTitle}>おすすめ理由</Text>
          <Text style={styles.reason}>{store.reason}</Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actions}>
          {store.googleMapsUrl && (
            <TouchableOpacity
              style={[styles.actionBtn, styles.mapsBtn]}
              onPress={() => openUrl(store.googleMapsUrl)}
            >
              <Text style={styles.actionIcon}>📍</Text>
              <Text style={styles.actionText}>Google Maps</Text>
            </TouchableOpacity>
          )}
          {store.tiktokUrl && (
            <TouchableOpacity
              style={[styles.actionBtn, styles.tiktokBtn]}
              onPress={() => openUrl(store.tiktokUrl)}
            >
              <Text style={styles.actionIcon}>🎵</Text>
              <Text style={[styles.actionText, styles.tiktokText]}>TikTokで見る</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Favorite Toggle Button */}
        <TouchableOpacity
          style={[styles.bigFavBtn, fav && styles.bigFavBtnActive]}
          onPress={handleToggleFav}
        >
          <Text style={styles.bigFavText}>
            {fav ? '♥ お気に入りから削除' : '♡ お気に入りに追加'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FAFAFA' },
  scroll: { paddingBottom: 40 },
  hero: {
    height: 200,
    backgroundColor: '#FFF3E0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroEmoji: { fontSize: 80 },
  favBtn: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  favIcon: { fontSize: 22, color: '#FF6B35' },
  card: {
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  name: { fontSize: 22, fontWeight: '800', color: '#1a1a1a', marginBottom: 12 },
  tagRow: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  tag: {
    backgroundColor: '#FFF3E0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  tagText: { fontSize: 13, color: '#FF6B35', fontWeight: '600' },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoLabel: { fontSize: 14, color: '#888' },
  infoValue: { fontSize: 14, fontWeight: '600', color: '#1a1a1a' },
  divider: { height: 1, backgroundColor: '#f0f0f0', marginVertical: 12 },
  reasonTitle: { fontSize: 15, fontWeight: '700', color: '#1a1a1a', marginBottom: 8 },
  reason: { fontSize: 14, color: '#555', lineHeight: 22 },
  actions: { flexDirection: 'row', paddingHorizontal: 16, gap: 12, marginBottom: 12 },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    padding: 14,
    gap: 6,
  },
  mapsBtn: { backgroundColor: '#E8F5E9' },
  tiktokBtn: { backgroundColor: '#1a1a1a' },
  actionIcon: { fontSize: 18 },
  actionText: { fontSize: 14, fontWeight: '600', color: '#1a1a1a' },
  tiktokText: { color: '#fff' },
  bigFavBtn: {
    marginHorizontal: 16,
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FF6B35',
  },
  bigFavBtnActive: { backgroundColor: '#FF6B35' },
  bigFavText: { fontSize: 16, fontWeight: '700', color: '#FF6B35' },
});
