<template>
  <div class="ai-short-video-detail">
    <section class="detail-header">
      <button class="back-button" @click="goBack">
        <span class="back-icon">←</span>
        <span>返回产品列表</span>
      </button>
      <h1 class="detail-title">{{ product?.name }}</h1>
    </section>

    <section class="detail-content">
      <div class="detail-main">
        <div class="product-preview-large">
          <div class="product-image-large" :style="{ backgroundImage: `url(${product?.image})` }"></div>
        </div>
        
        <div class="product-info-detail">
          <div class="detail-header-actions">
            <button 
              class="detail-like-button" 
              :class="{ 'liked': product?.liked }"
              @click="handleLike"
            >
              <svg class="heart-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
              <span>{{ product?.liked ? '已收藏' : '收藏' }}</span>
              <span class="like-count">({{ product?.likeCount }})</span>
            </button>
          </div>
          <h2 class="product-name-detail">{{ product?.name }}</h2>
          <p class="product-description-detail">{{ product?.description }}</p>
          
          <div class="product-meta">
            <div class="meta-section">
              <h3 class="meta-title">核心功能</h3>
              <div class="product-features-detail">
                <span class="feature-tag-detail" v-for="(feature, featureIndex) in product?.features" :key="featureIndex">{{ feature }}</span>
              </div>
            </div>
            
            <div class="meta-section">
              <h3 class="meta-title">技术特点</h3>
              <p class="meta-content">AI智能处理 + 专业视频制作技术</p>
            </div>
            
            <div class="meta-section">
              <h3 class="meta-title">适用场景</h3>
              <p class="meta-content">{{ getUseCases(product?.name) }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="product-details">
        <section class="detail-section">
          <h3 class="section-title">产品介绍</h3>
          <p class="section-content">
            {{ product?.name }}是一款基于人工智能技术的短视频制作工具，专为快速创建高质量视频内容而设计。
            该产品利用先进的AI算法，从内容生成到后期处理，全流程智能化，大大减少了传统视频制作的时间和人力成本。
          </p>
        </section>

        <section class="detail-section">
          <h3 class="section-title">技术实现</h3>
          <p class="section-content">
            采用深度学习和计算机视觉技术，实现智能内容识别、自动剪辑、智能配乐等功能。
            产品支持多种视频格式和分辨率，可根据不同平台的需求自动适配输出参数，确保最佳观看效果。
          </p>
        </section>

        <section class="detail-section">
          <h3 class="section-title">使用流程</h3>
          <ol class="process-list">
            <li class="process-item">输入需求描述或上传素材</li>
            <li class="process-item">AI智能分析并生成视频方案</li>
            <li class="process-item">预览并调整视频内容</li>
            <li class="process-item">一键导出高质量视频</li>
          </ol>
        </section>

        <section class="detail-section">
          <h3 class="section-title">优势特点</h3>
          <ul class="advantages-list">
            <li class="advantage-item">快速生成：几分钟内完成传统数小时的工作</li>
            <li class="advantage-item">智能优化：自动调整画面、音效和字幕</li>
            <li class="advantage-item">专业效果：生成媲美专业制作的视频质量</li>
            <li class="advantage-item">易于使用：无需专业技能，操作简单直观</li>
          </ul>
        </section>
      </div>
    </section>

    <section class="related-products">
      <h2 class="related-title">相关产品</h2>
      <div class="related-grid">
        <div 
          v-for="relatedProduct in relatedProducts" 
          :key="relatedProduct.id"
          class="related-card"
          @click="navigateToDetail(relatedProduct.id)"
        >
          <div class="related-preview">
            <div class="related-image" :style="{ backgroundImage: `url(${relatedProduct.image})` }"></div>
          </div>
          <h4 class="related-product-name">{{ relatedProduct.name }}</h4>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { toggleLike, initializeLikeCount, isLiked } from '../utils/likes'

const router = useRouter()
const route = useRoute()
const productId = route.params.id

const handleLike = () => {
  const result = toggleLike(`ai-short-video-${productId}`)
  if (currentProduct.value) {
    currentProduct.value.likeCount = result.count
    currentProduct.value.liked = result.liked
  }
}

const getUseCases = (productName) => {
  if (!productName) return ''
  
  const useCasesMap = {
    'AI创意短片': '创意内容、故事讲述、个人创作',
    'AI营销视频': '品牌推广、产品介绍、活动宣传',
    'AI短视频剪辑': '视频处理、内容制作、快速编辑',
    'AI字幕生成': '视频字幕、多语言翻译、内容无障碍'
  }
  
  return useCasesMap[productName] || '多种场景适用'
}

const currentProduct = ref({
  id: parseInt(productId),
  likeCount: initializeLikeCount(`ai-short-video-${productId}`, Math.floor(Math.random() * 100) + 20),
  liked: isLiked(`ai-short-video-${productId}`)
})

// 产品数据
const products = ref([
  {
    id: 1,
    name: 'AI创意短片',
    description: '根据文字描述自动生成创意短片，包含场景、角色和情节。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=AI%20short%20video%20creation%20interface%20with%20modern%20design%2C%20dark%20theme%2C%20futuristic%20elements&image_size=landscape_16_9',
    features: ['智能脚本', '自动分镜', '创意生成']
  },
  {
    id: 2,
    name: 'AI营销视频',
    description: '为产品和品牌快速制作专业的营销推广视频。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=AI%20marketing%20video%20generator%20with%20product%20showcase%2C%20dark%20background%2C%20modern%20UI&image_size=landscape_16_9',
    features: ['品牌定制', '产品展示', '营销模板']
  },
  {
    id: 3,
    name: 'AI短视频剪辑',
    description: '智能剪辑工具，自动处理视频素材，生成高质量成片。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=AI%20video%20editing%20software%20interface%2C%20timeline%2C%20effects%20panel%2C%20dark%20theme&image_size=landscape_16_9',
    features: ['自动剪辑', '智能转场', '特效添加']
  },
  {
    id: 4,
    name: 'AI字幕生成',
    description: '自动识别视频语音，生成精准字幕，支持多语言翻译。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=AI%20subtitle%20generator%20interface%2C%20text%20recognition%2C%20language%20translation%2C%20dark%20theme&image_size=landscape_16_9',
    features: ['语音识别', '多语言支持', '字幕样式']
  }
])

const product = computed(() => {
  const p = products.value.find(p => p.id === parseInt(productId))
  if (p) {
    p.likeCount = currentProduct.value.likeCount
    p.liked = currentProduct.value.liked
  }
  return p
})

// 相关产品
const relatedProducts = computed(() => {
  return products.value.filter(p => p.id !== parseInt(productId)).slice(0, 3)
})

// 返回上一页
const goBack = () => {
  router.push('/ai-short-video')
}

// 导航到详情页
const navigateToDetail = (id) => {
  router.push(`/ai-short-video/product/${id}`)
}
</script>

<style scoped>
.ai-short-video-detail {
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

.product-preview-large {
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

.product-image-large {
  width: 100%;
  height: 300px;
  background-size: cover;
  background-position: center;
  border-radius: 16px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.5);
}

.product-info-detail {
  background: var(--card-bg);
  backdrop-filter: blur(25px);
  border-radius: 20px;
  padding: 30px;
  border: 1px solid var(--border-color);
  box-shadow: 
    0 15px 50px rgba(0, 0, 0, 0.4),
    0 0 30px var(--primary-glow);
}

.detail-header-actions {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 16px;
}

.detail-like-button {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(15, 15, 35, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 6px 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  z-index: 10;
  color: rgba(255, 255, 255, 0.7);
  font-size: 13px;
  font-weight: 500;
}

.detail-like-button:hover {
  background: rgba(15, 15, 35, 0.8);
  border-color: rgba(255, 255, 255, 0.2);
  color: rgba(255, 255, 255, 0.9);
}

.detail-like-button.liked {
  background: rgba(255, 100, 100, 0.15);
  border-color: rgba(255, 100, 100, 0.3);
  color: #ff6b6b;
}

.detail-like-button.liked .heart-icon {
  fill: #ff6b6b;
  stroke: #ff6b6b;
}

.detail-like-button .heart-icon {
  width: 16px;
  height: 16px;
  stroke: rgba(255, 255, 255, 0.6);
  fill: transparent;
  transition: all 0.2s ease;
}

.detail-like-button .like-count {
  font-size: 12px;
  opacity: 0.9;
}

.product-name-detail {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 15px;
  color: #ffffff;
  text-shadow: 0 0 10px var(--primary-glow);
}

.product-description-detail {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 30px;
  line-height: 1.6;
}

.product-meta {
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

.product-features-detail {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.feature-tag-detail {
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
.product-details {
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

.process-list {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
  padding-left: 20px;
}

.process-item {
  margin-bottom: 10px;
}

.advantages-list {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
  padding-left: 20px;
}

.advantage-item {
  margin-bottom: 10px;
}

/* 相关产品部分 */
.related-products {
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
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.related-product-name {
  font-size: 16px;
  font-weight: bold;
  margin: 15px;
  color: #ffffff;
  text-shadow: 0 0 8px var(--primary-glow);
  text-align: center;
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .ai-short-video-detail {
    padding: 30px 15px;
  }
  
  .detail-main {
    grid-template-columns: 1fr;
    gap: 30px;
  }
  
  .product-preview-large {
    padding: 20px;
  }
  
  .product-image-large {
    height: 250px;
  }
}

@media (max-width: 768px) {
  .detail-header {
    margin-bottom: 40px;
  }
  
  .detail-title {
    font-size: 28px;
  }
  
  .product-info-detail {
    padding: 20px;
  }
  
  .product-name-detail {
    font-size: 20px;
  }
  
  .product-details {
    padding: 20px;
  }
  
  .related-grid {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
  }
}

@media (max-width: 480px) {
  .ai-short-video-detail {
    padding: 20px 10px;
  }
  
  .detail-title {
    font-size: 24px;
  }
  
  .back-button {
    padding: 8px 12px;
    font-size: 13px;
  }
  
  .product-image-large {
    height: 200px;
  }
  
  .related-preview {
    height: 120px;
  }
}
</style>