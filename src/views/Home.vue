<template>
  <div class="home">
    <section class="web-section">
      <div class="web-container">
        <div class="web-grid">
          <router-link 
            v-for="(web, index) in webItems" 
            :key="index"
            :to="web.path"
            class="web-card"
            @mouseenter="hoveredWeb = index"
            @mouseleave="hoveredWeb = null"
          >
            <div class="web-card-inner">
              <div class="web-preview">
                <span class="web-icon">{{ web.icon }}</span>
              </div>
            </div>
          </router-link>
        </div>
      </div>
      
      <!-- 悬浮的信息显示控件 -->
      <div v-if="hoveredWeb !== null" class="web-info-overlay">
        <div class="web-info-content">
          <h3 class="web-info-name">{{ webItems[hoveredWeb].name }}</h3>
          <p class="web-info-description">{{ webItems[hoveredWeb].description }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

// 窗口宽度响应式
const windowWidth = ref(window.innerWidth)

// 监听窗口大小变化
const handleResize = () => {
  windowWidth.value = window.innerWidth
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

// 计算图标大小，根据窗口宽度动态调整
const iconSize = computed(() => {
  // 基础大小
  let baseSize = 80
  
  // 根据窗口宽度调整
  if (windowWidth.value < 480) {
    baseSize = 50
  } else if (windowWidth.value < 768) {
    baseSize = 60
  } else if (windowWidth.value < 992) {
    baseSize = 70
  } else if (windowWidth.value < 1200) {
    baseSize = 75
  }
  
  return baseSize
})

// 网页图标数据
const webItems = ref([
  {
    name: 'AIGC设计',
    description: '人工智能生成内容设计平台，提供创意设计、图像生成等服务',
    path: '/aigc',
    icon: '🎨'
  },
  {
    name: '摄影航拍',
    description: '专业摄影与航拍服务，捕捉精彩瞬间，展现独特视角',
    path: '/photography-aerial',
    icon: '📸'
  },
  {
    name: 'AI短视频',
    description: '人工智能短视频制作平台，快速生成高质量视频内容',
    path: '/ai-short-video',
    icon: '🎬'
  },
  {
    name: '虚拟社区',
    description: '沉浸式虚拟社区体验，连接全球用户，共享创意与灵感',
    path: '/virtual-community',
    icon: '🌐'
  }
])

const hoveredWeb = ref(null)
</script>

<style scoped>
.home {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

.web-section {
  margin-bottom: 150px;
  position: relative;
}

.web-container {
  position: relative;
  background: var(--card-bg);
  backdrop-filter: blur(25px);
  border-radius: 24px;
  padding: 30px;
  box-shadow: 
    0 20px 60px rgba(0, 0, 0, 0.4),
    0 0 40px var(--primary-glow);
  border: 1px solid var(--border-color);
}

.web-grid {
  display: flex;
  gap: 15px;
  margin-bottom: 30px;
  flex-wrap: nowrap;
  height: 100%;
}

.web-card {
  flex: 1;
  min-width: 0;
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
  height: 100%;
  text-decoration: none;
}

.web-card:hover {
  transform: translateY(-10px);
}

.web-card-inner {
  position: relative;
  background: var(--card-bg);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  overflow: visible;
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--border-color);
}

.web-card:hover .web-card-inner {
  background: var(--card-bg);
  box-shadow: 
    0 15px 50px var(--primary-glow),
    0 0 30px var(--secondary-glow);
  border-color: var(--border-color);
}

.web-preview {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  position: relative;
  flex: 1;
}

.web-icon {
  font-size: 80px;
  transition: transform 0.3s ease;
}

.web-card:hover .web-icon {
  transform: scale(1.1);
}

.web-info-overlay {
  position: absolute;
  bottom: -100px;
  left: 0;
  right: 0;
  background: var(--card-bg);
  backdrop-filter: blur(25px);
  border-radius: 20px;
  padding: 20px;
  animation: infoSlideUp 0.3s ease;
  box-shadow: 
    0 15px 50px rgba(0, 0, 0, 0.4),
    0 0 30px var(--primary-glow);
  border: 1px solid var(--border-color);
  pointer-events: none;
  z-index: 10;
}

@keyframes infoSlideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.web-info-content {
  width: 100%;
}

.web-info-name {
  font-size: 24px;
  font-weight: bold;
  color: #ffffff;
  margin-bottom: 12px;
  text-shadow: 0 0 10px var(--primary-glow);
}

.web-info-description {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  margin-bottom: 20px;
}

@media (max-width: 1200px) {
  .web-container {
    padding: 25px;
  }
  
  .web-grid {
    gap: 12px;
  }
  
  .web-preview {
    padding: 18px;
  }
  
  .web-icon {
    font-size: 75px;
  }
  
  .web-info-overlay {
    padding: 18px;
  }
  
  .web-info-name {
    font-size: 19px;
  }
  
  .web-info-description {
    font-size: 14px;
  }
}

@media (max-width: 992px) {
  .web-container {
    padding: 20px;
  }
  
  .web-grid {
    gap: 10px;
  }
  
  .web-preview {
    padding: 15px;
  }
  
  .web-icon {
    font-size: 70px;
  }
  
  .web-info-overlay {
    padding: 15px;
  }
  
  .web-info-name {
    font-size: 17px;
  }
  
  .web-info-description {
    font-size: 13px;
  }
}

@media (max-width: 768px) {
  .web-container {
    padding: 18px 15px;
  }
  
  .web-grid {
    gap: 8px;
  }
  
  .web-preview {
    padding: 12px;
  }
  
  .web-icon {
    font-size: 60px;
  }
  
  .web-info-overlay {
    padding: 12px;
  }
  
  .web-info-name {
    font-size: 15px;
  }
  
  .web-info-description {
    font-size: 12px;
  }
}

@media (max-width: 480px) {
  .web-container {
    padding: 15px 10px;
  }
  
  .web-grid {
    gap: 6px;
  }
  
  .web-preview {
    padding: 10px;
  }
  
  .web-icon {
    font-size: 50px;
  }
  
  .web-info-overlay {
    padding: 10px;
  }
  
  .web-info-name {
    font-size: 14px;
  }
  
  .web-info-description {
    font-size: 11px;
  }
}
</style>
