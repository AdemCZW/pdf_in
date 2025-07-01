import express from "express";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// 範例 GET API，回傳簡單訊息
app.get("/api/data", (req, res) => {
    res.json({ message: "Hello from Railway backend!" });
});

// 範例 POST API，可用來接收前端傳送的銀行資訊
app.post("/api/bank", (req, res) => {
    // 擷取前端傳來的資料
    const bankInfo = req.body;
    console.log("Received bank info:", bankInfo);
    // 這裡您可以進一步把資料存進資料庫（例如 Railway 提供的 Postgres）
    res.json({ message: "Bank info received!", bankInfo });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});