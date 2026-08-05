import { getWorkPlace } from "@/api/rest";
import Breadcrumb from "@/components/ui/breadcrumb";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format_date } from "@/lib/helper";

export default async function CareersPage() {
  const response = await getWorkPlace();
  const now = Date.now();
  const jobs = response?.data?.filter((job: { expires_at: string }) => new Date(job.expires_at).getTime() >= now) ?? [];

  return (
    <div className="container pb-10">
      <Breadcrumb locale="en" data={["Careers"]} />
      <h1 className="mb-5 text-2xl font-black text-brand-1">Open positions</h1>
      <p className="mb-5 text-sm leading-6 text-slate-600">Current vacancies published by Telecom Mongolia JSC. Proper names and official position descriptions are retained from the source record where no approved English wording is available.</p>
      <Table>
        <TableCaption>Open position list</TableCaption>
        <TableHeader><TableRow><TableHead>ID</TableHead><TableHead>Position</TableHead><TableHead>Department</TableHead><TableHead className="w-[440px]">Main responsibilities</TableHead><TableHead className="w-[120px]">Closing date</TableHead></TableRow></TableHeader>
        <TableBody>{jobs.map((job: { workplace_id: string; workplace_name: string; workplace_type: string; workplace_role: string; expires_at: string }) => <TableRow key={job.workplace_id}><TableCell className="font-medium">{job.workplace_id}</TableCell><TableCell>{job.workplace_name}</TableCell><TableCell>{job.workplace_type}</TableCell><TableCell>{job.workplace_role}</TableCell><TableCell>{format_date(job.expires_at)}</TableCell></TableRow>)}</TableBody>
      </Table>
    </div>
  );
}
