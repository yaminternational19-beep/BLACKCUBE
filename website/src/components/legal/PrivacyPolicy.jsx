'use client';

import { Card } from "../ui/Card";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <section className="relative overflow-hidden py-8 md:py-10">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto px-5 lg:px-8">
          <Card hover className="rounded-2xl p-6 md:p-8 shadow-[0_0_15px_rgba(255,255,255,0.03)] hover:shadow-[0_0_25px_rgba(255,255,255,0.08)] border-0 transition-all duration-300">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Privacy Policy</h1>
            <p className="text-gray-400">Effective as of {new Date().getFullYear()}</p>
          </Card>
        </div>
      </section>

      {/* Introduction */}
      <section className="relative overflow-hidden py-6">
        <div className="absolute inset-0 bg-gradient-to-bl from-black via-gray-900 to-black pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto px-5 lg:px-8">
          <Card hover className="rounded-2xl p-6 md:p-8 shadow-[0_0_15px_rgba(255,255,255,0.03)] hover:shadow-[0_0_25px_rgba(255,255,255,0.08)] border-0 transition-all duration-300">
            <h2 className="text-xl font-semibold text-white mb-3">Introduction</h2>
            <p className="text-gray-300">
              We value your privacy. This policy explains how we collect, use, and protect your personal data when you interact with our website and services.
            </p>
          </Card>
        </div>
      </section>

      {/* Information Collection */}
      <section className="relative overflow-hidden py-6">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto px-5 lg:px-8">
          <Card hover className="rounded-2xl p-6 md:p-8 shadow-[0_0_15px_rgba(255,255,255,0.03)] hover:shadow-[0_0_25px_rgba(255,255,255,0.08)] border-0 transition-all duration-300">
            <h2 className="text-xl font-semibold text-white mb-3">Information We Collect</h2>
            <ul className="list-disc list-inside space-y-1 text-gray-400">
              <li>Personal details (name, email, contact number)</li>
              <li>Usage data such as IP address and browser type</li>
              <li>Form submissions and communications</li>
            </ul>
          </Card>
        </div>
      </section>

      {/* Use of Information */}
      <section className="relative overflow-hidden py-6">
        <div className="absolute inset-0 bg-gradient-to-bl from-black via-gray-900 to-black pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto px-5 lg:px-8">
          <Card hover className="rounded-2xl p-6 md:p-8 shadow-[0_0_15px_rgba(255,255,255,0.03)] hover:shadow-[0_0_25px_rgba(255,255,255,0.08)] border-0 transition-all duration-300">
            <h2 className="text-xl font-semibold text-white mb-3">Use of Information</h2>
            <p className="text-gray-400">
              We use your data to provide services, respond to inquiries, improve our website, and send relevant updates (with your consent).
            </p>
          </Card>
        </div>
      </section>

      {/* Data Security */}
      <section className="relative overflow-hidden py-6">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto px-5 lg:px-8">
          <Card hover className="rounded-2xl p-6 md:p-8 shadow-[0_0_15px_rgba(255,255,255,0.03)] hover:shadow-[0_0_25px_rgba(255,255,255,0.08)] border-0 transition-all duration-300">
            <h2 className="text-xl font-semibold text-white mb-3">Data Security</h2>
            <p className="text-gray-400">
              We use reasonable administrative, technical, and physical measures to safeguard your information.
            </p>
          </Card>
        </div>
      </section>

      {/* Contact */}
      <section className="relative overflow-hidden py-8">
        <div className="absolute inset-0 bg-gradient-to-bl from-black via-gray-900 to-black pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto px-5 lg:px-8">
          <Card hover className="rounded-2xl p-6 md:p-8 shadow-[0_0_15px_rgba(255,255,255,0.03)] hover:shadow-[0_0_25px_rgba(255,255,255,0.08)] border-0 transition-all duration-300">
            <h2 className="text-xl font-semibold text-white mb-3">Contact</h2>
            <p className="text-gray-400">
              For any privacy-related inquiries, please contact us.
            </p>
          </Card>
        </div>
      </section>
    </div>);

}