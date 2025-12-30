'use client'

import { Memo } from '@/types/memo'
import { formatDate } from '@/lib/utils'
import { Edit, Trash2 } from 'lucide-react'
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
import Link from 'next/link'

interface MemoCardProps {
  memo: Memo
  onDelete: (id: string) => void
}

export function MemoCard({ memo, onDelete }: MemoCardProps) {
  const handleDelete = () => {
    onDelete(memo.id)
  }

  return (
    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
      {/* ヘッダー */}
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-semibold text-lg line-clamp-2">
          {memo.title}
        </h3>
        <div className="flex items-center gap-1 ml-2">
          <Link href={`/edit/${memo.id}`}>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Edit size={16} />
            </Button>
          </Link>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                <Trash2 size={16} />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>メモを削除しますか？</AlertDialogTitle>
                <AlertDialogDescription>
                  この操作は取り消すことができません。メモは完全に削除されます。
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>キャンセル</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                  削除する
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      {/* コンテンツプレビュー */}
      <div className="text-muted-foreground text-sm mb-3 line-clamp-3">
        {memo.content || 'コンテンツなし'}
      </div>

      {/* フッター */}
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>作成: {formatDate(memo.createdAt)}</span>
        {memo.updatedAt !== memo.createdAt && (
          <span>更新: {formatDate(memo.updatedAt)}</span>
        )}
      </div>
    </div>
  )
}
