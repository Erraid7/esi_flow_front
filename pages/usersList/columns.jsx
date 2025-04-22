import { ColumnHeader, DropdownHeader } from "./ColumnHeader"
import { useFilter } from "./FilterContext"
import { Edit, Trash } from "lucide-react"

export const getColumns = () => {
  const { getUniqueValues } = useFilter()

  const roleOptions = getUniqueValues("role")
  const professionOptions = getUniqueValues("profession")

  return [
    {
      name: <ColumnHeader title="Name" field="name" />,
      selector: (row) => row.name,
    },
    {
      name: <ColumnHeader title="Profession" field="profession" />,
      selector: (row) => row.profession,
    },
    {
      name: <ColumnHeader title="E-mail" field="email" />,
      selector: (row) => row.email,
    },
    {
      name: <ColumnHeader title="Phone Number" field="phoneNumber" />,
      selector: (row) => row.phoneNumber,
    },
    {
      name: <DropdownHeader title="Role" options={roleOptions} field="role" />,
      selector: (row) => row.role,
      cell: (row) => (
        <div
          className={`px-3 py-1 rounded-full text-xs font-medium flex items-center ${
            row.role === "Admin"
              ? "bg-green-100 text-green-800"
              : row.role === "Technician"
                ? "bg-purple-100 text-purple-800"
                : "bg-blue-100 text-blue-800"
          }`}
        >
          <span className="mr-1.5">
            <svg className="h-2 w-2" viewBox="0 0 8 8" fill="currentColor">
              <circle cx="4" cy="4" r="3" />
            </svg>
          </span>
          {row.role}
        </div>
      ),
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="flex space-x-2">
          <button className="text-gray-600 hover:text-blue-600">
            <Edit size={18} />
          </button>
          <button className="text-gray-600 hover:text-red-600">
            <Trash size={18} />
          </button>
        </div>
      ),
      button: true,
      width: "100px",
    },
  ]
}
