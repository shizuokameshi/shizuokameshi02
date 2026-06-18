import React, { useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, ChatMessage, Store } from '../types';
import { sendMessage } from '../services/aiService';
import ChatBubble from '../components/ChatBubble';
import StoreCard from '../components/StoreCard';

type Nav = NativeStackNavigationProp<RootStackParamList>;

const SUGGESTIONS = [
  '静岡駅で昼飲みしたい',
  '清水で子連れランチ',
  'デート向きのカフェ',
  '焼津で海鮮が食べたい',
];

export default function ChatScreen() {
  const navigation = useNavigation<Nav>();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content:
        'ごちそうがかりです！静岡グルメの相談、お任せください🍽️\nどんなお店をお探しですか？',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  const handleSend = useCallback(
    async (text?: string) => {
      const query = (text ?? input).trim();
      if (!query || loading) return;

      const userMsg: ChatMessage = {
        id: Date.now().toString(),
        role: 'user',
        content: query,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMsg]);
      setInput('');
      setLoading(true);

      try {
        const { reply, stores } = await sendMessage(query, messages);
        const aiMsg: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: reply,
          stores,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, aiMsg]);
      } finally {
        setLoading(false);
      }
    },
    [input, loading, messages]
  );

  const renderItem = ({ item }: { item: ChatMessage }) => (
    <View>
      <ChatBubble message={item} />
      {item.stores && item.stores.length > 0 && (
        <View style={styles.storeList}>
          {item.stores.map((s: Store) => (
            <StoreCard
              key={s.id}
              store={s}
              onPress={(store) => navigation.navigate('StoreDetail', { store })}
            />
          ))}
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.kav}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={90}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(m) => m.id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
          ListHeaderComponent={
            messages.length === 1 ? (
              <View style={styles.suggestions}>
                <Text style={styles.suggestLabel}>こんな相談ができます</Text>
                {SUGGESTIONS.map((s) => (
                  <TouchableOpacity
                    key={s}
                    style={styles.chip}
                    onPress={() => handleSend(s)}
                  >
                    <Text style={styles.chipText}>{s}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            ) : null
          }
        />

        {loading && (
          <View style={styles.typing}>
            <ActivityIndicator size="small" color="#FF6B35" />
            <Text style={styles.typingText}>考えています…</Text>
          </View>
        )}

        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            value={input}
            onChangeText={setInput}
            placeholder="メッセージを入力"
            placeholderTextColor="#bbb"
            returnKeyType="send"
            onSubmitEditing={() => handleSend()}
            multiline
          />
          <TouchableOpacity
            style={[styles.sendBtn, (!input.trim() || loading) && styles.sendBtnDisabled]}
            onPress={() => handleSend()}
            disabled={!input.trim() || loading}
          >
            <Text style={styles.sendIcon}>↑</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FAFAFA' },
  kav: { flex: 1 },
  list: { paddingVertical: 12 },
  suggestions: { paddingHorizontal: 16, paddingBottom: 16 },
  suggestLabel: { fontSize: 12, color: '#888', marginBottom: 8 },
  chip: {
    backgroundColor: '#FFF3E0',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
  chipText: { color: '#FF6B35', fontSize: 13, fontWeight: '600' },
  storeList: { paddingHorizontal: 16, paddingTop: 8 },
  typing: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 8,
    gap: 8,
  },
  typingText: { fontSize: 13, color: '#888' },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    gap: 10,
  },
  input: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 14,
    color: '#1a1a1a',
    maxHeight: 100,
  },
  sendBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FF6B35',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendBtnDisabled: { backgroundColor: '#ddd' },
  sendIcon: { color: '#fff', fontSize: 18, fontWeight: '700' },
});
