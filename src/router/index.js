import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Assets from '../views/Assets.vue'
import Admin from '../views/Admin.vue'
import ModelDetail from '../views/ModelDetail.vue'
import ProductCollection from '../views/ProductCollection.vue'
import AIGCDesign from '../views/AIGCDesign.vue'
import AIGCDesignDetail from '../views/AIGCDesignDetail.vue'
import AIShortVideo from '../views/AIShortVideo.vue'
import AIShortVideoDetail from '../views/AIShortVideoDetail.vue'
import PhotographyAerial from '../views/PhotographyAerial.vue'
import PhotographyAerialDetail from '../views/PhotographyAerialDetail.vue'
import MapCapture from '../views/MapCapture.vue'
import VirtualCommunity from '../views/VirtualCommunity.vue'
import AnimeTest from '../views/AnimeTest.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/assets',
    name: 'Assets',
    component: Assets
  },
  {
    path: '/aigc',
    name: 'AIGCDesign',
    component: AIGCDesign
  },
  {
    path: '/aigc/design/:id',
    name: 'AIGCDesignDetail',
    component: AIGCDesignDetail,
    props: true
  },
  {
    path: '/ai-short-video',
    name: 'AIShortVideo',
    component: AIShortVideo
  },
  {
    path: '/ai-short-video/product/:id',
    name: 'AIShortVideoDetail',
    component: AIShortVideoDetail,
    props: true
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin
  },
  {
    path: '/model/:id',
    name: 'ModelDetail',
    component: ModelDetail,
    props: true
  },
  {
    path: '/collection',
    name: 'ProductCollection',
    component: ProductCollection
  },
  {
    path: '/photography-aerial',
    name: 'PhotographyAerial',
    component: PhotographyAerial
  },
  {
    path: '/photography-aerial/:id',
    name: 'PhotographyAerialDetail',
    component: PhotographyAerialDetail,
    props: true
  },
  {
    path: '/map-capture',
    name: 'MapCapture',
    component: MapCapture
  },
  {
    path: '/virtual-community',
    name: 'VirtualCommunity',
    component: VirtualCommunity
  },
  {
    path: '/anime-test',
    name: 'AnimeTest',
    component: AnimeTest
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
