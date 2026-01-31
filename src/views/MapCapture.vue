<template>
  <div class="map-capture">
    <h1 class="page-title">地图抢占</h1>
    
    <div class="map-container">
      <div class="map-wrapper">
        <!-- 地图容器 -->
        <div class="map minecraft-map" ref="mapRef">
          <!-- 我的世界风格地形 -->
          <div class="minecraft-terrain">
            <!-- 地形方块 -->
            <div v-for="(block, index) in terrainBlocks" :key="index" class="terrain-block" :style="{
              left: block.x + '%',
              top: block.y + '%',
              width: block.size + 'px',
              height: block.size + 'px',
              backgroundColor: block.color
            }"></div>
          </div>
          
          <!-- 网格布局的抢占区域 -->
          <div class="map-grid">
            <div 
              v-for="(area, index) in capturedAreas" 
              :key="index"
              class="capture-area minecraft-area"
              :style="{
                '--col': area.gridPosition.col,
                '--row': area.gridPosition.row
              }"
              @click="showUserWorks(area.user)"
            >
              <div class="area-info minecraft-info">
                <div class="area-avatar">{{ getUserAvatar(area.user.name) }}</div>
                <span class="area-username">{{ area.user.name }}</span>
                <span class="area-level">L{{ area.user.level }} 领地</span>
              </div>
            </div>
          </div>
          
          <!-- 我的世界风格元素 -->
          <div class="minecraft-elements">
            <!-- 树木 -->
            <div v-for="(tree, index) in trees" :key="'tree-'+index" class="minecraft-tree" :style="{
              left: tree.x + '%',
              bottom: tree.y + '%'
            }">
              <div class="tree-trunk"></div>
              <div class="tree-leaves"></div>
            </div>
            
            <!-- 山丘 -->
            <div v-for="(hill, index) in hills" :key="'hill-'+index" class="minecraft-hill" :style="{
              left: hill.x + '%',
              bottom: hill.y + '%',
              width: hill.width + '%',
              height: hill.height + '%'
            }"></div>
          </div>
        </div>
      </div>
      
      <!-- 用户作品详情弹窗 -->
      <div v-if="selectedUser" class="user-works-modal minecraft-modal" @click="closeModal">
        <div class="modal-content minecraft-modal-content" @click.stop>
          <button class="close-btn minecraft-close-btn" @click="closeModal">×</button>
          <h3 class="user-name">{{ selectedUser.name }} 的作品</h3>
          <div class="user-works-grid">
            <div 
              v-for="(work, workIndex) in selectedUser.works" 
              :key="workIndex"
              class="work-item minecraft-work-item"
            >
              <div class="work-icon">{{ getWorkIcon(work.type) }}</div>
              <div class="work-info">
                <h4 class="work-title">{{ work.title }}</h4>
                <p class="work-description">{{ work.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 作品统计 -->
    <div class="works-stats">
      <h2 class="stats-title">作品统计</h2>
      <div class="stats-content">
        <div class="stat-item">
          <span class="stat-label">总作品数量:</span>
          <span class="stat-value">{{ totalWorks }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">已抢占区域:</span>
          <span class="stat-value">{{ capturedAreas.length }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">活跃用户:</span>
          <span class="stat-value">{{ users.length }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// 地图引用
const mapRef = ref(null)

// 选中的用户
const selectedUser = ref(null)

// 作品类型对应的图标
const workIcons = {
  'aigc': '🎨',
  'video': '🎬',
  '3d': '📺',
  'photography': '🚁'
}

// 模拟用户数据
const users = ref([
  {
    id: 1,
    name: '老司机',
    works: [
      {
        id: 1,
        title: '奥斯卡奖杯',
        description: '金色的奥斯卡奖杯模型，象征着电影界的最高荣誉',
        type: '3d'
      },
      {
        id: 2,
        title: 'AI艺术设计',
        description: '使用人工智能生成的艺术作品',
        type: 'aigc'
      }
    ],
    activity: 95,
    level: 10
  },
  {
    id: 2,
    name: '卫斯理8168',
    works: [
      {
        id: 3,
        title: '鞋',
        description: '时尚的运动鞋模型，展示了现代 footwear 设计',
        type: '3d'
      },
      {
        id: 4,
        title: 'AI短视频',
        description: '人工智能生成的创意短视频',
        type: 'video'
      },
      {
        id: 5,
        title: '航拍作品',
        description: '高空拍摄的城市风景',
        type: 'photography'
      }
    ],
    activity: 88,
    level: 10
  },
  {
    id: 3,
    name: '鹿城区',
    works: [
      {
        id: 6,
        title: '机械',
        description: '精密的机械装置模型，展示了工业设计的美感',
        type: '3d'
      }
    ],
    activity: 75,
    level: 10
  },
  {
    id: 4,
    name: '江心屿',
    works: [
      {
        id: 7,
        title: '一棵树',
        description: '茂盛的树木模型，象征着自然与生命的力量',
        type: '3d'
      },
      {
        id: 8,
        title: '自然风景',
        description: '美丽的自然风景摄影',
        type: 'photography'
      }
    ],
    activity: 92,
    level: 10
  }
])

// 模拟抢占区域数据 - 网格状排列
const capturedAreas = ref([
  {
    id: 1,
    user: users.value[0],
    gridPosition: { col: 0, row: 0 }
  },
  {
    id: 2,
    user: users.value[0],
    gridPosition: { col: 1, row: 0 }
  },
  {
    id: 3,
    user: users.value[1],
    gridPosition: { col: 2, row: 0 }
  },
  {
    id: 4,
    user: users.value[0],
    gridPosition: { col: 0, row: 1 }
  },
  {
    id: 5,
    user: users.value[0],
    gridPosition: { col: 1, row: 1 }
  },
  {
    id: 6,
    user: users.value[0],
    gridPosition: { col: 2, row: 1 }
  },
  {
    id: 7,
    user: users.value[0],
    gridPosition: { col: 0, row: 2 }
  },
  {
    id: 8,
    user: users.value[0],
    gridPosition: { col: 1, row: 2 }
  },
  {
    id: 9,
    user: users.value[2],
    gridPosition: { col: 2, row: 2 }
  },
  {
    id: 10,
    user: users.value[0],
    gridPosition: { col: 0, row: 3 }
  },
  {
    id: 11,
    user: users.value[0],
    gridPosition: { col: 1, row: 3 }
  },
  {
    id: 12,
    user: users.value[0],
    gridPosition: { col: 2, row: 3 }
  },
  {
    id: 13,
    user: users.value[0],
    gridPosition: { col: 0, row: 4 }
  },
  {
    id: 14,
    user: users.value[0],
    gridPosition: { col: 1, row: 4 }
  },
  {
    id: 15,
    user: users.value[0],
    gridPosition: { col: 2, row: 4 }
  }
])

// 我的世界风格地形方块
const terrainBlocks = ref([])

// 树木
const trees = ref([
  { x: 15, y: 60 },
  { x: 45, y: 55 },
  { x: 80, y: 65 },
  { x: 90, y: 60 }
])

// 山丘
const hills = ref([
  { x: 10, y: 60, width: 20, height: 25 },
  { x: 35, y: 65, width: 25, height: 30 },
  { x: 70, y: 70, width: 20, height: 20 }
])

// 计算总作品数量
const totalWorks = computed(() => {
  return users.value.reduce((total, user) => total + user.works.length, 0)
})

// 生成地形方块
const generateTerrain = () => {
  const blocks = []
  const blockSize = 16 // 方块大小
  const colors = ['#7CFC00', '#90EE90', '#8FBC8F', '#228B22'] // 草地颜色
  
  // 生成随机地形方块
  for (let i = 0; i < 100; i++) {
    blocks.push({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: blockSize,
      color: colors[Math.floor(Math.random() * colors.length)]
    })
  }
  
  terrainBlocks.value = blocks
}

// 显示用户作品
const showUserWorks = (user) => {
  selectedUser.value = user
}

// 关闭弹窗
const closeModal = () => {
  selectedUser.value = null
}

// 获取作品图标
const getWorkIcon = (type) => {
  return workIcons[type] || '📁'
}

// 获取用户头像
const getUserAvatar = (name) => {
  // 简单的头像生成，使用名字的第一个字符
  return name.charAt(0)
}

// 初始化地图
onMounted(() => {
  generateTerrain()
})
</script>

<style scoped>
/* 导入像素字体 */
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

/* 全局样式 */
.map-capture {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

.page-title {
  font-size: 36px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 60px;
  background: var(--primary-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 0 30px var(--primary-glow);
  font-family: 'Minecraft', monospace;
}

.map-container {
  background: var(--card-bg);
  backdrop-filter: blur(25px);
  border-radius: 0;
  padding: 40px;
  box-shadow: 
    0 20px 60px rgba(0, 0, 0, 0.4),
    0 0 40px var(--primary-glow);
  border: 4px solid #555;
  margin-bottom: 60px;
  position: relative;
}

.map-wrapper {
  position: relative;
  width: 100%;
  height: 500px;
  overflow: hidden;
  border-radius: 0;
  border: 4px solid #333;
}

/* 我的世界风格地图 */
.minecraft-map {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  /* 像素风格边框 */
  box-shadow: 
    inset 0 0 0 4px #555,
    inset 0 0 0 8px rgba(26, 26, 78, 0.8);
  /* 真实地图背景 */
  background-image: url('https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=map%20of%20wenzhou%20city%20with%20rivers%20and%20roads%20in%20light%20blue%20and%20yellow%20colors&image_size=landscape_16_9');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  /* 设置透明度 */
  opacity: 0.7;
  /* 3D效果 */
  perspective: 1000px;
}

/* 地形方块 */
.minecraft-terrain {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.terrain-block {
  position: absolute;
  border: 1px solid rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
}

/* 抢占区域 - 3D效果 */
.minecraft-area {
  position: absolute;
  background: rgba(255, 215, 0, 0.6);
  border: 2px solid #FFD700;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* 像素风格 */
  box-shadow: 
    4px 4px 0 rgba(0, 0, 0, 0.3),
    0 4px 8px rgba(0, 0, 0, 0.2);
  /* 网格状排列 */
  width: 80px !important;
  height: 80px !important;
  left: calc(var(--col) * 90px) !important;
  top: calc(var(--row) * 90px) !important;
  /* 3D效果 */
  transform-style: preserve-3d;
  transform: translateZ(10px);
}

.minecraft-area:hover {
  background: rgba(255, 215, 0, 0.8);
  transform: translateZ(20px) scale(1.05);
  box-shadow: 
    8px 8px 0 rgba(0, 0, 0, 0.3),
    0 8px 16px rgba(255, 215, 0, 0.8);
}

.minecraft-info {
  text-align: center;
  color: #000;
  font-size: 8px;
  font-weight: bold;
  font-family: 'Minecraft', monospace;
  text-shadow: 1px 1px 0px #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.area-avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #fff;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #333;
  font-size: 16px;
}

.area-username {
  display: block;
  margin-bottom: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 70px;
}

.area-level {
  font-size: 7px;
  opacity: 0.8;
  background: rgba(0, 0, 0, 0.2);
  padding: 1px 4px;
  border-radius: 4px;
}

/* 网格布局容器 */
.map-grid {
  position: absolute;
  top: 20px;
  left: 20px;
  display: grid;
  grid-template-columns: repeat(5, 90px);
  grid-template-rows: repeat(5, 90px);
  gap: 10px;
}

/* 我的世界风格元素 */
.minecraft-elements {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}

/* 树木 - 3D效果 */
.minecraft-tree {
  position: absolute;
  pointer-events: none;
  transform-style: preserve-3d;
  transition: transform 0.5s ease;
}

.minecraft-tree:hover {
  transform: rotateY(15deg) rotateX(10deg);
}

.tree-trunk {
  width: 16px;
  height: 32px;
  background: #8B4513;
  border: 2px solid rgba(0, 0, 0, 0.3);
  margin: 0 auto;
  /* 3D效果 */
  transform: translateZ(5px);
  box-shadow: 
    4px 4px 0 rgba(0, 0, 0, 0.3),
    0 4px 8px rgba(0, 0, 0, 0.2);
}

.tree-leaves {
  width: 48px;
  height: 48px;
  background: #228B22;
  border: 2px solid rgba(0, 0, 0, 0.3);
  margin: -8px -16px;
  /* 3D效果 */
  transform: translateZ(10px);
  box-shadow: 
    6px 6px 0 rgba(0, 0, 0, 0.3),
    0 6px 12px rgba(0, 0, 0, 0.2);
}

/* 山丘 */
.minecraft-hill {
  position: absolute;
  background: #90EE90;
  border: 2px solid rgba(0, 0, 0, 0.3);
  /* 像素风格山丘 */
  clip-path: polygon(
    0% 100%, 10% 90%, 20% 95%, 30% 85%, 40% 90%,
    50% 80%, 60% 85%, 70% 75%, 80% 80%, 90% 70%, 100% 75%,
    100% 100%
  );
}

/* 用户作品详情弹窗 - 我的世界风格 */
.minecraft-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.minecraft-modal-content {
  background: #87CEEB;
  border: 8px solid #555;
  padding: 40px;
  max-width: 600px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 
    0 20px 60px rgba(0, 0, 0, 0.4),
    0 0 40px var(--primary-glow);
  position: relative;
  /* 像素风格 */
  box-sizing: border-box;
}

.minecraft-close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: #FF6347;
  border: 4px solid #333;
  font-size: 24px;
  color: #fff;
  cursor: pointer;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-family: 'Minecraft', monospace;
}

.minecraft-close-btn:hover {
  background: #FF4500;
  transform: scale(1.1);
}

.user-name {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 30px;
  color: #000;
  text-align: center;
  font-family: 'Minecraft', monospace;
  text-shadow: 2px 2px 0px #fff;
}

.user-works-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

/* 作品项 - 我的世界风格 */
.minecraft-work-item {
  background: #F0E68C;
  border: 4px solid #333;
  padding: 20px;
  transition: all 0.3s ease;
  box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.3);
}

.minecraft-work-item:hover {
  background: #FFFFE0;
  transform: translateY(-5px);
  box-shadow: 
    6px 6px 0 rgba(0, 0, 0, 0.3),
    0 10px 30px rgba(255, 215, 0, 0.5);
}

.work-icon {
  font-size: 32px;
  margin-bottom: 12px;
}

.work-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
  color: #000;
  font-family: 'Minecraft', monospace;
}

.work-description {
  font-size: 14px;
  color: #333;
  line-height: 1.4;
  font-family: 'Minecraft', monospace;
}

/* 作品统计 */
.works-stats {
  background: var(--card-bg);
  backdrop-filter: blur(25px);
  border-radius: 24px;
  padding: 40px;
  box-shadow: 
    0 20px 60px rgba(0, 0, 0, 0.4),
    0 0 40px var(--primary-glow);
  border: 1px solid var(--border-color);
}

.stats-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 30px;
  text-align: center;
  color: white;
}

.stats-content {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 30px;
}

.stat-item {
  text-align: center;
  padding: 20px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  min-width: 150px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.stat-label {
  display: block;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 8px;
}

.stat-value {
  display: block;
  font-size: 28px;
  font-weight: bold;
  background: var(--primary-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 0 10px var(--primary-glow);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .map-capture {
    padding: 20px 15px;
  }
  
  .page-title {
    font-size: 28px;
    margin-bottom: 40px;
  }
  
  .map-container {
    padding: 20px;
  }
  
  .map-wrapper {
    height: 400px;
  }
  
  .minecraft-modal-content {
    padding: 30px;
    width: 95%;
  }
  
  .user-works-grid {
    grid-template-columns: 1fr;
  }
  
  .works-stats {
    padding: 30px;
  }
  
  .stats-content {
    flex-direction: column;
    align-items: center;
  }
  
  .stat-item {
    width: 100%;
    max-width: 300px;
  }
}

/* 应用像素字体 */
.page-title,
.minecraft-info,
.user-name,
.work-title,
.work-description {
  font-family: 'Press Start 2P', cursive;
}

/* 调整像素字体大小 */
.minecraft-info {
  font-size: 10px;
}

.user-name {
  font-size: 18px;
}

.work-title {
  font-size: 12px;
}

.work-description {
  font-size: 10px;
}
</style>