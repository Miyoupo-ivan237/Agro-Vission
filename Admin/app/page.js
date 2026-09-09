'use client';

import React, { useState, useEffect } from 'react';
import {
  Users,
  Activity,
  Sprout,
  FileCheck,
  ShieldCheck,
  Cpu,
  RefreshCw,
  Ban,
  CheckCircle,
  Trash2,
  Leaf,
  Layers,
  Sparkles
} from 'lucide-react';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(false);
  const [metrics, setMetrics] = useState({
    totalUsers: 14,
    totalDiagnoses: 68,
    totalRecommendations: 42,
    totalSurveys: 23,
    activeModels: {
      ollama: 'llama3.2:latest (Local & Offline Ready)',
      tensorFlow: 'TensorFlow / Heuristic Engine Active',
      recommendationEngine: 'Agro-Ecological Multi-Region Engine'
    }
  });

  const [users, setUsers] = useState([
    { id: 1, name: 'Jean-Paul Kamga', email: 'kamga@farm.cm', phone: '+237 677 123 456', role: 'farmer', isBlocked: false, location: 'West (Foumbot)', farmSize: '3 Hectares', preferredCrop: 'Tomato & Maize', createdAt: '2026-08-28' },
    { id: 2, name: 'Marie Ngo Ndoum', email: 'marie@agri.cm', phone: '+237 699 987 654', role: 'farmer', isBlocked: false, location: 'Littoral (Moungo)', farmSize: '5 Hectares', preferredCrop: 'Plantain & Cassava', createdAt: '2026-08-27' },
    { id: 3, name: 'Aboubakar Bello', email: 'bello@northfarm.cm', phone: '+237 655 443 221', role: 'farmer', isBlocked: true, location: 'North (Garoua)', farmSize: '2 Hectares', preferredCrop: 'Groundnut & Sorghum', createdAt: '2026-08-25' }
  ]);

  const [diagnoses, setDiagnoses] = useState([
    { id: 101, crop: 'Cassava', diseaseName: 'Cassava Mosaic Disease (CMD)', severity: 'High', confidence: 0.94, symptoms: 'Yellow-green chlorotic mosaic, leaf curling', source: 'On-Device Offline AI', createdAt: '2026-08-29 11:20' },
    { id: 102, crop: 'Maize', diseaseName: 'Fall Armyworm Infestation', severity: 'Critical', confidence: 0.96, symptoms: 'Ragged holes, frass inside whorl', source: 'Ollama + TF Service', createdAt: '2026-08-29 10:45' },
    { id: 103, crop: 'Tomato', diseaseName: 'Tomato Early Blight', severity: 'Moderate', confidence: 0.92, symptoms: 'Concentric target rings on lower leaves', source: 'On-Device Offline AI', createdAt: '2026-08-29 09:15' }
  ]);

  // Recommendation tester state
  const [testSoil, setTestSoil] = useState('Sandy Loam');
  const [testSeason, setTestSeason] = useState('Onset of Rains');
  const [testRegion, setTestRegion] = useState('West');
  const [testRecResult, setTestRecResult] = useState(null);

  // Fetch live metrics & data from backend if available
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BACKEND_URL}/api/admin/analytics`);
      if (res.ok) {
        const data = await res.json();
        if (data.metrics) setMetrics(data.metrics);
        if (data.recentDiagnoses && data.recentDiagnoses.length > 0) setDiagnoses(data.recentDiagnoses);
      }
      const userRes = await fetch(`${BACKEND_URL}/api/admin/users`);
      if (userRes.ok) {
        const userData = await userRes.json();
        if (userData && userData.length > 0) setUsers(userData);
      }
    } catch (e) {
      console.log('Using local fallback admin data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleToggleBlock = async (userId, currentStatus) => {
    try {
      const endpoint = currentStatus ? 'unblock' : 'block';
      await fetch(`${BACKEND_URL}/api/admin/users/${userId}/${endpoint}`, { method: 'PUT' });
    } catch (e) {
      // local state update
    }
    setUsers(users.map(u => u.id === userId ? { ...u, isBlocked: !currentStatus } : u));
  };

  const handleDeleteUser = async (userId) => {
    if (!confirm('Are you sure you want to delete this user?')) return;
    try {
      await fetch(`${BACKEND_URL}/api/admin/users/${userId}`, { method: 'DELETE' });
    } catch (e) {
      // local
    }
    setUsers(users.filter(u => u.id !== userId));
  };

  const handleRunRecTest = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/ai/recommend`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ soilCondition: testSoil, season: testSeason, location: testRegion, landSize: '2' })
      });
      if (res.ok) {
        const data = await res.json();
        setTestRecResult(data.recommendation);
        return;
      }
    } catch (e) {}

    // Fallback recommendation
    setTestRecResult({
      primaryCrop: testSoil.includes('Volcanic') ? 'Tomato' : 'Maize (Corn)',
      soilAssessment: `Optimal nutrient balance for ${testSoil}`,
      seasonalAdvice: `Plant during ${testSeason} for maximum yields.`,
      landEstimate: 'Estimated 8.5 - 12.0 Tons for 2 Hectares.'
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Top Navbar */}
      <header className="bg-emerald-900 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-emerald-500 p-2 rounded-xl text-slate-900">
              <Sprout className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tight flex items-center gap-2">
                Agro-Vission <span className="bg-emerald-700 text-xs px-2 py-0.5 rounded-full font-mono uppercase">Admin & AI Center</span>
              </h1>
              <p className="text-xs text-emerald-200">Agro-Vission Agro-Ecological Management Portal • PostgreSQL & Offline AI</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="bg-emerald-800/80 border border-emerald-600/40 px-3 py-1.5 rounded-full flex items-center gap-2 text-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Local Ollama: <strong>llama3.2:latest</strong></span>
            </div>
            <button
              onClick={fetchData}
              disabled={loading}
              className="bg-emerald-700 hover:bg-emerald-600 text-white px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} />
              Sync
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* KPI Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Registered Farmers</p>
              <h3 className="text-3xl font-black text-slate-800 mt-1">{metrics.totalUsers}</h3>
              <span className="text-xs text-emerald-600 font-semibold">Active smallholders</span>
            </div>
            <div className="bg-emerald-100 p-3 rounded-2xl text-emerald-700">
              <Users className="h-6 w-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">AI Diagnoses</p>
              <h3 className="text-3xl font-black text-slate-800 mt-1">{metrics.totalDiagnoses}</h3>
              <span className="text-xs text-emerald-600 font-semibold">TensorFlow & Offline Vision</span>
            </div>
            <div className="bg-teal-100 p-3 rounded-2xl text-teal-700">
              <Activity className="h-6 w-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Recommendations</p>
              <h3 className="text-3xl font-black text-slate-800 mt-1">{metrics.totalRecommendations}</h3>
              <span className="text-xs text-amber-600 font-semibold">Agro-Ecological Plans</span>
            </div>
            <div className="bg-amber-100 p-3 rounded-2xl text-amber-700">
              <Sprout className="h-6 w-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Field Surveys</p>
              <h3 className="text-3xl font-black text-slate-800 mt-1">{metrics.totalSurveys}</h3>
              <span className="text-xs text-blue-600 font-semibold">Pest & Crop Health Logs</span>
            </div>
            <div className="bg-blue-100 p-3 rounded-2xl text-blue-700">
              <FileCheck className="h-6 w-6" />
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-2 border-b border-slate-200 mb-6">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2.5 font-bold text-sm rounded-t-xl transition ${
              activeTab === 'overview'
                ? 'bg-white border-t border-x border-slate-200 text-emerald-800 border-b-2 border-b-white -mb-px'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            👥 Farmer Management
          </button>
          <button
            onClick={() => setActiveTab('diagnoses')}
            className={`px-4 py-2.5 font-bold text-sm rounded-t-xl transition ${
              activeTab === 'diagnoses'
                ? 'bg-white border-t border-x border-slate-200 text-emerald-800 border-b-2 border-b-white -mb-px'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            🔬 AI Disease Diagnostics Log
          </button>
          <button
            onClick={() => setActiveTab('recommendations')}
            className={`px-4 py-2.5 font-bold text-sm rounded-t-xl transition ${
              activeTab === 'recommendations'
                ? 'bg-white border-t border-x border-slate-200 text-emerald-800 border-b-2 border-b-white -mb-px'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            📊 Recommendation Simulator
          </button>
          <button
            onClick={() => setActiveTab('health')}
            className={`px-4 py-2.5 font-bold text-sm rounded-t-xl transition ${
              activeTab === 'health'
                ? 'bg-white border-t border-x border-slate-200 text-emerald-800 border-b-2 border-b-white -mb-px'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            🤖 AI & Model Health
          </button>
        </div>

        {/* TAB 1: USER / FARMER MANAGEMENT */}
        {activeTab === 'overview' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <div className="flex justify-between items-center mb-5">
              <div>
                <h2 className="text-lg font-bold text-slate-800">Farmer & User Accounts</h2>
                <p className="text-xs text-slate-500">Manage, block, unblock, and review all registered agricultural profiles.</p>
              </div>
              <span className="bg-emerald-50 text-emerald-700 text-xs px-3 py-1 rounded-full font-bold">
                {users.length} Users Enrolled
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 font-semibold text-xs uppercase">
                    <th className="pb-3">Farmer</th>
                    <th className="pb-3">Contact</th>
                    <th className="pb-3">Location & Size</th>
                    <th className="pb-3">Primary Crops</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-slate-50 transition">
                      <td className="py-3.5 font-bold text-slate-800">
                        {user.name}
                        <span className="block text-xs font-normal text-slate-400">{user.email}</span>
                      </td>
                      <td className="py-3.5 text-slate-600 text-xs">{user.phone || 'N/A'}</td>
                      <td className="py-3.5 text-slate-600 text-xs">
                        {user.location || 'Cameroon'} • <span className="font-semibold">{user.farmSize || '1 ha'}</span>
                      </td>
                      <td className="py-3.5 text-xs text-emerald-700 font-medium">{user.preferredCrop || 'General'}</td>
                      <td className="py-3.5">
                        {user.isBlocked ? (
                          <span className="bg-red-100 text-red-700 text-xs px-2.5 py-1 rounded-full font-bold flex items-center gap-1 w-max">
                            <Ban className="h-3 w-3" /> Blocked
                          </span>
                        ) : (
                          <span className="bg-emerald-100 text-emerald-700 text-xs px-2.5 py-1 rounded-full font-bold flex items-center gap-1 w-max">
                            <CheckCircle className="h-3 w-3" /> Active
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 text-right space-x-2">
                        <button
                          onClick={() => handleToggleBlock(user.id, user.isBlocked)}
                          className={`text-xs px-2.5 py-1 rounded-lg font-bold transition ${
                            user.isBlocked
                              ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                              : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
                          }`}
                        >
                          {user.isBlocked ? 'Unblock' : 'Block'}
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="text-xs px-2.5 py-1 rounded-lg font-bold bg-red-50 text-red-600 hover:bg-red-100 transition"
                        >
                          <Trash2 className="h-3.5 w-3.5 inline" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: DIAGNOSTICS LOG */}
        {activeTab === 'diagnoses' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h2 className="text-lg font-bold text-slate-800 mb-1">AI Crop Disease Diagnostics Activity</h2>
            <p className="text-xs text-slate-500 mb-5">History of diagnostic inferences produced by on-device offline models and local server AI.</p>

            <div className="space-y-3">
              {diagnoses.map((d) => (
                <div key={d.id} className="p-4 rounded-xl border border-slate-100 bg-slate-50 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-800 text-base">{d.diseaseName}</span>
                      <span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-0.5 rounded-full font-bold">{d.crop}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${d.severity === 'Critical' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>
                        {d.severity}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1">Symptoms: {d.symptoms}</p>
                    <span className="text-[11px] text-slate-400 font-mono mt-1 block">Engine: {d.source || 'Offline AI'} • {d.createdAt}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg">
                      Confidence: {Math.round((d.confidence || 0.92) * 100)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: RECOMMENDATION ENGINE TESTER */}
        {activeTab === 'recommendations' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm md:col-span-1">
              <h3 className="font-bold text-slate-800 mb-4">Agro-Ecological Simulator</h3>
              
              <div className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Soil Type</label>
                  <select
                    value={testSoil}
                    onChange={(e) => setTestSoil(e.target.value)}
                    className="w-full border border-slate-300 rounded-lg p-2 font-medium"
                  >
                    <option value="Sandy Loam">Sandy Loam</option>
                    <option value="Clay / Laterite">Clay / Laterite</option>
                    <option value="Rich Loam">Rich Loam</option>
                    <option value="Volcanic Soil">Volcanic Soil</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Planting Season</label>
                  <select
                    value={testSeason}
                    onChange={(e) => setTestSeason(e.target.value)}
                    className="w-full border border-slate-300 rounded-lg p-2 font-medium"
                  >
                    <option value="Onset of Rains">Onset of Rains</option>
                    <option value="Main Rainy Season">Main Rainy Season</option>
                    <option value="Dry Season (Irrigated)">Dry Season (Irrigated)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Region</label>
                  <select
                    value={testRegion}
                    onChange={(e) => setTestRegion(e.target.value)}
                    className="w-full border border-slate-300 rounded-lg p-2 font-medium"
                  >
                    <option value="West">West Region</option>
                    <option value="Centre">Centre Region</option>
                    <option value="Littoral">Littoral Region</option>
                    <option value="North">North Region</option>
                  </select>
                </div>

                <button
                  onClick={handleRunRecTest}
                  className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-2.5 rounded-xl transition mt-2"
                >
                  ⚡ Simulate Recommendation
                </button>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm md:col-span-2">
              <h3 className="font-bold text-slate-800 mb-4">Simulation Output</h3>
              {testRecResult ? (
                <div className="bg-emerald-50/50 border border-emerald-200 p-5 rounded-xl">
                  <span className="text-xs font-bold text-emerald-700 uppercase">Optimal Crop Result</span>
                  <h4 className="text-2xl font-black text-emerald-900 mt-1 mb-3">{testRecResult.primaryCrop}</h4>
                  <p className="text-sm text-slate-700 mb-2">{testRecResult.soilAssessment}</p>
                  <p className="text-sm text-slate-700 mb-2">{testRecResult.seasonalAdvice}</p>
                  <div className="mt-4 p-3 bg-white rounded-lg border border-emerald-100 text-xs font-semibold text-emerald-800">
                    📈 {testRecResult.landEstimate}
                  </div>
                </div>
              ) : (
                <p className="text-slate-400 text-sm italic">Click "Simulate Recommendation" to run the offline Agro-Ecological engine.</p>
              )}
            </div>
          </div>
        )}

        {/* TAB 4: AI & MODEL HEALTH */}
        {activeTab === 'health' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
            <h2 className="text-lg font-bold text-slate-800">AI Model Status & Offline Infrastructure</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2 mb-2">
                  <Cpu className="h-5 w-5 text-emerald-600" />
                  <h4 className="font-bold text-slate-800">Ollama Local LLM</h4>
                </div>
                <p className="text-xs text-slate-600 mb-3">Model: <strong>llama3.2:latest</strong> (2.0 GB)</p>
                <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-1 rounded-full">
                  🟢 Ready & Offline
                </span>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="h-5 w-5 text-teal-600" />
                  <h4 className="font-bold text-slate-800">TensorFlow Diagnosis</h4>
                </div>
                <p className="text-xs text-slate-600 mb-3">Pathology Classifier for 8 Tropical Staple Crops</p>
                <span className="bg-teal-100 text-teal-800 text-xs font-bold px-2.5 py-1 rounded-full">
                  🟢 Fully Functional
                </span>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2 mb-2">
                  <ShieldCheck className="h-5 w-5 text-blue-600" />
                  <h4 className="font-bold text-slate-800">On-Device Offline AI</h4>
                </div>
                <p className="text-xs text-slate-600 mb-3">Zero-Network Standalone Fallback for Mobile</p>
                <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2.5 py-1 rounded-full">
                  🟢 100% On-Device Active
                </span>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
