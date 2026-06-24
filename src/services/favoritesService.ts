import AsyncStorage from '@react-native-async-storage/async-storage';
import { Store } from '../types';

const KEY = 'gochisogakari_favorites';

export async function getFavorites(): Promise<Store[]> {
  const raw = await AsyncStorage.getItem(KEY);
  return raw ? JSON.parse(raw) : [];
}

export async function addFavorite(store: Store): Promise<void> {
  const current = await getFavorites();
  if (current.find((s) => s.id === store.id)) return;
  await AsyncStorage.setItem(KEY, JSON.stringify([...current, store]));
}

export async function removeFavorite(storeId: string): Promise<void> {
  const current = await getFavorites();
  await AsyncStorage.setItem(KEY, JSON.stringify(current.filter((s) => s.id !== storeId)));
}

export async function isFavorite(storeId: string): Promise<boolean> {
  const current = await getFavorites();
  return current.some((s) => s.id === storeId);
}
