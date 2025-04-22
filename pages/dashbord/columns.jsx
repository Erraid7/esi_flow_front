import { ColumnHeader, DropdownHeader } from "./ColumnHeader"
import { useFilter } from "./FilterContext"

export const getColumns = () => {
  const { getUniqueValues } = useFilter()

  const priorityOptions = getUniqueValues("priority")
  const statusOptions = getUniqueValues("status")

  return [
    {
      name: <ColumnHeader title="Task" field="task" />,
      selector: (row) => row.task,
    },
    {
      name: <ColumnHeader title="Location" field="location" />,
      selector: (row) => row.location,
    },
    {
      name: <ColumnHeader title="Person" field="person" />,
      selector: (row) => row.person,
    },
    {
      name: <DropdownHeader title="Priority" options={priorityOptions} field="priority" />,
      selector: (row) => row.priority,
      cell: (row) => (
        <div
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            row.priority === "High"
              ? "bg-red-100 text-red-800"
              : row.priority === "Medium"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-green-100 text-green-800"
          }`}
        >
          {row.priority}
        </div>
      ),
    },
    {
      name: "Deadline",
      selector: (row) => row.deadline,
    },
    {
      name: <DropdownHeader title="Status" options={statusOptions} field="status" />,
      selector: (row) => row.status,
      cell: (row) => (
        <div
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            row.status === "Completed"
              ? "bg-green-100 text-green-800"
              : row.status === "In Progress"
                ? "bg-blue-100 text-blue-800"
                : row.status === "Pending"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-gray-100 text-gray-800"
          }`}
        >
          {row.status}
        </div>
      ),
    },
  ]
}
