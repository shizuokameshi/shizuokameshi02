import { Store, ChatMessage } from '../types';
import { searchStores } from '../data/stores';

function buildReply(stores: Store[], query: string): string {
  if (stores.length === 0) {
    return 'ごちそうがかりです！ご質問ありがとうございます。現在のデータでは条件に合うお店が見つかりませんでした。ほかのキーワードで試してみてください🙏';
  }

  const intro = [
    'ごちそうがかりです！静岡グルメ、任せて！✨',
    'ごちそうがかりがおすすめするよ🍽️',
    'はい！静岡ならここがおすすめです！',
  ];
  const picked = intro[Math.floor(Math.random() * intro.length)];

  const storeLines = stores.map((s) => `📍 **${s.name}**（${s.area}・${s.genre}）`).join('\n');

  return `${picked}\n\n${storeLines}\n\n詳細はカードをタップしてね🎵`;
}

export async function sendMessage(
  userText: string,
  _history: ChatMessage[]
): Promise<{ reply: string; stores: Store[] }> {
  await new Promise((r) => setTimeout(r, 800));

  const stores = searchStores(userText);
  const reply = buildReply(stores, userText);

  return { reply, stores };
}
