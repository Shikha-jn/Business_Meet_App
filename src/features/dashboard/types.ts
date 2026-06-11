export interface LegalDetails {
  gstNumber: string;
  panNumber: string;
  cinNumber: string;
  msmeNumber: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
}

export interface CompanyProfile {
  _id: string;
  email: string;
  companyName: string;
  category: string;
  companyType: string;
  industry: string;
  businessDescription: string;
  yearEstablished: number;
  employeeCount: string;

  bio: string;
  about: string;

  websiteLinks: string[];
  servicesOffered: string[];

  contactPersonName: string;
  phone: string;
  website: string;

  profilePhoto: string | null;
  profilePhotoPublicId: string | null;

  verificationStatus: string;
  isActive: boolean;
  subscriptionPlan: string;

  profileCompleteness: number;
  loginCount: number;
  averageRating: number;
  totalRatings: number;

  createdAt: string;
  updatedAt: string;
  lastLoginAt: string;

  legalDetails: LegalDetails;
  address: Address;
}

export interface CompanyProfileResponse {
  success: boolean;
  data: CompanyProfile;
}