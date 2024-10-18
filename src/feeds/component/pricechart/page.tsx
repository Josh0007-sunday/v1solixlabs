import React from "react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";

const data = [
  { time: "00:00", price: 31000 },
  { time: "04:00", price: 31200 },
  { time: "08:00", price: 30800 },
  { time: "12:00", price: 31500 },
  { time: "16:00", price: 31300 },
  { time: "20:00", price: 31700 },
  { time: "24:00", price: 31900 },
];

const PriceChart: React.FC = () => {
  const currentPrice = data[data.length - 1].price;
  const previousPrice = data[0].price;
  const priceChange = currentPrice - previousPrice;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="text-2xl font-bold">${currentPrice.toFixed(2)}</div>
        <div
          className={`text-lg ${
            priceChange >= 0 ? "text-green-500" : "text-red-500"
          }`}
        >
          {priceChange >= 0 ? "+" : "-"}${Math.abs(priceChange).toFixed(2)}
        </div>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <XAxis dataKey="time" />
          <YAxis domain={["auto", "auto"]} hide />
          <Line
            type="monotone"
            dataKey="price"
            stroke={priceChange >= 0 ? "#10B981" : "#EF4444"}
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PriceChart;
