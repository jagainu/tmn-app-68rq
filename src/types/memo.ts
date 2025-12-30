export interface Memo {
  id: string
  title: string
  content: string
  createdAt: string
  updatedAt: string
  tags?: string[]
}

export interface CreateMemoData {
  title: string
  content: string
  tags?: string[]
}

export interface UpdateMemoData {
  title?: string
  content?: string
  tags?: string[]
}
