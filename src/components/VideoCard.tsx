import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface VideoItem {
  id: string;
  title: string;
  views: string;
  emoji: string;
}

const VIDEOS: VideoItem[] = [
  { id: '1', title: '静岡の海鮮ランチ TOP3', views: '12.4万回', emoji: '🐟' },
  { id: '2', title: 'さわやかの食べ方完全攻略', views: '8.7万回', emoji: '🍔' },
  { id: '3', title: '抹茶スイーツ食べ歩き', views: '6.2万回', emoji: '🍵' },
];

interface Props {
  onPress?: () => void;
}

export default function VideoCard({ onPress }: Props) {
  return (
    <View>
      {VIDEOS.map((v) => (
        <TouchableOpacity key={v.id} style={styles.card} onPress={onPress} activeOpacity={0.85}>
          <View style={styles.thumbnail}>
            <Text style={styles.thumbEmoji}>{v.emoji}</Text>
            <View style={styles.playBadge}>
              <Text style={styles.playText}>▶</Text>
            </View>
          </View>
          <View style={styles.info}>
            <Text style={styles.title} numberOfLines={2}>{v.title}</Text>
            <Text style={styles.views}>👁 {v.views}</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>TikTok</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  thumbnail: {
    width: 90,
    height: 70,
    backgroundColor: '#1a1a1a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbEmoji: { fontSize: 28 },
  playBadge: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 8,
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  playText: { fontSize: 10, color: '#fff' },
  info: { flex: 1, padding: 10, justifyContent: 'center' },
  title: { fontSize: 13, fontWeight: '600', color: '#1a1a1a', marginBottom: 4 },
  views: { fontSize: 11, color: '#888', marginBottom: 6 },
  badge: {
    backgroundColor: '#010101',
    borderRadius: 4,
    alignSelf: 'flex-start',
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  badgeText: { color: '#fff', fontSize: 10, fontWeight: '700' },
});
