import { Rocket } from "lucide-react";
import { Button } from "./ui/button";
import { TrendingUp, BarChart3, Globe, Brain, Shield, Zap } from "lucide-react";
import { GrowthCalculator } from "./growth-calculator";
import { SignInButton } from "./auth/SignInButton";
import { UserProfile } from "./auth/UserProfile";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";
import { SignInModal } from "./auth/SignInModal";

interface LandingPageProps {
  onStartPrediction: () => void;
}

export function LandingPage({ onStartPrediction }: LandingPageProps) {
  const { currentUser } = useAuth();
  const [showSignInModal, setShowSignInModal] = useState(false);

  const handleStartPrediction = () => {
    if (currentUser) {
      // User is signed in, proceed to dashboard
      onStartPrediction();
    } else {
      // User is not signed in, show sign-in modal
      setShowSignInModal(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] relative overflow-hidden">
      {/* Abstract background graphics */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#10b981] rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-1/3 w-72 h-72 bg-purple-500 rounded-full blur-3xl"></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>

      {/* Navigation Bar */}
      <nav className="relative z-20 px-8 py-6 flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-[#10b981] to-[#059669] rounded-lg flex items-center justify-center">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          <span className="text-white text-xl">Vikalp.ai</span>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-6 text-gray-300">
            <a href="#features" className="hover:text-[#10b981] transition-colors">Features</a>
            <a href="#calculator" className="hover:text-[#10b981] transition-colors">Calculator</a>
            <a href="#how-it-works" className="hover:text-[#10b981] transition-colors">How It Works</a>
          </div>
          {currentUser ? (
            <UserProfile />
          ) : (
            <SignInButton 
              variant="outline" 
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            />
          )}
        </div>
      </nav>

      <div className="relative z-10 px-6 pb-20">
        {/* Hero Section */}
        <div className="text-center max-w-5xl mx-auto pt-16 pb-24">
          <div className="mb-6">
            <span className="inline-block text-[#10b981] mb-2 tracking-widest text-sm px-4 py-2 bg-[#10b981]/10 rounded-full border border-[#10b981]/30">
              AI-POWERED ANALYTICS
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl text-white mb-8 tracking-tight leading-tight">
            Predict the Future of <br />
            <span className="bg-gradient-to-r from-[#10b981] to-[#34d399] bg-clip-text text-transparent">
              Global Economies
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Leverage Machine Learning to detect GDP growth trends based on real-time economic indicators.
          </p>

          <Button
            onClick={handleStartPrediction}
            className="bg-[#10b981] hover:bg-[#059669] text-white px-12 py-8 rounded-full shadow-2xl shadow-[#10b981]/30 transition-all duration-300 hover:scale-105 hover:shadow-[#10b981]/50 group"
          >
            <span className="flex items-center gap-3">
              <span className="text-xl">
                {currentUser ? "Start Prediction" : "Sign In to Start"}
              </span>
              <Rocket className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </span>
          </Button>

          <SignInModal
            isOpen={showSignInModal}
            onClose={() => setShowSignInModal(false)}
            onSuccess={() => {
              setShowSignInModal(false);
              onStartPrediction();
            }}
          />

          {/* Trust Indicators */}
          <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-gray-400 text-sm">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#10b981]" />
              <span>Enterprise-Grade Security</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#10b981]" />
              <span>Real-Time Analysis</span>
            </div>
            <div className="flex items-center gap-2">
              <Brain className="w-4 h-4 text-[#10b981]" />
              <span>Advanced ML Models</span>
            </div>
          </div>

          {/* Authentication Notice */}
          {!currentUser && (
            <div className="mt-8 p-4 bg-[#10b981]/10 border border-[#10b981]/30 rounded-lg max-w-md mx-auto">
              <p className="text-[#10b981] text-sm text-center">
                🔒 Sign in with Google to access the prediction dashboard
              </p>
            </div>
          )}
        </div>

        {/* Stats Section */}
        <div className="max-w-6xl mx-auto mb-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
              <div className="text-5xl mb-4 text-[#10b981]">50+</div>
              <div className="text-white text-lg mb-2">Years of Data</div>
              <div className="text-gray-400 text-sm">Historical economic data from 1973 to present</div>
            </div>
            <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
              <div className="text-5xl mb-4 text-[#10b981]">203</div>
              <div className="text-white text-lg mb-2">Countries Covered</div>
              <div className="text-gray-400 text-sm">Global coverage across all major economies</div>
            </div>
            <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
              <div className="text-5xl mb-4 text-[#10b981]">~90%</div>
              <div className="text-white text-lg mb-2">Prediction Accuracy</div>
              <div className="text-gray-400 text-sm">Validated against real-world economic outcomes</div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div id="features" className="max-w-6xl mx-auto mb-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl text-white mb-4">Powerful Features</h2>
            <p className="text-gray-400 text-lg">Everything you need to forecast economic growth with confidence</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-8 border border-white/10 group hover:border-[#10b981]/50 transition-all">
              <div className="w-12 h-12 bg-[#10b981]/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#10b981]/30 transition-all">
                <Brain className="w-6 h-6 text-[#10b981]" />
              </div>
              <h3 className="text-white text-xl mb-3">AI-Powered Predictions</h3>
              <p className="text-gray-400">Advanced machine learning algorithms analyze complex economic patterns to deliver accurate forecasts</p>
            </div>

            <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-8 border border-white/10 group hover:border-[#10b981]/50 transition-all">
              <div className="w-12 h-12 bg-[#10b981]/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#10b981]/30 transition-all">
                <TrendingUp className="w-6 h-6 text-[#10b981]" />
              </div>
              <h3 className="text-white text-xl mb-3">Real-Time Analysis</h3>
              <p className="text-gray-400">Get instant predictions based on current economic indicators and market conditions</p>
            </div>

            <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-8 border border-white/10 group hover:border-[#10b981]/50 transition-all">
              <div className="w-12 h-12 bg-[#10b981]/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#10b981]/30 transition-all">
                <Globe className="w-6 h-6 text-[#10b981]" />
              </div>
              <h3 className="text-white text-xl mb-3">Global Coverage</h3>
              <p className="text-gray-400">Access forecasts for nearly every country worldwide with region-specific insights</p>
            </div>

            <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-8 border border-white/10 group hover:border-[#10b981]/50 transition-all">
              <div className="w-12 h-12 bg-[#10b981]/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#10b981]/30 transition-all">
                <BarChart3 className="w-6 h-6 text-[#10b981]" />
              </div>
              <h3 className="text-white text-xl mb-3">Interactive Charts</h3>
              <p className="text-gray-400">Visualize historical trends and future projections with intuitive, interactive graphs</p>
            </div>

            <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-8 border border-white/10 group hover:border-[#10b981]/50 transition-all">
              <div className="w-12 h-12 bg-[#10b981]/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#10b981]/30 transition-all">
                <Shield className="w-6 h-6 text-[#10b981]" />
              </div>
              <h3 className="text-white text-xl mb-3">Data Security</h3>
              <p className="text-gray-400">Enterprise-grade security ensures your data and predictions remain confidential</p>
            </div>

            <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-8 border border-white/10 group hover:border-[#10b981]/50 transition-all">
              <div className="w-12 h-12 bg-[#10b981]/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#10b981]/30 transition-all">
                <Zap className="w-6 h-6 text-[#10b981]" />
              </div>
              <h3 className="text-white text-xl mb-3">Lightning Fast</h3>
              <p className="text-gray-400">Process complex economic models in seconds with optimized computation</p>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div id="how-it-works" className="max-w-6xl mx-auto mb-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl text-white mb-4">How It Works</h2>
            <p className="text-gray-400 text-lg">Simple process, powerful results</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative">
              <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-8 border border-white/10">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-[#10b981] to-[#059669] rounded-full flex items-center justify-center text-white text-xl shadow-lg">
                  1
                </div>
                <h3 className="text-white text-xl mb-3 mt-4">Select Country</h3>
                <p className="text-gray-400">Choose from 203 countries to analyze their economic trajectory and growth potential</p>
              </div>
            </div>

            <div className="relative">
              <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-8 border border-white/10">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-[#10b981] to-[#059669] rounded-full flex items-center justify-center text-white text-xl shadow-lg">
                  2
                </div>
                <h3 className="text-white text-xl mb-3 mt-4">Input Indicators</h3>
                <p className="text-gray-400">Enter key economic metrics like population growth, exports, imports, investment, and consumption</p>
              </div>
            </div>

            <div className="relative">
              <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-8 border border-white/10">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-[#10b981] to-[#059669] rounded-full flex items-center justify-center text-white text-xl shadow-lg">
                  3
                </div>
                <h3 className="text-white text-xl mb-3 mt-4">Get Predictions</h3>
                <p className="text-gray-400">Receive AI-powered GDP forecasts with visual trends and confidence metrics instantly</p>
              </div>
            </div>
          </div>
        </div>

        {/* Growth Rate Calculator Section */}
        <GrowthCalculator />

        {/* CTA Section */}
        <div className="max-w-4xl mx-auto text-center">
          <div className="backdrop-blur-sm bg-gradient-to-r from-[#10b981]/20 to-[#059669]/20 rounded-3xl p-12 border border-[#10b981]/30">
            <h2 className="text-4xl text-white mb-4">Ready to Forecast the Future?</h2>
            <p className="text-gray-300 text-lg mb-8">Start making data-driven economic predictions in seconds</p>
            <Button
              onClick={handleStartPrediction}
              className="bg-[#10b981] hover:bg-[#059669] text-white px-10 py-6 rounded-full shadow-2xl shadow-[#10b981]/30 transition-all duration-300 hover:scale-105 group"
            >
              <span className="flex items-center gap-3 text-lg">
                <span>
                  {currentUser ? "Launch Dashboard" : "Sign In to Launch"}
                </span>
                <Rocket className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 mt-20">
        <div className="max-w-6xl mx-auto px-8 py-8 flex flex-col md:flex-row items-center justify-between text-gray-500 text-sm">
          <div>© 2026 Vikalp.ai. All rights reserved.</div>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-[#10b981] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#10b981] transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-[#10b981] transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}