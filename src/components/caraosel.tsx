"use client"
import { getCaraosel } from "../api/rest";
import ImageSlider from "./imageSlider";
import { useEffect, useState } from "react";

const Caraosel = ({ locale = "mn" }: { locale?: "mn" | "en" }) => {
  const [caraosel, setCaraosel] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const res = await getCaraosel();
      setCaraosel(res);
    };
    fetchData();
  }, []);
  return (
    <>
      {caraosel && (
        <div>
          <ImageSlider data={caraosel} locale={locale} />
        </div>
      )}
    </>
  );
};

export default Caraosel;
