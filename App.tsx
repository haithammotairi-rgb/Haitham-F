import React, { useState, useCallback } from 'react';
import { Armchair, Sparkles, Loader2, BrainCircuit } from 'lucide-react';
import { FormInput } from './components/FormInput';
import { FormSelect } from './components/FormSelect';
import { generateMockProfile, analyzeProfile } from './services/geminiService';
import { CustomerProfile, AiInsight } from './types';

const INITIAL_STATE: CustomerProfile = {
  currentDate: new Date().toISOString().split('T')[0],
  customerId: '',
  lastName: '',
  firstName: '',
  address: '',
  city: '',
  state: '',
  zip: '',
  isFirstTimeCustomer: 'N',
  visitsBeforePurchasing: '',
  hearAboutSource: '',
  firstPurchaseDate: '',
  avgYearlySpend: '',
  monthlyStoreVisits: '',
};

const App: React.FC = () => {
  const [formData, setFormData] = useState<CustomerProfile>(INITIAL_STATE);
  const [isLoading, setIsLoading] = useState(false);
  const [insights, setInsights] = useState<AiInsight[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSmartFill = useCallback(async () => {
    setIsLoading(true);
    setInsights([]);
    try {
      const mockData = await generateMockProfile();
      setFormData(mockData);
    } catch (error) {
      console.error("Error generating profile:", error);
      alert("Failed to generate profile. Please ensure API Key is set.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleAnalyze = useCallback(async () => {
    setIsAnalyzing(true);
    try {
      const results = await analyzeProfile(formData);
      setInsights(results);
    } catch (error) {
      console.error("Error analyzing profile:", error);
    } finally {
      setIsAnalyzing(false);
    }
  }, [formData]);

  const handleReset = () => {
    setFormData(INITIAL_STATE);
    setInsights([]);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      {/* Control Bar */}
      <div className="max-w-5xl mx-auto mb-6 flex justify-end gap-3">
        <button
          onClick={handleSmartFill}
          disabled={isLoading}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition shadow-sm disabled:opacity-50"
        >
          {isLoading ? <Loader2 className="animate-spin h-4 w-4" /> : <Sparkles className="h-4 w-4" />}
          AI Smart Fill
        </button>
        <button
          onClick={handleReset}
          className="text-gray-600 hover:text-gray-900 px-4 py-2"
        >
          Reset Form
        </button>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form Section */}
        <div className="lg:col-span-2 bg-white shadow-2xl border-2 border-gray-900 rounded-sm overflow-hidden">
          
          {/* Form Header - Yellow Background */}
          <div className="bg-pvf-yellow border-b-4 border-gray-900 p-6 relative">
            <div className="absolute top-4 left-4 hidden sm:block">
              <Armchair className="h-12 w-12 text-gray-800" />
            </div>
            <div className="absolute top-4 right-4 hidden sm:block transform scale-x-[-1]">
              <Armchair className="h-12 w-12 text-gray-800" />
            </div>
            
            <div className="text-center space-y-2">
              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 tracking-wide">
                Pine Valley Furniture
              </h1>
              <h2 className="text-xl font-bold text-gray-800 uppercase tracking-wider">
                Customer Profile Form
              </h2>
            </div>

            <div className="mt-8 max-w-xs">
              <FormInput
                label="Current Date"
                id="currentDate"
                name="currentDate"
                type="date"
                value={formData.currentDate}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Form Body */}
          <div className="p-6 sm:p-8 space-y-8">
            
            {/* Section 1: Customer Profile */}
            <section>
              <h3 className="text-lg font-bold text-gray-900 mb-4 uppercase border-b border-gray-300 pb-1">
                Customer Profile
              </h3>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-6">
                  <div className="sm:col-span-4">
                    <FormInput
                      label="Customer ID"
                      id="customerId"
                      name="customerId"
                      value={formData.customerId}
                      onChange={handleInputChange}
                      placeholder="e.g. 1273"
                    />
                  </div>
                  <div className="sm:col-span-4">
                    <FormInput
                      label="Last Name"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="sm:col-span-4">
                    <FormInput
                      label="First Name"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6">
                   <FormInput
                      label="Address"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-6">
                   <div className="sm:col-span-6">
                    <FormInput
                      label="City"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                    />
                   </div>
                   <div className="sm:col-span-2">
                    <FormInput
                      label="State"
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      maxLength={2}
                      className="uppercase"
                    />
                   </div>
                   <div className="sm:col-span-4">
                    <FormInput
                      label="Zip"
                      id="zip"
                      name="zip"
                      value={formData.zip}
                      onChange={handleInputChange}
                    />
                   </div>
                </div>
              </div>
            </section>

            <div className="border-t-4 border-gray-900 my-8"></div>

            {/* Section 2: Purchasing/Media Profile */}
            <section>
              <h3 className="text-lg font-bold text-gray-900 mb-4 uppercase border-b border-gray-300 pb-1">
                Purchasing/Media Profile
              </h3>

              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-12">
                   <FormSelect
                    label="First Time Customer?"
                    id="isFirstTimeCustomer"
                    name="isFirstTimeCustomer"
                    value={formData.isFirstTimeCustomer}
                    onChange={handleInputChange}
                    options={[
                      { value: 'Y', label: 'Yes (Y)' },
                      { value: 'N', label: 'No (N)' }
                    ]}
                   />
                   <FormInput
                    label="No. of Visits before Purchasing"
                    id="visitsBeforePurchasing"
                    name="visitsBeforePurchasing"
                    type="number"
                    value={formData.visitsBeforePurchasing}
                    onChange={handleInputChange}
                   />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-12">
                  <FormInput
                    label="How did you hear about PVF?"
                    id="hearAboutSource"
                    name="hearAboutSource"
                    value={formData.hearAboutSource}
                    onChange={handleInputChange}
                   />
                   <FormInput
                    label="First Purchase Date"
                    id="firstPurchaseDate"
                    name="firstPurchaseDate"
                    type="date"
                    value={formData.firstPurchaseDate}
                    onChange={handleInputChange}
                   />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-12">
                   <FormInput
                    label="Avg Yearly Amount Spent at PVF"
                    id="avgYearlySpend"
                    name="avgYearlySpend"
                    type="number"
                    value={formData.avgYearlySpend}
                    onChange={handleInputChange}
                    placeholder="$"
                   />
                   <FormInput
                    label="No. of Monthly Store Visits"
                    id="monthlyStoreVisits"
                    name="monthlyStoreVisits"
                    type="number"
                    value={formData.monthlyStoreVisits}
                    onChange={handleInputChange}
                   />
                </div>
              </div>
            </section>

          </div>
        </div>

        {/* Sidebar for AI Insights */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <BrainCircuit className="text-purple-600" />
              <h3 className="font-bold text-gray-800">Intelligence Hub</h3>
            </div>
            
            <p className="text-sm text-gray-600 mb-4">
              Use Gemini AI to analyze the customer profile and discover potential sales opportunities or churn risks.
            </p>

            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing || !formData.lastName}
              className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition disabled:opacity-50 flex justify-center items-center gap-2"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="animate-spin h-4 w-4" /> Analyzing...
                </>
              ) : (
                "Analyze Profile"
              )}
            </button>
          </div>

          {insights.length > 0 && (
            <div className="space-y-4">
              {insights.map((insight, idx) => (
                <div 
                  key={idx} 
                  className={`p-4 rounded-lg border-l-4 shadow-sm bg-white ${
                    insight.type === 'opportunity' ? 'border-green-500' : 
                    insight.type === 'risk' ? 'border-red-500' : 'border-blue-500'
                  }`}
                >
                  <h4 className="font-bold text-gray-800 text-sm mb-1">{insight.title}</h4>
                  <p className="text-xs text-gray-600 leading-relaxed">{insight.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
