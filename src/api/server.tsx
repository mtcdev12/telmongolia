import { cookies } from 'next/headers'
var baseurl = process.env.BASEURL;
//server cookie checker
export const authCheck = async () => {
    const cookieStore = await cookies();
    const auth = cookieStore.get('user');
    if (!auth) {
        return null;
    }

    try {
        return JSON.parse(auth.value);
    } catch {
        return null;
    }
}
