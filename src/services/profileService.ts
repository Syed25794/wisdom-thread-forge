
import { supabase } from '@/integrations/supabase/client';

export interface Profile {
  id: string;
  username: string;
  full_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  created_at: string;
  updated_at: string;
}

export async function getUserProfile() {
  const { data: userData, error: userError } = await supabase.auth.getUser();
  
  if (userError || !userData.user) {
    throw new Error('No authenticated user');
  }
  
  const { data, error } = await supabase
    .from('profiles')
    .select()
    .eq('id', userData.user.id)
    .single();
  
  if (error) {
    throw new Error(error.message);
  }
  
  return data as Profile;
}

export async function updateProfile(profile: Partial<Profile>) {
  const { data: userData, error: userError } = await supabase.auth.getUser();
  
  if (userError || !userData.user) {
    throw new Error('You must be signed in to update your profile');
  }
  
  const { data, error } = await supabase
    .from('profiles')
    .update(profile)
    .eq('id', userData.user.id)
    .select()
    .single();
  
  if (error) {
    throw new Error(error.message);
  }
  
  return data as Profile;
}

export async function uploadAvatar(file: File) {
  const { data: userData, error: userError } = await supabase.auth.getUser();
  
  if (userError || !userData.user) {
    throw new Error('You must be signed in to upload an avatar');
  }
  
  const fileExt = file.name.split('.').pop();
  const fileName = `${userData.user.id}-${Math.random().toString(36).substring(2)}.${fileExt}`;
  const filePath = `avatars/${fileName}`;
  
  // Upload file to storage
  const { error: uploadError } = await supabase
    .storage
    .from('user-content')
    .upload(filePath, file);
  
  if (uploadError) {
    throw new Error(uploadError.message);
  }
  
  // Get public URL
  const { data } = supabase
    .storage
    .from('user-content')
    .getPublicUrl(filePath);
  
  // Update profile with new avatar URL
  return updateProfile({
    avatar_url: data.publicUrl,
  });
}
