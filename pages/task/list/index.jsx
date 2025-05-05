"use client"

import { useState } from "react"
import DynamicTable from "../../components/DynamicTable"
import Sidebar from "../../components/sidebar"
import { useDarkMode } from "../../darkLightMode/darkModeContext"
import { Clock, Activity, CheckCircle, ListTodo } from "lucide-react"
import { ArrowRight2 } from "iconsax-react"
import { useLanguage } from "../../translations/contexts/languageContext"
import { Card } from "../../components/cards"

export default function TasksManagement() {
  const { t } = useLanguage()
  const { isDarkMode } = useDarkMode()

  // Sample task data
  const [data, setData] = useState([
    {
      "Task name": "Remove Backend",
      Location: "NS Men",
      Responsible: "Emad Djemai",
      Priority: "high",
      Deadline: "12/12/2012",
      Status: "completed",
    },
    {
      "Task name": "Emad Mohamed",
      Location: "Security",
      Responsible: "nm_djemai@esi.dz",
      Priority: "medium",
      Deadline: "07/26/2311",
      Status: "todo",
    },
    {
      "Task name": "Emad Mohamed",
      Location: "Student",
      Responsible: "nm_djemai@esi.dz",
      Priority: "medium",
      Deadline: "07/26/2311",
      Status: "inprogress",
    },
    {
      "Task name": "Emad Mohamed",
      Location: "Cleaning",
      Responsible: "nm_djemai@esi.dz",
      Priority: "low",
      Deadline: "07/26/2311",
      Status: "pending",
    },
    {
      "Task name": "Emad Mohamed",
      Location: "Student",
      Responsible: "nm_djemai@esi.dz",
      Priority: "high",
      Deadline: "07/26/2311",
      Status: "completed",
    },
    {
      "Task name": "Emad Mohamed",
      Location: "Student",
      Responsible: "nm_djemai@esi.dz",
      Priority: "medium",
      Deadline: "07/26/2311",
      Status: "todo",
    },
  ])

  const handleEdit = (row) => {
    console.log("Edit:", row)
    // Your edit logic here
  }

  const handleDelete = (row) => {
    console.log("Delete:", row)
    // Your delete logic here
  }

  // State for storing task statistics
  const [taskStats, setTaskStats] = useState({
    pending: 29,
    inProgress: 15,
    completed: 17,
    toDo: 9,
  })

  // Generate stats cards data
  const stats = [
    {
      title: t("tasksList", "cards", "sub", 1),
      count: taskStats.pending,
      increase: t("uniquetache"),
      icon: <Clock className="h-5 w-5 text-neutral-950 dark:text-white" />,
    },
    {
      title: t("tasksList", "cards", "sub", 2),
      count: taskStats.inProgress,
      increase: t("uniquetache"),
      icon: <Activity className="h-5 w-5 text-neutral-950 dark:text-white" />,
    },
    {
      title: t("tasksList", "cards", "sub", 3),
      count: taskStats.completed,
      increase: t("uniquetache"),
      icon: <CheckCircle className="h-5 w-5 text-neutral-950 dark:text-white" />,
    },
    {
      title: t("tasksList", "cards", "sub", 4),
      count: taskStats.toDo,
      increase: t("uniquetache"),
      icon: <ListTodo className="h-5 w-5 text-neutral-950 dark:text-white" />,
    },
  ]

  return (
    <div className="flex flex-col md:flex-row bg-neutral-50 dark:bg-neutral-990 h-full">
      <div>
        <Sidebar activeItem={"tasks"} />
      </div>

      <div className="w-full px-4 py-4">
        <div>
          <div className="flex items-center gap-2 mb-8 text-neutral-950 dark:text-neutral-50">
            {t("tasksList", "path", 1)} <ArrowRight2 size="14" color="#697689" /> {t("tasksList", "path", 2)}
          </div>
          <h1 className="text-2xl font-bold text-neutral-950 dark:text-neutral-50 mb-6">
            {t("tasksList", "cards", "title")}
          </h1>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
            {stats.map((stat, index) => (
              <Card key={index} title={stat.title} count={stat.count} increase={stat.increase} icon={stat.icon} />
            ))}
          </div>
        </div>
        <DynamicTable
          data={data}
          isDarkMode={isDarkMode}
          title={t("tasksList", "searchbar", "title")}
          columnConfig={{
            "Task name": { title: t("tasksList", "tablehead", 1) },
            Location: { title: t("tasksList", "tablehead", 2) },
            Responsible: { title: t("tasksList", "tablehead", 3) },
            Priority: { title: t("tasksList", "tablehead", 4) },
            Deadline: { title: t("tasksList", "tablehead", 5) },
            Status: { title: t("tasksList", "tablehead", 6) },
          }}
          addButtonText={t("tasksList", "searchbar", "buttons", 3)}
          dropdownFields={["Priority", "Status"]}
          onEdit={handleEdit}
          onDelete={handleDelete}
          styled={["Priority", "Status"]}
        />
      </div>
    </div>
  )
}
