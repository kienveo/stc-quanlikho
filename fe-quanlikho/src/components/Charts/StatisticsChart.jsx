import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const StatisticsChart = () => {
  const [data, setData] = useState([]);
  const [isUsingDemoData, setIsUsingDemoData] = useState(false);

  useEffect(() => {
    // Check for demo data first
    const demoSalesTrend = localStorage.getItem('demo_sales_trend');
    if (demoSalesTrend) {
      try {
        const demoData = JSON.parse(demoSalesTrend);
        setData(demoData);
        setIsUsingDemoData(true);
        return;
      } catch (error) {
        console.error("Error parsing demo sales data:", error);
      }
    }

    // Fallback to API
    axiosInstance
      .get("/api/v1/un_auth/product/product_list")
      .then((response) => {
        const formattedData = response.data?.data?.map((item, index) => ({
          name: `Product ${index + 1}`,
          count: 1,
        })) || [];
        setData(formattedData);
        setIsUsingDemoData(false);
      })
      .catch((error) => {
        console.error("Error when calling statistics API:", error);
        // Use fallback data if API fails
        setData([
          { name: 'Tháng 1', revenue: 100000000, orders: 50 },
          { name: 'Tháng 2', revenue: 150000000, orders: 75 },
          { name: 'Tháng 3', revenue: 200000000, orders: 100 }
        ]);
        setIsUsingDemoData(false);
      });
  }, []);

  return (
    <div>
      {isUsingDemoData && (
        <div className="alert alert-info alert-sm mb-2">
          <i className="bi bi-info-circle me-1"></i>
          <small>Đang sử dụng dữ liệu demo</small>
        </div>
      )}
      <ResponsiveContainer width="100%" height={220}>
        <BarChart
          data={data}
          margin={{ top: 15, right: 15, bottom: 0, left: -30 }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="month" />
          <YAxis allowDecimals={false} />
          <Tooltip 
            formatter={(value, name) => {
              if (name === 'revenue') return [`${value.toLocaleString()} VNĐ`, 'Doanh thu'];
              if (name === 'orders') return [value, 'Đơn hàng'];
              if (name === 'profit') return [`${value.toLocaleString()} VNĐ`, 'Lợi nhuận'];
              return [value, name];
            }}
          />
          <Legend />
          <Bar dataKey="revenue" barSize={40} fill="#8884d8" name="Doanh thu" />
          <Bar dataKey="orders" barSize={40} fill="#82ca9d" name="Đơn hàng" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StatisticsChart;
