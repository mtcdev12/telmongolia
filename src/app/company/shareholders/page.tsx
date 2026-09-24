"use client";
import Breadcrumb from "@/components/ui/breadcrumb";
import SourceContact from "@/components/source-contact";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const breadcrumb = ["Компанийн засаглал", "Хувьцаа эзэмшигчдийн бүтэц"];

const Page = () => {
  return (
    <div>
      <Breadcrumb data={breadcrumb} />

      <div className="flex flex-wrap">
        <div className="flex-1 text-center">
          <div style={{ width: 400 }}>
            <h5
              className="title"
              style={{ textAlign: "center", marginBottom: 20 }}
            >
              {" "}
              2022 оны эхний хагас жилийн байдлаар
            </h5>
            <Doughnut data={{
  labels: [
    "Гадаад хувьцаа эзэмшигч",
    "Хувьцаа эзэмшигч хуулийн этгээд",
    "100 - с доош ширхэг хувьцаа эзэмшигч",
    "100-1,000 ширхэг хүртэл хувьцаа эзэмшигч",
    "1,000 - с дээш ширхэг хувьцаа эзэмшигч",
  ],
  datasets: [
    {
      label: "Эзэмшигчдийн тоо",
      data: [79, 13, 2981, 859, 65],
      backgroundColor: [
        "rgba(0, 63, 92, 0.6)",
        "rgba(88, 80, 141, 0.6)",
        "rgba(188, 80, 144, 0.6)",
        "rgba(255, 99, 97, 0.6)",
        "rgba(255, 166, 0, 0.6)",
      ],
      borderColor: ["rgba(66, 135, 245, 0.4)"],
      borderWidth: 1,
    },
  ],
}} />

            <table className="table mt-2">
              <thead>
                <tr>
                  <th>Хувьцаа эзэмшигчийн төрөл</th>
                  <th>Эзэмшигчдийн тоо</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Гадаад хувьцаа эзэмшигч</td>
                  <td>79</td>
                </tr>
                <tr>
                  <td>Хувьцаа эзэмшигч хуулийн этгээд</td>
                  <td>13</td>
                </tr>
                <tr>
                  <td>100 - с доош ширхэг хувьцаа эзэмшигч</td>
                  <td>2981</td>
                </tr>
                <tr>
                  <td>100-1,000 ширхэг хүртэл хувьцаа эзэмшигч</td>
                  <td>859</td>
                </tr>
                <tr>
                  <td>1,000 - с дээш ширхэг хувьцаа эзэмшигч</td>
                  <td>65</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="text-center flex-1 mx-auto">
          <div style={{ width: 400 }}>
            <h5
              className="title"
              style={{ textAlign: "center", marginBottom: 30 }}
            >
              Нөлөө бүхий хувьцаа эзэмшигчид
            </h5>
            <Pie data={{
  labels: [
    "Монгол Улсын Засгийн Газар",
    "Монгол Улсын болон гадаадын иргэн, хуулийн этгээд",
  ],
  datasets: [
    {
      label: "Хувьцааны тоо",
      data: [24499287, 1370989],
      backgroundColor: ["rgba(255, 193, 84, 0.6)", "rgba(71, 179, 156, 0.6)"],
      borderColor: ["rgba(66, 135, 245, 0.4)"],
      borderWidth: 1,
    },
  ],
}} />
          </div>

          <table className="table mt-2">
            <thead>
              <tr>
                <th>Нэр</th>
                <th>Эзэмшиж буй хувьцааны тоо</th>
                <th>Эзэмшиж буй хувьцааны хувь</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Монгол Улсын Засгийн Газар </td>
                <td>24,499,287</td>
                <td>94.70%</td>
              </tr>
              <tr>
                <td>Монгол Улсын болон гадаадын иргэн, хуулийн этгээд</td>
                <td>1,370,989</td>
                <td>5.30%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div
        className="container"
        style={{ textAlign: "justify", marginBottom: 40, marginTop: 50 }}
      >
        <h3 className="text-lg font-medium">
          МОНГОЛЫН ЦАХИЛГААН ХОЛБОО ХК-ИЙН ХУВЬЦАА ЭЗЭМШИГЧДИЙН БҮРТГЭЛД ОРСОН
          ӨӨРЧЛӨЛТ
        </h3>
        Монгол Улсын Засгийн Газар болон БНСУ-ын Кореа телеком корпорацийн
        хооронд байгуулагдсан гэрээний дагуу Монголын цахилгаан холбоо ХК-ийн
        нийт хувьцааны <b>40</b> хувийг /<b>10,348,111</b> ширхэг хувьцаа/
        Монгол Улсын Засгийн газар худалдан авах арилжаа 2018 оны 4 дүгээр сарын
        18-ны өдөр болж, уг арилжаагаар Монгол Улсын Засгийн газар Монголын
        цахилгаан холбоо ХК-ийн хувьцааны хяналтын багцыг дангаараа худалдан
        авсан.
        <br />
        <br />
        Монгол Улсын Засгийн газар Компанийн тухай хуулийн 57 дугаар зүйлийн
        57.1 дэх хэсэгт заасны дагуу Монголын цахилгаан холбоо ХК-ийн Монгол
        Улсын Засгийн газрын эзэмшлийн хувиас бусад хэсгийг худалдан авах тендер
        саналыг 2018 оны 7 дугаар сарын 09-ний өдөр гаргаж, 2018 оны 9 дүгээр
        сарын 20-ны өдөр нийт <b>7,572</b> ширхэг МЦХ ХК-ийн хувьцааг худалдан
        авсан байна.
        <br />
        <br />
        Ийнхүү Монголын хөрөнгийн биржид бүртгэлтэй Монголын цахилгаан холбоо
        ХК-ийн нийт хувьцааны <b>94.7</b> хувь буюу <b>24,499,287</b> ширхэг
        хувьцааг Монгол Улсын Засгийн газар, <b>5.3</b> хувь буюу{" "}
        <b>1,370,989</b> ширхэг хувьцааг Монгол Улсын болон гадаадын иргэн,
        хуулийн этгээд тус тус эзэмшиж байна.
      </div>
      <SourceContact person="tsetsgee" />
    </div>
  );
};

export default Page;
