import React from 'react';

interface PieChartProps {
  data: { label: string; value: number; color: string }[];
}

const PieChart: React.FC<PieChartProps> = ({ data }) => {
  // Calculate the total value for percentages
  const totalValue = data.reduce((acc, item) => acc + item.value, 0);

  // Calculate cumulative percentages to rotate the chart segments
  let cumulativeValue = 0;

  return (
    <div className="flex flex-col items-center">
      {/* Pie Chart */}
      <div className="relative w-64 h-64">
        <svg viewBox="0 0 32 32" className="w-full h-full">
          {data.map((item, index) => {
            const percentage = (item.value / totalValue) * 100;
            const startAngle = cumulativeValue * 3.6; // Convert percentage to degrees
            const endAngle = (cumulativeValue + percentage) * 3.6;
            cumulativeValue += percentage;

            const largeArcFlag = percentage > 50 ? 1 : 0;

            // Calculate positions of the arc
            const x1 = 16 + 16 * Math.cos((startAngle - 90) * (Math.PI / 180));
            const y1 = 16 + 16 * Math.sin((startAngle - 90) * (Math.PI / 180));
            const x2 = 16 + 16 * Math.cos((endAngle - 90) * (Math.PI / 180));
            const y2 = 16 + 16 * Math.sin((endAngle - 90) * (Math.PI / 180));

            return (
              <path
                key={index}
                d={`
                  M 16 16
                  L ${x1} ${y1}
                  A 16 16 0 ${largeArcFlag} 1 ${x2} ${y2}
                  Z
                `}
                fill={item.color}
              />
            );
          })}
        </svg>
      </div>

      {/* Labels horizontally below the pie chart */}
      <div className="mt-4">
        <ul className="flex space-x-4">
          {data.map((item, index) => (
            <li key={index} className="flex items-center space-x-2">
              <span
                className="inline-block w-4 h-4"
                style={{ backgroundColor: item.color }}
              ></span>
              <span className="text-sm">{item.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PieChart;
