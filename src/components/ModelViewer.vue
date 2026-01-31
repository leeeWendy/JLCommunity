<template>
  <div 
    ref="containerRef" 
    class="model-viewer"
    :class="{ 'loading': isLoading }"
    :style="{ width: size + 'px', height: size + 'px' }"
  >
    <!-- 加载状态 -->
    <div v-if="isLoading" class="loading-overlay">
      <div class="loading-spinner"></div>
      <div class="loading-text">加载中...</div>
    </div>
    
    <!-- 错误状态 -->
    <div v-if="isError" class="error-overlay">
      <div class="error-icon">❌</div>
      <div class="error-text">模型加载失败</div>
      <div class="error-description">{{ errorMessage }}</div>
      <button class="retry-button" @click="retryLoad">重试</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js'

const props = defineProps({
  modelUrl: {
    type: String,
    default: ''
  },
  modelName: {
    type: String,
    default: ''
  },
  size: {
    type: Number,
    default: 200
  },
  autoRotate: {
    type: Boolean,
    default: true
  },
  showLoading: {
    type: Boolean,
    default: true
  }
})

const containerRef = ref(null)
let scene = null
let camera = null
let renderer = null
let model = null
let animationId = null
let loader = null
let controls = null

// 状态管理
const isLoading = ref(false)
const isError = ref(false)
const errorMessage = ref('')

// 交互状态
const mouseDown = ref(false)
const lastMousePos = ref({ x: 0, y: 0 })
const cameraTarget = ref(new THREE.Vector3(0, 0, 5))
const modelRotation = ref(new THREE.Euler(0, 0, 0))
const isAutoRotate = ref(props.autoRotate)

// 初始化Three.js场景
const initScene = () => {
  console.log('开始初始化3D场景')
  
  if (!containerRef.value) {
    console.error('容器元素不存在')
    return
  }

  try {
    // 创建场景
    scene = new THREE.Scene()
    
    // 添加环境光
    const ambientLight = new THREE.AmbientLight(0xf5d7db, 0.9)
    scene.add(ambientLight)

    // 添加方向光 - 主光源
    const directionalLight1 = new THREE.DirectionalLight(0xf5d7db, 1.8)
    directionalLight1.position.set(1, 1, 1)
    directionalLight1.castShadow = true
    directionalLight1.shadow.mapSize.width = 2048
    directionalLight1.shadow.mapSize.height = 2048
    scene.add(directionalLight1)

    // 添加方向光 - 辅助光源
    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 1.0)
    directionalLight2.position.set(-1, -1, 1)
    directionalLight2.castShadow = true
    scene.add(directionalLight2)

    // 添加方向光 - 侧光
    const directionalLight3 = new THREE.DirectionalLight(0xc11b17, 0.8)
    directionalLight3.position.set(0, 1, -1)
    scene.add(directionalLight3)

    // 添加方向光 - 背光
    const directionalLight4 = new THREE.DirectionalLight(0x550000, 0.6)
    directionalLight4.position.set(0, -1, -1)
    scene.add(directionalLight4)

    // 添加半球光
    const hemisphereLight = new THREE.HemisphereLight(0xc11b17, 0x550000, 0.6)
    scene.add(hemisphereLight)

    // 添加点光源 - 增强红宝石的光泽
    const pointLight = new THREE.PointLight(0xc11b17, 0.6, 10)
    pointLight.position.set(0, 2, 2)
    scene.add(pointLight)

    // 创建相机
    camera = new THREE.PerspectiveCamera(
      60,
      props.size / props.size,
      0.01,
      1000
    )
    camera.position.set(0, 0, 5)
    camera.lookAt(0, 0, 0)

    // 创建渲染器
    renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    })
    renderer.setSize(props.size, props.size)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap

    // 添加到容器
    if (containerRef.value) {
      // 更安全的方式：检查并移除现有的渲染器元素
      const existingCanvas = containerRef.value.querySelector('canvas')
      if (existingCanvas) {
        containerRef.value.removeChild(existingCanvas)
      }
      containerRef.value.appendChild(renderer.domElement)
    }

    // 开始加载模型
    loadModel()

    // 开始动画
    animate()
  } catch (error) {
    console.error('场景初始化失败:', error)
    handleLoadError(error)
  }
}

// 根据模型名称创建预设模型
const createModelByType = (modelName) => {
  console.log('根据模型名称创建预设模型:', modelName)
  
  switch (modelName) {
    case '奥斯卡奖杯':
      return createOscarTrophy()
    case '鞋':
      return createShoe()
    case '机械':
      return createMachine()
    case '一棵树':
      return createTree()
    default:
      return createTestCube()
  }
}

// 创建奥斯卡奖杯模型
const createOscarTrophy = () => {
  const group = new THREE.Group()
  
  // 简化的奖杯模型
  const geometry = new THREE.CylinderGeometry(0.5, 0.6, 2, 32)
  const material = new THREE.MeshStandardMaterial({
    color: 0xffd700,
    metalness: 0.9,
    roughness: 0.1
  })
  const trophy = new THREE.Mesh(geometry, material)
  group.add(trophy)
  
  return group
}

// 创建鞋子模型
const createShoe = () => {
  const group = new THREE.Group()
  
  // 简化的鞋子模型
  const geometry = new THREE.BoxGeometry(1.5, 0.8, 0.6)
  const material = new THREE.MeshStandardMaterial({
    color: 0xff5733,
    metalness: 0.1,
    roughness: 0.9
  })
  const shoe = new THREE.Mesh(geometry, material)
  group.add(shoe)
  
  return group
}

// 创建机械模型
const createMachine = () => {
  const group = new THREE.Group()
  
  // 简化的机械模型
  const geometry = new THREE.BoxGeometry(1, 1, 1)
  const material = new THREE.MeshStandardMaterial({
    color: 0x666666,
    metalness: 0.7,
    roughness: 0.3
  })
  const machine = new THREE.Mesh(geometry, material)
  group.add(machine)
  
  return group
}

// 创建树模型
const createTree = () => {
  const group = new THREE.Group()
  
  // 简化的树模型
  const geometry = new THREE.ConeGeometry(0.8, 2, 32)
  const material = new THREE.MeshStandardMaterial({
    color: 0x27ae60,
    metalness: 0.1,
    roughness: 0.9
  })
  const tree = new THREE.Mesh(geometry, material)
  group.add(tree)
  
  return group
}

// 加载模型
const loadModel = () => {
  if (props.showLoading) {
    isLoading.value = true
    isError.value = false
  }
  
  // 如果没有模型URL，根据模型名称创建预设模型
  if (!props.modelUrl) {
    console.log('没有模型URL，根据模型名称创建预设模型:', props.modelName)
    const presetModel = createModelByType(props.modelName)
    processLoadedModel(presetModel)
    isLoading.value = false
    return
  }
  
  console.log('开始加载模型:', props.modelUrl)
  
  // 处理本地文件URL
  let extension = 'obj' // 默认使用obj格式
  
  // 尝试从原始文件名中获取扩展名
  if (props.modelUrl.includes('blob:')) {
    // 对于blob URL，我们需要从完整的模型对象中获取信息
    // 但由于组件设计限制，我们无法直接获取原始文件名
    // 这里我们改为尝试所有可能的加载器，从最常见的开始
    console.log('检测到本地文件URL，尝试多种加载器')
    
    // 首先尝试GLTF/GLB加载器（最常见的现代格式）
    const loader = new GLTFLoader()
    
    loader.load(
      props.modelUrl,
      (gltf) => {
        console.log('GLTF模型加载成功')
        processLoadedModel(gltf.scene)
        isLoading.value = false
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded')
      },
      (error) => {
        console.error('GLTF模型加载失败:', error)
        console.log('尝试使用OBJ加载器')
        
        // 如果GLTF加载失败，尝试OBJ加载器
        const objLoader = new OBJLoader()
        
        objLoader.load(
          props.modelUrl,
          (object) => {
            console.log('OBJ模型加载成功')
            
            // 为没有材质的网格添加默认材质
            object.traverse((child) => {
              if (child.isMesh) {
                if (!child.material) {
                  child.material = new THREE.MeshStandardMaterial({
                    color: 0xc11b17,
                    metalness: 0.8,
                    roughness: 0.05,
                    side: THREE.DoubleSide,
                    emissive: 0x550000,
                    emissiveIntensity: 0.3,
                    reflectivity: 1.0,
                    clearcoat: 0.5,
                    clearcoatRoughness: 0.05,
                    transparent: true,
                    opacity: 0.9
                  })
                }
                child.castShadow = true
                child.receiveShadow = true
              }
            })
            
            processLoadedModel(object)
            isLoading.value = false
          },
          (xhr) => {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded')
          },
          (error) => {
            console.error('OBJ模型加载失败:', error)
            console.log('尝试使用STL加载器')
            
            // 如果OBJ加载失败，尝试STL加载器
            const stlLoader = new STLLoader()
            
            stlLoader.load(
              props.modelUrl,
              (geometry) => {
                console.log('STL模型加载成功')
                
                // 创建网格
                const material = new THREE.MeshStandardMaterial({
                  color: 0xc11b17,
                  metalness: 0.8,
                  roughness: 0.05,
                  side: THREE.DoubleSide,
                  emissive: 0x550000,
                  emissiveIntensity: 0.3,
                  reflectivity: 1.0,
                  clearcoat: 0.5,
                  clearcoatRoughness: 0.05,
                  transparent: true,
                  opacity: 0.9
                })
                const mesh = new THREE.Mesh(geometry, material)
                mesh.castShadow = true
                mesh.receiveShadow = true
                
                processLoadedModel(mesh)
                isLoading.value = false
              },
              (xhr) => {
                console.log((xhr.loaded / xhr.total * 100) + '% loaded')
              },
              (error) => {
                console.error('STL模型加载失败:', error)
                console.log('所有加载器都失败，显示错误立方体')
                handleLoadError(error)
              }
            )
          }
        )
      }
    )
  } else {
    // 对于普通URL，根据扩展名选择加载器
    extension = props.modelUrl.split('.').pop().toLowerCase()
    console.log('模型扩展名:', extension)
    
    if (extension === 'gltf' || extension === 'glb') {
      loadGLTFModel(props.modelUrl)
    } else if (extension === 'obj') {
      loadOBJModel(props.modelUrl)
    } else if (extension === 'stl') {
      loadSTLModel(props.modelUrl)
    } else {
      // 对于其他格式，使用测试立方体
      console.log('未知格式，使用测试立方体')
      createTestCube()
      isLoading.value = false
    }
  }
}

// 加载GLTF模型
const loadGLTFModel = (url) => {
  const loader = new GLTFLoader()
  
  loader.load(
    url,
    (gltf) => {
      console.log('GLTF模型加载成功')
      processLoadedModel(gltf.scene)
      isLoading.value = false
    },
    (xhr) => {
      console.log((xhr.loaded / xhr.total * 100) + '% loaded')
    },
    (error) => {
      console.error('GLTF模型加载失败:', error)
      handleLoadError(error)
    }
  )
}

// 加载OBJ模型
const loadOBJModel = (url) => {
  console.log('开始加载OBJ模型:', url)
  
  // 尝试加载MTL材质文件
  const mtlUrl = url.replace('.obj', '.mtl')
  const mtlLoader = new MTLLoader()
  
  mtlLoader.load(
    mtlUrl,
    (materials) => {
      console.log('MTL材质加载成功')
      materials.preload()
      
      const objLoader = new OBJLoader()
      objLoader.setMaterials(materials)
      
      objLoader.load(
        url,
        (object) => {
          console.log('OBJ模型加载成功，对象数量:', object.children.length)
          
          // 为没有材质的网格添加默认材质
          object.traverse((child) => {
            if (child.isMesh) {
              console.log('找到网格对象:', child.name)
              if (!child.material) {
                child.material = new THREE.MeshStandardMaterial({
                  color: 0xc11b17,
                  metalness: 0.8,
                  roughness: 0.05,
                  side: THREE.DoubleSide,
                  emissive: 0x550000,
                  emissiveIntensity: 0.3,
                  reflectivity: 1.0,
                  clearcoat: 0.5,
                  clearcoatRoughness: 0.05,
                  transparent: true,
                  opacity: 0.9
                })
              } else if (child.material.isMeshStandardMaterial) {
                // 增强现有材质的红宝石效果
                child.material.color = new THREE.Color(0xc11b17)
                child.material.metalness = Math.max(child.material.metalness, 0.7)
                child.material.roughness = Math.min(child.material.roughness, 0.1)
                child.material.emissive = new THREE.Color(0x550000)
                child.material.emissiveIntensity = 0.3
                child.material.clearcoat = 0.5
                child.material.clearcoatRoughness = 0.05
                child.material.transparent = true
                child.material.opacity = 0.9
              } else {
                // 将非标准材质转换为标准材质以支持红宝石效果
                const newMaterial = new THREE.MeshStandardMaterial({
                  color: 0xc11b17,
                  metalness: 0.8,
                  roughness: 0.05,
                  side: THREE.DoubleSide,
                  emissive: 0x550000,
                  emissiveIntensity: 0.3,
                  reflectivity: 1.0,
                  clearcoat: 0.5,
                  clearcoatRoughness: 0.05,
                  transparent: true,
                  opacity: 0.9
                })
                child.material = newMaterial
              }
              child.castShadow = true
              child.receiveShadow = true
            }
          })
          
          processLoadedModel(object)
          console.log('OBJ模型处理完成')
          isLoading.value = false
        },
        (xhr) => {
          console.log((xhr.loaded / xhr.total * 100) + '% loaded')
        },
        (error) => {
          console.error('OBJ模型加载失败:', error)
          handleLoadError(error)
        }
      )
    },
    (xhr) => {
      console.log((xhr.loaded / xhr.total * 100) + '% loaded')
    },
    (error) => {
      console.warn('MTL材质加载失败，使用默认材质:', error)
      // 如果MTL加载失败，使用默认材质加载OBJ
      const objLoader = new OBJLoader()
      
      objLoader.load(
        url,
        (object) => {
          console.log('OBJ模型加载成功，对象数量:', object.children.length)
          
          // 为OBJ模型添加材质
          object.traverse((child) => {
            if (child.isMesh) {
              console.log('找到网格对象:', child.name)
              child.material = new THREE.MeshStandardMaterial({
                  color: 0xc11b17,
                  metalness: 0.8,
                  roughness: 0.05,
                  side: THREE.DoubleSide,
                  emissive: 0x550000,
                  emissiveIntensity: 0.3,
                  reflectivity: 1.0,
                  clearcoat: 0.5,
                  clearcoatRoughness: 0.05,
                  transparent: true,
                  opacity: 0.9
                })
              child.castShadow = true
              child.receiveShadow = true
            }
          })
          
          processLoadedModel(object)
          console.log('OBJ模型处理完成')
          isLoading.value = false
        },
        (xhr) => {
          console.log((xhr.loaded / xhr.total * 100) + '% loaded')
        },
        (error) => {
          console.error('OBJ模型加载失败:', error)
          handleLoadError(error)
        }
      )
    }
  )
}

// 加载STL模型
const loadSTLModel = (url) => {
  const loader = new STLLoader()
  
  loader.load(
    url,
    (geometry) => {
      // 创建网格
      const material = new THREE.MeshStandardMaterial({
        color: 0xc11b17,
        metalness: 0.8,
        roughness: 0.05,
        side: THREE.DoubleSide,
        emissive: 0x550000,
        emissiveIntensity: 0.3,
        reflectivity: 1.0,
        clearcoat: 0.5,
        clearcoatRoughness: 0.05,
        transparent: true,
        opacity: 0.9
      })
      const mesh = new THREE.Mesh(geometry, material)
      mesh.castShadow = true
      mesh.receiveShadow = true
      processLoadedModel(mesh)
      isLoading.value = false
    },
    (xhr) => {
      console.log((xhr.loaded / xhr.total * 100) + '% loaded')
    },
    (error) => {
      handleLoadError(error)
    }
  )
}

// 清理模型几何数据中的NaN值
const cleanGeometryData = (object) => {
  object.traverse((child) => {
    if (child.isMesh && child.geometry) {
      const geometry = child.geometry;
      let hasChanges = false;
      
      console.log('处理几何体:', child.name);
      
      // 检查并修复所有数值属性
      Object.keys(geometry.attributes).forEach((key) => {
        const attribute = geometry.attributes[key];
        console.log('检查属性:', key, '类型:', attribute.array ? attribute.array.constructor.name : '无数组');
        
        if (attribute.array) {
          const array = attribute.array;
          let attributeHasChanges = false;
          
          for (let i = 0; i < array.length; i++) {
            if (isNaN(array[i]) || !isFinite(array[i])) {
              array[i] = 0; // 用0替换NaN和Infinity值
              attributeHasChanges = true;
              hasChanges = true;
            }
          }
          
          if (attributeHasChanges) {
            console.log('修复了属性', key, '中的NaN值');
            attribute.needsUpdate = true;
          }
        }
      });
      
      if (hasChanges) {
        console.log('修复了模型几何数据中的NaN值');
      }
      
      // 确保计算边界框和边界球
      try {
        console.log('计算几何体边界');
        geometry.computeBoundingBox();
        geometry.computeBoundingSphere();
        console.log('边界计算成功');
      } catch (error) {
        console.warn('计算几何边界时出错:', error);
        // 如果计算失败，创建一个简单的立方体替代
        console.warn('创建替代几何体以避免渲染错误');
        const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
        child.geometry.dispose();
        child.geometry = boxGeometry;
      }
    }
  });
};

// 处理加载成功的模型
const processLoadedModel = (loadedModel) => {
  console.log('开始处理加载的模型')
  
  // 清除场景中所有非灯光对象
  const objectsToRemove = scene.children.filter(child => 
    !(child instanceof THREE.AmbientLight || 
      child instanceof THREE.DirectionalLight || 
      child instanceof THREE.HemisphereLight)
  )
  objectsToRemove.forEach(child => {
    scene.remove(child)
    // 释放资源
    if (child.geometry) child.geometry.dispose()
    if (child.material) {
      if (Array.isArray(child.material)) {
        child.material.forEach(material => material.dispose())
      } else {
        child.material.dispose()
      }
    }
  })
  
  // 清理模型几何数据中的NaN值
  cleanGeometryData(loadedModel)
  
  // 添加新模型
  model = loadedModel
  scene.add(model)

  // 检查模型边界框
  try {
    console.log('开始计算模型边界')
    const box = new THREE.Box3().setFromObject(model)
    console.log('边界框计算完成')
    
    const size = box.getSize(new THREE.Vector3())
    console.log('模型边界框大小:', size)
    
    const center = box.getCenter(new THREE.Vector3())
    console.log('模型中心点:', center)
    
    // 检查size是否包含NaN值
    const hasNaN = isNaN(size.x) || isNaN(size.y) || isNaN(size.z)
    console.log('边界框是否包含NaN值:', hasNaN)
    
    // 自动调整模型大小和位置
    let maxSize = Math.max(size.x, size.y, size.z)
    console.log('模型最大尺寸:', maxSize)
    
    if (!hasNaN && maxSize > 0) {
      // 使用固定缩放值，确保模型充满窗口，就像最初的正方体一样
      const scale = 3 / maxSize
      console.log('应用缩放:', scale)
      model.scale.set(scale, scale, scale)
    } else {
      console.warn('模型尺寸无效，使用默认缩放')
      model.scale.set(1, 1, 1)
    }

    // 检查center是否包含NaN值
    const centerHasNaN = isNaN(center.x) || isNaN(center.y) || isNaN(center.z)
    console.log('中心点是否包含NaN值:', centerHasNaN)
    
    if (!centerHasNaN) {
      model.position.sub(center)
      console.log('模型处理完成，最终位置:', model.position)
    } else {
      console.warn('模型中心点无效，跳过居中操作')
      model.position.set(0, 0, 0)
    }
  } catch (error) {
    console.error('处理模型边界时出错:', error)
    console.warn('使用默认模型大小和位置')
    model.scale.set(1, 1, 1)
    model.position.set(0, 0, 0)
    
    // 如果边界计算失败，尝试创建一个简单的替代几何体
    console.warn('尝试修复模型几何体')
    
    // 检查模型是否有网格对象
    let hasValidMesh = false
    model.traverse((child) => {
      if (child.isMesh && child.geometry) {
        try {
          // 尝试重新计算几何体边界
          child.geometry.computeBoundingBox()
          child.geometry.computeBoundingSphere()
          hasValidMesh = true
        } catch (geomError) {
          console.warn('几何体边界计算失败，创建替代几何体:', child.name)
          const boxGeometry = new THREE.BoxGeometry(1, 1, 1)
          child.geometry.dispose()
          child.geometry = boxGeometry
          hasValidMesh = true
        }
      }
    })
    
    // 如果没有有效的网格，创建一个简单的立方体
    if (!hasValidMesh) {
      console.warn('模型没有有效的网格，创建替代立方体')
      const boxGeometry = new THREE.BoxGeometry(2, 2, 2)
      const boxMaterial = new THREE.MeshStandardMaterial({
        color: 0xc11b17,
        metalness: 0.8,
        roughness: 0.05,
        side: THREE.DoubleSide,
        emissive: 0x550000,
        emissiveIntensity: 0.3,
        reflectivity: 1.0,
        clearcoat: 0.5,
        clearcoatRoughness: 0.05,
        transparent: true,
        opacity: 0.9
      })
      const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial)
      
      // 清除场景中的模型
      scene.remove(model)
      
      // 添加替代立方体
      model = boxMesh
      scene.add(model)
    }
  }
  
  // 重置相机位置
  resetCamera()
  console.log('模型处理完成')
}

// 处理加载错误
const handleLoadError = (error) => {
  console.error('模型加载失败:', error)
  isLoading.value = false
  isError.value = true
  errorMessage.value = error.message || '未知错误'
  
  // 显示错误立方体
  createErrorCube()
}

// 创建错误立方体
const createErrorCube = () => {
  // 清除场景中所有非灯光对象
  const objectsToRemove = scene.children.filter(child => 
    !(child instanceof THREE.AmbientLight || 
      child instanceof THREE.DirectionalLight || 
      child instanceof THREE.HemisphereLight)
  )
  objectsToRemove.forEach(child => {
    scene.remove(child)
  })
  
  // 创建错误立方体
  const geometry = new THREE.BoxGeometry(2, 2, 2)
  const material = new THREE.MeshStandardMaterial({
    color: 0xff6b6b,
    metalness: 0.3,
    roughness: 0.7
  })
  model = new THREE.Mesh(geometry, material)
  scene.add(model)
  
  console.log('显示错误立方体作为模型加载失败的替代')
}

// 创建测试立方体
const createTestCube = () => {
  // 清除场景中所有非灯光对象
  const objectsToRemove = scene.children.filter(child => 
    !(child instanceof THREE.AmbientLight || 
      child instanceof THREE.DirectionalLight || 
      child instanceof THREE.HemisphereLight)
  )
  objectsToRemove.forEach(child => {
    scene.remove(child)
    if (child.geometry) child.geometry.dispose()
    if (child.material) {
      if (Array.isArray(child.material)) {
        child.material.forEach(material => material.dispose())
      } else {
        child.material.dispose()
      }
    }
  })
  
  // 创建测试立方体
  const geometry = new THREE.BoxGeometry(2, 2, 2)
  const material = new THREE.MeshStandardMaterial({
    color: 0xc11b17,
    metalness: 0.8,
    roughness: 0.05,
    transparent: true,
    opacity: 0.9,
    emissive: 0x550000,
    emissiveIntensity: 0.3,
    reflectivity: 1.0,
    clearcoat: 0.5,
    clearcoatRoughness: 0.05
  })
  model = new THREE.Mesh(geometry, material)
  scene.add(model)
  
  console.log('测试立方体创建成功')
}

// 重置相机位置
const resetCamera = () => {
  if (camera) {
    camera.position.set(0, 0, 5)
    camera.lookAt(0, 0, 0)
  }
}

// 鼠标事件处理
const onMouseDown = (event) => {
  mouseDown.value = true
  lastMousePos.value = {
    x: event.clientX,
    y: event.clientY
  }
  // 禁用自动旋转
  isAutoRotate.value = false
}

const onMouseMove = (event) => {
  if (!mouseDown.value || !model) return
  
  const deltaX = event.clientX - lastMousePos.value.x
  const deltaY = event.clientY - lastMousePos.value.y
  
  // 旋转模型
  model.rotation.y += deltaX * 0.01
  model.rotation.x += deltaY * 0.01
  
  // 限制X轴旋转范围，防止过度旋转
  model.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, model.rotation.x))
  
  lastMousePos.value = {
    x: event.clientX,
    y: event.clientY
  }
}

const onMouseUp = () => {
  mouseDown.value = false
  // 鼠标释放后重新启用自动旋转
  isAutoRotate.value = true
}

// 移除滚轮缩放控制
const onWheel = (event) => {
  event.preventDefault()
}

// 重试加载
const retryLoad = () => {
  isError.value = false
  isLoading.value = true
  loadModel()
}

// 动画循环
const animate = () => {
  animationId = requestAnimationFrame(animate)

  // 自动旋转模型
  if (model && isAutoRotate.value) {
    model.rotation.y += 0.01
  }

  if (renderer && scene && camera) {
    try {
      renderer.render(scene, camera)
    } catch (error) {
      console.error('渲染失败:', error)
      // 如果渲染失败，尝试清理场景并显示错误立方体
      console.warn('渲染失败，显示错误立方体')
      createErrorCube()
    }
  }
}

// 清理资源
const cleanup = () => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }

  if (renderer) {
    renderer.dispose()
  }

  if (scene) {
    scene.traverse((object) => {
      if (object.geometry) object.geometry.dispose()
      if (object.material) {
        if (Array.isArray(object.material)) {
          object.material.forEach(material => material.dispose())
        } else {
          object.material.dispose()
        }
      }
    })
  }
}

// 监听模型URL变化
watch(
  () => props.modelUrl,
  () => {
    cleanup()
    isLoading.value = props.showLoading
    isError.value = false
    initScene()
  }
)

// 监听大小变化
watch(
  () => props.size,
  () => {
    cleanup()
    initScene()
  }
)

// 生命周期钩子
onMounted(() => {
  isLoading.value = props.showLoading
  initScene()
})

onUnmounted(() => {
  cleanup()
})
</script>

<style scoped>
.model-viewer {
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  opacity: 1;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  cursor: grab;
  transition: all 0.3s ease;
  z-index: 1;
}

.model-viewer:hover {
  box-shadow: 0 8px 30px var(--primary-glow);
}

.model-viewer:active {
  cursor: grabbing;
}

/* 加载状态 */
.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--card-bg);
  backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  z-index: 10;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--primary-glow);
  border-top: 3px solid var(--primary-gradient);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-text {
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
  font-weight: 500;
}

/* 错误状态 */
.error-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--card-bg);
  backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  z-index: 10;
  padding: 20px;
  text-align: center;
}

.error-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.error-text {
  color: #ff6b6b;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 8px;
}

.error-description {
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  margin-bottom: 20px;
  max-width: 80%;
  line-height: 1.4;
}

.retry-button {
  padding: 8px 16px;
  background: var(--primary-glow);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  color: #ffffff;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.retry-button:hover {
  background: var(--primary-glow);
  border-color: var(--border-color);
  transform: translateY(-1px);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .model-viewer {
    border-radius: 8px;
  }
  
  .loading-spinner {
    width: 30px;
    height: 30px;
  }
  
  .error-icon {
    font-size: 36px;
  }
  
  .error-text {
    font-size: 16px;
  }
  
  .error-description {
    font-size: 12px;
  }
}
</style>
