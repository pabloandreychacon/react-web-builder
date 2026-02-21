import { create } from 'zustand';
import { supabase } from '../lib/supabase';

interface SettingsState {
  siteName: string;
  email: string;
  phone: string;
  address: string;
  latitude: number;
  longitude: number;
  isLoading: boolean;
  fetchSettings: () => Promise<void>;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  siteName: 'Go Online Now',
  email: 'support@webbuilder.com',
  phone: '+1 (234) 567-890',
  address: '123 Web Street, Tech City, TC 12345, USA',
  latitude: 10.03025808569571,
  longitude: -84.09723544018195,
  isLoading: false,
  fetchSettings: async () => {
    set({ isLoading: true });
    try {
      const { data, error } = await supabase
        .from('Settings')
        .select('BusinessName, Email, Phone, Address, MapLocation')
        .eq('Id', 9)
        .single();

      if (!error && data) {
        let lat = 10.03025808569571;
        let lng = -84.09723544018195;
        
        if (data.MapLocation) {
          const coords = data.MapLocation.split(',').map((c: string) => parseFloat(c.trim()));
          if (coords.length === 2 && !isNaN(coords[0]) && !isNaN(coords[1])) {
            lat = coords[0];
            lng = coords[1];
          }
        }
        
        set({ 
          siteName: data.BusinessName, 
          email: data.Email,
          phone: data.Phone,
          address: data.Address,
          latitude: lat,
          longitude: lng
        });
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      set({ isLoading: false });
    }
  },
}));
