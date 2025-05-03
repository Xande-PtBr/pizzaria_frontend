import { cookies } from 'next/headers'



export async function getCookieServer(){
  const cookieStorage = await cookies();
  const token = cookieStorage.get("session")?.value;

  return token || null;
}