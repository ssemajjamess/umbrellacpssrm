import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  MapPin,
  Calendar,
  DollarSign,
  User,
  Clock,
  CheckCircle,
  AlertCircle,
  Briefcase
} from 'lucide-react';
import toast from 'react-hot-toast';

const Jobs = () => {
  const [jobs, setJobs] = useState([
    {
      id: 1,
      jobNumber: 'JOB-001',
      customerName: 'John Smith',
      address: '123 Main St, Anytown, ST 12345',
      status: 'Inspection',
      estimatedValue: 15000,
      assignedTo: 'Mike Johnson',
      startDate: '2024-01-25',
      expectedCompletion: '2024-02-15',
      description: 'Complete roof replacement after storm damage',
      claimNumber: 'CLM-2024-001',
      insuranceCompany: 'State Farm',
      notes: 'Customer approved estimate, waiting for insurance approval'
    },
    {
      id: 2,
      jobNumber: 'JOB-002',
      customerName: 'Sarah Wilson',
      address: '456 Oak Ave, Somewhere, ST 54321',
      status: 'Production',
      estimatedValue: 8500,
      assignedTo: 'Lisa Davis',
      startDate: '2024-01-20',
      expectedCompletion: '2024-02-10',
      description: 'Gutter replacement and minor repairs',
      claimNumber: 'CLM-2024-002',
      insuranceCompany: 'Allstate',
      notes: 'Materials ordered, crew scheduled for next week'
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [assignedFilter, setAssignedFilter] = useState('All');

  const statusOptions = ['Inspection', 'Adjuster Met', 'Approved', 'Production', 'Complete'];
  const assignedOptions = ['Mike Johnson', 'Lisa Davis', 'Tom Wilson'];

  const [newJob, setNewJob] = useState({
    customerName: '',
    address: '',
    status: 'Inspection',
    estimatedValue: '',
    assignedTo: '',
    startDate: '',
    expectedCompletion: '',
    description: '',
    claimNumber: '',
    insuranceCompany: '',
    notes: ''
  });

  const handleAddJob = () => {
    if (!newJob.customerName || !newJob.address || !newJob.estimatedValue) {
      toast.error('Please fill in all required fields');
      return;
    }

    const job = {
      id: Date.now(),
      jobNumber: `JOB-${String(Date.now()).slice(-3)}`,
      ...newJob,
      estimatedValue: parseFloat(newJob.estimatedValue)
    };

    setJobs([...jobs, job]);
    setNewJob({
      customerName: '',
      address: '',
      status: 'Inspection',
      estimatedValue: '',
      assignedTo: '',
      startDate: '',
      expectedCompletion: '',
      description: '',
      claimNumber: '',
      insuranceCompany: '',
      notes: ''
    });
    setShowAddModal(false);
    toast.success('Job added successfully');
  };

  const handleEditJob = () => {
    if (!editingJob.customerName || !editingJob.address || !editingJob.estimatedValue) {
      toast.error('Please fill in all required fields');
      return;
    }

    setJobs(jobs.map(job => 
      job.id === editingJob.id ? editingJob : job
    ));
    setShowEditModal(false);
    setEditingJob(null);
    toast.success('Job updated successfully');
  };

  const handleDeleteJob = (id) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      setJobs(jobs.filter(job => job.id !== id));
      toast.success('Job deleted successfully');
    }
  };

  const openEditModal = (job) => {
    setEditingJob({ ...job });
    setShowEditModal(true);
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.jobNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || job.status === statusFilter;
    const matchesAssigned = assignedFilter === 'All' || job.assignedTo === assignedFilter;
    
    return matchesSearch && matchesStatus && matchesAssigned;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Inspection': return 'bg-blue-100 text-blue-800';
      case 'Adjuster Met': return 'bg-yellow-100 text-yellow-800';
      case 'Approved': return 'bg-purple-100 text-purple-800';
      case 'Production': return 'bg-green-100 text-green-800';
      case 'Complete': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Inspection': return <AlertCircle className="w-4 h-4" />;
      case 'Adjuster Met': return <Clock className="w-4 h-4" />;
      case 'Approved': return <CheckCircle className="w-4 h-4" />;
      case 'Production': return <Briefcase className="w-4 h-4" />;
      case 'Complete': return <CheckCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Jobs</h1>
          <p className="text-gray-600">Track your roofing projects and job progress</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add Job</span>
        </button>
      </div>

      {/* Pipeline Overview */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {statusOptions.map((status) => {
          const count = jobs.filter(job => job.status === status).length;
          return (
            <div key={status} className="card text-center">
              <div className="text-2xl font-bold text-gray-900">{count}</div>
              <div className="text-sm text-gray-600">{status}</div>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="card">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search jobs..."
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
              {filteredJobs.length} of {jobs.length} jobs
            </span>
          </div>
        </div>
      </div>

      {/* Jobs Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Job
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Value
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assigned To
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Timeline
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredJobs.map((job) => (
                <tr key={job.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-600 to-red-500 flex items-center justify-center">
                          <Briefcase className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{job.jobNumber}</div>
                        <div className="text-sm text-gray-500">{job.customerName}</div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <MapPin className="w-3 h-3 mr-1" />
                          {job.address}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getStatusIcon(job.status)}
                      <span className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(job.status)}`}>
                        {job.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <DollarSign className="w-4 h-4 text-green-500 mr-1" />
                      <span className="text-sm font-medium text-gray-900">
                        ${job.estimatedValue.toLocaleString()}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {job.assignedTo}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {job.startDate} - {job.expectedCompletion}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => openEditModal(job)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteJob(job.id)}
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

      {/* Add Job Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-screen overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Add New Job</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name *</label>
                <input
                  type="text"
                  value={newJob.customerName}
                  onChange={(e) => setNewJob({...newJob, customerName: e.target.value})}
                  className="input-field"
                  placeholder="Customer name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
                <input
                  type="text"
                  value={newJob.address}
                  onChange={(e) => setNewJob({...newJob, address: e.target.value})}
                  className="input-field"
                  placeholder="Property address"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={newJob.status}
                  onChange={(e) => setNewJob({...newJob, status: e.target.value})}
                  className="input-field"
                >
                  {statusOptions.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Estimated Value *</label>
                <input
                  type="number"
                  value={newJob.estimatedValue}
                  onChange={(e) => setNewJob({...newJob, estimatedValue: e.target.value})}
                  className="input-field"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Assigned To</label>
                <select
                  value={newJob.assignedTo}
                  onChange={(e) => setNewJob({...newJob, assignedTo: e.target.value})}
                  className="input-field"
                >
                  <option value="">Select assignee</option>
                  {assignedOptions.map(assignee => (
                    <option key={assignee} value={assignee}>{assignee}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                <input
                  type="date"
                  value={newJob.startDate}
                  onChange={(e) => setNewJob({...newJob, startDate: e.target.value})}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Expected Completion</label>
                <input
                  type="date"
                  value={newJob.expectedCompletion}
                  onChange={(e) => setNewJob({...newJob, expectedCompletion: e.target.value})}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Claim Number</label>
                <input
                  type="text"
                  value={newJob.claimNumber}
                  onChange={(e) => setNewJob({...newJob, claimNumber: e.target.value})}
                  className="input-field"
                  placeholder="Insurance claim number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Insurance Company</label>
                <input
                  type="text"
                  value={newJob.insuranceCompany}
                  onChange={(e) => setNewJob({...newJob, insuranceCompany: e.target.value})}
                  className="input-field"
                  placeholder="Insurance company"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={newJob.description}
                  onChange={(e) => setNewJob({...newJob, description: e.target.value})}
                  className="input-field"
                  rows="3"
                  placeholder="Job description and scope of work"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <textarea
                  value={newJob.notes}
                  onChange={(e) => setNewJob({...newJob, notes: e.target.value})}
                  className="input-field"
                  rows="3"
                  placeholder="Additional notes..."
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
                onClick={handleAddJob}
                className="btn-primary"
              >
                Add Job
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Job Modal */}
      {showEditModal && editingJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-screen overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Edit Job</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name *</label>
                <input
                  type="text"
                  value={editingJob.customerName}
                  onChange={(e) => setEditingJob({...editingJob, customerName: e.target.value})}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
                <input
                  type="text"
                  value={editingJob.address}
                  onChange={(e) => setEditingJob({...editingJob, address: e.target.value})}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={editingJob.status}
                  onChange={(e) => setEditingJob({...editingJob, status: e.target.value})}
                  className="input-field"
                >
                  {statusOptions.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Estimated Value *</label>
                <input
                  type="number"
                  value={editingJob.estimatedValue}
                  onChange={(e) => setEditingJob({...editingJob, estimatedValue: e.target.value})}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Assigned To</label>
                <select
                  value={editingJob.assignedTo}
                  onChange={(e) => setEditingJob({...editingJob, assignedTo: e.target.value})}
                  className="input-field"
                >
                  <option value="">Select assignee</option>
                  {assignedOptions.map(assignee => (
                    <option key={assignee} value={assignee}>{assignee}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                <input
                  type="date"
                  value={editingJob.startDate}
                  onChange={(e) => setEditingJob({...editingJob, startDate: e.target.value})}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Expected Completion</label>
                <input
                  type="date"
                  value={editingJob.expectedCompletion}
                  onChange={(e) => setEditingJob({...editingJob, expectedCompletion: e.target.value})}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Claim Number</label>
                <input
                  type="text"
                  value={editingJob.claimNumber}
                  onChange={(e) => setEditingJob({...editingJob, claimNumber: e.target.value})}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Insurance Company</label>
                <input
                  type="text"
                  value={editingJob.insuranceCompany}
                  onChange={(e) => setEditingJob({...editingJob, insuranceCompany: e.target.value})}
                  className="input-field"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={editingJob.description}
                  onChange={(e) => setEditingJob({...editingJob, description: e.target.value})}
                  className="input-field"
                  rows="3"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <textarea
                  value={editingJob.notes}
                  onChange={(e) => setEditingJob({...editingJob, notes: e.target.value})}
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
                onClick={handleEditJob}
                className="btn-primary"
              >
                Update Job
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Jobs; 