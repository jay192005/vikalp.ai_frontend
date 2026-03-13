import { useState } from "react";
import { LandingPage } from "./components/landing-page";
import { Dashboard } from "./components/dashboard";
import { AuthProvider, useAuth } from "../contexts/AuthContext";

function AppContent() {
  const [currentScreen, setCurrentScreen] = useState<"landing" | "dashboard">("landing");
  const { currentUser } = useAuth();

  const handleStartPrediction = () => {
    // Only allow access to dashboard if user is signed in
    if (currentUser) {
      setCurrentScreen("dashboard");
    } else {
      // User will be prompted to sign in via the landing page
      // The landing page will handle showing the sign-in prompt
      console.log("User must sign in first");
    }
  };

  return (
    <div className="size-full">
      {currentScreen === "landing" ? (
        <LandingPage onStartPrediction={handleStartPrediction} />
      ) : (
        <Dashboard onBack={() => setCurrentScreen("landing")} />
      )}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
