import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { useAuth } from '../../../contexts/AuthContext';
import { Mail, Phone, Loader2, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { RecaptchaVerifier, ConfirmationResult } from 'firebase/auth';
import { auth } from '../../../config/firebase';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function SignInModal({ isOpen, onClose, onSuccess }: SignInModalProps) {
  const { signInWithGoogle, signInWithEmail, signUpWithEmail, signInWithPhone, resetPassword } = useAuth();
  
  // Common states
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Email/Password states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  
  // Phone states
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const [recaptchaVerifier, setRecaptchaVerifier] = useState<RecaptchaVerifier | null>(null);

  // Initialize reCAPTCHA for phone auth
  useEffect(() => {
    if (isOpen) {
      // Clear any existing verifier first
      if (recaptchaVerifier) {
        try {
          recaptchaVerifier.clear();
        } catch (e) {
          console.log('Error clearing old verifier:', e);
        }
      }
      
      // Create new verifier
      try {
        // Make sure the container exists
        const container = document.getElementById('recaptcha-container');
        if (!container) {
          console.error('reCAPTCHA container not found');
          return;
        }
        
        const verifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
          size: 'invisible',
          callback: (response: any) => {
            console.log('reCAPTCHA solved', response);
          },
          'expired-callback': () => {
            console.log('reCAPTCHA expired');
            setError('Verification expired. Please try again.');
          }
        });
        
        setRecaptchaVerifier(verifier);
        console.log('reCAPTCHA initialized successfully');
      } catch (error) {
        console.error('Error initializing reCAPTCHA:', error);
        setError('Phone authentication unavailable. Please use Google or Email sign-in.');
      }
    }
    
    // Cleanup on unmount or when modal closes
    return () => {
      if (recaptchaVerifier && !isOpen) {
        try {
          recaptchaVerifier.clear();
          setRecaptchaVerifier(null);
        } catch (e) {
          console.log('Error during cleanup:', e);
        }
      }
    };
  }, [isOpen]);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      await signInWithGoogle();
      onSuccess?.();
      onClose();
    } catch (error: any) {
      handleAuthError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      if (isSignUp) {
        await signUpWithEmail(email, password);
      } else {
        await signInWithEmail(email, password);
      }
      onSuccess?.();
      onClose();
    } catch (error: any) {
      handleAuthError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      await resetPassword(email);
      setError('Password reset email sent! Check your inbox.');
      setTimeout(() => {
        setShowForgotPassword(false);
        setError(null);
      }, 3000);
    } catch (error: any) {
      handleAuthError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhoneSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      if (!confirmationResult && recaptchaVerifier) {
        // Send verification code
        const result = await signInWithPhone(phoneNumber, recaptchaVerifier);
        setConfirmationResult(result);
        setError('Verification code sent to your phone!');
      } else if (confirmationResult) {
        // Verify code
        await confirmationResult.confirm(verificationCode);
        onSuccess?.();
        onClose();
      }
    } catch (error: any) {
      handleAuthError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAuthError = (error: any) => {
    console.error('Auth error:', error);
    
    const errorMessages: { [key: string]: string } = {
      'auth/popup-blocked': 'Please allow popups to sign in',
      'auth/popup-closed-by-user': 'Sign-in cancelled',
      'auth/network-request-failed': 'Network error, please try again',
      'auth/user-not-found': 'No account found with this email',
      'auth/wrong-password': 'Incorrect password',
      'auth/email-already-in-use': 'Email already in use',
      'auth/weak-password': 'Password should be at least 6 characters',
      'auth/invalid-email': 'Invalid email address',
      'auth/invalid-phone-number': 'Invalid phone number format',
      'auth/invalid-verification-code': 'Invalid verification code',
      'auth/code-expired': 'Verification code expired',
    };
    
    setError(errorMessages[error.code] || 'Authentication failed, please try again');
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setPhoneNumber('');
    setVerificationCode('');
    setConfirmationResult(null);
    setError(null);
    setIsSignUp(false);
    setShowForgotPassword(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) { resetForm(); onClose(); } }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Sign In to Vikalp.ai</DialogTitle>
          <DialogDescription>
            Choose your preferred sign-in method
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="google" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="google">Google</TabsTrigger>
            <TabsTrigger value="email">Email</TabsTrigger>
            <TabsTrigger value="phone">Phone</TabsTrigger>
          </TabsList>

          {/* Google Sign-In */}
          <TabsContent value="google" className="space-y-4">
            <div className="text-center space-y-4">
              <p className="text-sm text-gray-600">
                Sign in with your Google account for quick access
              </p>
              <Button
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                className="w-full"
                size="lg"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Continue with Google
                  </>
                )}
              </Button>
            </div>
          </TabsContent>

          {/* Email/Password Sign-In */}
          <TabsContent value="email" className="space-y-4">
            {showForgotPassword ? (
              <form onSubmit={handleForgotPassword} className="space-y-4">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowForgotPassword(false)}
                  className="mb-2"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to sign in
                </Button>
                <div className="space-y-2">
                  <Label htmlFor="reset-email">Email</Label>
                  <Input
                    id="reset-email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    'Send Reset Link'
                  )}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleEmailAuth} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={6}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      {isSignUp ? 'Creating account...' : 'Signing in...'}
                    </>
                  ) : (
                    <>
                      <Mail className="w-4 h-4 mr-2" />
                      {isSignUp ? 'Create Account' : 'Sign In'}
                    </>
                  )}
                </Button>
                <div className="flex items-center justify-between text-sm">
                  <button
                    type="button"
                    onClick={() => setIsSignUp(!isSignUp)}
                    className="text-blue-600 hover:underline"
                  >
                    {isSignUp ? 'Already have an account?' : 'Need an account?'}
                  </button>
                  {!isSignUp && (
                    <button
                      type="button"
                      onClick={() => setShowForgotPassword(true)}
                      className="text-blue-600 hover:underline"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
              </form>
            )}
          </TabsContent>

          {/* Phone Sign-In */}
          <TabsContent value="phone" className="space-y-4">
            <form onSubmit={handlePhoneSignIn} className="space-y-4">
              {!confirmationResult ? (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+91 9876543210"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      required
                    />
                    <div className="text-xs text-gray-500 space-y-1">
                      <p>Include country code. Examples:</p>
                      <ul className="list-disc list-inside pl-2 space-y-0.5">
                        <li>India: +91 9876543210</li>
                        <li>USA: +1 2345678900</li>
                        <li>UK: +44 7700900000</li>
                      </ul>
                    </div>
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Sending code...
                      </>
                    ) : (
                      <>
                        <Phone className="w-4 h-4 mr-2" />
                        Send Verification Code
                      </>
                    )}
                  </Button>
                </>
              ) : (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="code">Verification Code</Label>
                    <Input
                      id="code"
                      type="text"
                      placeholder="123456"
                      value={verificationCode}
                      onChange={(e) => {
                        // Only allow numbers and limit to 6 digits
                        const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                        setVerificationCode(value);
                      }}
                      required
                      maxLength={6}
                      className="text-center text-2xl tracking-widest"
                    />
                    <p className="text-xs text-gray-500">
                      Enter the 6-digit code sent to {phoneNumber}
                    </p>
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading || verificationCode.length !== 6}>
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      'Verify Code'
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setConfirmationResult(null);
                      setVerificationCode('');
                    }}
                  >
                    Use Different Number
                  </Button>
                </>
              )}
            </form>
          </TabsContent>
        </Tabs>

        {/* reCAPTCHA container (invisible) */}
        <div id="recaptcha-container"></div>

        {/* Error message */}
        {error && (
          <div className={`p-3 rounded-lg text-sm ${
            error.includes('sent') || error.includes('Sent') 
              ? 'bg-green-50 text-green-700 border border-green-200' 
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}>
            {error}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
