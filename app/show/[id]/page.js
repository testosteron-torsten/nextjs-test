import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function ShowOne({ params }) {
    const supabase = createServerComponentClient({ cookies });

    const { data: transactions, error: transactionsError } = await supabase
      .from('transactions')
      .select('groupId, title, createdAt')
      .eq('transactionId', params.id)
      .single();
  
    if (transactionsError) {
      console.error('Error fetching transaction:', transactionsError);
      return null;
    }
  
    const { data: groupData, error: groupError } = await supabase
      .from('groups')
      .select('groupname')
      .eq('groupId', transactions.groupId)
      .single();
  
    if (groupError) {
      console.error('Error fetching group:', groupError);
      return null;
    }
  
    const { data: userTransactionsData, error: userTransactionsError } = await supabase
    .from('userTransaction')
    .select(`
      userId,
      amount,
      users (username)
    `)
    .eq('transactionId', params.id);
  
    if (userTransactionsError) {
      console.error('Error fetching user transactions:', userTransactionsError);
      return null;
    }
    
    const formattedData = {
        groupId: transactions.groupId,
        groupname: groupData.groupname,
        titel: transactions.title,
        createdAt: transactions.createdAt,

      };

      const { data: userNames, error: userNamesError} = await supabase
      .from('users')
      .select('username, userId')

      if (userNamesError) {
        console.error('Error fetching usernames:', userNamesError);
        return null;
      }
 
    const userOwes = userTransactionsData.map((userTransaction) => ({
        amount: userTransaction.amount,
        id: userTransaction.userId,
        username: ''
      }))

      const UserNamesList = userNames.map((name) => ({
        username: name.username,
        id: name.userId
      }))

      userOwes.forEach((user) => {
        UserNamesList.forEach((name) => {
          if (user.id === name.id) {
            user.username = name.username;
          }
        });
      });
      
  
  
      return (
        <div>
          <h2 className="group">Group: {formattedData.groupname}</h2>
          <p className="group">Title: {formattedData.titel}</p>
          <p className="group">Date: {formattedData.createdAt}</p>
          <h3 className="group">Users:</h3>
          <ul>
          {userOwes.reverse().map((user) => (
            <li key={user.username} style={{ color: user.amount < 0 ? 'red' : 'green' }}>
              {user.username}: {user.amount}
            </li>
          ))}
          </ul>
        </div>
      );
}

