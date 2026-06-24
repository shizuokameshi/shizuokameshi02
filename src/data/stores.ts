import { Store } from '../types';

export const DUMMY_STORES: Store[] = [
  {
    id: '1',
    name: '清水港みなみ',
    area: '静岡市',
    genre: '海鮮',
    budget: '1000〜2000円',
    reason: '静岡駅近くで海鮮を食べたい人におすすめ。新鮮な魚介類が揃い、リーズナブルに本格的な海鮮料理が楽しめます。',
    tiktokUrl: 'https://www.tiktok.com/@gochisogakari',
    googleMapsUrl: 'https://maps.google.com/?q=清水港みなみ+静岡',
    tags: ['海鮮', '昼飲み', '静岡市', 'ランチ', 'ディナー'],
  },
  {
    id: '2',
    name: 'ななや静岡店',
    area: '静岡市',
    genre: 'スイーツ',
    budget: '500〜1000円',
    reason: '濃厚抹茶ジェラートが人気。世界一濃い抹茶ジェラートとして知られ、抹茶好きには絶対外せない一軒です。',
    tiktokUrl: 'https://www.tiktok.com/@gochisogakari',
    googleMapsUrl: 'https://maps.google.com/?q=ななや静岡店',
    tags: ['スイーツ', '抹茶', '静岡市', 'カフェ', 'テイクアウト', 'デート'],
  },
  {
    id: '3',
    name: '炭焼きレストランさわやか',
    area: '静岡県内',
    genre: 'ハンバーグ',
    budget: '1000〜2000円',
    reason: '静岡定番グルメ。ジューシーなげんこつハンバーグは静岡県民のソウルフード。行列必至の名店です。',
    tiktokUrl: 'https://www.tiktok.com/@gochisogakari',
    googleMapsUrl: 'https://maps.google.com/?q=炭焼きレストランさわやか',
    tags: ['ハンバーグ', '静岡県内', 'ランチ', 'ディナー', 'ソウルフード', 'デート', '子連れ'],
  },
];

export function searchStores(query: string): Store[] {
  const q = query.toLowerCase();

  const keywords: Record<string, string[]> = {
    海鮮: ['海鮮', '魚', 'さかな', '刺身', 'しらす', '寿司', 'すし', '昼飲み', '飲み', '焼津', '清水'],
    スイーツ: ['スイーツ', 'カフェ', '抹茶', 'デート', 'かわいい', 'おしゃれ', 'ケーキ', 'ジェラート'],
    ハンバーグ: ['ハンバーグ', 'さわやか', '肉', 'ボリューム', '子連れ', 'ファミリー', 'がっつり'],
  };

  const genreMatches: Record<string, Store> = {
    海鮮: DUMMY_STORES[0],
    スイーツ: DUMMY_STORES[1],
    ハンバーグ: DUMMY_STORES[2],
  };

  const matched: Store[] = [];

  for (const [genre, words] of Object.entries(keywords)) {
    if (words.some((w) => q.includes(w))) {
      matched.push(genreMatches[genre]);
    }
  }

  if (matched.length === 0) {
    return DUMMY_STORES.slice(0, 3);
  }

  return matched.slice(0, 3);
}
