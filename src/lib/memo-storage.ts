'use client'

import { Memo } from '@/types/memo'
import { generateId } from '@/lib/utils'

const STORAGE_KEY = 'tmn-memos'

export function getMemos(): Memo[] {
  if (typeof window === 'undefined') return []
  
  try {
    const savedMemos = localStorage.getItem(STORAGE_KEY)
    if (!savedMemos) return []
    
    const parsedMemos = JSON.parse(savedMemos) as Memo[]
    return parsedMemos.sort((a, b) => 
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    )
  } catch (error) {
    console.error('Failed to parse memos from localStorage:', error)
    return []
  }
}

export function saveMemos(memos: Memo[]): void {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(memos))
  } catch (error) {
    console.error('Failed to save memos to localStorage:', error)
  }
}

export function createMemo(data: { title: string; content: string }): Memo {
  const id = generateId()
  const now = new Date().toISOString()
  
  const memo: Memo = {
    id,
    title: data.title,
    content: data.content,
    createdAt: now,
    updatedAt: now,
  }

  const memos = getMemos()
  const updatedMemos = [memo, ...memos]
  saveMemos(updatedMemos)
  
  return memo
}

export function updateMemo(id: string, data: { title: string; content: string }): Memo | null {
  const memos = getMemos()
  const memoIndex = memos.findIndex(memo => memo.id === id)
  
  if (memoIndex === -1) {
    console.error('Memo not found')
    return null
  }

  const updatedMemo: Memo = {
    ...memos[memoIndex],
    title: data.title,
    content: data.content,
    updatedAt: new Date().toISOString(),
  }

  memos[memoIndex] = updatedMemo
  saveMemos(memos)
  
  return updatedMemo
}

export function deleteMemo(id: string): boolean {
  const memos = getMemos()
  const filteredMemos = memos.filter(memo => memo.id !== id)
  
  if (filteredMemos.length === memos.length) {
    console.error('Memo not found')
    return false
  }

  saveMemos(filteredMemos)
  return true
}

export function getMemoById(id: string): Memo | null {
  const memos = getMemos()
  return memos.find(memo => memo.id === id) || null
}