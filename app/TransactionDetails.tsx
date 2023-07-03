// TransactionDetails.tsx
import { useEffect, useState } from 'react';
import { fetchTransactionData } from './fetchShow';

interface TransactionDetailsProps {
  transactionId: string;
}

function TransactionDetails({ transactionId }: TransactionDetailsProps) {
  const [transactionData, setTransactionData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const data = await fetchTransactionData(transactionId);
      setTransactionData(data);
    }

    fetchData();
  }, [transactionId]);

  if (!transactionData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Group: {transactionData.groupname}</h2>
      <p>Title: {transactionData.titel}</p>
      <p>Date: {transactionData.createdAt}</p>
      <h3>Users:</h3>
      <ul>
        {transactionData.users.map((user) => (
          <li key={user.username}>
            {user.username}: {user.amount}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TransactionDetails;
