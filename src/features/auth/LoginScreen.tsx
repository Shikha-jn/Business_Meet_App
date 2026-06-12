import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Colors from '../../theme/colors';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamlist } from '../../navigation/AppNavigator';
import api from '../../api/axios';
import { Endpoints } from '../../api/endpoints';
import { useAuthStore } from '../../store/useAuthStore';

type LoginScreenProps = NativeStackScreenProps<RootStackParamlist, 'login'>;
// ── LoginScreen ───────────────────────────────────────────────────────────────
export default function LoginScreen({ navigation }: LoginScreenProps) {
    const {setAuth} = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validate = () => {
    let valid = true;
    if (!email.includes('@')) {
      setEmailError('Enter a valid email address.');
      valid = false;
    } else {
      setEmailError('');
    }
    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters.');
      valid = false;
    } else {
      setPasswordError('');
    }
    return valid;
  };

  const handleLogin = async() => {
    if (!validate()) return;
    setLoading(true);
    try{

        const data = {
            email: email, 
            password: password
        }

        const response = await api.post(Endpoints.Login, data);

        if(response.data?.success){
            console.log('Login successfully : ', response.data);
            setAuth(response.data?.company, response.data?.token)
            Alert.alert('Login Successfully', response.data?.message || 'Login Successfully')
            navigation.replace('main')
        }
    
    }catch(error: any){
        console.error('Error while login : ', error);
        Alert.alert('Login failed', error?.message || error?.response?.message || 'Something went wrong' )
    }
  };

  return (
    <View style={styles.screen}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* ── Brand mark ── */}
          <View style={styles.brandWrap}>
            <View style={styles.logoCircle}>
              {/* Leaf-style mark built from two rounded rectangles */}
              <View style={styles.leafA} />
              <View style={styles.leafB} />
            </View>
            <Text style={styles.brandName}>Bussiness Network</Text>
            <Text style={styles.brandTagline}>Your work, organised.</Text>
          </View>

          {/* ── Card ── */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Sign in</Text>
            <Text style={styles.cardSub}>
              Welcome back — enter your details below.
            </Text>

            {/* Email */}
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Email</Text>
              <View
                style={[
                  styles.inputWrap,
                  emailError ? styles.inputError : null,
                ]}
              >
                <Text style={styles.inputIcon}>✉</Text>
                <TextInput
                  style={styles.input}
                  placeholder="you@example.com"
                  placeholderTextColor={Colors.sub}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={email}
                  onChangeText={setEmail}
                />
              </View>
              {emailError ? (
                <Text style={styles.errorText}>{emailError}</Text>
              ) : null}
            </View>

            {/* Password */}
            <View style={styles.fieldGroup}>
              <View style={styles.labelRow}>
                <Text style={styles.label}>Password</Text>
                <TouchableOpacity>
                  <Text style={styles.forgotLink}>Forgot password?</Text>
                </TouchableOpacity>
              </View>
              <View
                style={[
                  styles.inputWrap,
                  passwordError ? styles.inputError : null,
                ]}
              >
                <Text style={styles.inputIcon}>🔒</Text>
                <TextInput
                  style={styles.input}
                  placeholder="••••••••"
                  placeholderTextColor={Colors.sub}
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(p => !p)}
                  style={styles.eyeBtn}
                >
                  <Text style={styles.eyeIcon}>
                    {showPassword ? '🙈' : '👁'}
                  </Text>
                </TouchableOpacity>
              </View>
              {passwordError ? (
                <Text style={styles.errorText}>{passwordError}</Text>
              ) : null}
            </View>

            {/* Submit */}
            <TouchableOpacity
              style={[styles.primaryBtn, loading && styles.primaryBtnDisabled]}
              onPress={handleLogin}
              activeOpacity={0.85}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color={Colors.white} />
              ) : (
                <Text style={styles.primaryBtnText}>Sign in</Text>
              )}
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>or</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* SSO row */}
            <TouchableOpacity style={styles.ssoBtn} activeOpacity={0.8}>
              <Text style={styles.ssoIcon}>G</Text>
              <Text style={styles.ssoBtnText}>Continue with Google</Text>
            </TouchableOpacity>
          </View>

          {/* ── Footer ── */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <TouchableOpacity onPress={()=>navigation.replace('register')}>
              <Text style={styles.footerLink}>Create one</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  scroll: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
  },

  // Brand
  brandWrap: {
    alignItems: 'center',
    marginBottom: 28,
  },
  logoCircle: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: Colors.green,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
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
  brandName: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.text,
    letterSpacing: -0.5,
  },
  brandTagline: {
    fontSize: 13,
    color: Colors.sub,
    marginTop: 2,
  },

  // Card
  card: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.text,
    marginBottom: 4,
  },
  cardSub: {
    fontSize: 13,
    color: Colors.sub,
    marginBottom: 24,
  },

  // Fields
  fieldGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.sub,
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  forgotLink: {
    fontSize: 12,
    color: Colors.green,
    fontWeight: '600',
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.bg,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === 'ios' ? 12 : 4,
    gap: 8,
  },
  inputError: {
    borderColor: Colors.red,
    backgroundColor: '#FFF5F5',
  },
  inputIcon: {
    fontSize: 15,
    lineHeight: 20,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: Colors.text,
    padding: 0,
  },
  eyeBtn: {
    padding: 4,
  },
  eyeIcon: {
    fontSize: 15,
  },
  errorText: {
    fontSize: 11,
    color: Colors.red,
    marginTop: 4,
    marginLeft: 2,
  },

  // Primary button
  primaryBtn: {
    backgroundColor: Colors.green,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 4,
  },
  primaryBtnDisabled: {
    opacity: 0.7,
  },
  primaryBtnText: {
    color: Colors.white,
    fontSize: 15,
    fontWeight: '700',
  },

  // Divider
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    gap: 10,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.border,
  },
  dividerText: {
    fontSize: 12,
    color: Colors.sub,
    fontWeight: '600',
  },

  // SSO
  ssoBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingVertical: 13,
    backgroundColor: Colors.white,
  },
  ssoIcon: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.green,
  },
  ssoBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
  },

  // Footer
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  footerText: {
    fontSize: 13,
    color: Colors.sub,
  },
  footerLink: {
    fontSize: 13,
    color: Colors.green,
    fontWeight: '700',
  },
});
