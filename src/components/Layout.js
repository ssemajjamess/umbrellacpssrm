import React, { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { 
  Home, 
  Users, 
  Briefcase, 
  Calendar, 
  FileText, 
  Shield, 
  Camera, 
  BarChart3, 
  Settings, 
  Menu, 
  X,
  LogOut,
  User,
  Phone,
  Mail,
  MapPin,
  Globe
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { currentUser, logout, userRole } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const navigation = [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'Leads', href: '/leads', icon: Users },
    { name: 'Jobs', href: '/jobs', icon: Briefcase },
    { name: 'Scheduling', href: '/scheduling', icon: Calendar },
    { name: 'Contracts', href: '/contracts', icon: FileText },
    { name: 'Claims', href: '/claims', icon: Shield },
    { name: 'Photos', href: '/photos', icon: Camera },
    { name: 'Reports', href: '/reports', icon: BarChart3 },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
      navigate('/login');
    } catch (error) {
      toast.error('Failed to log out');
    }
  };

  const isActive = (href) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="mobile-sidebar"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`mobile-sidebar-content ${sidebarOpen ? 'open' : 'closed'} lg:translate-x-0 sidebar`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b border-gray-700">
            <div className="flex items-center space-x-3">
              <img src="/logo-black.png" alt="Umbrella" className="w-8 h-8" />
              <span className="text-white font-semibold text-lg">Umbrella CRM</span>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-gray-400 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>

          {/* Company Info */}
          <div className="px-6 py-3 bg-gray-800 border-b border-gray-700">
            <div className="text-xs text-gray-300 space-y-1">
              <div className="flex items-center">
                <MapPin className="h-3 w-3 mr-2" />
                <span>141 Traction St, Greenville, SC 29611</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-3 w-3 mr-2" />
                <span>864-767-6188</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-3 w-3 mr-2" />
                <span>customerscare@roofsbyumbrella.com</span>
              </div>
              <div className="flex items-center">
                <Globe className="h-3 w-3 mr-2" />
                <span>www.roofsbyumbrella.com</span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(item.href);
                    setSidebarOpen(false);
                  }}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? 'bg-gradient-to-r from-blue-600 to-red-500 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  <Icon size={20} />
                  <span>{item.name}</span>
                </a>
              );
            })}
          </nav>

          {/* User section */}
          <div className="p-4 border-t border-gray-700">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-red-500 rounded-full flex items-center justify-center">
                <User size={16} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {currentUser?.displayName || currentUser?.email}
                </p>
                <p className="text-xs text-gray-400 capitalize">
                  {userRole || 'User'}
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
            >
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col lg:ml-64">
        {/* Top bar */}
        <header className="bg-white shadow-sm border-b border-gray-200 lg:hidden">
          <div className="flex items-center justify-between px-4 py-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-gray-500 hover:text-gray-700"
            >
              <Menu size={24} />
            </button>
            <div className="flex items-center space-x-3">
              <img src="/logo-small.svg" alt="Umbrella" className="w-8 h-8" />
              <span className="font-semibold text-gray-900">Umbrella CRM</span>
            </div>
            <div className="w-6" /> {/* Spacer for centering */}
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto">
          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout; 