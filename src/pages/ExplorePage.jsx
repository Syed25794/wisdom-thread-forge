
import { useState } from 'react';
import ThreadCard from '@/components/ThreadCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { mockThreads } from '@/data/mockData';

const ExplorePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('bookmarks');
  
  // In a real app, these would be filtered and sorted based on the query and sortBy
  const threads = mockThreads;
  
  return (
    <div className="container py-8">
      <div className="max-w-3xl mx-auto text-center mb-10">
        <h1 className="mb-4">Explore Threads</h1>
        <p className="text-xl text-muted-foreground">
          Discover wisdom threads on various topics
        </p>
      </div>
      
      <div className="max-w-xl mx-auto mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search threads..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>
      
      <div className="flex justify-center mb-8">
        <div className="flex gap-2">
          <Button
            variant={sortBy === 'bookmarks' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSortBy('bookmarks')}
          >
            Most Bookmarked
          </Button>
          <Button
            variant={sortBy === 'forks' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSortBy('forks')}
          >
            Most Forked
          </Button>
          <Button
            variant={sortBy === 'newest' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSortBy('newest')}
          >
            Newest
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {threads.map(thread => (
          <ThreadCard key={thread.id} thread={thread} />
        ))}
      </div>
    </div>
  );
};

export default ExplorePage;
