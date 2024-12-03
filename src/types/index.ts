export interface Transaction {
  id: number;
  type: "transaction";
  from: string;
  to: string;
  amount: string;
  soilType: string;
  contactInfo: string;
  contactName: string;
  date: string;
  status: string;
}

export interface Site {
  id: number;
  name: string;
  address: string;
  soilAmount: string;
  soilType: string;
  contactInfo: string;
  contactName: string;
  location?: {
    lat: number;
    lng: number;
  };
}

export interface FeedItem {
  id: number;
  type: "transaction" | "new_site";
  from?: string;
  to?: string;
  amount?: string;
  soilType?: string;
  contactInfo?: string;
  contactName?: string;
  date: string;
  status?: string;
  site?: Site;
}