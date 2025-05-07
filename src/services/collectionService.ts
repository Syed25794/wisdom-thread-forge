
import { supabase } from '@/integrations/supabase/client';

export interface Collection {
  id: string;
  name: string;
  description: string | null;
  user_id: string;
  is_private: boolean;
  created_at: string;
  updated_at: string;
}

export async function getUserCollections() {
  const { data: userData, error: userError } = await supabase.auth.getUser();
  
  if (userError || !userData.user) {
    throw new Error('You must be signed in to view your collections');
  }
  
  // Using 'any' type to overcome type checking limitations
  const { data, error } = await supabase
    .from('collections' as any)
    .select('*')
    .eq('user_id', userData.user.id)
    .order('created_at', { ascending: false });
  
  if (error) {
    throw new Error(error.message);
  }
  
  return (data as unknown) as Collection[];
}

export async function createCollection(collection: Pick<Collection, 'name' | 'description' | 'is_private'>) {
  const { data: userData, error: userError } = await supabase.auth.getUser();
  
  if (userError || !userData.user) {
    throw new Error('You must be signed in to create a collection');
  }
  
  // Using 'any' type to overcome type checking limitations
  const { data, error } = await supabase
    .from('collections' as any)
    .insert({
      name: collection.name,
      description: collection.description,
      is_private: collection.is_private,
      user_id: userData.user.id,
    } as any)
    .select()
    .single();
  
  if (error) {
    throw new Error(error.message);
  }
  
  return (data as unknown) as Collection;
}

export async function addThreadToCollection(collectionId: string, threadId: string) {
  const { data: userData, error: userError } = await supabase.auth.getUser();
  
  if (userError || !userData.user) {
    throw new Error('You must be signed in to add a thread to a collection');
  }
  
  // First check if user owns the collection
  const { data: collectionData, error: collectionError } = await supabase
    .from('collections' as any)
    .select()
    .eq('id', collectionId)
    .eq('user_id', userData.user.id)
    .single();
  
  if (collectionError || !collectionData) {
    throw new Error('Collection not found or you do not have permission to modify it');
  }
  
  const { error } = await supabase
    .from('collection_threads' as any)
    .insert({
      collection_id: collectionId,
      thread_id: threadId,
    } as any);
  
  if (error) {
    if (error.code === '23505') {
      // Unique violation - already added
      throw new Error('This thread is already in the collection');
    }
    throw new Error(error.message);
  }
  
  return true;
}

export async function removeThreadFromCollection(collectionId: string, threadId: string) {
  const { data: userData, error: userError } = await supabase.auth.getUser();
  
  if (userError || !userData.user) {
    throw new Error('You must be signed in to remove a thread from a collection');
  }
  
  const { error } = await supabase
    .from('collection_threads' as any)
    .delete()
    .match({
      collection_id: collectionId,
      thread_id: threadId,
    } as any);
  
  if (error) {
    throw new Error(error.message);
  }
  
  return true;
}

export async function getCollectionThreads(collectionId: string) {
  const { data, error } = await supabase
    .from('collection_threads' as any)
    .select(`
      thread_id,
      threads:thread_id(
        *,
        author:profiles(username, avatar_url, full_name)
      )
    `)
    .eq('collection_id', collectionId);
  
  if (error) {
    throw new Error(error.message);
  }
  
  return (data.map((item: any) => item.threads) as unknown[]) as any[];
}
