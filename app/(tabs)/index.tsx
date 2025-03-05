import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Mic, Copy, Share2, Trash2 } from 'lucide-react-native';
import * as Sharing from 'expo-sharing';
import * as Clipboard from 'expo-clipboard';

export default function SpeechToTextScreen() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('en-US');
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    // Update word and character counts
    setWordCount(transcript.trim().split(/\s+/).filter(Boolean).length);
    setCharCount(transcript.length);
  }, [transcript]);

  const startListening = () => {
    if (Platform.OS === 'web') {
      // Web implementation using SpeechRecognition
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = selectedLanguage;

        recognition.onresult = (event) => {
          const transcript = Array.from(event.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join('');
          setTranscript(transcript);
        };

        recognition.onerror = (event) => {
          console.error('Speech recognition error', event.error);
          setIsListening(false);
        };

        recognition.start();
        setIsListening(true);
      } else {
        alert('Speech recognition is not supported in this browser.');
      }
    } else {
      // For native platforms, implement using expo-speech or other native solutions
      alert('Speech recognition is currently only supported on web.');
    }
  };

  const stopListening = () => {
    if (Platform.OS === 'web') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.stop();
      }
    }
    setIsListening(false);
  };

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(transcript);
  };

  const shareTranscript = async () => {
    if (Platform.OS === 'web') {
      try {
        await navigator.share({
          text: transcript,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      await Sharing.shareAsync(transcript);
    }
  };

  const clearTranscript = () => {
    setTranscript('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Speech to Text</Text>
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

      <ScrollView style={styles.transcriptContainer}>
        <Text style={styles.transcript}>{transcript || 'Transcript will appear here...'}</Text>
      </ScrollView>

      <View style={styles.statsContainer}>
        <Text style={styles.statsText}>Words: {wordCount}</Text>
        <Text style={styles.statsText}>Characters: {charCount}</Text>
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.actionButton} onPress={copyToClipboard}>
          <Copy size={24} color="#4b5563" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.micButton, isListening && styles.micButtonActive]}
          onPress={isListening ? stopListening : startListening}>
          <Mic size={32} color={isListening ? '#ffffff' : '#6366f1'} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={shareTranscript}>
          <Share2 size={24} color="#4b5563" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.clearButton} onPress={clearTranscript}>
        <Trash2 size={20} color="#ef4444" />
        <Text style={styles.clearButtonText}>Clear Transcript</Text>
      </TouchableOpacity>
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
  transcriptContainer: {
    flex: 1,
    padding: 20,
  },
  transcript: {
    fontSize: 18,
    fontFamily: 'Inter-Regular',
    color: '#374151',
    lineHeight: 28,
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
  micButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#6366f1',
  },
  micButtonActive: {
    backgroundColor: '#6366f1',
  },
  clearButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: 16,
    backgroundColor: '#fee2e2',
    margin: 20,
    borderRadius: 12,
  },
  clearButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ef4444',
  },
});