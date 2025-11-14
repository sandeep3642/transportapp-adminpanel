import { ChevronDown, Search, Star } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import * as Chart from "chart.js";
import { renderStars } from "../../components/StarRating";

const RenderPerformanceMetrics = () => {
  // Register Chart.js components
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);
  const [selectedQuarter, setSelectedQuarter] = useState("1st Quarter");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    Chart.Chart.register(
      Chart.BarController, // ✅ Add this line
      Chart.CategoryScale,
      Chart.LinearScale,
      Chart.BarElement,
      Chart.Title,
      Chart.Tooltip,
      Chart.Legend
    );
  }, []);
  useEffect(() => {
    if (chartRef.current) {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      // Small delay to ensure DOM is ready
      const timer = setTimeout(() => {
        const ctx = chartRef.current;
        if (ctx) {
          chartInstanceRef.current = new Chart.Chart(ctx, {
            type: "bar",
            data: {
              labels: ["Jan", "Feb", "Mar"],
              datasets: [
                {
                  data: [10, 16, 14],
                  backgroundColor: "#1B8341",
                  borderRadius: 4,
                  barThickness: 10,
                },
              ],
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false,
                },
                tooltip: {
                  enabled: true,
                },
              },
              scales: {
                x: {
                  grid: {
                    display: false,
                  },
                  border: {
                    display: false,
                  },
                  ticks: {
                    color: "#666",
                    font: {
                      size: 12,
                    },
                  },
                },
                y: {
                  beginAtZero: true,
                  max: 20,
                  ticks: {
                    stepSize: 5,
                    color: "#666",
                    font: {
                      size: 12,
                    },
                  },
                  grid: {
                    display: true,
                  },
                  border: {
                    display: false,
                  },
                },
              },
            },
          });
        }
      }, 100);

      return () => {
        clearTimeout(timer);
        if (chartInstanceRef.current) {
          chartInstanceRef.current.destroy();
          chartInstanceRef.current = null;
        }
      };
    }
  }, []);
  const [technicianPerformance, setTechnicianPerformance] = useState({
    rating: 3.6, // Change this to test: 4.7 for good, 3.6 or lower for poor
    completionTime: 2.3, // hours
    firstTimeFixRate: 52, // percentage
    reviewMessage: "Delayed Arrival and Response Time!",
  });

  // Helper function to determine if performance is good or poor
  const isGoodPerformance = (rating, firstTimeFixRate) => {
    return rating >= 4.0 && firstTimeFixRate >= 80;
  };
  const isGood = isGoodPerformance(
    technicianPerformance.rating,
    technicianPerformance.firstTimeFixRate
  );

  // Dynamic data based on performance
  const performanceData = {
    good: {
      rating: 4.7,
      stars: 5,
      completionTime: 1.5,
      firstTimeFixRate: 92,
      reviewMessage: "Excellent Service and Quick Response",
      tableTitle: "High ratings",
      reviews: [
        {
          date: "2025-05-09",
          name: "John T.",
          message: "Technician is very good",
          rating: 4,
        },
        {
          date: "2025-05-08",
          name: "Priya R.",
          message: "Best ever service received",
          rating: 4,
        },
        {
          date: "2025-05-08",
          name: "Vishal K.",
          message: "Best app and Technician",
          rating: 4,
        },
      ],
    },
    poor: {
      rating: 3.6,
      stars: 3,
      completionTime: 2.3,
      firstTimeFixRate: 52,
      reviewMessage: "Delayed Arrival and Response Time!",
      tableTitle: "Low ratings",
      reviews: [
        {
          date: "2025-05-09",
          name: "John T.",
          message: "Delayed Arrival",
          rating: 2,
        },
        {
          date: "2025-05-08",
          name: "Priya R.",
          message: "Issue not fully resolved",
          rating: 2,
        },
        {
          date: "2025-05-08",
          name: "Vishal K.",
          message: "Technician not behaving properly",
          rating: 2,
        },
      ],
    },
  };

  const currentData = isGood ? performanceData.good : performanceData.poor;

  return (
    <div className="space-y-6">
      {/* Performance Chart and Stats Row */}
    

      {/* Customer Reviews Table */}
      <div className="bg-white rounded-lg border border-gray-200">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <h3 className={`text-lg font-semibold text-gray-800`}>
                {currentData.tableTitle}
              </h3>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64 px-4 py-2 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Search className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-900">
                  Date
                </th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-900">
                  Name
                </th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-900">
                  Message Summary
                </th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-900">
                  Ratings
                </th>
              </tr>
            </thead>
            <tbody>
              {currentData.reviews
                .filter(
                  (review) =>
                    review.name
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                    review.message
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                )
                .map((review, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-4 px-6 text-sm text-gray-900">
                      {review.date}
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-900">
                      {review.name}
                    </td>
                    <td className={`py-4 px-6 text-sm text-gray-900`}>
                      {review.message}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex space-x-1">
                        {renderStars(review.rating)}
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RenderPerformanceMetrics;
