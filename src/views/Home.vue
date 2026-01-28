<template>
  <div class="home">
    <section class="models-section">
      <div class="models-container">
        <div class="models-grid">
          <div 
            v-for="(model, index) in models" 
            :key="index"
            class="model-card"
            @mouseenter="hoveredModel = index"
            @mouseleave="hoveredModel = null"
          >
            <div class="model-card-inner">
              <div class="model-preview">
                <ModelViewer :model-name="model.name" :size="modelSize" :auto-rotate="true" />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 悬浮的信息显示控件 -->
      <div v-if="hoveredModel !== null" class="model-info-overlay">
        <div class="model-info-content">
          <h3 class="model-info-name">{{ models[hoveredModel].name }}</h3>
          <p class="model-info-description">{{ models[hoveredModel].description }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import ModelViewer from '../components/ModelViewer.vue'

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

// 计算模型大小，根据窗口宽度动态调整
const modelSize = computed(() => {
  // 基础大小
  let baseSize = 150
  
  // 根据窗口宽度调整
  if (windowWidth.value < 480) {
    baseSize = 80
  } else if (windowWidth.value < 768) {
    baseSize = 100
  } else if (windowWidth.value < 992) {
    baseSize = 120
  } else if (windowWidth.value < 1200) {
    baseSize = 130
  }
  
  return baseSize
})

// 模型数据
const models = ref([
  {
    name: '奥斯卡奖杯',
    description: '金色的奥斯卡奖杯模型，象征着电影界的最高荣誉',
    url: ''
  },
  {
    name: '鞋',
    description: '时尚的运动鞋模型，展示了现代 footwear 设计',
    url: ''
  },
  {
    name: '机械',
    description: '精密的机械装置模型，展示了工业设计的美感',
    url: ''
  },
  {
    name: '一棵树',
    description: '茂盛的树木模型，象征着自然与生命的力量',
    url: ''
  }
])

const hoveredModel = ref(null)
</script>

<style scoped>
.home {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

.models-section {
  margin-bottom: 150px;
  position: relative;
}

.models-container {
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

.models-grid {
  display: flex;
  gap: 15px;
  margin-bottom: 30px;
  flex-wrap: nowrap;
  height: 100%;
}

.model-card {
  flex: 1;
  min-width: 0;
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
  height: 100%;
}

.model-card:hover {
  transform: translateY(-10px);
}

.model-card-inner {
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

.model-card:hover .model-card-inner {
  background: var(--card-bg);
  box-shadow: 
    0 15px 50px var(--primary-glow),
    0 0 30px var(--secondary-glow);
  border-color: var(--border-color);
}

.model-preview {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  position: relative;
  flex: 1;
}

.hyper3d-badge {
  position: absolute;
  top: 15px;
  right: 15px;
  background: var(--primary-gradient);
  color: white;
  padding: 8px 16px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: bold;
  box-shadow: 0 4px 12px var(--primary-glow);
  z-index: 2;
}

.model-info-overlay {
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

.model-info-content {
  width: 100%;
}

.model-info-name {
  font-size: 24px;
  font-weight: bold;
  color: #ffffff;
  margin-bottom: 12px;
  text-shadow: 0 0 10px var(--primary-glow);
}

.model-info-description {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  margin-bottom: 20px;
}

.model-info-hyper3d {
  display: inline-block;
}

.hyper3d-tag {
  background: var(--primary-glow);
  border: 1px solid var(--border-color);
  color: #ffffff;
  padding: 8px 16px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.hyper3d-tag:hover {
  background: var(--primary-glow);
  border-color: var(--border-color);
}

@media (max-width: 1200px) {
  .models-container {
    padding: 25px;
  }
  
  .models-grid {
    gap: 12px;
  }
  
  .model-preview {
    padding: 18px;
  }
  
  .model-info-overlay {
    padding: 18px;
  }
  
  .model-info-name {
    font-size: 19px;
  }
  
  .model-info-description {
    font-size: 14px;
  }
}

@media (max-width: 992px) {
  .models-container {
    padding: 20px;
  }
  
  .models-grid {
    gap: 10px;
  }
  
  .model-preview {
    padding: 15px;
  }
  
  .model-info-overlay {
    padding: 15px;
  }
  
  .model-info-name {
    font-size: 17px;
  }
  
  .model-info-description {
    font-size: 13px;
  }
}

@media (max-width: 768px) {
  .models-container {
    padding: 18px 15px;
  }
  
  .models-grid {
    gap: 8px;
  }
  
  .model-preview {
    padding: 12px;
  }
  
  .model-info-overlay {
    padding: 12px;
  }
  
  .model-info-name {
    font-size: 15px;
  }
  
  .model-info-description {
    font-size: 12px;
  }
  
  .hyper3d-badge {
    font-size: 10px;
    padding: 5px 10px;
  }
}

@media (max-width: 480px) {
  .models-container {
    padding: 15px 10px;
  }
  
  .models-grid {
    gap: 6px;
  }
  
  .model-preview {
    padding: 10px;
  }
  
  .model-info-overlay {
    padding: 10px;
  }
  
  .model-info-name {
    font-size: 14px;
  }
  
  .model-info-description {
    font-size: 11px;
  }
  
  .hyper3d-badge {
    font-size: 8px;
    padding: 4px 8px;
  }
}
</style>
