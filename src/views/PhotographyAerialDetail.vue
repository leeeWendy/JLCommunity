<template>
  <div class="photography-detail">
    <section class="detail-header">
      <button class="back-button" @click="goBack">
        <span class="back-icon">←</span>
        <span class="back-text">返回列表</span>
      </button>
    </section>

    <section class="detail-content">
      <div class="detail-main">
        <div class="detail-image-container">
          <img :src="currentProject.image" :alt="currentProject.title" class="detail-image">
        </div>
        
        <div class="detail-info">
          <h1 class="detail-title">{{ currentProject.title }}</h1>
          <p class="detail-description">{{ currentProject.description }}</p>
          
          <div class="detail-meta">
            <div class="detail-tags">
              <span class="tag" v-for="(tag, tagIndex) in currentProject.tags" :key="tagIndex">{{ tag }}</span>
            </div>
            
            <div class="detail-actions">
              <button class="like-button" @click="toggleLike" :class="{ 'liked': isLiked }">
                <span class="like-icon">{{ isLiked ? '❤️' : '🤍' }}</span>
                <span class="like-count">{{ likeCount }}</span>
              </button>
              <button class="share-button" @click="shareProject">
                <span class="share-icon">📤</span>
                <span class="share-text">分享</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="detail-more">
        <h2 class="more-title">更多作品</h2>
        <div class="more-grid">
          <div class="more-card" v-for="(project, index) in moreProjects" :key="index" @click="goToProject(index)">
            <div class="more-image-container">
              <img :src="project.image" :alt="project.title" class="more-image">
            </div>
            <h3 class="more-card-title">{{ project.title }}</h3>
          </div>
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

// 模拟航拍作品数据
const aerialProjects = ref([
  {
    id: '1',
    title: '城市天际线',
    description: '从高空俯瞰现代城市的壮丽天际线，展现城市的繁华与活力。这张照片拍摄于日落时分，金色的阳光洒在高楼大厦上，形成了美丽的光影效果。远处的山脉与城市形成了鲜明的对比，展现了自然与人文的和谐统一。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=urban%20skyline%20aerial%20photography%2C%20modern%20city%20buildings%2C%20sunset%20view%2C%20professional%20photography%2C%20high%20quality&image_size=landscape_16_9',
    tags: ['城市', '天际线', '日落'],
    likes: 128
  },
  {
    id: '2',
    title: '自然风光',
    description: '航拍壮丽的自然景观，展现大自然的鬼斧神工和美丽景色。连绵起伏的山脉被绿色植被覆盖，山间点缀着清澈的湖泊，宛如一幅美丽的画卷。从空中俯瞰，整个景观尽收眼底，让人感受到大自然的宏伟与壮观。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=nature%20landscape%20aerial%20photography%2C%20mountain%20range%20and%20lake%2C%20blue%20sky%2C%20professional%20photography%2C%20high%20quality&image_size=landscape_16_9',
    tags: ['自然', '山脉', '湖泊'],
    likes: 96
  },
  {
    id: '3',
    title: '海岸线',
    description: '航拍蜿蜒曲折的海岸线，展现海洋与陆地的完美结合。湛蓝的海水与金色的沙滩形成了鲜明的对比，海岸线如同一道美丽的曲线，延伸向远方。远处的岛屿与海岸线相互呼应，构成了一幅和谐的画面。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=coastline%20aerial%20photography%2C%20beach%20and%20ocean%2C%20blue%20water%2C%20professional%20photography%2C%20high%20quality&image_size=landscape_16_9',
    tags: ['海岸', '海滩', '海洋'],
    likes: 156
  },
  {
    id: '4',
    title: '城市交通',
    description: '航拍城市交通网络，展现现代城市的繁忙与秩序。纵横交错的道路如同一幅复杂的画卷，车辆在道路上有序行驶，形成了流动的光影。从空中俯瞰，整个交通网络尽收眼底，展现了现代城市的活力与效率。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=city%20traffic%20aerial%20photography%2C%20highway%20interchange%2C%20cars%20moving%2C%20professional%20photography%2C%20high%20quality&image_size=landscape_16_9',
    tags: ['城市', '交通', '公路'],
    likes: 89
  },
  {
    id: '5',
    title: '建筑艺术',
    description: '航拍现代建筑的独特设计，展现人类的创造力与艺术美感。独特的建筑造型与周围环境形成了鲜明的对比，建筑的几何形状在阳光下呈现出不同的光影效果。从空中俯瞰，建筑的整体设计尽收眼底，展现了现代建筑的魅力与创新。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20architecture%20aerial%20photography%2C%20unique%20building%20design%2C%20geometric%20shapes%2C%20professional%20photography%2C%20high%20quality&image_size=landscape_16_9',
    tags: ['建筑', '现代', '艺术'],
    likes: 112
  },
  {
    id: '6',
    title: '农田风光',
    description: '航拍广阔的农田，展现大地的色彩与纹理，感受农业的魅力。农田的色彩随着季节的变化而变化，形成了美丽的图案与纹理。从空中俯瞰，整个农田如同一幅巨大的画卷，展现了农业的壮观与美丽。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=agricultural%20field%20aerial%20photography%2C%20colorful%20farmland%2C%20patterns%20and%20textures%2C%20professional%20photography%2C%20high%20quality&image_size=landscape_16_9',
    tags: ['农田', '自然', '色彩'],
    likes: 76
  }
])

// 当前项目数据
const currentProject = ref(aerialProjects.value[0])
const isLiked = ref(false)
const likeCount = ref(0)

// 计算其他项目
const moreProjects = computed(() => {
  return aerialProjects.value.filter(project => project.id !== currentProject.value.id).slice(0, 4)
})

// 初始化数据
onMounted(() => {
  const id = route.params.id
  if (id) {
    const project = aerialProjects.value.find(p => p.id === id)
    if (project) {
      currentProject.value = project
      likeCount.value = project.likes
    }
  } else {
    likeCount.value = currentProject.value.likes
  }
})

// 返回列表
const goBack = () => {
  router.push('/photography-aerial')
}

// 切换点赞状态
const toggleLike = () => {
  isLiked.value = !isLiked.value
  if (isLiked.value) {
    likeCount.value++
  } else {
    likeCount.value--
  }
}

// 分享项目
const shareProject = () => {
  if (navigator.share) {
    navigator.share({
      title: currentProject.value.title,
      text: currentProject.value.description,
      url: window.location.href
    })
  } else {
    // 复制链接到剪贴板
    navigator.clipboard.writeText(window.location.href)
    alert('链接已复制到剪贴板')
  }
}

// 跳转到其他项目
const goToProject = (index) => {
  const project = moreProjects.value[index]
  router.push(`/photography-aerial/${project.id}`)
}
</script>

<style scoped>
.photography-detail {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

/* 头部样式 */
.detail-header {
  margin-bottom: 40px;
}

.back-button {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 12px 20px;
  border-radius: 16px;
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  color: #ffffff;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
}

.back-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4), 0 0 15px var(--primary-glow);
  background: rgba(102, 126, 234, 0.2);
}

.back-icon {
  font-size: 16px;
}

/* 主要内容 */
.detail-content {
  margin-bottom: 80px;
}

.detail-main {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px;
  margin-bottom: 80px;
  align-items: start;
}

.detail-image-container {
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4), 0 0 40px var(--primary-glow);
  border: 1px solid var(--border-color);
}

.detail-image {
  width: 100%;
  height: auto;
  display: block;
}

.detail-info {
  background: var(--card-bg);
  backdrop-filter: blur(25px);
  border-radius: 20px;
  padding: 30px;
  border: 1px solid var(--border-color);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3), 0 0 20px var(--primary-glow);
}

.detail-title {
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #ffffff;
  text-shadow: 0 0 20px var(--primary-glow);
  line-height: 1.2;
}

.detail-description {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
  margin-bottom: 30px;
}

.detail-meta {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.detail-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.tag {
  background: var(--primary-glow);
  color: rgba(255, 255, 255, 0.9);
  padding: 6px 16px;
  border-radius: 16px;
  font-size: 14px;
  font-weight: 500;
  border: 1px solid var(--border-color);
}

.detail-actions {
  display: flex;
  gap: 20px;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.like-button, .share-button {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 24px;
  border-radius: 16px;
  border: 1px solid var(--border-color);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  flex: 1;
  justify-content: center;
}

.like-button {
  background: rgba(255, 65, 108, 0.2);
  color: rgba(255, 255, 255, 0.9);
}

.like-button:hover {
  background: rgba(255, 65, 108, 0.4);
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(255, 65, 108, 0.3);
}

.like-button.liked {
  background: rgba(255, 65, 108, 0.5);
}

.share-button {
  background: rgba(102, 126, 234, 0.2);
  color: rgba(255, 255, 255, 0.9);
}

.share-button:hover {
  background: rgba(102, 126, 234, 0.4);
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
}

.like-icon, .share-icon {
  font-size: 18px;
}

/* 更多作品 */
.detail-more {
  margin-top: 60px;
}

.more-title {
  font-size: 28px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 40px;
  color: #ffffff;
  text-shadow: 0 0 20px var(--primary-glow);
}

.more-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 25px;
}

.more-card {
  background: var(--card-bg);
  backdrop-filter: blur(25px);
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid var(--border-color);
  transition: all 0.3s ease;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3), 0 0 20px var(--primary-glow);
  cursor: pointer;
}

.more-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4), 0 0 40px var(--primary-glow);
}

.more-image-container {
  padding: 15px;
  background: rgba(15, 15, 35, 0.5);
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.more-image {
  max-width: 100%;
  max-height: 100%;
  border-radius: 10px;
}

.more-card-title {
  padding: 15px;
  font-size: 16px;
  font-weight: bold;
  color: #ffffff;
  text-shadow: 0 0 10px var(--primary-glow);
  text-align: center;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .photography-detail {
    padding: 30px 15px;
  }

  .detail-main {
    grid-template-columns: 1fr;
    gap: 30px;
  }

  .detail-title {
    font-size: 28px;
  }

  .detail-description {
    font-size: 15px;
  }

  .detail-info {
    padding: 25px;
  }

  .detail-actions {
    flex-direction: column;
  }

  .more-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }

  .more-image-container {
    height: 120px;
  }

  .more-card-title {
    font-size: 14px;
    padding: 12px;
  }
}

@media (max-width: 480px) {
  .detail-header {
    margin-bottom: 30px;
  }

  .back-button {
    padding: 10px 16px;
    font-size: 13px;
  }

  .detail-title {
    font-size: 24px;
  }

  .detail-description {
    font-size: 14px;
  }

  .detail-info {
    padding: 20px;
  }

  .tag {
    font-size: 12px;
    padding: 4px 12px;
  }

  .like-button, .share-button {
    padding: 10px 20px;
    font-size: 13px;
  }

  .more-title {
    font-size: 24px;
    margin-bottom: 30px;
  }

  .more-grid {
    grid-template-columns: 1fr;
  }

  .more-image-container {
    height: 180px;
  }
}
</style>