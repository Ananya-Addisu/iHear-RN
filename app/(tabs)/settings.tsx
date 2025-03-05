import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Info, Mail, Globe, Github } from 'lucide-react-native';

export default function SettingsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About iHear</Text>
          <Text style={styles.description}>
            iHear is a speech-to-text and text-to-speech application designed to help bridge communication gaps, particularly for the deaf community. Supporting both English and Amharic languages.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Developer</Text>
          <Text style={styles.developerName}>Ananya Addisu</Text>
          <Text style={styles.companyName}>EXIYOM Tech Solutions</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact & Support</Text>
          <TouchableOpacity
            style={styles.link}
            onPress={() => Linking.openURL('mailto:support@exiyom.com')}>
            <Mail size={20} color="#6366f1" />
            <Text style={styles.linkText}>support@exiyom.com</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.link}
            onPress={() => Linking.openURL('https://exiyom.com')}>
            <Globe size={20} color="#6366f1" />
            <Text style={styles.linkText}>www.exiyom.com</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.link}
            onPress={() => Linking.openURL('https://github.com/exiyom/ihear')}>
            <Github size={20} color="#6366f1" />
            <Text style={styles.linkText}>GitHub Repository</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoBox}>
          <Info size={20} color="#6366f1" />
          <Text style={styles.infoText}>
            Version 1.0.0
          </Text>
        </View>
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
  },
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 24,
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e5e5',
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#4b5563',
    lineHeight: 24,
  },
  developerName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 4,
  },
  companyName: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
  },
  link: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 8,
  },
  linkText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6366f1',
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#eff6ff',
    padding: 12,
    borderRadius: 8,
  },
  infoText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6366f1',
  },
});