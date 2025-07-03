import path from "path";
import express from "express";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// 靜態資源路徑，假設你前端打包結果放在 'dist' 資料夾
app.use(express.static(path.resolve(__dirname, "dist")));

// API 範例
app.get("/api/data", (req, res) => {
    res.json({ message: "Hello from Railway backend!" });
});

app.post("/api/bank", (req, res) => {
    const bankInfo = req.body;
    console.log("Received bank info:", bankInfo);
    res.json({ message: "Bank info received!", bankInfo });
});

// 支援前端路由，導向 index.html（SPA 必備）
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "dist", "index.html"));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});