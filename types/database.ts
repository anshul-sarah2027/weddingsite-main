export type RsvpRow = {
  id: string;
  full_name: string;
  email: string;
  attending: boolean;
  party_size: number | null;
  guest_names: string[] | null;
  allergies: string | null;
  notes: string | null;
  created_at: string;
};

export type RsvpInsert = {
  full_name: string;
  email: string;
  attending: boolean;
  party_size?: number | null;
  guest_names?: string[] | null;
  allergies?: string | null;
  notes?: string | null;
};

export type Database = {
  public: {
    Tables: {
      rsvps: {
        Row: RsvpRow;
        Insert: RsvpInsert;
        Update: Partial<RsvpInsert>;
      };
    };
  };
};
