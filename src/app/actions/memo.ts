'use server';

import { kv } from '@vercel/kv';
import { revalidatePath } from 'next/cache';
import { Memo } from '@/types/memo';
import { generateId } from '@/lib/utils';

export async function createMemo(data: { title: string; content: string }) {
  const id = generateId();
  const now = new Date().toISOString();
  
  const memo: Memo = {
    id,
    title: data.title,
    content: data.content,
    createdAt: now,
    updatedAt: now,
  };

  try {
    // メモを保存
    await kv.set(`memo:${id}`, memo);
    // 一覧用のソート済みセットに追加（作成日時をスコアに使用）
    await kv.zadd('memos', { score: Date.now(), member: { memo } });
    
    revalidatePath('/');
    return memo;
  } catch (error) {
    console.error('Failed to create memo:', error);
    throw new Error('Failed to create memo');
  }
}

export async function updateMemo(id: string, data: { title: string; content: string }) {
  try {
    // 既存のメモを取得
    const existingMemo = await kv.get<Memo>(`memo:${id}`);
    if (!existingMemo) {
      throw new Error('Memo not found');
    }

    const updatedMemo: Memo = {
      ...existingMemo,
      title: data.title,
      content: data.content,
      updatedAt: new Date().toISOString(),
    };

    // メモを更新
    await kv.set(`memo:${id}`, updatedMemo);
    // 一覧用のソート済みセットも更新（更新日時をスコアに使用）
    await kv.zadd('memos', { score: Date.now(), member: { memo: updatedMemo } });
    
    revalidatePath('/');
    revalidatePath(`/edit/${id}`);
    return updatedMemo;
  } catch (error) {
    console.error('Failed to update memo:', error);
    throw new Error('Failed to update memo');
  }
}

export async function deleteMemo(id: string) {
  try {
    // 既存のメモを取得
    const existingMemo = await kv.get<Memo>(`memo:${id}`);
    if (!existingMemo) {
      throw new Error('Memo not found');
    }

    // メモを削除
    await kv.del(`memo:${id}`);
    // 一覧用のソート済みセットからも削除
    await kv.zrem('memos', { memo: existingMemo });
    
    revalidatePath('/');
  } catch (error) {
    console.error('Failed to delete memo:', error);
    throw new Error('Failed to delete memo');
  }
}

export async function getMemos(): Promise<Memo[]> {
  try {
    const memos = await kv.zrange('memos', 0, -1, { rev: true, withScores: true });
    return (memos as any[]).map(item => item.memo).filter(Boolean);
  } catch (error) {
    console.error('Failed to fetch memos:', error);
    return [];
  }
}