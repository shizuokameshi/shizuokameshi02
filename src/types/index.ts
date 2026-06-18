export interface Store {
  id: string;
  name: string;
  area: string;
  genre: string;
  budget: string;
  reason: string;
  tiktokUrl?: string;
  googleMapsUrl?: string;
  imageUrl?: string;
  tags?: string[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  stores?: Store[];
  timestamp: Date;
}

export type RootStackParamList = {
  Main: undefined;
  StoreDetail: { store: Store };
  Chat: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Favorites: undefined;
  Profile: undefined;
};
