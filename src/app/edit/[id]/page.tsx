'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Save } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Memo } from '@/types/memo'
import Link from 'next/link'

const STORAGE_KEY = 'tmn-memos'

interface EditMemoPageProps {
  params: {
    id: string
  }
}

export default function EditMemoPage({ params }: EditMemoPageProps) {
  const [memo, setMemo] = useState<Memo | null>(null)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isInitialLoading, setIsInitialLoading] = useState(true)
  const router = useRouter()

  // メモを読み込み
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedMemos = localStorage.getItem(STORAGE_KEY)
      if (savedMemos) {
        try {
          const memos: Memo[] = JSON.parse(savedMemos)
          const foundMemo = memos.find(m => m.id === params.id)
          if (foundMemo) {
            setMemo(foundMemo)
            setTitle(foundMemo.title)
            setContent(foundMemo.content)
          }
        } catch (error) {
          console.error('Failed to load memo:', error)
        }
      }
      setIsInitialLoading(false)
    }
  }, [params.id])

  const handleSave = async () => {
    if (!title.trim()) {
      alert('タイトルを入力してください')
      return
    }

    if (!memo) {
      alert('メモが見つかりません')
      return
    }

    setIsLoading(true)

    try {
      // 既存のメモを取得
      let existingMemos: Memo[] = []
      if (typeof window !== 'undefined') {
        const savedMemos = localStorage.getItem(STORAGE_KEY)
        if (savedMemos) {
          existingMemos = JSON.parse(savedMemos)
        }
      }

      // メモを更新
      const updatedMemo: Memo = {
        ...memo,
        title: title.trim(),
        content: content.trim(),
        updatedAt: new Date().toISOString(),
      }

      const updatedMemos = existingMemos.map(m => 
        m.id === memo.id ? updatedMemo : m
      )
      
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedMemos))
      }

      router.push('/')
    } catch (error) {
      console.error('Failed to update memo:', error)
      alert('メモの更新に失敗しました')
    } finally {
      setIsLoading(false)
    }
  }

  if (isInitialLoading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-muted-foreground">読み込み中...</div>
      </div>
    )
  }

  if (!memo) {
    return (
      <div className="text-center py-12">
        <div className="text-muted-foreground mb-4">
          メモが見つかりません
        </div>
        <Link href="/">
          <Button>
            ホームに戻る
          </Button>
        </Link>
      </div>
    )
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
          <h2 className="text-3xl font-bold tracking-tight">メモを編集</h2>
        </div>
        <Button 
          onClick={handleSave} 
          disabled={isLoading || !title.trim()}
          className="flex items-center gap-2"
        >
          <Save size={20} />
          {isLoading ? '更新中...' : '更新'}
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