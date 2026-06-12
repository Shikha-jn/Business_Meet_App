import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Animated,
  Dimensions,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RootStackParamlist } from '../../navigation/AppNavigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import api from '../../api/axios';
import { Endpoints } from '../../api/endpoints';
import { useAuthStore } from '../../store/useAuthStore';

// ─── Theme tokens (inline — replace with your own imports) ───────────────────
const Colors = {
  // Brand
  green: '#4A7C3F',
  greenDark: '#3A6230',
  greenLight: '#E8F5E2',
  // Neutrals
  white: '#FFFFFF',
  bg: '#F2F4F0',
  text: '#1A1A1A',
  sub: '#6B7280',
  border: '#E5E7EB',
  // Accent / status
  red: '#EF4444',
  // Badge
  badgeGreenBg: '#D1FAE5',
  badgeGreenText: '#166534',
};

// ─── Constants ────────────────────────────────────────────────────────────────
const CATEGORIES = [
  'Technology',
  'Healthcare',
  'Finance',
  'Education',
  'Real Estate',
  'Retail',
  'Manufacturing',
  'Consulting',
  'Media',
  'Other',
];
const COMPANY_TYPES = [
  'Private Limited',
  'Public Limited',
  'LLP',
  'Partnership',
  'Sole Proprietorship',
  'OPC',
  'NGO',
  'Other',
];
const EMPLOYEE_COUNTS = [
  '1-10',
  '11-50',
  '51-200',
  '201-500',
  '501-1000',
  '1000+',
];

const STEPS = [
  { label: 'Contact & Auth', subtitle: 'How can we reach you?', icon: '👤' },
  { label: 'Company Info', subtitle: 'Tell us about your company', icon: '🏢' },
  {
    label: 'Address & Legal',
    subtitle: 'Location and legal details',
    icon: '📋',
  },
];

// ─── Types ────────────────────────────────────────────────────────────────────
interface Step1Form {
  email: string;
  password: string;
  contactName: string;
  phone: string;
  website: string;
}
interface Step2Form {
  companyName: string;
  category: string;
  companyType: string;
  industry: string;
  yearEstablished: string;
  employeeCount: string;
  description: string;
}
interface Step3Form {
  street: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  gst: string;
  pan: string;
  cin: string;
  msme: string;
}

// ─── Tiny validation helpers ──────────────────────────────────────────────────
const required =
  (msg = 'This field is required') =>
  (v: string) =>
    v.trim() ? undefined : msg;
const isEmail = () => (v: string) =>
  /\S+@\S+\.\S+/.test(v) ? undefined : 'Enter a valid email';
const isPhone = () => (v: string) =>
  /^[6-9]\d{9}$/.test(v) ? undefined : 'Enter a valid 10-digit mobile number';
const minLen = (n: number, msg: string) => (v: string) =>
  v.length >= n ? undefined : msg;
const isStrong = () => (v: string) =>
  v.length >= 8 ? undefined : 'Password must be at least 8 characters';

const validate = (
  val: string,
  rules: Array<(v: string) => string | undefined>,
) => {
  for (const rule of rules) {
    const e = rule(val);
    if (e) return e;
  }
  return undefined;
};

const { width } = Dimensions.get('window');

type SignupScreenProps = NativeStackScreenProps<RootStackParamlist, 'register'>
// ─── SignupScreen ─────────────────────────────────────────────────────────────
const SignupScreen = ({ navigation }: SignupScreenProps) => {
    const {setAuth} = useAuthStore();
  const [currentStep, setCurrentStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [openPicker, setOpenPicker] = useState<string | null>(null);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const stepAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const animateStep = () => {
    stepAnim.setValue(0);
    Animated.timing(stepAnim, {
      toValue: 1,
      duration: 320,
      useNativeDriver: true,
    }).start();
  };

  // ── Step state ────────────────────────────────────────────────────────────
  const [s1, setS1] = useState<Step1Form>({
    email: '',
    password: '',
    contactName: '',
    phone: '',
    website: '',
  });
  const [s1Touched, setS1Touched] = useState<Record<keyof Step1Form, boolean>>({
    email: false,
    password: false,
    contactName: false,
    phone: false,
    website: false,
  });

  const [s2, setS2] = useState<Step2Form>({
    companyName: '',
    category: '',
    companyType: '',
    industry: '',
    yearEstablished: '',
    employeeCount: '',
    description: '',
  });
  const [s2Touched, setS2Touched] = useState<Record<keyof Step2Form, boolean>>({
    companyName: false,
    category: false,
    companyType: false,
    industry: false,
    yearEstablished: false,
    employeeCount: false,
    description: false,
  });

  const [s3, setS3] = useState<Step3Form>({
    street: '',
    city: '',
    state: '',
    country: 'India',
    pincode: '',
    gst: '',
    pan: '',
    cin: '',
    msme: '',
  });
  const [s3Touched, setS3Touched] = useState<Record<keyof Step3Form, boolean>>({
    street: false,
    city: false,
    state: false,
    country: false,
    pincode: false,
    gst: false,
    pan: false,
    cin: false,
    msme: false,
  });

  const upS1 = (k: keyof Step1Form, v: string) => {
    setS1(p => ({ ...p, [k]: v }));
    setS1Touched(p => ({ ...p, [k]: false }));
  };
  const upS2 = (k: keyof Step2Form, v: string) => {
    setS2(p => ({ ...p, [k]: v }));
    setS2Touched(p => ({ ...p, [k]: false }));
  };
  const upS3 = (k: keyof Step3Form, v: string) => {
    setS3(p => ({ ...p, [k]: v }));
    setS3Touched(p => ({ ...p, [k]: false }));
  };

  // ── Validation ────────────────────────────────────────────────────────────
  const s1Errors = {
    email: validate(s1.email, [required(), isEmail()]),
    password: validate(s1.password, [required(), isStrong()]),
    contactName: undefined,
    phone: validate(s1.phone, [required(), isPhone()]),
    website: undefined,
  };
  const s2Errors = {
    companyName: validate(s2.companyName, [
      required('Company name is required'),
    ]),
    category: validate(s2.category, [required('Please select a category')]),
    companyType: undefined,
    industry: undefined,
    yearEstablished: undefined,
    employeeCount: undefined,
    description: undefined,
  };
  const s3Errors = {
    street: validate(s3.street, [required('Street address is required')]),
    city: validate(s3.city, [required('City is required')]),
    state: validate(s3.state, [required('State is required')]),
    country: validate(s3.country, [required()]),
    pincode: validate(s3.pincode, [
      required('Pincode is required'),
      minLen(6, 'Enter valid 6-digit pincode'),
    ]),
    gst: undefined,
    pan: undefined,
    cin: undefined,
    msme: undefined,
  };

  const s1Valid = !s1Errors.email && !s1Errors.password && !s1Errors.phone;
  const s2Valid = !s2Errors.companyName && !s2Errors.category;
  const s3Valid =
    !s3Errors.street &&
    !s3Errors.city &&
    !s3Errors.state &&
    !s3Errors.country &&
    !s3Errors.pincode;

  const touchAllS1 = () =>
    setS1Touched({
      email: true,
      password: true,
      contactName: true,
      phone: true,
      website: true,
    });
  const touchAllS2 = () =>
    setS2Touched({
      companyName: true,
      category: true,
      companyType: true,
      industry: true,
      yearEstablished: true,
      employeeCount: true,
      description: true,
    });
  const touchAllS3 = () =>
    setS3Touched({
      street: true,
      city: true,
      state: true,
      country: true,
      pincode: true,
      gst: true,
      pan: true,
      cin: true,
      msme: true,
    });

  // ── Navigation ────────────────────────────────────────────────────────────
  const handleNext = () => {
    if (currentStep === 0) {
      touchAllS1();
      if (!s1Valid) return;
    }
    if (currentStep === 1) {
      touchAllS2();
      if (!s2Valid) return;
    }
    animateStep();
    setCurrentStep(p => p + 1);
  };
  const handleBack = () => {
    if (currentStep === 0) {
      navigation.replace('login');
      return;
    }
    animateStep();
    setCurrentStep(p => p - 1);
  };
  const handleSubmit = async () => {
    touchAllS3();
    if (!s3Valid) return;
    try{

        const formData = new FormData();

        formData.append('email', s1.email);
        formData.append('password', s1.password);
        formData.append('companyName', s2.companyName);
        formData.append('cateogry', s2.category);
        formData.append('companyType', s2.companyType);
        formData.append('industry', s2.industry);
        formData.append('yearEstablished', s2.yearEstablished);
        formData.append('businessDescription', s2.description);
        formData.append('contactPersonName', s1.contactName);
        formData.append('phone', s1.phone);
        formData.append('website', s1.website);
        formData.append('address', s3.street);
        formData.append('employeeCount', s2.employeeCount);
        formData.append('bio', s2.description);
        formData.append('about', s2.description);
        formData.append('websiteLink', s1.website);
        

        const response = await api.post(Endpoints.Register, formData, {
            headers: {
                "Content-Type": 'multipart/formData'
            }
        })

        if(response.data?.success){
            setAuth(response?.data?.company, response.data?.token)
            Alert.alert('Registration successed', response.data?.message || 'Company registered sucessfully');
            navigation.replace('main')
        }


    }catch(error: any){
        console.error('Registration failed : ', error);
        Alert.alert('Registration failed ', error?.message || error?.response?.message || 'Something went wrong or registration failed')
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <StatusBar barStyle="light-content" backgroundColor={Colors.greenDark} />

      {/* ── Header ── */}
      <View style={styles.headerBg}>
        {/* decorative circles */}
        <View style={styles.circle1} />
        <View style={styles.circle2} />
        <View style={styles.circle3} />

        <Animated.View
          style={[
            styles.headerContent,
            { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
          ]}
        >
          <TouchableOpacity style={styles.backBtn} onPress={handleBack}>
            <Ionicons
              name="arrow-back"
              size={18}
              color="rgba(255,255,255,0.85)"
            />
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>

          {/* Logo */}
          <View style={styles.logoRow}>
            <View style={styles.logoIconBox}>
              <View style={styles.leafA} />
              <View style={styles.leafB} />
            </View>
            <View>
              <Text style={styles.logoWordmark}>Bussiness Network</Text>
              <View style={styles.tagBadge}>
                <Text style={styles.tagText}>BUSINESS · NETWORK</Text>
              </View>
            </View>
          </View>

          <Text style={styles.welcomeTitle}>Create Account</Text>
          <Text style={styles.welcomeSub}>Join India's business network</Text>
        </Animated.View>
      </View>

      {/* ── Body ── */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Step indicator */}
        <Animated.View style={{ opacity: fadeAnim }}>
          <StepIndicator current={currentStep} steps={STEPS} />
        </Animated.View>

        {/* Step label card */}
        <Animated.View style={[styles.stepLabelCard, { opacity: stepAnim }]}>
          <View style={styles.stepIconBadge}>
            <Text style={styles.stepIconText}>{STEPS[currentStep].icon}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.stepTitle}>{STEPS[currentStep].label}</Text>
            <Text style={styles.stepSubtitle}>
              {STEPS[currentStep].subtitle}
            </Text>
          </View>
          <Text style={styles.stepCounter}>{currentStep + 1}/3</Text>
        </Animated.View>

        {/* Form card */}
        <Animated.View
          style={[
            styles.card,
            { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
          ]}
        >
          {/* ── STEP 1 ── */}
          {currentStep === 0 && (
            <View style={styles.formSection}>
              <Field
                label="Email Address"
                icon="mail-outline"
                value={s1.email}
                onChangeText={v => upS1('email', v)}
                placeholder="you@company.com"
                keyboardType="email-address"
                required
                error={s1Errors.email}
                touched={s1Touched.email}
              />
              <Field
                label="Password"
                icon="lock-closed-outline"
                value={s1.password}
                onChangeText={v => upS1('password', v)}
                placeholder="Minimum 8 characters"
                secureTextEntry={!showPassword}
                required
                trailingIcon={showPassword ? 'eye-off-outline' : 'eye-outline'}
                onTrailingPress={() => setShowPassword(p => !p)}
                error={s1Errors.password}
                touched={s1Touched.password}
              />
              <Field
                label="Contact Person Name"
                icon="person-outline"
                value={s1.contactName}
                onChangeText={v => upS1('contactName', v)}
                placeholder="Full name"
                autoCapitalize="words"
              />
              <Field
                label="Phone Number"
                icon="call-outline"
                value={s1.phone}
                onChangeText={v => upS1('phone', v)}
                placeholder="9876543210"
                keyboardType="phone-pad"
                maxLength={10}
                required
                error={s1Errors.phone}
                touched={s1Touched.phone}
              />
              <Field
                label="Website"
                icon="globe-outline"
                value={s1.website}
                onChangeText={v => upS1('website', v)}
                placeholder="https://www.yourcompany.com"
                keyboardType="url"
              />
            </View>
          )}

          {/* ── STEP 2 ── */}
          {currentStep === 1 && (
            <View style={styles.formSection}>
              <Field
                label="Company Name"
                icon="business-outline"
                value={s2.companyName}
                onChangeText={v => upS2('companyName', v)}
                placeholder="Acme Corp"
                autoCapitalize="words"
                required
                error={s2Errors.companyName}
                touched={s2Touched.companyName}
              />
              <DropdownField
                label="Category"
                value={s2.category}
                placeholder="Select Category"
                options={CATEGORIES}
                isOpen={openPicker === 'category'}
                onToggle={() =>
                  setOpenPicker(p => (p === 'category' ? null : 'category'))
                }
                onSelect={v => {
                  upS2('category', v);
                  setOpenPicker(null);
                }}
                required
                error={s2Errors.category}
                touched={s2Touched.category}
              />
              <DropdownField
                label="Company Type"
                value={s2.companyType}
                placeholder="Select Company Type"
                options={COMPANY_TYPES}
                isOpen={openPicker === 'companyType'}
                onToggle={() =>
                  setOpenPicker(p =>
                    p === 'companyType' ? null : 'companyType',
                  )
                }
                onSelect={v => {
                  upS2('companyType', v);
                  setOpenPicker(null);
                }}
              />
              <Field
                label="Industry"
                icon="layers-outline"
                value={s2.industry}
                onChangeText={v => upS2('industry', v)}
                placeholder="e.g. Software Development"
                autoCapitalize="words"
              />
              <Field
                label="Year Established"
                icon="calendar-outline"
                value={s2.yearEstablished}
                onChangeText={v => upS2('yearEstablished', v)}
                placeholder="2020"
                keyboardType="number-pad"
                maxLength={4}
              />
              <DropdownField
                label="Employee Count"
                value={s2.employeeCount}
                placeholder="Select Employee Range"
                options={EMPLOYEE_COUNTS}
                isOpen={openPicker === 'employeeCount'}
                onToggle={() =>
                  setOpenPicker(p =>
                    p === 'employeeCount' ? null : 'employeeCount',
                  )
                }
                onSelect={v => {
                  upS2('employeeCount', v);
                  setOpenPicker(null);
                }}
              />
              <View>
                <Text style={styles.textareaLabel}>BUSINESS DESCRIPTION</Text>
                <TextInput
                  style={styles.textarea}
                  value={s2.description}
                  onChangeText={v => upS2('description', v)}
                  placeholder="Describe your business, products, and services…"
                  placeholderTextColor={Colors.sub}
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                />
              </View>
            </View>
          )}

          {/* ── STEP 3 ── */}
          {currentStep === 2 && (
            <View style={styles.formSection}>
              <SectionHeader label="Company Address" icon="location-outline" />
              <Field
                label="Street Address"
                icon="location-outline"
                value={s3.street}
                onChangeText={v => upS3('street', v)}
                placeholder="Enter full street address"
                required
                error={s3Errors.street}
                touched={s3Touched.street}
              />
              <Field
                label="City"
                value={s3.city}
                onChangeText={v => upS3('city', v)}
                placeholder="Mumbai"
                autoCapitalize="words"
                required
                error={s3Errors.city}
                touched={s3Touched.city}
              />
              <Field
                label="State"
                value={s3.state}
                onChangeText={v => upS3('state', v)}
                placeholder="Maharashtra"
                autoCapitalize="words"
                required
                error={s3Errors.state}
                touched={s3Touched.state}
              />
              <Field
                label="Country"
                value={s3.country}
                onChangeText={v => upS3('country', v)}
                placeholder="India"
                autoCapitalize="words"
                required
                error={s3Errors.country}
                touched={s3Touched.country}
              />
              <Field
                label="Pincode"
                value={s3.pincode}
                onChangeText={v => upS3('pincode', v)}
                placeholder="400001"
                keyboardType="number-pad"
                maxLength={6}
                required
                error={s3Errors.pincode}
                touched={s3Touched.pincode}
              />

              <SectionHeader
                label="Legal Details"
                icon="shield-checkmark-outline"
              />
              <Field
                label="GST Number"
                value={s3.gst}
                onChangeText={v => upS3('gst', v.toUpperCase())}
                placeholder="22AAAAA0000A1Z5"
                autoCapitalize="characters"
                maxLength={15}
                hint="Optional"
              />
              <Field
                label="PAN Number"
                value={s3.pan}
                onChangeText={v => upS3('pan', v.toUpperCase())}
                placeholder="AAAAA0000A"
                autoCapitalize="characters"
                maxLength={10}
                hint="Optional"
              />
              <Field
                label="CIN Number"
                value={s3.cin}
                onChangeText={v => upS3('cin', v.toUpperCase())}
                placeholder="L17110DL1995PLC069348"
                autoCapitalize="characters"
                hint="Optional"
              />
              <Field
                label="MSME Number"
                value={s3.msme}
                onChangeText={v => upS3('msme', v.toUpperCase())}
                placeholder="UDYAM-XX-00-0000000"
                autoCapitalize="characters"
                hint="Optional"
              />
            </View>
          )}

          {/* ── Nav row ── */}
          <View style={styles.navRow}>
            <TouchableOpacity style={styles.prevBtn} onPress={handleBack}>
              <Ionicons name="arrow-back" size={16} color={Colors.sub} />
              <Text style={styles.prevBtnText}>
                {currentStep === 0 ? 'Login' : 'Back'}
              </Text>
            </TouchableOpacity>

            {currentStep < 2 ? (
              <TouchableOpacity
                style={styles.nextBtn}
                onPress={handleNext}
                activeOpacity={0.85}
              >
                <Text style={styles.nextBtnText}>Next</Text>
                <Ionicons name="arrow-forward" size={16} color={Colors.white} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[styles.nextBtn, styles.submitBtn]}
                onPress={handleSubmit}
                activeOpacity={0.85}
              >
                <Ionicons
                  name="checkmark-circle-outline"
                  size={16}
                  color={Colors.white}
                />
                <Text style={styles.nextBtnText}>Register Company</Text>
              </TouchableOpacity>
            )}
          </View>
        </Animated.View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerPrompt}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.replace('main')}>
            <Text style={styles.footerLink}>Sign in →</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

// ─── Field (replaces InputField) ──────────────────────────────────────────────
interface FieldProps {
  label: string;
  value: string;
  onChangeText: (v: string) => void;
  placeholder?: string;
  icon?: string;
  required?: boolean;
  error?: string;
  touched?: boolean;
  hint?: string;
  secureTextEntry?: boolean;
  trailingIcon?: string;
  onTrailingPress?: () => void;
  keyboardType?: any;
  autoCapitalize?: any;
  maxLength?: number;
}
const Field: React.FC<FieldProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  icon,
  required: req,
  error,
  touched,
  hint,
  secureTextEntry,
  trailingIcon,
  onTrailingPress,
  keyboardType,
  autoCapitalize,
  maxLength,
}) => {
  const showError = touched && !!error;
  return (
    <View style={fieldStyles.wrap}>
      <Text style={[fieldStyles.label, showError && fieldStyles.labelErr]}>
        {label.toUpperCase()}
        {req && <Text style={fieldStyles.star}> *</Text>}
      </Text>
      <View style={[fieldStyles.row, showError && fieldStyles.rowErr]}>
        {icon ? (
          <Ionicons
            name={icon as any}
            size={16}
            color={showError ? Colors.red : Colors.sub}
            style={fieldStyles.iconL}
          />
        ) : null}
        <TextInput
          style={fieldStyles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={Colors.sub}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize || 'none'}
          maxLength={maxLength}
        />
        {trailingIcon ? (
          <TouchableOpacity onPress={onTrailingPress} style={fieldStyles.iconR}>
            <Ionicons name={trailingIcon as any} size={16} color={Colors.sub} />
          </TouchableOpacity>
        ) : null}
      </View>
      {showError && (
        <View style={fieldStyles.errorRow}>
          <Ionicons name="alert-circle" size={12} color={Colors.red} />
          <Text style={fieldStyles.errorText}>{error}</Text>
        </View>
      )}
      {hint && !showError && <Text style={fieldStyles.hint}>{hint}</Text>}
    </View>
  );
};
const fieldStyles = StyleSheet.create({
  wrap: { marginBottom: 0 },
  label: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.sub,
    letterSpacing: 0.7,
    marginBottom: 6,
  },
  labelErr: { color: Colors.red },
  star: { color: Colors.red },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.bg,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 12,
    minHeight: 48,
  },
  rowErr: { borderColor: Colors.red, backgroundColor: '#FFF5F5' },
  iconL: { marginRight: 8 },
  iconR: { padding: 4, marginLeft: 6 },
  input: {
    flex: 1,
    fontSize: 14,
    color: Colors.text,
    paddingVertical: Platform.OS === 'ios' ? 12 : 8,
    padding: 0,
  },
  errorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 5,
  },
  errorText: { fontSize: 11, color: Colors.red, fontWeight: '600' },
  hint: { fontSize: 11, color: Colors.sub, marginTop: 4 },
});

// ─── SectionHeader ────────────────────────────────────────────────────────────
const SectionHeader: React.FC<{ label: string; icon: string }> = ({
  label,
  icon,
}) => (
  <View style={secStyles.wrap}>
    <View style={secStyles.iconBox}>
      <Ionicons name={icon as any} size={13} color={Colors.green} />
    </View>
    <Text style={secStyles.label}>{label}</Text>
    <View style={secStyles.line} />
  </View>
);
const secStyles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 2,
    marginTop: 6,
  },
  iconBox: {
    width: 26,
    height: 26,
    borderRadius: 8,
    backgroundColor: Colors.greenLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 13,
    fontWeight: '800',
    color: Colors.text,
    letterSpacing: 0.2,
  },
  line: { flex: 1, height: 1, backgroundColor: Colors.border },
});

// ─── StepIndicator ────────────────────────────────────────────────────────────
const StepIndicator: React.FC<{ current: number; steps: typeof STEPS }> = ({
  current,
  steps,
}) => (
  <View style={stepStyles.wrap}>
    {steps.map((s, i) => (
      <React.Fragment key={i}>
        <View style={stepStyles.col}>
          <View
            style={[
              stepStyles.circle,
              i < current && stepStyles.done,
              i === current && stepStyles.active,
            ]}
          >
            {i < current ? (
              <Ionicons name="checkmark" size={14} color={Colors.white} />
            ) : (
              <Text
                style={[stepStyles.num, i === current && stepStyles.numActive]}
              >
                {i + 1}
              </Text>
            )}
          </View>
          <Text
            style={[stepStyles.lbl, i === current && stepStyles.lblActive]}
            numberOfLines={1}
          >
            {s.label}
          </Text>
        </View>
        {i < steps.length - 1 && (
          <View style={[stepStyles.line, i < current && stepStyles.lineDone]} />
        )}
      </React.Fragment>
    ))}
  </View>
);
const stepStyles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 14,
    paddingHorizontal: 4,
  },
  col: { alignItems: 'center', gap: 5, width: 72 },
  circle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: Colors.border,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  active: {
    borderColor: Colors.green,
    backgroundColor: Colors.green,
    shadowColor: Colors.green,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  done: { borderColor: Colors.green, backgroundColor: Colors.green },
  num: { fontSize: 13, fontWeight: '700', color: Colors.sub },
  numActive: { color: Colors.white },
  lbl: {
    fontSize: 9,
    fontWeight: '600',
    color: Colors.sub,
    textAlign: 'center',
    letterSpacing: 0.2,
  },
  lblActive: { color: Colors.green, fontWeight: '800' },
  line: {
    flex: 1,
    height: 2,
    backgroundColor: Colors.border,
    marginTop: 17,
    marginHorizontal: 2,
  },
  lineDone: { backgroundColor: Colors.green },
});

// ─── DropdownField ────────────────────────────────────────────────────────────
interface DropdownFieldProps {
  label: string;
  value: string;
  placeholder: string;
  options: string[];
  isOpen: boolean;
  onToggle: () => void;
  onSelect: (v: string) => void;
  required?: boolean;
  error?: string;
  touched?: boolean;
}
const DropdownField: React.FC<DropdownFieldProps> = ({
  label,
  value,
  placeholder,
  options,
  isOpen,
  onToggle,
  onSelect,
  required: req,
  error,
  touched,
}) => {
  const showError = touched && !!error;
  return (
    <View style={dropStyles.wrap}>
      <Text style={[dropStyles.label, showError && dropStyles.labelErr]}>
        {label.toUpperCase()}
        {req && <Text style={dropStyles.star}> *</Text>}
      </Text>
      <TouchableOpacity
        style={[
          dropStyles.trigger,
          isOpen && dropStyles.triggerOpen,
          showError && dropStyles.triggerErr,
        ]}
        onPress={onToggle}
        activeOpacity={0.85}
      >
        <Text style={[dropStyles.triggerText, !value && dropStyles.ph]}>
          {value || placeholder}
        </Text>
        <Ionicons
          name={isOpen ? 'chevron-up' : 'chevron-down'}
          size={16}
          color={Colors.sub}
        />
      </TouchableOpacity>
      {showError && (
        <View style={fieldStyles.errorRow}>
          <Ionicons name="alert-circle" size={12} color={Colors.red} />
          <Text style={fieldStyles.errorText}>{error}</Text>
        </View>
      )}
      {isOpen && (
        <View style={dropStyles.menu}>
          <ScrollView
            nestedScrollEnabled
            style={{ maxHeight: 200 }}
            showsVerticalScrollIndicator={false}
          >
            {options.map(opt => (
              <TouchableOpacity
                key={opt}
                style={[
                  dropStyles.item,
                  value === opt && dropStyles.itemActive,
                ]}
                onPress={() => onSelect(opt)}
              >
                <Text
                  style={[
                    dropStyles.itemText,
                    value === opt && dropStyles.itemTextActive,
                  ]}
                >
                  {opt}
                </Text>
                {value === opt && (
                  <Ionicons name="checkmark" size={14} color={Colors.green} />
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};
const dropStyles = StyleSheet.create({
  wrap: { marginBottom: 0 },
  label: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.sub,
    letterSpacing: 0.7,
    marginBottom: 6,
  },
  labelErr: { color: Colors.red },
  star: { color: Colors.red },
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.bg,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    height: 48,
    paddingHorizontal: 12,
  },
  triggerOpen: {
    borderColor: Colors.green,
    backgroundColor: Colors.greenLight,
  },
  triggerErr: { borderColor: Colors.red, backgroundColor: '#FFF5F5' },
  triggerText: { fontSize: 14, color: Colors.text, flex: 1 },
  ph: { color: Colors.sub },
  menu: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    marginTop: 4,
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
    zIndex: 99,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 11,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  itemActive: { backgroundColor: Colors.greenLight },
  itemText: { fontSize: 14, color: Colors.text },
  itemTextActive: { color: Colors.green, fontWeight: '700' },
});

// ─── Main styles ──────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  // Header
  headerBg: {
    backgroundColor: Colors.greenDark,
    paddingTop: 52,
    paddingBottom: 52,
    paddingHorizontal: 24,
    overflow: 'hidden',
    position: 'relative',
  },
  circle1: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: Colors.green,
    opacity: 0.25,
    top: -60,
    right: -60,
  },
  circle2: {
    position: 'absolute',
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: Colors.greenLight,
    opacity: 0.1,
    bottom: -30,
    left: -30,
  },
  circle3: {
    position: 'absolute',
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: Colors.green,
    opacity: 0.15,
    top: 28,
    left: width / 2,
  },
  headerContent: { zIndex: 10 },

  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
    marginBottom: 20,
    paddingVertical: 4,
  },
  backText: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 13,
    fontWeight: '600',
  },

  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  logoIconBox: {
    width: 44,
    height: 44,
    borderRadius: 13,
    backgroundColor: Colors.green,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  leafA: {
    position: 'absolute',
    width: 28,
    height: 38,
    borderRadius: 20,
    backgroundColor: Colors.greenLight,
    transform: [{ rotate: '-20deg' }, { translateX: -6 }],
    opacity: 0.9,
  },
  leafB: {
    position: 'absolute',
    width: 20,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.white,
    transform: [{ rotate: '25deg' }, { translateX: 6 }],
    opacity: 0.35,
  },

  logoWordmark: {
    fontSize: 19,
    fontWeight: '900',
    color: Colors.white,
    letterSpacing: 1,
  },
  tagBadge: {
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 1,
    alignSelf: 'flex-start',
    marginTop: 2,
  },
  tagText: {
    color: Colors.white,
    fontSize: 8,
    fontWeight: '800',
    letterSpacing: 2,
  },

  welcomeTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: Colors.white,
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  welcomeSub: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.65)',
    fontWeight: '500',
  },

  // Scroll
  scrollView: {
    flex: 1,
    backgroundColor: Colors.bg,
    marginTop: -20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  scrollContent: { paddingHorizontal: 16, paddingTop: 24, paddingBottom: 48 },

  // Step label card
  stepLabelCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 14,
    marginBottom: 14,
    borderLeftWidth: 3,
    borderLeftColor: Colors.green,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  stepIconBadge: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: Colors.greenLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepIconText: { fontSize: 18 },
  stepTitle: { fontSize: 15, fontWeight: '800', color: Colors.text },
  stepSubtitle: { fontSize: 12, color: Colors.sub, marginTop: 1 },
  stepCounter: {
    fontSize: 18,
    fontWeight: '900',
    color: Colors.green,
    opacity: 0.55,
  },

  // Form card
  card: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  formSection: { gap: 16 },

  // Textarea
  textareaLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.sub,
    letterSpacing: 0.7,
    marginBottom: 6,
  },
  textarea: {
    backgroundColor: Colors.bg,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 14,
    color: Colors.text,
    minHeight: 110,
    lineHeight: 22,
  },

  // Nav
  navRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 22,
    gap: 12,
  },
  prevBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 10,
    paddingVertical: 13,
    paddingHorizontal: 16,
  },
  prevBtnText: { fontSize: 14, color: Colors.sub, fontWeight: '600' },
  nextBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: Colors.green,
    borderRadius: 10,
    paddingVertical: 14,
  },
  submitBtn: { backgroundColor: Colors.greenDark },
  nextBtnText: { color: Colors.white, fontSize: 15, fontWeight: '700' },

  // Footer
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  footerPrompt: { fontSize: 14, color: Colors.sub },
  footerLink: { fontSize: 14, color: Colors.green, fontWeight: '700' },
});

export default SignupScreen;
