import Caraosel from "@/components/caraosel";
import Shortcut from "@/components/shortcut";
import Slogans from "@/components/slogans";

const Home = () => {
  return (
    <main className="bg-slate-50">
      <Slogans />

      <div className="mx-auto max-w-[1280px] px-4">
        <div className="-mt-0 md:mt-3">
          <div className="mx-auto my-4 max-w-[2200px]">
            <Caraosel />
          </div>

          <div className="mb-5 flex items-center justify-between">
            <h2 className="mt-1 text-2xl font-black tracking-[-0.5px] text-[#061f57]">
              Түргэн үйлчилгээ
            </h2>
          </div>

          <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Shortcut
              title="Төлбөр"
              desc="Төлөх"
              icon="payment.png"
              url="bill"
            />
            <Shortcut title="Карт" desc="Авах" icon="card.png" url="cards" />
            <Shortcut
              title="Захиалга"
              desc="Өгөх"
              icon="order.png"
              url="/order"
            />
            <Shortcut
              title="Дугаар"
              desc="Захиалах"
              icon="number.png"
              url="/reservenumber"
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
