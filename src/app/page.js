// import { redirect } from "next/navigation";

// export default function HomeRedirect(){
//     redirect('/login');
//     return null;
// }

'use client'
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomeRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.push("/login"); // This will run only on the client-side after the initial render
  }, [router]);

  return null; // No content will be rendered
}
