import Breadcrumb from "@/components/ui/breadcrumb";
import Image from "next/image";

const breadcrumb = ["Компанийн засаглал", "Үйл ажиллагааны бүтэц"];

const Page = () => {
    return (
        <div>
            <Breadcrumb data={breadcrumb} />
            <div className="relative h-[600px] w-full min-w-[400px]">
                <Image src="/assets/images/bvtets2.jpg" fill alt="bvtets" objectFit="contain"/>
            </div>
        </div>
    );
}

export default Page;