"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { GraduationCap, Shield, Award } from "lucide-react";
import NavBar from "./components/NavBar";
import ErrorBoundary from "./components/ErrorBoundary";

import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";

const App: React.FC = () => {
  const [isWalletModalOpen, setWalletModalOpen] = useState<boolean>(false);

  // Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const buttonHover = {
    hover: { scale: 1.05 },
  };

  // Features Section Component
  const Features: React.FC = () => (
    <motion.section
      className="relative z-20 w-full -mt-20 flex justify-center"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 max-w-5xl px-6">
        <FeatureCard
          icon={<Shield className="h-8 w-8 text-indigo-600" strokeWidth={1.5} />}
          title="Secure Verification"
          description="Blockchain-powered certificates that cannot be forged or tampered with."
        />
        <FeatureCard
          icon={<Award className="h-8 w-8 text-indigo-600" strokeWidth={1.5} />}
          title="Digital Certificates"
          description="Issue and manage digital certificates as unique NFTs for each class completion."
        />
        <FeatureCard
          icon={<GraduationCap className="h-8 w-8 text-indigo-600" strokeWidth={1.5} />}
          title="Student Portal"
          description="Easy-to-use dashboard for students to access and share their achievements."
        />
      </div>
    </motion.section>
  );

  // FeatureCard Component
  const FeatureCard: React.FC<{
    icon: React.ReactNode;
    title: string;
    description: string;
  }> = ({ icon, title, description }) => (
    <motion.div
      className="group relative flex flex-col items-center text-center p-8 rounded-2xl bg-white border border-gray-100 hover:border-indigo-500 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-200 transform hover:-translate-y-4"
      variants={fadeInUp}
    >
      <div className="p-4 rounded-full bg-indigo-50 group-hover:bg-indigo-100 transition-colors">
        {icon}
      </div>
      <h3 className="mt-6 text-xl font-semibold text-gray-900">{title}</h3>
      <p className="mt-4 text-gray-600">{description}</p>
    </motion.div>
  );

  // Hero Section Component
  const Hero: React.FC = () => (
    <motion.section
      className="relative flex flex-col justify-center items-center bg-gradient-to-b from-indigo-600 to-violet-600 text-white w-full"
      style={{ height: "calc(100vh - 80px)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="absolute inset-0 bg-opacity-50 bg-indigo-700 mix-blend-multiply"></div>
      <motion.div
        className="relative z-10 text-center px-6"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-4xl font-bold sm:text-5xl md:text-6xl bg-gradient-to-r from-indigo-400 to-violet-500 bg-clip-text text-transparent"
          variants={fadeInUp}
        >
          The Future of Academic Credentials
        </motion.h1>
        <motion.p
          className="mt-4 text-base sm:text-lg md:text-xl text-gray-200"
          variants={fadeInUp}
        >
          Transform your academic certificates into secure, verifiable digital assets.
          Join the revolution in educational certification.
        </motion.p>
        <motion.div
          className="mt-6"
          variants={fadeInUp}
          whileHover="hover"
        >
          <motion.button
            className="px-6 py-3 text-lg font-medium rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={() => setWalletModalOpen(true)}
            variants={buttonHover}
          >
            Get Started
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.section>
  );

  return (
    <ErrorBoundary>
      <DynamicContextProvider
        settings={{
          environmentId: "bbc8819d-f94e-4f1e-8969-460a2361b06b",
          walletConnectors: [EthereumWalletConnectors],
        }}
      >
        <div className="flex flex-col min-h-screen bg-gray-50">
          <NavBar onConnectWallet={() => setWalletModalOpen(true)} />
          <Hero />
          <Features />
        </div>
      </DynamicContextProvider>
    </ErrorBoundary>
  );
};

export default App;
