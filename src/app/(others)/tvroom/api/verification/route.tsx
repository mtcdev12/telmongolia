import { NextResponse } from "next/server";
import excuteQuery from "@/lib/db";

export async function POST(request: Request) {
  const req = await request.json();
  const code = Math.floor(1000 + Math.random() * 9000);
  let query = `insert into verification (email, verified, code, created_at) values ('${req.username}', false, '${code}', TIMESTAMP(CURRENT_TIMESTAMP));`;
  const verification = await excuteQuery({
    query: query,
  });
  if (verification) {
    if(await limitChecker(req.username) === false){
      return NextResponse.json({ res: "error", desc: "Таны нэг өдөрт авах баталгаажуулах кодны лимит хэтэрсэн байна! Та маргааш дахин оролдоно уу." });
    }else{
      if (validateEmail(req.username)) {
        const emailing = await sendMail(req.username, code);
        return NextResponse.json({
          res: "success",
          data: emailing,
          desc: "Баталгаажуулах код илгээгдлээ!",
        });
      } else {
        if (validateMobile(req.username)) {
          const sms = await sendSms(req.username, code);
          return NextResponse.json({
            res: "success",
            data: sms,
            desc: "Баталгаажуулах код илгээгдлээ!",
          });
        }
      }
    }
  }

  return NextResponse.json({ res: "error", desc: "Алдаа!" });
}

async function sendMail(to: string, code: number) {
  "use strict";
  const nodemailer = require("nodemailer");

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: "tvroom@mtcone.net",
      pass: "muhamed123",
    },
    tls: { rejectUnauthorized: true },
  });

  // async..await is not allowed in global scope, must use a wrapper
  async function main() {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: '"TVROOM" <tvroom@mtcone.net>', // sender address
      to: `${to}`, // list of receivers
      subject: "Баталгаажуулах код", // Subject line
      html: `
            <div>Таны баталгаажуулах код - ${code}</div>
          `, // html body
    });
    logToTable(to, info.messageId, 1);
    return info.messageId;
    // console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  }

  return await main().catch(console.error);
}
function validateEmail(email: any) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}
function validateMobile(number: any) {
  var re = /^[0-9]{8}$/;
  return re.test(number);
}
async function limitChecker(username: any) {
  const currentDate = new Date().toJSON().slice(0, 10);

  const query = `
    SELECT COUNT(*) AS total
    FROM email_log
    WHERE email = '${username}'
      AND created_at LIKE '${currentDate}%'
  `;

  const count = await excuteQuery({
    query,
  });

  console.log("LIMIT CHECK:", count);

  if (!count || !count[0]) {
    return true;
  }

  if (Number(count[0].total) > 6) {
    return false;
  }

  return true;
}
async function sendSms(to: string, code: number) {
  const myHeaders = new Headers();
  myHeaders.append("x-api-key", "24171ef659aa956cb63e538929212f17");

  const text = encodeURIComponent(`Таны баталгаажуулах код - ${code}`);

  const url =
    `https://api-text.callpro.mn/v1/sms/send?from=72704470&to=${to}&text=${text}`;

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: myHeaders,
    });

    const data = await res.text();

    console.log("SMS STATUS:", res.status);
    console.log("SMS RESPONSE:", data);

    logToTable(to, data, 2);

    if (!res.ok) {
      return {
        success: false,
        data,
      };
    }

    // API 200 буцаасан ч дотор нь error байгаа эсэхийг шалгах
    try {
      const json = JSON.parse(data);

      if (json.reason) {
        return {
          success: false,
          data: json,
        };
      }

      return {
        success: true,
        data: json,
      };
    } catch {
      return {
        success: true,
        data,
      };
    }
  } catch (err) {
    console.error("SMS ERROR:", err);

    return {
      success: false,
      data: err instanceof Error ? err.message : String(err),
    };
  }
}
async function logToTable(username: string, description: any, type: any) {
  let query = `insert into email_log (email, description, type, created_at) values ('${username}', '${description}', '${type}', TIMESTAMP(CURRENT_TIMESTAMP));`;
  const email_log = await excuteQuery({
    query: query,
  });
}
