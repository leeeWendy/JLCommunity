<template>
  <div class="aigc-design">
    <section class="aigc-header">
      <div class="header-content">
        <h1 class="aigc-title">
          <span class="title-glow">AIGC设计</span>
          <span class="title-sub">AI驱动的创意设计平台</span>
        </h1>
        <p class="aigc-description">
          探索人工智能与创意设计的完美结合，为您的项目提供无限可能的视觉解决方案
        </p>
      </div>
    </section>

    <section class="aigc-features">
      <div class="features-grid">
        <div class="feature-card">
          <div class="feature-icon">🎨</div>
          <h3 class="feature-title">智能创意生成</h3>
          <p class="feature-description">利用先进的AI算法，快速生成符合您需求的创意设计方案</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">⚡</div>
          <h3 class="feature-title">高效设计流程</h3>
          <p class="feature-description">自动化设计流程，减少手动操作，提高工作效率</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">🧠</div>
          <h3 class="feature-title">AI辅助创作</h3>
          <p class="feature-description">AI作为创意助手，与设计师协同工作，激发更多灵感</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">🔄</div>
          <h3 class="feature-title">快速迭代优化</h3>
          <p class="feature-description">根据反馈迅速调整设计，实现快速迭代和优化</p>
        </div>
      </div>
    </section>

    <section class="aigc-showcase">
      <h2 class="showcase-title">设计作品展示</h2>
      <div class="showcase-grid">
        <div 
            class="design-card" 
            v-for="(design, index) in designs" 
            :key="design.id"
            @click="navigateToDetail(design.id)"
          >
            <button 
              class="design-like-button" 
              :class="{ 'liked': design.liked }"
              @click.stop="handleLike(design)"
            >
              <svg class="heart-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
              <span class="like-count">{{ design.likeCount }}</span>
            </button>
            <div class="design-preview">
              <img :src="design.image" :alt="design.title" class="design-image">
            </div>
            <div class="design-info">
              <h3 class="design-title">{{ design.title }}</h3>
              <p class="design-description">{{ design.description }}</p>
              <div class="design-tags">
                <span class="tag" v-for="(tag, tagIndex) in design.tags" :key="tagIndex">{{ tag }}</span>
              </div>
            </div>
          </div>
      </div>
    </section>

    <section class="aigc-process">
      <h2 class="process-title">设计流程</h2>
      <div class="process-steps">
        <div class="process-step" v-for="(step, index) in processSteps" :key="index">
          <div class="step-number">{{ index + 1 }}</div>
          <h3 class="step-title">{{ step.title }}</h3>
          <p class="step-description">{{ step.description }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { toggleLike, initializeLikeCount, isLiked } from '../utils/likes'

const router = useRouter()

const navigateToDetail = (id) => {
  router.push(`/aigc/design/${id}`)
}

const handleLike = (design) => {
  const result = toggleLike(`aigc-design-${design.id}`)
  design.likeCount = result.count
  design.liked = result.liked
}

const designs = ref([
  {
    id: 1,
    title: '未来科技风格UI设计',
    description: '融合AI元素的现代用户界面设计，展现科技感与未来感',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20UI%20design%20with%20AI%20elements%2C%20futuristic%20technology%20style%2C%20clean%20interface%2C%20blue%20and%20purple%20color%20scheme&image_size=landscape_16_9',
    tags: ['UI设计', '科技感', '未来风'],
    likeCount: 0,
    liked: false
  },
  {
    id: 2,
    title: '智能产品包装设计',
    description: 'AI生成的产品包装设计，结合品牌元素与现代审美',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=product%20packaging%20design%20generated%20by%20AI%2C%20modern%20aesthetic%2C%20clean%20lines%2C%20vibrant%20colors&image_size=landscape_16_9',
    tags: ['包装设计', '品牌设计', '现代风格'],
    likeCount: 0,
    liked: false
  },
  {
    id: 3,
    title: '数字艺术创作',
    description: 'AI辅助创作的数字艺术作品，展现独特的视觉风格',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=digital%20art%20creation%20with%20AI%20assistance%2C%20unique%20visual%20style%2C%20abstract%20elements%2C%20vibrant%20colors&image_size=landscape_16_9',
    tags: ['数字艺术', 'AI创作', '抽象风格'],
    likeCount: 0,
    liked: false
  },
  {
    id: 4,
    title: '品牌标识设计',
    description: 'AI生成的品牌标识设计，简洁有力，易于识别',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=brand%20logo%20design%20generated%20by%20AI%2C%20clean%20and%20powerful%2C%20easy%20to%20recognize%2C%20modern%20style&image_size=landscape_16_9',
    tags: ['标志设计', '品牌识别', '简洁风格'],
    likeCount: 0,
    liked: false
  },
  {
    id: 5,
    title: '营销海报设计',
    description: 'AI辅助创作的营销海报，吸引眼球，传达核心信息',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=marketing%20poster%20design%20with%20AI%20assistance%2C%20eye-catching%2C%20core%20message%20delivery%2C%20vibrant%20colors&image_size=landscape_16_9',
    tags: ['海报设计', '营销设计', '视觉传达'],
    likeCount: 0,
    liked: false
  },
  {
    id: 6,
    title: '网页界面设计',
    description: 'AI生成的网页界面设计，用户友好，视觉吸引力强',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=web%20interface%20design%20generated%20by%20AI%2C%20user-friendly%2C%20visually%20appealing%2C%20modern%20layout&image_size=landscape_16_9',
    tags: ['网页设计', '用户体验', '现代布局'],
    likeCount: 0,
    liked: false
  }
])

designs.value = designs.value.map(design => ({
  ...design,
  likeCount: initializeLikeCount(`aigc-design-${design.id}`, Math.floor(Math.random() * 100) + 20),
  liked: isLiked(`aigc-design-${design.id}`)
}))

const processSteps = ref([
  {
    title: '需求分析',
    description: '了解项目需求和目标，确定设计方向和风格'
  },
  {
    title: 'AI创意生成',
    description: '利用AI工具生成初步设计方案，提供多样化选择'
  },
  {
    title: '人工优化',
    description: '设计师对AI生成的方案进行调整和优化，融入创意'
  },
  {
    title: '反馈迭代',
    description: '根据客户反馈进行修改和完善，确保设计符合预期'
  },
  {
    title: '最终交付',
    description: '完成设计并提供相关文件，确保项目顺利实施'
  }
])
</script>

<style scoped>
.aigc-design {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

/* 头部样式 */
.aigc-header {
  text-align: center;
  margin-bottom: 80px;
  position: relative;
}

.header-content {
  position: relative;
  z-index: 1;
}

.aigc-title {
  font-size: 48px;
  font-weight: bold;
  margin-bottom: 20px;
  position: relative;
}

.title-glow {
  background: var(--primary-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 0 30px var(--primary-glow);
  display: block;
  margin-bottom: 10px;
}

.title-sub {
  font-size: 24px;
  color: rgba(255, 255, 255, 0.8);
  display: block;
  font-weight: normal;
}

.aigc-description {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.7);
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
}

/* 特性部分 */
.aigc-features {
  margin-bottom: 100px;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
}

.feature-card {
  background: var(--card-bg);
  backdrop-filter: blur(25px);
  border-radius: 20px;
  padding: 30px;
  text-align: center;
  border: 1px solid var(--border-color);
  transition: all 0.3s ease;
  box-shadow: 
    0 10px 30px rgba(0, 0, 0, 0.3),
    0 0 20px var(--primary-glow);
}

.feature-card:hover {
  transform: translateY(-10px);
  box-shadow: 
    0 20px 60px rgba(0, 0, 0, 0.4),
    0 0 40px var(--primary-glow);
}

.feature-icon {
  font-size: 48px;
  margin-bottom: 20px;
  transition: transform 0.3s ease;
}

.feature-card:hover .feature-icon {
  transform: scale(1.1);
}

.feature-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 15px;
  color: #ffffff;
  text-shadow: 0 0 10px var(--primary-glow);
}

.feature-description {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
}

/* 展示部分 */
.aigc-showcase {
  margin-bottom: 100px;
}

.showcase-title {
  font-size: 36px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 50px;
  color: #ffffff;
  text-shadow: 0 0 20px var(--primary-glow);
}

.showcase-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 40px;
}

.design-card {
  background: var(--card-bg);
  backdrop-filter: blur(25px);
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid var(--border-color);
  transition: all 0.3s ease;
  box-shadow: 
    0 10px 30px rgba(0, 0, 0, 0.3),
    0 0 20px var(--primary-glow);
  cursor: pointer;
  position: relative;
}

.design-card:hover {
  transform: translateY(-10px);
  box-shadow: 
    0 20px 60px rgba(0, 0, 0, 0.4),
    0 0 40px var(--primary-glow);
}

.design-like-button {
  position: absolute;
  top: 12px;
  right: 12px;
  display: flex;
  align-items: center;
  gap: 4px;
  background: rgba(15, 15, 35, 0.8);
  border: 1px solid var(--border-color);
  border-radius: 20px;
  padding: 6px 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;
  backdrop-filter: blur(10px);
}

.design-like-button:hover {
  background: rgba(15, 15, 35, 0.95);
  transform: scale(1.05);
}

.design-like-button.liked {
  background: rgba(255, 100, 100, 0.2);
  border-color: #ff6b6b;
}

.design-like-button.liked .heart-icon {
  fill: #ff6b6b;
  stroke: #ff6b6b;
  transform: scale(1.1);
}

.design-like-button .heart-icon {
  width: 18px;
  height: 18px;
  stroke: rgba(255, 255, 255, 0.7);
  fill: transparent;
  transition: all 0.3s ease;
}

.design-like-button .like-count {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
  min-width: 20px;
  text-align: left;
}

.design-like-button.liked .like-count {
  color: #ff6b6b;
}

.design-card:hover {
  transform: translateY(-10px);
  box-shadow: 
    0 20px 60px rgba(0, 0, 0, 0.4),
    0 0 40px var(--primary-glow);
}

.design-preview {
  padding: 20px;
  background: rgba(15, 15, 35, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
}

.design-image {
  max-width: 100%;
  max-height: 100%;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
}

.design-info {
  padding: 25px;
}

.design-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #ffffff;
  text-shadow: 0 0 10px var(--primary-glow);
}

.design-description {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 15px;
  line-height: 1.6;
}

.design-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  background: var(--primary-glow);
  color: rgba(255, 255, 255, 0.9);
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  border: 1px solid var(--border-color);
}

/* 流程部分 */
.aigc-process {
  margin-bottom: 80px;
}

.process-title {
  font-size: 36px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 50px;
  color: #ffffff;
  text-shadow: 0 0 20px var(--primary-glow);
}

.process-steps {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.process-step {
  display: flex;
  gap: 20px;
  align-items: flex-start;
  background: var(--card-bg);
  backdrop-filter: blur(25px);
  border-radius: 20px;
  padding: 25px;
  border: 1px solid var(--border-color);
  transition: all 0.3s ease;
  box-shadow: 
    0 10px 30px rgba(0, 0, 0, 0.3),
    0 0 20px var(--primary-glow);
}

.process-step:hover {
  transform: translateX(10px);
  box-shadow: 
    0 15px 45px rgba(0, 0, 0, 0.4),
    0 0 30px var(--primary-glow);
}

.step-number {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: var(--primary-gradient);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
  color: #ffffff;
  flex-shrink: 0;
  box-shadow: 0 4px 15px var(--primary-glow);
}

.step-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #ffffff;
  text-shadow: 0 0 10px var(--primary-glow);
}

.step-description {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .aigc-title {
    font-size: 42px;
  }
  
  .title-sub {
    font-size: 20px;
  }
  
  .showcase-grid {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
  }
}

@media (max-width: 768px) {
  .aigc-design {
    padding: 30px 15px;
  }
  
  .aigc-header {
    margin-bottom: 60px;
  }
  
  .aigc-title {
    font-size: 36px;
  }
  
  .title-sub {
    font-size: 18px;
  }
  
  .aigc-description {
    font-size: 16px;
  }
  
  .aigc-features {
    margin-bottom: 70px;
  }
  
  .features-grid {
    gap: 20px;
  }
  
  .feature-card {
    padding: 20px;
  }
  
  .feature-icon {
    font-size: 36px;
  }
  
  .aigc-showcase {
    margin-bottom: 70px;
  }
  
  .showcase-title {
    font-size: 28px;
    margin-bottom: 30px;
  }
  
  .showcase-grid {
    grid-template-columns: 1fr;
    gap: 25px;
  }
  
  .design-preview {
    height: 180px;
  }
  
  .aigc-process {
    margin-bottom: 60px;
  }
  
  .process-title {
    font-size: 28px;
    margin-bottom: 30px;
  }
  
  .process-step {
    padding: 20px;
  }
  
  .step-number {
    width: 40px;
    height: 40px;
    font-size: 20px;
  }
}

@media (max-width: 480px) {
  .aigc-title {
    font-size: 30px;
  }
  
  .title-sub {
    font-size: 16px;
  }
  
  .aigc-description {
    font-size: 14px;
  }
  
  .feature-title {
    font-size: 18px;
  }
  
  .feature-description {
    font-size: 13px;
  }
  
  .design-title {
    font-size: 18px;
  }
  
  .design-description {
    font-size: 13px;
  }
  
  .step-title {
    font-size: 18px;
  }
  
  .step-description {
    font-size: 13px;
  }
}
</style>