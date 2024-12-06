import { Site, Transaction, FeedItem } from '@/types';

export const exampleSites: Site[] = [
  {
    id: 1,
    name: "東京建設現場A",
    address: "東京都新宿区西新宿2-8-1",
    soilAmount: "1000 m³",
    soilType: "黒土",
    contactInfo: "03-1234-5678",
    contactName: "田中太郎",
    location: { lat: 35.6894, lng: 139.6917 }
  },
  {
    id: 2,
    name: "横浜工事現場B",
    address: "神奈川県横浜市西区みなとみらい2-3-1",
    soilAmount: "750 m³",
    soilType: "赤土",
    contactInfo: "045-1234-5678",
    contactName: "鈴木一郎",
    location: { lat: 35.4567, lng: 139.6325 }
  },
  {
    id: 3,
    name: "千葉建設サイトC",
    address: "千葉県千葉市中央区中央4-5-1",
    soilAmount: "500 m³",
    soilType: "山土",
    contactInfo: "043-1234-5678",
    contactName: "佐藤花子",
    location: { lat: 35.6089, lng: 140.1234 }
  }
];

export const exampleTransactions: Transaction[] = [
  {
    id: 1,
    type: "transaction",
    from: "東京建設現場A",
    to: "横浜工事現場B",
    amount: "200 m³",
    soilType: "黒土",
    contactInfo: "03-1234-5678",
    contactName: "田中太郎",
    date: "2024-03-10",
    status: "completed"
  },
  {
    id: 2,
    type: "transaction",
    from: "千葉建設サイトC",
    to: "東京建設現場A",
    amount: "150 m³",
    soilType: "山土",
    contactInfo: "043-1234-5678",
    contactName: "佐藤花子",
    date: "2024-03-09",
    status: "pending"
  }
];

export const generateExampleFeedItems = (): FeedItem[] => {
  const feedItems: FeedItem[] = [
    ...exampleTransactions,
    {
      id: 3,
      type: "new_site" as const,
      date: "2024-03-08",
      site: exampleSites[0]
    },
    {
      id: 4,
      type: "new_site" as const,
      date: "2024-03-07",
      site: exampleSites[1]
    }
  ];
  
  return feedItems.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};