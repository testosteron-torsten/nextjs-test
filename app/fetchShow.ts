import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

async function fetchTransactionData(transactionId) {

    const supabase = createServerComponentClient({ cookies });

    const { data: transactionData, error: transactionError } = await supabase
      .from('transactions')
      .select('groupId, titel, createdAt')
      .eq('transactionId', transactionId)
      .single();
  
    if (transactionError) {
      console.error('Error fetching transaction:', transactionError);
      return null;
    }
  
    const { data: groupData, error: groupError } = await supabase
      .from('groups')
      .select('groupname')
      .eq('groupId', transactionData.groupId)
      .single();
  
    if (groupError) {
      console.error('Error fetching group:', groupError);
      return null;
    }
  
    const { data: userTransactionsData, error: userTransactionsError } = await supabase
      .from('userTransactions')
      .select('userId, amount')
      .eq('transactionId', transactionId);
  
    if (userTransactionsError) {
      console.error('Error fetching user transactions:', userTransactionsError);
      return null;
    }
  
    const userIds = userTransactionsData.map((userTransaction) => userTransaction.userId);
  
    const { data: usersData, error: usersError } = await supabase
      .from('users')
      .select('username')
      .in('userId', userIds);
  
    if (usersError) {
      console.error('Error fetching users:', usersError);
      return null;
    }
  
    const usersMap = {};
    usersData.forEach((user) => {
      usersMap[user.userId] = user.username;
    });
  
    const formattedData = {
      groupId: transactionData.groupId,
      groupname: groupData.groupname,
      titel: transactionData.titel,
      createdAt: transactionData.createdAt,
      users: userTransactionsData.map((userTransaction) => ({
        username: usersMap[userTransaction.userId],
        amount: userTransaction.amount,
      })),
    };
  
    return formattedData;
  }
  