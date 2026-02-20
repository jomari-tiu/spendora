import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { router } from 'expo-router';

export function FABButton() {
  return (
    <TouchableOpacity
      style={styles.fab}
      onPress={() => router.push('/transaction/add')}
      activeOpacity={0.85}
    >
      <Text style={styles.plus}>+</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#DC2626',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#DC2626',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  plus: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    lineHeight: 34,
  },
});
