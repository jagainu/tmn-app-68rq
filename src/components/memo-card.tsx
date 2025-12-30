'use client'

import { formatDistanceToNow } from '@/lib/utils'
import { Memo } from '@/types/memo'
import { Edit, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'

interface MemoCardProps {
  memo: Memo
  onDelete: (id: string) => void
}

export function MemoCard({ memo, onDelete }: MemoCardProps) {
  const handleDeleteClick = () => {
    if (confirm('このメモを削除しますか？')) {
      onDelete(memo.id)
    }
  }

  const truncateContent = (content: string, maxLength: number = 150) => {
    if (content.length <= maxLength) return content
    return content.substring(0, maxLength) + '...'
  }

  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
      <CardHeader className="flex-none">
        <CardTitle className="line-clamp-2 text-lg">
          {memo.title}
        </CardTitle>
        <CardDescription>
          {formatDistanceToNow(new Date(memo.updatedAt))}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <div className="flex-1">
          {memo.content && (
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">
              {truncateContent(memo.content)}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2 mt-4 pt-4 border-t">
          <Link href={`/edit/${memo.id}`} className="flex-1">
            <Button variant="outline" size="sm" className="w-full flex items-center gap-2">
              <Edit size={16} />
              編集
            </Button>
          </Link>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleDeleteClick}
            className="text-destructive hover:text-destructive-foreground hover:bg-destructive flex items-center gap-2"
          >
            <Trash2 size={16} />
            削除
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}