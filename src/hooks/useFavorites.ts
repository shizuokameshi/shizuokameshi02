import { useState, useEffect, useCallback } from 'react';
import { Store } from '../types';
import { getFavorites, addFavorite, removeFavorite } from '../services/favoritesService';

export function useFavorites() {
  const [favorites, setFavorites] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    const data = await getFavorites();
    setFavorites(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const toggle = useCallback(
    async (store: Store) => {
      const exists = favorites.some((s) => s.id === store.id);
      if (exists) {
        await removeFavorite(store.id);
      } else {
        await addFavorite(store);
      }
      await load();
    },
    [favorites, load]
  );

  const checkFavorite = useCallback(
    (storeId: string) => favorites.some((s) => s.id === storeId),
    [favorites]
  );

  return { favorites, loading, toggle, checkFavorite, reload: load };
}
