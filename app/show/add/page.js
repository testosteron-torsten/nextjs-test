'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export const revalidate = 0;

export default function AddUser() {
    const [error, setError] = useState('');
    const router = useRouter()

    const handleSubmit = async (event) => {
        event.preventDefault();

        const username = event.target.username.value;
        const response = await fetch('../api/addUser', { method: "POST", headers: { 'Content-Type': 'application/json'}, body: JSON.stringify({ username }), });
        const data = await response.json();

        if (response.ok) {
            router.push('/show')
        } else {
            setError(data.message);
        }
    }

    return (
        <main>
            <div>
                <h2>Add user</h2>
                {error && <p>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <label htmlFor='username'>Username:</label>
                    <input name='username' type='text' id='username' />
                    <button type='submit'>Add user</button>
                </form>
                <Link href='/show'>Back</Link>
            </div>
        </main>
    )
}