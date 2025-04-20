// create a simple page with a title "personal dashboard"

import React from "react";

const PersonalDashboard = () => {
    return (
        <div className="flex justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="w-full max-w-4xl px-4 py-8">
            <h1 className="text-2xl font-bold mb-4">"personal_dashboard"</h1>
            {/* Add your personal dashboard content here */}
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Welcome to your personal dashboard!</h2>
                <p className="text-gray-700 dark:text-gray-300">Here you can manage your personal information, view statistics, and more.</p>
                {/* Add more content as needed */}
                <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-2">Statistics</h3>
                    <p className="text-gray-700 dark:text-gray-300">You can view your personal statistics here.</p>
                    {/* Add statistics components here */}
                </div>
                <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-2">Settings</h3>
                    <p className="text-gray-700 dark:text-gray-300">Manage your personal settings here.</p>
                    {/* Add settings components here */}
                </div>
            </div>
        </div>
        </div>
    );
}

export default PersonalDashboard;
