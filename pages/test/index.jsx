import React from "react";

const UserCreateForm = () => {
  return (
    <div className="flex justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-4xl px-4 py-8">
        <div className="mb-6">
          <div className="flex items-center text-sm">
            <span>Users</span>
            <span className="mx-2">›</span>
            <span>Create</span>
          </div>
          <h1 className="text-2xl font-bold mt-2">Create</h1>
        </div>

        <form>
          {/* Basic Information */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block mb-1">Full Name *</label>
                <input 
                  type="text" 
                  placeholder="Enter full name" 
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="block mb-1">Email *</label>
                <input 
                  type="email" 
                  placeholder="Enter email address" 
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="block mb-1">Phone *</label>
                <input 
                  type="tel" 
                  placeholder="Enter phone number" 
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="block mb-1">Bio *</label>
                <textarea 
                  placeholder="Enter user bio" 
                  className="w-full p-2 border rounded"
                ></textarea>
              </div>
            </div>
          </div>

          {/* Role & Profession */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Role & Profession</h2>
            <div className="space-y-4">
              <div>
                <label className="block mb-1">Role *</label>
                <select className="w-full p-2 border rounded">
                  <option value="">Select user role</option>
                  <option value="admin">admin</option>
                  <option value="technician">technician</option>
                  <option value="personal">personal</option>
                </select>
                <div className="text-sm text-gray-500 mt-1">Set the permissions and access level for this user</div>
              </div>
              
              <div>
                <label className="block mb-1">Profession *</label>
                <select className="w-full p-2 border rounded">
                  <option value="">Select user profession</option>
                  <option value="Teacher">Teacher</option>
                  <option value="Administrator">Administrator</option>
                  <option value="Engineer">Engineer</option>
                  <option value="Technician">Technician</option>
                  <option value="Manager">Manager</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* Account Setup */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Account Setup</h2>
            <div className="space-y-4">
              <div>
                <label className="block mb-1">Password *</label>
                <input 
                  type="password" 
                  placeholder="Enter password" 
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="block mb-1">Confirm Password *</label>
                <input 
                  type="password" 
                  placeholder="Confirm password" 
                  className="w-full p-2 border rounded"
                />
                <div className="text-sm text-gray-500 mt-1">
                  Password must be at least 8 characters with uppercase, numbers, and special characters
                </div>
              </div>
            </div>
          </div>
          
          <div className="mb-8">
            <div className="space-y-4">
              {/* Send Email Toggle */}
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Send Email</p>
                  <p className="text-sm text-gray-500">Send login credentials to user's email</p>
                </div>
                <label className="inline-flex items-center">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer"></div>
                </label>
              </div>
              
              {/* Password Toggle */}
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Require Password Change</p>
                  <p className="text-sm text-gray-500">Force user to change password on first login</p>
                </div>
                <label className="inline-flex items-center">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end mt-8">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded mr-2"
            >
              Create
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserCreateForm;