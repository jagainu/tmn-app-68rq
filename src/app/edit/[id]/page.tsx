import { kv } from '@vercel/kv';
import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Memo } from '@/types/memo';
import { updateMemo } from '@/app/actions/memo';

interface EditMemoPageProps {
  params: {
    id: string;
  };
}

async function getMemo(id: string): Promise<Memo | null> {
  try {
    const memo = await kv.get<Memo>(`memo:${id}`);
    return memo;
  } catch (error) {
    console.error('Failed to fetch memo:', error);
    return null;
  }
}

export default async function EditMemoPage({ params }: EditMemoPageProps) {
  const memo = await getMemo(params.id);

  if (!memo) {
    notFound();
  }

  async function handleUpdateMemo(formData: FormData) {
    'use server';
    
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;

    try {
      await updateMemo(params.id, { 
        title: title.trim(), 
        content: content.trim() 
      });
      redirect('/');
    } catch (error) {
      console.error('Failed to update memo:', error);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            戻る
          </Button>
        </Link>
        <h2 className="text-3xl font-bold text-gray-900">メモを編集</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>メモを編集</CardTitle>
          <p className="text-sm text-gray-500">
            作成: {new Date(memo.createdAt).toLocaleDateString('ja-JP', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
        </CardHeader>
        <CardContent>
          <form action={handleUpdateMemo} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">タイトル</Label>
              <Input
                id="title"
                name="title"
                defaultValue={memo.title}
                placeholder="メモのタイトルを入力してください"
                className="text-lg"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="content">内容</Label>
              <Textarea
                id="content"
                name="content"
                defaultValue={memo.content}
                placeholder="メモの内容を入力してください"
                rows={12}
                className="resize-none"
              />
            </div>
            
            <div className="flex justify-end gap-3">
              <Link href="/">
                <Button type="button" variant="outline">
                  キャンセル
                </Button>
              </Link>
              <Button type="submit" className="flex items-center gap-2">
                <Save className="w-4 h-4" />
                更新
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}