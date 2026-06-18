import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';

const MENU_ITEMS = [
  { icon: '🔔', label: '通知設定' },
  { icon: '🗺️', label: 'エリア設定' },
  { icon: '❓', label: 'ヘルプ' },
  { icon: '📝', label: 'フィードバック' },
];

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>🍽️</Text>
        </View>
        <Text style={styles.name}>ゲストユーザー</Text>
        <Text style={styles.sub}>静岡グルメを探してみよう</Text>
      </View>

      <View style={styles.section}>
        {MENU_ITEMS.map((item) => (
          <TouchableOpacity key={item.label} style={styles.row}>
            <Text style={styles.rowIcon}>{item.icon}</Text>
            <Text style={styles.rowLabel}>{item.label}</Text>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.version}>ごちそうがかりAI v1.0.0</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FAFAFA' },
  header: {
    alignItems: 'center',
    paddingVertical: 32,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FF6B35',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  avatarText: { fontSize: 36 },
  name: { fontSize: 20, fontWeight: '700', color: '#1a1a1a' },
  sub: { fontSize: 13, color: '#888', marginTop: 4 },
  section: {
    backgroundColor: '#fff',
    marginTop: 16,
    marginHorizontal: 16,
    borderRadius: 14,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  rowIcon: { fontSize: 20, marginRight: 12 },
  rowLabel: { flex: 1, fontSize: 15, color: '#1a1a1a' },
  arrow: { fontSize: 20, color: '#ccc' },
  version: { textAlign: 'center', color: '#ccc', fontSize: 12, marginTop: 32 },
});
