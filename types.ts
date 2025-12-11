export interface CustomerProfile {
  // Metadata
  currentDate: string;

  // Customer Profile Section
  customerId: string;
  lastName: string;
  firstName: string;
  address: string;
  city: string;
  state: string;
  zip: string;

  // Purchasing/Media Profile Section
  isFirstTimeCustomer: 'Y' | 'N'; // Kept as string to match form style, could be boolean
  visitsBeforePurchasing: number | '';
  hearAboutSource: string;
  firstPurchaseDate: string;
  avgYearlySpend: number | '';
  monthlyStoreVisits: number | '';
}

export interface AiInsight {
  type: 'opportunity' | 'risk' | 'neutral';
  title: string;
  description: string;
}
