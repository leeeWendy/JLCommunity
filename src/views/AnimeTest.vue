<template>
  <div class="anime-test">
    <!-- 创意生长过程 -->
    <section class="growth-process">
      <!-- 模块 1: AIGC设计 -->
      <router-link to="/aigc-design" class="growth-module-link">
        <div class="growth-module aigc-module" ref="aigcModuleRef">
          <div class="window-glow"></div>
          <div class="module-content">
            <h2 class="module-title">AIGC设计</h2>
            <p class="module-description">人工智能驱动的创意设计，从概念到实现的智能转化</p>
            <div class="module-features">
              <div class="feature-item">
                <span class="feature-icon">🎨</span>
                <span class="feature-text">智能生成创意概念</span>
              </div>
              <div class="feature-item">
                <span class="feature-icon">⚡</span>
                <span class="feature-text">快速原型设计</span>
              </div>
              <div class="feature-item">
                <span class="feature-icon">🌈</span>
                <span class="feature-text">智能色彩搭配</span>
              </div>
              <div class="feature-item">
                <span class="feature-icon">🔄</span>
                <span class="feature-text">自动迭代优化</span>
              </div>
            </div>
            <div class="module-animation">
              <div class="design-palette">
                <div class="color-cell" v-for="i in 9" :key="i"></div>
              </div>
              <div class="ai-brain"></div>
            </div>
            <div class="module-action">
              <span class="action-text">了解更多</span>
              <span class="action-icon">→</span>
            </div>
          </div>
        </div>
      </router-link>
      
      <!-- 模块 2: 摄影航拍 -->
      <router-link to="/photography" class="growth-module-link">
        <div class="growth-module photography-module" ref="photographyModuleRef">
          <div class="window-glow"></div>
          <div class="module-content">
            <h2 class="module-title">摄影航拍</h2>
            <p class="module-description">从空中视角捕捉世界的美丽，记录瞬间的永恒</p>
            <div class="module-features">
              <div class="feature-item">
                <span class="feature-icon">🚁</span>
                <span class="feature-text">专业无人机航拍</span>
              </div>
              <div class="feature-item">
                <span class="feature-icon">📸</span>
                <span class="feature-text">高清影像捕捉</span>
              </div>
              <div class="feature-item">
                <span class="feature-icon">🌍</span>
                <span class="feature-text">全景视角拍摄</span>
              </div>
              <div class="feature-item">
                <span class="feature-icon">✨</span>
                <span class="feature-text">创意构图指导</span>
              </div>
            </div>
            <div class="module-animation">
              <div class="drone"></div>
              <div class="camera-lens"></div>
              <div class="viewfinder-grid">
                <div class="grid-line" v-for="i in 4" :key="i"></div>
              </div>
            </div>
            <div class="module-action">
              <span class="action-text">了解更多</span>
              <span class="action-icon">→</span>
            </div>
          </div>
        </div>
      </router-link>
      
      <!-- 模块 3: 短视频 -->
      <router-link to="/short-video" class="growth-module-link">
        <div class="growth-module video-module" ref="videoModuleRef">
          <div class="window-glow"></div>
          <div class="module-content">
            <h2 class="module-title">短视频</h2>
            <p class="module-description">创意视频的快速制作与分享，让每一刻都精彩</p>
            <div class="module-features">
              <div class="feature-item">
                <span class="feature-icon">🎬</span>
                <span class="feature-text">快速视频剪辑</span>
              </div>
              <div class="feature-item">
                <span class="feature-icon">🎵</span>
                <span class="feature-text">智能配乐推荐</span>
              </div>
              <div class="feature-item">
                <span class="feature-icon">✨</span>
                <span class="feature-text">特效滤镜库</span>
              </div>
              <div class="feature-item">
                <span class="feature-icon">📱</span>
                <span class="feature-text">多平台一键分享</span>
              </div>
            </div>
            <div class="module-animation">
              <div class="video-timeline">
                <div class="clip-segment" v-for="i in 5" :key="i"></div>
              </div>
              <div class="play-button"></div>
            </div>
            <div class="module-action">
              <span class="action-text">了解更多</span>
              <span class="action-icon">→</span>
            </div>
          </div>
        </div>
      </router-link>
      
      <!-- 模块 4: 三维资产 -->
      <router-link to="/3d-assets" class="growth-module-link">
        <div class="growth-module three-d-module" ref="threeDModuleRef">
          <div class="window-glow"></div>
          <div class="module-content">
            <h2 class="module-title">三维资产</h2>
            <p class="module-description">构建三维世界的数字资产，创造沉浸式体验</p>
            <div class="module-features">
              <div class="feature-item">
                <span class="feature-icon">🎯</span>
                <span class="feature-text">高质量3D模型</span>
              </div>
              <div class="feature-item">
                <span class="feature-icon">🌅</span>
                <span class="feature-text">逼真材质渲染</span>
              </div>
              <div class="feature-item">
                <span class="feature-icon">🏗️</span>
                <span class="feature-text">快速场景搭建</span>
              </div>
              <div class="feature-item">
                <span class="feature-icon">🔄</span>
                <span class="feature-text">智能资产管理</span>
              </div>
            </div>
            <div class="module-animation">
              <div class="three-d-cube">
                <div class="cube-face" v-for="i in 6" :key="i"></div>
              </div>
              <div class="modeling-tools">
                <div class="tool-icon" v-for="i in 3" :key="i"></div>
              </div>
            </div>
            <div class="module-action">
              <span class="action-text">了解更多</span>
              <span class="action-icon">→</span>
            </div>
          </div>
        </div>
      </router-link>
    </section>
    
    <!-- 自动播放动画 -->
    <section class="auto-animation-section">
      <div class="window-glow"></div>
      <h2 class="section-title">自动播放动画</h2>
      <p class="section-description">页面加载后自动播放的动画效果</p>
      
      <div class="auto-animation-container">
        <!-- 水面涟漪效果 -->
        <div class="water-ripple">
          <div class="ripple" v-for="i in 8" :key="i"></div>
        </div>
        
        <!-- 粒子爆炸效果 -->
        <div class="particle-explosion">
          <div class="particle" v-for="i in 200" :key="i"></div>
        </div>
        
        <!-- 几何形状变换 -->
        <div class="shape-transformation">
          <div class="shape shape-1"></div>
          <div class="shape shape-2"></div>
          <div class="shape shape-3"></div>
          <div class="shape shape-4"></div>
        </div>
      </div>
    </section>
    
    <!-- 功能展示 -->
    <section class="features-section">
      <div class="window-glow"></div>
      <h2 class="features-title">核心能力</h2>
      <div class="features-grid">
        <div class="feature-card">
          <div class="feature-icon">✨</div>
          <h3 class="feature-title">智能创意</h3>
          <p class="feature-description">AI 驱动的创意生成，解锁无限可能</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">🎬</div>
          <h3 class="feature-title">动态表达</h3>
          <p class="feature-description">流畅的动画效果，生动展现创意</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">🌐</div>
          <h3 class="feature-title">沉浸式体验</h3>
          <p class="feature-description">三维空间的构建，创造身临其境的感受</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">🚀</div>
          <h3 class="feature-title">高效制作</h3>
          <p class="feature-description">快速实现创意，提升创作效率</p>
        </div>
      </div>
    </section>
    
    <!-- 回到首页按钮 -->
    <div class="back-to-home">
      <router-link to="/" class="back-btn">回到首页</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
// 使用全局的 anime 变量 (通过 CDN 引入)

// 模块引用
const aigcModuleRef = ref(null)
const photographyModuleRef = ref(null)
const videoModuleRef = ref(null)
const threeDModuleRef = ref(null)
const complexAnimationRef = ref(null)
const linesAnimationRef = ref(null)

// 动画状态
const animationState = ref({
  aigc: false,
  photography: false,
  video: false,
  threeD: false,
  complex: false,
  lines: false
})

// 复杂动画控制变量
const particlesActive = ref(true)
const colorMode = ref('rainbow')
let complexAnimationTimeline = null

// 线条动画时间线变量
let linesAnimationTimeline = null

// 滚动监听处理
const handleScroll = () => {
  // 复杂几何动画
  if (complexAnimationRef.value && !animationState.value.complex) {
    const rect = complexAnimationRef.value.getBoundingClientRect()
    if (rect.top < window.innerHeight * 0.8) {
      playComplexAnimation()
      animationState.value.complex = true
    }
  }
  
  // 线条交织动画
  if (linesAnimationRef.value && !animationState.value.lines) {
    const rect = linesAnimationRef.value.getBoundingClientRect()
    if (rect.top < window.innerHeight * 0.8) {
      playLinesAnimation()
      animationState.value.lines = true
    }
  }
}



// AIGC 模块动画
const playAIGCAnimation = () => {
  // 模块内容动画
  anime({
    targets: '.aigc-module .module-content',
    opacity: [0, 1, 0.9, 1],
    translateY: [50, 0, -10, 0],
    duration: 1000,
    easing: 'easeOutElastic',
    loop: true,
    direction: 'alternate'
  })
  
  // 颜色单元格动画
  anime({
    targets: '.aigc-module .color-cell',
    scale: [0, 1, 0.8, 1],
    opacity: [0, 1],
    backgroundColor: ['#ffffff', '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#9B59B6', '#F39C12', '#E74C3C', '#ffffff'],
    duration: 600,
    delay: anime.stagger(50, { start: 500 }),
    easing: 'easeOutQuad',
    loop: true,
    direction: 'alternate'
  })
  
  // AI 大脑动画
  anime({
    targets: '.aigc-module .ai-brain',
    rotate: [0, 360, 0],
    scale: [0, 1, 0.9, 1],
    opacity: [0, 1],
    duration: 1200,
    delay: 800,
    easing: 'easeOutElastic',
    loop: true,
    direction: 'alternate'
  })
}

// 摄影航拍模块动画
const playPhotographyAnimation = () => {
  // 模块内容动画
  anime({
    targets: '.photography-module .module-content',
    opacity: [0, 1, 0.9, 1],
    translateY: [50, 0, -10, 0],
    duration: 1000,
    easing: 'easeOutElastic',
    loop: true,
    direction: 'alternate'
  })
  
  // 无人机飞行动画
  anime({
    targets: '.photography-module .drone',
    translateX: [-100, 0, 10, 0],
    translateY: [50, 0, -5, 0],
    rotate: [0, -10, 5, 0],
    scale: [0.8, 1, 0.95, 1],
    opacity: [0, 1],
    duration: 1500,
    easing: 'easeOutElastic',
    loop: true,
    direction: 'alternate'
  })
  
  // 相机镜头动画
  anime({
    targets: '.photography-module .camera-lens',
    scale: [0, 1.2, 1, 1.1, 1],
    opacity: [0, 1],
    duration: 1000,
    delay: 500,
    easing: 'easeOutElastic',
    loop: true,
    direction: 'alternate'
  })
  
  // 取景器网格动画
  anime({
    targets: '.photography-module .grid-line',
    scaleX: [0, 1, 0.9, 1],
    scaleY: [0, 1, 0.9, 1],
    opacity: [0, 1, 0.8, 1],
    duration: 600,
    delay: anime.stagger(100, { start: 800 }),
    easing: 'easeOutQuad',
    loop: true,
    direction: 'alternate'
  })
}

// 短视频模块动画
const playVideoAnimation = () => {
  // 模块内容动画
  anime({
    targets: '.video-module .module-content',
    opacity: [0, 1, 0.9, 1],
    translateY: [50, 0, -10, 0],
    duration: 1000,
    easing: 'easeOutElastic',
    loop: true,
    direction: 'alternate'
  })
  
  // 视频剪辑段动画
  anime({
    targets: '.video-module .clip-segment',
    scaleY: [0, 1, 0.8, 1],
    opacity: [0, 1],
    duration: 800,
    delay: anime.stagger(100, { start: 500 }),
    easing: 'easeOutElastic',
    loop: true,
    direction: 'alternate'
  })
  
  // 播放按钮动画
  anime({
    targets: '.video-module .play-button',
    scale: [0, 1.2, 1, 1.1, 1],
    opacity: [0, 1],
    rotate: [0, 360, 0],
    duration: 1000,
    delay: 1000,
    easing: 'easeOutElastic',
    loop: true,
    direction: 'alternate'
  })
}

// 三维资产模块动画
const playThreeDAnimation = () => {
  // 模块内容动画
  anime({
    targets: '.three-d-module .module-content',
    opacity: [0, 1, 0.9, 1],
    translateY: [50, 0, -10, 0],
    duration: 1000,
    easing: 'easeOutElastic',
    loop: true,
    direction: 'alternate'
  })
  
  // 立方体动画
  anime({
    targets: '.three-d-module .three-d-cube',
    rotateX: [0, 360, 0],
    rotateY: [0, 360, 0],
    scale: [0, 1, 0.95, 1],
    opacity: [0, 1],
    duration: 1500,
    delay: 500,
    easing: 'easeOutElastic',
    loop: true,
    direction: 'alternate'
  })
  
  // 建模工具动画
  anime({
    targets: '.three-d-module .tool-icon',
    translateY: [50, 0, -10, 0],
    opacity: [0, 1],
    duration: 800,
    delay: anime.stagger(150, { start: 1200 }),
    easing: 'easeOutElastic',
    loop: true,
    direction: 'alternate'
  })
}

// 复杂几何动画
const playComplexAnimation = () => {
  // 重置之前的时间线
  if (complexAnimationTimeline) {
    complexAnimationTimeline.pause()
  }
  
  // 创建新的时间线
  complexAnimationTimeline = anime.timeline({
    easing: 'easeOutElastic',
    duration: 1000,
    loop: true
  })
  
  // 中心立方体动画
  complexAnimationTimeline.add({
    targets: '.center-cube',
    rotateX: [0, 360],
    rotateY: [0, 360],
    scale: [0, 1],
    opacity: [0, 1],
    duration: 2000,
    easing: 'easeOutElastic'
  })
  
  // 立方体面动画
  complexAnimationTimeline.add({
    targets: '.cube-face',
    scale: [0, 1],
    opacity: [0, 1],
    rotate: [0, 180],
    duration: 1500,
    delay: anime.stagger(100),
    easing: 'easeOutBack'
  }, '<500')
  
  // 中心四面体动画
  complexAnimationTimeline.add({
    targets: '.center-tetrahedron',
    rotateX: [0, -360],
    rotateY: [0, -360],
    scale: [0, 0.8],
    opacity: [0, 1],
    duration: 2500,
    easing: 'easeOutElastic'
  }, '<1000')
  
  // 四面体面动画
  complexAnimationTimeline.add({
    targets: '.tetrahedron-face',
    scale: [0, 1],
    opacity: [0, 1],
    rotate: [0, -180],
    duration: 1200,
    delay: anime.stagger(150),
    easing: 'easeOutBack'
  }, '<500')
  
  // 中心八面体动画
  complexAnimationTimeline.add({
    targets: '.center-octahedron',
    rotateX: [0, 360],
    rotateY: [0, 360],
    scale: [0, 0.6],
    opacity: [0, 1],
    duration: 3000,
    easing: 'easeOutElastic'
  }, '<1500')
  
  // 八面体面动画
  complexAnimationTimeline.add({
    targets: '.octahedron-face',
    scale: [0, 1],
    opacity: [0, 1],
    rotate: [0, 360],
    duration: 1000,
    delay: anime.stagger(80),
    easing: 'easeOutBack'
  }, '<500')
  
  // 中心十二面体动画
  complexAnimationTimeline.add({
    targets: '.center-dodecahedron',
    rotateX: [0, -360],
    rotateY: [0, 360],
    scale: [0, 0.5],
    opacity: [0, 1],
    duration: 3500,
    easing: 'easeOutElastic'
  }, '<2000')
  
  // 十二面体面动画
  complexAnimationTimeline.add({
    targets: '.dodecahedron-face',
    scale: [0, 1],
    opacity: [0, 1],
    rotate: [0, 180],
    duration: 1200,
    delay: anime.stagger(60),
    easing: 'easeOutBack'
  }, '<500')
  
  // 中心二十面体动画
  complexAnimationTimeline.add({
    targets: '.center-icosahedron',
    rotateX: [0, 360],
    rotateY: [0, -360],
    scale: [0, 0.4],
    opacity: [0, 1],
    duration: 4000,
    easing: 'easeOutElastic'
  }, '<2500')
  
  // 二十面体面动画
  complexAnimationTimeline.add({
    targets: '.icosahedron-face',
    scale: [0, 1],
    opacity: [0, 1],
    rotate: [0, 360],
    duration: 1000,
    delay: anime.stagger(40),
    easing: 'easeOutBack'
  }, '<500')
  
  // 几何环动画
  complexAnimationTimeline.add({
    targets: '.geometry-ring',
    rotate: [0, 360],
    scale: [0, 1],
    opacity: [0, 1],
    duration: 2500,
    delay: anime.stagger(150),
    easing: 'easeOutElastic'
  }, '<3000')
  
  // 环段动画
  complexAnimationTimeline.add({
    targets: '.ring-segment',
    scale: [0, 1],
    opacity: [0, 1],
    rotate: [0, 360],
    duration: 800,
    delay: anime.stagger(15),
    easing: 'easeOutBack'
  }, '<500')
  
  // 几何网格动画
  complexAnimationTimeline.add({
    targets: '.grid-point',
    scale: [0, 1],
    opacity: [0, 1],
    duration: 500,
    delay: anime.stagger(5),
    easing: 'easeOutExpo'
  }, '<1000')
  
  // 光线效果动画
  complexAnimationTimeline.add({
    targets: '.light-ray',
    scaleX: [0, 1],
    opacity: [0, 1],
    duration: 1500,
    delay: anime.stagger(30),
    easing: 'easeOutQuad'
  }, '<1500')
  
  // 几何碎片动画
  complexAnimationTimeline.add({
    targets: '.fragment',
    scale: [0, 1],
    opacity: [0, 1],
    rotate: [0, 720],
    translateX: [0, function() { return anime.random(-400, 400) }],
    translateY: [0, function() { return anime.random(-400, 400) }],
    duration: 2000,
    delay: anime.stagger(50),
    easing: 'easeOutElastic'
  }, '<2000')
  
  // 额外几何元素动画
  complexAnimationTimeline.add({
    targets: '.geometry-sphere',
    scale: [0, 1],
    opacity: [0, 1],
    rotate: [0, 720],
    translateX: [0, function() { return anime.random(-300, 300) }],
    translateY: [0, function() { return anime.random(-300, 300) }],
    duration: 2500,
    delay: anime.stagger(200),
    easing: 'easeOutElastic'
  }, '<2500')
  
  complexAnimationTimeline.add({
    targets: '.geometry-torus',
    scale: [0, 1],
    opacity: [0, 1],
    rotate: [0, 720],
    translateX: [0, function() { return anime.random(-250, 250) }],
    translateY: [0, function() { return anime.random(-250, 250) }],
    duration: 3000,
    delay: anime.stagger(300),
    easing: 'easeOutElastic'
  }, '<2700')
  
  complexAnimationTimeline.add({
    targets: '.geometry-cylinder',
    scale: [0, 1],
    opacity: [0, 1],
    rotate: [0, 720],
    translateX: [0, function() { return anime.random(-200, 200) }],
    translateY: [0, function() { return anime.random(-200, 200) }],
    duration: 2000,
    delay: anime.stagger(250),
    easing: 'easeOutElastic'
  }, '<2900')
  
  // 粒子系统动画
  if (particlesActive.value) {
    complexAnimationTimeline.add({
      targets: '.particle',
      translateX: [0, function() { return anime.random(-500, 500) }],
      translateY: [0, function() { return anime.random(-500, 500) }],
      scale: [0, function() { return anime.random(0.3, 1.2) }],
      opacity: [0, function() { return anime.random(0.2, 0.7) }],
      duration: function() { return anime.random(1000, 4000) },
      delay: anime.stagger(3),
      easing: 'easeOutExpo',
      loop: true,
      direction: 'alternate'
    }, '<3000')
  }
  
  // 颜色渐变动画
  const colorTargets = '.cube-face, .tetrahedron-face, .octahedron-face, .dodecahedron-face, .icosahedron-face, .ring-segment, .fragment, .geometry-sphere, .geometry-torus, .geometry-cylinder'
  const colors = colorMode.value === 'rainbow' ? [
    '#3498db', '#9b59b6', '#e74c3c', '#f39c12', '#27ae60',
    '#1abc9c', '#e67e22', '#95a5a6', '#34495e', '#3498db'
  ] : ['#3498db', '#2980b9', '#1f618d', '#154360', '#0b243b', '#3498db']
  
  complexAnimationTimeline.add({
    targets: colorTargets,
    backgroundColor: colors,
    duration: 4000,
    loop: true,
    direction: 'alternate',
    easing: 'linear'
  }, '<3500')
  
  // 几何网格脉动动画
  complexAnimationTimeline.add({
    targets: '.grid-point',
    scale: [1, 1.5, 1],
    opacity: [0.5, 1, 0.5],
    duration: 2000,
    delay: anime.stagger(50),
    loop: true,
    direction: 'alternate',
    easing: 'easeInOutSine'
  }, '<4000')
  
  // 光线效果脉动动画
  complexAnimationTimeline.add({
    targets: '.light-ray',
    scaleY: [1, 1.2, 1],
    opacity: [0.5, 1, 0.5],
    duration: 3000,
    delay: anime.stagger(100),
    loop: true,
    direction: 'alternate',
    easing: 'easeInOutSine'
  }, '<4500')
  
  // 中心几何结构持续旋转动画
  complexAnimationTimeline.add({
    targets: '.center-geometry',
    rotateX: [0, 360],
    rotateY: [0, 360],
    duration: 20000,
    easing: 'linear',
    loop: true
  }, '<5000')
}

// 重置复杂动画
const resetComplexAnimation = () => {
  anime({
    targets: '.center-cube, .center-tetrahedron, .center-octahedron, .center-dodecahedron, .center-icosahedron, .geometry-ring, .ring-segment, .cube-face, .tetrahedron-face, .octahedron-face, .dodecahedron-face, .icosahedron-face, .grid-point, .particle, .light-ray, .fragment, .geometry-sphere, .geometry-torus, .geometry-cylinder',
    scale: 0,
    opacity: 0,
    rotate: 0,
    translateX: 0,
    translateY: 0,
    duration: 500,
    easing: 'easeInOutQuad',
    complete: function() {
      animationState.value.complex = false
    }
  })
}

// 切换粒子系统
const toggleParticles = () => {
  particlesActive.value = !particlesActive.value
  
  if (particlesActive.value) {
    // 开启粒子
    anime({
      targets: '.particle',
      scale: [0, function() { return anime.random(0.3, 1.2) }],
      opacity: [0, function() { return anime.random(0.2, 0.7) }],
      duration: 500,
      delay: anime.stagger(5),
      easing: 'easeOutExpo'
    })
  } else {
    // 关闭粒子
    anime({
      targets: '.particle',
      scale: 0,
      opacity: 0,
      duration: 500,
      easing: 'easeInOutQuad'
    })
  }
}

// 切换颜色模式
const toggleColorMode = () => {
  colorMode.value = colorMode.value === 'rainbow' ? 'single' : 'rainbow'
  
  // 立即更新颜色
  const colorTargets = '.cube-face, .tetrahedron-face, .octahedron-face, .ring-segment, .fragment'
  const colors = colorMode.value === 'rainbow' ? [
    '#3498db', '#9b59b6', '#e74c3c', '#f39c12', '#27ae60'
  ] : ['#3498db', '#2980b9', '#1f618d', '#154360', '#0b243b']
  
  anime({
    targets: colorTargets,
    backgroundColor: colors,
    duration: 1000,
    easing: 'easeInOutQuad'
  })
}

// 线条交织动画
const playLinesAnimation = () => {
  // 重置之前的时间线
  if (linesAnimationTimeline) {
    linesAnimationTimeline.pause()
  }
  
  // 确保所有线条都显示
  const lines = document.querySelectorAll('.line')
  lines.forEach(line => {
    line.style.display = 'block'
  })
  
  // 初始化线条位置
  lines.forEach((line, index) => {
    const x1 = anime.random(0, 100)
    const y1 = anime.random(0, 100)
    const x2 = anime.random(0, 100)
    const y2 = anime.random(0, 100)
    
    line.style.left = `${x1}%`
    line.style.top = `${y1}%`
    line.style.width = '0px'
    line.style.height = '2px'
    line.style.backgroundColor = getLineColor(index)
    line.style.transformOrigin = '0 50%'
    line.style.rotate = `${Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI}deg`
    line.style.opacity = '0'
  })
  
  // 创建新的时间线
  linesAnimationTimeline = anime.timeline({
    easing: 'easeOutElastic',
    duration: 1000,
    loop: true
  })
  
  // 线条动画
  linesAnimationTimeline.add({
    targets: '.line',
    width: function() {
      const x1 = parseFloat(this.target.style.left)
      const y1 = parseFloat(this.target.style.top)
      const x2 = anime.random(0, 100)
      const y2 = anime.random(0, 100)
      const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
      return `${distance * 8}px`
    },
    opacity: [0, 1],
    duration: function() { return anime.random(1000, 3000) },
    delay: anime.stagger(5),
    easing: 'easeOutExpo'
  })
  
  // 线条颜色动画
  linesAnimationTimeline.add({
    targets: '.line',
    backgroundColor: function() {
      return getLineColor()
    },
    duration: 2000,
    delay: anime.stagger(100),
    loop: true,
    direction: 'alternate',
    easing: 'easeInOutQuad'
  }, '<500')
  
  // 线条旋转动画
  linesAnimationTimeline.add({
    targets: '.line',
    rotate: function() { return anime.random(0, 360) },
    duration: function() { return anime.random(2000, 5000) },
    delay: anime.stagger(200),
    loop: true,
    direction: 'alternate',
    easing: 'easeInOutSine'
  }, '<1000')
  
  // 线条位置动画
  linesAnimationTimeline.add({
    targets: '.line',
    left: function() { return `${anime.random(0, 100)}%` },
    top: function() { return `${anime.random(0, 100)}%` },
    duration: function() { return anime.random(3000, 8000) },
    delay: anime.stagger(300),
    loop: true,
    direction: 'alternate',
    easing: 'easeInOutSine'
  }, '<1500')
}

// 获取线条颜色
const getLineColor = (index) => {
  const colors = ['#3498db', '#9b59b6', '#e74c3c', '#f39c12', '#27ae60', '#1abc9c', '#e67e22', '#95a5a6', '#34495e']
  return colors[index % colors.length || anime.random(0, colors.length - 1)]
}

// 初始化
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  
  // 初始检查
  handleScroll()
  
  // 动态计算网格点位置
  const gridSize = 15;
  const gridSpacing = 60;

  for (let i = 0; i < 225; i++) {
    const x = (i % gridSize) - (gridSize / 2 - 0.5);
    const y = Math.floor(i / gridSize) - (gridSize / 2 - 0.5);
    const gridPoint = document.querySelector(`.grid-point:nth-child(${i + 1})`);
    if (gridPoint) {
      gridPoint.style.left = `${50 + x * gridSpacing}px`;
      gridPoint.style.top = `${50 + y * gridSpacing}px`;
    }
  }
  
  // 自动播放动画
  playAutoAnimation();
});

// 自动播放动画
const playAutoAnimation = () => {
  // 水面涟漪动画
  anime.timeline({
    loop: true,
    duration: 2000
  })
  .add({
    targets: '.ripple',
    scale: [0, function(i) {
      return 2 + i * 0.5;
    }],
    opacity: [0, 0.8, 0],
    duration: function(i) {
      return 3000 + i * 400;
    },
    delay: anime.stagger(300),
    easing: 'easeOutExpo'
  })
  .add({
    targets: '.window-glow',
    opacity: [0, 0.6, 0],
    borderColor: ['transparent', 'rgba(52, 152, 219, 0.6)', 'transparent'],
    boxShadow: ['inset 0 0 60px rgba(52, 152, 219, 0), 0 0 80px rgba(52, 152, 219, 0)', 'inset 0 0 100px rgba(52, 152, 219, 0.4), 0 0 120px rgba(52, 152, 219, 0.6)', 'inset 0 0 60px rgba(52, 152, 219, 0), 0 0 80px rgba(52, 152, 219, 0)'],
    duration: 3000,
    easing: 'easeInOutQuad'
  }, '-=2000');

  
  // 额外的窗口呼吸光效果
  anime({
    targets: '.window-glow',
    opacity: [0, 0.6, 0],
    borderColor: ['transparent', 'rgba(52, 152, 219, 0.6)', 'transparent'],
    boxShadow: ['inset 0 0 60px rgba(52, 152, 219, 0), 0 0 80px rgba(52, 152, 219, 0)', 'inset 0 0 100px rgba(52, 152, 219, 0.4), 0 0 120px rgba(52, 152, 219, 0.6)', 'inset 0 0 60px rgba(52, 152, 219, 0), 0 0 80px rgba(52, 152, 219, 0)'],
    duration: 5000,
    loop: true,
    easing: 'easeInOutQuad'
  });
  
  // 粒子爆炸动画
  anime({
    targets: '.particle',
    translateX: function() {
      return anime.random(-200, 200);
    },
    translateY: function() {
      return anime.random(-200, 200);
    },
    scale: [0, function() {
      return anime.random(0.5, 1.5);
    }, 0],
    opacity: [0, 1, 0],
    duration: function() {
      return anime.random(2000, 4000);
    },
    delay: anime.stagger(20),
    easing: 'easeOutExpo',
    loop: true
  });
  
  // 几何形状变换动画
  anime.timeline({
    loop: true,
    duration: 3000
  })
  .add({
    targets: '.shape-1',
    scale: [0, 1],
    opacity: [0, 1],
    easing: 'easeOutElastic'
  })
  .add({
    targets: '.shape-1',
    scale: [1, 0],
    opacity: [1, 0],
    easing: 'easeInElastic'
  }, '+=2000')
  .add({
    targets: '.shape-2',
    scale: [0, 1],
    opacity: [0, 1],
    easing: 'easeOutElastic'
  })
  .add({
    targets: '.shape-2',
    scale: [1, 0],
    opacity: [1, 0],
    easing: 'easeInElastic'
  }, '+=2000')
  .add({
    targets: '.shape-3',
    scale: [0, 1],
    opacity: [0, 1],
    easing: 'easeOutElastic'
  })
  .add({
    targets: '.shape-3',
    scale: [1, 0],
    opacity: [1, 0],
    easing: 'easeInElastic'
  }, '+=2000')
  .add({
    targets: '.shape-4',
    scale: [0, 1],
    opacity: [0, 1],
    easing: 'easeOutElastic'
  })
  .add({
    targets: '.shape-4',
    scale: [1, 0],
    opacity: [1, 0],
    easing: 'easeInElastic'
  }, '+=2000');
};

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
/* 全局样式 */
.anime-test {
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
  color: #ffffff;
  font-family: 'Arial', sans-serif;
}



/* 生长过程模块 */
.growth-process {
  padding: 100px 0;
}

.growth-module {
  min-height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  position: relative;
}

.module-content {
  max-width: 1200px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 30px;
  opacity: 0;
}

.module-content > * {
  width: 100%;
}

.module-content .module-animation {
  width: 100%;
  max-width: 600px;
  align-self: center;
}

.module-title {
  font-size: 3rem;
  margin-bottom: 1.5rem;
  background: linear-gradient(45deg, #3498db, #9b59b6);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.module-description {
  font-size: 1.2rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 2rem;
  flex: 1;
}

.module-animation {
  flex: 1;
  position: relative;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.module-features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-bottom: 2rem;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 15px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.feature-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(52, 152, 219, 0.2);
  border-color: rgba(52, 152, 219, 0.5);
}

.feature-icon {
  font-size: 1.2rem;
  min-width: 24px;
  text-align: center;
}

.feature-text {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.9);
}

.growth-module-link {
  display: block;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
}

.growth-module-link:hover {
  transform: translateY(-5px);
}

.growth-module-link:hover .growth-module {
  box-shadow: 0 20px 40px rgba(52, 152, 219, 0.2);
}

.module-action {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: linear-gradient(45deg, rgba(52, 152, 219, 0.2), rgba(155, 89, 182, 0.2));
  border-radius: 30px;
  border: 1px solid rgba(52, 152, 219, 0.3);
  backdrop-filter: blur(5px);
  transition: all 0.3s ease;
  margin-top: 1rem;
  align-self: flex-start;
}

.module-action:hover {
  background: linear-gradient(45deg, rgba(52, 152, 219, 0.3), rgba(155, 89, 182, 0.3));
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(52, 152, 219, 0.3);
  border-color: rgba(52, 152, 219, 0.6);
}

.action-text {
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
}

.action-icon {
  font-size: 1.1rem;
  color: rgba(52, 152, 219, 0.8);
  transition: transform 0.3s ease;
}

.module-action:hover .action-icon {
  transform: translateX(5px);
  color: rgba(52, 152, 219, 1);
}

/* AIGC 模块 */
.aigc-module {
  background: rgba(52, 152, 219, 0.1);
}

.design-palette {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-bottom: 30px;
}

.color-cell {
  width: 60px;
  height: 60px;
  border-radius: 8px;
  background: #ffffff;
  opacity: 0;
}

.ai-brain {
  width: 120px;
  height: 120px;
  background: radial-gradient(circle, #9b59b6, #8e44ad);
  border-radius: 50%;
  position: relative;
  opacity: 0;
}

.ai-brain::before {
  content: '';
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 80px;
  background: radial-gradient(circle, #9b59b6, #8e44ad);
  border-radius: 50%;
}

/* 摄影航拍模块 */
.photography-module {
  background: rgba(231, 76, 60, 0.1);
}

.drone {
  position: relative;
  width: 100px;
  height: 80px;
  background: #34495e;
  border-radius: 10px;
  opacity: 0;
}

.drone::before,
.drone::after {
  content: '';
  position: absolute;
  top: 50%;
  width: 60px;
  height: 4px;
  background: #2c3e50;
}

.drone::before {
  left: -60px;
  transform: translateY(-50%);
}

.drone::after {
  right: -60px;
  transform: translateY(-50%);
}

.camera-lens {
  position: absolute;
  width: 60px;
  height: 60px;
  background: radial-gradient(circle, #2c3e50, #34495e);
  border-radius: 50%;
  margin-left: 120px;
  opacity: 0;
}

.viewfinder-grid {
  position: absolute;
  width: 200px;
  height: 150px;
  border: 2px solid #3498db;
  margin-left: 200px;
  opacity: 0;
}

.grid-line {
  position: absolute;
  background: #3498db;
}

.grid-line:nth-child(1) {
  width: 100%;
  height: 2px;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
}

.grid-line:nth-child(2) {
  height: 100%;
  width: 2px;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
}

.grid-line:nth-child(3) {
  width: 100%;
  height: 2px;
  top: 33%;
  left: 0;
}

.grid-line:nth-child(4) {
  width: 100%;
  height: 2px;
  top: 66%;
  left: 0;
}

/* 短视频模块 */
.video-module {
  background: rgba(243, 156, 18, 0.1);
}

.video-timeline {
  display: flex;
  align-items: end;
  gap: 10px;
  height: 150px;
  margin-bottom: 30px;
}

.clip-segment {
  flex: 1;
  background: linear-gradient(180deg, #e74c3c, #c0392b);
  border-radius: 4px 4px 0 0;
  opacity: 0;
}

.play-button {
  width: 80px;
  height: 80px;
  background: #27ae60;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
}

.play-button::before {
  content: '';
  width: 0;
  height: 0;
  border-top: 20px solid transparent;
  border-bottom: 20px solid transparent;
  border-left: 30px solid white;
  margin-left: 5px;
}

/* 三维资产模块 */
.three-d-module {
  background: rgba(155, 89, 182, 0.1);
}

.three-d-cube {
  position: relative;
  width: 150px;
  height: 150px;
  transform-style: preserve-3d;
  opacity: 0;
}

.cube-face {
  position: absolute;
  width: 150px;
  height: 150px;
  border: 2px solid #3498db;
  opacity: 0.7;
}

.cube-face:nth-child(1) {
  transform: translateZ(75px);
  background: rgba(52, 152, 219, 0.5);
}

.cube-face:nth-child(2) {
  transform: rotateY(180deg) translateZ(75px);
  background: rgba(231, 76, 60, 0.5);
}

.cube-face:nth-child(3) {
  transform: rotateY(-90deg) translateZ(75px);
  background: rgba(46, 204, 113, 0.5);
}

.cube-face:nth-child(4) {
  transform: rotateY(90deg) translateZ(75px);
  background: rgba(243, 156, 18, 0.5);
}

.cube-face:nth-child(5) {
  transform: rotateX(90deg) translateZ(75px);
  background: rgba(155, 89, 182, 0.5);
}

.cube-face:nth-child(6) {
  transform: rotateX(-90deg) translateZ(75px);
  background: rgba(26, 188, 156, 0.5);
}

.modeling-tools {
  display: flex;
  gap: 20px;
  margin-top: 40px;
}

.tool-icon {
  width: 60px;
  height: 60px;
  background: linear-gradient(45deg, #9b59b6, #8e44ad);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  opacity: 0;
}

.tool-icon::before {
  content: '⚙';
}

/* 功能展示 */
.features-section {
  padding: 100px 20px;
  background: rgba(0, 0, 0, 0.2);
}

.features-title {
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 4rem;
  background: linear-gradient(45deg, #3498db, #9b59b6);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
}

.feature-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 30px;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(52, 152, 219, 0.2);
  border-color: rgba(52, 152, 219, 0.5);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 20px;
}

.feature-title {
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: #ffffff;
}

.feature-description {
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
}

/* 回到首页按钮 */
.back-to-home {
  text-align: center;
  margin: 50px 0;
}

.back-btn {
  background: linear-gradient(45deg, #3498db, #9b59b6);
  background-size: 200% 200%;
  color: white;
  text-decoration: none;
  padding: 15px 30px;
  border-radius: 50px;
  font-size: 16px;
  font-weight: bold;
  transition: all 0.3s ease;
  display: inline-block;
}

.back-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(52, 152, 219, 0.3);
  background-position: right center;
}

/* 自动播放动画样式 */
.auto-animation-section {
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 100px 20px;
  background: radial-gradient(circle, rgba(26, 188, 156, 0.2), rgba(52, 152, 219, 0.1), rgba(155, 89, 182, 0.1));
  border-radius: 20px;
  margin: 100px 0;
  position: relative;
  overflow: hidden;
}

.section-title {
  font-size: 3rem;
  margin-bottom: 1rem;
  background: linear-gradient(45deg, #3498db, #9b59b6, #2ecc71);
  background-size: 400% 400%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
}

.auto-animation-container {
  position: relative;
  width: 600px;
  height: 400px;
  margin-top: 3rem;
}

.particle-explosion {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.particle {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 4px;
  height: 4px;
  background: rgba(243, 156, 18, 0.8);
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(243, 156, 18, 0.8);
  opacity: 0;
}

.shape-transformation {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: 200px;
}

.shape {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
}

.shape-1 {
  width: 100px;
  height: 100px;
  background: rgba(52, 152, 219, 0.8);
  border: 2px solid rgba(255, 255, 255, 0.5);
}

.shape-2 {
  width: 100px;
  height: 100px;
  background: rgba(231, 76, 60, 0.8);
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 50%;
}

.shape-3 {
  width: 0;
  height: 0;
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
  border-bottom: 100px solid rgba(46, 204, 113, 0.8);
  border: 2px solid rgba(255, 255, 255, 0.5);
}

.shape-4 {
  width: 100px;
  height: 100px;
  background: rgba(155, 89, 182, 0.8);
  border: 2px solid rgba(255, 255, 255, 0.5);
  clip-path: polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%);
}

/* 水面涟漪效果样式 */
.water-ripple {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 10;
}

.ripple {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 2px solid rgba(52, 152, 219, 0.6);
  border-radius: 50%;
  background: radial-gradient(circle, rgba(52, 152, 219, 0.3), rgba(52, 152, 219, 0));
  opacity: 0;
  box-shadow: 0 0 20px rgba(52, 152, 219, 0.5);
  width: 50px;
  height: 50px;
}

.window-glow {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 1px solid transparent;
  pointer-events: none;
  opacity: 0;
  box-shadow: inset 0 0 60px rgba(52, 152, 219, 0), 0 0 80px rgba(52, 152, 219, 0);
  z-index: 11;
  border-radius: 10px;
}

/* 为所有区域添加相对定位，确保窗口光效正确显示 */
.hero-section,
.growth-module,
.auto-animation-section,
.features-section {
  position: relative;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-subtitle {
    font-size: 1.2rem;
  }
  
  .hero-animation {
    width: 300px;
    height: 150px;
  }
  
  .module-content {
    flex-direction: column;
    text-align: center;
  }
  
  .module-title {
    font-size: 2rem;
  }
  
  .module-animation {
    height: 300px;
  }
  
  .design-palette {
    grid-template-columns: repeat(3, 1fr);
  }
  
  .color-cell {
    width: 40px;
    height: 40px;
  }
  
  .ai-brain {
    width: 80px;
    height: 80px;
  }
  
  .ai-brain::before {
    width: 60px;
    height: 60px;
    top: -15px;
  }
  
  .drone {
    width: 80px;
    height: 60px;
  }
  
  .drone::before,
  .drone::after {
    width: 40px;
  }
  
  .camera-lens {
    width: 40px;
    height: 40px;
    margin-left: 100px;
  }
  
  .viewfinder-grid {
    width: 150px;
    height: 100px;
    margin-left: 150px;
  }
  
  .three-d-cube {
    width: 100px;
    height: 100px;
  }
  
  .cube-face {
    width: 100px;
    height: 100px;
  }
  
  .cube-face:nth-child(1) {
    transform: translateZ(50px);
  }
  
  .cube-face:nth-child(2) {
    transform: rotateY(180deg) translateZ(50px);
  }
  
  .cube-face:nth-child(3) {
    transform: rotateY(-90deg) translateZ(50px);
  }
  
  .cube-face:nth-child(4) {
    transform: rotateY(90deg) translateZ(50px);
  }
  
  .cube-face:nth-child(5) {
    transform: rotateX(90deg) translateZ(50px);
  }
  
  .cube-face:nth-child(6) {
    transform: rotateX(-90deg) translateZ(50px);
  }
  
  .tool-icon {
    width: 50px;
    height: 50px;
    font-size: 20px;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
  }
  
  .auto-animation-container {
    width: 100%;
    max-width: 400px;
    height: 300px;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .shape {
    width: 80px;
    height: 80px;
  }
  
  .shape-3 {
    border-left: 40px solid transparent;
    border-right: 40px solid transparent;
    border-bottom: 80px solid rgba(46, 204, 113, 0.8);
  }
}

/* 动画效果 */
@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

/* 复杂几何动画样式 */
.complex-animation-section {
  min-height: 1000px;
  background: radial-gradient(circle, rgba(155, 89, 182, 0.2), rgba(52, 152, 219, 0.1), rgba(231, 76, 60, 0.1));
  padding: 100px 20px;
  margin: 100px 0;
  border-radius: 20px;
  position: relative;
  overflow: hidden;
}

.section-description {
  text-align: center;
  margin-bottom: 50px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 18px;
}

.complex-animation-container {
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
}

.animation-controls {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 50px;
  flex-wrap: wrap;
}

.control-btn {
  background: linear-gradient(45deg, #3498db, #9b59b6);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 50px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
}

.control-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(52, 152, 219, 0.3);
}

.geometry-wrapper {
  position: relative;
  width: 800px;
  height: 800px;
  margin: 0 auto;
  perspective: 1500px;
}

/* 中心几何结构 */
.center-geometry {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transform-style: preserve-3d;
}

/* 中心立方体 */
.center-cube {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: 200px;
  transform-style: preserve-3d;
  opacity: 0;
}

.cube-face {
  position: absolute;
  width: 200px;
  height: 200px;
  background: rgba(52, 152, 219, 0.8);
  border: 2px solid rgba(255, 255, 255, 0.5);
  opacity: 0;
}

/* 立方体面的位置 */
.cube-face:nth-child(1) { transform: translateZ(100px); }
.cube-face:nth-child(2) { transform: rotateY(90deg) translateZ(100px); }
.cube-face:nth-child(3) { transform: rotateY(180deg) translateZ(100px); }
.cube-face:nth-child(4) { transform: rotateY(-90deg) translateZ(100px); }
.cube-face:nth-child(5) { transform: rotateX(90deg) translateZ(100px); }
.cube-face:nth-child(6) { transform: rotateX(-90deg) translateZ(100px); }

/* 中心四面体 */
.center-tetrahedron {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 160px;
  height: 160px;
  transform-style: preserve-3d;
  opacity: 0;
}

.tetrahedron-face {
  position: absolute;
  width: 160px;
  height: 160px;
  background: rgba(231, 76, 60, 0.8);
  border: 2px solid rgba(255, 255, 255, 0.5);
  opacity: 0;
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
}

/* 四面体面的位置 */
.tetrahedron-face:nth-child(1) { transform: translateZ(80px); }
.tetrahedron-face:nth-child(2) { transform: rotateY(120deg) translateZ(80px); }
.tetrahedron-face:nth-child(3) { transform: rotateY(240deg) translateZ(80px); }
.tetrahedron-face:nth-child(4) { transform: rotateX(180deg) translateZ(80px); }

/* 中心八面体 */
.center-octahedron {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 120px;
  height: 120px;
  transform-style: preserve-3d;
  opacity: 0;
}

.octahedron-face {
  position: absolute;
  width: 120px;
  height: 120px;
  background: rgba(243, 156, 18, 0.8);
  border: 2px solid rgba(255, 255, 255, 0.5);
  opacity: 0;
  clip-path: polygon(50% 0%, 0% 50%, 100% 50%);
}

/* 八面体面的位置 */
.octahedron-face:nth-child(1) { transform: translateZ(60px); }
.octahedron-face:nth-child(2) { transform: rotateY(45deg) translateZ(60px); }
.octahedron-face:nth-child(3) { transform: rotateY(90deg) translateZ(60px); }
.octahedron-face:nth-child(4) { transform: rotateY(135deg) translateZ(60px); }
.octahedron-face:nth-child(5) { transform: rotateY(180deg) translateZ(60px); }
.octahedron-face:nth-child(6) { transform: rotateY(225deg) translateZ(60px); }
.octahedron-face:nth-child(7) { transform: rotateY(270deg) translateZ(60px); }
.octahedron-face:nth-child(8) { transform: rotateY(315deg) translateZ(60px); }

/* 中心十二面体 */
.center-dodecahedron {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 100px;
  transform-style: preserve-3d;
  opacity: 0;
}

.dodecahedron-face {
  position: absolute;
  width: 100px;
  height: 100px;
  background: rgba(155, 89, 182, 0.8);
  border: 2px solid rgba(255, 255, 255, 0.5);
  opacity: 0;
  clip-path: polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%);
}

/* 十二面体面的位置 */
.dodecahedron-face:nth-child(1) { transform: translateZ(80px); }
.dodecahedron-face:nth-child(2) { transform: rotateY(36deg) translateZ(80px); }
.dodecahedron-face:nth-child(3) { transform: rotateY(72deg) translateZ(80px); }
.dodecahedron-face:nth-child(4) { transform: rotateY(108deg) translateZ(80px); }
.dodecahedron-face:nth-child(5) { transform: rotateY(144deg) translateZ(80px); }
.dodecahedron-face:nth-child(6) { transform: rotateY(180deg) translateZ(80px); }
.dodecahedron-face:nth-child(7) { transform: rotateY(216deg) translateZ(80px); }
.dodecahedron-face:nth-child(8) { transform: rotateY(252deg) translateZ(80px); }
.dodecahedron-face:nth-child(9) { transform: rotateY(288deg) translateZ(80px); }
.dodecahedron-face:nth-child(10) { transform: rotateY(324deg) translateZ(80px); }
.dodecahedron-face:nth-child(11) { transform: rotateX(90deg) translateZ(80px); }
.dodecahedron-face:nth-child(12) { transform: rotateX(-90deg) translateZ(80px); }

/* 中心二十面体 */
.center-icosahedron {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 80px;
  transform-style: preserve-3d;
  opacity: 0;
}

.icosahedron-face {
  position: absolute;
  width: 80px;
  height: 80px;
  background: rgba(26, 188, 156, 0.8);
  border: 2px solid rgba(255, 255, 255, 0.5);
  opacity: 0;
  clip-path: polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%);
}

/* 二十面体面的位置 */
.icosahedron-face:nth-child(1) { transform: translateZ(60px); }
.icosahedron-face:nth-child(2) { transform: rotateY(36deg) translateZ(60px); }
.icosahedron-face:nth-child(3) { transform: rotateY(72deg) translateZ(60px); }
.icosahedron-face:nth-child(4) { transform: rotateY(108deg) translateZ(60px); }
.icosahedron-face:nth-child(5) { transform: rotateY(144deg) translateZ(60px); }
.icosahedron-face:nth-child(6) { transform: rotateY(180deg) translateZ(60px); }
.icosahedron-face:nth-child(7) { transform: rotateY(216deg) translateZ(60px); }
.icosahedron-face:nth-child(8) { transform: rotateY(252deg) translateZ(60px); }
.icosahedron-face:nth-child(9) { transform: rotateY(288deg) translateZ(60px); }
.icosahedron-face:nth-child(10) { transform: rotateY(324deg) translateZ(60px); }
.icosahedron-face:nth-child(11) { transform: rotateX(36deg) translateZ(60px); }
.icosahedron-face:nth-child(12) { transform: rotateX(72deg) translateZ(60px); }
.icosahedron-face:nth-child(13) { transform: rotateX(108deg) translateZ(60px); }
.icosahedron-face:nth-child(14) { transform: rotateX(144deg) translateZ(60px); }
.icosahedron-face:nth-child(15) { transform: rotateX(180deg) translateZ(60px); }
.icosahedron-face:nth-child(16) { transform: rotateX(216deg) translateZ(60px); }
.icosahedron-face:nth-child(17) { transform: rotateX(252deg) translateZ(60px); }
.icosahedron-face:nth-child(18) { transform: rotateX(288deg) translateZ(60px); }
.icosahedron-face:nth-child(19) { transform: rotateX(324deg) translateZ(60px); }
.icosahedron-face:nth-child(20) { transform: rotateX(360deg) translateZ(60px); }

/* 几何环 */
.geometry-rings {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.geometry-ring {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 250px;
  height: 250px;
  border-radius: 50%;
  transform-style: preserve-3d;
  opacity: 0;
}

.geometry-ring:nth-child(2) {
  width: 320px;
  height: 320px;
}

.geometry-ring:nth-child(3) {
  width: 390px;
  height: 390px;
}

.geometry-ring:nth-child(4) {
  width: 460px;
  height: 460px;
}

.geometry-ring:nth-child(5) {
  width: 530px;
  height: 530px;
}

.geometry-ring:nth-child(6) {
  width: 600px;
  height: 600px;
}

.geometry-ring:nth-child(7) {
  width: 670px;
  height: 670px;
}

.geometry-ring:nth-child(8) {
  width: 740px;
  height: 740px;
}

.ring-segment {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 15px;
  height: 80px;
  background: rgba(231, 76, 60, 0.8);
  border: 2px solid rgba(255, 255, 255, 0.5);
  transform-origin: 0 50%;
  opacity: 0;
}

/* 环段的位置（36个段，10度一个） */
.ring-segment:nth-child(1) { transform: translate(0, -50%) rotate(0deg); }
.ring-segment:nth-child(2) { transform: translate(0, -50%) rotate(10deg); }
.ring-segment:nth-child(3) { transform: translate(0, -50%) rotate(20deg); }
.ring-segment:nth-child(4) { transform: translate(0, -50%) rotate(30deg); }
.ring-segment:nth-child(5) { transform: translate(0, -50%) rotate(40deg); }
.ring-segment:nth-child(6) { transform: translate(0, -50%) rotate(50deg); }
.ring-segment:nth-child(7) { transform: translate(0, -50%) rotate(60deg); }
.ring-segment:nth-child(8) { transform: translate(0, -50%) rotate(70deg); }
.ring-segment:nth-child(9) { transform: translate(0, -50%) rotate(80deg); }
.ring-segment:nth-child(10) { transform: translate(0, -50%) rotate(90deg); }
.ring-segment:nth-child(11) { transform: translate(0, -50%) rotate(100deg); }
.ring-segment:nth-child(12) { transform: translate(0, -50%) rotate(110deg); }
.ring-segment:nth-child(13) { transform: translate(0, -50%) rotate(120deg); }
.ring-segment:nth-child(14) { transform: translate(0, -50%) rotate(130deg); }
.ring-segment:nth-child(15) { transform: translate(0, -50%) rotate(140deg); }
.ring-segment:nth-child(16) { transform: translate(0, -50%) rotate(150deg); }
.ring-segment:nth-child(17) { transform: translate(0, -50%) rotate(160deg); }
.ring-segment:nth-child(18) { transform: translate(0, -50%) rotate(170deg); }
.ring-segment:nth-child(19) { transform: translate(0, -50%) rotate(180deg); }
.ring-segment:nth-child(20) { transform: translate(0, -50%) rotate(190deg); }
.ring-segment:nth-child(21) { transform: translate(0, -50%) rotate(200deg); }
.ring-segment:nth-child(22) { transform: translate(0, -50%) rotate(210deg); }
.ring-segment:nth-child(23) { transform: translate(0, -50%) rotate(220deg); }
.ring-segment:nth-child(24) { transform: translate(0, -50%) rotate(230deg); }
.ring-segment:nth-child(25) { transform: translate(0, -50%) rotate(240deg); }
.ring-segment:nth-child(26) { transform: translate(0, -50%) rotate(250deg); }
.ring-segment:nth-child(27) { transform: translate(0, -50%) rotate(260deg); }
.ring-segment:nth-child(28) { transform: translate(0, -50%) rotate(270deg); }
.ring-segment:nth-child(29) { transform: translate(0, -50%) rotate(280deg); }
.ring-segment:nth-child(30) { transform: translate(0, -50%) rotate(290deg); }
.ring-segment:nth-child(31) { transform: translate(0, -50%) rotate(300deg); }
.ring-segment:nth-child(32) { transform: translate(0, -50%) rotate(310deg); }
.ring-segment:nth-child(33) { transform: translate(0, -50%) rotate(320deg); }
.ring-segment:nth-child(34) { transform: translate(0, -50%) rotate(330deg); }
.ring-segment:nth-child(35) { transform: translate(0, -50%) rotate(340deg); }
.ring-segment:nth-child(36) { transform: translate(0, -50%) rotate(350deg); }

/* 几何网格 */
.geometry-grid {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.grid-point {
  position: absolute;
  width: 4px;
  height: 4px;
  background: rgba(155, 89, 182, 0.8);
  border-radius: 50%;
  box-shadow: 0 0 5px rgba(155, 89, 182, 0.8);
  opacity: 0;
}

/* 粒子系统 */
.particle-system {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.particle {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 4px;
  height: 4px;
  background: rgba(243, 156, 18, 0.8);
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(243, 156, 18, 0.8);
  opacity: 0;
}

/* 光线效果 */
.light-effects {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
}

.light-ray {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 2px;
  height: 350px;
  background: linear-gradient(to bottom, rgba(52, 152, 219, 0.8), transparent);
  transform-origin: 50% 0;
  opacity: 0;
}

.light-ray:nth-child(1) { transform: translate(-50%, -50%) rotate(0deg); }
.light-ray:nth-child(2) { transform: translate(-50%, -50%) rotate(30deg); }
.light-ray:nth-child(3) { transform: translate(-50%, -50%) rotate(60deg); }
.light-ray:nth-child(4) { transform: translate(-50%, -50%) rotate(90deg); }
.light-ray:nth-child(5) { transform: translate(-50%, -50%) rotate(120deg); }
.light-ray:nth-child(6) { transform: translate(-50%, -50%) rotate(150deg); }
.light-ray:nth-child(7) { transform: translate(-50%, -50%) rotate(180deg); }
.light-ray:nth-child(8) { transform: translate(-50%, -50%) rotate(210deg); }
.light-ray:nth-child(9) { transform: translate(-50%, -50%) rotate(240deg); }
.light-ray:nth-child(10) { transform: translate(-50%, -50%) rotate(270deg); }
.light-ray:nth-child(11) { transform: translate(-50%, -50%) rotate(300deg); }
.light-ray:nth-child(12) { transform: translate(-50%, -50%) rotate(330deg); }

/* 几何碎片 */
.geometry-fragments {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.fragment {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 30px;
  height: 30px;
  background: rgba(231, 76, 60, 0.8);
  border: 2px solid rgba(255, 255, 255, 0.5);
  opacity: 0;
  transform-style: preserve-3d;
}

/* 碎片形状 */
.fragment:nth-child(1) { clip-path: polygon(50% 0%, 0% 100%, 100% 100%); }
.fragment:nth-child(2) { clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%); }
.fragment:nth-child(3) { clip-path: polygon(50% 0%, 0% 100%, 100% 100%); }
.fragment:nth-child(4) { clip-path: polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%); }
.fragment:nth-child(5) { clip-path: polygon(0% 0%, 100% 0%, 75% 100%, 25% 100%); }
.fragment:nth-child(6) { clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%); }
.fragment:nth-child(7) { clip-path: polygon(0% 20%, 60% 20%, 100% 0%, 100% 80%, 60% 80%, 0% 100%); }
.fragment:nth-child(8) { clip-path: polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%); }
.fragment:nth-child(9) { clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 80% 80%, 20% 80%, 0% 100%); }
.fragment:nth-child(10) { clip-path: polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%); }
.fragment:nth-child(11) { clip-path: polygon(0% 0%, 100% 0%, 75% 100%, 50% 75%, 25% 100%); }
.fragment:nth-child(12) { clip-path: polygon(0% 0%, 80% 0%, 100% 20%, 100% 100%, 20% 100%, 0% 80%); }
.fragment:nth-child(13) { clip-path: polygon(25% 0%, 75% 0%, 100% 25%, 100% 75%, 75% 100%, 25% 100%, 0% 75%, 0% 25%); }
.fragment:nth-child(14) { clip-path: polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%); }
.fragment:nth-child(15) { clip-path: polygon(0% 0%, 100% 0%, 100% 60%, 60% 60%, 60% 100%, 0% 100%); }
.fragment:nth-child(16) { clip-path: polygon(0% 0%, 100% 0%, 100% 40%, 60% 40%, 60% 100%, 40% 100%, 40% 40%, 0% 40%); }
.fragment:nth-child(17) { clip-path: polygon(0% 0%, 100% 0%, 80% 50%, 100% 100%, 0% 100%, 20% 50%); }
.fragment:nth-child(18) { clip-path: polygon(50% 0%, 100% 0%, 100% 50%, 50% 100%, 0% 50%, 0% 0%); }
.fragment:nth-child(19) { clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 50% 75%, 0% 100%); }
.fragment:nth-child(20) { clip-path: polygon(25% 0%, 75% 0%, 100% 25%, 100% 75%, 75% 100%, 25% 100%, 0% 75%, 0% 25%); }
.fragment:nth-child(21) { clip-path: polygon(50% 0%, 100% 0%, 100% 100%, 50% 100%); }
.fragment:nth-child(22) { clip-path: polygon(0% 0%, 50% 0%, 50% 100%, 0% 100%); }
.fragment:nth-child(23) { clip-path: polygon(25% 0%, 75% 0%, 75% 100%, 25% 100%); }
.fragment:nth-child(24) { clip-path: polygon(0% 25%, 100% 25%, 100% 75%, 0% 75%); }
.fragment:nth-child(25) { clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%); }
.fragment:nth-child(26) { clip-path: polygon(0% 0%, 100% 0%, 80% 20%, 80% 80%, 100% 100%, 0% 100%, 20% 80%, 20% 20%); }
.fragment:nth-child(27) { clip-path: polygon(30% 0%, 70% 0%, 70% 100%, 30% 100%); }
.fragment:nth-child(28) { clip-path: polygon(0% 30%, 100% 30%, 100% 70%, 0% 70%); }
.fragment:nth-child(29) { clip-path: polygon(40% 0%, 60% 0%, 60% 100%, 40% 100%); }
.fragment:nth-child(30) { clip-path: polygon(0% 40%, 100% 40%, 100% 60%, 0% 60%); }
.fragment:nth-child(31) { clip-path: polygon(50% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%); }
.fragment:nth-child(32) { clip-path: polygon(0% 0%, 100% 0%, 100% 50%, 50% 100%, 0% 50%); }
.fragment:nth-child(33) { clip-path: polygon(50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%); }
.fragment:nth-child(34) { clip-path: polygon(0% 0%, 100% 0%, 85% 15%, 85% 85%, 15% 85%, 15% 15%); }
.fragment:nth-child(35) { clip-path: polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%); }
.fragment:nth-child(36) { clip-path: polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%); }
.fragment:nth-child(37) { clip-path: polygon(40% 0%, 60% 0%, 100% 40%, 100% 60%, 60% 100%, 40% 100%, 0% 60%, 0% 40%); }
.fragment:nth-child(38) { clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%); }
.fragment:nth-child(39) { clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%); }
.fragment:nth-child(40) { clip-path: polygon(50% 0%, 100% 100%, 0% 100%); }
.fragment:nth-child(41) { clip-path: polygon(0% 0%, 100% 0%, 50% 100%); }
.fragment:nth-child(42) { clip-path: polygon(0% 0%, 100% 50%, 0% 100%); }
.fragment:nth-child(43) { clip-path: polygon(100% 0%, 0% 50%, 100% 100%); }
.fragment:nth-child(44) { clip-path: polygon(25% 0%, 75% 0%, 100% 25%, 100% 75%, 75% 100%, 25% 100%, 0% 75%, 0% 25%); }
.fragment:nth-child(45) { clip-path: polygon(33% 0%, 66% 0%, 100% 33%, 100% 66%, 66% 100%, 33% 100%, 0% 66%, 0% 33%); }
.fragment:nth-child(46) { clip-path: polygon(50% 0%, 100% 33%, 100% 66%, 50% 100%, 0% 66%, 0% 33%); }
.fragment:nth-child(47) { clip-path: polygon(0% 0%, 100% 0%, 100% 33%, 66% 50%, 100% 66%, 100% 100%, 0% 100%, 0% 66%, 33% 50%, 0% 33%); }
.fragment:nth-child(48) { clip-path: polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%); }
.fragment:nth-child(49) { clip-path: polygon(25% 0%, 75% 0%, 100% 25%, 100% 75%, 75% 100%, 25% 100%, 0% 75%, 0% 25%); }
.fragment:nth-child(50) { clip-path: polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%); }

/* 额外几何元素 */
.additional-geometry {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.geometry-sphere {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 40px;
  height: 40px;
  background: rgba(52, 152, 219, 0.8);
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  opacity: 0;
  transform-style: preserve-3d;
}

.geometry-torus {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 60px;
  height: 60px;
  background: rgba(231, 76, 60, 0.8);
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  opacity: 0;
  transform-style: preserve-3d;
  box-shadow: inset 0 0 20px rgba(255, 255, 255, 0.5);
}

.geometry-cylinder {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 30px;
  height: 60px;
  background: rgba(243, 156, 18, 0.8);
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 15px;
  opacity: 0;
  transform-style: preserve-3d;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .geometry-wrapper {
    width: 400px;
    height: 400px;
  }
  
  .center-cube {
    width: 120px;
    height: 120px;
  }
  
  .cube-face {
    width: 120px;
    height: 120px;
  }
  
  .cube-face:nth-child(1) { transform: translateZ(60px); }
  .cube-face:nth-child(2) { transform: rotateY(90deg) translateZ(60px); }
  .cube-face:nth-child(3) { transform: rotateY(180deg) translateZ(60px); }
  .cube-face:nth-child(4) { transform: rotateY(-90deg) translateZ(60px); }
  .cube-face:nth-child(5) { transform: rotateX(90deg) translateZ(60px); }
  .cube-face:nth-child(6) { transform: rotateX(-90deg) translateZ(60px); }
  
  .center-tetrahedron {
    width: 100px;
    height: 100px;
  }
  
  .tetrahedron-face {
    width: 100px;
    height: 100px;
  }
  
  .center-octahedron {
    width: 80px;
    height: 80px;
  }
  
  .octahedron-face {
    width: 80px;
    height: 80px;
  }
  
  .center-dodecahedron {
    width: 70px;
    height: 70px;
  }
  
  .dodecahedron-face {
    width: 70px;
    height: 70px;
  }
  
  .center-icosahedron {
    width: 60px;
    height: 60px;
  }
  
  .icosahedron-face {
    width: 60px;
    height: 60px;
  }
  
  .geometry-ring {
    width: 150px;
    height: 150px;
  }
  
  .geometry-ring:nth-child(2) {
    width: 200px;
    height: 200px;
  }
  
  .geometry-ring:nth-child(3) {
    width: 250px;
    height: 250px;
  }
  
  .geometry-ring:nth-child(4) {
    width: 300px;
    height: 300px;
  }
  
  .geometry-ring:nth-child(5) {
    width: 350px;
    height: 350px;
  }
  
  .geometry-ring:nth-child(6) {
    width: 400px;
    height: 400px;
  }
  
  .geometry-ring:nth-child(7) {
    width: 450px;
    height: 450px;
  }
  
  .geometry-ring:nth-child(8) {
    width: 500px;
    height: 500px;
  }
  
  .ring-segment {
    width: 10px;
    height: 50px;
  }
  
  .light-ray {
    height: 200px;
  }
  
  .fragment {
    width: 20px;
    height: 20px;
  }
  
  .geometry-sphere {
    width: 30px;
    height: 30px;
  }
  
  .geometry-torus {
    width: 40px;
    height: 40px;
  }
  
  .geometry-cylinder {
    width: 20px;
    height: 40px;
  }
  
  .animation-controls {
    flex-direction: column;
    align-items: center;
  }
  
  .control-btn {
    width: 200px;
    margin-bottom: 10px;
  }
}

/* 自动播放动画样式 */
.auto-animation-section {
  min-height: 800px;
  background: radial-gradient(circle, rgba(155, 89, 182, 0.2), rgba(52, 152, 219, 0.2), rgba(231, 76, 60, 0.2));
  padding: 100px 20px;
  margin: 50px 0;
  border-radius: 20px;
  position: relative;
  overflow: hidden;
  text-align: center;
}

.auto-animation-container {
  max-width: 900px;
  margin: 0 auto;
  position: relative;
}

/* 粒子爆炸效果 */
.particle-explosion {
  position: relative;
  width: 400px;
  height: 400px;
  margin: 0 auto 100px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  overflow: hidden;
}

.particle {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 4px;
  height: 4px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(52, 152, 219, 0.8);
  transform: translate(-50%, -50%);
  opacity: 0;
}

/* 几何形状变换 */
.shape-transformation {
  position: relative;
  width: 500px;
  height: 500px;
  margin: 0 auto;
}

.shape {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
}

.shape-1 {
  width: 100px;
  height: 100px;
  background: rgba(52, 152, 219, 0.8);
  border: 2px solid rgba(255, 255, 255, 0.5);
}

.shape-2 {
  width: 120px;
  height: 120px;
  background: rgba(231, 76, 60, 0.8);
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 50%;
}

.shape-3 {
  width: 0;
  height: 0;
  border-left: 60px solid transparent;
  border-right: 60px solid transparent;
  border-bottom: 100px solid rgba(46, 204, 113, 0.8);
  border: 2px solid rgba(255, 255, 255, 0.5);
}

.shape-4 {
  width: 100px;
  height: 100px;
  background: rgba(243, 156, 18, 0.8);
  border: 2px solid rgba(255, 255, 255, 0.5);
  transform: translate(-50%, -50%) rotate(45deg);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .particle-explosion {
    width: 300px;
    height: 300px;
  }
  
  .shape-transformation {
    width: 400px;
    height: 400px;
  }
  
  .shape-1, .shape-4 {
    width: 80px;
    height: 80px;
  }
  
  .shape-2 {
    width: 100px;
    height: 100px;
  }
  
  .shape-3 {
    border-left: 50px solid transparent;
    border-right: 50px solid transparent;
    border-bottom: 80px solid rgba(46, 204, 113, 0.8);
  }
}

/* 滚动条样式 */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(45deg, #3498db, #9b59b6);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(45deg, #2980b9, #8e44ad);
}
</style>