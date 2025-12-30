'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Save } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { createMemo } from '@/lib/memo-storage'
import Link from 'next/link'

export default function NewMemoPage() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const router = useRouter()

  const handleSave = async () => {
    if (!title.trim() && !content.trim()) {
      alert('タイトルまたは内容を入力してください')
      return
    }

    setIsSaving(true)
    try {
      createMemo({
        title: title.trim() || '無題のメモ',
        content: content.trim()
      })
      router.push('/')
    } catch (error) {
      console.error('Failed to create memo:', error)
      alert('メモの保存に失敗しました')
    } finally {
      setIsSaving(false)
    }
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
          <h1 className="text-2xl font-bold">新しいメモ</h1>
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