// pages/api/proxy.js
import fetch from 'node-fetch';

export default async function handler(req, res) {
  const url = 'https://rpc.sepolia.org'; // The RPC URL
  try {
    const rpcResponse = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add any other headers needed for the RPC
      },
      body: JSON.stringify(req.body), // Forward the body from the original request
    });
    const data = await rpcResponse.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error contacting RPC' });
  }
}
