'use client'

import { useState, useEffect } from 'react'
import { Plus } from 'lucide-react'
import { Memo } from '@/types/memo'
import { MemoCard } from '@/components/memo-card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const STORAGE_KEY = 'tmn-memos'

export default function HomePage() {
  const [memos, setMemos] = useState<Memo[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // メモをlocalStorageから読み込み
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedMemos = localStorage.getItem(STORAGE_KEY)
      if (savedMemos) {
        try {
          const parsedMemos = JSON.parse(savedMemos) as Memo[]
          // 日付でソート（新しいものから）
          const sortedMemos = parsedMemos.sort((a, b) => 
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
          )
          setMemos(sortedMemos)
        } catch (error) {
          console.error('Failed to parse memos from localStorage:', error)
          setMemos([])
        }
      }
      setIsLoading(false)
    }
  }, [])

  // メモ削除のハンドラ
  const handleDeleteMemo = (id: string) => {
    const updatedMemos = memos.filter(memo => memo.id !== id)
    setMemos(updatedMemos)
    
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedMemos))
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-muted-foreground">読み込み中...</div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* ヘッダー */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">メモ一覧</h2>
          <p className="text-muted-foreground">
            {memos.length}件のメモ
          </p>
        </div>
        <Link href="/new">
          <Button className="flex items-center gap-2">
            <Plus size={20} />
            新しいメモ
          </Button>
        </Link>
      </div>

      {/* メモ一覧 */}
      {memos.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-muted-foreground mb-4">
            まだメモがありません
          </div>
          <Link href="/new">
            <Button>
              最初のメモを作成する
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {memos.map((memo) => (
            <MemoCard
              key={memo.id}
              memo={memo}
              onDelete={handleDeleteMemo}
            />
          ))}
        </div>
      )}
    </div>
  )
}