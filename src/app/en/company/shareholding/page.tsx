"use client";

import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { Doughnut, Pie } from "react-chartjs-2";

import Breadcrumb from "@/components/ui/breadcrumb";

ChartJS.register(ArcElement, Tooltip, Legend);

const shareholderData = {
  labels: ["Foreign shareholders", "Corporate shareholders", "Fewer than 100 shares", "100–1,000 shares", "More than 1,000 shares"],
  datasets: [{ label: "Number of shareholders", data: [79, 13, 2981, 859, 65], backgroundColor: ["rgba(0,63,92,.6)", "rgba(88,80,141,.6)", "rgba(188,80,144,.6)", "rgba(255,99,97,.6)", "rgba(255,166,0,.6)"], borderColor: ["rgba(66,135,245,.4)"], borderWidth: 1 }],
};

const ownershipData = {
  labels: ["Government of Mongolia", "Mongolian and foreign individuals and legal entities"],
  datasets: [{ label: "Number of shares", data: [24499287, 1370989], backgroundColor: ["rgba(255,193,84,.6)", "rgba(71,179,156,.6)"], borderColor: ["rgba(66,135,245,.4)"], borderWidth: 1 }],
};

export default function ShareholdingPage() {
  return (
    <div>
      <Breadcrumb locale="en" data={["Corporate governance", "Shareholding structure"]} />
      <h1 className="mb-6 text-2xl font-black text-brand-1">Shareholding structure</h1>
      <div className="flex flex-wrap gap-10">
        <section className="mx-auto max-w-[440px] flex-1 text-center">
          <h2 className="mb-5 font-bold">Shareholders by category — first half of 2022</h2>
          <Doughnut data={shareholderData} />
          <table className="table mt-4"><thead><tr><th>Shareholder category</th><th>Count</th></tr></thead><tbody>{shareholderData.labels.map((label, index) => <tr key={label}><td>{label}</td><td>{shareholderData.datasets[0].data[index]}</td></tr>)}</tbody></table>
        </section>
        <section className="mx-auto max-w-[440px] flex-1 text-center">
          <h2 className="mb-5 font-bold">Significant shareholders</h2>
          <Pie data={ownershipData} />
          <table className="table mt-4"><thead><tr><th>Name</th><th>Shares</th><th>Ownership</th></tr></thead><tbody><tr><td>Government of Mongolia</td><td>24,499,287</td><td>94.70%</td></tr><tr><td>Other shareholders</td><td>1,370,989</td><td>5.30%</td></tr></tbody></table>
        </section>
      </div>
      <section className="container my-10 text-justify text-sm leading-7">
        <h2 className="mb-3 text-lg font-bold text-brand-1">Change in the shareholder register</h2>
        <p>Under the agreement between the Government of Mongolia and Korea Telecom Corporation, the Government purchased 40% of Telecom Mongolia JSC, equal to 10,348,111 shares, on 18 April 2018.</p>
        <p className="mt-3">The Government subsequently made a tender offer and acquired a further 7,572 shares. The Government of Mongolia now holds 94.7%, or 24,499,287 shares. Mongolian and foreign individuals and legal entities hold the remaining 5.3%, or 1,370,989 shares.</p>
      </section>
    </div>
  );
}
