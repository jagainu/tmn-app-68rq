import { Memo, CreateMemoData, UpdateMemoData } from '@/types/memo'
import { generateId } from '@/lib/utils'

const STORAGE_KEY = 'tmn-memo-data'

export function getMemos(): Memo[] {
  if (typeof window === 'undefined') return []
  
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    if (!data) return []
    
    const memos = JSON.parse(data)
    return Array.isArray(memos) ? memos : []
  } catch (error) {
    console.error('Failed to load memos:', error)
    return []
  }
}

export function saveMemos(memos: Memo[]): boolean {
  if (typeof window === 'undefined') return false
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(memos))
    return true
  } catch (error) {
    console.error('Failed to save memos:', error)
    return false
  }
}

export function getMemo(id: string): Memo | null {
  const memos = getMemos()
  return memos.find(memo => memo.id === id) || null
}

export function saveMemo(memo: Memo): boolean {
  if (typeof window === 'undefined') return false
  
  try {
    const memos = getMemos()
    const existingIndex = memos.findIndex(m => m.id === memo.id)
    
    if (existingIndex >= 0) {
      // 既存のメモを更新
      memos[existingIndex] = memo
    } else {
      // 新しいメモを先頭に追加
      memos.unshift(memo)
    }
    
    return saveMemos(memos)
  } catch (error) {
    console.error('Failed to save memo:', error)
    return false
  }
}

export function createMemo(data: CreateMemoData): Memo {
  const now = new Date().toISOString()
  const memo: Memo = {
    id: generateId(),
    title: data.title,
    content: data.content,
    tags: data.tags || [],
    createdAt: now,
    updatedAt: now
  }
  
  const memos = getMemos()
  memos.unshift(memo) // 新しいメモを先頭に追加
  saveMemos(memos)
  
  return memo
}

export function updateMemo(id: string, data: UpdateMemoData): boolean {
  const memos = getMemos()
  const index = memos.findIndex(memo => memo.id === id)
  
  if (index === -1) return false
  
  memos[index] = {
    ...memos[index],
    ...data,
    updatedAt: new Date().toISOString()
  }
  
  return saveMemos(memos)
}

export function deleteMemo(id: string): boolean {
  const memos = getMemos()
  const filteredMemos = memos.filter(memo => memo.id !== id)
  
  if (filteredMemos.length === memos.length) return false // メモが見つからない
  
  return saveMemos(filteredMemos)
}
