// api/append-to-sheet.js
import { google } from "googleapis";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  try {
    const { customer, items, total } = req.body || {};
    if (!customer || !items || typeof total !== "number") {
      return res.status(400).json({ error: "Invalid payload" });
    }

    const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const privateKey = (process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY || "").replace(/\\n/g, "\n");
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    if (!clientEmail || !privateKey || !spreadsheetId) {
      return res.status(500).json({ error: "Missing Google Sheets credentials" });
    }

    const jwt = new google.auth.JWT(
      clientEmail,
      null,
      privateKey,
      ["https://www.googleapis.com/auth/spreadsheets"]
    );
    await jwt.authorize();

    const sheets = google.sheets({ version: "v4", auth: jwt });

    const now = new Date().toLocaleString("es-PA", { timeZone: "America/Panama" });
    const itemsText = items.map(i => `${i.qty}x ${i.product} ($${i.unitPrice})`).join(" | ");

    const range = "Pedidos!A:G"; // Nombre de la pestaña
    const row = [
      now,
      customer?.name || "",
      customer?.whats || "",
      customer?.zone || "",
      customer?.address || "",
      itemsText,
      total
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: "USER_ENTERED",
      requestBody: { values: [row] }
    });

    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Sheets append failed" });
  }
}
