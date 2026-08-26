import { NextResponse } from "next/server";
import excuteQuery from "@/lib/db";

export async function POST(request: Request) {
  const req = await request.json();
  let query = `select * from verification where email = '${req.username}' and verified = 0 order by created_at desc limit 1`;
  const verify = await excuteQuery({
    query: query,
  });
  if (verify.length > 0) {
    if (verify[0]["code"] == req.verificationcode) {
      //create user
      const user_create = await create_user(req.username, req.password);

      if (user_create?.includes("success")) {
        query = `update verification set verified = 1, verified_at = TIMESTAMP(CURRENT_TIMESTAMP) where email = '${req.username}' and verified = 0 and code = ${req.verificationcode}`;
        const verified = await excuteQuery({
          query: query,
        });
        return NextResponse.json({
          res: "success",
          desc: "Амжилттай!",
          data: [user_create, verified],
        });
      } else {
        if(user_create?.includes('resultDescription')){
            return NextResponse.json({
                res: "error",
                desc: "Алдаа! " + JSON.parse(user_create)['resultDescription'],
                data: [user_create],
              });
        }
        return NextResponse.json({
          res: "error",
          desc: "Алдаа!",
          data: [user_create],
        });
      }
    } else {
      return NextResponse.json({
        res: "error",
        desc: "Баталгаажуулах код таарахгүй байна!",
      });
    }
  }
  return NextResponse.json({ res: "error", desc: "Алдаа! Verification table username not found!" });
}

async function getToken() {
  const url = "https://ms.tvroom.mn/customer/token";
  const data = { username: "admin", password: "90b2c4d0" };

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  try {
    const res = await fetch(url, requestOptions);
    const data = await res.text();
    return data;
  } catch (err) {
    console.log("There was an error", err);
  }
}
async function create_user(username: string, password: string) {
  try {
    const token = await getToken();
    const url = "https://ms.tvroom.mn/customer/create";

    const payload = {
      password,
      bundle_type: 362,
      email: validateEmail(username) ? username : "test@mtcone.net",
      username,
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const responseText = await response.text();

    if (!response.ok) {
      console.error("API error:", {
        status: response.status,
        statusText: response.statusText,
        body: responseText,
      });
    }

    return responseText;
  } catch (err) {
    console.error("Fetch error:", err);

    return err instanceof Error
      ? `${err.name}: ${err.message}`
      : String(err);
  }
}
function validateEmail(email: any) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}
//async function checkUser(user: any) {
    //   const token = getToken();
    //   const url = `https://ms.tvroom.mn/customer/list?username=${user}`;
    //   try {
    //     const res = await fetch(url, {
    //       headers: { Authentication: `Bearer ${token}` },
    //     });
    
    //     const data = await res.json();
    //     return [data, token];
    //   } catch (err) {
    //     console.log("There was an error", err);
    //   }
    // }