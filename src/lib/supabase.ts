import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://cfigfcufbornekzjxbqd.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmaWdmY3VmYm9ybmVremp4YnFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI5MDU4NDcsImV4cCI6MjA2ODQ4MTg0N30.Y40XGZS1wvUVku4kEKi5CpntHA3k8Y9ohzMSG9bNMHI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types
export interface WebsiteProject {
  id: string;
  userId: string;
  name: string;
  domain: string;
  status: 'draft' | 'building' | 'published' | 'archived';
  template?: string;
  content?: any;
  createdAt: string;
  updatedAt: string;
}

export interface Domain {
  id: string;
  userId: string;
  name: string;
  registrar: 'hostinger' | 'godaddy' | 'namecheap';
  status: 'available' | 'registered' | 'pending' | 'expired';
  expiryDate?: string;
  renewalPrice?: number;
  createdAt: string;
  updatedAt: string;
}

// Supabase functions for websites
export const websiteService = {
  async getProjectsByUser(userId: string) {
    const { data, error } = await supabase
      .from('website_projects')
      .select('*')
      .eq('userId', userId);

    if (error) throw error;
    return data as WebsiteProject[];
  },

  async createProject(project: Omit<WebsiteProject, 'id' | 'createdAt' | 'updatedAt'>) {
    const { data, error } = await supabase
      .from('website_projects')
      .insert([project])
      .select();

    if (error) throw error;
    return data[0] as WebsiteProject;
  },

  async updateProject(projectId: string, updates: Partial<WebsiteProject>) {
    const { data, error } = await supabase
      .from('website_projects')
      .update(updates)
      .eq('id', projectId)
      .select();

    if (error) throw error;
    return data[0] as WebsiteProject;
  },

  async deleteProject(projectId: string) {
    const { error } = await supabase
      .from('website_projects')
      .delete()
      .eq('id', projectId);

    if (error) throw error;
  },
};

// Supabase functions for domains
export const domainService = {
  async getDomainsByUser(userId: string) {
    const { data, error } = await supabase
      .from('domains')
      .select('*')
      .eq('userId', userId);

    if (error) throw error;
    return data as Domain[];
  },

  async createDomain(domain: Omit<Domain, 'id' | 'createdAt' | 'updatedAt'>) {
    const { data, error } = await supabase
      .from('domains')
      .insert([domain])
      .select();

    if (error) throw error;
    return data[0] as Domain;
  },

  async updateDomain(domainId: string, updates: Partial<Domain>) {
    const { data, error } = await supabase
      .from('domains')
      .update(updates)
      .eq('id', domainId)
      .select();

    if (error) throw error;
    return data[0] as Domain;
  },

  async deleteDomain(domainId: string) {
    const { error } = await supabase
      .from('domains')
      .delete()
      .eq('id', domainId);

    if (error) throw error;
  },
};
