<template>
  <div class="ai-short-video">
    <!-- 页面标题 -->
    <section class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">AI短视频</h1>
        <p class="hero-description">
          利用人工智能技术，快速生成高质量的短视频内容。
          从创意构思到成片输出，全流程智能化处理，
          为您的品牌和个人创作提供无限可能。
        </p>
        <div class="hero-features">
          <div class="feature-item">
            <span class="feature-icon">⚡</span>
            <span class="feature-text">快速生成</span>
          </div>
          <div class="feature-item">
            <span class="feature-icon">🎨</span>
            <span class="feature-text">智能剪辑</span>
          </div>
          <div class="feature-item">
            <span class="feature-icon">📝</span>
            <span class="feature-text">自动字幕</span>
          </div>
          <div class="feature-item">
            <span class="feature-icon">🎵</span>
            <span class="feature-text">智能配乐</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 产品展示区 -->
    <section class="products-section">
      <h2 class="section-title">AI短视频产品</h2>
      <div class="products-grid">
        <div class="product-card" v-for="(product, index) in products" :key="product.id" @click="navigateToDetail(product.id)">
          <div class="product-card-inner">
            <div class="product-image-container">
              <div class="product-image" :style="{ backgroundImage: `url(${product.image})` }"></div>
              <div class="product-overlay">
                <div class="product-overlay-content">
                  <h3 class="product-name">{{ product.name }}</h3>
                  <p class="product-description">{{ product.description }}</p>
                </div>
              </div>
            </div>
            <div class="product-info">
              <h3 class="product-name">{{ product.name }}</h3>
              <p class="product-description">{{ product.description }}</p>
              <div class="product-features">
                <span class="feature-tag" v-for="feature in product.features" :key="feature">{{ feature }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 功能特点 -->
    <section class="features-section">
      <h2 class="section-title">核心功能</h2>
      <div class="features-grid">
        <div class="feature-card">
          <div class="feature-icon">🎯</div>
          <h3 class="feature-title">智能内容生成</h3>
          <p class="feature-description">基于AI算法，根据您的需求自动生成视频脚本和分镜，节省创意构思时间。</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">✂️</div>
          <h3 class="feature-title">自动剪辑</h3>
          <p class="feature-description">AI智能识别视频内容，自动进行剪辑、转场和特效添加，生成专业级视频。</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">🔤</div>
          <h3 class="feature-title">智能字幕</h3>
          <p class="feature-description">自动识别语音内容，生成精准字幕，并支持多语言翻译和样式定制。</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">🎵</div>
          <h3 class="feature-title">智能配乐</h3>
          <p class="feature-description">根据视频内容和情绪，自动匹配适合的背景音乐，提升视频感染力。</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">📊</div>
          <h3 class="feature-title">数据分析</h3>
          <p class="feature-description">提供视频表现分析，包括观看时长、互动率等数据，帮助优化内容策略。</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">🚀</div>
          <h3 class="feature-title">多平台发布</h3>
          <p class="feature-description">支持一键发布到多个短视频平台，自动适配不同平台的格式要求。</p>
        </div>
      </div>
    </section>

    <!-- 应用场景 -->
    <section class="use-cases-section">
      <h2 class="section-title">应用场景</h2>
      <div class="use-cases-grid">
        <div class="use-case-card">
          <div class="use-case-icon">🏢</div>
          <h3 class="use-case-title">企业营销</h3>
          <p class="use-case-description">快速制作产品介绍、品牌宣传等营销视频，提升品牌曝光度。</p>
        </div>
        <div class="use-case-card">
          <div class="use-case-icon">👨‍💼</div>
          <h3 class="use-case-title">个人创作</h3>
          <p class="use-case-description">为个人社交媒体账号生成有趣、有料的短视频内容，吸引粉丝关注。</p>
        </div>
        <div class="use-case-card">
          <div class="use-case-icon">🎓</div>
          <h3 class="use-case-title">教育培训</h3>
          <p class="use-case-description">将复杂的知识内容转化为生动有趣的短视频，提高学习效果。</p>
        </div>
        <div class="use-case-card">
          <div class="use-case-icon">🛍️</div>
          <h3 class="use-case-title">电商推广</h3>
          <p class="use-case-description">为商品制作吸引人的展示视频，提升转化率和销售额。</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 导航到详情页
const navigateToDetail = (id) => {
  router.push(`/ai-short-video/product/${id}`)
}

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
</script>

<style scoped>
.ai-short-video {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

/* 页面标题区域 */
.hero-section {
  margin-bottom: 100px;
  position: relative;
}

.hero-content {
  text-align: center;
  position: relative;
  z-index: 1;
}

.hero-title {
  font-size: 48px;
  font-weight: bold;
  background: var(--primary-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 0 30px var(--primary-glow);
  margin-bottom: 24px;
  position: relative;
  display: inline-block;
}

.hero-title::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 120px;
  height: 4px;
  background: var(--primary-gradient);
  border-radius: 2px;
  box-shadow: 0 0 20px var(--primary-glow);
}

.hero-description {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  margin-bottom: 40px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.hero-features {
  display: flex;
  justify-content: center;
  gap: 40px;
  flex-wrap: wrap;
}

.feature-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 20px;
  background: var(--card-bg);
  backdrop-filter: blur(20px);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  transition: all 0.3s ease;
  min-width: 120px;
}

.feature-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px var(--primary-glow);
  border-color: var(--border-color);
}

.feature-icon {
  font-size: 24px;
}

.feature-text {
  font-size: 14px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
}

/* 产品展示区 */
.products-section {
  margin-bottom: 100px;
}

.section-title {
  font-size: 36px;
  font-weight: bold;
  color: #ffffff;
  text-align: center;
  margin-bottom: 60px;
  position: relative;
}

.section-title::before {
  content: '';
  position: absolute;
  bottom: -15px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 3px;
  background: var(--primary-gradient);
  border-radius: 1.5px;
  box-shadow: 0 0 15px var(--primary-glow);
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
}

.product-card {
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
}

.product-card:hover {
  transform: translateY(-10px);
}

.product-card-inner {
  position: relative;
  background: var(--card-bg);
  backdrop-filter: blur(20px);
  border: 1px solid var(--border-color);
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.product-card:hover .product-card-inner {
  box-shadow: 0 15px 50px var(--primary-glow);
  border-color: var(--border-color);
}

.product-image-container {
  position: relative;
  width: 100%;
  padding-top: 56.25%; /* 16:9 比例 */
  overflow: hidden;
}

.product-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  transition: transform 0.5s ease;
}

.product-card:hover .product-image {
  transform: scale(1.05);
}

.product-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, rgba(15, 15, 35, 0.9), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
  display: flex;
  align-items: flex-end;
  padding: 20px;
}

.product-card:hover .product-overlay {
  opacity: 1;
}

.product-overlay-content {
  transform: translateY(20px);
  transition: transform 0.3s ease;
}

.product-card:hover .product-overlay-content {
  transform: translateY(0);
}

.product-info {
  padding: 24px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.product-name {
  font-size: 20px;
  font-weight: bold;
  color: #ffffff;
  margin-bottom: 12px;
}

.product-description {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.5;
  margin-bottom: 16px;
  flex: 1;
}

.product-features {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: auto;
}

.feature-tag {
  font-size: 12px;
  padding: 6px 12px;
  background: var(--primary-glow);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  color: rgba(255, 255, 255, 0.8);
  transition: all 0.3s ease;
}

.feature-tag:hover {
  background: var(--primary-gradient);
  color: #ffffff;
}

/* 功能特点 */
.features-section {
  margin-bottom: 100px;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
}

.feature-card {
  background: var(--card-bg);
  backdrop-filter: blur(20px);
  border: 1px solid var(--border-color);
  border-radius: 20px;
  padding: 30px;
  transition: all 0.3s ease;
  text-align: center;
}

.feature-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 30px var(--primary-glow);
  border-color: var(--border-color);
}

.feature-card .feature-icon {
  font-size: 48px;
  margin-bottom: 20px;
  display: block;
}

.feature-title {
  font-size: 18px;
  font-weight: bold;
  color: #ffffff;
  margin-bottom: 16px;
}

.feature-description {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.5;
}

/* 应用场景 */
.use-cases-section {
  margin-bottom: 100px;
}

.use-cases-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
}

.use-case-card {
  background: var(--card-bg);
  backdrop-filter: blur(20px);
  border: 1px solid var(--border-color);
  border-radius: 20px;
  padding: 30px;
  transition: all 0.3s ease;
  text-align: center;
}

.use-case-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px var(--primary-glow);
  border-color: var(--border-color);
}

.use-case-icon {
  font-size: 40px;
  margin-bottom: 20px;
  display: block;
}

.use-case-title {
  font-size: 18px;
  font-weight: bold;
  color: #ffffff;
  margin-bottom: 16px;
}

.use-case-description {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.5;
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .ai-short-video {
    padding: 30px 20px;
  }
  
  .hero-title {
    font-size: 40px;
  }
  
  .hero-description {
    font-size: 16px;
  }
  
  .hero-features {
    gap: 30px;
  }
  
  .section-title {
    font-size: 32px;
  }
  
  .products-grid,
  .features-grid,
  .use-cases-grid {
    gap: 25px;
  }
}

@media (max-width: 992px) {
  .hero-section {
    margin-bottom: 80px;
  }
  
  .products-section,
  .features-section,
  .use-cases-section {
    margin-bottom: 80px;
  }
  
  .hero-features {
    gap: 20px;
  }
  
  .feature-item {
    min-width: 100px;
    padding: 16px;
  }
  
  .products-grid {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
  
  .features-grid {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 32px;
  }
  
  .hero-description {
    font-size: 14px;
    max-width: 90%;
  }
  
  .hero-features {
    gap: 16px;
  }
  
  .feature-item {
    min-width: 80px;
    padding: 12px;
  }
  
  .section-title {
    font-size: 28px;
    margin-bottom: 40px;
  }
  
  .products-grid,
  .features-grid,
  .use-cases-grid {
    gap: 20px;
  }
  
  .product-info {
    padding: 20px;
  }
  
  .product-name {
    font-size: 18px;
  }
  
  .feature-card,
  .use-case-card {
    padding: 24px;
  }
}

@media (max-width: 480px) {
  .ai-short-video {
    padding: 20px 15px;
  }
  
  .hero-title {
    font-size: 28px;
  }
  
  .hero-description {
    font-size: 13px;
  }
  
  .hero-features {
    flex-direction: column;
    align-items: center;
    gap: 12px;
  }
  
  .feature-item {
    width: 100%;
    max-width: 200px;
  }
  
  .section-title {
    font-size: 24px;
  }
  
  .products-grid,
  .features-grid,
  .use-cases-grid {
    grid-template-columns: 1fr;
  }
  
  .product-info {
    padding: 16px;
  }
  
  .feature-card,
  .use-case-card {
    padding: 20px;
  }
}
</style>