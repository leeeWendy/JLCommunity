<template>
  <div class="product-collection">
    <section class="scene-container">
      <canvas ref="sceneCanvas" id="3d-scene"></canvas>
      <div class="scene-info">
        <h2 class="text-gradient">产品展示区</h2>
        <p>点击模型查看产品详情</p>
      </div>
      
      <!-- 加载指示器 -->
      <div class="loading-indicator" id="loading-indicator">
        <div class="loading-spinner"></div>
        <div class="loading-text">加载中...</div>
      </div>
    </section>

    <aside class="product-info" id="product-info" ref="productInfo">
      <div class="product-info-content">
        <div class="product-info-header">
          <h3 id="product-title" class="text-gradient">{{ currentProduct?.name || '产品信息' }}</h3>
          <button class="close-btn" id="close-btn" aria-label="关闭" @click="closeProductInfo">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div class="product-info-body">
          <div class="product-image" id="product-image">
            <span v-if="currentProduct" :style="{ color: '#' + currentProduct.color.toString(16).padStart(6, '0') }">{{ currentProduct.icon }}</span>
          </div>
          <div class="product-details">
            <p><strong>产品ID:</strong> <span id="product-id">{{ currentProduct?.id }}</span></p>
            <p><strong>价格:</strong> <span id="product-price">{{ currentProduct?.price }}</span></p>
            <p><strong>规格:</strong> <span id="product-spec">{{ currentProduct?.spec }}</span></p>
            <p><strong>描述:</strong> <span id="product-desc">{{ currentProduct?.description }}</span></p>
          </div>
          <!-- 操作按钮 -->
          <div class="product-actions">
            <button class="btn btn-primary">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
              收藏
            </button>
            <button class="btn btn-secondary">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M8 12l2 2 4-4"></path>
              </svg>
              分享
            </button>
          </div>
        </div>
      </div>
    </aside>
  </div>
</template>

<script>
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default {
  name: 'ProductCollection',
  data() {
    return {
      productMeshes: [],
      currentProduct: null,
      isLoading: true,
      products: [
        {
          id: "PROD-001",
          name: "智能手表",
          price: "¥1,299",
          spec: "42mm, 1.5英寸AMOLED屏, 防水50米",
          description: "一款功能强大的智能手表，支持心率监测、睡眠追踪、运动模式等多种功能。",
          modelType: "sphere",
          position: { x: -4, y: 0.5, z: 2 },
          color: 0x6366f1,
          icon: "⌚"
        },
        {
          id: "PROD-002",
          name: "无线耳机",
          price: "¥899",
          spec: "蓝牙5.2, 主动降噪, 续航30小时",
          description: "高品质无线耳机，提供沉浸式音质和舒适的佩戴体验。",
          modelType: "cylinder",
          position: { x: 0, y: 0.5, z: 3 },
          color: 0x8b5cf6,
          icon: "🎧"
        },
        {
          id: "PROD-003",
          name: "智能手机",
          price: "¥5,999",
          spec: "6.7英寸, 12GB RAM, 512GB存储",
          description: "旗舰级智能手机，配备高性能处理器和优秀的相机系统。",
          modelType: "box",
          position: { x: 4, y: 0.5, z: 2 },
          color: 0xec4899,
          icon: "📱"
        },
        {
          id: "PROD-004",
          name: "平板电脑",
          price: "¥3,499",
          spec: "10.9英寸, 8GB RAM, 256GB存储",
          description: "轻薄便携的平板电脑，适合工作和娱乐使用。",
          modelType: "box",
          position: { x: -4, y: 0.5, z: -2 },
          color: 0x10b981,
          icon: "💻"
        },
        {
          id: "PROD-005",
          name: "智能音箱",
          price: "¥599",
          spec: "360°环绕声, 语音助手, WIFI连接",
          description: "智能音箱，提供优质音效和便捷的语音控制功能。",
          modelType: "cylinder",
          position: { x: 0, y: 0.5, z: -3 },
          color: 0xf59e0b,
          icon: "🔊"
        },
        {
          id: "PROD-006",
          name: "智能灯泡",
          price: "¥129",
          spec: "RGB调色, 语音控制, 定时开关",
          description: "智能灯泡，支持多种颜色调节和智能控制。",
          modelType: "sphere",
          position: { x: 4, y: 0.5, z: -2 },
          color: 0xef4444,
          icon: "💡"
        }
      ]
    };
  },
  mounted() {
    // 初始化非响应式Three.js对象
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.controls = null;
    this.raycaster = null;
    this.mouse = null;
    
    this.initScene();
    this.addEventListeners();
  },
  beforeUnmount() {
    this.removeEventListeners();
    if (this.renderer) {
      this.renderer.dispose();
    }
    if (this.controls) {
      this.controls.dispose();
    }
  },
  methods: {
    initScene() {
      const canvas = this.$refs.sceneCanvas;
      
      // 创建场景
      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color(0x0f172a);
      
      // 创建相机
      this.camera = new THREE.PerspectiveCamera(
        60,
        canvas.clientWidth / canvas.clientHeight,
        0.1,
        1000
      );
      this.camera.position.set(0, 3, 15);
      this.camera.lookAt(0, 0, 0);
      
      // 创建渲染器
      this.renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: true,
        shadowMap: {
          enabled: true,
          type: THREE.PCFSoftShadowMap
        }
      });
      this.renderer.setSize(canvas.clientWidth, canvas.clientHeight);
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.outputEncoding = THREE.SRGBColorSpace;
      this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
      this.renderer.toneMappingExposure = 1.2; // 增加曝光度，提高整体亮度
      
      // 添加光源
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.6); // 增强环境光
      this.scene.add(ambientLight);
      
      const directionalLight = new THREE.DirectionalLight(0x6366f1, 2.0); // 增强主方向光
      directionalLight.position.set(10, 15, 8);
      directionalLight.castShadow = true;
      directionalLight.shadow.camera.left = -15;
      directionalLight.shadow.camera.right = 15;
      directionalLight.shadow.camera.top = 15;
      directionalLight.shadow.camera.bottom = -15;
      directionalLight.shadow.mapSize.width = 2048;
      directionalLight.shadow.mapSize.height = 2048;
      this.scene.add(directionalLight);
      
      const fillLight = new THREE.DirectionalLight(0x8b5cf6, 1.0); // 增强补光
      fillLight.position.set(-10, 10, -5);
      this.scene.add(fillLight);
      
      const bottomLight = new THREE.DirectionalLight(0xec4899, 0.6); // 增强底部光
      bottomLight.position.set(0, -10, 0);
      this.scene.add(bottomLight);
      
      // 添加顶部光，进一步增加整体亮度
      const topLight = new THREE.DirectionalLight(0xffffff, 0.5);
      topLight.position.set(0, 10, 0);
      this.scene.add(topLight);
      
      // 添加地面
      const groundGeometry = new THREE.PlaneGeometry(20, 20);
      const groundMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x1e293b,
        roughness: 0.9,
        metalness: 0.1
      });
      const ground = new THREE.Mesh(groundGeometry, groundMaterial);
      ground.rotation.x = -Math.PI / 2;
      ground.receiveShadow = true;
      this.scene.add(ground);
      
      // 添加网格辅助线
      const gridHelper = new THREE.GridHelper(20, 20, 0x334155, 0x1e293b);
      this.scene.add(gridHelper);
      
      // 添加相机控制器
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      this.controls.enableDamping = true;
      this.controls.dampingFactor = 0.05;
      this.controls.minDistance = 5;
      this.controls.maxDistance = 25;
      this.controls.maxPolarAngle = Math.PI / 2;
      this.controls.enableZoom = true;
      this.controls.enablePan = true;
      
      // 初始化射线检测
      this.raycaster = new THREE.Raycaster();
      this.mouse = new THREE.Vector2();
      
      // 加载产品模型
      this.loadProducts();
      
      // 开始动画循环
      this.animate();
      
      // 模拟加载完成
      setTimeout(() => {
        this.isLoading = false;
        const loadingIndicator = document.getElementById('loading-indicator');
        if (loadingIndicator) {
          loadingIndicator.style.display = 'none';
        }
        canvas.classList.remove('loading');
      }, 1500);
      
      // 初始响应式调整
      this.adjustForResponsive();
    },
    
    loadProducts() {
      this.products.forEach((product, index) => {
        let geometry;
        
        // 根据产品类型创建不同的几何体
        switch(product.modelType) {
          case 'sphere':
            geometry = new THREE.SphereGeometry(0.8, 32, 32);
            break;
          case 'cylinder':
            geometry = new THREE.CylinderGeometry(0.6, 0.6, 1.2, 32);
            break;
          case 'box':
          default:
            geometry = new THREE.BoxGeometry(1.2, 1.2, 1.2);
            break;
        }
        
        // 创建材质
        const material = new THREE.MeshStandardMaterial({
          color: product.color,
          metalness: 0.5,
          roughness: 0.3,
          emissive: new THREE.Color(product.color).multiplyScalar(0.1),
          emissiveIntensity: 0.5
        });
        
        // 创建网格
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(product.position.x, product.position.y, product.position.z);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        
        // 添加产品数据到网格对象
        mesh.userData = {
          product: product,
          originalScale: mesh.scale.clone(),
          originalColor: product.color
        };
        
        // 添加到场景和产品网格数组
        this.scene.add(mesh);
        this.productMeshes.push(mesh);
        
        // 添加入场动画
        mesh.scale.set(0, 0, 0);
        mesh.rotation.y = Math.random() * Math.PI * 2;
        
        // 动画效果
        const animateIn = () => {
          const duration = 0.8;
          const startTime = Date.now();
          const endTime = startTime + duration * 1000;
          
          const animate = () => {
            const currentTime = Date.now();
            const progress = Math.min((currentTime - startTime) / (endTime - startTime), 1);
            const easedProgress = 1 - Math.pow(1 - progress, 3);
            
            mesh.scale.set(
              easedProgress * mesh.userData.originalScale.x,
              easedProgress * mesh.userData.originalScale.y,
              easedProgress * mesh.userData.originalScale.z
            );
            
            mesh.rotation.y = Math.random() * Math.PI * 2 * (1 - easedProgress) + 0 * easedProgress;
            
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          
          animate();
        };
        
        // 延迟入场，创建序列动画效果
        setTimeout(animateIn, index * 150);
      });
    },
    
    animate() {
      if (this.controls) {
        this.controls.update();
      }
      
      // 为产品模型添加微动效
      this.productMeshes.forEach((mesh, index) => {
        // 轻微旋转
        mesh.rotation.y += 0.005;
        
        // 轻微上下浮动
        const time = Date.now() * 0.001;
        mesh.position.y = mesh.userData.product.position.y + Math.sin(time + index) * 0.05;
      });
      
      // 渲染场景
      if (this.renderer && this.scene && this.camera) {
        this.renderer.render(this.scene, this.camera);
      }
      
      requestAnimationFrame(() => this.animate());
    },
    
    onCanvasClick(event) {
      const canvas = this.$refs.sceneCanvas;
      const rect = canvas.getBoundingClientRect();
      
      this.mouse.x = ((event.clientX - rect.left) / canvas.clientWidth) * 2 - 1;
      this.mouse.y = -((event.clientY - rect.top) / canvas.clientHeight) * 2 + 1;
      
      // 设置射线起点和方向
      this.raycaster.setFromCamera(this.mouse, this.camera);
      
      // 检测与产品模型的交点
      const intersects = this.raycaster.intersectObjects(this.productMeshes);
      
      if (intersects.length > 0) {
        // 获取第一个交点的对象
        const clickedProduct = intersects[0].object;
        // 如果点击的是不同的产品，先关闭当前信息再打开新的
        if (this.currentProduct?.id !== clickedProduct.userData.product.id) {
          this.closeProductInfo();
          // 显示新产品信息
          this.showProductInfo(clickedProduct.userData.product);
        }
      } else {
        // 点击空白处关闭产品信息
        this.closeProductInfo();
      }
    },
    
    showProductInfo(product) {
      this.currentProduct = product;
      const productInfo = this.$refs.productInfo;
      if (productInfo) {
        productInfo.classList.add('active');
      }
    },
    
    closeProductInfo() {
      this.currentProduct = null;
      const productInfo = this.$refs.productInfo;
      if (productInfo) {
        productInfo.classList.remove('active');
      }
    },
    
    onWindowResize() {
      this.adjustForResponsive();
    },
    
    adjustForResponsive() {
      const canvas = this.$refs.sceneCanvas;
      if (!canvas) return;
      
      const containerWidth = canvas.clientWidth;
      const containerHeight = canvas.clientHeight;
      
      this.camera.aspect = containerWidth / containerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(containerWidth, containerHeight);
    },
    
    addHoverEffect() {
      const canvas = this.$refs.sceneCanvas;
      canvas.addEventListener('mousemove', (event) => {
        const rect = canvas.getBoundingClientRect();
        this.mouse.x = ((event.clientX - rect.left) / canvas.clientWidth) * 2 - 1;
        this.mouse.y = -((event.clientY - rect.top) / canvas.clientHeight) * 2 + 1;
        
        // 设置射线起点和方向
        this.raycaster.setFromCamera(this.mouse, this.camera);
        
        // 检测与产品模型的交点
        const intersects = this.raycaster.intersectObjects(this.productMeshes);
        
        // 重置所有模型的状态
        this.productMeshes.forEach(mesh => {
          // 平滑恢复原始缩放
          mesh.scale.lerp(mesh.userData.originalScale, 0.1);
          // 平滑恢复原始发光强度
          mesh.material.emissiveIntensity = Math.max(0.5, mesh.material.emissiveIntensity - 0.05);
          // 恢复原始发光颜色
          mesh.material.emissive.setHex(0x000000);
        });
        
        // 如果有交点，放大并高亮显示
        if (intersects.length > 0) {
          const hoveredProduct = intersects[0].object;
          // 平滑放大
          hoveredProduct.scale.lerp(new THREE.Vector3(1.2, 1.2, 1.2), 0.2);
          // 增加发光强度
          hoveredProduct.material.emissiveIntensity = Math.min(1.5, hoveredProduct.material.emissiveIntensity + 0.1);
          // 设置发光颜色
          hoveredProduct.material.emissive.setHex(hoveredProduct.userData.originalColor);
          canvas.style.cursor = 'pointer';
        } else {
          canvas.style.cursor = 'default';
        }
      });
    },
    
    addEventListeners() {
      window.addEventListener('resize', this.onWindowResize);
      
      const canvas = this.$refs.sceneCanvas;
      canvas.addEventListener('click', this.onCanvasClick.bind(this));
      
      // 添加键盘事件支持（ESC键关闭产品信息）
      window.addEventListener('keydown', this.onKeyDown.bind(this));
      
      // 添加点击空白区域关闭产品信息
      window.addEventListener('click', this.onWindowClick.bind(this));
      
      // 添加悬停效果
      this.addHoverEffect();
    },
    
    removeEventListeners() {
      window.removeEventListener('resize', this.onWindowResize);
      
      const canvas = this.$refs.sceneCanvas;
      canvas.removeEventListener('click', this.onCanvasClick);
      
      window.removeEventListener('keydown', this.onKeyDown);
      window.removeEventListener('click', this.onWindowClick);
    },
    
    onKeyDown(event) {
      if (event.key === 'Escape') {
        this.closeProductInfo();
      }
    },
    
    onWindowClick(event) {
      const productInfo = this.$refs.productInfo;
      const canvas = this.$refs.sceneCanvas;
      
      // 检查点击是否发生在产品信息窗口外部
      if (productInfo && !productInfo.contains(event.target) && 
          canvas && !canvas.contains(event.target)) {
        this.closeProductInfo();
      }
    }
  }
};
</script>

<style scoped>
.product-collection {
  width: 100%;
  height: 100%;
  color: #ffffff;
}

.text-gradient {
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.scene-container {
  position: relative;
  width: 100%;
  height: calc(100vh - 200px);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.scene-container canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: filter 0.3s ease;
}

.scene-container canvas.loading {
  filter: blur(4px);
}

.scene-info {
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 10;
  text-align: left;
  background: rgba(30, 41, 59, 0.7);
  backdrop-filter: blur(8px);
  padding: 1rem 1.5rem;
  border-radius: 0.5rem;
  opacity: 0.8;
  transition: opacity 0.3s ease;
}

.scene-info:hover {
  opacity: 1;
}

.scene-info h2 {
  font-size: 1.5rem;
  margin-bottom: 0.25rem;
}

.scene-info p {
  font-size: 0.875rem;
  margin: 0;
  color: rgba(255, 255, 255, 0.8);
}

.loading-indicator {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  background: rgba(30, 41, 59, 0.9);
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  z-index: 20;
}

.loading-spinner {
  width: 48px;
  height: 48px;
  border: 4px solid #3b82f6;
  border-top: 4px solid transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-text {
  font-size: 1rem;
  color: #94a3b8;
}

.product-info {
  position: fixed;
  top: 150px;
  right: 20px;
  width: 100%;
  max-width: 300px;
  height: auto;
  max-height: calc(100vh - 170px);
  background: rgba(30, 41, 59, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: -10px 0 25px -5px rgba(0, 0, 0, 0.1);
  transform: translateX(100%);
  transition: transform 0.3s ease;
  z-index: 1000;
  overflow-y: auto;
  border-radius: 0.75rem;
}

.product-info.active {
  transform: translateX(0);
}

.product-info-content {
  padding: 1.5rem;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.product-info-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.product-info-header h3 {
  font-size: 1.5rem;
  margin: 0;
}

.close-btn {
  background: transparent;
  border: none;
  color: #ffffff;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.3s ease;
}

.close-btn:hover {
  color: #ef4444;
}

.product-info-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.product-image {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 4rem;
  margin-bottom: 1rem;
  height: 120px;
  width: 120px;
  margin: 0 auto 1rem;
  border-radius: 0.5rem;
  background: rgba(99, 102, 241, 0.1);
}

.product-details p {
  margin-bottom: 1rem;
  line-height: 1.6;
}

.product-details strong {
  color: #6366f1;
}

.product-actions {
  display: flex;
  gap: 1rem;
  margin-top: auto;
}

.btn {
  flex: 1;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.btn-primary {
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  color: #ffffff;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px -5px rgba(99, 102, 241, 0.5);
}

.btn-secondary {
  background: rgba(99, 102, 241, 0.1);
  color: #6366f1;
  border: 1px solid rgba(99, 102, 241, 0.3);
}

.btn-secondary:hover {
  background: rgba(99, 102, 241, 0.2);
  transform: translateY(-2px);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .scene-info h2 {
    font-size: 2rem;
  }
  
  .scene-container {
    height: calc(100vh - 250px);
  }
  
  .product-info {
    max-width: 100%;
  }
  
  .product-actions {
    flex-direction: column;
  }
}
</style>
