'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Save } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Memo } from '@/types/memo'
import Link from 'next/link'

const STORAGE_KEY = 'tmn-memos'

export default function NewMemoPage() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSave = async () => {
    if (!title.trim()) {
      alert('タイトルを入力してください')
      return
    }

    setIsLoading(true)

    try {
      const now = new Date().toISOString()
      const newMemo: Memo = {
        id: crypto.randomUUID(),
        title: title.trim(),
        content: content.trim(),
        createdAt: now,
        updatedAt: now,
      }

      // 既存のメモを取得
      let existingMemos: Memo[] = []
      if (typeof window !== 'undefined') {
        const savedMemos = localStorage.getItem(STORAGE_KEY)
        if (savedMemos) {
          existingMemos = JSON.parse(savedMemos)
        }
      }

      // 新しいメモを追加
      const updatedMemos = [newMemo, ...existingMemos]
      
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedMemos))
      }

      router.push('/')
    } catch (error) {
      console.error('Failed to save memo:', error)
      alert('メモの保存に失敗しました')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* ヘッダー */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft size={20} />
            </Button>
          </Link>
          <h2 className="text-3xl font-bold tracking-tight">新しいメモ</h2>
        </div>
        <Button 
          onClick={handleSave} 
          disabled={isLoading || !title.trim()}
          className="flex items-center gap-2"
        >
          <Save size={20} />
          {isLoading ? '保存中...' : '保存'}
        </Button>
      </div>

      {/* フォーム */}
      <div className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="title" className="text-sm font-medium">
            タイトル *
          </label>
          <Input
            id="title"
            type="text"
            placeholder="メモのタイトルを入力してください"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-lg"
            autoFocus
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="content" className="text-sm font-medium">
            内容
          </label>
          <Textarea
            id="content"
            placeholder="メモの内容を入力してください"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={15}
            className="resize-none"
          />
        </div>
      </div>
    </div>
  )
}