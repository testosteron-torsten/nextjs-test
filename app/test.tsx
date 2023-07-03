import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function Test() {
    const supabase = createServerComponentClient({ cookies });

    const { data: users } = await supabase.from("users").select();

    return (
    <ul className="my-auto">
        {users?.map((user) => (
        <li key={user.userId}>{user.username} and {user.username}</li>
        ))}
    </ul>
    );
}