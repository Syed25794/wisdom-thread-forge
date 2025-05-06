
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, Save, Send } from 'lucide-react';

const ThreadEditor = () => {
  const [title, setTitle] = useState('');
  const [segments, setSegments] = useState([{ id: '1', content: '' }]);
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState([]);
  
  const addSegment = () => {
    const newSegment = {
      id: Date.now().toString(),
      content: ''
    };
    setSegments([...segments, newSegment]);
  };
  
  const updateSegment = (id, content) => {
    setSegments(
      segments.map(segment => 
        segment.id === id ? { ...segment, content } : segment
      )
    );
  };
  
  const removeSegment = (id) => {
    if (segments.length > 1) {
      setSegments(segments.filter(segment => segment.id !== id));
    }
  };
  
  const handleAddTag = (e) => {
    e.preventDefault();
    if (tagInput && !tags.includes(tagInput) && tags.length < 5) {
      setTags([...tags, tagInput]);
      setTagInput('');
    }
  };
  
  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };
  
  const handleSaveDraft = () => {
    // In a real app, this would save to a database
    alert('Thread saved as draft');
  };
  
  const handlePublish = () => {
    // In a real app, this would publish the thread
    alert('Thread published!');
  };
  
  return (
    <div className="container max-w-3xl py-8">
      <h1 className="mb-6">Create a Wisdom Thread</h1>
      
      <div className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-2">
            Title
          </label>
          <Input
            id="title"
            placeholder="Enter a title for your thread"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        
        <div>
          <h2 className="text-lg font-medium mb-3">Thread Segments</h2>
          
          {segments.map((segment, index) => (
            <Card key={segment.id} className="mb-4 p-4">
              <div className="flex items-start gap-2">
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1">
                    Segment {index + 1}
                  </label>
                  <Textarea
                    placeholder="Write your thoughts..."
                    value={segment.content}
                    onChange={(e) => updateSegment(segment.id, e.target.value)}
                    rows={3}
                    className="mb-0"
                  />
                </div>
                
                {segments.length > 1 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeSegment(segment.id)}
                    className="mt-6"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </Card>
          ))}
          
          <Button onClick={addSegment} variant="outline" className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Segment
          </Button>
        </div>
        
        <div>
          <h2 className="text-lg font-medium mb-2">Tags</h2>
          <p className="text-sm text-muted-foreground mb-3">
            Add up to 5 tags to help others find your thread
          </p>
          
          <form onSubmit={handleAddTag} className="flex gap-2 mb-3">
            <Input
              placeholder="Add a tag"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              className="flex-1"
            />
            <Button type="submit">Add</Button>
          </form>
          
          <div className="flex flex-wrap gap-2">
            {tags.map(tag => (
              <Badge key={tag} variant="secondary" className="pl-3 pr-2 py-1.5">
                {tag}
                <button
                  onClick={() => removeTag(tag)}
                  className="ml-1 hover:text-destructive"
                >
                  ×
                </button>
              </Badge>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end gap-3 pt-4">
          <Button variant="outline" onClick={handleSaveDraft}>
            <Save className="h-4 w-4 mr-2" />
            Save Draft
          </Button>
          <Button onClick={handlePublish}>
            <Send className="h-4 w-4 mr-2" />
            Publish
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ThreadEditor;
