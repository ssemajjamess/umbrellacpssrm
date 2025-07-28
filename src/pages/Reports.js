import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  DollarSign, 
  Users, 
  Calendar,
  Download,
  Filter
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const Reports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedReport, setSelectedReport] = useState('overview');

  const periodOptions = [
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' },
    { value: 'year', label: 'This Year' }
  ];

  const reportOptions = [
    { value: 'overview', label: 'Overview', icon: BarChart3 },
    { value: 'leads', label: 'Lead Analytics', icon: Users },
    { value: 'revenue', label: 'Revenue Report', icon: DollarSign },
    { value: 'jobs', label: 'Job Performance', icon: Calendar }
  ];

  // Mock data - replace with real data from Firestore
  const overviewData = [
    { name: 'Jan', leads: 12, jobs: 8, revenue: 25000 },
    { name: 'Feb', leads: 18, jobs: 12, revenue: 32000 },
    { name: 'Mar', leads: 15, jobs: 10, revenue: 28000 },
    { name: 'Apr', leads: 24, jobs: 16, revenue: 42000 },
    { name: 'May', leads: 20, jobs: 14, revenue: 38000 },
    { name: 'Jun', leads: 28, jobs: 18, revenue: 45000 }
  ];

  const leadSourceData = [
    { name: 'Website', value: 35, color: '#3B82F6' },
    { name: 'Referral', value: 25, color: '#10B981' },
    { name: 'Social Media', value: 20, color: '#F59E0B' },
    { name: 'Direct', value: 15, color: '#EF4444' },
    { name: 'Other', value: 5, color: '#8B5CF6' }
  ];

  const revenueData = [
    { name: 'Jan', actual: 25000, target: 30000 },
    { name: 'Feb', actual: 32000, target: 30000 },
    { name: 'Mar', actual: 28000, target: 30000 },
    { name: 'Apr', actual: 42000, target: 30000 },
    { name: 'May', actual: 38000, target: 30000 },
    { name: 'Jun', actual: 45000, target: 30000 }
  ];

  const jobStatusData = [
    { name: 'Inspection', value: 8, color: '#3B82F6' },
    { name: 'Adjuster Met', value: 6, color: '#F59E0B' },
    { name: 'Approved', value: 4, color: '#8B5CF6' },
    { name: 'Production', value: 12, color: '#10B981' },
    { name: 'Complete', value: 15, color: '#6B7280' }
  ];

  const stats = [
    {
      title: 'Total Revenue',
      value: '$245,000',
      change: '+18%',
      changeType: 'positive',
      icon: DollarSign
    },
    {
      title: 'New Leads',
      value: '156',
      change: '+12%',
      changeType: 'positive',
      icon: Users
    },
    {
      title: 'Active Jobs',
      value: '45',
      change: '+8%',
      changeType: 'positive',
      icon: Calendar
    },
    {
      title: 'Conversion Rate',
      value: '23.5%',
      change: '+2.1%',
      changeType: 'positive',
      icon: TrendingUp
    }
  ];

  const renderOverviewReport = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className="p-3 rounded-lg bg-gradient-to-r from-blue-600 to-red-500">
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <TrendingUp className={`w-4 h-4 ${
                  stat.changeType === 'positive' ? 'text-green-500' : 'text-red-500'
                }`} />
                <span className={`ml-1 text-sm font-medium ${
                  stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </span>
                <span className="ml-2 text-sm text-gray-500">from last period</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={overviewData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Lead Sources</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={leadSourceData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {leadSourceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  const renderLeadsReport = () => (
    <div className="space-y-6">
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Lead Conversion Funnel</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Total Leads</p>
              <p className="text-sm text-gray-600">All leads received</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-blue-600">156</p>
              <p className="text-sm text-gray-600">100%</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Contacted</p>
              <p className="text-sm text-gray-600">Leads contacted</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-yellow-600">124</p>
              <p className="text-sm text-gray-600">79%</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Scheduled</p>
              <p className="text-sm text-gray-600">Appointments scheduled</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-purple-600">89</p>
              <p className="text-sm text-gray-600">57%</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Sold</p>
              <p className="text-sm text-gray-600">Leads converted to sales</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-green-600">37</p>
              <p className="text-sm text-gray-600">24%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderRevenueReport = () => (
    <div className="space-y-6">
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue vs Target</h3>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="actual" stroke="#3B82F6" strokeWidth={3} name="Actual Revenue" />
            <Line type="monotone" dataKey="target" stroke="#EF4444" strokeWidth={2} strokeDasharray="5 5" name="Target Revenue" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const renderJobsReport = () => (
    <div className="space-y-6">
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Job Status Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={jobStatusData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {jobStatusData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const renderReport = () => {
    switch (selectedReport) {
      case 'overview':
        return renderOverviewReport();
      case 'leads':
        return renderLeadsReport();
      case 'revenue':
        return renderRevenueReport();
      case 'jobs':
        return renderJobsReport();
      default:
        return renderOverviewReport();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600">Track your business performance and insights</p>
        </div>
        <div className="flex items-center space-x-2">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="input-field"
          >
            {periodOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
          <button className="btn-secondary flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Report Navigation */}
      <div className="card">
        <div className="flex flex-wrap gap-2">
          {reportOptions.map((option) => {
            const Icon = option.icon;
            return (
              <button
                key={option.value}
                onClick={() => setSelectedReport(option.value)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedReport === option.value
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{option.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Report Content */}
      {renderReport()}
    </div>
  );
};

export default Reports; 