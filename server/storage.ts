import { type User, type InsertUser, type InvestmentSubmission, type InsertInvestmentSubmission } from "@shared/schema";
import { randomUUID } from "crypto";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Investment submission methods
  createInvestmentSubmission(submission: InsertInvestmentSubmission): Promise<InvestmentSubmission>;
  getInvestmentSubmission(id: string): Promise<InvestmentSubmission | undefined>;
  getAllInvestmentSubmissions(): Promise<InvestmentSubmission[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private investmentSubmissions: Map<string, InvestmentSubmission>;

  constructor() {
    this.users = new Map();
    this.investmentSubmissions = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createInvestmentSubmission(insertSubmission: InsertInvestmentSubmission): Promise<InvestmentSubmission> {
    const id = randomUUID();
    const submittedAt = new Date();
    const submission: InvestmentSubmission = { 
      ...insertSubmission, 
      id, 
      submittedAt
    };
    this.investmentSubmissions.set(id, submission);
    return submission;
  }

  async getInvestmentSubmission(id: string): Promise<InvestmentSubmission | undefined> {
    return this.investmentSubmissions.get(id);
  }

  async getAllInvestmentSubmissions(): Promise<InvestmentSubmission[]> {
    return Array.from(this.investmentSubmissions.values());
  }
}

export const storage = new MemStorage();
