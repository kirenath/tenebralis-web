/**
 * Database type definitions.
 *
 * TODO: Replace this placeholder with auto-generated types from Supabase CLI:
 *   npx supabase gen types typescript --project-id <your-project-id> > src/types/database.types.ts
 *
 * For now, we define a minimal Database type that allows the codebase to compile.
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      [key: string]: {
        Row: Record<string, any>;
        Insert: Record<string, any>;
        Update: Record<string, any>;
      };
    };
    Views: {
      [key: string]: {
        Row: Record<string, any>;
      };
    };
    Functions: {
      [key: string]: {
        Args: Record<string, any>;
        Returns: any;
      };
    };
    Enums: {
      [key: string]: string;
    };
  };
}
