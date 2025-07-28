import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Phone, 
  User,
  Calendar
} from 'lucide-react';
import toast from 'react-hot-toast';
import { 
  insuranceCompanies, 
  salesReps, 
  jobStages, 
  feeStatusOptions, 
  roofTypes, 
  propertyTypes, 
  replacementTypes, 
  crews, 
  googleRatingOptions,
  currentCustomers 
} from '../data/mockData';

const Leads = () => {
  const [leads, setLeads] = useState(currentCustomers);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingLead, setEditingLead] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [assignedFilter, setAssignedFilter] = useState('All');

  const statusOptions = jobStages;
  const assignedOptions = salesReps;

  const [newLead, setNewLead] = useState({
    soldBy: '',
    customerName: '',
    phone: '',
    email: '',
    address: '',
    stage: 'LEAD',
    feePaid: 'N/A',
    insuranceCompany: '',
    dateOfLoss: '',
    claimFiled: 'NO',
    claimNumber: '',
    approved: 'NO',
    adjustersInfo: '',
    replacementType: '',
    roofType: '',
    propertyType: 'RESIDENTIAL',
    crew: '',
    jobCost: 0,
    laborCost: 0,
    materialCost: 0,
    googleRating: 'PENDING',
    jobNotes: '',
    jobDocumentsLink: ''
  });

  const handleAddLead = () => {
    if (!newLead.name || !newLead.email || !newLead.phone) {
      toast.error('Please fill in all required fields');
      return;
    }

    const lead = {
      id: Date.now(),
      ...newLead,
      createdAt: new Date().toISOString().split('T')[0],
      lastContact: new Date().toISOString().split('T')[0]
    };

    setLeads([...leads, lead]);
    setNewLead({
      name: '',
      email: '',
      phone: '',
      address: '',
      status: 'New',
      assignedTo: '',
      source: '',
      notes: ''
    });
    setShowAddModal(false);
    toast.success('Lead added successfully');
  };

  const handleEditLead = () => {
    if (!editingLead.name || !editingLead.email || !editingLead.phone) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLeads(leads.map(lead => 
      lead.id === editingLead.id ? editingLead : lead
    ));
    setShowEditModal(false);
    setEditingLead(null);
    toast.success('Lead updated successfully');
  };

  const handleDeleteLead = (id) => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      setLeads(leads.filter(lead => lead.id !== id));
      toast.success('Lead deleted successfully');
    }
  };

  const openEditModal = (lead) => {
    setEditingLead({ ...lead });
    setShowEditModal(true);
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.phone.includes(searchTerm);
    const matchesStatus = statusFilter === 'All' || lead.status === statusFilter;
    const matchesAssigned = assignedFilter === 'All' || lead.assignedTo === assignedFilter;
    
    return matchesSearch && matchesStatus && matchesAssigned;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'New': return 'bg-blue-100 text-blue-800';
      case 'Contacted': return 'bg-yellow-100 text-yellow-800';
      case 'Scheduled': return 'bg-purple-100 text-purple-800';
      case 'Sold': return 'bg-green-100 text-green-800';
      case 'Lost': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Leads</h1>
          <p className="text-gray-600">Manage your leads and prospects</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add Lead</span>
        </button>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search leads..."
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

          <select
            value={assignedFilter}
            onChange={(e) => setAssignedFilter(e.target.value)}
            className="input-field"
          >
            <option value="All">All Assignees</option>
            {assignedOptions.map(assignee => (
              <option key={assignee} value={assignee}>{assignee}</option>
            ))}
          </select>

          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <span className="text-sm text-gray-600">
              {filteredLeads.length} of {leads.length} leads
            </span>
          </div>
        </div>
      </div>

      {/* Leads Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Lead
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assigned To
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Source
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-600 to-red-500 flex items-center justify-center">
                          <User className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{lead.name}</div>
                        <div className="text-sm text-gray-500">{lead.email}</div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <Phone className="w-3 h-3 mr-1" />
                          {lead.phone}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(lead.status)}`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {lead.assignedTo}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {lead.source}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {lead.lastContact}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => openEditModal(lead)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteLead(lead.id)}
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

      {/* Add Lead Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-screen overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Add New Customer</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-700 border-b pb-2">Basic Information</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Who Sold This Job *</label>
                  <select
                    value={newLead.soldBy}
                    onChange={(e) => setNewLead({...newLead, soldBy: e.target.value})}
                    className="input-field"
                  >
                    <option value="">Select sales rep</option>
                    {salesReps.map(rep => (
                      <option key={rep} value={rep}>{rep}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name *</label>
                  <input
                    type="text"
                    value={newLead.customerName}
                    onChange={(e) => setNewLead({...newLead, customerName: e.target.value})}
                    className="input-field"
                    placeholder="Full customer name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                  <input
                    type="tel"
                    value={newLead.phone}
                    onChange={(e) => setNewLead({...newLead, phone: e.target.value})}
                    className="input-field"
                    placeholder="(000) 000-0000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={newLead.email}
                    onChange={(e) => setNewLead({...newLead, email: e.target.value})}
                    className="input-field"
                    placeholder="customer@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
                  <textarea
                    value={newLead.address}
                    onChange={(e) => setNewLead({...newLead, address: e.target.value})}
                    className="input-field"
                    rows="2"
                    placeholder="Complete property address"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stage *</label>
                  <select
                    value={newLead.stage}
                    onChange={(e) => setNewLead({...newLead, stage: e.target.value})}
                    className="input-field"
                  >
                    {jobStages.map(stage => (
                      <option key={stage} value={stage}>{stage}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fee Paid?</label>
                  <select
                    value={newLead.feePaid}
                    onChange={(e) => setNewLead({...newLead, feePaid: e.target.value})}
                    className="input-field"
                  >
                    {feeStatusOptions.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Insurance & Claims Information */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-700 border-b pb-2">Insurance & Claims</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Insurance Company</label>
                  <select
                    value={newLead.insuranceCompany}
                    onChange={(e) => setNewLead({...newLead, insuranceCompany: e.target.value})}
                    className="input-field"
                  >
                    <option value="">Select insurance company</option>
                    {insuranceCompanies.map(company => (
                      <option key={company} value={company}>{company}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date of Loss</label>
                  <input
                    type="date"
                    value={newLead.dateOfLoss}
                    onChange={(e) => setNewLead({...newLead, dateOfLoss: e.target.value})}
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Claim Filed?</label>
                  <select
                    value={newLead.claimFiled}
                    onChange={(e) => setNewLead({...newLead, claimFiled: e.target.value})}
                    className="input-field"
                  >
                    <option value="NO">NO</option>
                    <option value="YES">YES</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Claim Number</label>
                  <input
                    type="text"
                    value={newLead.claimNumber}
                    onChange={(e) => setNewLead({...newLead, claimNumber: e.target.value})}
                    className="input-field"
                    placeholder="Enter claim number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Approved?</label>
                  <select
                    value={newLead.approved}
                    onChange={(e) => setNewLead({...newLead, approved: e.target.value})}
                    className="input-field"
                  >
                    <option value="NO">NO</option>
                    <option value="YES! :)">YES! :)</option>
                    <option value="PENDING">PENDING</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Adjusters Info</label>
                  <input
                    type="text"
                    value={newLead.adjustersInfo}
                    onChange={(e) => setNewLead({...newLead, adjustersInfo: e.target.value})}
                    className="input-field"
                    placeholder="Adjuster name and contact"
                  />
                </div>
              </div>

              {/* Job Details */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-700 border-b pb-2">Job Details</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Replacement Type</label>
                  <select
                    value={newLead.replacementType}
                    onChange={(e) => setNewLead({...newLead, replacementType: e.target.value})}
                    className="input-field"
                  >
                    <option value="">Select replacement type</option>
                    {replacementTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Roof Type</label>
                  <select
                    value={newLead.roofType}
                    onChange={(e) => setNewLead({...newLead, roofType: e.target.value})}
                    className="input-field"
                  >
                    <option value="">Select roof type</option>
                    {roofTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
                  <select
                    value={newLead.propertyType}
                    onChange={(e) => setNewLead({...newLead, propertyType: e.target.value})}
                    className="input-field"
                  >
                    {propertyTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Crew</label>
                  <select
                    value={newLead.crew}
                    onChange={(e) => setNewLead({...newLead, crew: e.target.value})}
                    className="input-field"
                  >
                    <option value="">Select crew</option>
                    {crews.map(crew => (
                      <option key={crew} value={crew}>{crew}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Financial Information */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-700 border-b pb-2">Financial Information</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Job Cost</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                    <input
                      type="number"
                      value={newLead.jobCost}
                      onChange={(e) => setNewLead({...newLead, jobCost: parseFloat(e.target.value) || 0})}
                      className="input-field pl-8"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Labor Cost</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                    <input
                      type="number"
                      value={newLead.laborCost}
                      onChange={(e) => setNewLead({...newLead, laborCost: parseFloat(e.target.value) || 0})}
                      className="input-field pl-8"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Material Cost</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                    <input
                      type="number"
                      value={newLead.materialCost}
                      onChange={(e) => setNewLead({...newLead, materialCost: parseFloat(e.target.value) || 0})}
                      className="input-field pl-8"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Google Rating</label>
                  <select
                    value={newLead.googleRating}
                    onChange={(e) => setNewLead({...newLead, googleRating: e.target.value})}
                    className="input-field"
                  >
                    {googleRatingOptions.map(rating => (
                      <option key={rating} value={rating}>{rating}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Notes & Documents */}
              <div className="space-y-4 md:col-span-2">
                <h3 className="font-semibold text-gray-700 border-b pb-2">Notes & Documents</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Job Notes</label>
                  <textarea
                    value={newLead.jobNotes}
                    onChange={(e) => setNewLead({...newLead, jobNotes: e.target.value})}
                    className="input-field"
                    rows="3"
                    placeholder="Job notes and comments..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Job Documents Link</label>
                  <input
                    type="url"
                    value={newLead.jobDocumentsLink}
                    onChange={(e) => setNewLead({...newLead, jobDocumentsLink: e.target.value})}
                    className="input-field"
                    placeholder="https://drive.google.com/..."
                  />
                </div>
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
                onClick={handleAddLead}
                className="btn-primary"
              >
                Add Customer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Lead Modal */}
      {showEditModal && editingLead && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Edit Lead</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                <input
                  type="text"
                  value={editingLead.name}
                  onChange={(e) => setEditingLead({...editingLead, name: e.target.value})}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input
                  type="email"
                  value={editingLead.email}
                  onChange={(e) => setEditingLead({...editingLead, email: e.target.value})}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                <input
                  type="tel"
                  value={editingLead.phone}
                  onChange={(e) => setEditingLead({...editingLead, phone: e.target.value})}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <input
                  type="text"
                  value={editingLead.address}
                  onChange={(e) => setEditingLead({...editingLead, address: e.target.value})}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={editingLead.status}
                  onChange={(e) => setEditingLead({...editingLead, status: e.target.value})}
                  className="input-field"
                >
                  {statusOptions.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Assigned To</label>
                <select
                  value={editingLead.assignedTo}
                  onChange={(e) => setEditingLead({...editingLead, assignedTo: e.target.value})}
                  className="input-field"
                >
                  <option value="">Select assignee</option>
                  {assignedOptions.map(assignee => (
                    <option key={assignee} value={assignee}>{assignee}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Source</label>
                <input
                  type="text"
                  value={editingLead.source}
                  onChange={(e) => setEditingLead({...editingLead, source: e.target.value})}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <textarea
                  value={editingLead.notes}
                  onChange={(e) => setEditingLead({...editingLead, notes: e.target.value})}
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
                onClick={handleEditLead}
                className="btn-primary"
              >
                Update Lead
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Leads; 