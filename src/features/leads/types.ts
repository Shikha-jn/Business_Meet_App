export interface Lead {
  _id: string;
  title: string;
  description: string;
  category: string;
  leadType: string;
  timeline: string;
  priority: string;
  isActive: boolean;
  isPublic: boolean;

  requirements: string[];
  tags: string[];

  views: number;

  createdAt: string;
  expiresAt: string;

  responseCount: number;
  inquiryCount: number;
  commentCount: number;
  likeCount: number;

  daysRemaining: number;

  budget: {
    min: number;
    max: number;
    currency: string;
  };

  location: {
    city: string;
    state: string;
    country: string;
    isRemote: boolean;
  };

  contactInfo: {
    preferredMethod: string;
    email: string;
  };

  companyId: {
    _id: string;
    email: string;
    companyName: string;
    category: string;
  };
}

export interface LeadsResponse {
  leads: Lead[];
  totalLeads: number;
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}