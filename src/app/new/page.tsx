import { redirect } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { createMemo } from '@/app/actions/memo';

export default function NewMemoPage() {
  async function handleCreateMemo(formData: FormData) {
    'use server';
    
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;

    if (!title.trim() && !content.trim()) {
      return;
    }

    try {
      await createMemo({ title: title.trim(), content: content.trim() });
      redirect('/');
    } catch (error) {
      console.error('Failed to create memo:', error);
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
        <h2 className="text-3xl font-bold text-gray-900">新しいメモ</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>メモを作成</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={handleCreateMemo} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">タイトル</Label>
              <Input
                id="title"
                name="title"
                placeholder="メモのタイトルを入力してください"
                className="text-lg"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="content">内容</Label>
              <Textarea
                id="content"
                name="content"
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
                保存
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}