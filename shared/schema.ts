import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const nfts = pgTable("nfts", {
  id: serial("id").primaryKey(),
  tokenId: text("token_id").notNull(),
  contractAddress: text("contract_address").notNull(),
  name: text("name").notNull(),
  image: text("image"),
  collection: text("collection").notNull(), // 'primordia', 'moonrunners', 'dragonhorde'
  metadata: jsonb("metadata"),
});

export const transactions = pgTable("transactions", {
  id: serial("id").primaryKey(),
  hash: text("hash").notNull().unique(),
  userAddress: text("user_address").notNull(),
  type: text("type").notNull(), // 'unstake'
  tokenIds: text("token_ids").array().notNull(),
  contractAddress: text("contract_address").notNull(),
  status: text("status").notNull(), // 'pending', 'confirmed', 'failed'
  gasUsed: text("gas_used"),
  blockNumber: integer("block_number"),
});

export const insertNFTSchema = createInsertSchema(nfts).omit({
  id: true,
});

export const insertTransactionSchema = createInsertSchema(transactions).omit({
  id: true,
});

export type InsertNFT = z.infer<typeof insertNFTSchema>;
export type NFT = typeof nfts.$inferSelect;
export type InsertTransaction = z.infer<typeof insertTransactionSchema>;
export type Transaction = typeof transactions.$inferSelect;

// Web3 specific types
export interface StakedNFTData {
  tokenId: string;
  contractAddress: string;
  collection: 'primordia' | 'moonrunners' | 'dragonhorde';
  name: string;
  image?: string;
  metadata?: any;
}

export interface ContractInfo {
  address: string;
  abi: any[];
  readMethod: string;
  writeMethod: string;
}
