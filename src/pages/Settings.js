import React, { useState } from 'react';
import { 
  Settings as SettingsIcon,
  User,
  Bell,
  Shield,
  Database,
  Palette,
  Mail,
  Key
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const Settings = () => {
  const { currentUser, userRole } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const [profile, setProfile] = useState({
    firstName: currentUser?.displayName?.split(' ')[0] || '',
    lastName: currentUser?.displayName?.split(' ')[1] || '',
    email: currentUser?.email || '',
    phone: '',
    role: userRole || 'Sales Rep'
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    leadAlerts: true,
    jobUpdates: true,
    contractSignatures: true,
    weeklyReports: false
  });

  const [systemSettings, setSystemSettings] = useState({
    autoSave: true,
    darkMode: false,
    compactMode: false,
    showTutorials: true
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'integrations', label: 'Integrations', icon: Database }
  ];

  const handleProfileUpdate = () => {
    if (!profile.firstName || !profile.lastName || !profile.email) {
      toast.error('Please fill in all required fields');
      return;
    }
    toast.success('Profile updated successfully');
  };

  const handlePasswordChange = () => {
    toast.success('Password changed successfully');
    setShowPasswordModal(false);
  };

  const handleNotificationToggle = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
    toast.success(`${key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} ${!notifications[key] ? 'enabled' : 'disabled'}`);
  };

  const handleSystemToggle = (key) => {
    setSystemSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
    toast.success(`${key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} ${!systemSettings[key] ? 'enabled' : 'disabled'}`);
  };

  const renderProfileTab = () => (
    <div className="space-y-6">
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
            <input
              type="text"
              value={profile.firstName}
              onChange={(e) => setProfile({...profile, firstName: e.target.value})}
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
            <input
              type="text"
              value={profile.lastName}
              onChange={(e) => setProfile({...profile, lastName: e.target.value})}
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
            <input
              type="email"
              value={profile.email}
              onChange={(e) => setProfile({...profile, email: e.target.value})}
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input
              type="tel"
              value={profile.phone}
              onChange={(e) => setProfile({...profile, phone: e.target.value})}
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <select
              value={profile.role}
              onChange={(e) => setProfile({...profile, role: e.target.value})}
              className="input-field"
            >
              <option value="Admin">Admin</option>
              <option value="Sales Rep">Sales Rep</option>
              <option value="Project Manager">Project Manager</option>
            </select>
          </div>
        </div>
        <div className="mt-6">
          <button onClick={handleProfileUpdate} className="btn-primary">
            Update Profile
          </button>
        </div>
      </div>

      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Change Password</h3>
        <p className="text-sm text-gray-600 mb-4">Update your password to keep your account secure.</p>
        <button 
          onClick={() => setShowPasswordModal(true)}
          className="btn-secondary"
        >
          Change Password
        </button>
      </div>
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="space-y-6">
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Email Notifications</h3>
        <div className="space-y-4">
          {Object.entries(notifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </p>
                <p className="text-sm text-gray-600">
                  Receive notifications for {key.toLowerCase().replace(/([A-Z])/g, ' $1').toLowerCase()}
                </p>
              </div>
              <button
                onClick={() => handleNotificationToggle(key)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  value ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    value ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSecurityTab = () => (
    <div className="space-y-6">
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Security Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Two-Factor Authentication</p>
              <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
            </div>
            <button className="btn-secondary">Enable</button>
          </div>
          
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Session Management</p>
              <p className="text-sm text-gray-600">Manage your active sessions</p>
            </div>
            <button className="btn-secondary">View Sessions</button>
          </div>
          
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Data Export</p>
              <p className="text-sm text-gray-600">Download your data</p>
            </div>
            <button className="btn-secondary">Export Data</button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAppearanceTab = () => (
    <div className="space-y-6">
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Display Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Dark Mode</p>
              <p className="text-sm text-gray-600">Switch to dark theme</p>
            </div>
            <button
              onClick={() => handleSystemToggle('darkMode')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                systemSettings.darkMode ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  systemSettings.darkMode ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Compact Mode</p>
              <p className="text-sm text-gray-600">Use compact layout</p>
            </div>
            <button
              onClick={() => handleSystemToggle('compactMode')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                systemSettings.compactMode ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  systemSettings.compactMode ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Show Tutorials</p>
              <p className="text-sm text-gray-600">Display helpful tips and tutorials</p>
            </div>
            <button
              onClick={() => handleSystemToggle('showTutorials')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                systemSettings.showTutorials ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  systemSettings.showTutorials ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderIntegrationsTab = () => (
    <div className="space-y-6">
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Connected Services</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-blue-600" />
              <div>
                <p className="font-medium text-gray-900">Email Integration</p>
                <p className="text-sm text-gray-600">Connect your email for notifications</p>
              </div>
            </div>
            <button className="btn-secondary">Connect</button>
          </div>
          
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <Database className="w-5 h-5 text-green-600" />
              <div>
                <p className="font-medium text-gray-900">Google Drive</p>
                <p className="text-sm text-gray-600">Store documents and photos</p>
              </div>
            </div>
            <button className="btn-secondary">Connect</button>
          </div>
          
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <Key className="w-5 h-5 text-purple-600" />
              <div>
                <p className="font-medium text-gray-900">API Keys</p>
                <p className="text-sm text-gray-600">Manage external service connections</p>
              </div>
            </div>
            <button className="btn-secondary">Manage</button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return renderProfileTab();
      case 'notifications':
        return renderNotificationsTab();
      case 'security':
        return renderSecurityTab();
      case 'appearance':
        return renderAppearanceTab();
      case 'integrations':
        return renderIntegrationsTab();
      default:
        return renderProfileTab();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Manage your account preferences and system settings</p>
      </div>

      {/* Settings Navigation */}
      <div className="card">
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      {renderTabContent()}

      {/* Password Change Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Change Password</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                <input
                  type="password"
                  className="input-field"
                  placeholder="Enter current password"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                <input
                  type="password"
                  className="input-field"
                  placeholder="Enter new password"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                <input
                  type="password"
                  className="input-field"
                  placeholder="Confirm new password"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowPasswordModal(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={handlePasswordChange}
                className="btn-primary"
              >
                Change Password
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings; 