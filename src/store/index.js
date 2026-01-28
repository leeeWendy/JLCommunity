import { ref, computed } from 'vue'

// 全局模型数据管理
const models = ref([
  {
    id: 1,
    name: '忍者头模型',
    description: '高质量的忍者头3D模型，适合游戏和动画项目',
    url: 'ninjaHead_Low.obj',
    uploadDate: '2024-01-01',
    fileSize: '1.2 MB',
    category: 'characters'
  },
  {
    id: 2,
    name: '树木模型',
    description: '低多边形风格的树木3D模型，适合场景构建',
    url: 'tree.obj',
    uploadDate: '2024-01-02',
    fileSize: '0.8 MB',
    category: 'environment'
  },
  {
    id: 3,
    name: '测试立方体',
    description: '基础立方体模型，用于测试系统功能',
    url: 'test-model',
    uploadDate: '2024-01-03',
    fileSize: '0.1 MB',
    category: 'props'
  }
])

// 分类列表
const categories = ref([
  { value: 'characters', label: '角色' },
  { value: 'environment', label: '环境' },
  { value: 'props', label: '道具' },
  { value: 'vehicles', label: '车辆' },
  { value: 'weapons', label: '武器' },
  { value: 'other', label: '其他' }
])

// 添加新模型
const addModel = (modelData) => {
  const newModel = {
    id: Date.now(),
    ...modelData
  }
  models.value.unshift(newModel)
  return newModel
}

// 删除模型
const deleteModel = (modelId) => {
  models.value = models.value.filter(model => model.id !== modelId)
}

// 更新模型
const updateModel = (modelId, updatedData) => {
  const index = models.value.findIndex(model => model.id === modelId)
  if (index !== -1) {
    models.value[index] = { ...models.value[index], ...updatedData }
    return models.value[index]
  }
  return null
}

// 根据ID获取模型
const getModelById = (modelId) => {
  return models.value.find(model => model.id === modelId) || null
}

// 根据分类获取模型
const getModelsByCategory = (category) => {
  if (!category) return models.value
  return models.value.filter(model => model.category === category)
}

// 搜索模型
const searchModels = (query) => {
  if (!query) return models.value
  const lowerQuery = query.toLowerCase()
  return models.value.filter(model => 
    model.name.toLowerCase().includes(lowerQuery) ||
    model.description.toLowerCase().includes(lowerQuery)
  )
}

// 统计信息
const stats = computed(() => {
  return {
    totalModels: models.value.length,
    categoryCounts: categories.value.map(category => ({
      category: category.value,
      label: category.label,
      count: models.value.filter(model => model.category === category.value).length
    }))
  }
})

// 导出store
export default {
  models,
  categories,
  stats,
  addModel,
  deleteModel,
  updateModel,
  getModelById,
  getModelsByCategory,
  searchModels
}
