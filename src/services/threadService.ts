
import { supabase } from '@/integrations/supabase/client';

export interface Thread {
  id: string;
  title: string;
  content: string;
  author_id: string;
  created_at: string;
  updated_at: string;
  tags: string[];
  bookmarks_count: number;
  forks_count: number;
  author?: {
    username: string;
    avatar_url: string;
    full_name: string;
  };
}

export async function getThreads(options: {
  limit?: number;
  sortBy?: 'newest' | 'bookmarks' | 'forks';
  tag?: string;
}) {
  const { limit = 10, sortBy = 'newest', tag } = options;
  
  let query = supabase
    .from('threads')
    .select(`
      *,
      author:profiles(username, avatar_url, full_name)
    `)
    .limit(limit);
  
  if (tag) {
    query = query.contains('tags', [tag]);
  }
  
  if (sortBy === 'newest') {
    query = query.order('created_at', { ascending: false });
  } else if (sortBy === 'bookmarks') {
    query = query.order('bookmarks_count', { ascending: false });
  } else if (sortBy === 'forks') {
    query = query.order('forks_count', { ascending: false });
  }
  
  const { data, error } = await query;
  
  if (error) {
    throw new Error(error.message);
  }
  
  return data as Thread[];
}

export async function getThreadById(id: string) {
  const { data, error } = await supabase
    .from('threads')
    .select(`
      *,
      author:profiles(username, avatar_url, full_name)
    `)
    .eq('id', id)
    .single();
  
  if (error) {
    throw new Error(error.message);
  }
  
  return data as Thread;
}

export async function createThread(
  thread: Pick<Thread, 'title' | 'content' | 'tags'>
) {
  const { data: userData, error: userError } = await supabase.auth.getUser();
  
  if (userError || !userData.user) {
    throw new Error('You must be signed in to create a thread');
  }
  
  const { data, error } = await supabase
    .from('threads')
    .insert({
      title: thread.title,
      content: thread.content,
      tags: thread.tags,
      author_id: userData.user.id,
    })
    .select()
    .single();
  
  if (error) {
    throw new Error(error.message);
  }
  
  return data as Thread;
}

export async function bookmarkThread(threadId: string) {
  const { data: userData, error: userError } = await supabase.auth.getUser();
  
  if (userError || !userData.user) {
    throw new Error('You must be signed in to bookmark a thread');
  }
  
  const { error } = await supabase
    .from('bookmarks')
    .insert({
      thread_id: threadId,
      user_id: userData.user.id,
    });
  
  if (error) {
    if (error.code === '23505') {
      // Unique violation - already bookmarked
      throw new Error('You have already bookmarked this thread');
    }
    throw new Error(error.message);
  }
  
  return true;
}

export async function unbookmarkThread(threadId: string) {
  const { data: userData, error: userError } = await supabase.auth.getUser();
  
  if (userError || !userData.user) {
    throw new Error('You must be signed in to remove a bookmark');
  }
  
  const { error } = await supabase
    .from('bookmarks')
    .delete()
    .match({
      thread_id: threadId,
      user_id: userData.user.id,
    });
  
  if (error) {
    throw new Error(error.message);
  }
  
  return true;
}

export async function isThreadBookmarked(threadId: string) {
  const { data: userData, error: userError } = await supabase.auth.getUser();
  
  if (userError || !userData.user) {
    return false;
  }
  
  const { data, error } = await supabase
    .from('bookmarks')
    .select('id')
    .match({
      thread_id: threadId,
      user_id: userData.user.id,
    });
  
  if (error) {
    throw new Error(error.message);
  }
  
  return data && data.length > 0;
}
