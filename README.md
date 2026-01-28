# 3D产品展示平台

一个基于Vue 3 + Three.js的现代化3D产品展示网站，支持模型上传和交互式展示。

## 项目特点

- **现代化UI设计**：采用蓝紫渐变配色方案，玻璃态效果，响应式布局
- **3D模型展示**：集成Three.js实现实时3D模型预览和旋转动画
- **完整的管理功能**：支持上传、编辑、删除三维模型
- **支持多种格式**：兼容OBJ、FBX、GLTF、GLB、STL、3DS等主流3D模型格式
- **直观的用户界面**：拖拽上传、实时预览、平滑动画效果

## 技术栈

- **前端框架**：Vue 3 + Vite
- **3D渲染**：Three.js
- **路由管理**：Vue Router
- **样式**：原生CSS3（支持玻璃态效果）

## 项目结构

```
3d-web-showcase/
├── public/             # 静态资源
├── src/
│   ├── assets/         # 图片、样式等
│   ├── components/     # 组件
│   │   └── ModelViewer.vue     # 3D模型查看器
│   ├── views/          # 页面
│   │   ├── Home.vue            # 首页
│   │   └── Admin.vue           # 管理页
│   ├── router/         # 路由
│   │   └── index.js            # 路由配置
│   ├── main.js         # 入口文件
│   └── App.vue         # 根组件
├── index.html          # HTML入口
├── package.json        # 项目配置
├── vite.config.js      # Vite配置
└── README.md           # 项目说明
```

## 安装和运行

### 前提条件

- Node.js 18+ 和 npm 9+

### 安装依赖

```bash
npm install
```

### 开发模式运行

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

### 预览生产构建

```bash
npm run preview
```

## 功能说明

### 首页
- 英雄区展示网站主题
- 精选模型网格布局
- 3D模型实时预览和旋转动画
- 平滑滚动导航

### 管理页面
- 完整的模型上传表单
- 拖拽式文件上传
- 支持填写模型名称和描述
- 已上传模型管理列表
- 编辑和删除功能

## 模型格式支持

- ✅ OBJ (.obj)
- ✅ FBX (.fbx)
- ✅ GLTF (.gltf, .glb)
- ✅ STL (.stl)
- ✅ 3DS (.3ds)

## 浏览器兼容性

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 注意事项

1. 本项目使用模拟数据，实际部署时需要后端服务支持
2. 模型文件较大时，上传可能需要较长时间
3. 建议使用GLTF格式的模型，体积小且加载速度快
4. 移动端设备可能会有性能限制

## 许可证

MIT
