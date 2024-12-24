"use client";

import Price from "../price";

export default function ChangeBundle() {
  return (
    <div className="relative my-[60px]">
      <h2 className="text-center text-2xl font-bold text-brand-1 my-4">
        Өрхийн хэрэглэгч
      </h2>
      <p className="text-right">/НӨАТ орсон/</p>
      <div className="flex flex-col gap-8 justify-center flex-wrap">
        <div className="flex gap-8 justify-center flex-wrap">
        <Price
          title="Багц 1"
          price={"9,900₮"}
          alert="2025 оны 01 сарын 01-нээс мөрдөнө "
          list={[
            "Анхны холболтын хураамж",
            "Улаанбаатарт 33,000₮" ,
            "Орон нутагт 16,500₮",
            "Сүлжээндээ болон 26хххх дугаар руу яриа Хязгааргүй",
            "Бусад сүлжээнд 100 минут",
            "Нэмэлт үйлчилгээ 1ш",
          ]}
        />
        <Price
          title="Багц 2"
          price={"16,500₮"}
          alert="2025 оны 01 сарын 01-нээс мөрдөнө "
          list={[
            "Анхны холболтын хураамж",
            "Улаанбаатарт 33,000₮" ,
            "Орон нутагт 16,500₮",
            "Сүлжээндээ болон 26хххх дугаар руу яриа Хязгааргүй",
            "Бусад сүлжээнд 200 минут",
            "Нэмэлт үйлчилгээ 3ш",
          ]}
        />
        </div>
        <h2 className="text-center text-2xl font-bold text-brand-1 my-4">
        Байгууллагын хэрэглэгч
      </h2>
        <div className="flex gap-8 justify-center flex-wrap">
        <Price
          title="Багц 1"
          price={"16,500₮"}
          alert="2025 оны 01 сарын 01-нээс мөрдөнө "
          list={[
           "Анхны холболтын хураамж",
            "Улаанбаатарт 33,000₮" ,
            "Орон нутагт 16,500₮",
            "Сүлжээндээ болон 26хххх дугаар руу яриа Хязгааргүй",
            "Бусад сүлжээнд 200 минут",
            "Нэмэлт үйлчилгээ 1ш",
          ]}
        />
        <Price
          title="Багц 2"
          price={"33,000₮"}
          list={[
            "Анхны холболтын хураамж",
            "Улаанбаатарт 33,000₮" ,
            "Орон нутагт 16,500₮",
            "Сүлжээндээ болон 26хххх дугаар руу яриа Хязгааргүй",
            "Бусад сүлжээнд 400 минут",
            "Нэмэлт үйлчилгээ 3ш",
          ]}
        />
        <Price
          title="Багц 3"
          price={"49,500₮"}
          list={[
           "Анхны холболтын хураамж",
            "Улаанбаатарт 33,000₮" ,
            "Орон нутагт 16,500₮",
            "Сүлжээндээ болон 26хххх дугаар руу яриа Хязгааргүй",
            "Бусад сүлжээнд 600 минут",
            "Нэмэлт үйлчилгээ 5ш",
          ]}
        />
        </div>
        
        
      </div>
    </div>
  );
}