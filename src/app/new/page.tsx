'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';
import { saveMemo } from '@/lib/memo-storage';
import { generateId } from '@/lib/utils';
import { Memo } from '@/types/memo';

export default function NewMemoPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      alert('タイトルを入力してください');
      return;
    }
    
    setIsSaving(true);
    
    try {
      const now = new Date().toISOString();
      const newMemo: Memo = {
        id: generateId(),
        title: title.trim(),
        content: content.trim(),
        createdAt: now,
        updatedAt: now,
      };
      
      const success = saveMemo(newMemo);
      if (success) {
        router.push('/');
      } else {
        alert('メモの保存に失敗しました');
      }
    } catch (error) {
      console.error('Error saving memo:', error);
      alert('メモの保存中にエラーが発生しました');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="outline" size="icon">
              <ArrowLeft size={20} />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">新しいメモ</h1>
        </div>
        <Button 
          onClick={handleSubmit} 
          disabled={isSaving || !title.trim()}
          className="flex items-center gap-2"
        >
          <Save size={20} />
          {isSaving ? '保存中...' : '保存'}
        </Button>
      </div>

      {/* フォーム */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="メモのタイトルを入力..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full text-2xl font-bold border-none outline-none bg-transparent placeholder:text-muted-foreground"
            autoFocus
          />
        </div>
        
        <div className="border-t pt-4">
          <textarea
            placeholder="メモの内容を入力..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full min-h-96 border-none outline-none bg-transparent placeholder:text-muted-foreground resize-none"
          />
        </div>
      </form>
    </div>
  );
}