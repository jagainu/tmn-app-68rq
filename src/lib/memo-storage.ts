import { Memo } from '@/types/memo';

const STORAGE_KEY = 'tmn-memo-storage';

export function getMemos(): Memo[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    
    const memos = JSON.parse(stored) as Memo[];
    // 更新日時でソート（新しい順）
    return memos.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  } catch (error) {
    console.error('Failed to load memos:', error);
    return [];
  }
}

export function saveMemo(memo: Memo): boolean {
  if (typeof window === 'undefined') return false;
  
  try {
    const memos = getMemos();
    const existingIndex = memos.findIndex(m => m.id === memo.id);
    
    if (existingIndex >= 0) {
      // 既存のメモを更新
      memos[existingIndex] = memo;
    } else {
      // 新しいメモを追加
      memos.push(memo);
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(memos));
    return true;
  } catch (error) {
    console.error('Failed to save memo:', error);
    return false;
  }
}

export function deleteMemo(id: string): boolean {
  if (typeof window === 'undefined') return false;
  
  try {
    const memos = getMemos();
    const filteredMemos = memos.filter(m => m.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredMemos));
    return true;
  } catch (error) {
    console.error('Failed to delete memo:', error);
    return false;
  }
}

export function getMemo(id: string): Memo | null {
  const memos = getMemos();
  return memos.find(m => m.id === id) || null;
}