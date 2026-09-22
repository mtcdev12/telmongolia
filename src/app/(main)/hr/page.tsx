import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Breadcrumb from "@/components/ui/breadcrumb";
import { getWorkPlace } from "@/api/rest";
import { format_date } from "@/lib/helper";

const breadcrumb = ["Хүний нөөц"];

const Page = async () => {
  let works = [];

  try {
    const response = await getWorkPlace();
    // API-аас ирсэн өгөгдлийг шүүлтүүргүйгээр шууд авна
    works = response?.data || response || [];
  } catch (error) {
    console.error("API Error:", error);
  }

  return (
    <div>
      <Breadcrumb data={breadcrumb} />
      <Table>
        <TableCaption>Ажлын байрны жагсаалт</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>id</TableHead>
            <TableHead>Ажлын байрны нэр</TableHead>
            <TableHead>Алба</TableHead>
            <TableHead className="w-[440px]">Гүйцэтгэх үндсэн үүрэг</TableHead>
            <TableHead className="w-[100px]">Дуусах огноо</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.isArray(works) && works.length > 0 ? (
            works.map((d: any) => (
              <TableRow key={d.workplace_id}>
                <TableCell className="font-medium">{d.workplace_id}</TableCell>
                <TableCell>{d.workplace_name}</TableCell>
                <TableCell>{d.workplace_type}</TableCell>
                <TableCell className="whitespace-pre-line">{d.workplace_role}</TableCell>
                <TableCell>{format_date(d.expires_at)}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">
                Ажлын байрны мэдээлэл олдсонгүй.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default Page;