import Caraosel from "@/components/caraosel";
import Shortcut from "@/components/shortcut";
import Slogans from "@/components/slogans";
import HomeAlert from "@/components/homeAlert";

const Home = () => {
  return (
    <div>
      <HomeAlert/>
      <div className="2xl:block">
        <Slogans />
      </div>
      <div className="container">
        <div className="max-w-[940px] mx-auto my-4">
          <Caraosel />
        </div>
          <div className="flex justify-center gap-4 md:gap-8 2xl:gap-12 flex-wrap items-center mb-4 2xl:my-8">
            <Shortcut title="Төлбөр" desc="Төлөх" icon="payment.png" url="bill"/>
            <Shortcut title="Карт" desc="Авах" icon="card.png" url="cards"/>
            <Shortcut title="Захиалга" desc="Өгөх" icon="order.png" url="/order"/>
            <Shortcut title="Дугаар" desc="Захиалах" icon="number.png" url="/reservenumber"/>
          </div>
   
      </div>
    </div>
  );
}

export default Home;