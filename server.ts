import express from "express";
import path from "path";
import dotenv from 'dotenv';
import cors from 'cors';

// Load .env into process.env for the server (ensures GEMINI_API_KEY is available)
dotenv.config();

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

  app.use(express.json());
  // Enable CORS so a separately hosted frontend can call this API.
  // Restrict origin in production by setting FRONTEND_ORIGIN env var.
  app.use(cors({ origin: process.env.FRONTEND_ORIGIN || '*' }));

  // API route for Paystack initialize
  app.post("/api/paystack/initialize", async (req, res) => {
    try {
      const { email, amount, metadata } = req.body;
      const secretKey = process.env.PAYSTACK_SECRET_KEY;
      
      if (!secretKey) {
        return res.status(500).json({ status: false, message: "Server misconfiguration. PAYSTACK_SECRET_KEY is missing." });
      }

      const response = await fetch("https://api.paystack.co/transaction/initialize", {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${secretKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          amount, // Amount should be in kobo
          metadata,
          callback_url: `${req.protocol}://${req.get('host')}/training`
        })
      });

      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: false, message: "Failed to initialize payment." });
    }
  });

  // FormSubmit proxy to avoid sending origin/referer which adds "Someone submitted on URL"
  app.post("/api/contact", async (req, res) => {
    try {
      const { _formUrl, ...data } = req.body;
      if (!_formUrl) {
        return res.status(400).json({ status: false, message: "Missing formUrl" });
      }

      const ajaxUrl = _formUrl.replace('formsubmit.co/', 'formsubmit.co/ajax/');
      const originHeader = req.headers.origin || `${req.protocol}://${req.get('host')}`;
      const refererHeader = req.headers.referer || `${req.protocol}://${req.get('host')}/contact`;
      
      const response = await fetch(ajaxUrl, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Origin': originHeader,
          'Referer': refererHeader
        },
        body: JSON.stringify(data)
      });
      
      const result = await response.json();
      res.json(result);
    } catch (error) {
      console.error("Contact Form Error:", error);
      res.status(500).json({ status: false, message: "Failed to submit form." });
    }
  });

  // AI health route for compatibility with the frontend assistant checks.
  app.get("/api/health", (_req, res) => {
    res.json({ status: 'ok' });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    // Dynamically import Vite and create a middleware-only server without loading
    // the project's vite.config.ts to avoid resolution issues in the runtime loader.
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      configFile: false,
      root: process.cwd(),
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
