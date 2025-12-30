'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

// Server Actionsをクライアント側のlocalStorage操作に対応させるため、
// ここではリダイレクト処理のみを行い、実際のデータ操作はクライアント側で実行

export async function createMemoAction(formData: FormData) {
  // フォームデータの検証
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  
  if (!title.trim()) {
    throw new Error('タイトルは必須です');
  }
  
  // クライアント側でメモを作成した後、ホームページにリダイレクト
  revalidatePath('/');
  redirect('/');
}

export async function updateMemoAction(id: string, formData: FormData) {
  // フォームデータの検証
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  
  if (!title.trim()) {
    throw new Error('タイトルは必須です');
  }
  
  // クライアント側でメモを更新した後、ホームページにリダイレクト
  revalidatePath('/');
  revalidatePath(`/edit/${id}`);
  redirect('/');
}

export async function deleteMemoAction(id: string) {
  // クライアント側でメモを削除した後、ホームページにリダイレクト
  revalidatePath('/');
  redirect('/');
}