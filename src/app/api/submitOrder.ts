import { google } from "googleapis";
import type { NextApiRequest, NextApiResponse } from "next";

const sheets: any = google.sheets("v4");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { username, phone, selectedOptions, totalPrice } = req.body;

    const auth = new google.auth.GoogleAuth({
      keyFile: "path/to/your-credentials.json",
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheetsClient = await auth.getClient();
    const spreadsheetId = "1IAWT-K-doLTb1Re8927MMVkuD8vdeZqp-txG_rfkkHI";
    const range = "Sheet1!A:D";

    const request = {
      spreadsheetId,
      range,
      valueInputOption: "RAW",
      insertDataOption: "INSERT_ROWS",
      resource: {
        values: [
          [username, phone, JSON.stringify(selectedOptions), totalPrice],
        ],
      },
      auth: sheetsClient,
    };

    try {
      await sheets.spreadsheets.values.append(request);
      res
        .status(200)
        .json({ message: "Data successfully added to Google Sheets!" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to append data to Google Sheets", error });
    }
  } else {
    res.status(405).json({ message: "Only POST requests are allowed" });
  }
}
