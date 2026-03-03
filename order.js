export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { service, link, quantity } = req.body;

  if (!service || !link || !quantity) {
    return res.status(400).json({ error: "Missing parameters" });
  }

  try {
    const response = await fetch("https://smm.africa/api/v3", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        key: process.env.SMM_API_KEY,
        action: "add",
        service: service,
        link: link,
        quantity: quantity
      })
    });

    const data = await response.json();

    return res.status(200).json({
      success: true,
      providerResponse: data
    });

  } catch (error) {
    return res.status(500).json({
      error: "Something went wrong",
      details: error.message
    });
  }
}
