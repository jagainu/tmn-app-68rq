'use client'

import React from 'react'
import Link from 'next/link'
import { Trash2, Edit, Calendar } from 'lucide-react'
import { Memo } from '@/types/memo'
import { Button } from '@/components/ui/button'
import { formatDate } from '@/lib/utils'

interface MemoCardProps {
  memo: Memo
  onDelete: (id: string) => void
}

export function MemoCard({ memo, onDelete }: MemoCardProps) {
  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault()
    if (window.confirm('このメモを削除しますか？')) {
      onDelete(memo.id)
    }
  }

  // コンテンツのプレビュー（最初の100文字）
  const contentPreview = memo.content.length > 100 
    ? memo.content.substring(0, 100) + '...' 
    : memo.content

  return (
    <div className="bg-card text-card-foreground rounded-lg border shadow-sm hover:shadow-md transition-shadow">
      <div className="p-6">
        <div className="flex items-start justify-between gap-4 mb-3">
          <h3 className="font-semibold text-lg leading-tight line-clamp-2">
            {memo.title || '無題のメモ'}
          </h3>
          <div className="flex gap-1 flex-shrink-0">
            <Link href={`/edit/${memo.id}`}>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Edit size={16} />
              </Button>
            </Link>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive"
              onClick={handleDelete}
            >
              <Trash2 size={16} />
            </Button>
          </div>
        </div>
        
        {memo.content && (
          <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
            {contentPreview}
          </p>
        )}
        
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Calendar size={12} />
          <span>更新: {formatDate(memo.updatedAt)}</span>
        </div>
      </div>
    </div>
  )
}