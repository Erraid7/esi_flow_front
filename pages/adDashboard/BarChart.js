// components/BarChart.js
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Bar } from 'react-chartjs-2';
  
  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
  
  export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Sample Bar Chart',
      },
    },
  };
  
  const labels = ['January', 'February', 'March', 'April', 'May'];
  
  export const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: [30, 20, 50, 40, 60],
        backgroundColor: 'rgba(59, 130, 246, 0.7)', // Tailwind blue-500 with opacity
      },
    ],
  };
  
  export default function BarChart() {
    return <Bar options={options} data={data} />;
  }
  