export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      app: {
        Row: {
          created_at: string
          enable_contact: boolean
          enable_privacy: boolean
          enable_support: boolean
          enable_terms: boolean
          id: string
          name: string
          owner_id: string
          slug: string
          theme: string | null
        }
        Insert: {
          created_at?: string
          enable_contact?: boolean
          enable_privacy?: boolean
          enable_support?: boolean
          enable_terms?: boolean
          id?: string
          name: string
          owner_id: string
          slug: string
          theme?: string | null
        }
        Update: {
          created_at?: string
          enable_contact?: boolean
          enable_privacy?: boolean
          enable_support?: boolean
          enable_terms?: boolean
          id?: string
          name?: string
          owner_id?: string
          slug?: string
          theme?: string | null
        }
      }
      app_meta: {
        Row: {
          age_restriction: string
          apple_id: string
          currency: string
          description: string
          developer: string
          developer_id: string
          formatted_price: string
          genre: string
          icon: string
          icon_small: string
          id: string
          name: string
          price: number
          rating: number
          rating_count: number
          release_date: string
          screenshots: string[]
          version: string
        }
        Insert: {
          age_restriction: string
          apple_id: string
          currency: string
          description: string
          developer: string
          developer_id: string
          formatted_price: string
          genre: string
          icon: string
          icon_small: string
          id?: string
          name: string
          price: number
          rating: number
          rating_count: number
          release_date: string
          screenshots: string[]
          version: string
        }
        Update: {
          age_restriction?: string
          apple_id?: string
          currency?: string
          description?: string
          developer?: string
          developer_id?: string
          formatted_price?: string
          genre?: string
          icon?: string
          icon_small?: string
          id?: string
          name?: string
          price?: number
          rating?: number
          rating_count?: number
          release_date?: string
          screenshots?: string[]
          version?: string
        }
      }
      contact: {
        Row: {
          app_id: string
          created_at: string
          email: string | null
          id: string
          message: string
          name: string | null
          type: string
        }
        Insert: {
          app_id: string
          created_at?: string
          email?: string | null
          id?: string
          message: string
          name?: string | null
          type: string
        }
        Update: {
          app_id?: string
          created_at?: string
          email?: string | null
          id?: string
          message?: string
          name?: string | null
          type?: string
        }
      }
      privacy: {
        Row: {
          created_at: string | null
          id: string
          value: string
        }
        Insert: {
          created_at?: string | null
          id: string
          value: string
        }
        Update: {
          created_at?: string | null
          id?: string
          value?: string
        }
      }
      support: {
        Row: {
          answer: string
          app_id: string
          created_at: string | null
          id: string
          question: string
        }
        Insert: {
          answer: string
          app_id: string
          created_at?: string | null
          id?: string
          question: string
        }
        Update: {
          answer?: string
          app_id?: string
          created_at?: string | null
          id?: string
          question?: string
        }
      }
      terms: {
        Row: {
          created_at: string
          id: string
          value: string
        }
        Insert: {
          created_at?: string
          id: string
          value: string
        }
        Update: {
          created_at?: string
          id?: string
          value?: string
        }
      }
      user: {
        Row: {
          created_at: string
          email: string
          id: string
          name: string
          password: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          name: string
          password: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          name?: string
          password?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  storage: {
    Tables: {
      buckets: {
        Row: {
          created_at: string | null
          id: string
          name: string
          owner: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id: string
          name: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          path_tokens: string[] | null
          updated_at: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: string[]
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
