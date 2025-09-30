import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertInvestmentSubmissionSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // Investment submission endpoint
  app.post("/api/investments", async (req, res) => {
    try {
      // Validate the request body
      const validationResult = insertInvestmentSubmissionSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        const validationError = fromZodError(validationResult.error);
        return res.status(400).json({ 
          message: "Validation failed", 
          errors: validationError.details 
        });
      }

      // Store the investment submission
      const submission = await storage.createInvestmentSubmission(validationResult.data);
      
      res.status(201).json({ 
        message: "Investment submission created successfully",
        id: submission.id,
        submittedAt: submission.submittedAt
      });
    } catch (error) {
      console.error("Error creating investment submission:", error);
      res.status(500).json({ 
        message: "Internal server error" 
      });
    }
  });

  // Get all investment submissions (for admin purposes)
  app.get("/api/investments", async (req, res) => {
    try {
      const submissions = await storage.getAllInvestmentSubmissions();
      res.json(submissions);
    } catch (error) {
      console.error("Error fetching investment submissions:", error);
      res.status(500).json({ 
        message: "Internal server error" 
      });
    }
  });

  // Get investment submission by ID
  app.get("/api/investments/:id", async (req, res) => {
    try {
      const submission = await storage.getInvestmentSubmission(req.params.id);
      
      if (!submission) {
        return res.status(404).json({ 
          message: "Investment submission not found" 
        });
      }
      
      res.json(submission);
    } catch (error) {
      console.error("Error fetching investment submission:", error);
      res.status(500).json({ 
        message: "Internal server error" 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
