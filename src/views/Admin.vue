<template>
  <div class="admin">
    <div class="admin-header">
      <div class="admin-header-inner">
        <h1 class="admin-title">
          模型管理中心
          <div class="admin-title-glow"></div>
        </h1>
        <p class="admin-subtitle">管理您的三维资产，上传、编辑和删除模型</p>
      </div>
    </div>

    <section class="upload-section">
      <div class="section-card">
        <div class="section-card-inner">
          <div class="section-header">
            <h2 class="section-title">
              <span class="section-icon">📤</span>
              上传三维模型
              <div class="section-title-glow"></div>
            </h2>
            <p class="section-description">
              支持多种3D模型格式，一键上传，快速开始
            </p>
          </div>
          <form class="upload-form" @submit.prevent="handleSubmit">
            <div class="form-grid">
              <div class="form-group">
                <label for="model-name" class="form-label">
                  <span class="label-icon">📝</span>
                  <span class="label-text">模型名称</span>
                </label>
                <div class="form-input-container">
                  <input 
                    type="text" 
                    id="model-name" 
                    v-model="formData.name"
                    placeholder="请输入模型名称"
                    class="form-input"
                    required
                  >
                  <div class="form-input-glow"></div>
                </div>
              </div>
              <div class="form-group">
                <label for="model-category" class="form-label">
                  <span class="label-icon">📁</span>
                  <span class="label-text">模型分类</span>
                </label>
                <div class="form-input-container">
                  <select 
                    id="model-category" 
                    v-model="formData.category"
                    class="form-input"
                  >
                    <option value="">请选择分类</option>
                    <option value="characters">角色</option>
                    <option value="environment">环境</option>
                    <option value="props">道具</option>
                    <option value="vehicles">车辆</option>
                    <option value="weapons">武器</option>
                    <option value="other">其他</option>
                  </select>
                  <div class="form-input-glow"></div>
                </div>
              </div>
            </div>
            <div class="form-group">
              <label for="model-description" class="form-label">
                <span class="label-icon">📄</span>
                <span class="label-text">模型描述</span>
              </label>
              <div class="form-input-container">
                <textarea 
                  id="model-description" 
                  v-model="formData.description"
                  placeholder="请输入模型描述"
                  class="form-textarea"
                  required
                ></textarea>
                <div class="form-input-glow"></div>
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">
                <span class="label-icon">📁</span>
                <span class="label-text">上传模型文件</span>
              </label>
              <div 
                class="file-upload"
                :class="{ 'dragover': isDragover }"
                @dragover.prevent="isDragover = true"
                @dragleave.prevent="isDragover = false"
                @drop.prevent="handleDrop"
              >
                <input 
                  type="file" 
                  id="model-file" 
                  ref="fileInput"
                  accept=".obj,.fbx,.gltf,.glb,.stl,.3ds"
                  @change="handleFileChange"
                >
                <label for="model-file" class="file-upload-label">
                  <div class="file-upload-icon">📁</div>
                  <div class="file-upload-text">
                    {{ selectedFile ? '已选择：' + selectedFile.name : '点击或拖拽文件到此处上传' }}
                  </div>
                  <div class="file-upload-info">
                    {{ selectedFile ? (selectedFile.size / (1024 * 1024)).toFixed(2) + ' MB' : '支持格式：OBJ, FBX, GLTF, GLB, STL, 3DS' }}
                  </div>
                  <div class="file-upload-glow"></div>
                </label>
              </div>
            </div>
            <button type="submit" class="btn btn-primary" :disabled="!formData.name || !selectedFile">
              <span class="btn-icon">📤</span>
              <span class="btn-text">上传模型</span>
              <div class="btn-glow"></div>
            </button>
          </form>
        </div>
      </div>
    </section>

    <section class="models-section">
      <div class="section-card">
        <div class="section-card-inner">
          <div class="section-header">
            <h2 class="section-title">
              <span class="section-icon">📦</span>
              已上传模型
              <div class="section-title-glow"></div>
            </h2>
            <div class="section-actions">
              <div class="search-box">
                <div class="search-box-inner">
                  <input 
                    type="text" 
                    v-model="searchQuery"
                    placeholder="搜索模型..."
                    class="search-input"
                  >
                  <span class="search-icon">🔍</span>
                  <div class="search-glow"></div>
                </div>
              </div>
              <div class="filter-container">
                <select 
                  v-model="filterCategory"
                  class="filter-select"
                >
                  <option value="">所有分类</option>
                  <option value="characters">角色</option>
                  <option value="environment">环境</option>
                  <option value="props">道具</option>
                  <option value="vehicles">车辆</option>
                  <option value="weapons">武器</option>
                  <option value="other">其他</option>
                </select>
                <div class="filter-glow"></div>
              </div>
            </div>
          </div>
          <div class="models-list">
            <div 
              v-for="model in filteredModels" 
              :key="model.id"
              class="model-item"
              @mouseenter="hoveredModel = model.id"
              @mouseleave="hoveredModel = null"
            >
              <div class="model-item-inner">
                <div class="model-thumbnail">
                  <div class="model-thumbnail-container">
                    <ModelViewer :model-url="model.url" :size="100" />
                    <div class="model-thumbnail-glow"></div>
                  </div>
                </div>
                <div class="model-details">
                  <div class="model-header">
                    <h3 class="model-name">{{ model.name }}</h3>
                    <span v-if="model.category" class="model-category">
                      {{ getCategoryName(model.category) }}
                      <div class="category-glow"></div>
                    </span>
                  </div>
                  <p class="model-description">{{ model.description }}</p>
                  <div class="model-meta">
                    <span class="meta-item">
                      <span class="meta-icon">📅</span>
                      {{ model.uploadDate }}
                    </span>
                    <span class="meta-item">
                      <span class="meta-icon">📦</span>
                      {{ model.fileSize }}
                    </span>
                  </div>
                </div>
                <div class="model-actions">
                  <button class="btn btn-sm btn-secondary" @click="editModel(model.id)">
                    <span class="btn-icon">✏️</span>
                    <span class="btn-text">编辑</span>
                    <div class="btn-glow"></div>
                  </button>
                  <button class="btn btn-sm btn-danger" @click="deleteModel(model.id)">
                    <span class="btn-icon">🗑️</span>
                    <span class="btn-text">删除</span>
                    <div class="btn-glow"></div>
                  </button>
                </div>
              </div>
            </div>
            <div v-if="filteredModels.length === 0" class="empty-state">
              <div class="empty-state-inner">
                <div class="empty-state-icon">📦</div>
                <h3 class="empty-state-title">
                  {{ uploadedModels.length === 0 ? '暂无上传的模型' : '未找到匹配的模型' }}
                </h3>
                <p class="empty-state-description">
                  {{ uploadedModels.length === 0 ? '上传您的第一个3D模型开始使用' : '尝试调整搜索条件或上传新模型' }}
                </p>
                <button 
                  v-if="uploadedModels.length === 0"
                  class="btn btn-primary"
                  @click="scrollToUpload"
                >
                  <span class="btn-icon">📤</span>
                  <span class="btn-text">上传模型</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 编辑模型对话框 -->
    <div v-if="isEditModalOpen" class="modal-overlay" @click="closeEditModal">
      <div class="modal-content" @click.stop>
        <div class="modal-content-inner">
          <div class="modal-header">
            <h3 class="modal-title">
              编辑模型
              <div class="modal-title-glow"></div>
            </h3>
            <button class="modal-close" @click="closeEditModal">×</button>
          </div>
          <div class="modal-body">
            <form class="edit-form">
              <div class="form-group">
                <label for="edit-model-name" class="form-label">
                  <span class="label-text">模型名称</span>
                </label>
                <div class="form-input-container">
                  <input 
                    type="text" 
                    id="edit-model-name" 
                    v-model="editFormData.name"
                    placeholder="请输入模型名称"
                    class="form-input"
                  >
                  <div class="form-input-glow"></div>
                </div>
              </div>
              <div class="form-group">
                <label for="edit-model-description" class="form-label">
                  <span class="label-text">模型描述</span>
                </label>
                <div class="form-input-container">
                  <textarea 
                    id="edit-model-description" 
                    v-model="editFormData.description"
                    placeholder="请输入模型描述"
                    class="form-textarea"
                  ></textarea>
                  <div class="form-input-glow"></div>
                </div>
              </div>
              <div class="form-group">
                <label for="edit-model-category" class="form-label">
                  <span class="label-text">模型分类</span>
                </label>
                <div class="form-input-container">
                  <select 
                    id="edit-model-category" 
                    v-model="editFormData.category"
                    class="form-input"
                  >
                    <option value="">请选择分类</option>
                    <option value="characters">角色</option>
                    <option value="environment">环境</option>
                    <option value="props">道具</option>
                    <option value="vehicles">车辆</option>
                    <option value="weapons">武器</option>
                    <option value="other">其他</option>
                  </select>
                  <div class="form-input-glow"></div>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" @click="closeEditModal">
              <span class="btn-text">取消</span>
              <div class="btn-glow"></div>
            </button>
            <button class="btn btn-primary" @click="saveEdit">
              <span class="btn-text">保存修改</span>
              <div class="btn-glow"></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue'
import ModelViewer from '../components/ModelViewer.vue'
import store from '../store'

// 表单数据
const formData = ref({
  name: '',
  description: '',
  category: ''
})

// 编辑表单数据
const editFormData = ref({
  id: null,
  name: '',
  description: '',
  category: ''
})

// 文件上传状态
const selectedFile = ref(null)
const isDragover = ref(false)
const fileInput = ref(null)

// 搜索和过滤
const searchQuery = ref('')
const filterCategory = ref('')
const hoveredModel = ref(null)

// 模态框状态
const isEditModalOpen = ref(false)

// 使用全局模型数据
const uploadedModels = store.models

// 过滤后的模型列表
const filteredModels = computed(() => {
  return uploadedModels.value.filter(model => {
    const matchesSearch = !searchQuery.value || 
      model.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      model.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesCategory = !filterCategory.value || model.category === filterCategory.value
    return matchesSearch && matchesCategory
  })
})

// 处理文件选择
const handleFileChange = (e) => {
  const file = e.target.files[0]
  if (file) {
    console.log('文件选择成功:', file.name, file.size, file.type)
    selectedFile.value = file
  }
}

// 处理拖拽上传
const handleDrop = (e) => {
  isDragover.value = false
  const files = e.dataTransfer.files
  if (files.length > 0) {
    selectedFile.value = files[0]
    // 更新文件输入的值
    if (fileInput.value) {
      fileInput.value.files = files
    }
  }
}

// 处理表单提交
const handleSubmit = () => {
  if (!formData.value.name || !selectedFile.value) {
    return
  }

  // 处理本地文件上传
  const fileUrl = URL.createObjectURL(selectedFile.value)
  
  // 创建新模型数据
  const newModelData = {
    name: formData.value.name,
    description: formData.value.description,
    category: formData.value.category,
    url: fileUrl, // 使用本地文件URL
    uploadDate: new Date().toISOString().split('T')[0],
    fileSize: (selectedFile.value.size / (1024 * 1024)).toFixed(2) + ' MB'
  }

  // 使用store添加模型
  store.addModel(newModelData)

  // 重置表单
  formData.value = {
    name: '',
    description: '',
    category: ''
  }
  selectedFile.value = null
  if (fileInput.value) {
    fileInput.value.value = ''
  }

  // 显示成功消息
  alert('模型上传成功！')
}

// 编辑模型
const editModel = (modelId) => {
  const model = uploadedModels.value.find(m => m.id === modelId)
  if (model) {
    editFormData.value = {
      id: model.id,
      name: model.name,
      description: model.description,
      category: model.category || ''
    }
    isEditModalOpen.value = true
  }
}

// 保存编辑
const saveEdit = () => {
  if (editFormData.value.id) {
    store.updateModel(editFormData.value.id, {
      name: editFormData.value.name,
      description: editFormData.value.description,
      category: editFormData.value.category
    })
    isEditModalOpen.value = false
    alert('模型编辑成功！')
  }
}

// 关闭编辑模态框
const closeEditModal = () => {
  isEditModalOpen.value = false
}

// 删除模型
const deleteModel = (modelId) => {
  if (confirm('确定要删除这个模型吗？此操作不可撤销。')) {
    store.deleteModel(modelId)
    alert('模型删除成功！')
  }
}

// 滚动到上传区域
const scrollToUpload = () => {
  const uploadSection = document.querySelector('.upload-section')
  if (uploadSection) {
    uploadSection.scrollIntoView({ behavior: 'smooth' })
  }
}

// 获取分类名称
const getCategoryName = (category) => {
  const categoryMap = {
    characters: '角色',
    environment: '环境',
    props: '道具',
    vehicles: '车辆',
    weapons: '武器',
    other: '其他'
  }
  return categoryMap[category] || category
}
</script>

<style scoped>
/* 科技风格发光效果 */
.admin-title-glow,
.section-title-glow,
.form-input-glow,
.file-upload-glow,
.btn-glow,
.search-glow,
.filter-glow,
.model-thumbnail-glow,
.category-glow,
.modal-title-glow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: inherit;
  background: linear-gradient(
    45deg,
    transparent,
    var(--primary-glow),
    transparent,
    var(--secondary-glow),
    transparent
  );
  background-size: 400% 400%;
  animation: glow-animation 3s ease-in-out infinite;
  pointer-events: none;
  z-index: -1;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.admin-title:hover .admin-title-glow,
.section-title:hover .section-title-glow,
.form-input-container:focus-within .form-input-glow,
.file-upload:hover .file-upload-glow,
.file-upload.dragover .file-upload-glow,
.btn:hover .btn-glow,
.search-box:focus-within .search-glow,
.filter-container:focus-within .filter-glow,
.model-thumbnail:hover .model-thumbnail-glow,
.model-category:hover .category-glow,
.modal-title:hover .modal-title-glow {
  opacity: 1;
}

@keyframes glow-animation {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

/* 主要样式 */
.admin {
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
}

.admin::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 20% 50%, rgba(102, 126, 234, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(118, 75, 162, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 40% 80%, rgba(102, 126, 234, 0.05) 0%, transparent 50%);
  z-index: -1;
  pointer-events: none;
}

.admin-header {
  text-align: center;
  margin-bottom: 60px;
  position: relative;
}

.admin-header-inner {
  position: relative;
  z-index: 1;
}

.admin-title {
  font-size: 48px;
  font-weight: bold;
  margin-bottom: 16px;
  background: var(--primary-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 0 30px var(--primary-glow);
  position: relative;
  display: inline-block;
}

.admin-subtitle {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.7);
  max-width: 600px;
  margin: 0 auto;
}

.section-card {
  background: var(--card-bg);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  border: 1px solid var(--border-color);
  padding: 40px;
  margin-bottom: 40px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.section-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--primary-glow), transparent);
}

.section-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 40px var(--primary-glow);
  border-color: var(--border-color);
}

.section-card-inner {
  position: relative;
  z-index: 1;
}

.section-header {
  margin-bottom: 30px;
}

.section-title {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 12px;
  color: #ffffff;
  position: relative;
  display: inline-block;
}

.section-icon {
  font-size: 24px;
}

.section-description {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.7);
}

.upload-form {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
  transition: color 0.3s ease;
}

.form-group:focus-within .form-label {
  color: #667eea;
}

.label-icon {
  font-size: 16px;
}

.form-input-container {
  position: relative;
  display: flex;
}

.form-input,
.form-textarea {
  flex: 1;
  padding: 16px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  color: #ffffff;
  font-size: 16px;
  font-family: inherit;
  transition: all 0.3s ease;
  position: relative;
  z-index: 1;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: var(--border-color);
  box-shadow: 0 0 0 3px var(--primary-glow);
  background: rgba(255, 255, 255, 0.12);
}

.form-input::placeholder,
.form-textarea::placeholder {
  color: rgba(255, 255, 255, 0.5);
  transition: color 0.3s ease;
}

.form-input:focus::placeholder,
.form-textarea:focus::placeholder {
  color: rgba(255, 255, 255, 0.7);
}

.form-textarea {
  resize: vertical;
  min-height: 120px;
}

.file-upload {
  border: 2px dashed var(--border-color);
  border-radius: 16px;
  padding: 40px;
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;
  background: var(--primary-glow);
  opacity: 0.3;
  position: relative;
  overflow: hidden;
}

.file-upload:hover,
.file-upload.dragover {
  border-color: var(--border-color);
  background: var(--primary-glow);
  opacity: 0.5;
  transform: translateY(-2px);
}

.file-upload input {
  display: none;
}

.file-upload-label {
  display: block;
  cursor: pointer;
  position: relative;
  z-index: 1;
}

.file-upload-icon {
  font-size: 48px;
  margin-bottom: 20px;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

.file-upload-text {
  margin-bottom: 10px;
  font-size: 16px;
  color: rgba(255, 255, 255, 0.9);
}

.file-upload-info {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 16px 32px;
  border-radius: 12px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  font-size: 16px;
  cursor: pointer;
  border: none;
  z-index: 1;
}

.btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s ease;
  z-index: -1;
}

.btn:hover::before {
  left: 100%;
}

.btn-primary {
  background: var(--primary-gradient);
  color: #ffffff;
  box-shadow: 0 8px 25px var(--primary-glow);
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 12px 35px var(--primary-glow);
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.3);
  transform: translateY(-1px);
}

.btn-danger {
  background: rgba(255, 87, 34, 0.3);
  color: #ffffff;
  border: 1px solid rgba(255, 87, 34, 0.5);
}

.btn-danger:hover {
  background: rgba(255, 87, 34, 0.4);
  border-color: rgba(255, 87, 34, 0.7);
  transform: translateY(-1px);
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-sm {
  padding: 10px 20px;
  font-size: 14px;
  border-radius: 8px;
}

.btn-icon {
  font-size: 16px;
}

.section-actions {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  margin-top: 15px;
}

.search-box {
  position: relative;
  flex: 1;
  min-width: 200px;
}

.search-box-inner {
  position: relative;
}

.search-input {
  width: 100%;
  padding: 12px 40px 12px 16px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  color: #ffffff;
  font-size: 14px;
  transition: all 0.3s ease;
  position: relative;
  z-index: 1;
}

.search-input:focus {
  outline: none;
  border-color: var(--border-color);
  box-shadow: 0 0 0 3px var(--primary-glow);
  background: rgba(255, 255, 255, 0.12);
}

.search-input::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.search-icon {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.5);
  font-size: 16px;
  transition: color 0.3s ease;
  z-index: 2;
}

.search-box:focus-within .search-icon {
  color: var(--primary-glow);
}

.filter-container {
  position: relative;
}

.filter-select {
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  color: #ffffff;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  z-index: 1;
  appearance: none;
  padding-right: 32px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='rgba(255,255,255,0.5)' d='M6 9L1 4h10L6 9z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
}

.filter-select:focus {
  outline: none;
  border-color: var(--border-color);
  box-shadow: 0 0 0 3px var(--primary-glow);
  background: rgba(255, 255, 255, 0.12);
}

.filter-select option {
  background: #1a1a3a;
  color: #ffffff;
}

.models-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.model-item {
  perspective: 1000px;
}

.model-item-inner {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 24px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  transform-style: preserve-3d;
  transform: translateZ(0);
}

.model-item-inner::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(102, 126, 234, 0.1), transparent);
  transition: left 0.5s ease;
}

.model-item:hover .model-item-inner::before {
  left: 100%;
}

.model-item:hover .model-item-inner {
  background: rgba(255, 255, 255, 0.08);
  border-color: var(--border-color);
  transform: translateY(-2px) translateZ(10px);
  box-shadow: 0 8px 25px var(--primary-glow);
}

.model-thumbnail {
  width: 100px;
  height: 100px;
  background: var(--primary-glow);
  opacity: 0.3;
  border-radius: 12px;
  overflow: hidden;
  flex-shrink: 0;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--border-color);
}

.model-thumbnail-container {
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 1;
}

.model-details {
  flex: 1;
  min-width: 0;
}

.model-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}

.model-name {
  font-size: 18px;
  font-weight: bold;
  color: #ffffff;
  margin: 0;
  flex: 1;
  position: relative;
  display: inline-block;
}

.model-name::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--primary-gradient);
  transition: width 0.3s ease;
}

.model-name:hover::after {
  width: 100%;
}

.model-category {
  padding: 4px 12px;
  background: var(--primary-glow);
  opacity: 0.5;
  border: 1px solid var(--border-color);
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  color: #ffffff;
  white-space: nowrap;
  position: relative;
  overflow: hidden;
}

.model-description {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  margin: 0 0 12px 0;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.model-meta {
  display: flex;
  gap: 20px;
  align-items: center;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
  transition: color 0.3s ease;
}

.meta-item:hover {
  color: rgba(255, 255, 255, 0.8);
}

.meta-icon {
  font-size: 14px;
}

.model-actions {
  display: flex;
  gap: 10px;
  flex-shrink: 0;
}

.empty-state {
  text-align: center;
  padding: 80px 40px;
  background: rgba(255, 255, 255, 0.05);
  border: 2px dashed var(--border-color);
  border-radius: 16px;
  margin-top: 20px;
  position: relative;
  overflow: hidden;
}

.empty-state::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, transparent, var(--primary-glow), transparent);
  opacity: 0.3;
  animation: pulse 3s ease-in-out infinite;
}

.empty-state-inner {
  position: relative;
  z-index: 1;
}

.empty-state-icon {
  font-size: 64px;
  margin-bottom: 24px;
  animation: pulse 2s ease-in-out infinite;
}

.empty-state-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 12px;
  color: #ffffff;
}

.empty-state-description {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 32px;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: fade-in 0.3s ease;
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.modal-content {
  background: var(--card-bg);
  backdrop-filter: blur(20px);
  border: 1px solid var(--border-color);
  border-radius: 20px;
  padding: 40px;
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  animation: slide-up 0.3s ease;
  position: relative;
  overflow: hidden;
}

@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.modal-content::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--primary-glow), transparent);
}

.modal-content-inner {
  position: relative;
  z-index: 1;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.modal-title {
  font-size: 24px;
  font-weight: bold;
  color: #ffffff;
  margin: 0;
  position: relative;
  display: inline-block;
}

.modal-close {
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.7);
  font-size: 32px;
  cursor: pointer;
  transition: color 0.3s ease;
  line-height: 1;
  position: relative;
  z-index: 1;
}

.modal-close:hover {
  color: #ffffff;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
}

.modal-body {
  margin-bottom: 30px;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 15px;
}

.edit-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .admin-header {
    margin-bottom: 40px;
  }
  
  .admin-title {
    font-size: 36px;
  }
  
  .section-card {
    padding: 30px;
  }
  
  .form-grid {
    grid-template-columns: 1fr;
  }
  
  .section-actions {
    flex-direction: column;
  }
  
  .model-item-inner {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
  
  .model-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  
  .model-actions {
    align-self: flex-end;
  }
  
  .modal-content {
    padding: 30px;
  }
  
  .modal-footer {
    flex-direction: column;
  }
  
  .modal-footer .btn {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .admin-header {
    margin-bottom: 30px;
  }
  
  .admin-title {
    font-size: 28px;
  }
  
  .section-card {
    padding: 20px;
  }
  
  .section-title {
    font-size: 24px;
  }
  
  .file-upload {
    padding: 30px 20px;
  }
  
  .model-thumbnail {
    width: 80px;
    height: 80px;
  }
  
  .model-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
}
</style>
