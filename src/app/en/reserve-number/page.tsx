"use client";

import { useEffect, useState } from "react";

import { getNumbers } from "@/api/rest";
import Grade from "@/app/(main)/reservenumber/grade";
import List from "@/app/(main)/reservenumber/list";
import Pad from "@/app/(main)/reservenumber/pad";
import Prefix from "@/app/(main)/reservenumber/prefix";
import Breadcrumb from "@/components/ui/breadcrumb";

export default function EnglishReserveNumberPage() {
  const [currentNumber, setCurrentNumber] = useState("");
  const [prefix, setPrefix] = useState("");
  const [list, setList] = useState<unknown>();
  const [grade, setGrade] = useState("A");

  async function getData(page: number) {
    if (currentNumber) setList(await getNumbers(currentNumber, grade, page));
  }

  useEffect(() => { void getData(1); }, [currentNumber, grade]);

  function handlePadChange(number: Record<string, string>) {
    setCurrentNumber(Object.values(number).map((digit) => digit === "*" ? "_" : digit).join(""));
  }

  return (
    <div className="container pb-10">
      <Breadcrumb locale="en" data={["Reserve a number"]} />
      <h1 className="mb-2 text-2xl font-black text-brand-1">Find and reserve a new number</h1>
      <p className="mb-6 text-sm leading-6 text-slate-600">Choose a prefix and number category, then select an available number from the results.</p>
      <div className="mx-auto text-center"><Pad prefix={prefix} onPadChange={handlePadChange} /></div>
      <div className="my-4 flex flex-wrap">
        <div className="mt-2"><Prefix locale="en" onPrefixChange={setPrefix} /></div>
        <div className="mx-auto"><div className="my-2"><Grade locale="en" onGradeChange={setGrade} grade={grade} /></div><List locale="en" list={list} onPageChange={getData} /></div>
      </div>
    </div>
  );
}
