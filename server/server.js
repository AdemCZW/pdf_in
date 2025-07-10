import path from "path";
import express from "express";
import cors from "cors";
import { fileURLToPath } from "url";

const app = express();
const port = process.env.PORT || 3000;
const __filename = fileURLToPath(
    import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
// 全域設定 CORS；這裡只須設定一次即可
app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "OPTIONS"],
    })
);

// 選擇性地處理所有 OPTIONS 請求 (可選)
// app.options("*", cors());

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

apiRouter.options("/bank", (req, res) => {
    res.sendStatus(200);
});

// 掛載子路由
app.use("/api", apiRouter);

// 靜態資源與 catch-all 路由
app.use(express.static(path.join(__dirname, "../dist")));
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../dist", "index.html"));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});