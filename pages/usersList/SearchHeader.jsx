"use client"

export default function SearchHeader({ title, searchQuery, onSearchChange, onClearSearch, onClearFilters, onAddNew }) {
  return (
    <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center w-full">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">{title}</h2>

      <div className="flex items-center gap-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md px-4 py-2 pl-10 w-64"
            value={searchQuery}
            onChange={(e) => onSearchChange(e)}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-3 top-2.5 text-gray-500 h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          {searchQuery && (
            <button onClick={onClearSearch} className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        <button
          onClick={onClearFilters}
          className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-md px-4 py-2 text-sm"
        >
          Clear Filters
        </button>

        <button
          onClick={onAddNew}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-md px-4 py-2 text-sm flex items-center gap-2"
        >
          Add User
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>
    </div>
  )
}
