export default async function handler(req, res) {
  // 1. Ambil key dari Vercel. Aman, gak keliatan user
  const API_KEY = process.env.GROQ_KEY;
  if (!API_KEY) return res.status(500).json({ error: "API Key belum diset di Vercel" });

  // 2. Terusin request ke Groq
  const response = await fetch("https://api.groq.com/openai/v1/chat/completions",{
    method: "POST",
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${API_KEY}` },
    body: JSON.stringify(req.body) // req.body = data dari frontend
  });

  const data = await response.json();
  // 3. Balikin hasil ke frontend
  res.status(200).json(data);
}
