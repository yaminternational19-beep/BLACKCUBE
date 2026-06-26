'use client';

import { Card } from "../ui/Card";

export default function CookiePolicy() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <section className="relative overflow-hidden py-8 md:py-10">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto px-5 lg:px-8">
          <Card hover className="rounded-2xl p-6 md:p-8 shadow-[0_0_15px_rgba(255,255,255,0.03)] hover:shadow-[0_0_25px_rgba(255,255,255,0.08)] border-0 transition-all duration-300">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Cookie Policy</h1>
            <p className="text-gray-400">Effective as of {new Date().getFullYear()}</p>
          </Card>
        </div>
      </section>

      {/* What are Cookies */}
      <section className="relative overflow-hidden py-6">
        <div className="absolute inset-0 bg-gradient-to-bl from-black via-gray-900 to-black pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto px-5 lg:px-8">
          <Card hover className="rounded-2xl p-6 md:p-8 shadow-[0_0_15px_rgba(255,255,255,0.03)] hover:shadow-[0_0_25px_rgba(255,255,255,0.08)] border-0 transition-all duration-300">
            <h2 className="text-xl font-semibold text-white mb-3">What Are Cookies?</h2>
            <p className="text-gray-300">
              Cookies are small text files stored on your device when you visit a website. They help us improve your experience and understand site usage.
            </p>
          </Card>
        </div>
      </section>

      {/* Types of Cookies */}
      <section className="relative overflow-hidden py-6">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto px-5 lg:px-8">
          <Card hover className="rounded-2xl p-6 md:p-8 shadow-[0_0_15px_rgba(255,255,255,0.03)] hover:shadow-[0_0_25px_rgba(255,255,255,0.08)] border-0 transition-all duration-300">
            <h2 className="text-xl font-semibold text-white mb-3">Types of Cookies We Use</h2>
            <ul className="list-disc list-inside space-y-1 text-gray-400">
              <li>Essential Cookies – necessary for core site functionality.</li>
              <li>Analytics Cookies – help us understand user behavior.</li>
              <li>Preference Cookies – remember your settings and choices.</li>
            </ul>
          </Card>
        </div>
      </section>

      {/* Managing Cookies */}
      <section className="relative overflow-hidden py-6">
        <div className="absolute inset-0 bg-gradient-to-bl from-black via-gray-900 to-black pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto px-5 lg:px-8">
          <Card hover className="rounded-2xl p-6 md:p-8 shadow-[0_0_15px_rgba(255,255,255,0.03)] hover:shadow-[0_0_25px_rgba(255,255,255,0.08)] border-0 transition-all duration-300">
            <h2 className="text-xl font-semibold text-white mb-3">Managing Cookies</h2>
            <p className="text-gray-400">
              You can manage or delete cookies through your browser settings. Disabling cookies may affect certain website functions.
            </p>
          </Card>
        </div>
      </section>

      {/* Updates */}
      <section className="relative overflow-hidden py-8">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto px-5 lg:px-8">
          <Card hover className="rounded-2xl p-6 md:p-8 shadow-[0_0_15px_rgba(255,255,255,0.03)] hover:shadow-[0_0_25px_rgba(255,255,255,0.08)] border-0 transition-all duration-300">
            <h2 className="text-xl font-semibold text-white mb-3">Updates to This Policy</h2>
            <p className="text-gray-400 mb-3">
              We may update this Cookie Policy occasionally. Continued use of our website indicates acceptance of any changes.
            </p>
            <h2 className="text-xl font-semibold text-white mb-3">Contact</h2>
            <p className="text-gray-400">If you have any questions, please reach out to us.</p>
          </Card>
        </div>
      </section>
    </div>);

}