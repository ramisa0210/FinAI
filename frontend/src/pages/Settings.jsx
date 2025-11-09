// pages/Settings.jsx (Updated to use actual logged-in user data)
import React, { useState, useEffect } from 'react'; // Added useEffect
import api from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { MdEdit, MdSave, MdLock, MdPhotoCamera, MdDelete } from 'react-icons/md';

// --- Helper Components (InputField, TabButton - No Change) ---
const InputField = ({ label, name, value, onChange, type = "text", disabled = false }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {label}
        </label>
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            disabled={disabled} 
            className={`w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500 
                        ${disabled ? 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed' : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 border-gray-300 dark:border-gray-600'}
                       `}
        />
    </div>
);

const TabButton = ({ label, tabId, activeTab, setActiveTab }) => (
    <button
        onClick={() => setActiveTab(tabId)}
        className={`px-4 py-2 text-base font-medium transition-colors duration-200 ease-in-out
            ${activeTab === tabId
                ? `border-b-4 border-green-700 text-green-700 dark:text-green-400 font-bold`
                : `text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:border-b-2 hover:border-gray-300 dark:hover:border-gray-500`
            }
        `}
    >
        {label}
    </button>
);


// ----------------------------------------------------------------------

export default function Settings() {
    const { user: authUser } = useAuth(); // Renaming to authUser to avoid conflict
    
    // Default safe values for user data if authUser is null/undefined
    const defaultUserData = {
        name: 'Guest User',
        email: '',
        role: 'User',
        phone: '',
        company: '',
        address: '',
        profilePic: '', // A generic image
    };
    
    // Ensure we use the actual user data, falling back to safe defaults
    const initialUser = {
        ...defaultUserData,
        ...authUser, // Overwrite defaults with any data present in authUser
        // Ensure profilePic is prioritized if available in authUser
        profilePic: authUser?.profilePic || defaultUserData.profilePic, 
    };

    const [activeTab, setActiveTab] = useState('profile');
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState(initialUser);
    const [profileImage, setProfileImage] = useState(initialUser.profilePic);

    // FIX: Use useEffect to update formData/profileImage if authUser changes
    useEffect(() => {
        if (authUser) {
            const updatedUser = { ...defaultUserData, ...authUser };
            setFormData(updatedUser);
            setProfileImage(updatedUser.profilePic);
        }
    }, [authUser]);

    // --- Handlers (Logic remains the same, but uses current formData) ---
    
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        try {
            const { data } = await api.put('/users/profile', formData);
            console.log("Profile Updated:", data);
            setIsEditing(false);
            alert("Profile updated successfully.");
        } catch (error) {
            console.error("Profile Update Error:", error);
            alert("Failed to update profile.");
        }
    };

    const handleDeleteAccount = () => {
        if (window.confirm("Are you sure you want to delete your account? This action is irreversible.")) {
            console.log("Account Deletion requested for:", formData.email);
            // 🚨 REAL WORLD: Call your logout function after deletion
            alert("Account deletion initiated (Simulation).");
        }
    };
    
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result);
                // 🚨 REAL WORLD: Upload file to storage and update DB
                console.log("New profile picture selected.");
            };
            reader.readAsDataURL(file);
        }
    };

    // --- Tab Content Components ---

    const ProfileTab = () => (
        <form onSubmit={handleUpdateProfile} className="space-y-6">
            
            {/* 1. Profile Picture Upload Section */}
            <div className="flex items-center space-x-6 pb-4 border-b border-gray-100 dark:border-gray-700">
                <div className="relative w-24 h-24">
                    <img
                        className="w-full h-full object-cover rounded-full border-4 border-white dark:border-gray-800 shadow-md"
                        src={profileImage}
                        alt="Profile"
                    />
                    {isEditing && (
                        <label 
                            htmlFor="profile-upload"
                            className="absolute bottom-0 right-0 p-2 bg-green-500 rounded-full text-white cursor-pointer hover:bg-green-600 transition duration-150"
                            title="Change Profile Picture"
                        >
                            <MdPhotoCamera className="text-lg" />
                            <input
                                id="profile-upload"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleImageUpload}
                            />
                        </label>
                    )}
                </div>
                <div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">{formData.name || 'N/A'}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{formData.role || 'N/A'}</p>
                </div>
            </div>

            {/* 2. Personal Information Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Full Name */}
                <InputField 
                    label="Full Name" 
                    name="name" 
                    value={formData.name || ''} 
                    onChange={handleInputChange} 
                    disabled={!isEditing} 
                />
                
                {/* Email Address */}
                <InputField 
                    label="Email Address (Cannot be changed)" 
                    name="email" 
                    value={formData.email || ''} 
                    disabled={true} 
                />

                {/* Role */}
                <InputField 
                    label="Role" 
                    name="role" 
                    value={formData.role || ''} 
                    onChange={handleInputChange} 
                    disabled={!isEditing} 
                />
                
                {/* Phone Number */}
                <InputField 
                    label="Phone Number" 
                    name="phone" 
                    value={formData.phone || ''} 
                    onChange={handleInputChange} 
                    disabled={!isEditing} 
                />

                {/* Company Name */}
                <InputField 
                    label="Company Name" 
                    name="company" 
                    value={formData.company || ''} 
                    onChange={handleInputChange} 
                    disabled={!isEditing} 
                />
                
                {/* Address */}
                <InputField 
                    label="Address" 
                    name="address" 
                    value={formData.address || ''} 
                    onChange={handleInputChange} 
                    disabled={!isEditing} 
                />
            </div>
            
            {/* 3. Action Buttons */}
            <div className="pt-6 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-4">
                {isEditing ? (
                    <>
                        <button
                            type="button"
                            onClick={() => { 
                                setIsEditing(false); 
                                setFormData(initialUser); // Revert to data loaded from authUser
                            }} 
                            className="px-5 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-150"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex items-center px-5 py-2 bg-green-700 text-white font-semibold rounded-lg hover:bg-green-800 transition duration-150"
                        >
                            <MdSave className="mr-2" /> Save Changes
                        </button>
                    </>
                ) : (
                    <button
                        type="button"
                        onClick={() => setIsEditing(true)}
                        className="flex items-center px-5 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-150"
                    >
                        <MdEdit className="mr-2" /> Edit Profile
                    </button>
                )}
            </div>
        </form>
    );

    const SecurityTab = () => (
        <div className="space-y-6">
            {/* Change Password */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-100 dark:border-gray-700">
                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3 flex items-center">
                    <MdLock className="mr-2 text-xl text-green-700 dark:text-green-400" /> Change Password
                </h4>
                <p className="text-gray-600 dark:text-gray-400 mb-4">Ensure your account is protected with a strong, unique password.</p>
                
                <div className="space-y-4 max-w-sm">
                    <InputField label="Current Password" type="password" />
                    <InputField label="New Password" type="password" />
                    <InputField label="Confirm New Password" type="password" />
                </div>
                
                <button
                    className="mt-6 px-5 py-2 bg-yellow-600 text-white font-semibold rounded-lg hover:bg-yellow-700 transition duration-150"
                    onClick={() => alert("Password change initiated (Simulation).")}
                >
                    Update Password
                </button>
            </div>
            
            {/* Account Deletion */}
            <div className="bg-red-50 dark:bg-red-900 p-6 rounded-lg shadow-md border border-red-300 dark:border-red-700">
                <h4 className="text-lg font-semibold text-red-700 dark:text-red-300 mb-3 flex items-center">
                    <MdDelete className="mr-2 text-xl" /> Danger Zone
                </h4>
                <p className="text-red-600 dark:text-red-400 mb-4">Permanently delete your FinAI account and all associated data.</p>
                <button
                    className="px-5 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-150 flex items-center"
                    onClick={handleDeleteAccount}
                >
                    <MdDelete className="mr-2" /> Delete Account Permanently
                </button>
            </div>
        </div>
    );

    return (
        <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">User Settings</h2>
            
            {/* Tab Navigation */}
            <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6 max-w-3xl">
                <TabButton 
                    label="Profile Information" 
                    tabId="profile" 
                    activeTab={activeTab} 
                    setActiveTab={setActiveTab} 
                />
                <TabButton 
                    label="Security & Privacy" 
                    tabId="security" 
                    activeTab={activeTab} 
                    setActiveTab={setActiveTab} 
                />
            </div>
            
            {/* Tab Content */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg max-w-4xl">
                {activeTab === 'profile' && <ProfileTab />}
                {activeTab === 'security' && <SecurityTab />}
            </div>
        </div>
    );
}