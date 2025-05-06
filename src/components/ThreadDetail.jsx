
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookmarkIcon, MessageSquare, Share } from 'lucide-react';

const Reaction = ({ emoji, count, isSelected, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`reaction-button ${isSelected ? 'bg-secondary' : ''}`}
    >
      <span>{emoji}</span>
      <span>{count}</span>
    </button>
  );
};

const ThreadDetail = ({ thread }) => {
  const [selectedReaction, setSelectedReaction] = useState(null);
  const [bookmarked, setBookmarked] = useState(false);
  const [reactions, setReactions] = useState(thread.reactions);
  
  const handleReaction = (emoji) => {
    if (selectedReaction === emoji) {
      // Remove reaction
      setReactions({
        ...reactions,
        [emoji]: reactions[emoji] - 1
      });
      setSelectedReaction(null);
    } else {
      // If there was a previous reaction, decrease its count
      if (selectedReaction) {
        setReactions({
          ...reactions,
          [selectedReaction]: reactions[selectedReaction] - 1,
          [emoji]: reactions[emoji] + 1
        });
      } else {
        // Just add the new reaction
        setReactions({
          ...reactions,
          [emoji]: reactions[emoji] + 1
        });
      }
      setSelectedReaction(emoji);
    }
  };
  
  const handleBookmark = () => {
    setBookmarked(!bookmarked);
  };
  
  const handleShare = () => {
    // In a real app, we would implement sharing functionality
    alert('Sharing functionality would be implemented here');
  };
  
  return (
    <div className="container max-w-3xl py-8">
      <div className="mb-6">
        <h1 className="mb-4">{thread.title}</h1>
        
        <div className="flex items-center gap-3 mb-4">
          <img
            src={thread.author.avatar}
            alt={thread.author.name}
            className="rounded-full h-10 w-10"
          />
          <div>
            <div className="font-medium">{thread.author.name}</div>
            <div className="text-sm text-muted-foreground">
              {new Date(thread.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {thread.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
      
      <div className="space-y-1">
        {thread.segments.map((segment) => (
          <div key={segment.id} className="thread-segment">
            <p>{segment.content}</p>
          </div>
        ))}
      </div>
      
      <Card className="mt-8 p-4">
        <div>
          <div className="mb-4">
            <h3 className="text-sm font-medium mb-2">What do you think?</h3>
            <div className="flex flex-wrap gap-2">
              {Object.entries(reactions).map(([emoji, count]) => (
                <Reaction
                  key={emoji}
                  emoji={emoji}
                  count={count}
                  isSelected={selectedReaction === emoji}
                  onClick={() => handleReaction(emoji)}
                />
              ))}
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button
              variant={bookmarked ? "secondary" : "outline"}
              size="sm"
              className="gap-1.5"
              onClick={handleBookmark}
            >
              <BookmarkIcon className={`h-4 w-4 ${bookmarked ? "fill-current" : ""}`} />
              {bookmarked ? "Bookmarked" : "Bookmark"}
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5"
              onClick={handleShare}
            >
              <Share className="h-4 w-4" />
              Share
            </Button>
            
            <Button variant="outline" size="sm" className="gap-1.5">
              <MessageSquare className="h-4 w-4" />
              Remix
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ThreadDetail;
