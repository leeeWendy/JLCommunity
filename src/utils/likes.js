const STORAGE_KEY = 'jlcommunity_likes'

export const getLikesData = () => {
  const data = localStorage.getItem(STORAGE_KEY)
  return data ? JSON.parse(data) : { likes: {}, likedItems: [] }
}

export const saveLikesData = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export const getLikeCount = (itemId) => {
  const data = getLikesData()
  return data.likes[itemId] || 0
}

export const isLiked = (itemId) => {
  const data = getLikesData()
  return data.likedItems.includes(itemId)
}

export const toggleLike = (itemId) => {
  const data = getLikesData()
  
  if (data.likedItems.includes(itemId)) {
    data.likedItems = data.likedItems.filter(id => id !== itemId)
    data.likes[itemId] = Math.max(0, (data.likes[itemId] || 0) - 1)
  } else {
    data.likedItems.push(itemId)
    data.likes[itemId] = (data.likes[itemId] || 0) + 1
  }
  
  saveLikesData(data)
  return {
    count: data.likes[itemId] || 0,
    liked: data.likedItems.includes(itemId)
  }
}

export const initializeLikeCount = (itemId, baseCount) => {
  const data = getLikesData()
  if (data.likes[itemId] === undefined) {
    data.likes[itemId] = baseCount
    saveLikesData(data)
  }
  return data.likes[itemId]
}
