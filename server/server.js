import path from "path";
import express from "express";
import cors from "cors";
import { fileURLToPath } from "url";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// 定義 API 路由
app.get("/api/data", (req, res) => {
    res.json({ message: "Hello from Railway backend!" });
});

app.post("/api/bank", (req, res) => {
    const bankInfo = req.body;
    console.log("Received bank info:", bankInfo);
    res.json({ message: "Bank info received!", bankInfo });
});

// 若需要處理 CORS preflight 對 OPTIONS 請求，也可以加入：
app.options("/api/bank", (req, res) => {
    res.sendStatus(200);
});

// 靜態資源路徑：提供前端打包結果 (dist)
app.use(
    express.static(path.resolve(fileURLToPath(
        import.meta.url), "../dist"))
);

// 支援前端 SPA 路由
app.get("*", (req, res) => {
    res.sendFile(
        path.resolve(fileURLToPath(
            import.meta.url), "../dist/index.html")
    );
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});