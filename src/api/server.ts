import cors from "cors";
import express, { Request, Response } from "express";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import setupSwagger from "./swagger";

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Enable CORS for Next.js frontend
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",")
  : ["http://localhost:3000", "http://127.0.0.1:3000"];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Parse JSON bodies
app.use(express.json());

// Serve Swagger UI
const swaggerSpec = setupSwagger(PORT);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Hello World endpoint
/**
 * @swagger
 * /api/hello:
 *   get:
 *     summary: Get a hello world message
 *     description: Returns a simple hello world message
 *     tags: [Hello]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HelloResponse'
 */
app.get("/api/hello", (req: Request, res: Response) => {
  res.json({ message: "Hello World" });
});

// Echo endpoint
/**
 * @swagger
 * /api/echo:
 *   post:
 *     summary: Echo back the provided text
 *     description: Takes a text input and returns it back with a small delay
 *     tags: [Echo]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EchoRequest'
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EchoResponse'
 *       400:
 *         description: Bad request - text is required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
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
  console.log(`🚀 Express server running on port ${PORT}`);
  console.log(
    `📚 API Documentation available at: http://localhost:${PORT}/api-docs`
  );
  console.log(`🌐 API endpoints:`);
  console.log(`   GET  http://localhost:${PORT}/api/hello`);
  console.log(`   POST http://localhost:${PORT}/api/echo`);
});
