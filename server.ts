import cors from "cors";
import express, { Request, Response } from "express";

const app = express();
const PORT = process.env.PORT || 3001;

// Enable CORS for Next.js frontend
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// Parse JSON bodies
app.use(express.json());

// Hello World endpoint
app.get("/api/hello", (req: Request, res: Response) => {
  res.json({ message: "Hello World" });
});

// Echo endpoint
app.post("/api/echo", async (req: Request, res: Response) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: "Text is required" });
  }

  // Sleep for 1 second
  await new Promise((resolve) => setTimeout(resolve, 200));

  res.json({ message: `${text}` });
});

app.listen(PORT, () => {
  console.log(`Express server running on port ${PORT}`);
});
