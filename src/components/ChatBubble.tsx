import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ChatMessage } from '../types';

interface Props {
  message: ChatMessage;
}

export default function ChatBubble({ message }: Props) {
  const isUser = message.role === 'user';

  return (
    <View style={[styles.wrapper, isUser ? styles.wrapperRight : styles.wrapperLeft]}>
      {!isUser && (
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>🍽️</Text>
        </View>
      )}
      <View style={[styles.bubble, isUser ? styles.userBubble : styles.aiBubble]}>
        <Text style={[styles.text, isUser ? styles.userText : styles.aiText]}>
          {message.content}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    marginVertical: 4,
    paddingHorizontal: 16,
  },
  wrapperLeft: { justifyContent: 'flex-start' },
  wrapperRight: { justifyContent: 'flex-end' },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FF6B35',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    alignSelf: 'flex-end',
  },
  avatarText: { fontSize: 18 },
  bubble: {
    maxWidth: '75%',
    borderRadius: 18,
    padding: 12,
  },
  userBubble: {
    backgroundColor: '#FF6B35',
    borderBottomRightRadius: 4,
  },
  aiBubble: {
    backgroundColor: '#F5F5F5',
    borderBottomLeftRadius: 4,
  },
  text: { fontSize: 14, lineHeight: 20 },
  userText: { color: '#fff' },
  aiText: { color: '#1a1a1a' },
});
