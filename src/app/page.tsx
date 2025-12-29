import { kv } from '@vercel/kv';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, Edit3, Trash2 } from 'lucide-react';
import { Memo } from '@/types/memo';
import { DeleteMemoButton } from '@/components/delete-memo-button';

interface MemoWithScore {
  score: number;
  memo: Memo;
}

async function getMemos(): Promise<Memo[]> {
  try {
    const memos = await kv.zrange('memos', 0, -1, { rev: true, withScores: true }) as MemoWithScore[];
    return memos.map(item => item.memo).filter(Boolean);
  } catch (error) {
    console.error('Failed to fetch memos:', error);
    return [];
  }
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

export default async function HomePage() {
  const memos = await getMemos();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-900">メモ一覧</h2>
        <Link href="/new">
          <Button className="flex items-center gap-2">
            <PlusCircle className="w-4 h-4" />
            新しいメモ
          </Button>
        </Link>
      </div>

      {memos.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <PlusCircle className="w-16 h-16 mx-auto mb-4" />
          </div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">メモがありません</h3>
          <p className="text-gray-500 mb-6">最初のメモを作成してみましょう</p>
          <Link href="/new">
            <Button className="flex items-center gap-2">
              <PlusCircle className="w-4 h-4" />
              新しいメモを作成
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {memos.map((memo) => (
            <Card key={memo.id} className="hover:shadow-md transition-shadow duration-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg line-clamp-2">
                  {memo.title || '無題のメモ'}
                </CardTitle>
                <div className="text-sm text-gray-500">
                  更新: {formatDate(memo.updatedAt)}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 line-clamp-3 min-h-[4.5rem]">
                  {memo.content || 'メモの内容がありません'}
                </p>
                <div className="flex justify-end gap-2">
                  <Link href={`/edit/${memo.id}`}>
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <Edit3 className="w-3 h-3" />
                      編集
                    </Button>
                  </Link>
                  <DeleteMemoButton memoId={memo.id} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}