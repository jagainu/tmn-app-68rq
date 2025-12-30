'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { ArrowLeft, Save } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getMemoById, updateMemo } from '@/lib/memo-storage'
import { Memo } from '@/types/memo'
import Link from 'next/link'

export default function EditMemoPage() {
  const [memo, setMemo] = useState<Memo | null>(null)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  useEffect(() => {
    if (id) {
      const foundMemo = getMemoById(id)
      if (foundMemo) {
        setMemo(foundMemo)
        setTitle(foundMemo.title)
        setContent(foundMemo.content)
      } else {
        alert('メモが見つかりません')
        router.push('/')
      }
      setIsLoading(false)
    }
  }, [id, router])

  const handleSave = async () => {
    if (!title.trim() && !content.trim()) {
      alert('タイトルまたは内容を入力してください')
      return
    }

    setIsSaving(true)
    try {
      const updatedMemo = updateMemo(id, {
        title: title.trim() || '無題のメモ',
        content: content.trim()
      })
      
      if (updatedMemo) {
        router.push('/')
      } else {
        alert('メモの更新に失敗しました')
      }
    } catch (error) {
      console.error('Failed to update memo:', error)
      alert('メモの更新に失敗しました')
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
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
          <Button>ホームに戻る</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft size={20} />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">メモを編集</h1>
        </div>
        <Button 
          onClick={handleSave} 
          disabled={isSaving}
          className="flex items-center gap-2"
        >
          <Save size={16} />
          {isSaving ? '保存中...' : '保存'}
        </Button>
      </div>

      {/* メモフォーム */}
      <div className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="メモのタイトル"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 text-lg font-semibold bg-transparent border-none outline-none placeholder:text-muted-foreground"
          />
        </div>
        <div>
          <textarea
            placeholder="メモの内容を入力してください..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-96 p-3 bg-transparent border-none outline-none resize-none placeholder:text-muted-foreground"
          />
        </div>
      </div>
    </div>
  )
}