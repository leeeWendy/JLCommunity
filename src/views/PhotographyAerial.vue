<template>
  <div class="photography-aerial">
    <section class="aerial-header">
      <div class="header-content">
        <h1 class="aerial-title">
          <span class="title-glow">摄影航拍</span>
          <span class="title-sub">专业航空摄影服务平台</span>
        </h1>
        <p class="aerial-description">
          从空中俯瞰世界，捕捉令人惊叹的视角，为您的项目提供独特的视觉体验
        </p>
        <button class="manage-button" @click="toggleManageMode">
          <span class="manage-icon">⚙️</span>
          <span class="manage-text">{{ isManageMode ? '返回查看' : '管理作品' }}</span>
        </button>
      </div>
    </section>

    <section class="aerial-features">
      <div class="features-grid">
        <div class="feature-card">
          <div class="feature-icon">📸</div>
          <h3 class="feature-title">专业航拍设备</h3>
          <p class="feature-description">使用高端无人机和专业相机，确保每一张照片都达到专业品质</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">🌍</div>
          <h3 class="feature-title">独特视角</h3>
          <p class="feature-description">从空中捕捉独特的视角，展现地面无法看到的壮丽景象</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">🎨</div>
          <h3 class="feature-title">专业后期</h3>
          <p class="feature-description">专业的后期处理团队，确保每一张照片都达到完美效果</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">⏱️</div>
          <h3 class="feature-title">高效服务</h3>
          <p class="feature-description">快速响应，专业执行，确保项目按时完成</p>
        </div>
      </div>
    </section>

    <section class="aerial-showcase">
      <h2 class="showcase-title">作品展示</h2>
      
      <!-- 管理模式下的添加按钮 -->
      <div v-if="isManageMode" class="manage-controls">
        <button class="add-button" @click="openAddModal">
          <span class="add-icon">➕</span>
          <span class="add-text">添加新作品</span>
        </button>
      </div>
      
      <div class="showcase-grid">
        <div class="aerial-card" v-for="(project, index) in aerialProjects" :key="index">
          <div class="aerial-preview">
            <img :src="project.image" :alt="project.title" class="aerial-image">
          </div>
          <div class="aerial-info">
            <h3 class="aerial-title">{{ project.title }}</h3>
            <p class="aerial-description">{{ project.description }}</p>
            <div class="aerial-tags">
              <span class="tag" v-for="(tag, tagIndex) in project.tags" :key="tagIndex">{{ tag }}</span>
            </div>
            
            <!-- 管理模式下的编辑删除按钮 -->
            <div v-if="isManageMode" class="aerial-actions">
              <button class="edit-button" @click="openEditModal(project, index)">
                <span class="action-icon">✏️</span>
                <span class="action-text">编辑</span>
              </button>
              <button class="delete-button" @click="deleteProject(index)">
                <span class="action-icon">🗑️</span>
                <span class="action-text">删除</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="aerial-services">
      <h2 class="services-title">服务项目</h2>
      <div class="services-grid">
        <div class="service-card">
          <div class="service-icon">🏙️</div>
          <h3 class="service-title">城市航拍</h3>
          <p class="service-description">捕捉城市天际线、地标建筑和城市发展的壮丽景象</p>
        </div>
        <div class="service-card">
          <div class="service-icon">🌊</div>
          <h3 class="service-title">自然风景</h3>
          <p class="service-description">从空中俯瞰山脉、湖泊、海岸线等自然景观的壮丽景色</p>
        </div>
        <div class="service-card">
          <div class="service-icon">🏗️</div>
          <h3 class="service-title">工程建设</h3>
          <p class="service-description">记录工程项目的建设过程，提供全面的视觉资料</p>
        </div>
        <div class="service-card">
          <div class="service-icon">🎪</div>
          <h3 class="service-title">活动赛事</h3>
          <p class="service-description">为大型活动、体育赛事等提供独特的空中视角拍摄</p>
        </div>
      </div>
    </section>

    <section class="aerial-process">
      <h2 class="process-title">服务流程</h2>
      <div class="process-steps">
        <div class="process-step" v-for="(step, index) in processSteps" :key="index">
          <div class="step-number">{{ index + 1 }}</div>
          <h3 class="step-title">{{ step.title }}</h3>
          <p class="step-description">{{ step.description }}</p>
        </div>
      </div>
    </section>

    <!-- 添加/编辑作品模态框 -->
    <div v-if="showModal" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3 class="modal-title">{{ isEditing ? '编辑作品' : '添加新作品' }}</h3>
          <button class="modal-close" @click="closeModal">×</button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="saveProject">
            <div class="form-group">
              <label class="form-label">作品标题</label>
              <input 
                type="text" 
                class="form-input" 
                v-model="formData.title" 
                placeholder="请输入作品标题"
                required
              >
            </div>
            <div class="form-group">
              <label class="form-label">作品描述</label>
              <textarea 
                class="form-textarea" 
                v-model="formData.description" 
                placeholder="请输入作品描述"
                rows="3"
                required
              ></textarea>
            </div>
            <div class="form-group">
              <label class="form-label">图片URL</label>
              <input 
                type="text" 
                class="form-input" 
                v-model="formData.image" 
                placeholder="请输入图片URL"
                required
              >
            </div>
            <div class="form-group">
              <label class="form-label">标签</label>
              <input 
                type="text" 
                class="form-input" 
                v-model="formData.tagsInput" 
                placeholder="请输入标签，用逗号分隔"
                required
              >
            </div>
            <div class="form-actions">
              <button type="button" class="cancel-button" @click="closeModal">取消</button>
              <button type="submit" class="save-button">保存</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 管理模式状态
const isManageMode = ref(false)
const showModal = ref(false)
const isEditing = ref(false)
const currentEditIndex = ref(-1)

// 表单数据
const formData = ref({
  title: '',
  description: '',
  image: '',
  tagsInput: ''
})

// 航拍作品数据
const aerialProjects = ref([
  {
    title: '城市天际线',
    description: '从高空俯瞰现代城市的壮丽天际线，展现城市的繁华与活力',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=urban%20skyline%20aerial%20photography%2C%20modern%20city%20buildings%2C%20sunset%20view%2C%20professional%20photography%2C%20high%20quality&image_size=landscape_16_9',
    tags: ['城市', '天际线', '日落']
  },
  {
    title: '自然风光',
    description: '航拍壮丽的自然景观，展现大自然的鬼斧神工和美丽景色',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=nature%20landscape%20aerial%20photography%2C%20mountain%20range%20and%20lake%2C%20blue%20sky%2C%20professional%20photography%2C%20high%20quality&image_size=landscape_16_9',
    tags: ['自然', '山脉', '湖泊']
  },
  {
    title: '海岸线',
    description: '航拍蜿蜒曲折的海岸线，展现海洋与陆地的完美结合',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=coastline%20aerial%20photography%2C%20beach%20and%20ocean%2C%20blue%20water%2C%20professional%20photography%2C%20high%20quality&image_size=landscape_16_9',
    tags: ['海岸', '海滩', '海洋']
  },
  {
    title: '城市交通',
    description: '航拍城市交通网络，展现现代城市的繁忙与秩序',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=city%20traffic%20aerial%20photography%2C%20highway%20interchange%2C%20cars%20moving%2C%20professional%20photography%2C%20high%20quality&image_size=landscape_16_9',
    tags: ['城市', '交通', '公路']
  },
  {
    title: '建筑艺术',
    description: '航拍现代建筑的独特设计，展现人类的创造力与艺术美感',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20architecture%20aerial%20photography%2C%20unique%20building%20design%2C%20geometric%20shapes%2C%20professional%20photography%2C%20high%20quality&image_size=landscape_16_9',
    tags: ['建筑', '现代', '艺术']
  },
  {
    title: '农田风光',
    description: '航拍广阔的农田，展现大地的色彩与纹理，感受农业的魅力',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=agricultural%20field%20aerial%20photography%2C%20colorful%20farmland%2C%20patterns%20and%20textures%2C%20professional%20photography%2C%20high%20quality&image_size=landscape_16_9',
    tags: ['农田', '自然', '色彩']
  }
])

// 服务流程数据
const processSteps = ref([
  {
    title: '需求沟通',
    description: '了解客户需求，确定拍摄目标、时间、地点和具体要求'
  },
  {
    title: '方案制定',
    description: '根据需求制定详细的航拍方案，包括飞行路线、拍摄角度和后期处理计划'
  },
  {
    title: '现场拍摄',
    description: '专业团队携带高端设备进行现场拍摄，确保获取最佳素材'
  },
  {
    title: '后期处理',
    description: '专业后期团队对拍摄素材进行处理，确保每一张照片都达到完美效果'
  },
  {
    title: '作品交付',
    description: '按照约定时间交付成品，确保客户满意'
  }
])

// 切换管理模式
const toggleManageMode = () => {
  isManageMode.value = !isManageMode.value
  if (!isManageMode.value) {
    closeModal()
  }
}

// 打开添加模态框
const openAddModal = () => {
  isEditing.value = false
  currentEditIndex.value = -1
  formData.value = {
    title: '',
    description: '',
    image: '',
    tagsInput: ''
  }
  showModal.value = true
}

// 打开编辑模态框
const openEditModal = (project, index) => {
  isEditing.value = true
  currentEditIndex.value = index
  formData.value = {
    title: project.title,
    description: project.description,
    image: project.image,
    tagsInput: project.tags.join(', ')
  }
  showModal.value = true
}

// 关闭模态框
const closeModal = () => {
  showModal.value = false
  formData.value = {
    title: '',
    description: '',
    image: '',
    tagsInput: ''
  }
  currentEditIndex.value = -1
}

// 保存作品
const saveProject = () => {
  const tags = formData.value.tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag)
  
  if (isEditing.value && currentEditIndex.value !== -1) {
    // 编辑现有作品
    aerialProjects.value[currentEditIndex.value] = {
      title: formData.value.title,
      description: formData.value.description,
      image: formData.value.image,
      tags: tags
    }
  } else {
    // 添加新作品
    aerialProjects.value.push({
      title: formData.value.title,
      description: formData.value.description,
      image: formData.value.image,
      tags: tags
    })
  }
  
  closeModal()
}

// 删除作品
const deleteProject = (index) => {
  if (confirm('确定要删除这个作品吗？')) {
    aerialProjects.value.splice(index, 1)
  }
}
</script>

<style scoped>
.photography-aerial {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

/* 头部样式 */
.aerial-header {
  text-align: center;
  margin-bottom: 80px;
  position: relative;
}

.header-content {
  position: relative;
  z-index: 1;
}

.aerial-title {
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

.aerial-description {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.7);
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
}

/* 特性部分 */
.aerial-features {
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
.aerial-showcase {
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

.aerial-card {
  background: var(--card-bg);
  backdrop-filter: blur(25px);
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid var(--border-color);
  transition: all 0.3s ease;
  box-shadow: 
    0 10px 30px rgba(0, 0, 0, 0.3),
    0 0 20px var(--primary-glow);
}

.aerial-card:hover {
  transform: translateY(-10px);
  box-shadow: 
    0 20px 60px rgba(0, 0, 0, 0.4),
    0 0 40px var(--primary-glow);
}

.aerial-preview {
  padding: 20px;
  background: rgba(15, 15, 35, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
}

.aerial-image {
  max-width: 100%;
  max-height: 100%;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
}

.aerial-info {
  padding: 25px;
}

.aerial-info .aerial-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #ffffff;
  text-shadow: 0 0 10px var(--primary-glow);
}

.aerial-info .aerial-description {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 15px;
  line-height: 1.6;
}

.aerial-tags {
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

/* 服务项目部分 */
.aerial-services {
  margin-bottom: 100px;
}

.services-title {
  font-size: 36px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 50px;
  color: #ffffff;
  text-shadow: 0 0 20px var(--primary-glow);
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
}

.service-card {
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

.service-card:hover {
  transform: translateY(-10px);
  box-shadow: 
    0 20px 60px rgba(0, 0, 0, 0.4),
    0 0 40px var(--primary-glow);
}

.service-icon {
  font-size: 48px;
  margin-bottom: 20px;
  transition: transform 0.3s ease;
}

.service-card:hover .service-icon {
  transform: scale(1.1);
}

.service-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 15px;
  color: #ffffff;
  text-shadow: 0 0 10px var(--primary-glow);
}

.service-description {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
}

/* 流程部分 */
.aerial-process {
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

/* 管理按钮样式 */
.manage-button {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 16px 24px;
  border-radius: 20px;
  background: var(--primary-gradient);
  border: 1px solid var(--border-color);
  color: #ffffff;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 20px;
  box-shadow: 0 4px 15px var(--primary-glow);
}

.manage-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px var(--primary-glow), 0 0 15px var(--secondary-glow);
}

.manage-icon {
  font-size: 20px;
}

/* 管理控制样式 */
.manage-controls {
  margin-bottom: 30px;
  text-align: center;
}

.add-button {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 12px 20px;
  border-radius: 16px;
  background: var(--primary-gradient);
  border: 1px solid var(--border-color);
  color: #ffffff;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px var(--primary-glow);
}

.add-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px var(--primary-glow), 0 0 12px var(--secondary-glow);
}

.add-icon {
  font-size: 18px;
}

/* 作品卡片操作按钮 */
.aerial-actions {
  display: flex;
  gap: 10px;
  margin-top: 20px;
  padding-top: 15px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.edit-button, .delete-button {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 12px;
  border: 1px solid var(--border-color);
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  flex: 1;
  justify-content: center;
}

.edit-button {
  background: rgba(102, 126, 234, 0.2);
  color: rgba(255, 255, 255, 0.9);
}

.edit-button:hover {
  background: rgba(102, 126, 234, 0.4);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px var(--primary-glow);
}

.delete-button {
  background: rgba(255, 65, 108, 0.2);
  color: rgba(255, 255, 255, 0.9);
}

.delete-button:hover {
  background: rgba(255, 65, 108, 0.4);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(255, 65, 108, 0.5);
}

.action-icon {
  font-size: 14px;
}

/* 模态框样式 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(15, 15, 35, 0.8);
  backdrop-filter: blur(10px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: var(--card-bg);
  backdrop-filter: blur(25px);
  border-radius: 20px;
  border: 1px solid var(--border-color);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4), 0 0 40px var(--primary-glow);
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 25px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.modal-title {
  font-size: 20px;
  font-weight: bold;
  color: #ffffff;
  text-shadow: 0 0 10px var(--primary-glow);
}

.modal-close {
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.7);
  font-size: 24px;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

.modal-close:hover {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.1);
  transform: rotate(90deg);
}

.modal-body {
  padding: 25px;
}

/* 表单样式 */
.form-group {
  margin-bottom: 20px;
}

.form-label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 8px;
}

.form-input, .form-textarea {
  width: 100%;
  padding: 12px 16px;
  border-radius: 12px;
  background: rgba(15, 15, 35, 0.5);
  border: 1px solid var(--border-color);
  color: #ffffff;
  font-size: 14px;
  transition: all 0.3s ease;
  font-family: inherit;
}

.form-input:focus, .form-textarea:focus {
  outline: none;
  border-color: rgba(102, 126, 234, 0.5);
  box-shadow: 0 0 0 2px var(--primary-glow);
}

.form-textarea {
  resize: vertical;
  min-height: 80px;
}

.form-actions {
  display: flex;
  gap: 15px;
  margin-top: 30px;
  justify-content: flex-end;
}

.cancel-button, .save-button {
  padding: 12px 24px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid var(--border-color);
}

.cancel-button {
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.8);
}

.cancel-button:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-1px);
}

.save-button {
  background: var(--primary-gradient);
  color: #ffffff;
  box-shadow: 0 4px 15px var(--primary-glow);
}

.save-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px var(--primary-glow), 0 0 12px var(--secondary-glow);
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .aerial-title {
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
  .photography-aerial {
    padding: 30px 15px;
  }
  
  .aerial-header {
    margin-bottom: 60px;
  }
  
  .aerial-title {
    font-size: 36px;
  }
  
  .title-sub {
    font-size: 18px;
  }
  
  .aerial-description {
    font-size: 16px;
  }
  
  .manage-button {
    padding: 12px 20px;
    font-size: 14px;
  }
  
  .aerial-features {
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
  
  .aerial-showcase {
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
  
  .aerial-preview {
    height: 180px;
  }
  
  .aerial-actions {
    flex-direction: column;
  }
  
  .edit-button, .delete-button {
    padding: 10px 16px;
  }
  
  .modal-content {
    width: 95%;
    margin: 20px;
  }
  
  .modal-header {
    padding: 15px 20px;
  }
  
  .modal-body {
    padding: 20px;
  }
  
  .form-actions {
    flex-direction: column;
  }
  
  .cancel-button, .save-button {
    width: 100%;
    justify-content: center;
  }
  
  .aerial-services {
    margin-bottom: 70px;
  }
  
  .services-title {
    font-size: 28px;
    margin-bottom: 30px;
  }
  
  .services-grid {
    gap: 20px;
  }
  
  .service-card {
    padding: 20px;
  }
  
  .service-icon {
    font-size: 36px;
  }
  
  .aerial-process {
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
  .aerial-title {
    font-size: 30px;
  }
  
  .title-sub {
    font-size: 16px;
  }
  
  .aerial-description {
    font-size: 14px;
  }
  
  .manage-button {
    font-size: 12px;
    padding: 10px 16px;
  }
  
  .manage-icon {
    font-size: 16px;
  }
  
  .feature-title {
    font-size: 18px;
  }
  
  .feature-description {
    font-size: 13px;
  }
  
  .aerial-info .aerial-title {
    font-size: 18px;
  }
  
  .aerial-info .aerial-description {
    font-size: 13px;
  }
  
  .edit-button, .delete-button {
    font-size: 11px;
    padding: 8px 12px;
  }
  
  .action-icon {
    font-size: 12px;
  }
  
  .service-title {
    font-size: 18px;
  }
  
  .service-description {
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