import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const data = [
  { name: "Kawsar", Age: 16, score: 80 },
  { name: "Bushra", Age: 23, score: 90 },
  { name: "Milad", Age: 27, score: 70 },
  { name: "Musadiq", Age: 30, score: 60 },
  { name: "Negeen", Age: 35, score: 95 },
  { name: "Mursal", Age: 36, score: 100 }
];

const data2 = [
  { name: "Kawsar", Age: 16, score: 80, img: "https://i.ibb.co/4PVpRgV/kawsar.png" },
  { name: "Bushra", Age: 23, score: 90, img: "https://i.ibb.co/ZmVK94s/bushra.png" },
  { name: "Milad", Age: 27, score: 70, img: "https://i.ibb.co/4JYb1p9/milad.png" },
  { name: "Musadiq", Age: 30, score: 60, img: "https://i.ibb.co/fGLC2zd/musadiq.png" },
  { name: "Negeen", Age: 35, score: 95, img: "https://i.ibb.co/nBNLdGV/negeen.png" },
  { name: "Mursal", Age: 36, score: 100, img: "https://i.ibb.co/nk1cLH7/mursal.png" }
];

const App = () => {
  return (
    <div className="">
      <LineChart
      width={600}
      height={300}
      data={data} //data baroye chart mo
      style={{ margin: "0 auto" }}
    >
      <CartesianGrid strokeDasharray="3 3" /> {/*for bg lines*/ }
      <XAxis dataKey="name" /> {/*for bottom straigth line with the names*/ }
      <YAxis /> {/*for the lines on the left with the numbers*/ }
      <Tooltip /> {/*for pop ups*/ }
      <Legend /> {/*for the color of the lines*/ }

     {/* datakey="score" baroye moyan kadan field to graph */}
      <Line type="monotone" dataKey="score"  stroke="#8884d8" />
    </LineChart>

    
    </div>
  );
};

export default App;