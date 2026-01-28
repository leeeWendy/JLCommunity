<template>
  <div class="model-detail">
    <!-- 背景效果 -->
    <div class="bg-effects">
      <div class="bg-grid"></div>
      <div class="bg-particles"></div>
    </div>
    
    <!-- 导航栏 -->
    <div class="detail-header">
      <div class="detail-header-content">
        <div class="detail-breadcrumb">
          <router-link to="/" class="breadcrumb-link">首页</router-link>
          <span class="breadcrumb-separator">/</span>
          <router-link to="/" class="breadcrumb-link">模型库</router-link>
          <span class="breadcrumb-separator">/</span>
          <span class="breadcrumb-current">{{ model ? model.name : '模型详情' }}</span>
        </div>
        <button class="back-button" @click="goBack">
          <span class="back-icon">←</span>
          <span class="back-text">返回</span>
          <div class="back-button-glow"></div>
        </button>
      </div>
    </div>
    
    <main class="detail-content">
      <!-- 加载状态 -->
      <div v-if="isLoading" class="loading-overlay">
        <div class="loading-spinner"></div>
        <div class="loading-text">加载中...</div>
      </div>
      
      <!-- 错误状态 -->
      <div v-if="isError" class="error-overlay">
        <div class="error-icon">❌</div>
        <div class="error-text">模型加载失败</div>
        <div class="error-description">{{ errorMessage }}</div>
        <button class="retry-button" @click="retryLoad">重试</button>
        <button class="back-button-alt" @click="goBack">返回首页</button>
      </div>
      
      <!-- 模型详情内容 -->
      <div v-if="model && !isLoading && !isError" class="detail-layout">
        <!-- 左侧：模型预览 -->
        <div class="model-preview-section">
          <div class="model-preview-container">
            <ModelViewer :model-url="model.url" :size="600" :auto-rotate="true" />
            <div class="model-preview-glow"></div>
          </div>
          <div class="model-actions">
            <button class="action-button primary" @click="downloadModel(model)">
              <span class="action-icon">💾</span>
              <span class="action-text">下载模型</span>
              <div class="action-button-glow"></div>
            </button>
            <button class="action-button secondary" @click="shareModel(model)">
              <span class="action-icon">📤</span>
              <span class="action-text">分享模型</span>
              <div class="action-button-glow"></div>
            </button>
          </div>
        </div>
        
        <!-- 右侧：模型详情 -->
        <div class="model-info-section">
          <div class="model-info-card">
            <div class="model-info-card-inner">
              <h1 class="model-title">
                {{ model.name }}
                <div class="model-title-glow"></div>
              </h1>
              
              <div class="model-meta">
                <div class="meta-group">
                  <span class="meta-label">上传日期</span>
                  <span class="meta-value">{{ model.uploadDate }}</span>
                </div>
                <div class="meta-group">
                  <span class="meta-label">文件大小</span>
                  <span class="meta-value">{{ model.fileSize }}</span>
                </div>
                <div class="meta-group">
                  <span class="meta-label">分类</span>
                  <span class="meta-value">{{ getCategoryName(model.category) }}</span>
                </div>
              </div>
              
              <div class="model-description-section">
                <h2 class="section-subtitle">
                  模型描述
                  <div class="section-subtitle-glow"></div>
                </h2>
                <p class="model-description">{{ model.description }}</p>
              </div>
              
              <div class="model-downloads">
                <h2 class="section-subtitle">
                  下载选项
                  <div class="section-subtitle-glow"></div>
                </h2>
                <div class="download-options">
                  <div class="download-option">
                    <div class="download-option-icon">📦</div>
                    <div class="download-option-content">
                      <div class="download-option-name">OBJ格式</div>
                      <div class="download-option-size">{{ model.fileSize }}</div>
                    </div>
                    <button class="download-button" @click="downloadModelAs(model, 'obj')">
                      <span class="download-button-icon">↓</span>
                    </button>
                  </div>
                  <div class="download-option">
                    <div class="download-option-icon">📦</div>
                    <div class="download-option-content">
                      <div class="download-option-name">GLB格式</div>
                      <div class="download-option-size">{{ model.fileSize }}</div>
                    </div>
                    <button class="download-button" @click="downloadModelAs(model, 'glb')">
                      <span class="download-button-icon">↓</span>
                    </button>
                  </div>
                  <div class="download-option">
                    <div class="download-option-icon">📦</div>
                    <div class="download-option-content">
                      <div class="download-option-name">FBX格式</div>
                      <div class="download-option-size">{{ model.fileSize }}</div>
                    </div>
                    <button class="download-button" @click="downloadModelAs(model, 'fbx')">
                      <span class="download-button-icon">↓</span>
                    </button>
                  </div>
                </div>
              </div>
              
              <div class="model-tags">
                <h2 class="section-subtitle">
                  标签
                  <div class="section-subtitle-glow"></div>
                </h2>
                <div class="tags-list">
                  <span class="tag" v-for="tag in getModelTags(model)" :key="tag">
                    {{ tag }}
                    <div class="tag-glow"></div>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ModelViewer from '../components/ModelViewer.vue'
import store from '../store'

const route = useRoute()
const router = useRouter()

// 状态管理
const isLoading = ref(true)
const isError = ref(false)
const errorMessage = ref('')

// 从路由参数获取模型ID
const modelId = computed(() => route.params.id)

// 获取模型数据
const model = computed(() => {
  // 将路由参数转换为数字类型，因为store中的ID是数字
  const id = parseInt(modelId.value)
  return store.models.value.find(m => m.id === id)
})

// 加载模型
const loadModel = () => {
  isLoading.value = true
  isError.value = false
  
  try {
    // 模拟加载延迟
    setTimeout(() => {
      if (model.value) {
        isLoading.value = false
      } else {
        throw new Error('模型不存在')
      }
    }, 500)
  } catch (error) {
    handleLoadError(error)
  }
}

// 处理加载错误
const handleLoadError = (error) => {
  console.error('模型加载失败:', error)
  isLoading.value = false
  isError.value = true
  errorMessage.value = error.message || '未知错误'
}

// 重试加载
const retryLoad = () => {
  loadModel()
}

// 返回上一页
const goBack = () => {
  router.back()
}

// 下载模型
const downloadModel = (model) => {
  console.log('下载模型:', model.name)
  // 这里实现下载逻辑
  alert(`开始下载模型: ${model.name}`)
}

// 以特定格式下载模型
const downloadModelAs = (model, format) => {
  console.log(`下载模型为${format}格式:`, model.name)
  // 这里实现特定格式的下载逻辑
  alert(`开始下载模型 ${model.name} 为 ${format} 格式`)
}

// 分享模型
const shareModel = (model) => {
  console.log('分享模型:', model.name)
  // 这里实现分享逻辑
  alert(`分享模型: ${model.name}`)
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
  return categoryMap[category] || category || '未分类'
}

// 获取模型标签
const getModelTags = (model) => {
  // 基于模型信息生成标签
  const tags = []
  
  if (model.category) {
    tags.push(getCategoryName(model.category))
  }
  
  // 添加一些默认标签
  tags.push('3D模型')
  tags.push('高质量')
  
  return tags
}

// 生命周期钩子
onMounted(() => {
  loadModel()
})
</script>

<style scoped>
/* 科技风格发光效果 */
.model-title-glow,
.section-subtitle-glow,
.model-preview-glow,
.action-button-glow,
.back-button-glow,
.tag-glow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: inherit;
  background: linear-gradient(
    45deg,
    transparent,
    rgba(102, 126, 234, 0.3),
    transparent,
    rgba(118, 75, 162, 0.3),
    transparent
  );
  background-size: 400% 400%;
  animation: glow-animation 3s ease-in-out infinite;
  pointer-events: none;
  z-index: -1;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.model-title:hover .model-title-glow,
.section-subtitle:hover .section-subtitle-glow,
.model-preview-container:hover .model-preview-glow,
.action-button:hover .action-button-glow,
.back-button:hover .back-button-glow,
.tag:hover .tag-glow {
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
.model-detail {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  background: var(--bg-color, #0f0f23);
}

.detail-header {
  background: rgba(15, 15, 35, 0.8);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(102, 126, 234, 0.2);
  padding: 20px 0;
  position: sticky;
  top: 0;
  z-index: 100;
}

.detail-header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.detail-breadcrumb {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
}

.breadcrumb-link {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  transition: color 0.3s ease;
}

.breadcrumb-link:hover {
  color: #667eea;
}

.breadcrumb-separator {
  color: rgba(255, 255, 255, 0.5);
}

.breadcrumb-current {
  color: #ffffff;
  font-weight: 500;
}

.back-button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  color: #ffffff;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  z-index: 1;
}

.back-button:hover {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.3);
  transform: translateY(-1px);
}

.back-icon {
  font-size: 16px;
}

.detail-content {
  flex: 1;
  position: relative;
}

.loading-overlay,
.error-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(15, 15, 35, 0.9);
  backdrop-filter: blur(20px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.loading-spinner {
  width: 60px;
  height: 60px;
  border: 3px solid rgba(102, 126, 234, 0.3);
  border-top: 3px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 20px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-text {
  color: rgba(255, 255, 255, 0.8);
  font-size: 16px;
  font-weight: 500;
}

.error-icon {
  font-size: 64px;
  margin-bottom: 20px;
}

.error-text {
  color: #ff6b6b;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}

.error-description {
  color: rgba(255, 255, 255, 0.7);
  font-size: 16px;
  margin-bottom: 30px;
  max-width: 400px;
  text-align: center;
  line-height: 1.4;
}

.retry-button,
.back-button-alt {
  padding: 12px 24px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 0 10px;
}

.retry-button {
  background: rgba(102, 126, 234, 0.3);
  border: 1px solid rgba(102, 126, 234, 0.4);
  color: #ffffff;
}

.retry-button:hover {
  background: rgba(102, 126, 234, 0.4);
  border-color: rgba(102, 126, 234, 0.6);
  transform: translateY(-1px);
}

.back-button-alt {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #ffffff;
}

.back-button-alt:hover {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.3);
  transform: translateY(-1px);
}

.detail-layout {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px;
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 40px;
}

.model-preview-section {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.model-preview-container {
  background: rgba(15, 15, 35, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(102, 126, 234, 0.2);
  border-radius: 24px;
  padding: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

.model-preview-container:hover {
  border-color: rgba(102, 126, 234, 0.4);
  box-shadow: 0 8px 32px rgba(102, 126, 234, 0.2);
  transform: translateY(-2px);
}

.model-actions {
  display: flex;
  gap: 20px;
}

.action-button {
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 16px 32px;
  border-radius: 16px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  z-index: 1;
  border: none;
}

.action-button.primary {
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: #ffffff;
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
}

.action-button.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 35px rgba(102, 126, 234, 0.4);
}

.action-button.secondary {
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.action-button.secondary:hover {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.3);
  transform: translateY(-1px);
}

.model-info-section {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.model-info-card {
  background: rgba(15, 15, 35, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(102, 126, 234, 0.2);
  border-radius: 24px;
  padding: 40px;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

.model-info-card:hover {
  border-color: rgba(102, 126, 234, 0.4);
  box-shadow: 0 8px 32px rgba(102, 126, 234, 0.2);
}

.model-info-card-inner {
  position: relative;
  z-index: 1;
}

.model-title {
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 24px;
  color: #ffffff;
  position: relative;
  display: inline-block;
}

.model-meta {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
  padding-bottom: 30px;
  border-bottom: 1px solid rgba(102, 126, 234, 0.2);
}

.meta-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.meta-label {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 500;
}

.meta-value {
  font-size: 16px;
  color: #ffffff;
  font-weight: 600;
}

.model-description-section,
.model-downloads,
.model-tags {
  margin-bottom: 30px;
}

.section-subtitle {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 16px;
  color: #ffffff;
  position: relative;
  display: inline-block;
}

.model-description {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  margin-bottom: 0;
}

.download-options {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.download-option {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  transition: all 0.3s ease;
}

.download-option:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(102, 126, 234, 0.3);
  transform: translateX(5px);
}

.download-option-icon {
  font-size: 24px;
  flex-shrink: 0;
}

.download-option-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.download-option-name {
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
}

.download-option-size {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
}

.download-button {
  padding: 12px 16px;
  background: rgba(102, 126, 234, 0.3);
  border: 1px solid rgba(102, 126, 234, 0.4);
  border-radius: 12px;
  color: #ffffff;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.download-button:hover {
  background: rgba(102, 126, 234, 0.4);
  border-color: rgba(102, 126, 234, 0.6);
  transform: translateY(-1px);
}

.tags-list {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.tag {
  padding: 8px 16px;
  background: rgba(102, 126, 234, 0.2);
  border: 1px solid rgba(102, 126, 234, 0.3);
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  color: #ffffff;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.tag:hover {
  background: rgba(102, 126, 234, 0.3);
  border-color: rgba(102, 126, 234, 0.5);
  transform: translateY(-1px);
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .detail-layout {
    grid-template-columns: 1fr;
    padding: 30px;
  }
  
  .model-preview-container {
    padding: 30px;
  }
  
  .model-info-card {
    padding: 30px;
  }
}

@media (max-width: 768px) {
  .detail-header-content {
    padding: 0 20px;
  }
  
  .detail-layout {
    padding: 20px;
  }
  
  .model-preview-container {
    padding: 20px;
  }
  
  .model-info-card {
    padding: 20px;
  }
  
  .model-title {
    font-size: 24px;
  }
  
  .section-subtitle {
    font-size: 18px;
  }
  
  .model-actions {
    flex-direction: column;
  }
  
  .model-meta {
    grid-template-columns: 1fr;
  }
}
</style>