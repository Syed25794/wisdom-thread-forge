
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Lock, Plus, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getUserCollections, createCollection, Collection } from '@/services/collectionService';

const CollectionCard = ({ collection }: { collection: Collection }) => {
  return (
    <Link to={`/collections/${collection.id}`}>
      <Card className="h-full transition-shadow hover:shadow-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold">{collection.name}</h3>
            {collection.is_private && <Lock className="h-4 w-4 text-muted-foreground" />}
          </div>
        </CardHeader>
        <CardContent className="pb-4">
          <p className="text-muted-foreground mb-2">{collection.description}</p>
        </CardContent>
        <CardFooter className="pt-0">
          <p className="text-sm text-muted-foreground">
            Created {new Date(collection.created_at).toLocaleDateString()}
          </p>
        </CardFooter>
      </Card>
    </Link>
  );
};

const CollectionsPage = () => {
  const [showNewCollectionForm, setShowNewCollectionForm] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState('');
  const [newCollectionDescription, setNewCollectionDescription] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  
  const queryClient = useQueryClient();
  
  const { data: collections = [], isLoading, error } = useQuery({
    queryKey: ['collections'],
    queryFn: getUserCollections
  });

  const createCollectionMutation = useMutation({
    mutationFn: createCollection,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['collections'] });
      setNewCollectionName('');
      setNewCollectionDescription('');
      setIsPrivate(false);
      setShowNewCollectionForm(false);
      toast.success('Collection created successfully!');
    },
    onError: (error) => {
      toast.error(`Failed to create collection: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  });
  
  const handleCreateCollection = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newCollectionName.trim()) {
      createCollectionMutation.mutate({
        name: newCollectionName,
        description: newCollectionDescription,
        is_private: isPrivate
      });
    }
  };

  if (error) {
    return (
      <div className="container py-8">
        <div className="text-center p-6">
          <p className="text-red-500">Error loading collections: {error instanceof Error ? error.message : 'Unknown error'}</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">My Collections</h1>
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
                <Label htmlFor="name" className="block font-medium mb-1">
                  Collection Name
                </Label>
                <Input
                  id="name"
                  value={newCollectionName}
                  onChange={(e) => setNewCollectionName(e.target.value)}
                  placeholder="My Awesome Collection"
                  required
                  disabled={createCollectionMutation.isPending}
                />
              </div>
              
              <div>
                <Label htmlFor="description" className="block font-medium mb-1">
                  Description (optional)
                </Label>
                <Textarea
                  id="description"
                  value={newCollectionDescription}
                  onChange={(e) => setNewCollectionDescription(e.target.value)}
                  placeholder="What's this collection about?"
                  rows={3}
                  disabled={createCollectionMutation.isPending}
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch 
                  id="privacy" 
                  checked={isPrivate} 
                  onCheckedChange={setIsPrivate}
                  disabled={createCollectionMutation.isPending}
                />
                <Label htmlFor="privacy">Private Collection</Label>
              </div>
              
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setShowNewCollectionForm(false)}
                  disabled={createCollectionMutation.isPending}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  disabled={createCollectionMutation.isPending}
                >
                  {createCollectionMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : 'Create'}
                </Button>
              </div>
            </div>
          </form>
        </Card>
      )}
      
      {isLoading ? (
        <div className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : collections.length === 0 ? (
        <div className="text-center p-6">
          <p className="text-muted-foreground">You don't have any collections yet. Create one to get started!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.map((collection) => (
            <CollectionCard key={collection.id} collection={collection} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CollectionsPage;
