export const exampleSites = [
  {
    id: 1,
    name: "東京建設現場A",
    address: "東京都新宿区西新宿2-8-1",
    soilAmount: "1500 立方メートル",
    soilType: "砂質土",
    contactInfo: "tokyo.a@construction.co.jp",
    contactName: "山田太郎",
    location: { lat: 35.6894, lng: 139.6917 }
  },
  {
    id: 2,
    name: "横浜工事現場B",
    address: "神奈川県横浜市西区みなとみらい2-3-1",
    soilAmount: "800 立方メートル",
    soilType: "粘土質土",
    contactInfo: "yokohama.b@construction.co.jp",
    contactName: "鈴木一郎",
    location: { lat: 35.4567, lng: 139.6325 }
  },
  {
    id: 3,
    name: "埼玉建設現場C",
    address: "埼玉県さいたま市大宮区桜木町1-7-5",
    soilAmount: "2000 立方メートル",
    soilType: "砂利混じり土",
    contactInfo: "saitama.c@construction.co.jp",
    contactName: "佐藤花子",
    location: { lat: 35.9062, lng: 139.6263 }
  }
];

export const exampleTransactions = [
  {
    id: 1,
    type: "transaction",
    from: "東京建設現場A",
    to: "横浜工事現場B",
    amount: "500 立方メートル",
    soilType: "砂質土",
    contactInfo: "tokyo.a@construction.co.jp",
    contactName: "山田太郎",
    date: "2024-02-01",
    status: "completed"
  },
  {
    id: 2,
    type: "transaction",
    from: "埼玉建設現場C",
    to: "東京建設現場A",
    amount: "300 立方メートル",
    soilType: "砂利混じり土",
    contactInfo: "saitama.c@construction.co.jp",
    contactName: "佐藤花子",
    date: "2024-02-03",
    status: "pending"
  }
];

export const generateExampleFeedItems = () => {
  const feedItems = [
    {
      id: 1,
      type: "transaction" as const,
      from: "東京建設現場A",
      to: "横浜工事現場B",
      amount: "500 立方メートル",
      soilType: "砂質土",
      contactInfo: "tokyo.a@construction.co.jp",
      contactName: "山田太郎",
      date: "2024-02-01",
      status: "completed"
    },
    {
      id: 2,
      type: "new_site" as const,
      date: "2024-02-02",
      site: {
        name: "埼玉建設現場C",
        address: "埼玉県さいたま市大宮区桜木町1-7-5",
        soilAmount: "2000 立方メートル",
        soilType: "砂利混じり土",
        contactInfo: "saitama.c@construction.co.jp",
        contactName: "佐藤花子"
      }
    },
    {
      id: 3,
      type: "transaction" as const,
      from: "埼玉建設現場C",
      to: "東京建設現場A",
      amount: "300 立方メートル",
      soilType: "砂利混じり土",
      contactInfo: "saitama.c@construction.co.jp",
      contactName: "佐藤花子",
      date: "2024-02-03",
      status: "pending"
    }
  ];
  return feedItems;
};