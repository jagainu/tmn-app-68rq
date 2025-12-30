'use client';

import { Memo } from '@/types/memo';
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';

interface MemoCardProps {
  memo: Memo;
  onDelete: (id: string) => void;
}

export function MemoCard({ memo, onDelete }: MemoCardProps) {
  const handleDelete = () => {
    if (window.confirm('このメモを削除してもよろしいですか？')) {
      onDelete(memo.id);
    }
  };

  return (
    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-semibold text-lg line-clamp-2">
          {memo.title || '無題のメモ'}
        </h3>
        <div className="flex gap-2 ml-2">
          <Link href={`/edit/${memo.id}`}>
            <Button variant="outline" size="icon" className="h-8 w-8">
              <Edit size={16} />
            </Button>
          </Link>
          <Button 
            variant="outline" 
            size="icon" 
            className="h-8 w-8 text-destructive hover:bg-destructive hover:text-destructive-foreground"
            onClick={handleDelete}
          >
            <Trash2 size={16} />
          </Button>
        </div>
      </div>
      
      <p className="text-muted-foreground text-sm line-clamp-3 mb-3">
        {memo.content || 'メモの内容がありません'}
      </p>
      
      <div className="text-xs text-muted-foreground">
        <div>作成: {formatDate(memo.createdAt)}</div>
        {memo.updatedAt !== memo.createdAt && (
          <div>更新: {formatDate(memo.updatedAt)}</div>
        )}
      </div>
    </div>
  );
}