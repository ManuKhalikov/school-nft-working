import React, { useState } from "react";
import {
  useDynamicContext,
  DynamicWidget,
} from "@dynamic-labs/sdk-react-core";
import { Book, GraduationCap, School, LogIn } from "lucide-react";

interface NavigationProps {
  onConnectWallet: () => void;
}

const NavBar: React.FC<NavigationProps> = ({ onConnectWallet }) => {
  const [userRole, setUserRole] = useState<string | null>(null);
  const { primaryWallet, user } = useDynamicContext();

  console.log("Primary Wallet:", primaryWallet);
  console.log("User:", user);

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Left Section: Logo */}
          <div className="flex items-center">
            <Book className="h-8 w-8 text-indigo-600" strokeWidth={1.5} />
            <a
              href="/"
              className="ml-2 text-xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 text-transparent bg-clip-text"
            >
              EduChain
            </a>
          </div>

          {/* Right Section: Navigation and Wallet */}
          <div className="flex items-center space-x-6">
            {/* Conditional Role Selection Buttons */}
            {(primaryWallet || user) && !userRole && (
              <>
                <button
                  className="flex items-center px-4 py-2 rounded-full bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
                  onClick={() => setUserRole("student")}
                >
                  <GraduationCap className="h-4 w-4 mr-2" />
                  Sign up as Student
                </button>
                <button
                  className="flex items-center px-4 py-2 rounded-full bg-violet-600 text-white hover:bg-violet-700 transition-colors"
                  onClick={() => setUserRole("school")}
                >
                  <School className="h-4 w-4 mr-2" />
                  Sign up as School
                </button>
              </>
            )}

            {/* Student Dashboard Link */}
            {userRole === "student" && (
              <a
                href="/StudentDash"
                className="flex items-center px-4 py-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
              >
                <GraduationCap className="h-4 w-4 mr-2" />
                Dashboard
              </a>
            )}

            {/* School Dashboard Link */}
            {userRole === "school" && (
              <a
                href="/SchoolDash"
                className="flex items-center px-4 py-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
              >
                <School className="h-4 w-4 mr-2" />
                School Dashboard
              </a>
            )}

            {/* Wallet DynamicWidget */}
            <div className="ml-4">
              <DynamicWidget />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
