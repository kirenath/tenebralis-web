import { z } from "zod/v4";

// ── Scope & Visibility ──────────────────────────────────────────

export enum ScopeType {
  GLOBAL = "global",
  WORLD = "world",
  SAVE = "save",
}

export enum AiVisibility {
  PRIVATE = "private",
  ASSISTANT = "assistant",
  WORLD_CONTEXT = "world_context",
  SAVE_CONTEXT = "save_context",
}

// ── Messages ─────────────────────────────────────────────────────

export enum MessageRole {
  USER = "user",
  ASSISTANT = "assistant",
  SYSTEM = "system",
  TOOL = "tool",
}

// ── Forum ────────────────────────────────────────────────────────

export enum CommentingMode {
  ALL = "all",
  AI_ONLY = "ai_only",
  USER_ONLY = "user_only",
}

export enum ForumVisibility {
  WORLD = "world",
  PRIVATE = "private",
  ARCHIVED = "archived",
}

// ── Economy ──────────────────────────────────────────────────────

export enum LedgerDirection {
  INCOME = "income",
  EXPENSE = "expense",
  TRANSFER = "transfer",
}

// ── Zod Schemas ──────────────────────────────────────────────────

export const scopeTypeSchema = z.enum(["global", "world", "save"]);
export const aiVisibilitySchema = z.enum([
  "private",
  "assistant",
  "world_context",
  "save_context",
]);
export const messageRoleSchema = z.enum(["user", "assistant", "system", "tool"]);
export const commentingModeSchema = z.enum(["all", "ai_only", "user_only"]);
export const forumVisibilitySchema = z.enum(["world", "private", "archived"]);
export const ledgerDirectionSchema = z.enum(["income", "expense", "transfer"]);
