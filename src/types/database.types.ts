export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          created_at: string
          full_name: string | null
          avatar_url: string | null
          phone: string | null
          address: string | null
          account_number: string
          account_type: string
          account_status: string
          is_admin: boolean
        }
        Insert: {
          id: string
          created_at?: string
          full_name?: string | null
          avatar_url?: string | null
          phone?: string | null
          address?: string | null
          account_number?: string
          account_type?: string
          account_status?: string
          is_admin?: boolean
        }
        Update: {
          id?: string
          created_at?: string
          full_name?: string | null
          avatar_url?: string | null
          phone?: string | null
          address?: string | null
          account_number?: string
          account_type?: string
          account_status?: string
          is_admin?: boolean
        }
      }
      transactions: {
        Row: {
          id: string
          created_at: string
          user_id: string
          amount: number
          transaction_type: 'deposit' | 'withdrawal' | 'transfer'
          description: string | null
          reference: string | null
          status: string
          metadata: Json | null
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          amount: number
          transaction_type: 'deposit' | 'withdrawal' | 'transfer'
          description?: string | null
          reference?: string | null
          status?: string
          metadata?: Json | null
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          amount?: number
          transaction_type?: 'deposit' | 'withdrawal' | 'transfer'
          description?: string | null
          reference?: string | null
          status?: string
          metadata?: Json | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_balance: {
        Args: {
          user_id_param: string
        }
        Returns: number
      }
    }
    Enums: {
      [_ in never]: never
    }
  }
}
