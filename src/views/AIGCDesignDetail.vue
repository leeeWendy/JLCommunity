<template>
  <div class="aigc-design-detail">
    <section class="detail-header">
      <button class="back-button" @click="goBack">
        <span class="back-icon">←</span>
        <span>返回作品列表</span>
      </button>
      <h1 class="detail-title">{{ design?.title }}</h1>
    </section>

    <section class="detail-content">
      <div class="detail-main">
        <div class="design-preview-large">
          <img :src="design?.image" :alt="design?.title" class="design-image-large">
        </div>
        
        <div class="design-info-detail">
          <h2 class="design-title-detail">{{ design?.title }}</h2>
          <p class="design-description-detail">{{ design?.description }}</p>
          
          <div class="design-meta">
            <div class="meta-section">
              <h3 class="meta-title">设计标签</h3>
              <div class="design-tags-detail">
                <span class="tag-detail" v-for="(tag, tagIndex) in design?.tags" :key="tagIndex">{{ tag }}</span>
              </div>
            </div>
            
            <div class="meta-section">
              <h3 class="meta-title">设计工具</h3>
              <p class="meta-content">AI设计助手 + 专业设计软件</p>
            </div>
            
            <div class="meta-section">
              <h3 class="meta-title">设计风格</h3>
              <p class="meta-content">{{ getDesignStyle(design?.tags) }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="design-details">
        <section class="detail-section">
          <h3 class="section-title">设计理念</h3>
          <p class="section-content">
            本设计融合了现代美学与人工智能技术，通过AI辅助创作，实现了创意与技术的完美结合。
            设计过程中充分考虑了用户体验与视觉效果，旨在为目标受众提供独特而专业的视觉解决方案。
          </p>
        </section>

        <section class="detail-section">
          <h3 class="section-title">技术实现</h3>
          <p class="section-content">
            利用先进的AI生成模型，结合设计师的专业判断，通过多轮迭代优化，最终完成了这一作品。
            设计过程中使用了多种专业工具和技术，确保了作品的质量和专业性。
          </p>
        </section>

        <section class="detail-section">
          <h3 class="section-title">应用场景</h3>
          <p class="section-content">
            该设计适用于多种应用场景，包括品牌宣传、产品展示、数字营销等领域。
            其独特的视觉风格和专业的设计水准，能够有效提升品牌形象和市场竞争力。
          </p>
        </section>
      </div>
    </section>

    <section class="related-designs">
      <h2 class="related-title">相关作品</h2>
      <div class="related-grid">
        <div 
          v-for="relatedDesign in relatedDesigns" 
          :key="relatedDesign.id"
          class="related-card"
          @click="navigateToDetail(relatedDesign.id)"
        >
          <div class="related-preview">
            <img :src="relatedDesign.image" :alt="relatedDesign.title" class="related-image">
          </div>
          <h4 class="related-design-title">{{ relatedDesign.title }}</h4>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const designId = route.params.id

// 设计作品数据
const designs = ref([
  {
    id: 1,
    title: '未来科技风格UI设计',
    description: '融合AI元素的现代用户界面设计，展现科技感与未来感',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20UI%20design%20with%20AI%20elements%2C%20futuristic%20technology%20style%2C%20clean%20interface%2C%20blue%20and%20purple%20color%20scheme&image_size=landscape_16_9',
    tags: ['UI设计', '科技感', '未来风']
  },
  {
    id: 2,
    title: '智能产品包装设计',
    description: 'AI生成的产品包装设计，结合品牌元素与现代审美',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=product%20packaging%20design%20generated%20by%20AI%2C%20modern%20aesthetic%2C%20clean%20lines%2C%20vibrant%20colors&image_size=landscape_16_9',
    tags: ['包装设计', '品牌设计', '现代风格']
  },
  {
    id: 3,
    title: '数字艺术创作',
    description: 'AI辅助创作的数字艺术作品，展现独特的视觉风格',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=digital%20art%20creation%20with%20AI%20assistance%2C%20unique%20visual%20style%2C%20abstract%20elements%2C%20vibrant%20colors&image_size=landscape_16_9',
    tags: ['数字艺术', 'AI创作', '抽象风格']
  },
  {
    id: 4,
    title: '品牌标识设计',
    description: 'AI生成的品牌标识设计，简洁有力，易于识别',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=brand%20logo%20design%20generated%20by%20AI%2C%20clean%20and%20powerful%2C%20easy%20to%20recognize%2C%20modern%20style&image_size=landscape_16_9',
    tags: ['标志设计', '品牌识别', '简洁风格']
  },
  {
    id: 5,
    title: '营销海报设计',
    description: 'AI辅助创作的营销海报，吸引眼球，传达核心信息',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=marketing%20poster%20design%20with%20AI%20assistance%2C%20eye-catching%2C%20core%20message%20delivery%2C%20vibrant%20colors&image_size=landscape_16_9',
    tags: ['海报设计', '营销设计', '视觉传达']
  },
  {
    id: 6,
    title: '网页界面设计',
    description: 'AI生成的网页界面设计，用户友好，视觉吸引力强',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=web%20interface%20design%20generated%20by%20AI%2C%20user-friendly%2C%20visually%20appealing%2C%20modern%20layout&image_size=landscape_16_9',
    tags: ['网页设计', '用户体验', '现代布局']
  }
])

// 当前设计作品
const design = computed(() => {
  return designs.value.find(d => d.id === parseInt(designId))
})

// 相关作品
const relatedDesigns = computed(() => {
  return designs.value.filter(d => d.id !== parseInt(designId)).slice(0, 3)
})

// 返回上一页
const goBack = () => {
  router.push('/aigc')
}

// 导航到详情页
const navigateToDetail = (id) => {
  router.push(`/aigc/design/${id}`)
}

// 获取设计风格
const getDesignStyle = (tags) => {
  if (!tags) return ''
  return tags.join('、')
}
</script>

<style scoped>
.aigc-design-detail {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

/* 头部样式 */
.detail-header {
  margin-bottom: 60px;
  position: relative;
}

.back-button {
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 10px 16px;
  color: #ffffff;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 
    0 4px 15px rgba(0, 0, 0, 0.3),
    0 0 10px var(--primary-glow);
  margin-bottom: 30px;
}

.back-button:hover {
  transform: translateX(-5px);
  box-shadow: 
    0 6px 20px rgba(0, 0, 0, 0.4),
    0 0 15px var(--primary-glow);
}

.back-icon {
  font-size: 16px;
  font-weight: bold;
}

.detail-title {
  font-size: 36px;
  font-weight: bold;
  color: #ffffff;
  text-shadow: 0 0 20px var(--primary-glow);
  margin: 0;
  background: var(--primary-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* 内容样式 */
.detail-content {
  margin-bottom: 80px;
}

.detail-main {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  margin-bottom: 60px;
  align-items: start;
}

.design-preview-large {
  background: rgba(15, 15, 35, 0.5);
  border-radius: 20px;
  padding: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 
    0 15px 50px rgba(0, 0, 0, 0.4),
    0 0 30px var(--primary-glow);
  border: 1px solid var(--border-color);
}

.design-image-large {
  max-width: 100%;
  max-height: 400px;
  border-radius: 16px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.5);
}

.design-info-detail {
  background: var(--card-bg);
  backdrop-filter: blur(25px);
  border-radius: 20px;
  padding: 30px;
  border: 1px solid var(--border-color);
  box-shadow: 
    0 15px 50px rgba(0, 0, 0, 0.4),
    0 0 30px var(--primary-glow);
}

.design-title-detail {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 15px;
  color: #ffffff;
  text-shadow: 0 0 10px var(--primary-glow);
}

.design-description-detail {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 30px;
  line-height: 1.6;
}

.design-meta {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.meta-section {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 15px;
}

.meta-section:last-child {
  border-bottom: none;
}

.meta-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
  color: rgba(255, 255, 255, 0.9);
}

.design-tags-detail {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.tag-detail {
  background: var(--primary-glow);
  color: rgba(255, 255, 255, 0.9);
  padding: 6px 14px;
  border-radius: 16px;
  font-size: 13px;
  font-weight: 500;
  border: 1px solid var(--border-color);
}

.meta-content {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
}

/* 详细信息部分 */
.design-details {
  background: var(--card-bg);
  backdrop-filter: blur(25px);
  border-radius: 20px;
  padding: 30px;
  border: 1px solid var(--border-color);
  box-shadow: 
    0 15px 50px rgba(0, 0, 0, 0.4),
    0 0 30px var(--primary-glow);
}

.detail-section {
  margin-bottom: 30px;
  padding-bottom: 30px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.detail-section:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}

.section-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 15px;
  color: #ffffff;
  text-shadow: 0 0 10px var(--primary-glow);
}

.section-content {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
}

/* 相关作品部分 */
.related-designs {
  margin-bottom: 80px;
}

.related-title {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 40px;
  color: #ffffff;
  text-shadow: 0 0 20px var(--primary-glow);
  text-align: center;
}

.related-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
}

.related-card {
  background: var(--card-bg);
  backdrop-filter: blur(25px);
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid var(--border-color);
  transition: all 0.3s ease;
  cursor: pointer;
  box-shadow: 
    0 8px 25px rgba(0, 0, 0, 0.3),
    0 0 15px var(--primary-glow);
}

.related-card:hover {
  transform: translateY(-8px);
  box-shadow: 
    0 12px 35px rgba(0, 0, 0, 0.4),
    0 0 20px var(--primary-glow);
}

.related-preview {
  padding: 15px;
  background: rgba(15, 15, 35, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 150px;
}

.related-image {
  max-width: 100%;
  max-height: 100%;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.related-design-title {
  font-size: 16px;
  font-weight: bold;
  margin: 15px;
  color: #ffffff;
  text-shadow: 0 0 8px var(--primary-glow);
  text-align: center;
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .aigc-design-detail {
    padding: 30px 15px;
  }
  
  .detail-main {
    grid-template-columns: 1fr;
    gap: 30px;
  }
  
  .design-preview-large {
    padding: 20px;
  }
  
  .design-image-large {
    max-height: 350px;
  }
}

@media (max-width: 768px) {
  .detail-header {
    margin-bottom: 40px;
  }
  
  .detail-title {
    font-size: 28px;
  }
  
  .design-info-detail {
    padding: 20px;
  }
  
  .design-title-detail {
    font-size: 20px;
  }
  
  .design-details {
    padding: 20px;
  }
  
  .related-grid {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
  }
}

@media (max-width: 480px) {
  .aigc-design-detail {
    padding: 20px 10px;
  }
  
  .detail-title {
    font-size: 24px;
  }
  
  .back-button {
    padding: 8px 12px;
    font-size: 13px;
  }
  
  .design-image-large {
    max-height: 250px;
  }
  
  .related-preview {
    height: 120px;
  }
}
</style>