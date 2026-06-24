import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Store } from '../types';

interface Props {
  store: Store;
  onPress: (store: Store) => void;
  isFavorite?: boolean;
}

const GENRE_EMOJI: Record<string, string> = {
  海鮮: '🐟',
  スイーツ: '🍦',
  ハンバーグ: '🍔',
};

export default function StoreCard({ store, onPress, isFavorite }: Props) {
  const emoji = GENRE_EMOJI[store.genre] ?? '🍽️';

  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(store)} activeOpacity={0.85}>
      <View style={styles.emojiBox}>
        <Text style={styles.emoji}>{emoji}</Text>
      </View>
      <View style={styles.body}>
        <View style={styles.row}>
          <Text style={styles.name} numberOfLines={1}>{store.name}</Text>
          {isFavorite && <Text style={styles.heart}>♥</Text>}
        </View>
        <View style={styles.tagRow}>
          <View style={styles.tag}><Text style={styles.tagText}>{store.area}</Text></View>
          <View style={styles.tag}><Text style={styles.tagText}>{store.genre}</Text></View>
        </View>
        <Text style={styles.budget}>💴 {store.budget}</Text>
        <Text style={styles.reason} numberOfLines={2}>{store.reason}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  emojiBox: {
    width: 64,
    height: 64,
    borderRadius: 12,
    backgroundColor: '#FFF3E0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  emoji: { fontSize: 32 },
  body: { flex: 1 },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  name: { fontSize: 16, fontWeight: '700', color: '#1a1a1a', flex: 1 },
  heart: { fontSize: 18, color: '#FF6B35', marginLeft: 4 },
  tagRow: { flexDirection: 'row', marginBottom: 4, gap: 6 },
  tag: {
    backgroundColor: '#FFF3E0',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  tagText: { fontSize: 11, color: '#FF6B35', fontWeight: '600' },
  budget: { fontSize: 12, color: '#888', marginBottom: 4 },
  reason: { fontSize: 12, color: '#555', lineHeight: 16 },
});
