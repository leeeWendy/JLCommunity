<template>
  <div class="assets">
    <section class="hero">
      <div class="hero-bg"></div>
      <div class="hero-content">
        <div class="hero-content-inner">
          <h1 class="hero-title">
            <span class="hero-title-gradient">Hyper3D</span>
            <span class="hero-title-sub">资产平台</span>
            <div class="hero-title-glow"></div>
          </h1>
          <p class="hero-description">
            管理、展示和分享您的三维资产，提供沉浸式的浏览体验
          </p>
          <div class="hero-buttons">
            <router-link to="/admin" class="btn btn-primary">
              <span class="btn-icon">📤</span>
              <span class="btn-text">上传模型</span>
              <div class="btn-glow"></div>
            </router-link>
            <a href="#models" class="btn btn-secondary">
              <span class="btn-icon">👁️</span>
              <span class="btn-text">浏览模型</span>
              <div class="btn-glow"></div>
            </a>
            <router-link to="/collection" class="btn btn-secondary">
              <span class="btn-icon">🎨</span>
              <span class="btn-text">3D产品集合</span>
              <div class="btn-glow"></div>
            </router-link>
          </div>
          <div class="hero-stats">
            <div class="stat-item">
              <div class="stat-number" ref="statModels">{{ models.length }}</div>
              <div class="stat-label">模型数量</div>
              <div class="stat-glow"></div>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-item">
              <div class="stat-number" ref="statUsers">1000+</div>
              <div class="stat-label">用户使用</div>
              <div class="stat-glow"></div>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-item">
              <div class="stat-number" ref="statUptime">99.9%</div>
              <div class="stat-label">系统稳定性</div>
              <div class="stat-glow"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="hero-preview">
        <div class="hero-preview-container">
          <ModelViewer :model-url="previewModelUrl" :size="350" />
          <div class="hero-preview-glow"></div>
        </div>
      </div>
    </section>

    <section id="models" class="models-section">
      <div class="section-header">
        <h2 class="section-title">
          精选模型
          <div class="section-title-glow"></div>
        </h2>
        <p class="section-description">
          浏览我们的三维资产库，发现高质量的3D模型
        </p>
      </div>
      <div class="models-grid">
        <div 
          v-for="model in models" 
          :key="model.id"
          class="model-card"
          @mouseenter="hoveredModel = model.id"
          @mouseleave="hoveredModel = null"
        >
          <div class="model-card-inner">
            <div class="model-preview">
              <div class="model-preview-container">
                <ModelViewer :model-url="model.url" />
                <div class="model-preview-glow"></div>
              </div>
              <div class="model-overlay">
                <button class="overlay-btn" @click="viewModel(model.id)">
                  <span class="overlay-btn-icon">👁️</span>
                  <span class="overlay-btn-text">查看</span>
                  <div class="overlay-btn-glow"></div>
                </button>
                <button class="overlay-btn" @click="downloadModel(model.id)">
                  <span class="overlay-btn-icon">💾</span>
                  <span class="overlay-btn-text">下载</span>
                  <div class="overlay-btn-glow"></div>
                </button>
              </div>
            </div>
            <div class="model-info">
              <h3 class="model-name">{{ model.name }}</h3>
              <p class="model-description">{{ model.description }}</p>
              <div class="model-meta">
                <span class="model-date">{{ model.uploadDate }}</span>
                <span class="model-size">{{ model.fileSize }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="models.length === 0" class="empty-state">
        <div class="empty-state-icon">📦</div>
        <h3 class="empty-state-title">暂无模型</h3>
        <p class="empty-state-description">上传您的第一个3D模型开始使用</p>
        <router-link to="/admin" class="btn btn-primary">
          <span class="btn-icon">📤</span>
          <span class="btn-text">上传模型</span>
        </router-link>
      </div>
    </section>

    <section class="features-section">
      <div class="section-header">
        <h2 class="section-title">
          核心功能
          <div class="section-title-glow"></div>
        </h2>
        <p class="section-description">
          Hyper3D资产平台提供强大的功能，满足您的三维资产管理需求
        </p>
      </div>
      <div class="features-grid">
        <div class="feature-card">
          <div class="feature-icon-container">
            <div class="feature-icon">📤</div>
            <div class="feature-icon-glow"></div>
          </div>
          <h3 class="feature-title">简单上传</h3>
          <p class="feature-description">
            支持多种3D模型格式，一键上传，快速开始
          </p>
          <div class="feature-card-glow"></div>
        </div>
        <div class="feature-card">
          <div class="feature-icon-container">
            <div class="feature-icon">👁️</div>
            <div class="feature-icon-glow"></div>
          </div>
          <h3 class="feature-title">实时预览</h3>
          <p class="feature-description">
            上传后立即预览模型效果，支持360°旋转查看
          </p>
          <div class="feature-card-glow"></div>
        </div>
        <div class="feature-card">
          <div class="feature-icon-container">
            <div class="feature-icon">📁</div>
            <div class="feature-icon-glow"></div>
          </div>
          <h3 class="feature-title">智能管理</h3>
          <p class="feature-description">
            分类管理您的模型，快速查找和组织资产
          </p>
          <div class="feature-card-glow"></div>
        </div>
        <div class="feature-card">
          <div class="feature-icon-container">
            <div class="feature-icon">💾</div>
            <div class="feature-icon-glow"></div>
          </div>
          <h3 class="feature-title">安全存储</h3>
          <p class="feature-description">
            云端安全存储，确保您的资产安全可靠
          </p>
          <div class="feature-card-glow"></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import ModelViewer from '../components/ModelViewer.vue'
import store from '../store'

const router = useRouter()

// 使用全局模型数据
const models = store.models.value
const hoveredModel = ref(null)

// 预览模型URL
const previewModelUrl = computed(() => {
  return '../Model/4 U盘装配打标产线.glb'
})

// 统计数据引用
const statModels = ref(null)
const statUsers = ref(null)
const statUptime = ref(null)

// 数字动画效果
const animateValue = (element, target, duration = 2000) => {
  if (!element) return
  
  const start = 0
  const increment = target / (duration / 16)
  let current = start
  
  const timer = setInterval(() => {
    current += increment
    if (current >= target) {
      current = target
      clearInterval(timer)
    }
    
    if (element === statUptime.value) {
      element.textContent = '99.9%'
      clearInterval(timer)
    } else if (element === statUsers.value) {
      element.textContent = Math.floor(current) + '+'
    } else {
      element.textContent = Math.floor(current)
    }
  }, 16)
}

// 初始化动画
onMounted(() => {
  setTimeout(() => {
    animateValue(statModels.value, models.length)
    animateValue(statUsers.value, 1000)
    animateValue(statUptime.value, 99.9)
  }, 500)
})

const viewModel = (modelId) => {
  console.log('查看模型:', modelId)
  // 跳转到模型详情页面
  router.push(`/model/${modelId}`)
}

const downloadModel = (modelId) => {
  console.log('下载模型:', modelId)
  // 这里可以实现模型下载功能
}
</script>

<style scoped>
.assets {
  max-width: 1400px;
  margin: 0 auto;
}

.hero {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 80px;
  margin-bottom: 120px;
  padding: 100px;
  background: var(--card-bg);
  backdrop-filter: blur(20px);
  border-radius: 32px;
  border: 1px solid var(--border-color);
  position: relative;
  overflow: hidden;
  box-shadow: 
    0 20px 60px rgba(0, 0, 0, 0.4),
    0 0 40px var(--primary-glow);
}

.hero-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 30%, var(--primary-glow) 0%, transparent 50%),
    radial-gradient(circle at 80% 70%, var(--secondary-glow) 0%, transparent 50%),
    linear-gradient(135deg, var(--primary-glow) 0%, var(--secondary-glow) 100%);
  animation: heroPulse 8s ease-in-out infinite;
  pointer-events: none;
  opacity: 0.15;
}

@keyframes heroPulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

.hero-content {
  flex: 1;
  position: relative;
  z-index: 1;
}

.hero-content-inner {
  position: relative;
}

.hero-title {
  font-size: 72px;
  font-weight: bold;
  margin-bottom: 30px;
  line-height: 1.1;
  position: relative;
}

.hero-title-gradient {
    background: var(--primary-gradient);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-shadow: 0 0 40px var(--primary-glow);
    display: block;
  }

  .hero-title-sub {
    font-size: 36px;
    color: rgba(255, 255, 255, 0.9);
    display: block;
    margin-top: 10px;
    text-shadow: 0 0 20px var(--primary-glow);
  }

  .hero-title-glow {
    position: absolute;
    top: -20px;
    left: -20px;
    right: -20px;
    bottom: -20px;
    background: var(--primary-gradient);
    filter: blur(40px);
    opacity: 0.2;
    z-index: -1;
    animation: titleGlow 4s ease-in-out infinite;
  }

@keyframes titleGlow {
  0%, 100% {
    opacity: 0.2;
    transform: scale(0.9);
  }
  50% {
    opacity: 0.3;
    transform: scale(1.05);
  }
}

.hero-description {
  font-size: 22px;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 50px;
  line-height: 1.6;
  max-width: 600px;
  text-shadow: 0 0 10px rgba(102, 126, 234, 0.2);
}

.hero-buttons {
  display: flex;
  gap: 24px;
  margin-bottom: 70px;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 20px 40px;
  border-radius: 20px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
  font-size: 16px;
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
  transition: left 0.6s ease;
  z-index: -1;
}

.btn:hover::before {
  left: 100%;
}

.btn-primary {
    background: var(--primary-gradient);
    color: #ffffff;
    border: none;
    box-shadow: 
      0 10px 30px var(--primary-glow),
      0 0 20px var(--secondary-glow);
  }

  .btn-primary:hover {
    transform: translateY(-4px);
    box-shadow: 
      0 15px 40px var(--primary-glow),
      0 0 30px var(--secondary-glow);
  }

  .btn-secondary {
    background: rgba(255, 255, 255, 0.1);
    color: #ffffff;
    border: 1px solid var(--border-color);
    backdrop-filter: blur(10px);
  }

  .btn-secondary:hover {
    background: var(--primary-glow);
    border-color: var(--border-color);
    transform: translateY(-3px);
    box-shadow: 
      0 10px 30px var(--primary-glow),
      0 0 20px var(--secondary-glow);
  }

.btn-icon {
  font-size: 20px;
  transition: transform 0.3s ease;
}

.btn:hover .btn-icon {
  transform: scale(1.1);
}

.btn-text {
  transition: transform 0.3s ease;
}

.btn:hover .btn-text {
  transform: scale(1.05);
}

.btn-glow {
    position: absolute;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
    background: var(--primary-gradient);
    filter: blur(20px);
    opacity: 0;
    z-index: -1;
    border-radius: 25px;
    transition: opacity 0.4s ease;
  }

.btn:hover .btn-glow {
  opacity: 0.3;
}

.hero-stats {
    display: flex;
    align-items: center;
    gap: 50px;
    padding: 30px;
    background: var(--card-bg);
    backdrop-filter: blur(15px);
    border-radius: 20px;
    border: 1px solid var(--border-color);
    box-shadow: 
      0 8px 30px rgba(0, 0, 0, 0.3),
      0 0 20px var(--primary-glow);
  }

.stat-item {
  text-align: center;
  position: relative;
  padding: 20px;
}

.stat-number {
    font-size: 32px;
    font-weight: bold;
    color: #ffffff;
    margin-bottom: 8px;
    text-shadow: 0 0 20px var(--primary-glow);
    transition: transform 0.3s ease;
  }

.stat-item:hover .stat-number {
  transform: scale(1.1);
}

.stat-label {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  transition: color 0.3s ease;
}

.stat-item:hover .stat-label {
  color: rgba(255, 255, 255, 0.9);
}

.stat-glow {
  position: absolute;
  top: -5px;
  left: -5px;
  right: -5px;
  bottom: -5px;
  background: var(--primary-gradient);
  filter: blur(15px);
  opacity: 0;
  z-index: -1;
  border-radius: 25px;
  transition: opacity 0.4s ease;
}

.stat-item:hover .stat-glow {
  opacity: 0.3;
}

.stat-divider {
  width: 1px;
  height: 60px;
  background: linear-gradient(180deg, transparent, var(--primary-glow), transparent);
}

.hero-preview {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 1;
}

.hero-preview-container {
    position: relative;
    border-radius: 32px;
    overflow: hidden;
    box-shadow: 
      0 20px 60px rgba(0, 0, 0, 0.4),
      0 0 40px var(--primary-glow);
  }

.hero-preview-glow {
  position: absolute;
  top: -20px;
  left: -20px;
  right: -20px;
  bottom: -20px;
  background: var(--primary-gradient);
  filter: blur(40px);
  opacity: 0.3;
  z-index: -1;
  animation: previewGlow 4s ease-in-out infinite;
}

@keyframes previewGlow {
  0%, 100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 0.4;
    transform: scale(1.05);
  }
}

.models-section {
  margin-bottom: 120px;
}

.section-header {
  text-align: center;
  margin-bottom: 70px;
  position: relative;
}

.section-title {
  font-size: 52px;
  font-weight: bold;
  margin-bottom: 20px;
  background: linear-gradient(45deg, #ffffff, rgba(255, 255, 255, 0.8));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  position: relative;
  display: inline-block;
}

.section-title-glow {
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  background: var(--primary-gradient);
  filter: blur(30px);
  opacity: 0.3;
  z-index: -1;
  animation: sectionGlow 4s ease-in-out infinite;
}

@keyframes sectionGlow {
  0%, 100% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.4;
  }
}

.section-description {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.8);
  max-width: 800px;
  margin: 0 auto;
  text-shadow: 0 0 10px var(--primary-glow);
}

.models-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
  gap: 50px;
}

.model-card {
  perspective: 1000px;
  height: 100%;
}

.model-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.6s ease;
  transform-style: preserve-3d;
  background: var(--card-bg);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  border: 1px solid var(--border-color);
  overflow: hidden;
  box-shadow: 
    0 10px 40px rgba(0, 0, 0, 0.3),
    0 0 20px var(--primary-glow);
}

.model-card:hover .model-card-inner {
  transform: translateY(-15px) rotateX(5deg);
  box-shadow: 
    0 25px 70px var(--primary-glow),
    0 0 40px var(--secondary-glow);
  border-color: var(--border-color);
}

.model-preview {
  position: relative;
  width: 100%;
  height: 260px;
  background: var(--card-bg);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.model-preview-container {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.model-preview-glow {
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  background: var(--primary-gradient);
  filter: blur(20px);
  opacity: 0.2;
  z-index: -1;
  animation: modelPreviewGlow 6s ease-in-out infinite;
}

@keyframes modelPreviewGlow {
  0%, 100% {
    opacity: 0.2;
  }
  50% {
    opacity: 0.3;
  }
}

.model-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--card-bg);
  backdrop-filter: blur(15px);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 25px;
  opacity: 0;
  transition: opacity 0.4s ease;
  border-top: 1px solid var(--border-color);
}

.model-card:hover .model-overlay {
  opacity: 1;
}

.overlay-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 28px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  color: #ffffff;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
}

.overlay-btn:hover {
  background: var(--primary-glow);
  border-color: var(--border-color);
  transform: translateY(-3px);
  box-shadow: 
    0 10px 30px var(--primary-glow),
    0 0 20px var(--secondary-glow);
}

.overlay-btn-icon {
  font-size: 18px;
  transition: transform 0.3s ease;
}

.overlay-btn:hover .overlay-btn-icon {
  transform: scale(1.1);
}

.overlay-btn-glow {
  position: absolute;
  top: -5px;
  left: -5px;
  right: -5px;
  bottom: -5px;
  background: var(--primary-gradient);
  filter: blur(15px);
  opacity: 0;
  z-index: -1;
  border-radius: 20px;
  transition: opacity 0.3s ease;
}

.overlay-btn:hover .overlay-btn-glow {
  opacity: 0.3;
}

.model-info {
  padding: 36px;
}

.model-name {
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 16px;
  color: #ffffff;
  text-shadow: 0 0 10px var(--primary-glow);
  transition: transform 0.3s ease;
}

.model-card:hover .model-name {
  transform: translateY(-2px);
}

.model-description {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 24px;
  line-height: 1.6;
  transition: color 0.3s ease;
}

.model-card:hover .model-description {
  color: rgba(255, 255, 255, 0.9);
}

.model-meta {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.6);
  padding-top: 20px;
  border-top: 1px solid var(--border-color);
  transition: color 0.3s ease;
}

.model-card:hover .model-meta {
  color: rgba(255, 255, 255, 0.7);
}

.features-section {
  margin-bottom: 120px;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 50px;
}

.feature-card {
  padding: 48px;
  background: var(--card-bg);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  border: 1px solid var(--border-color);
  text-align: center;
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
  box-shadow: 
    0 10px 40px rgba(0, 0, 0, 0.3),
    0 0 20px var(--primary-glow);
}

.feature-card:hover {
  transform: translateY(-15px);
  box-shadow: 
    0 25px 70px var(--primary-glow),
    0 0 40px var(--secondary-glow);
  border-color: var(--border-color);
}

.feature-icon-container {
  position: relative;
  display: inline-block;
  margin-bottom: 30px;
}

.feature-icon {
  font-size: 56px;
  margin-bottom: 30px;
  display: block;
  transition: transform 0.3s ease;
}

.feature-card:hover .feature-icon {
  transform: scale(1.1);
}

.feature-icon-glow {
  position: absolute;
  top: -15px;
  left: -15px;
  right: -15px;
  bottom: -15px;
  background: var(--primary-gradient);
  filter: blur(25px);
  opacity: 0;
  z-index: -1;
  border-radius: 50%;
  transition: opacity 0.4s ease;
}

.feature-card:hover .feature-icon-glow {
  opacity: 0.3;
}

.feature-title {
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #ffffff;
  text-shadow: 0 0 10px var(--primary-glow);
  transition: transform 0.3s ease;
}

.feature-card:hover .feature-title {
  transform: translateY(-2px);
}

.feature-description {
  font-size: 15px;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  transition: color 0.3s ease;
}

.feature-card:hover .feature-description {
  color: rgba(255, 255, 255, 0.9);
}

.feature-card-glow {
  position: absolute;
  top: -20px;
  left: -20px;
  right: -20px;
  bottom: -20px;
  background: var(--primary-gradient);
  filter: blur(40px);
  opacity: 0;
  z-index: -1;
  border-radius: 40px;
  transition: opacity 0.4s ease;
}

.feature-card:hover .feature-card-glow {
  opacity: 0.2;
}

.empty-state {
  text-align: center;
  padding: 100px 50px;
  background: var(--card-bg);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  border: 2px dashed var(--border-color);
  margin-top: 50px;
  box-shadow: 
    0 10px 40px rgba(0, 0, 0, 0.3),
    0 0 20px var(--primary-glow);
}

.empty-state-icon {
  font-size: 72px;
  margin-bottom: 30px;
  display: block;
  animation: bounce 2s ease-in-out infinite;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.empty-state-title {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #ffffff;
  text-shadow: 0 0 10px var(--primary-glow);
}

.empty-state-description {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 40px;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
}

@media (max-width: 1200px) {
  .hero {
    flex-direction: column;
    text-align: center;
    gap: 80px;
  }
  
  .hero-content {
    order: 2;
  }
  
  .hero-preview {
    order: 1;
  }
  
  .hero-stats {
    justify-content: center;
  }
  
  .hero-description {
    margin: 0 auto 50px;
  }
}

@media (max-width: 768px) {
  .hero {
    padding: 80px 40px;
    margin-bottom: 80px;
  }
  
  .hero-title {
    font-size: 56px;
  }
  
  .hero-title-sub {
    font-size: 28px;
  }
  
  .hero-description {
    font-size: 18px;
  }
  
  .hero-buttons {
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
  
  .hero-stats {
    flex-direction: column;
    gap: 30px;
  }
  
  .stat-divider {
    width: 100px;
    height: 1px;
  }
  
  .models-section {
    margin-bottom: 80px;
  }
  
  .section-title {
    font-size: 40px;
  }
  
  .models-grid {
    gap: 30px;
  }
  
  .features-section {
    margin-bottom: 80px;
  }
  
  .features-grid {
    gap: 30px;
  }
}

@media (max-width: 480px) {
  .hero {
    padding: 60px 20px;
  }
  
  .hero-title {
    font-size: 44px;
  }
  
  .hero-title-sub {
    font-size: 24px;
  }
  
  .models-grid {
    grid-template-columns: 1fr;
  }
  
  .model-info {
    padding: 28px;
  }
  
  .feature-card {
    padding: 36px;
  }
  
  .empty-state {
    padding: 80px 20px;
  }
}
</style>