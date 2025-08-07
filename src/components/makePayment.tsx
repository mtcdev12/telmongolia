import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Loader from "./ui/loader";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { checkPayment } from "@/api/rest";
import { BiCopyAlt } from "react-icons/bi";


const Payment = (props: any) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(true);

  const handleOpenChange = () => {
    setOpen(false);
    props.onPaymentClose(false);
  };
  const checkPaymentStatus = async ()=>{
    setLoading(true);
    var values = {invoice_id: props.paymentdata['invoice_id']};
    const res = await checkPayment(values);
    setLoading(false);
    toast({
        title: "Payment status",
        description: res["message"],
      });
  }
  const copier = (text:string)=>{
    navigator.clipboard.writeText(text);
    toast({
      title: "Амжилттай хуулагдлаа!",
      description: text,
    });
  }
  return (
    <Dialog
      open={open}
      onOpenChange={() => handleOpenChange()}
      defaultOpen={true}
    >
      <DialogContent className="sm:max-w-[525px] max-h-[98%] overflow-y-scroll">
        {loading && <Loader />}
        <DialogHeader>
          <DialogTitle className="text-brand-1">Төлбөр төлөлт</DialogTitle>
        </DialogHeader>
        {
            props.paymentdata['qr_image'] ?
            <div className="text-center mx-auto">
              <img
                  src={`data:image/jpeg;base64,${props.paymentdata["qr_image"]}`}
                  width={320}
                  height={320}
                  alt="qpay"
              ></img>
              <Button onClick={checkPaymentStatus}>Төлбөр шалгах</Button>
            </div>
            :
            <div>
              <h5 className="text-center font-semibold text-brand-1 my-2">Банк шилжүүлэг</h5>
              <table className="table">
                <tbody>
                  <tr>
                    <td className="text-brand-1 bg-yellow-100">Хаан банк</td>
                    <td className="text-center">
                       MN 78000500<br/>
                      {props.paymentdata['account']['khaan_bank']}
                      <BiCopyAlt className="text-[20px] float-right cursor-pointer" onClick={()=>copier(`MN78000500${props.paymentdata['account']['khaan_bank']}`)}/>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-brand-1 bg-yellow-100">Төрийн банк</td>
                    <td className="text-center">
                       MN 910034 <br/>
                      {props.paymentdata['account']['state_bank']}
                      <BiCopyAlt className="text-[20px] float-right cursor-pointer" onClick={()=>copier(`MN910034${props.paymentdata['account']['state_bank']}`)}/>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-brand-1 bg-yellow-100">Голомт банк</td>
                    <td className="text-center">
                      MN 06001500 <br/>
                      {props.paymentdata['account']['golomt_bank']}
                      <BiCopyAlt className="text-[20px] float-right cursor-pointer" onClick={()=>copier(`MN06001500${props.paymentdata['account']['golomt_bank']}`)}/>
                    </td>
                  </tr>
                  <tr>
                    <td>Төлөх дүн</td>
                    <td className="text-center">
                      {props.paymentdata['amount']}
                      <BiCopyAlt className="text-[20px] float-right cursor-pointer" onClick={()=>copier(props.paymentdata['amount'])}/>
                    </td>
                  </tr>
                  <tr>
                    <td>Гүйлгээний утга</td>
                    <td className="text-center">
                      {props.paymentdata['trans_desc']}
                      <BiCopyAlt className="text-[20px] float-right cursor-pointer" onClick={()=>copier(props.paymentdata['trans_desc'])}/>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="text-sm bg-brand-2/30 p-2 border border-brand-1/60 mt-2">
                Таны төлбөрийн баримтын мэдээлэл манай системд бүртгэлтэй байгаа цахим шуудангийн хаяг руу илгээгдэнэ.
              </div>
            </div>
        }
      </DialogContent>
    </Dialog>
  );
};

export default Payment;
