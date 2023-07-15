import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import {getServerSession} from "next-auth/next"
import Link from "next/link";

export default async function ShowAll() {
    const supabase = createServerComponentClient({ cookies });

    const { data: groupData, error: groupError } = await supabase
    .from('groups')
    .select('groupname, groupId')
    .eq('groupId', 9)
    .single();

    if (groupError) {
        console.error('Error fetching group:', groupError);
        return null;
    }

    const { data: transactions, error: transactionsError } = await supabase
      .from('transactions')
      .select('transactionId, title, createdAt, total, payedBy')
      .eq('groupId', 9)
      
    if (transactionsError) {
      console.error('Error fetching transaction:', transactionsError);
      return null;
    }

    const userIds = transactions.map((transaction) => transaction.payedBy);

    const { data: userNames, error: userNamesError} = await supabase
    .from('users')
    .select('username, userId')
    .in('userId', userIds)

    if (userNamesError) {
      console.error('Error fetching usernames:', userNamesError);
      return null;
    }

    const { data: userInGroup, error: userInGroupError} = await supabase
    .from('userInGroup')
    .select('userId')
    .eq('groupId', 9)

    if (userInGroupError) {
      console.error('Error fetching userInGroup:', userInGroupError);
      return null;
    }

    return (
        <div className="div1">
          <h1 className="group">Group: {groupData.groupname}</h1><br></br>
          <h2>User in Group:</h2>
          <ul>
          {userInGroup.map((user) => {
            return <li key={user.userId}>{user.userId}</li>
          })}
          <Link href='show/add'>Add User</Link>
          </ul>
          <h2>transactions:</h2>
          {transactions.map((transaction) => {
            const payedByUser = userNames.find((user) => user.userId === transaction.payedBy);
            const payedByUserName = payedByUser ? payedByUser.username : '';
    
            return (
              <p className="text">
                <a href={'show/' + transaction.transactionId}> {transaction.title}</a> : {transaction.total} € - Payed by: {payedByUserName}
              </p>
            );
          })}
        </div>
      );
}
