
import { useParams } from 'react-router-dom';
import ThreadDetail from '@/components/ThreadDetail';
import { mockThreads } from '@/data/mockData';

const ThreadPage = () => {
  const { threadId } = useParams();
  
  // In a real app, we would fetch the thread from an API
  const thread = mockThreads.find(t => t.id === threadId);
  
  if (!thread) {
    return (
      <div className="container py-16 text-center">
        <h1 className="mb-4">Thread Not Found</h1>
        <p className="text-muted-foreground">
          The thread you're looking for doesn't exist or has been removed.
        </p>
      </div>
    );
  }
  
  return <ThreadDetail thread={thread} />;
};

export default ThreadPage;
