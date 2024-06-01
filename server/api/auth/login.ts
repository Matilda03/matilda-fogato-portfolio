import { kv } from '@vercel/kv';
import type {NextApiRequest, NextApiResponse} from 'next';

interface User {
    email: string;
    password: string;
    [key: string]: any;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'POST') {
        const { email, password } = req.body;

        // Fetch the user from Vercel KV
        const user: User | null = await kv.hgetall(`user:${email}`);

        // Check if user exists and password matches
        if (user && user.password === password) {
            console.log("Allowed");
            return res.status(200).json({ token: 'your-generated-token', user });
        } else {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

async function addNewUser(email: string, pw: string) {
    try {
        const userData = await kv.hset('user', {username: email, password: pw} );
    } catch (error) {
        // add error handling
    }
}

async function getPassword() {
    try {
        const userId = await kv.hget('userSession', 'userId');
        console.log(userId);
    } catch (error) {
        // Handle errors
    }
}