import React, { useState } from 'react';
import { 
  Plus, 
  Clock,
  Users,
  MapPin,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import toast from 'react-hot-toast';

const Scheduling = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState(null);

  const [schedules, setSchedules] = useState([
    {
      id: 1,
      date: '2024-01-25',
      time: '08:00',
      jobNumber: 'JOB-001',
      customerName: 'John Smith',
      address: '123 Main St, Anytown, ST 12345',
      crew: ['Mike Johnson', 'Tom Wilson', 'Lisa Davis'],
      description: 'Complete roof replacement',
      status: 'Scheduled'
    },
    {
      id: 2,
      date: '2024-01-26',
      time: '09:00',
      jobNumber: 'JOB-002',
      customerName: 'Sarah Wilson',
      address: '456 Oak Ave, Somewhere, ST 54321',
      crew: ['Mike Johnson', 'Tom Wilson'],
      description: 'Gutter replacement',
      status: 'Scheduled'
    }
  ]);

  const [newSchedule, setNewSchedule] = useState({
    date: '',
    time: '',
    jobNumber: '',
    customerName: '',
    address: '',
    crew: [],
    description: '',
    status: 'Scheduled'
  });

  const crewOptions = ['Mike Johnson', 'Tom Wilson', 'Lisa Davis', 'John Smith', 'Sarah Wilson'];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    
    return { daysInMonth, startingDay };
  };

  const getMonthName = (date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const getPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const getNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  const getSchedulesForDate = (date) => {
    return schedules.filter(schedule => schedule.date === formatDate(date));
  };

  const handleAddSchedule = () => {
    if (!newSchedule.date || !newSchedule.time || !newSchedule.jobNumber) {
      toast.error('Please fill in all required fields');
      return;
    }

    const schedule = {
      id: Date.now(),
      ...newSchedule
    };

    setSchedules([...schedules, schedule]);
    setNewSchedule({
      date: '',
      time: '',
      jobNumber: '',
      customerName: '',
      address: '',
      crew: [],
      description: '',
      status: 'Scheduled'
    });
    setShowAddModal(false);
    toast.success('Schedule added successfully');
  };

  const handleEditSchedule = () => {
    if (!editingSchedule.date || !editingSchedule.time || !editingSchedule.jobNumber) {
      toast.error('Please fill in all required fields');
      return;
    }

    setSchedules(schedules.map(schedule => 
      schedule.id === editingSchedule.id ? editingSchedule : schedule
    ));
    setShowEditModal(false);
    setEditingSchedule(null);
    toast.success('Schedule updated successfully');
  };

  const handleDeleteSchedule = (id) => {
    if (window.confirm('Are you sure you want to delete this schedule?')) {
      setSchedules(schedules.filter(schedule => schedule.id !== id));
      toast.success('Schedule deleted successfully');
    }
  };

  const openEditModal = (schedule) => {
    setEditingSchedule({ ...schedule });
    setShowEditModal(true);
  };

  const renderCalendar = () => {
    const { daysInMonth, startingDay } = getDaysInMonth(currentDate);
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDay; i++) {
      days.push(<div key={`empty-${i}`} className="p-2 text-gray-400"></div>);
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const daySchedules = getSchedulesForDate(date);
      const isToday = formatDate(date) === formatDate(new Date());
      const isSelected = selectedDate && formatDate(date) === formatDate(selectedDate);

      days.push(
        <div
          key={day}
          className={`p-2 border border-gray-200 min-h-[100px] cursor-pointer hover:bg-gray-50 ${
            isToday ? 'bg-blue-50 border-blue-300' : ''
          } ${isSelected ? 'bg-blue-100 border-blue-400' : ''}`}
          onClick={() => setSelectedDate(date)}
        >
          <div className="text-sm font-medium text-gray-900 mb-1">{day}</div>
          {daySchedules.map((schedule) => (
            <div
              key={schedule.id}
              className="text-xs bg-blue-100 text-blue-800 p-1 rounded mb-1 truncate"
              title={`${schedule.time} - ${schedule.customerName}`}
            >
              {schedule.time} - {schedule.customerName}
            </div>
          ))}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Scheduling</h1>
          <p className="text-gray-600">Manage crew schedules and job assignments</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add Schedule</span>
        </button>
      </div>

      {/* Calendar Navigation */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={getPreviousMonth}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h2 className="text-xl font-semibold">{getMonthName(currentDate)}</h2>
          <button
            onClick={getNextMonth}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
              {day}
            </div>
          ))}
          {renderCalendar()}
        </div>
      </div>

      {/* Selected Date Details */}
      {selectedDate && (
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">
            Schedule for {selectedDate.toLocaleDateString()}
          </h3>
          <div className="space-y-4">
            {getSchedulesForDate(selectedDate).map((schedule) => (
              <div key={schedule.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-blue-500" />
                    <div>
                      <div className="font-medium text-gray-900">
                        {schedule.time} - {schedule.jobNumber}
                      </div>
                      <div className="text-sm text-gray-600">{schedule.customerName}</div>
                      <div className="text-sm text-gray-500 flex items-center">
                        <MapPin className="w-3 h-3 mr-1" />
                        {schedule.address}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => openEditModal(schedule)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteSchedule(schedule.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="text-sm text-gray-600">{schedule.description}</div>
                  <div className="mt-2 flex items-center space-x-2">
                    <Users className="w-4 h-4 text-gray-400" />
                    <div className="text-sm text-gray-600">
                      Crew: {schedule.crew.join(', ')}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {getSchedulesForDate(selectedDate).length === 0 && (
              <div className="text-center text-gray-500 py-8">
                No schedules for this date
              </div>
            )}
          </div>
        </div>
      )}

      {/* Add Schedule Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add Schedule</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
                <input
                  type="date"
                  value={newSchedule.date}
                  onChange={(e) => setNewSchedule({...newSchedule, date: e.target.value})}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Time *</label>
                <input
                  type="time"
                  value={newSchedule.time}
                  onChange={(e) => setNewSchedule({...newSchedule, time: e.target.value})}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Job Number *</label>
                <input
                  type="text"
                  value={newSchedule.jobNumber}
                  onChange={(e) => setNewSchedule({...newSchedule, jobNumber: e.target.value})}
                  className="input-field"
                  placeholder="JOB-001"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name</label>
                <input
                  type="text"
                  value={newSchedule.customerName}
                  onChange={(e) => setNewSchedule({...newSchedule, customerName: e.target.value})}
                  className="input-field"
                  placeholder="Customer name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <input
                  type="text"
                  value={newSchedule.address}
                  onChange={(e) => setNewSchedule({...newSchedule, address: e.target.value})}
                  className="input-field"
                  placeholder="Property address"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Crew</label>
                <select
                  multiple
                  value={newSchedule.crew}
                  onChange={(e) => {
                    const selected = Array.from(e.target.selectedOptions, option => option.value);
                    setNewSchedule({...newSchedule, crew: selected});
                  }}
                  className="input-field"
                >
                  {crewOptions.map(crew => (
                    <option key={crew} value={crew}>{crew}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={newSchedule.description}
                  onChange={(e) => setNewSchedule({...newSchedule, description: e.target.value})}
                  className="input-field"
                  rows="3"
                  placeholder="Job description"
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
                onClick={handleAddSchedule}
                className="btn-primary"
              >
                Add Schedule
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Schedule Modal */}
      {showEditModal && editingSchedule && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Edit Schedule</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
                <input
                  type="date"
                  value={editingSchedule.date}
                  onChange={(e) => setEditingSchedule({...editingSchedule, date: e.target.value})}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Time *</label>
                <input
                  type="time"
                  value={editingSchedule.time}
                  onChange={(e) => setEditingSchedule({...editingSchedule, time: e.target.value})}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Job Number *</label>
                <input
                  type="text"
                  value={editingSchedule.jobNumber}
                  onChange={(e) => setEditingSchedule({...editingSchedule, jobNumber: e.target.value})}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name</label>
                <input
                  type="text"
                  value={editingSchedule.customerName}
                  onChange={(e) => setEditingSchedule({...editingSchedule, customerName: e.target.value})}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <input
                  type="text"
                  value={editingSchedule.address}
                  onChange={(e) => setEditingSchedule({...editingSchedule, address: e.target.value})}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Crew</label>
                <select
                  multiple
                  value={editingSchedule.crew}
                  onChange={(e) => {
                    const selected = Array.from(e.target.selectedOptions, option => option.value);
                    setEditingSchedule({...editingSchedule, crew: selected});
                  }}
                  className="input-field"
                >
                  {crewOptions.map(crew => (
                    <option key={crew} value={crew}>{crew}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={editingSchedule.description}
                  onChange={(e) => setEditingSchedule({...editingSchedule, description: e.target.value})}
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
                onClick={handleEditSchedule}
                className="btn-primary"
              >
                Update Schedule
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Scheduling; 