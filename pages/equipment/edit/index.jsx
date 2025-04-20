// create a simple page with a title "equipment_edit"


const EquipmentEdit = () => {
    return (
        <div className="flex justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="w-full max-w-4xl px-4 py-8">
                <h1 className="text-2xl font-bold mb-4">"equipment_edit"</h1>
                {/* Add your equipment edit content here */}
                <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-4">"welcome_equipment_edit"</h2>
                    <p className="text-gray-700 dark:text-gray-300">"edit_equipment_details"</p>
                    {/* Add more content as needed */}
                </div>
            </div>
        </div>
    );
}

export default EquipmentEdit;