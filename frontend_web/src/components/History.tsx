import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";

interface HistoryItem {
  mood: string;
  stressLevel: number;
  last_analysed: string;
  _id: string;
}

const History: React.FC = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/store/user/data/${localStorage.getItem("id")}`);
        const data = await response.json();
  
        if (!data.success) {
          throw new Error("Failed to fetch history");
        }
  
        setHistory(data.history.reverse()); // Reverse to show latest first
      } catch (err) {
        setError("Error fetching history");
      } finally {
        setLoading(false);
      }
    };
  
    fetchHistory();
  }, []);
  

  if (loading) return <p className="text-center text-lg font-semibold">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <>
            <Navbar toggleSidebar={undefined} />
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mb-4">User Sentiment History</h2>
      <div className="bg-white shadow-md rounded-lg p-4">
        {history.length === 0 ? (
          <p className="text-center text-gray-500">No history found.</p>
        ) : (
          <ul className="space-y-4">
            {history.map((item) => (
              <li key={item._id} className="border p-4 rounded-md shadow-sm bg-gray-50">
                <p className="text-lg font-semibold capitalize">
                  Mood: <span className="text-blue-500">{item.mood}</span>
                </p>
                <p className="text-gray-700">Stress Level: {item.stressLevel}%</p>
                <p className="text-gray-500 text-sm">
                  Last Analyzed: {new Date(item.last_analysed).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
    </>
  );
};

export default History;
