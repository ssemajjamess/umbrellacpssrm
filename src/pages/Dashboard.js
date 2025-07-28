import React from 'react';
import { 
  Users, 
  Briefcase, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const Dashboard = () => {
  // Mock data - replace with real data from Firestore
  const stats = [
    {
      title: 'Total Leads',
      value: '24',
      change: '+12%',
      changeType: 'positive',
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      title: 'Active Jobs',
      value: '8',
      change: '+3%',
      changeType: 'positive',
      icon: Briefcase,
      color: 'bg-green-500'
    },
    {
      title: 'Scheduled',
      value: '12',
      change: '+5%',
      changeType: 'positive',
      icon: Calendar,
      color: 'bg-purple-500'
    },
    {
      title: 'Revenue',
      value: '$45,230',
      change: '+18%',
      changeType: 'positive',
      icon: DollarSign,
      color: 'bg-yellow-500'
    }
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'lead',
      message: 'New lead added: John Smith',
      time: '2 minutes ago',
      status: 'new'
    },
    {
      id: 2,
      type: 'job',
      message: 'Job #1234 moved to Production',
      time: '1 hour ago',
      status: 'progress'
    },
    {
      id: 3,
      type: 'contract',
      message: 'Contract signed for 456 Oak St',
      time: '3 hours ago',
      status: 'completed'
    },
    {
      id: 4,
      type: 'claim',
      message: 'Claim approved for $12,500',
      time: '5 hours ago',
      status: 'completed'
    }
  ];

  const chartData = [
    { name: 'Jan', leads: 12, jobs: 8, revenue: 25000 },
    { name: 'Feb', leads: 18, jobs: 12, revenue: 32000 },
    { name: 'Mar', leads: 15, jobs: 10, revenue: 28000 },
    { name: 'Apr', leads: 24, jobs: 16, revenue: 42000 },
    { name: 'May', leads: 20, jobs: 14, revenue: 38000 },
    { name: 'Jun', leads: 28, jobs: 18, revenue: 45000 }
  ];

  const pieData = [
    { name: 'New', value: 8, color: '#3B82F6' },
    { name: 'Contacted', value: 6, color: '#F59E0B' },
    { name: 'Scheduled', value: 4, color: '#8B5CF6' },
    { name: 'Sold', value: 4, color: '#10B981' },
    { name: 'Lost', value: 2, color: '#EF4444' }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'new':
        return <AlertCircle className="w-4 h-4 text-blue-500" />;
      case 'progress':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your business.</p>
      </div>

      {/* Company Info Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-red-500 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold mb-2">Umbrella Claims & Property Solutions</h2>
            <div className="text-blue-100 space-y-1">
              <p>141 Traction St, Greenville, SC 29611</p>
              <p>Phone: 864-767-6188 • Email: customerscare@roofsbyumbrella.com</p>
              <p>Website: www.roofsbyumbrella.com</p>
            </div>
          </div>
                              <img src="/logo-black.png" alt="Umbrella" className="h-16 w-auto" />
        </div>
      </div>

      {/* Stats Grid */}
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
                <div className={`p-3 rounded-lg ${stat.color}`}>
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
                <span className="ml-2 text-sm text-gray-500">from last month</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Lead Status Chart */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Lead Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              {getStatusIcon(activity.status)}
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button className="p-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200">
          <Users className="w-6 h-6 mb-2" />
          <p className="font-medium">Add New Lead</p>
        </button>
        <button className="p-4 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-200">
          <Briefcase className="w-6 h-6 mb-2" />
          <p className="font-medium">Create Job</p>
        </button>
        <button className="p-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-200">
          <Calendar className="w-6 h-6 mb-2" />
          <p className="font-medium">Schedule Meeting</p>
        </button>
      </div>
    </div>
  );
};

export default Dashboard; 