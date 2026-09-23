"use client";

import { useEffect, useState } from "react";
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

export default function Page() {
  const [works, setWorks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getWorkPlace();
        console.log("CLIENT RESPONSE:", response);
        const data = response?.data || response || [];
        setWorks(Array.isArray(data) ? data : []);
      } catch (err: any) {
        console.error("Fetch Error:", err);
        setErrorMsg(err.message || "Алдаа гарлаа");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
          {loading ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-4">Ачаалж байна...</TableCell>
            </TableRow>
          ) : errorMsg ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-4 text-red-500">
                Алдаа гарлаа: {errorMsg}
              </TableCell>
            </TableRow>
          ) : works.length > 0 ? (
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
                Мэдээлэл олдсонгүй.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
} 