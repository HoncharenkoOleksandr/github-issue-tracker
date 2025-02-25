import { create } from 'zustand'

export enum State {
  OPEN = 'open',
  CLOSE = 'close',
}

export interface Issue {
  id: number
  title: string
  number: number
  created_at: string
  comments: number
  assignee?: { login: string } | null
  state: State.OPEN | State.CLOSE
}

export type ColumnType = 'ToDo' | 'InProgress' | 'Done'

interface IssueState {
  issues: Record<ColumnType, Issue[]>
  loading: boolean
  repoInfo: { owner: string; repo: string; stars: number } | null
  fetchIssues: (repoUrl?: string) => Promise<void>
  moveIssue: (fromColumn: ColumnType, issueId: number, toColumn: ColumnType) => void
  reorderIssue: (column: ColumnType, fromIndex: number, toIndex: number) => void
}

const GITHUB_API_URL = 'https://api.github.com/repos'
const LAST_REPO_KEY = 'last_repo_url'

const getStorageKey = (owner: string, repo: string) => `issues-${owner}/${repo}`
const getRepoInfoKey = (owner: string, repo: string) => `repoInfo-${owner}/${repo}`

export const useIssueStore = create<IssueState>((set) => ({
  issues: { ToDo: [], InProgress: [], Done: [] },
  repoInfo: null,
  loading: false,

  fetchIssues: async (repoUrl) => {
    try {
      set({ loading: true })

      if (!repoUrl) {
        const lastRepoUrl = sessionStorage.getItem(LAST_REPO_KEY)
        if (!lastRepoUrl) {
          set({ loading: false })
          return
        }
        repoUrl = lastRepoUrl
      }

      const url = new URL(repoUrl)
      const [, owner, repo] = url.pathname.split('/')
      if (!owner || !repo) throw new Error('Invalid GitHub repository URL')

      const issuesKey = getStorageKey(owner, repo)
      const repoInfoKey = getRepoInfoKey(owner, repo)

      const savedIssues = sessionStorage.getItem(issuesKey)
      const savedRepoInfo = sessionStorage.getItem(repoInfoKey)

      if (savedIssues && savedRepoInfo) {
        set({ issues: JSON.parse(savedIssues), repoInfo: JSON.parse(savedRepoInfo) })
        sessionStorage.setItem(LAST_REPO_KEY, repoUrl)
        return
      }

      const issuesResponse = await fetch(`${GITHUB_API_URL}/${owner}/${repo}/issues?per_page=100`)
      const repoResponse = await fetch(`${GITHUB_API_URL}/${owner}/${repo}`)
      const issuesData = await issuesResponse.json()
      const repoData = await repoResponse.json()

      if (!issuesResponse.ok || !repoResponse.ok) {
        throw new Error(issuesData.message || 'Failed to fetch issues')
      }

      const formattedIssues: Issue[] = issuesData.map((issue: Issue) => ({
        id: issue.id,
        title: issue.title,
        number: issue.number,
        created_at: issue.created_at,
        comments: issue.comments,
        assignee: issue.assignee ? { login: issue.assignee.login } : null,
        state: issue.state,
      }))

      const newState = {
        ToDo: formattedIssues.filter((issue) => !issue.assignee && issue.state === State.OPEN),
        InProgress: formattedIssues.filter((issue) => issue.assignee && issue.state === State.OPEN),
        Done: formattedIssues.filter((issue) => issue.state === State.CLOSE),
      }

      const newRepoInfo = { owner, repo, stars: repoData.stargazers_count }

      set({ issues: newState, repoInfo: newRepoInfo })

      sessionStorage.setItem(issuesKey, JSON.stringify(newState))
      sessionStorage.setItem(repoInfoKey, JSON.stringify(newRepoInfo))
      sessionStorage.setItem(LAST_REPO_KEY, repoUrl)
    } catch (error) {
      console.error('Error fetching issues:', error)
      throw error
    } finally {
      set({ loading: false })
    }
  },

  moveIssue: (fromColumn, issueId, toColumn) =>
    set((state) => {
      const issueToMove = state.issues[fromColumn].find((issue) => issue.id === issueId)
      if (!issueToMove) return state

      const newState = {
        ...state.issues,
        [fromColumn]: state.issues[fromColumn].filter((issue) => issue.id !== issueId),
        [toColumn]: [...state.issues[toColumn], issueToMove],
      }

      if (state.repoInfo) {
        sessionStorage.setItem(
          getStorageKey(state.repoInfo.owner, state.repoInfo.repo),
          JSON.stringify(newState)
        )
      }

      return { issues: newState }
    }),

  reorderIssue: (column, fromIndex, toIndex) =>
    set((state) => {
      const updatedColumn = [...state.issues[column]]
      const [movedIssue] = updatedColumn.splice(fromIndex, 1)
      updatedColumn.splice(toIndex, 0, movedIssue)

      const newState = { ...state.issues, [column]: updatedColumn }

      if (state.repoInfo) {
        sessionStorage.setItem(
          getStorageKey(state.repoInfo.owner, state.repoInfo.repo),
          JSON.stringify(newState)
        )
      }

      return { issues: newState }
    }),
}))

useIssueStore.getState().fetchIssues()
