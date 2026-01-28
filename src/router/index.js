import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Assets from '../views/Assets.vue'
import Admin from '../views/Admin.vue'
import ModelDetail from '../views/ModelDetail.vue'
import ProductCollection from '../views/ProductCollection.vue'
import AIGCDesign from '../views/AIGCDesign.vue'
import AIShortVideo from '../views/AIShortVideo.vue'
import PhotographyAerial from '../views/PhotographyAerial.vue'
import MapCapture from '../views/MapCapture.vue'
import VirtualCommunity from '../views/VirtualCommunity.vue'

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
    path: '/ai-short-video',
    name: 'AIShortVideo',
    component: AIShortVideo
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
    path: '/map-capture',
    name: 'MapCapture',
    component: MapCapture
  },
  {
    path: '/virtual-community',
    name: 'VirtualCommunity',
    component: VirtualCommunity
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
