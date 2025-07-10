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
app.use(cors());

// 建立一個 API 子路由
const apiRouter = express.Router();

apiRouter.get("/data", (req, res) => {
    res.json({ message: "Hello from Railway backend!" });
});

apiRouter.post("/bank", (req, res) => {
    const bankInfo = req.body;
    console.log("Received bank info:", bankInfo);
    res.json({ message: "Bank info received!", bankInfo });
});

// 處理 CORS preflight 請求
apiRouter.options("/bank", (req, res) => {
    res.sendStatus(200);
});

// 掛載子路由
app.use("/api", apiRouter);

// 之後再處理靜態檔案與 catch-all 路由
app.use(express.static(path.join(__dirname, "../dist")));
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../dist", "index.html"));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});