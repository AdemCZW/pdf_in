import path from "path";
import express from "express";
import cors from "cors";
import { fileURLToPath } from "url";

const app = express();
const port = process.env.PORT || 3000;

// 將 ES Module 取得 __dirname
const __filename = fileURLToPath(
    import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(cors());

// 定義 API 路由 (注意：這裡必須在靜態檔案之前)
app.get("/api/data", (req, res) => {
    res.json({ message: "Hello from Railway backend!" });
});

app.post("/api/bank", (req, res) => {
    const bankInfo = req.body;
    console.log("Received bank info:", bankInfo);
    res.json({ message: "Bank info received!", bankInfo });
});

// 處理 CORS preflight 請求
app.options("/api/bank", (req, res) => {
    res.sendStatus(200);
});

// 提供前端打包結果的靜態資源
app.use(express.static(path.join(__dirname, "../dist")));

// catch-all: 支援前端 SPA 路由
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../dist", "index.html"));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});