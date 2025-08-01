const API_BASE_URL = 'https://62c96230d9ead251e8baf02e.mockapi.io/campus'

const parseResponse = async (res: Response) => {
  if (!res.ok) {
    throw new Error(`Errore API: ${res.statusText}`)
  }
  return res.json()
}

export const Api = {
  // USERS

  getUsers: async () => {
    const res = await fetch(`${API_BASE_URL}/users`)
    return parseResponse(res)
  },

  createUser: async (user: { name: string }) => {
    const res = await fetch(`${API_BASE_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    })
    return parseResponse(res)
  },

  updateUser: async (id: string, user: { name: string }) => {
    const res = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    })
    return parseResponse(res)
  },

  deleteUser: async (id: string) => {
    const res = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'DELETE',
    })
    return parseResponse(res)
  },

  // ARTICLES (Books)

  getArticles: async ({ page = 1, limit = 10 }: { page?: number; limit?: number }) => {
  const res = await fetch(
    `${API_BASE_URL}/articles?page=${page}&limit=${limit}`
  );
  return res.json();
},

  createArticle: async (article: { title: string; sellerId: string }) => {
    const res = await fetch(`${API_BASE_URL}/articles`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(article),
    })
    return parseResponse(res)
  },

  updateArticle: async (id: string, article: { title: string }) => {
    const res = await fetch(`${API_BASE_URL}/articles/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(article),
    })
    return parseResponse(res)
  },

  deleteArticle: async (id: string) => {
    const res = await fetch(`${API_BASE_URL}/articles/${id}`, {
      method: 'DELETE',
    })
    return parseResponse(res)
  },
}

// import { useQuery } from '@tanstack/react-query'
// import { Api } from '@/lib/api'

// const { data: users, isLoading } = useQuery({
//   queryKey: ['users'],
//   queryFn: Api.getUsers,
// })