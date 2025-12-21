import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip);

export const DoughnutChart = ({ data }) => {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
      
      {/* GRAPH AREA (FULL SPACE) */}
      <div style={{ flexGrow: 1, position: "relative" }}>
        <Doughnut
          data={data}
          options={{
            responsive: true,
            maintainAspectRatio: false, // 🔥 CRITICAL
            plugins: {
              legend: {
                display: false, // 🔥 disable internal legend
              },
            },
          }}
        />
      </div>

      {/* LEGEND AREA (SEPARATE DIV) */}
      <div
        style={{
          marginTop: "8px",
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          justifyContent: "center",
          fontSize: "12px",
        }}
      >
        {data.labels.map((label, index) => (
          <div
            key={label}
            style={{ display: "flex", alignItems: "center", gap: "6px" }}
          >
            <span
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                backgroundColor: data.datasets[0].backgroundColor[index],
                display: "inline-block",
              }}
            />
            <span>{label}</span>
          </div>
        ))}
      </div>

    </div>
  );
};
