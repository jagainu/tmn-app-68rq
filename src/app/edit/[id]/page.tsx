'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';
import { getMemo, saveMemo } from '@/lib/memo-storage';
import { Memo } from '@/types/memo';

export default function EditMemoPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  
  const [memo, setMemo] = useState<Memo | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // メモを読み込み
  useEffect(() => {
    if (id) {
      const existingMemo = getMemo(id);
      if (existingMemo) {
        setMemo(existingMemo);
        setTitle(existingMemo.title);
        setContent(existingMemo.content);
      } else {
        // メモが見つからない場合はホームに戻る
        router.push('/');
      }
      setIsLoading(false);
    }
  }, [id, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      alert('タイトルを入力してください');
      return;
    }
    
    if (!memo) return;
    
    setIsSaving(true);
    
    try {
      const updatedMemo: Memo = {
        ...memo,
        title: title.trim(),
        content: content.trim(),
        updatedAt: new Date().toISOString(),
      };
      
      const success = saveMemo(updatedMemo);
      if (success) {
        router.push('/');
      } else {
        alert('メモの保存に失敗しました');
      }
    } catch (error) {
      console.error('Error updating memo:', error);
      alert('メモの更新中にエラーが発生しました');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-muted-foreground">読み込み中...</div>
      </div>
    );
  }

  if (!memo) {
    return (
      <div className="text-center py-12">
        <div className="text-muted-foreground mb-4">
          メモが見つかりません
        </div>
        <Link href="/">
          <Button>ホームに戻る</Button>
        </Link>
      </div>
    );
  }

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
          <h1 className="text-2xl font-bold">メモを編集</h1>
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