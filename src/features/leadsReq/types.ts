export interface Budget {
  min: number;
  max: number;
  currency: string;
}

export interface Location {
  city: string;
  state: string;
  country: string;
  isRemote: boolean;
}

export interface ContactInfo {
  preferredMethod: string;
  email: string;
  phone: string;
  contactPerson: string;
}

export interface Company {
  _id: string;
  email: string;
  companyName: string;
  category: string;
}

export interface LeadRequirement {
  _id: string;
//   id: string;

  title: string;
  description: string;
  category: string;
  leadType: string;
  timeline: string;
  priority: string;

  budget: Budget;
  location: Location;
  contactInfo: ContactInfo;
  companyId: Company;

  requirements: string[];
  tags: string[];

  isActive: boolean;

  views: number;
  responseCount: number;
  daysRemaining: number;

  responses: any[];

  expiresAt: string;
  createdAt: string;
  updatedAt: string;

  isPublic?: boolean;
  likeCount?: number;
  commentCount?: number;
  inquiryCount?: number;
}

export interface LeadRequirementsResponse {
  requirements: LeadRequirement[];

  totalRequirements: number;
  totalPages: number;
  currentPage: number;

  hasNextPage: boolean;
  hasPrevPage: boolean;
}