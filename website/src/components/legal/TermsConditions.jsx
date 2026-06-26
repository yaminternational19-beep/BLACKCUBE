'use client';

import { Card } from "../ui/Card";

export default function TermsConditions() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <section className="relative overflow-hidden py-8 md:py-10">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto px-5 lg:px-8">
          <Card
            hover
            className="rounded-2xl p-6 md:p-8 transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.03)] hover:shadow-[0_0_25px_rgba(255,255,255,0.08)] border-0">
            
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Terms & Conditions</h1>
            <p className="text-gray-400">Effective as of {new Date().getFullYear()}</p>
          </Card>
        </div>
      </section>

      {/* Acceptance */}
      <section className="relative overflow-hidden py-6">
        <div className="absolute inset-0 bg-gradient-to-bl from-black via-gray-900 to-black pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto px-5 lg:px-8">
          <Card
            hover
            className="rounded-2xl p-6 md:p-8 transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.03)] hover:shadow-[0_0_25px_rgba(255,255,255,0.08)] border-0">
            
            <h2 className="text-xl font-semibold text-white mb-3">Acceptance of Terms</h2>
            <p className="text-gray-300">
              By using our website, you agree to these Terms. If you do not agree, please do not use the site.
            </p>
          </Card>
        </div>
      </section>

      {/* Use of Site */}
      <section className="relative overflow-hidden py-6">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto px-5 lg:px-8">
          <Card
            hover
            className="rounded-2xl p-6 md:p-8 transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.03)] hover:shadow-[0_0_25px_rgba(255,255,255,0.08)] border-0">
            
            <h2 className="text-xl font-semibold text-white mb-3">Use of Site</h2>
            <ul className="list-disc list-inside space-y-1 text-gray-400">
              <li>Do not interfere with or disrupt the site or its services.</li>
              <li>Do not attempt to access data without authorization.</li>
              <li>Provide accurate information when submitting forms.</li>
            </ul>
          </Card>
        </div>
      </section>

      {/* Intellectual Property */}
      <section className="relative overflow-hidden py-6">
        <div className="absolute inset-0 bg-gradient-to-bl from-black via-gray-900 to-black pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto px-5 lg:px-8">
          <Card
            hover
            className="rounded-2xl p-6 md:p-8 transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.03)] hover:shadow-[0_0_25px_rgba(255,255,255,0.08)] border-0">
            
            <h2 className="text-xl font-semibold text-white mb-3">Intellectual Property</h2>
            <p className="text-gray-400">
              All content and trademarks are owned by BlackCube or its licensors and protected by applicable laws.
            </p>
          </Card>
        </div>
      </section>

      {/* Liability & Disclaimers */}
      <section className="relative overflow-hidden py-6">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto px-5 lg:px-8">
          <Card
            hover
            className="rounded-2xl p-6 md:p-8 transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.03)] hover:shadow-[0_0_25px_rgba(255,255,255,0.08)] border-0">
            
            <h2 className="text-xl font-semibold text-white mb-3">Liability & Disclaimers</h2>
            <p className="text-gray-400">
              The site is provided "as is" without warranties. We are not liable for indirect or consequential damages.
            </p>
          </Card>
        </div>
      </section>

      {/* Changes & Contact */}
      <section className="relative overflow-hidden py-8">
        <div className="absolute inset-0 bg-gradient-to-bl from-black via-gray-900 to-black pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto px-5 lg:px-8">
          <Card
            hover
            className="rounded-2xl p-6 md:p-8 transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.03)] hover:shadow-[0_0_25px_rgba(255,255,255,0.08)] border-0">
            
            <h2 className="text-xl font-semibold text-white mb-3">Changes</h2>
            <p className="text-gray-400 mb-5">
              We may update these terms at any time. Continued use indicates acceptance of changes.
            </p>
            <h2 className="text-xl font-semibold text-white mb-3">Contact</h2>
            <p className="text-gray-400">For questions regarding these Terms, please contact us.</p>
          </Card>
        </div>
      </section>
    </div>);

}