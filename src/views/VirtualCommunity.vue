<template>
  <div class="virtual-community">
    <div class="page-header">
      <h1>三维虚拟社区</h1>
      <p>欢迎来到聚灵OPC社区的三维虚拟空间</p>
    </div>
    
    <div class="community-container">
      <div class="three-container">
        <div ref="threeCanvas" class="three-canvas"></div>
        
        <div class="control-hints">
          <div class="hint-item">
            <span class="hint-key">WASD</span>
            <span class="hint-text">移动人物</span>
          </div>
          <div class="hint-item">
            <span class="hint-key">鼠标</span>
            <span class="hint-text">旋转视角</span>
          </div>
          <div class="hint-item">
            <span class="hint-key">点击模型</span>
            <span class="hint-text">查看信息</span>
          </div>
        </div>
        
        <div v-if="selectedModel" class="model-info-panel">
          <div class="info-header">
            <h3>{{ selectedModel.name }}</h3>
            <button class="close-btn" @click="selectedModel = null">×</button>
          </div>
          <div class="info-content">
            <p>{{ selectedModel.description }}</p>
            <div class="info-details" v-if="selectedModel.details">
              <div v-for="(detail, key) in selectedModel.details" :key="key" class="detail-item">
                <span class="detail-label">{{ key }}:</span>
                <span class="detail-value">{{ detail }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="info-sidebar">
        <div class="sidebar-section">
          <h3>社区概览</h3>
          <div class="community-stats">
            <div class="stat-item">
              <div class="stat-value">{{ modelCount }}</div>
              <div class="stat-label">模型数量</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">{{ buildingCount }}</div>
              <div class="stat-label">建筑数量</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">{{ treeCount }}</div>
              <div class="stat-label">树木数量</div>
            </div>
          </div>
        </div>
        
        <div class="sidebar-section">
          <h3>社区导航</h3>
          <div class="navigation-points">
            <div 
              v-for="point in navigationPoints" 
              :key="point.id"
              class="nav-point"
              @click="navigateToPoint(point.position)"
            >
              <span class="nav-icon">{{ point.icon }}</span>
              <span class="nav-name">{{ point.name }}</span>
            </div>
          </div>
        </div>
        
        <div class="sidebar-section">
          <h3>操作指南</h3>
          <ul class="guide-list">
            <li>使用WASD键在社区中移动</li>
            <li>使用鼠标拖动旋转视角</li>
            <li>点击任意模型查看详细信息</li>
            <li>通过导航点快速移动到指定位置</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const threeCanvas = ref(null)
const selectedModel = ref(null)
const modelCount = ref(0)
const buildingCount = ref(0)
const treeCount = ref(0)

const navigationPoints = [
  { id: 1, name: '社区中心', icon: '🏛️', position: { x: 0, y: 0, z: 0 } },
  { id: 2, name: '医院', icon: '🏥', position: { x: -20, y: 0, z: 15 } },
  { id: 3, name: '居民区', icon: '🏠', position: { x: 15, y: 0, z: -10 } },
  { id: 4, name: '公园', icon: '🌳', position: { x: -10, y: 0, z: -20 } }
]

let scene = null
let camera = null
let renderer = null
let character = null
let raycaster = null
let mouse = null
let models = []
let keys = {}

const initThreeScene = () => {
  if (!threeCanvas.value) return
  
  scene = new THREE.Scene()
  scene.background = new THREE.Color(0x87CEEB)
  
  camera = new THREE.PerspectiveCamera(
    75,
    threeCanvas.value.clientWidth / threeCanvas.value.clientHeight,
    0.1,
    1000
  )
  camera.position.set(12, 3, 15)
  
  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(threeCanvas.value.clientWidth, threeCanvas.value.clientHeight)
  renderer.setPixelRatio(window.devicePixelRatio)
  threeCanvas.value.appendChild(renderer.domElement)
  
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
  scene.add(ambientLight)
  
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
  directionalLight.position.set(5, 10, 5)
  scene.add(directionalLight)
  
  const groundGeometry = new THREE.PlaneGeometry(100, 100)
  const groundMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x8B4513,
    side: THREE.DoubleSide
  })
  const ground = new THREE.Mesh(groundGeometry, groundMaterial)
  ground.rotation.x = Math.PI / 2
  scene.add(ground)
  
  raycaster = new THREE.Raycaster()
  mouse = new THREE.Vector2()
  
  buildCommunity()
  createCharacter()
  
  threeCanvas.value.addEventListener('mousedown', onMouseDown)
  window.addEventListener('keydown', onKeyDown)
  window.addEventListener('keyup', onKeyUp)
  window.addEventListener('resize', onWindowResize)
  
  animate()
}

const buildCommunity = () => {
  createRoad()
  createBuildings()
  createTrees()
  createCars()
  createAnimals()
  
  modelCount.value = models.length
  buildingCount.value = models.filter(m => m.type === 'building').length
  treeCount.value = models.filter(m => m.type === 'tree').length
}

const createRoad = () => {
  const roadGeometry = new THREE.PlaneGeometry(40, 8)
  const roadMaterial = new THREE.MeshStandardMaterial({ color: 0x444444 })
  const road = new THREE.Mesh(roadGeometry, roadMaterial)
  road.rotation.x = Math.PI / 2
  road.position.set(0, 0.01, 0)
  scene.add(road)
  
  const sideRoadGeometry = new THREE.PlaneGeometry(20, 6)
  const sideRoad = new THREE.Mesh(sideRoadGeometry, roadMaterial)
  sideRoad.rotation.x = Math.PI / 2
  sideRoad.rotation.z = Math.PI / 2
  sideRoad.position.set(0, 0.01, -15)
  scene.add(sideRoad)
}

const createBuildings = () => {
  createBuilding(0, 0, 0, '社区中心', '🏛️', {
    height: 5,
    width: 8,
    depth: 8,
    color: 0xDC143C
  })
  
  createBuilding(-20, 0, 15, '医院', '🏥', {
    height: 6,
    width: 10,
    depth: 8,
    color: 0x87CEEB
  })
  
  createBuilding(15, 0, -10, '住宅', '🏠', {
    height: 3,
    width: 6,
    depth: 6,
    color: 0x90EE90
  })
  
  createBuilding(25, 0, -5, '住宅', '🏠', {
    height: 3,
    width: 6,
    depth: 6,
    color: 0xFFA500
  })
  
  createBuilding(-15, 0, -10, '商店', '🏪', {
    height: 4,
    width: 7,
    depth: 5,
    color: 0xFF6347
  })
}

const createBuilding = (x, y, z, name, icon, options) => {
  const { height, width, depth, color } = options
  
  const geometry = new THREE.BoxGeometry(width, height, depth)
  const material = new THREE.MeshStandardMaterial({ color })
  const building = new THREE.Mesh(geometry, material)
  building.position.set(x, y + height / 2, z)
  
  scene.add(building)
  
  models.push({
    id: `building-${models.length + 1}`,
    name,
    icon,
    type: 'building',
    mesh: building,
    position: { x, y, z },
    description: `${name}是社区的重要建筑`,
    details: {
      高度: `${height}m`,
      宽度: `${width}m`,
      深度: `${depth}m`
    }
  })
}

const createTrees = () => {
  const treePositions = [
    { x: 5, z: 10 },
    { x: -5, z: 10 },
    { x: 10, z: 15 },
    { x: -10, z: 15 },
    { x: 0, z: 20 },
    { x: 20, z: 0 },
    { x: -20, z: 0 },
    { x: 0, z: -20 }
  ]
  
  treePositions.forEach(pos => {
    createTree(pos.x, 0, pos.z)
  })
}

const createTree = (x, y, z) => {
  const trunkGeometry = new THREE.CylinderGeometry(0.5, 0.5, 2)
  const trunkMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 })
  const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial)
  trunk.position.set(x, y + 1, z)
  
  const crownGeometry = new THREE.SphereGeometry(2, 16, 16)
  const crownMaterial = new THREE.MeshStandardMaterial({ color: 0x228B22 })
  const crown = new THREE.Mesh(crownGeometry, crownMaterial)
  crown.position.set(x, y + 3, z)
  
  scene.add(trunk)
  scene.add(crown)
  
  models.push({
    id: `tree-${models.length + 1}`,
    name: '树木',
    icon: '🌳',
    type: 'tree',
    mesh: crown,
    position: { x, y, z },
    description: '社区中的绿化树木',
    details: {
      高度: '5m',
      类型: '落叶乔木'
    }
  })
}

const createCars = () => {
  const carPositions = [
    { x: -15, z: 0, rotation: 0 },
    { x: 10, z: 0, rotation: Math.PI }
  ]
  
  carPositions.forEach((pos, index) => {
    createCar(pos.x, 0, pos.z, pos.rotation, index)
  })
}

const createCar = (x, y, z, rotation, index) => {
  const colors = [0xFF0000, 0x0000FF, 0x00FF00, 0xFFFF00]
  const color = colors[index % colors.length]
  
  const carGeometry = new THREE.BoxGeometry(3, 0.8, 1.5)
  const carMaterial = new THREE.MeshStandardMaterial({ color })
  const car = new THREE.Mesh(carGeometry, carMaterial)
  car.position.set(x, y + 0.4, z)
  car.rotation.y = rotation
  
  scene.add(car)
  
  models.push({
    id: `car-${models.length + 1}`,
    name: '汽车',
    icon: '🚗',
    type: 'car',
    mesh: car,
    position: { x, y, z },
    description: '社区中的车辆',
    details: {
      颜色: getColorName(color),
      状态: '停放中'
    }
  })
}

const createAnimals = () => {
  const animalPositions = [
    { x: 5, z: 15 },
    { x: -5, z: -15 }
  ]
  
  animalPositions.forEach((pos, index) => {
    createAnimal(pos.x, 0, pos.z, index)
  })
}

const createAnimal = (x, y, z, index) => {
  const animalTypes = [
    { name: '狗', icon: '🐶', size: 0.8, color: 0x808080 },
    { name: '猫', icon: '🐱', size: 0.6, color: 0xFFA500 }
  ]
  
  const type = animalTypes[index % animalTypes.length]
  
  const animalGeometry = new THREE.SphereGeometry(type.size, 16, 16)
  const animalMaterial = new THREE.MeshStandardMaterial({ color: type.color })
  const animal = new THREE.Mesh(animalGeometry, animalMaterial)
  animal.position.set(x, y + type.size, z)
  
  scene.add(animal)
  
  models.push({
    id: `animal-${models.length + 1}`,
    name: type.name,
    icon: type.icon,
    type: 'animal',
    mesh: animal,
    position: { x, y, z },
    description: `社区中的${type.name}`,
    details: {
      大小: `${type.size * 2}m`,
      类型: type.name
    }
  })
}

const createCharacter = () => {
  const bodyGeometry = new THREE.CylinderGeometry(0.5, 0.5, 2, 8)
  const bodyMaterial = new THREE.MeshStandardMaterial({ color: 0xFFD700 })
  const body = new THREE.Mesh(bodyGeometry, bodyMaterial)
  body.position.set(10, 1, 10)
  
  const headGeometry = new THREE.SphereGeometry(0.4)
  const headMaterial = new THREE.MeshStandardMaterial({ color: 0xFFCC99 })
  const head = new THREE.Mesh(headGeometry, headMaterial)
  head.position.set(10, 2.4, 10)
  
  scene.add(body)
  scene.add(head)
  
  character = {
    body,
    head,
    position: { x: 10, y: 0, z: 10 },
    speed: 0.1
  }
}

const animate = () => {
  requestAnimationFrame(animate)
  updateCharacter()
  if (renderer && scene && camera) {
    renderer.render(scene, camera)
  }
}

const updateCharacter = () => {
  if (!character) return
  
  let moveForward = keys['w'] || keys['W']
  let moveBackward = keys['s'] || keys['S']
  let moveLeft = keys['a'] || keys['A']
  let moveRight = keys['d'] || keys['D']
  
  if (moveForward) {
    character.position.z -= character.speed
    character.body.position.z -= character.speed
    character.head.position.z -= character.speed
    camera.position.z -= character.speed
  }
  
  if (moveBackward) {
    character.position.z += character.speed
    character.body.position.z += character.speed
    character.head.position.z += character.speed
    camera.position.z += character.speed
  }
  
  if (moveLeft) {
    character.position.x -= character.speed
    character.body.position.x -= character.speed
    character.head.position.x -= character.speed
    camera.position.x -= character.speed
  }
  
  if (moveRight) {
    character.position.x += character.speed
    character.body.position.x += character.speed
    character.head.position.x += character.speed
    camera.position.x += character.speed
  }
  
  if (camera && character) {
    camera.lookAt(character.body.position)
  }
}

const onMouseDown = (event) => {
  const rect = threeCanvas.value.getBoundingClientRect()
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1
  
  raycaster.setFromCamera(mouse, camera)
  const intersects = raycaster.intersectObjects(models.map(m => m.mesh))
  
  if (intersects.length > 0) {
    const clickedMesh = intersects[0].object
    const model = models.find(m => m.mesh === clickedMesh)
    
    if (model) {
      selectedModel.value = model
    }
  }
}

const onKeyDown = (event) => {
  keys[event.key] = true
}

const onKeyUp = (event) => {
  keys[event.key] = false
}

const onWindowResize = () => {
  if (!camera || !renderer || !threeCanvas.value) return
  
  const width = threeCanvas.value.clientWidth
  const height = threeCanvas.value.clientHeight
  
  camera.aspect = width / height
  camera.updateProjectionMatrix()
  
  renderer.setSize(width, height)
}

const navigateToPoint = (position) => {
  if (!character || !camera) return
  
  character.position.x = position.x
  character.position.z = position.z
  character.body.position.x = position.x
  character.body.position.z = position.z
  character.head.position.x = position.x
  character.head.position.z = position.z
  
  camera.position.x = position.x
  camera.position.z = position.z + 5
  camera.position.y = 3
}

const getColorName = (color) => {
  const colorMap = {
    0xFF0000: '红色',
    0x0000FF: '蓝色',
    0x00FF00: '绿色',
    0xFFFF00: '黄色'
  }
  return colorMap[color] || '其他'
}

onMounted(() => {
  const script = document.createElement('script')
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js'
  script.onload = () => {
    initThreeScene()
  }
  document.head.appendChild(script)
})

onUnmounted(() => {
  if (threeCanvas.value) {
    threeCanvas.value.removeEventListener('mousedown', onMouseDown)
  }
  
  window.removeEventListener('keydown', onKeyDown)
  window.removeEventListener('keyup', onKeyUp)
  window.removeEventListener('resize', onWindowResize)
  
  if (scene) {
    scene.clear()
  }
  
  if (renderer) {
    renderer.dispose()
  }
})
</script>

<style scoped>
.virtual-community {
  min-height: 100vh;
  padding: 20px;
}

.page-header {
  text-align: center;
  margin-bottom: 40px;
}

.page-header h1 {
  font-size: 36px;
  font-weight: bold;
  background: var(--primary-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 10px;
}

.page-header p {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.8);
}

.community-container {
  display: flex;
  gap: 30px;
  max-width: 1400px;
  margin: 0 auto;
}

.three-container {
  flex: 1;
  position: relative;
  min-height: 600px;
  background: rgba(15, 15, 35, 0.8);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.three-canvas {
  width: 100%;
  height: 100%;
  min-height: 600px;
  cursor: crosshair;
}

.control-hints {
  position: absolute;
  bottom: 20px;
  left: 20px;
  background: rgba(15, 15, 35, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  padding: 15px;
  display: flex;
  gap: 20px;
  border: 1px solid var(--border-color);
}

.hint-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.hint-key {
  background: var(--primary-glow);
  padding: 4px 8px;
  border-radius: 4px;
  font-weight: bold;
  font-size: 14px;
  min-width: 60px;
  text-align: center;
}

.hint-text {
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
}

.model-info-panel {
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(15, 15, 35, 0.95);
  backdrop-filter: blur(15px);
  border-radius: 15px;
  padding: 20px;
  width: 300px;
  border: 1px solid var(--border-color);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.info-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.info-header h3 {
  font-size: 18px;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 8px;
}

.close-btn {
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.8);
  font-size: 20px;
  cursor: pointer;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.close-btn:hover {
  background: var(--primary-glow);
  color: #ffffff;
}

.info-content p {
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 15px;
  line-height: 1.4;
}

.info-details {
  border-top: 1px solid var(--border-color);
  padding-top: 10px;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 14px;
}

.detail-label {
  color: rgba(255, 255, 255, 0.7);
}

.detail-value {
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
}

.info-sidebar {
  width: 300px;
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.sidebar-section {
  background: rgba(15, 15, 35, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 20px;
  border: 1px solid var(--border-color);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
}

.sidebar-section h3 {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 15px;
  color: #ffffff;
}

.community-stats {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.stat-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background: rgba(102, 126, 234, 0.1);
  border-radius: 10px;
}

.stat-value {
  font-size: 24px;
  font-weight: bold;
  background: var(--primary-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.stat-label {
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
}

.navigation-points {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.nav-point {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: rgba(102, 126, 234, 0.1);
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid transparent;
}

.nav-point:hover {
  background: var(--primary-glow);
  border-color: var(--border-color);
  transform: translateX(5px);
}

.nav-icon {
  font-size: 20px;
  min-width: 24px;
}

.nav-name {
  color: rgba(255, 255, 255, 0.9);
  font-size: 14px;
  font-weight: 500;
}

.guide-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.guide-list li {
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
  line-height: 1.4;
  padding-left: 20px;
  position: relative;
}

.guide-list li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: var(--primary-glow);
  font-size: 18px;
}

@media (max-width: 1024px) {
  .community-container {
    flex-direction: column;
  }
  
  .info-sidebar {
    width: 100%;
    flex-direction: row;
    flex-wrap: wrap;
  }
  
  .sidebar-section {
    flex: 1;
    min-width: 250px;
  }
}

@media (max-width: 768px) {
  .virtual-community {
    padding: 10px;
  }
  
  .page-header h1 {
    font-size: 28px;
  }
  
  .three-container {
    min-height: 500px;
  }
  
  .three-canvas {
    min-height: 500px;
  }
  
  .control-hints {
    flex-direction: column;
    gap: 10px;
    bottom: 10px;
    left: 10px;
    right: 10px;
  }
  
  .model-info-panel {
    width: calc(100% - 40px);
    top: 10px;
    left: 10px;
    right: 10px;
  }
  
  .info-sidebar {
    flex-direction: column;
  }
  
  .sidebar-section {
    min-width: 100%;
  }
}
</style>