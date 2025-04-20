// create a simple page with a title "task_list"

import React from 'react';


const TaskList = () => {
    return (
        <div className="flex justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="w-full max-w-4xl px-4 py-8">
                <h1 className="text-2xl font-bold mb-4">"task_list"</h1>
                {/* Add your task list content here */}
                <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-4">"welcome_task_list"</h2>
                    <p className="text-gray-700 dark:text-gray-300">"manage_tasks"</p>
                    {/* Add more content as needed */}
                </div>
            </div>
        </div>
    );
}

export default TaskList;