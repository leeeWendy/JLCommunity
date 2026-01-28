<template>
  <div class="app">
    <!-- 背景效果 -->
    <div class="bg-effects">
      <div class="bg-particles"></div>
    </div>
    
    <header class="header">
      <div class="logo">
        <div class="logo-container">
          <span class="logo-text">聚灵OPC社区</span>
          <div class="logo-glow"></div>
        </div>
        <div class="logo-slogan">
          <span class="slogan-chinese">汇聚智慧 灵动创新</span>
        </div>
      </div>
      <div class="header-center">
        <nav class="nav">
          <router-link to="/" class="nav-link">
            <div class="nav-link-inner">
              <span class="nav-icon">🏠</span>
              <span class="nav-text">首页</span>
              <div class="nav-link-glow"></div>
            </div>
          </router-link>
          <router-link to="/assets" class="nav-link">
            <div class="nav-link-inner">
              <span class="nav-icon">📺</span>
              <span class="nav-text">三维资产</span>
              <div class="nav-link-glow"></div>
            </div>
          </router-link>
        </nav>
      </div>
      <!-- 主题选择按钮 -->
      <div class="theme-selector">
        <button class="theme-button" @click="toggleThemeMenu">
          <span class="theme-icon">🎨</span>
          <span class="theme-text">主题</span>
          <div class="theme-button-glow"></div>
        </button>
        <div v-if="showThemeMenu" class="theme-menu">
          <button 
            v-for="theme in themes" 
            :key="theme.id"
            class="theme-option"
            :class="{ active: currentTheme === theme.id }"
            @click="setTheme(theme.id)"
          >
            <div class="theme-color" :style="{ backgroundColor: theme.color }"></div>
            <span class="theme-name">{{ theme.name }}</span>
          </button>
        </div>
      </div>
    </header>
    <main class="main">
      <router-view />
    </main>
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-logo-container">
          <div class="footer-logo">聚灵OPC社区</div>
          <div class="footer-logo-glow"></div>
        </div>
        <div class="footer-links">
          <a href="#" class="footer-link">关于我们</a>
          <a href="#" class="footer-link">使用指南</a>
          <a href="#" class="footer-link">联系我们</a>
        </div>
        <div class="footer-social">
          <a href="#" class="social-link">
            <span class="social-icon">📧</span>
          </a>
          <a href="#" class="social-link">
            <span class="social-icon">📱</span>
          </a>
          <a href="#" class="social-link">
            <span class="social-icon">🌐</span>
          </a>
        </div>
        <div class="footer-copyright">
          &copy; {{ new Date().getFullYear() }} 聚灵OPC社区. 保留所有权利。
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// 主题管理
const showThemeMenu = ref(false)
const currentTheme = ref('default')

const themes = [
  { id: 'default', name: '当前风格', color: '#667eea' },
  { id: 'green', name: '绿色', color: '#4ade80' },
  { id: 'deep-blue', name: '深蓝色科技', color: '#00f2fe' },
  { id: 'red-disaster', name: '红色灾难', color: '#ff416c' }
]

// 主题配色方案
const themeConfigs = {
  default: {
    primaryGradient: 'linear-gradient(45deg, #667eea, #764ba2)',
    primaryGlow: 'rgba(102, 126, 234, 0.5)',
    secondaryGlow: 'rgba(118, 75, 162, 0.5)',
    bgColor: '#0f0f23',
    cardBg: 'rgba(15, 15, 35, 0.8)',
    borderColor: 'rgba(102, 126, 234, 0.2)'
  },
  'green': {
    primaryGradient: 'linear-gradient(45deg, #4ade80, #22c55e)',
    primaryGlow: 'rgba(74, 222, 128, 0.5)',
    secondaryGlow: 'rgba(34, 197, 94, 0.5)',
    bgColor: '#0f2d1d',
    cardBg: 'rgba(15, 45, 29, 0.8)',
    borderColor: 'rgba(74, 222, 128, 0.2)'
  },
  'deep-blue': {
    primaryGradient: 'linear-gradient(45deg, #00f2fe, #4facfe)',
    primaryGlow: 'rgba(0, 242, 254, 0.5)',
    secondaryGlow: 'rgba(79, 172, 254, 0.5)',
    bgColor: '#0a1929',
    cardBg: 'rgba(10, 25, 41, 0.8)',
    borderColor: 'rgba(0, 242, 254, 0.2)'
  },
  'red-disaster': {
    primaryGradient: 'linear-gradient(45deg, #ff416c, #ff4b2b)',
    primaryGlow: 'rgba(255, 65, 108, 0.5)',
    secondaryGlow: 'rgba(255, 75, 43, 0.5)',
    bgColor: '#2d0000',
    cardBg: 'rgba(45, 0, 0, 0.8)',
    borderColor: 'rgba(255, 65, 108, 0.2)'
  }
}

// 切换主题菜单
const toggleThemeMenu = () => {
  showThemeMenu.value = !showThemeMenu.value
}

// 设置主题
const setTheme = (themeId) => {
  currentTheme.value = themeId
  applyTheme(themeId)
  showThemeMenu.value = false
}

// 应用主题
const applyTheme = (themeId) => {
  const theme = themeConfigs[themeId]
  if (theme) {
    const root = document.documentElement
    root.style.setProperty('--primary-gradient', theme.primaryGradient)
    root.style.setProperty('--primary-glow', theme.primaryGlow)
    root.style.setProperty('--secondary-glow', theme.secondaryGlow)
    root.style.setProperty('--bg-color', theme.bgColor)
    root.style.setProperty('--card-bg', theme.cardBg)
    root.style.setProperty('--border-color', theme.borderColor)
    
    // 保存主题到本地存储
    localStorage.setItem('theme', themeId)
  }
}

// 初始化主题
onMounted(() => {
  // 从本地存储加载主题
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme && themes.some(t => t.id === savedTheme)) {
    currentTheme.value = savedTheme
  }
  applyTheme(currentTheme.value)
})
</script>

<style>
:root {
  --primary-gradient: linear-gradient(45deg, #667eea, #764ba2);
  --primary-glow: rgba(102, 126, 234, 0.5);
  --secondary-glow: rgba(118, 75, 162, 0.5);
  --bg-color: #0f0f23;
  --card-bg: rgba(15, 15, 35, 0.8);
  --border-color: rgba(102, 126, 234, 0.2);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: var(--bg-color);
  min-height: 100vh;
  color: #ffffff;
  overflow-x: hidden;
}

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
}

/* 背景效果 */
.bg-effects {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  pointer-events: none;
  background: var(--bg-color);
}

.bg-particles {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 30%, var(--primary-glow) 0%, transparent 50%),
    radial-gradient(circle at 80% 70%, var(--secondary-glow) 0%, transparent 50%),
    radial-gradient(circle at 40% 80%, var(--primary-glow) 0%, transparent 50%),
    radial-gradient(circle at 60% 20%, var(--secondary-glow) 0%, transparent 50%);
  animation: pulse 8s ease-in-out infinite;
  backdrop-filter: blur(10px);
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 60px;
  background: var(--card-bg);
  backdrop-filter: blur(25px);
  border-bottom: 1px solid var(--border-color);
  position: relative;
  z-index: 10;
  box-shadow: 
    0 4px 30px rgba(0, 0, 0, 0.3),
    0 0 20px var(--primary-glow);
}

.header-center {
  flex: 1;
  display: flex;
  justify-content: center;
}

.logo {
  display: flex;
  flex-direction: column;
}

.logo-container {
  position: relative;
  display: inline-block;
}

.logo-text {
  font-size: 36px;
  font-weight: bold;
  background: var(--primary-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 0 30px var(--primary-glow);
  position: relative;
  z-index: 1;
}

.logo-glow {
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  background: var(--primary-gradient);
  filter: blur(20px);
  opacity: 0.3;
  z-index: 0;
  border-radius: 20px;
  animation: logoGlow 3s ease-in-out infinite;
}

@keyframes logoGlow {
  0%, 100% {
    opacity: 0.2;
    transform: scale(0.9);
  }
  50% {
    opacity: 0.4;
    transform: scale(1.05);
  }
}

.logo-slogan {
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.slogan-chinese {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
  text-shadow: 0 0 10px var(--primary-glow);
}

.nav {
  display: flex;
  gap: 24px;
}

.nav-link {
  text-decoration: none;
  position: relative;
}

.nav-link-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 28px;
  border-radius: 20px;
  background: var(--card-bg);
  backdrop-filter: blur(15px);
  border: 1px solid var(--border-color);
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
}

.nav-link-inner::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, var(--primary-glow), transparent);
  transition: left 0.6s ease;
}

.nav-link:hover .nav-link-inner::before {
  left: 100%;
}

.nav-link:hover .nav-link-inner,
.nav-link.router-link-active .nav-link-inner {
  background: var(--primary-glow);
  border-color: var(--border-color);
  transform: translateY(-3px);
  box-shadow: 
    0 8px 25px var(--primary-glow),
    0 0 15px var(--secondary-glow);
}

.nav-link-glow {
  position: absolute;
  top: -5px;
  left: -5px;
  right: -5px;
  bottom: -5px;
  background: var(--primary-gradient);
  filter: blur(15px);
  opacity: 0;
  z-index: -1;
  border-radius: 25px;
  transition: opacity 0.4s ease;
}

.nav-link:hover .nav-link-glow,
.nav-link.router-link-active .nav-link-glow {
  opacity: 0.3;
}

.nav-icon {
  font-size: 22px;
  margin-bottom: 6px;
  transition: transform 0.3s ease;
}

.nav-link:hover .nav-icon {
  transform: scale(1.1);
}

.nav-text {
  font-size: 14px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
}

.main {
  flex: 1;
  padding: 60px;
  position: relative;
  z-index: 1;
}

.footer {
  background: var(--card-bg);
  backdrop-filter: blur(25px);
  border-top: 1px solid var(--border-color);
  margin-top: auto;
  position: relative;
  z-index: 10;
  box-shadow: 
    0 -4px 30px rgba(0, 0, 0, 0.3),
    0 0 20px var(--primary-glow);
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 50px 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
}

.footer-logo-container {
  position: relative;
  display: inline-block;
}

.footer-logo {
  font-size: 28px;
  font-weight: bold;
  background: var(--primary-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 0 20px var(--primary-glow);
  position: relative;
  z-index: 1;
}

.footer-logo-glow {
  position: absolute;
  top: -8px;
  left: -8px;
  right: -8px;
  bottom: -8px;
  background: var(--primary-gradient);
  filter: blur(15px);
  opacity: 0.3;
  z-index: 0;
  border-radius: 15px;
}

.footer-links {
  display: flex;
  gap: 35px;
  flex-wrap: wrap;
  justify-content: center;
}

.footer-link {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  transition: all 0.3s ease;
  font-size: 14px;
  font-weight: 500;
  position: relative;
  padding: 8px 16px;
  border-radius: 12px;
}

.footer-link:hover {
  color: #ffffff;
  background: var(--primary-glow);
  transform: translateY(-2px);
  box-shadow: 0 4px 15px var(--primary-glow);
}

.footer-social {
  display: flex;
  gap: 20px;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;
  background: var(--card-bg);
  backdrop-filter: blur(15px);
  border: 1px solid var(--border-color);
  border-radius: 50%;
  color: rgba(255, 255, 255, 0.8);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.social-link:hover {
  background: var(--primary-glow);
  border-color: var(--border-color);
  transform: translateY(-3px);
  box-shadow: 
    0 6px 20px var(--primary-glow),
    0 0 15px var(--secondary-glow);
  color: #ffffff;
}

.social-icon {
  font-size: 18px;
  transition: transform 0.3s ease;
}

.social-link:hover .social-icon {
  transform: scale(1.1);
}

.footer-copyright {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.5);
  text-align: center;
  padding-top: 20px;
  border-top: 1px solid var(--border-color);
  width: 100%;
}

@media (max-width: 768px) {
  .header {
    padding: 15px 30px;
  }
  
  .logo-text {
    font-size: 28px;
  }
  
  .nav {
    gap: 15px;
  }
  
  .nav-link-inner {
    padding: 12px 20px;
  }
  
  .main {
    padding: 30px;
  }
  
  .footer-content {
    padding: 40px 30px;
  }
  
  .footer-links {
    gap: 25px;
  }
}

/* 主题选择器样式 */
.theme-selector {
  position: relative;
  display: flex;
  align-items: center;
}

.theme-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-radius: 20px;
  background: var(--card-bg);
  backdrop-filter: blur(15px);
  border: 1px solid var(--border-color);
  color: rgba(255, 255, 255, 0.9);
  cursor: pointer;
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
  font-size: 14px;
  font-weight: 500;
  outline: none;
  height: 100%;
  min-height: 120px;
  justify-content: center;
}

.theme-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, var(--primary-glow), transparent);
  transition: left 0.6s ease;
}

.theme-button:hover::before {
  left: 100%;
}

.theme-button:hover {
  background: var(--primary-glow);
  border-color: var(--border-color);
  transform: translateY(-3px);
  box-shadow: 
    0 8px 25px var(--primary-glow),
    0 0 15px var(--secondary-glow);
}

.theme-icon {
  font-size: 22px;
  margin-bottom: 6px;
  transition: transform 0.3s ease;
}

.theme-button:hover .theme-icon {
  transform: scale(1.1);
}

.theme-text {
  font-size: 14px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
}

.theme-menu {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 10px;
  background: var(--card-bg);
  backdrop-filter: blur(25px);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  box-shadow: 
    0 10px 30px rgba(0, 0, 0, 0.4),
    0 0 20px var(--primary-glow);
  padding: 10px;
  z-index: 1000;
  min-width: 200px;
  animation: menuSlideIn 0.3s ease-out;
}

@keyframes menuSlideIn {
  from {
    opacity: 0;
    transform: translateY(-10px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.theme-option {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-radius: 12px;
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.9);
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  text-align: left;
  gap: 12px;
  font-size: 14px;
  font-weight: 500;
}

.theme-option:hover {
  background: var(--primary-glow);
  transform: translateX(5px);
}

.theme-option.active {
  background: var(--primary-glow);
  border-left: 3px solid var(--primary-glow);
}

.theme-color {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.theme-name {
  flex: 1;
}

@media (max-width: 768px) {
  .header {
    padding: 15px 30px;
  }
  
  .logo-text {
    font-size: 28px;
  }
  
  .nav {
    gap: 15px;
  }
  
  .nav-link-inner {
    padding: 12px 20px;
  }
  
  .theme-button {
    padding: 12px 20px;
  }
  
  .main {
    padding: 30px;
  }
  
  .footer-content {
    padding: 40px 30px;
  }
  
  .footer-links {
    gap: 25px;
  }
}

@media (max-width: 480px) {
  .header {
    flex-direction: column;
    gap: 20px;
    padding: 20px;
  }
  
  .nav {
    width: 100%;
    justify-content: space-around;
  }
  
  .header-right {
    width: 100%;
    justify-content: center;
  }
  
  .main {
    padding: 20px;
  }
  
  .footer-content {
    padding: 30px 20px;
  }
  
  .footer-links {
    flex-direction: column;
    align-items: center;
    gap: 15px;
  }
  
  .theme-menu {
    left: 50%;
    right: auto;
    transform: translateX(-50%);
  }
}
</style>
