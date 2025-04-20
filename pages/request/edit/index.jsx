// create a simple page with a title "request_edit"

import React from "react";

const RequestEdit = () => {
    return (
        <div className="flex justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="w-full max-w-4xl px-4 py-8">
                <h1 className="text-2xl font-bold mb-4">"request_edit"</h1>
                {/* Add your request edit content here */}
                <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-4">"welcome_request_edit"</h2>
                    <p className="text-gray-700 dark:text-gray-300">"edit_request_details"</p>
                    {/* Add more content as needed */}
                </div>
            </div>
        </div>
    );
}

export default RequestEdit;