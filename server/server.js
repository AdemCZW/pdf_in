import express from "express";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({ origin: "*", methods: ["GET", "POST", "OPTIONS"] }));

app.post("/api/bank", (req, res) => {
    console.log("Received POST to /api/bank:", req.body);
    res.json({ message: "POST to /api/bank successful!", data: req.body });
});

app.listen(port, () => {
    console.log(`Simple server running on port ${port}`);
});