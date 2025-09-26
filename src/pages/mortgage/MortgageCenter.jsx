import React, { useState } from 'react';
import { CurrencyDollarIcon, CalculatorIcon, ChartBarIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

const MortgageCenter = () => {
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTerm, setLoanTerm] = useState('');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Mortgage Center</h1>
            <p className="text-xl text-purple-100 mb-8 max-w-3xl mx-auto">
              Get the best mortgage rates and calculate your payments. 
              Find the perfect loan for your dream home.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Get Pre-approved
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors">
                Calculate Payment
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Mortgage Calculator */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <CalculatorIcon className="h-6 w-6 mr-2 text-blue-500" />
            Mortgage Calculator
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label htmlFor="loan-amount" className="block text-sm font-medium text-gray-700 mb-2">Loan Amount</label>
              <div className="relative">
                <CurrencyDollarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="loan-amount"
                  type="number"
                  placeholder="500,000"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label htmlFor="interest-rate" className="block text-sm font-medium text-gray-700 mb-2">Interest Rate (%)</label>
              <input
                id="interest-rate"
                type="number"
                placeholder="6.5"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="loan-term" className="block text-sm font-medium text-gray-700 mb-2">Loan Term (years)</label>
              <select
                id="loan-term"
                value={loanTerm}
                onChange={(e) => setLoanTerm(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Term</option>
                <option value="15">15 years</option>
                <option value="20">20 years</option>
                <option value="25">25 years</option>
                <option value="30">30 years</option>
              </select>
            </div>
          </div>
          <button className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
            Calculate Payment
          </button>
        </div>

        {/* Current Rates */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <ChartBarIcon className="h-6 w-6 mr-2 text-green-500" />
              Current Mortgage Rates
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <span className="font-semibold">30-Year Fixed</span>
                <span className="text-2xl font-bold text-green-600">6.25%</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <span className="font-semibold">15-Year Fixed</span>
                <span className="text-2xl font-bold text-blue-600">5.75%</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                <span className="font-semibold">5/1 ARM</span>
                <span className="text-2xl font-bold text-purple-600">5.50%</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">Mortgage Tools</h3>
            <div className="space-y-4">
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors">
                <DocumentTextIcon className="h-5 w-5 inline mr-2" />
                Pre-approval Application
              </button>
              <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors">
                <CalculatorIcon className="h-5 w-5 inline mr-2" />
                Affordability Calculator
              </button>
              <button className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors">
                <ChartBarIcon className="h-5 w-5 inline mr-2" />
                Rate Comparison
              </button>
            </div>
          </div>
        </div>

        {/* Mortgage Types */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Mortgage Types</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-2">Conventional Loans</h3>
              <p className="text-gray-600 mb-4">Traditional mortgages with competitive rates</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 3% down payment minimum</li>
                <li>• No PMI with 20% down</li>
                <li>• Flexible terms</li>
              </ul>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-2">FHA Loans</h3>
              <p className="text-gray-600 mb-4">Government-backed loans for first-time buyers</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 3.5% down payment</li>
                <li>• Lower credit requirements</li>
                <li>• PMI required</li>
              </ul>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-2">VA Loans</h3>
              <p className="text-gray-600 mb-4">Special loans for veterans and military</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• No down payment required</li>
                <li>• No PMI</li>
                <li>• Competitive rates</li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-blue-600 rounded-lg p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Ready to Get Pre-approved?</h2>
          <p className="mb-6">Start your mortgage application today and get pre-approved in minutes</p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default MortgageCenter;
