'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Trash2, Edit } from 'lucide-react'
import { Memo } from '@/types/memo'
import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { formatDate } from '@/lib/utils'

interface MemoCardProps {
  memo: Memo
  onDelete: (id: string) => void
}

export function MemoCard({ memo, onDelete }: MemoCardProps) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = () => {
    setIsDeleting(true)
    onDelete(memo.id)
    setIsDeleting(false)
  }

  const truncateContent = (content: string, maxLength: number = 100) => {
    if (content.length <= maxLength) return content
    return content.substring(0, maxLength) + '...'
  }

  return (
    <div className="bg-card text-card-foreground rounded-lg border p-6 space-y-4 hover:shadow-md transition-shadow">
      {/* タイトル */}
      <div className="space-y-1">
        <h3 className="font-semibold text-lg line-clamp-2">
          {memo.title || '無題のメモ'}
        </h3>
        <p className="text-sm text-muted-foreground">
          {formatDate(memo.updatedAt)}
        </p>
      </div>

      {/* 内容プレビュー */}
      <div className="min-h-[60px]">
        <p className="text-muted-foreground text-sm leading-relaxed">
          {truncateContent(memo.content)}
        </p>
      </div>

      {/* タグ */}
      {memo.tags && memo.tags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {memo.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-secondary text-secondary-foreground"
            >
              {tag}
            </span>
          ))}
          {memo.tags.length > 3 && (
            <span className="text-xs text-muted-foreground">
              +{memo.tags.length - 3}
            </span>
          )}
        </div>
      )}

      {/* アクションボタン */}
      <div className="flex items-center justify-between pt-4 border-t">
        <Link href={`/memo/${memo.id}`}>
          <Button variant="ghost" size="sm">
            詳細を見る
          </Button>
        </Link>
        
        <div className="flex items-center gap-1">
          <Link href={`/edit/${memo.id}`}>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Edit size={16} />
            </Button>
          </Link>
          
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 text-destructive hover:text-destructive"
                disabled={isDeleting}
              >
                <Trash2 size={16} />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>メモの削除</AlertDialogTitle>
                <AlertDialogDescription>
                  「{memo.title || '無題のメモ'}」を削除しますか？
                  この操作は取り消せません。
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>キャンセル</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>
                  削除する
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  )
}
