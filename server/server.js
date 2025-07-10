import path from "path";
import express from "express";
import cors from "cors";
import { fileURLToPath } from "url";

const app = express();
const port = process.env.PORT || 3000;
const __filename = fileURLToPath(
    import.meta.url);
const __dirname = path.dirname(__filename);

console.log("__dirname:", __dirname);

app.use(express.json());
app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "OPTIONS"],
        allowedHeaders: ["Content-Type"],
    })
);

// 建立 API 子路由
const apiRouter = express.Router();

apiRouter.get("/data", (req, res) => {
    res.json({ message: "Hello from Railway backend!" });
});

apiRouter.post("/bank", (req, res) => {
    const bankInfo = req.body;
    console.log("Received bank info:", bankInfo);
    res.json({ message: "Bank info received!", bankInfo });
});

// 移除獨立的 OPTIONS 處理，CORS 中間件已處理
// apiRouter.options("/bank", (req, res) => {
//     res.sendStatus(200);
// });

app.use("/api", apiRouter);

// 靜態檔案服務
app.use(express.static(path.join(__dirname, "../dist")));

// SPA 的 catch-all 路由，僅處理 GET 請求
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../dist", "index.html"));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});