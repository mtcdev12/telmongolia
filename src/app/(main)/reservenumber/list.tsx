"use client"
import { useState } from "react";
import Reserver from "./reserver";
import Paginator from "@/components/ui/paginator";
const List = (props: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState();

  const selectNumber = (d:any) =>{
    setSelected(d);
    setIsOpen(true);
    console.log(d);
  }
  const handleModalClose = () =>{
    setIsOpen(false);
  }
  console.log(props, "aaaaaaaa")
  return (
    <div>
      {isOpen && <Reserver selected={selected} onModalClose={handleModalClose}/>}
      <div className="grid grid-cols-3 xl:grid-cols-6 gap-2">
        {props.list && props.list.data ? (
          props.list.data.objects.map((num: any, index: number) => (
            <div
              key={index}
              className="w-[110px] text-center py-2 m-2 border border-transparent rounded-2xl cursor-pointer hover:border-brand-1/60 hover:bg-brand-2/40 hover:text-brand-1 transition-all text-gray-500"
              onClick={()=>selectNumber(num)}
            >
              {num.num}
            </div>
          ))
        ) : (
          <div className="text-rose-600">Дугаар олдсонгүй</div>
        )}
      </div>
      {props.list && props.list.data && (
        <div>
          <div className="flex justify-center mt-2">
            <Paginator
              totalPages={Math.ceil(
                props.list.data.pagination.total /
                  props.list.data.pagination.nitem
              )}
              currentPage={props.list.data.pagination.page}
              handlePageChange={props.onPageChange}
            />
          </div>
          <p className="text-right text-sm tracking-tight text-brand-1">
            Боломжит дугаар - {props.list.data.pagination.total}
          </p>
        </div>
      )}
    </div>
  );
};

export default List;
