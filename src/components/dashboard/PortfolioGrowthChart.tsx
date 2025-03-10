
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

// Sample data for portfolio growth
const portfolioData = [
  { month: "Jan", value: 2000 },
  { month: "Feb", value: 2200 },
  { month: "Mar", value: 2100 },
  { month: "Apr", value: 2400 },
  { month: "May", value: 2800 },
  { month: "Jun", value: 3100 },
  { month: "Jul", value: 3500 },
  { month: "Aug", value: 3750 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-ana-darkblue p-3 border border-ana-purple/30 rounded shadow">
        <p className="text-white font-medium">{`${label}`}</p>
        <p className="text-ana-purple">
          ${payload[0].value.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

const PortfolioGrowthChart: React.FC = () => {
  return (
    <Card className="glass-card mb-8">
      <CardHeader>
        <CardTitle className="text-white flex items-center justify-between">
          Portfolio Growth
          <span className="text-sm font-normal text-ana-purple">Past 8 months</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={portfolioData}
              margin={{
                top: 10,
                right: 30,
                left: 20,
                bottom: 10,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(140, 82, 255, 0.2)" />
              <XAxis 
                dataKey="month" 
                stroke="rgba(255, 255, 255, 0.7)"
                tick={{ fill: "rgba(255, 255, 255, 0.7)" }}
              />
              <YAxis 
                stroke="rgba(255, 255, 255, 0.7)"
                tick={{ fill: "rgba(255, 255, 255, 0.7)" }}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ color: "white" }} />
              <Line
                type="monotone"
                dataKey="value"
                name="Portfolio Value"
                stroke="#8c52ff"
                strokeWidth={3}
                dot={{ fill: "#8c52ff", r: 6 }}
                activeDot={{ r: 8, fill: "#ff5c87" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default PortfolioGrowthChart;
