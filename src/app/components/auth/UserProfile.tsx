import { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { Button } from '../ui/button';
import { LogOut, User, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function UserProfile() {
  const { currentUser, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  if (!currentUser) return null;

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      // Redirect will happen automatically via auth state change
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoggingOut(false);
      setIsOpen(false);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white/10 transition-colors"
      >
        {currentUser.photoURL ? (
          <img
            src={currentUser.photoURL}
            alt={currentUser.displayName || 'User'}
            className="w-8 h-8 rounded-full border-2 border-[#10b981]"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-[#10b981] flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
        )}
        <div className="text-left hidden md:block">
          <p className="text-sm font-medium text-white">
            {currentUser.displayName || 'User'}
          </p>
          <p className="text-xs text-gray-400">
            {currentUser.email}
          </p>
        </div>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Dropdown Menu */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50"
            >
              <div className="p-4 bg-gradient-to-br from-[#10b981]/10 to-[#059669]/10 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  {currentUser.photoURL ? (
                    <img
                      src={currentUser.photoURL}
                      alt={currentUser.displayName || 'User'}
                      className="w-12 h-12 rounded-full border-2 border-[#10b981]"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-[#10b981] flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 truncate">
                      {currentUser.displayName || 'User'}
                    </p>
                    <p className="text-sm text-gray-600 truncate">
                      {currentUser.email}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-2">
                <Button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  variant="ghost"
                  className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  {isLoggingOut ? (
                    <>
                      <div className="w-4 h-4 mr-2 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                      Signing out...
                    </>
                  ) : (
                    <>
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </>
                  )}
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
