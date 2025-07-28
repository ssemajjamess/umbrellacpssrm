import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  FileText,
  Download,
  Send,
  CheckCircle,
  Clock,
  User
} from 'lucide-react';
import toast from 'react-hot-toast';

const Contracts = () => {
  const [contracts, setContracts] = useState([
    {
      id: 1,
      contractNumber: 'CON-001',
      customerName: 'John Smith',
      address: '123 Main St, Anytown, ST 12345',
      jobNumber: 'JOB-001',
      status: 'Signed',
      signedDate: '2024-01-20',
      value: 15000,
      description: 'Complete roof replacement after storm damage',
      signedBy: 'John Smith',
      sentToCustomer: true
    },
    {
      id: 2,
      contractNumber: 'CON-002',
      customerName: 'Sarah Wilson',
      address: '456 Oak Ave, Somewhere, ST 54321',
      jobNumber: 'JOB-002',
      status: 'Pending',
      signedDate: null,
      value: 8500,
      description: 'Gutter replacement and minor repairs',
      signedBy: null,
      sentToCustomer: false
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const [editingContract, setEditingContract] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const statusOptions = ['Pending', 'Sent', 'Signed', 'Completed'];

  const [newContract, setNewContract] = useState({
    customerName: '',
    address: '',
    jobNumber: '',
    value: '',
    description: '',
    status: 'Pending'
  });

  const handleAddContract = () => {
    if (!newContract.customerName || !newContract.address || !newContract.value) {
      toast.error('Please fill in all required fields');
      return;
    }

    const contract = {
      id: Date.now(),
      contractNumber: `CON-${String(Date.now()).slice(-3)}`,
      ...newContract,
      value: parseFloat(newContract.value),
      signedDate: null,
      signedBy: null,
      sentToCustomer: false
    };

    setContracts([...contracts, contract]);
    setNewContract({
      customerName: '',
      address: '',
      jobNumber: '',
      value: '',
      description: '',
      status: 'Pending'
    });
    setShowAddModal(false);
    toast.success('Contract added successfully');
  };

  const handleEditContract = () => {
    if (!editingContract.customerName || !editingContract.address || !editingContract.value) {
      toast.error('Please fill in all required fields');
      return;
    }

    setContracts(contracts.map(contract => 
      contract.id === editingContract.id ? editingContract : contract
    ));
    setShowEditModal(false);
    setEditingContract(null);
    toast.success('Contract updated successfully');
  };

  const handleDeleteContract = (id) => {
    if (window.confirm('Are you sure you want to delete this contract?')) {
      setContracts(contracts.filter(contract => contract.id !== id));
      toast.success('Contract deleted successfully');
    }
  };

  const openEditModal = (contract) => {
    setEditingContract({ ...contract });
    setShowEditModal(true);
  };

  const openSignatureModal = (contract) => {
    setEditingContract({ ...contract });
    setShowSignatureModal(true);
  };

  const handleSignatureComplete = () => {
    const updatedContract = {
      ...editingContract,
      status: 'Signed',
      signedDate: new Date().toISOString().split('T')[0],
      signedBy: 'Customer'
    };

    setContracts(contracts.map(contract => 
      contract.id === updatedContract.id ? updatedContract : contract
    ));
    setShowSignatureModal(false);
    setEditingContract(null);
    toast.success('Contract signed successfully');
  };

  const filteredContracts = contracts.filter(contract => {
    const matchesSearch = contract.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contract.contractNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contract.jobNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || contract.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Sent': return 'bg-blue-100 text-blue-800';
      case 'Signed': return 'bg-green-100 text-green-800';
      case 'Completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Pending': return <Clock className="w-4 h-4" />;
      case 'Sent': return <Send className="w-4 h-4" />;
      case 'Signed': return <CheckCircle className="w-4 h-4" />;
      case 'Completed': return <CheckCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Contracts</h1>
          <p className="text-gray-600">Manage contracts and e-signatures</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add Contract</span>
        </button>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search contracts..."
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
              {filteredContracts.length} of {contracts.length} contracts
            </span>
          </div>
        </div>
      </div>

      {/* Contracts Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contract
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Value
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Signed Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredContracts.map((contract) => (
                <tr key={contract.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-600 to-red-500 flex items-center justify-center">
                          <FileText className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{contract.contractNumber}</div>
                        <div className="text-sm text-gray-500">{contract.customerName}</div>
                        <div className="text-sm text-gray-500">{contract.jobNumber}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getStatusIcon(contract.status)}
                      <span className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(contract.status)}`}>
                        {contract.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ${contract.value.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {contract.signedDate || 'Not signed'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      {contract.status === 'Pending' && (
                        <button
                          onClick={() => openSignatureModal(contract)}
                          className="text-green-600 hover:text-green-900"
                          title="Sign Contract"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => openEditModal(contract)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteContract(contract.id)}
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

      {/* Add Contract Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add New Contract</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name *</label>
                <input
                  type="text"
                  value={newContract.customerName}
                  onChange={(e) => setNewContract({...newContract, customerName: e.target.value})}
                  className="input-field"
                  placeholder="Customer name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
                <input
                  type="text"
                  value={newContract.address}
                  onChange={(e) => setNewContract({...newContract, address: e.target.value})}
                  className="input-field"
                  placeholder="Property address"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Job Number</label>
                <input
                  type="text"
                  value={newContract.jobNumber}
                  onChange={(e) => setNewContract({...newContract, jobNumber: e.target.value})}
                  className="input-field"
                  placeholder="JOB-001"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contract Value *</label>
                <input
                  type="number"
                  value={newContract.value}
                  onChange={(e) => setNewContract({...newContract, value: e.target.value})}
                  className="input-field"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={newContract.description}
                  onChange={(e) => setNewContract({...newContract, description: e.target.value})}
                  className="input-field"
                  rows="3"
                  placeholder="Contract description"
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
                onClick={handleAddContract}
                className="btn-primary"
              >
                Add Contract
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Contract Modal */}
      {showEditModal && editingContract && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Edit Contract</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name *</label>
                <input
                  type="text"
                  value={editingContract.customerName}
                  onChange={(e) => setEditingContract({...editingContract, customerName: e.target.value})}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
                <input
                  type="text"
                  value={editingContract.address}
                  onChange={(e) => setEditingContract({...editingContract, address: e.target.value})}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Job Number</label>
                <input
                  type="text"
                  value={editingContract.jobNumber}
                  onChange={(e) => setEditingContract({...editingContract, jobNumber: e.target.value})}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contract Value *</label>
                <input
                  type="number"
                  value={editingContract.value}
                  onChange={(e) => setEditingContract({...editingContract, value: e.target.value})}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={editingContract.description}
                  onChange={(e) => setEditingContract({...editingContract, description: e.target.value})}
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
                onClick={handleEditContract}
                className="btn-primary"
              >
                Update Contract
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Signature Modal */}
      {showSignatureModal && editingContract && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <h2 className="text-xl font-bold mb-4">Sign Contract</h2>
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-2">Contract Details</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Contract:</span> {editingContract.contractNumber}
                  </div>
                  <div>
                    <span className="font-medium">Customer:</span> {editingContract.customerName}
                  </div>
                  <div>
                    <span className="font-medium">Value:</span> ${editingContract.value.toLocaleString()}
                  </div>
                  <div>
                    <span className="font-medium">Job:</span> {editingContract.jobNumber}
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-2">Contract Terms</h3>
                <div className="text-sm text-gray-600 space-y-2">
                  <p>This contract is for roofing services provided by Umbrella Claims & Property Solutions.</p>
                  <p>Total contract value: ${editingContract.value.toLocaleString()}</p>
                  <p>Work to be performed: {editingContract.description}</p>
                  <p>By signing below, the customer agrees to the terms and conditions of this contract.</p>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-2">Digital Signature</h3>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <User className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">Click to sign electronically</p>
                  <button
                    onClick={handleSignatureComplete}
                    className="btn-primary mt-4"
                  >
                    Sign Contract
                  </button>
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowSignatureModal(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contracts; 