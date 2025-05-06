
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Lock, Plus } from 'lucide-react';
import { mockCollections, mockThreads } from '@/data/mockData';

const CollectionCard = ({ collection }) => {
  // Find threads in this collection
  const collectionThreads = mockThreads.filter(thread => 
    collection.threads.includes(thread.id)
  );
  
  return (
    <Link to={`/collections/${collection.id}`}>
      <Card className="h-full transition-shadow hover:shadow-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold">{collection.name}</h3>
            {collection.isPrivate && <Lock className="h-4 w-4 text-muted-foreground" />}
          </div>
        </CardHeader>
        <CardContent className="pb-4">
          <p className="text-muted-foreground mb-2">{collection.description}</p>
        </CardContent>
        <CardFooter className="pt-0">
          <p className="text-sm text-muted-foreground">
            {collectionThreads.length} {collectionThreads.length === 1 ? 'thread' : 'threads'}
          </p>
        </CardFooter>
      </Card>
    </Link>
  );
};

const CollectionsPage = () => {
  const [collections, setCollections] = useState(mockCollections);
  const [showNewCollectionForm, setShowNewCollectionForm] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState('');
  const [newCollectionDescription, setNewCollectionDescription] = useState('');
  
  const handleCreateCollection = (e) => {
    e.preventDefault();
    
    if (newCollectionName.trim()) {
      const newCollection = {
        id: `c${collections.length + 1}`,
        name: newCollectionName,
        description: newCollectionDescription || 'My collection',
        threads: [],
        isPrivate: false
      };
      
      setCollections([...collections, newCollection]);
      setNewCollectionName('');
      setNewCollectionDescription('');
      setShowNewCollectionForm(false);
    }
  };
  
  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-6">
        <h1>My Collections</h1>
        <Button onClick={() => setShowNewCollectionForm(!showNewCollectionForm)}>
          <Plus className="h-4 w-4 mr-2" />
          New Collection
        </Button>
      </div>
      
      {showNewCollectionForm && (
        <Card className="mb-8">
          <form onSubmit={handleCreateCollection} className="p-4">
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Collection Name
                </label>
                <Input
                  id="name"
                  value={newCollectionName}
                  onChange={(e) => setNewCollectionName(e.target.value)}
                  placeholder="My Awesome Collection"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium mb-1">
                  Description (optional)
                </label>
                <Input
                  id="description"
                  value={newCollectionDescription}
                  onChange={(e) => setNewCollectionDescription(e.target.value)}
                  placeholder="What's this collection about?"
                />
              </div>
              
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setShowNewCollectionForm(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Create</Button>
              </div>
            </div>
          </form>
        </Card>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {collections.map(collection => (
          <CollectionCard key={collection.id} collection={collection} />
        ))}
      </div>
    </div>
  );
};

export default CollectionsPage;
