
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { BookmarkIcon, MessageSquare } from 'lucide-react';

const ThreadCard = ({ thread }) => {
  const [bookmarked, setBookmarked] = useState(false);
  
  const handleBookmark = (e) => {
    e.preventDefault();
    setBookmarked(!bookmarked);
  };
  
  // Get the total number of reactions
  const totalReactions = Object.values(thread.reactions).reduce((a, b) => a + b, 0);
  
  return (
    <Link to={`/thread/${thread.id}`}>
      <Card className="h-full transition-shadow hover:shadow-md">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-3 mb-2">
            <img
              src={thread.author.avatar}
              alt={thread.author.name}
              className="rounded-full h-8 w-8"
            />
            <span className="text-sm font-medium">{thread.author.name}</span>
          </div>
          <h3 className="text-xl font-bold line-clamp-2">{thread.title}</h3>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="space-y-2">
            {thread.segments.slice(0, 2).map((segment, index) => (
              <p key={segment.id} className={`text-muted-foreground ${index > 0 ? "line-clamp-2" : ""}`}>
                {segment.content}
              </p>
            ))}
          </div>
          <div className="flex flex-wrap gap-1.5 mt-3">
            {thread.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="pt-2">
          <div className="flex items-center justify-between w-full text-sm text-muted-foreground">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <MessageSquare className="h-4 w-4" />
                {thread.segments.length}
              </span>
              <span>{totalReactions} reactions</span>
            </div>
            <Button
              variant={bookmarked ? "secondary" : "ghost"}
              size="sm"
              className="gap-1"
              onClick={handleBookmark}
            >
              <BookmarkIcon className={`h-4 w-4 ${bookmarked ? "fill-current" : ""}`} />
              {thread.bookmarks}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ThreadCard;
