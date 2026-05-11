"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const Slogans = () => {
  return (
    <section className="relative min-h-[430px] overflow-hidden bg-[#001b55] text-white">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/assets/images/hero-city.png"
          alt="hero background"
          fill
          priority
          className="object-cover opacity-70"
        />
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#001b55] via-[#00226b]/90 to-[#006cff]/50" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#001b55]/80 via-transparent to-transparent" />

      {/* Blue light lines overlay - байвал ашиглана */}
      <div className="absolute inset-0 opacity-60">
        <Image
          src="/assets/images/overlay.png"
          alt="overlay"
          fill
          className="object-cover"
        />
      </div>

      <div className="relative z-10 mx-auto grid min-h-[430px] max-w-[1280px] grid-cols-1 items-center gap-8 px-4 py-10 lg:grid-cols-[1fr_360px]">
        {/* Left content */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-[640px]"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-5 inline-flex rounded-full border border-[#2e8cff]/50 bg-[#0c4aa7]/35 px-5 py-2 text-sm font-medium text-blue-100 backdrop-blur"
          >
            Бид таны харилцаа бүрийг холбоно
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
            className="text-[34px] font-extrabold leading-tight tracking-tight md:text-[50px]"
          >
            Ирээдүйгээ холбох <br />
            илүү ухаалаг сонголт
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55, ease: "easeOut" }}
            className="mt-5 max-w-[520px] text-base leading-7 text-white/85"
          >
            Шилдэг сүлжээ, дижитал үйлчилгээ, урамшуулал — та бүхний өдөр тутмыг
            илүү хялбар болгоно.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

const CardIcon = ({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) => {
  return (
    <div className="flex flex-col items-center gap-2 text-white/85">
      <div className="text-white">{icon}</div>
      <p className="text-[11px] leading-4">{title}</p>
    </div>
  );
};

export default Slogans;
