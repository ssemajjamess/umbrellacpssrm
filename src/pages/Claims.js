import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Shield,
  DollarSign,
  Calendar,
  User,
  FileText
} from 'lucide-react';
import toast from 'react-hot-toast';

const Claims = () => {
  const [claims, setClaims] = useState([
    {
      id: 1,
      claimNumber: 'CLM-2024-001',
      customerName: 'John Smith',
      address: '123 Main St, Anytown, ST 12345',
      insuranceCompany: 'State Farm',
      adjusterName: 'Mike Johnson',
      adjusterPhone: '(555) 123-4567',
      adjusterEmail: 'mike.johnson@statefarm.com',
      claimValue: 15000,
      approvedValue: 12000,
      status: 'Approved',
      claimDate: '2024-01-15',
      approvedDate: '2024-01-20',
      description: 'Storm damage to roof requiring complete replacement',
      supplements: [
        {
          id: 1,
          description: 'Additional shingles needed',
          amount: 2000,
          status: 'Pending'
        }
      ]
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingClaim, setEditingClaim] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const statusOptions = ['Pending', 'Under Review', 'Approved', 'Denied', 'Paid'];

  const [newClaim, setNewClaim] = useState({
    customerName: '',
    address: '',
    insuranceCompany: '',
    adjusterName: '',
    adjusterPhone: '',
    adjusterEmail: '',
    claimValue: '',
    description: '',
    status: 'Pending'
  });

  const handleAddClaim = () => {
    if (!newClaim.customerName || !newClaim.insuranceCompany || !newClaim.claimValue) {
      toast.error('Please fill in all required fields');
      return;
    }

    const claim = {
      id: Date.now(),
      claimNumber: `CLM-2024-${String(Date.now()).slice(-3)}`,
      ...newClaim,
      claimValue: parseFloat(newClaim.claimValue),
      approvedValue: 0,
      claimDate: new Date().toISOString().split('T')[0],
      approvedDate: null,
      supplements: []
    };

    setClaims([...claims, claim]);
    setNewClaim({
      customerName: '',
      address: '',
      insuranceCompany: '',
      adjusterName: '',
      adjusterPhone: '',
      adjusterEmail: '',
      claimValue: '',
      description: '',
      status: 'Pending'
    });
    setShowAddModal(false);
    toast.success('Claim added successfully');
  };

  const handleEditClaim = () => {
    if (!editingClaim.customerName || !editingClaim.insuranceCompany || !editingClaim.claimValue) {
      toast.error('Please fill in all required fields');
      return;
    }

    setClaims(claims.map(claim => 
      claim.id === editingClaim.id ? editingClaim : claim
    ));
    setShowEditModal(false);
    setEditingClaim(null);
    toast.success('Claim updated successfully');
  };

  const handleDeleteClaim = (id) => {
    if (window.confirm('Are you sure you want to delete this claim?')) {
      setClaims(claims.filter(claim => claim.id !== id));
      toast.success('Claim deleted successfully');
    }
  };

  const openEditModal = (claim) => {
    setEditingClaim({ ...claim });
    setShowEditModal(true);
  };

  const filteredClaims = claims.filter(claim => {
    const matchesSearch = claim.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         claim.claimNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         claim.insuranceCompany.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || claim.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Under Review': return 'bg-blue-100 text-blue-800';
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Denied': return 'bg-red-100 text-red-800';
      case 'Paid': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Insurance Claims</h1>
          <p className="text-gray-600">Manage insurance claims and supplements</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add Claim</span>
        </button>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search claims..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
          </div>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="input-field"
          >
            <option value="All">All Statuses</option>
            {statusOptions.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>

          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <span className="text-sm text-gray-600">
              {filteredClaims.length} of {claims.length} claims
            </span>
          </div>
        </div>
      </div>

      {/* Claims Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Claim
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Insurance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Values
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredClaims.map((claim) => (
                <tr key={claim.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-600 to-red-500 flex items-center justify-center">
                          <Shield className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{claim.claimNumber}</div>
                        <div className="text-sm text-gray-500">{claim.customerName}</div>
                        <div className="text-sm text-gray-500">{claim.address}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(claim.status)}`}>
                      {claim.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{claim.insuranceCompany}</div>
                    <div className="text-sm text-gray-500">{claim.adjusterName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm">
                      <div className="text-gray-900">Claimed: ${claim.claimValue.toLocaleString()}</div>
                      <div className="text-gray-500">Approved: ${claim.approvedValue.toLocaleString()}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => openEditModal(claim)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteClaim(claim.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Claim Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-screen overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Add New Claim</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name *</label>
                <input
                  type="text"
                  value={newClaim.customerName}
                  onChange={(e) => setNewClaim({...newClaim, customerName: e.target.value})}
                  className="input-field"
                  placeholder="Customer name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <input
                  type="text"
                  value={newClaim.address}
                  onChange={(e) => setNewClaim({...newClaim, address: e.target.value})}
                  className="input-field"
                  placeholder="Property address"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Insurance Company *</label>
                <input
                  type="text"
                  value={newClaim.insuranceCompany}
                  onChange={(e) => setNewClaim({...newClaim, insuranceCompany: e.target.value})}
                  className="input-field"
                  placeholder="Insurance company"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Claim Value *</label>
                <input
                  type="number"
                  value={newClaim.claimValue}
                  onChange={(e) => setNewClaim({...newClaim, claimValue: e.target.value})}
                  className="input-field"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Adjuster Name</label>
                <input
                  type="text"
                  value={newClaim.adjusterName}
                  onChange={(e) => setNewClaim({...newClaim, adjusterName: e.target.value})}
                  className="input-field"
                  placeholder="Adjuster name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Adjuster Phone</label>
                <input
                  type="tel"
                  value={newClaim.adjusterPhone}
                  onChange={(e) => setNewClaim({...newClaim, adjusterPhone: e.target.value})}
                  className="input-field"
                  placeholder="Phone number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Adjuster Email</label>
                <input
                  type="email"
                  value={newClaim.adjusterEmail}
                  onChange={(e) => setNewClaim({...newClaim, adjusterEmail: e.target.value})}
                  className="input-field"
                  placeholder="Email address"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={newClaim.description}
                  onChange={(e) => setNewClaim({...newClaim, description: e.target.value})}
                  className="input-field"
                  rows="3"
                  placeholder="Claim description"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={handleAddClaim}
                className="btn-primary"
              >
                Add Claim
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Claim Modal */}
      {showEditModal && editingClaim && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-screen overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Edit Claim</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name *</label>
                <input
                  type="text"
                  value={editingClaim.customerName}
                  onChange={(e) => setEditingClaim({...editingClaim, customerName: e.target.value})}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <input
                  type="text"
                  value={editingClaim.address}
                  onChange={(e) => setEditingClaim({...editingClaim, address: e.target.value})}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Insurance Company *</label>
                <input
                  type="text"
                  value={editingClaim.insuranceCompany}
                  onChange={(e) => setEditingClaim({...editingClaim, insuranceCompany: e.target.value})}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Claim Value *</label>
                <input
                  type="number"
                  value={editingClaim.claimValue}
                  onChange={(e) => setEditingClaim({...editingClaim, claimValue: e.target.value})}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Adjuster Name</label>
                <input
                  type="text"
                  value={editingClaim.adjusterName}
                  onChange={(e) => setEditingClaim({...editingClaim, adjusterName: e.target.value})}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Adjuster Phone</label>
                <input
                  type="tel"
                  value={editingClaim.adjusterPhone}
                  onChange={(e) => setEditingClaim({...editingClaim, adjusterPhone: e.target.value})}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Adjuster Email</label>
                <input
                  type="email"
                  value={editingClaim.adjusterEmail}
                  onChange={(e) => setEditingClaim({...editingClaim, adjusterEmail: e.target.value})}
                  className="input-field"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={editingClaim.description}
                  onChange={(e) => setEditingClaim({...editingClaim, description: e.target.value})}
                  className="input-field"
                  rows="3"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowEditModal(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={handleEditClaim}
                className="btn-primary"
              >
                Update Claim
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Claims; 