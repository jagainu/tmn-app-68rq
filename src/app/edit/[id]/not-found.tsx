import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FileQuestion, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="text-center py-12">
      <div className="text-gray-400 mb-4">
        <FileQuestion className="w-16 h-16 mx-auto mb-4" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">メモが見つかりません</h2>
      <p className="text-gray-500 mb-6">
        指定されたメモは存在しないか、削除されている可能性があります。
      </p>
      <Link href="/">
        <Button className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          メモ一覧に戻る
        </Button>
      </Link>
    </div>
  );
}