var baseurl = process.env.BASEURL;
import Cookies from 'universal-cookie';


export async function getCaraosel() {
    try{
        const res = await fetch(process.env.API2 + '/coverimg?type=resident');
        const data = await res.json();
        return data['data'];
    }catch(err){
        console.log('There was an error', err);
    }
}
export async function login({user_id, user_pass, user_pass_login}:{user_id:string, user_pass:any, user_pass_login:boolean}) {
    const values = {user_id, user_pass, user_pass_login};
    const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // credentials: "include",
        body: JSON.stringify(values),
      };
    let url = process.env.API + "/login";
    if (!user_pass_login) {
        url = process.env.API + "/login/create_onetime";
    }
    try{
        const res = await fetch(url, requestOptions);
        // await new Promise((resolve)=> setTimeout(resolve, 1000)) //for testing
        const data = await res.json();
        return data;
    }catch(err){
        console.log('There was an error', err);
    }
}
export async function onetime({user_id, onetime, password}:{user_id:string, onetime:string, password:string}){
    const values = {user_id, onetime, password};
    const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      };
    let url = process.env.API + "/login/onetime";
    try{
        const res = await fetch(url, requestOptions);
        const data = await res.json();
        return data;
    }catch(err){
        console.log('There was an error', err);
    }
}
export function getCookie(){
    const cookies = new Cookies();
    const temp = cookies.get('user');
    if(temp){
        return temp;
    }
    return null;
}
export async function setInfo(obj:any, cust_id:number, type:string, token:any){
    Object.keys(obj).forEach(key => {
        if (key !== type) {
            delete obj[key];
        }
    });
    obj['cust_id'] = cust_id;
    obj['token'] = token;
    const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
    };
    let url = process.env.API + "/cust/" + type;
    try{
        const res = await fetch(url, requestOptions);
        const data = await res.json();
        return data;
    }catch(err){
        console.log('There was an error', err);
    }
}
export const getUserInfo =  async ({userId, token}:{userId:string, token:string}) =>  {
    const values = {
        user_id: userId,
        token: token,
      };
    const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      };
    let url = process.env.API + "/user/info";
    try{
        const res = await fetch(url, requestOptions);
        const data = await res.json();
        return data;
    }catch(err){
        console.log('There was an error', err);
    }
}
export const getNews = async (type:string, page:number) => {
    const url = process.env.API2 + '/news?type=' + type + '&customer=resident&page=' + page;
    try{
        const res = await fetch(url);
        const data = await res.json();
        return data;
    }catch(err){
        console.log('There was an error', err);
    }
}
export const getWorkPlace = async () => {
    const url = process.env.API2 + '/workplace';
    try{
        const res = await fetch(url);
        const data = await res.json();
        return data;
    }catch(err){
        console.log('There was an error', err);
    }
}
export const getShareHolders = async () => {
    const url = process.env.API2 + '/shareholders?limit=1&page=1';
    try{
        const res = await fetch(url);
        const data = await res.json();
        return data;
    }catch(err){
        console.log('There was an error', err);
    }
}
export const getShareHoldersNews = async (type:string, page:number) => {
    const url = process.env.API2 + '/' + type + '?limit=6&page=' + page;
    try{
        const res = await fetch(url);
        const data = await res.json();
        return data;
    }catch(err){
        console.log('There was an error', err);
    }
}
export const getNumbers = async (number:string, grade:string, page:number) =>{
    var url = process.env.API + "/booknumber?status=T&pattern=" + number + "&nitem=36&total&grade=" + grade + "&page=" + page;
    try{
        const res = await fetch(url);
        const data = await res.json();
        return data;
    }catch(err){
        console.log('There was an error', err);
    }
}
export const bookNumber = async (values:any) => {
    const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      };
    let url = process.env.API + "/booknumber";
    try{
        const res = await fetch(url, requestOptions);
        const data = await res.json();
        return data;
    }catch(err){
        console.log('There was an error', err);
    }
}
export const getAddresses = async () => {
    const url = process.env.API + '/neworder/address';
    try{
        const res = await fetch(url);
        const data = await res.json();
        return data;
    }catch(err){
        console.log('There was an error', err);
    }
}
export const newOrder = async (values:any) => {
    const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      };
    let url = process.env.API + "/neworder";
    try{
        const res = await fetch(url, requestOptions);
        const data = await res.json();
        return data;
    }catch(err){
        console.log('There was an error', err);
    }
}
export const getCards = async () => {
    const url = process.env.API + '/card/list';
    try{
        const res = await fetch(url);
        const data = await res.json();
        return data;
    }catch(err){
        console.log('There was an error', err);
    }
}
export const cardBuy = async (values:any) => {
    if(values.type == 'buycard'){
        delete values['number'];
    };
    const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      };
    let url = process.env.API + "/card/buy";
    try{
        const res = await fetch(url, requestOptions);
        const data = await res.json();
        return data;
    }catch(err){
        console.log('There was an error', err);
    }
}
export const checkPayment = async (values:any) => {
    const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      };
    let url = process.env.API + "/payment/check";
    try{
        const res = await fetch(url, requestOptions);
        const data = await res.json();
        return data;
    }catch(err){
        console.log('There was an error', err);
    }
}
export const checkBill = async (values:any) => {
    const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      };
    let url = process.env.API + "/payment";
    try{
        const res = await fetch(url, requestOptions);
        const data = await res.json();
        return data;
    }catch(err){
        console.log('There was an error', err);
    }
}
export const paymentPay = async (values:any) => {
    const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      };
    let url = process.env.API + "/payment/pay";
    console.log(url, "ddddd")
    try{
        const res = await fetch(url, requestOptions);
        const data = await res.json();
        return data;
    }catch(err){
        console.log('There was an error', err);
    }
}
export const getEachNews = async (id:any, type:string) => {
    const url = process.env.API2 + '/' + type + '?id=' + id;
    console.log(url, 'url is here');
    try{
        const res = await fetch(url);
        const data = await res.json();
        return data;
    }catch(err){
        console.log('There was an error', err);
    }
}
export const getUserVas =  async ({userId, token}:{userId:string, token:string}) =>  {
    const values = {
        user_id: userId,
        token: token,
      };
    const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      };
    let url = process.env.API + "/cust/vas";
    try{
        const res = await fetch(url, requestOptions);
        const data = await res.json();
        return data;
    }catch(err){
        console.log('There was an error', err);
    }
}
export const getUserUsage =  async ({userId, token}:{userId:string, token:string}) =>  {
    const values = {
        user_id: userId,
        token: token,
      };
    const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      };
    let url = process.env.API + "/cust/info/detail";
    try{
        const res = await fetch(url, requestOptions);
        const data = await res.json();
        return data;
    }catch(err){
        console.log('There was an error', err);
    }
}
export const getEachNewsShareholders = async (id:number) => {
    const url = process.env.API2 + '/shareholders?id=' + id;
    console.log(url, 'url is here');
    try{
        const res = await fetch(url);
        const data = await res.json();
        return data;
    }catch(err){
        console.log('There was an error', err);
    }
}
export const getAllProducts =  async (custId:string, token:string) =>  {
    const values = {
        cust_id: custId,
        token: token,
      };
    const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      };
    let url = process.env.API + "/cust/info";
    try{
        const res = await fetch(url, requestOptions);
        const data = await res.json();
        return data;
    }catch(err){
        console.log('There was an error', err);
    }
}
export const getBulkList =  async (custId:string, token:string) =>  {
    const values = {
        cust_id: custId,
        token: token,
      };
    const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      };
    let url = process.env.API + "/cust/info/bulkrecharge/list";
    try{
        const res = await fetch(url, requestOptions);
        const data = await res.json();
        return data;
    }catch(err){
        console.log('There was an error', err);
    }
}
export const bulkCalculate =  async (custId:string, data:object, token:string) =>  {
    const values = {
        cust_id: custId,
        data: data,
        token: token,
      };
    const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      };
    let url = process.env.API + "/cust/info/bulkrecharge/calculate";
    try{
        const res = await fetch(url, requestOptions);
        const data = await res.json();
        return data;
    }catch(err){
        console.log('There was an error', err);
    }
}
export const newInvoicePrepaid =  async (custId:string, data:object, beforeCalculation:any, token:string) =>  {
    const values = {
        cust_id: custId,
        data: data,
        token: token,
        beforeCalculation:beforeCalculation
      };
    const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      };
    let url = process.env.API + "/cust/info/bulkrecharge/invoice";
    try{
        const res = await fetch(url, requestOptions);
        const data = await res.json();
        return data;
    }catch(err){
        console.log('There was an error', err);
    }
}
export const InvoiceHistory =  async (custId:string, token:string) =>  {
    const values = {
        cust_id: custId,
        token: token,
      };
    const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      };
    let url = process.env.API + "/cust/info/bulkrecharge/invoice/history";
    try{
        const res = await fetch(url, requestOptions);
        const data = await res.json();
        return data;
    }catch(err){
        console.log('There was an error', err);
    }
}
export const bulkPay =  async (custId:string, data:object, token:string, type:any, beforeCalculation:any) =>  {
    const values = {
        cust_id: custId,
        data: data,
        token: token,
        type: type,
        beforeCalculation: beforeCalculation
      };
    const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      };
    let url = process.env.API + "/cust/info/bulkrecharge/payment";
    try{
        const res = await fetch(url, requestOptions);
        const data = await res.json();
        return data;
    }catch(err){
        console.log('There was an error', err);
    }
}

export const InvoicePay =  async (data:any, token:string) =>  {
    const values = {
        data: data,
        token: token,
      };
    const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      };
    // let url = process.env.API + "/cust/info/bulkrecharge/invoice/pay";
    let url = process.env.API + "/cust/info/bulkrecharge/history/payment";
    try{
        const res = await fetch(url, requestOptions);
        const data = await res.json();
        return data;
    }catch(err){
        console.log('There was an error', err);
    }
}

export const verifyEbarimtApi =  async (ebarimt_id:any, cust_id:any ,token:string) =>  {
    const values = {
        ebarimt_id: ebarimt_id,
        cust_id: cust_id,
        token:token
      };
    const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      };
    // let url = process.env.API + "/cust/info/bulkrecharge/invoice/pay";
    let url = process.env.API + "/cust/ebarimt/verify";
    try{
        const res = await fetch(url, requestOptions);
        const data = await res.json();
        return data;
    }catch(err){
        console.log('There was an error', err);
    }
}
export const removeInvoiceApi =  async (invoice_id:any, cust_id:any ,token:string) =>  {
    const values = {
        invoice_id: invoice_id,
        cust_id: cust_id,
        token:token
      };
    const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      };
    // let url = process.env.API + "/cust/info/bulkrecharge/invoice/pay";
    let url = process.env.API + "/cust/info/bulkrecharge/invoice/history/delete";
    try{
        const res = await fetch(url, requestOptions);
        const data = await res.json();
        return data;
    }catch(err){
        console.log('There was an error', err);
    }
}
export const pstGetProductList =  async (cust_id:any ,token:string) =>  {
    const values = {
        cust_id: cust_id,
        token:token
      };
    const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      };
    let url = process.env.API + "/cust/info/pst/list";
    try{
        const res = await fetch(url, requestOptions);
        const data = await res.json();
        return data;
    }catch(err){
        console.log('There was an error', err);
    }
}
export const pstGetDetailedData =  async (user_id:any ,token:string) =>  {
    const values = {
        user_id: user_id,
        token:token
      };
    const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      };
    let url = process.env.API + "/cust/info/pst/detail";
    try{
        const res = await fetch(url, requestOptions);
        const data = await res.json();
        return data;
    }catch(err){
        console.log('There was an error', err);
    }
}