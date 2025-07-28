import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Camera,
  Calendar,
  MapPin
} from 'lucide-react';
import toast from 'react-hot-toast';

const Photos = () => {
  const [photos, setPhotos] = useState([
    {
      id: 1,
      jobNumber: 'JOB-001',
      customerName: 'John Smith',
      address: '123 Main St, Anytown, ST 12345',
      category: 'Inspection',
      date: '2024-01-20',
      description: 'Initial roof inspection photos',
      photoCount: 8,
      uploadedBy: 'Mike Johnson'
    },
    {
      id: 2,
      jobNumber: 'JOB-002',
      customerName: 'Sarah Wilson',
      address: '456 Oak Ave, Somewhere, ST 54321',
      category: 'Progress',
      date: '2024-01-25',
      description: 'Progress photos during installation',
      photoCount: 12,
      uploadedBy: 'Lisa Davis'
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingPhoto, setEditingPhoto] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const categoryOptions = ['Inspection', 'Progress', 'Completion', 'Damage', 'Before/After'];

  const [newPhoto, setNewPhoto] = useState({
    jobNumber: '',
    customerName: '',
    address: '',
    category: 'Inspection',
    description: ''
  });

  const handleAddPhoto = () => {
    if (!newPhoto.jobNumber || !newPhoto.customerName) {
      toast.error('Please fill in all required fields');
      return;
    }

    const photo = {
      id: Date.now(),
      ...newPhoto,
      date: new Date().toISOString().split('T')[0],
      photoCount: 0,
      uploadedBy: 'Current User'
    };

    setPhotos([...photos, photo]);
    setNewPhoto({
      jobNumber: '',
      customerName: '',
      address: '',
      category: 'Inspection',
      description: ''
    });
    setShowAddModal(false);
    toast.success('Photo album added successfully');
  };

  const handleEditPhoto = () => {
    if (!editingPhoto.jobNumber || !editingPhoto.customerName) {
      toast.error('Please fill in all required fields');
      return;
    }

    setPhotos(photos.map(photo => 
      photo.id === editingPhoto.id ? editingPhoto : photo
    ));
    setShowEditModal(false);
    setEditingPhoto(null);
    toast.success('Photo album updated successfully');
  };

  const handleDeletePhoto = (id) => {
    if (window.confirm('Are you sure you want to delete this photo album?')) {
      setPhotos(photos.filter(photo => photo.id !== id));
      toast.success('Photo album deleted successfully');
    }
  };

  const openEditModal = (photo) => {
    setEditingPhoto({ ...photo });
    setShowEditModal(true);
  };

  const filteredPhotos = photos.filter(photo => {
    const matchesSearch = photo.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         photo.jobNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         photo.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || photo.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Inspection': return 'bg-blue-100 text-blue-800';
      case 'Progress': return 'bg-yellow-100 text-yellow-800';
      case 'Completion': return 'bg-green-100 text-green-800';
      case 'Damage': return 'bg-red-100 text-red-800';
      case 'Before/After': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Photo Documentation</h1>
          <p className="text-gray-600">Manage job photos and documentation</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add Photos</span>
        </button>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search photos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
          </div>
          
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="input-field"
          >
            <option value="All">All Categories</option>
            {categoryOptions.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <span className="text-sm text-gray-600">
              {filteredPhotos.length} of {photos.length} albums
            </span>
          </div>
        </div>
      </div>

      {/* Photos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPhotos.map((photo) => (
          <div key={photo.id} className="card hover:shadow-lg transition-shadow">
            <div className="aspect-w-16 aspect-h-9 mb-4">
              <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-red-100 rounded-lg flex items-center justify-center">
                <Camera className="w-12 h-12 text-gray-400" />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-gray-900">{photo.jobNumber}</h3>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(photo.category)}`}>
                  {photo.category}
                </span>
              </div>
              
              <p className="text-sm text-gray-600">{photo.customerName}</p>
              <p className="text-xs text-gray-500 flex items-center">
                <MapPin className="w-3 h-3 mr-1" />
                {photo.address}
              </p>
              
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span className="flex items-center">
                  <Calendar className="w-3 h-3 mr-1" />
                  {photo.date}
                </span>
                <span>{photo.photoCount} photos</span>
              </div>
              
              {photo.description && (
                <p className="text-sm text-gray-600 mt-2">{photo.description}</p>
              )}
              
              <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                <span className="text-xs text-gray-500">By {photo.uploadedBy}</span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => openEditModal(photo)}
                    className="text-blue-600 hover:text-blue-900"
                    title="Edit"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeletePhoto(photo.id)}
                    className="text-red-600 hover:text-red-900"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Photo Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add Photo Album</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Job Number *</label>
                <input
                  type="text"
                  value={newPhoto.jobNumber}
                  onChange={(e) => setNewPhoto({...newPhoto, jobNumber: e.target.value})}
                  className="input-field"
                  placeholder="JOB-001"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name *</label>
                <input
                  type="text"
                  value={newPhoto.customerName}
                  onChange={(e) => setNewPhoto({...newPhoto, customerName: e.target.value})}
                  className="input-field"
                  placeholder="Customer name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <input
                  type="text"
                  value={newPhoto.address}
                  onChange={(e) => setNewPhoto({...newPhoto, address: e.target.value})}
                  className="input-field"
                  placeholder="Property address"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={newPhoto.category}
                  onChange={(e) => setNewPhoto({...newPhoto, category: e.target.value})}
                  className="input-field"
                >
                  {categoryOptions.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={newPhoto.description}
                  onChange={(e) => setNewPhoto({...newPhoto, description: e.target.value})}
                  className="input-field"
                  rows="3"
                  placeholder="Photo album description"
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
                onClick={handleAddPhoto}
                className="btn-primary"
              >
                Add Album
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Photo Modal */}
      {showEditModal && editingPhoto && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Edit Photo Album</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Job Number *</label>
                <input
                  type="text"
                  value={editingPhoto.jobNumber}
                  onChange={(e) => setEditingPhoto({...editingPhoto, jobNumber: e.target.value})}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name *</label>
                <input
                  type="text"
                  value={editingPhoto.customerName}
                  onChange={(e) => setEditingPhoto({...editingPhoto, customerName: e.target.value})}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <input
                  type="text"
                  value={editingPhoto.address}
                  onChange={(e) => setEditingPhoto({...editingPhoto, address: e.target.value})}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={editingPhoto.category}
                  onChange={(e) => setEditingPhoto({...editingPhoto, category: e.target.value})}
                  className="input-field"
                >
                  {categoryOptions.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={editingPhoto.description}
                  onChange={(e) => setEditingPhoto({...editingPhoto, description: e.target.value})}
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
                onClick={handleEditPhoto}
                className="btn-primary"
              >
                Update Album
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Photos; 