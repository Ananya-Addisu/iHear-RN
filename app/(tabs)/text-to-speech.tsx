import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Play, Square, Share2, Trash2 } from 'lucide-react-native';
import * as Speech from 'expo-speech';
import * as Sharing from 'expo-sharing';

export default function TextToSpeechScreen() {
  const [text, setText] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en-US');
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);

  const handleTextChange = (newText: string) => {
    setText(newText);
    setWordCount(newText.trim().split(/\s+/).filter(Boolean).length);
    setCharCount(newText.length);
  };

  const speak = async () => {
    const thingToSay = text;
    setIsPlaying(true);
    
    try {
      await Speech.speak(thingToSay, {
        language: selectedLanguage,
        onDone: () => setIsPlaying(false),
        onError: () => setIsPlaying(false),
      });
    } catch (error) {
      console.error('Error speaking:', error);
      setIsPlaying(false);
    }
  };

  const stopSpeaking = () => {
    Speech.stop();
    setIsPlaying(false);
  };

  const shareText = async () => {
    if (Platform.OS === 'web') {
      try {
        await navigator.share({
          text: text,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      await Sharing.shareAsync(text);
    }
  };

  const clearText = () => {
    setText('');
    setWordCount(0);
    setCharCount(0);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Text to Speech</Text>
        <View style={styles.languageSelector}>
          <TouchableOpacity
            style={[
              styles.languageButton,
              selectedLanguage === 'en-US' && styles.languageButtonActive,
            ]}
            onPress={() => setSelectedLanguage('en-US')}>
            <Text style={[
              styles.languageButtonText,
              selectedLanguage === 'en-US' && styles.languageButtonTextActive,
            ]}>English</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.languageButton,
              selectedLanguage === 'am-ET' && styles.languageButtonActive,
            ]}
            onPress={() => setSelectedLanguage('am-ET')}>
            <Text style={[
              styles.languageButtonText,
              selectedLanguage === 'am-ET' && styles.languageButtonTextActive,
            ]}>አማርኛ</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          multiline
          placeholder="Type or paste text here..."
          value={text}
          onChangeText={handleTextChange}
        />
      </View>

      <View style={styles.statsContainer}>
        <Text style={styles.statsText}>Words: {wordCount}</Text>
        <Text style={styles.statsText}>Characters: {charCount}</Text>
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.actionButton} onPress={shareText}>
          <Share2 size={24} color="#4b5563" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.playButton, isPlaying && styles.playButtonActive]}
          onPress={isPlaying ? stopSpeaking : speak}>
          {isPlaying ? (
            <Square size={32} color="#ffffff" />
          ) : (
            <Play size={32} color="#6366f1" />
          )}
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={clearText}>
          <Trash2 size={24} color="#4b5563" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    marginBottom: 16,
  },
  languageSelector: {
    flexDirection: 'row',
    gap: 12,
  },
  languageButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
  },
  languageButtonActive: {
    backgroundColor: '#6366f1',
  },
  languageButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#4b5563',
  },
  languageButtonTextActive: {
    color: '#ffffff',
  },
  inputContainer: {
    flex: 1,
    padding: 20,
  },
  input: {
    flex: 1,
    fontSize: 18,
    fontFamily: 'Inter-Regular',
    color: '#374151',
    textAlignVertical: 'top',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e5e5',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e5e5e5',
  },
  statsText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  actionButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#6366f1',
  },
  playButtonActive: {
    backgroundColor: '#6366f1',
  },
});