
import { useState } from 'react';
import ThreadCard from '@/components/ThreadCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockThreads } from '@/data/mockData';

const HomePage = () => {
  const [activeTab, setActiveTab] = useState('featured');
  const [activeFilter, setActiveFilter] = useState('all');
  
  // In a real app, these would be filtered based on the active tab and filter
  const threads = mockThreads;
  
  // All unique tags from threads
  const allTags = Array.from(
    new Set(mockThreads.flatMap(thread => thread.tags))
  );
  
  return (
    <div className="container py-8">
      <div className="max-w-3xl mx-auto text-center mb-10">
        <h1 className="mb-4">Discover Wisdom</h1>
        <p className="text-xl text-muted-foreground">
          Explore insightful threads from thinkers around the world
        </p>
      </div>
      
      <Tabs defaultValue="featured" onValueChange={setActiveTab}>
        <div className="flex justify-center mb-6">
          <TabsList>
            <TabsTrigger value="featured">Featured</TabsTrigger>
            <TabsTrigger value="recent">Recent</TabsTrigger>
            <TabsTrigger value="trending">Trending</TabsTrigger>
          </TabsList>
        </div>
        
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          <Button
            variant={activeFilter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveFilter('all')}
          >
            All
          </Button>
          
          {allTags.map(tag => (
            <Button
              key={tag}
              variant={activeFilter === tag ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveFilter(tag)}
            >
              {tag}
            </Button>
          ))}
        </div>
        
        <TabsContent value="featured" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {threads.map(thread => (
              <ThreadCard key={thread.id} thread={thread} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="recent" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* In a real app, we would have different threads here */}
            {threads.map(thread => (
              <ThreadCard key={thread.id} thread={thread} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="trending" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* In a real app, we would have different threads here */}
            {threads.map(thread => (
              <ThreadCard key={thread.id} thread={thread} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HomePage;
