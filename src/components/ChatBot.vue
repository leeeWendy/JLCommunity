<template>
  <div class="chatbot-container">
    <!-- 聊天按钮 -->
    <button 
      class="chatbot-button"
      @click="toggleChat"
    >
      <span class="chatbot-icon">🎧</span>
    </button>
    
    <!-- 聊天窗口 -->
    <div v-if="isOpen" class="chatbot-window">
      <!-- 聊天头部 -->
    <div class="chatbot-header">
      <h3>Chat with Us</h3>
      <div class="chatbot-header-buttons">
        <button 
          class="chatbot-stop-button" 
          @click="stopVoice"
          title="停止语音"
        >
          ⏹️
        </button>
        <button class="chatbot-close-button" @click="toggleChat">×</button>
      </div>
    </div>
      
      <!-- 聊天内容 -->
      <div class="chatbot-messages">
        <div class="chatbot-message">
          <div class="chatbot-message-content">
            <p>Welcome to 聚灵OPC社区! Feel free to ask me anything about our website or services.</p>
          </div>
        </div>
        
        <div 
          v-for="(message, index) in messages" 
          :key="index"
          class="chatbot-message"
          :class="message.role"
        >
          <div class="chatbot-message-content">
            <p>{{ message.content }}</p>
            <button 
              v-if="message.role === 'bot-message'"
              class="chatbot-voice-button"
              @click="playVoice(message.content)"
              title="播放语音"
            >
              🔊
            </button>
          </div>
        </div>
        
        <!-- 加载中 -->
        <div v-if="isLoading" class="chatbot-message bot-message">
          <div class="chatbot-loading">
            <span class="chatbot-loading-dot"></span>
            <span class="chatbot-loading-dot"></span>
            <span class="chatbot-loading-dot"></span>
          </div>
        </div>
      </div>
      
      <!-- 聊天输入 -->
      <div class="chatbot-input-container">
        <input 
          type="text" 
          class="chatbot-input"
          v-model="inputMessage"
          placeholder="Type your message..."
          @keyup.enter="sendMessage()"
        />
        <button 
          class="chatbot-send-button"
          @click="sendMessage"
          :disabled="!inputMessage.trim()"
        >
          →
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import axios from 'axios'
import { EdgeTTS } from 'edge-tts-universal'

// DeepSeek API配置
const API_KEY = 'sk-65fb220b490c4537b3910e55dc1f3768' // 用户提供的API密钥
const API_URL = 'https://api.deepseek.com/v1' // 用户指定的DeepSeek API端点
const MODEL = 'deepseek-chat' // DeepSeek模型

// 响应式数据
const isOpen = ref(false)
const isLoading = ref(false)
const inputMessage = ref('')
const messages = ref([])
const unreadMessages = ref(0)
const buttonHover = ref(false)
const isSpeaking = ref(false) // 语音播报状态
let speechInstance = null // 语音实例

// 快速问题
const quickQuestions = [
  'What services do you offer?',
  'How can I join the community?',
  'What is AIGC design?',
  'Do you offer photography services?'
]

// 切换聊天窗口
const toggleChat = () => {
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    unreadMessages.value = 0
  }
}

// 按钮悬停效果
const handleButtonHover = (hover) => {
  buttonHover.value = hover
}

// 处理快速问题
const handleQuickQuestion = (question) => {
  sendMessage(question)
}

// 大模型API配置
// 已配置DeepSeek API，使用fetch API调用

// 发送消息
const sendMessage = async (message = inputMessage.value) => {
  // 确保message是字符串类型
  let messageStr = ''
  
  // 处理不同类型的参数
  if (typeof message === 'string') {
    messageStr = message
  } else if (message && typeof message === 'object' && message.target && message.target.value) {
    // 处理事件对象
    messageStr = message.target.value
  } else {
    // 处理其他情况
    messageStr = String(message)
  }
  
  const trimmedMessage = messageStr.trim()
  if (!trimmedMessage) return
  
  // 添加用户消息
  messages.value.push({
    role: 'user-message',
    content: trimmedMessage
  })
  
  inputMessage.value = ''
  isLoading.value = true
  
  // 滚动到底部
  setTimeout(() => {
    const messagesContainer = document.querySelector('.chatbot-messages')
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight
    }
  }, 100)
  
  try {
    console.log('Starting DeepSeek API call process...');
    console.log('API Key:', API_KEY ? 'Set (masked)' : 'Not set');
    console.log('API URL:', API_URL);
    console.log('Model:', MODEL);
    console.log('User message:', trimmedMessage);
    
    // 准备消息
    const chatMessages = [
      {
        role: 'system',
        content: '你是聚灵OPC社区的智能助手，负责回答用户关于社区服务的问题，包括三维资产、AIGC设计、摄影与航拍、AI短视频和虚拟社区体验等。请用中文回答用户的问题，保持专业、友好的语气。'
      },
      {
        role: 'user',
        content: trimmedMessage
      }
    ];
    
    console.log('Prepared messages:', chatMessages);
    
    // 调用DeepSeek API
    console.log('Sending API request via fetch...');
    const fullApiUrl = `${API_URL}/chat/completions`;
    console.log('Full API URL:', fullApiUrl);
    const response = await fetch(fullApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: MODEL,
        messages: chatMessages,
        temperature: 0.7,
        stream: false
      })
    });
    
    console.log('API response received with status:', response.status);
    
    if (!response.ok) {
      throw new Error(`API错误：${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('API response data:', data);
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message || !data.choices[0].message.content) {
      throw new Error('Invalid API response format');
    }
    
    // 提取AI回复
    const aiResponse = data.choices[0].message.content;
    console.log('Extracted AI response:', aiResponse);
    
    // 添加AI回复到聊天窗口
    messages.value.push({
      role: 'bot-message',
      content: aiResponse
    });
    
    console.log('AI response added to chat');
  } catch (error) {
    console.error('Error calling AI API:', error);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    
    // 使用备用回复
    const fallbackResponse = generateResponse(trimmedMessage);
    console.log('Using fallback response:', fallbackResponse);
    messages.value.push({
      role: 'bot-message',
      content: fallbackResponse
    });
  } finally {
    isLoading.value = false;
    console.log('API call process completed');
    
    // 滚动到底部
    setTimeout(() => {
      const messagesContainer = document.querySelector('.chatbot-messages');
      if (messagesContainer) {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }
    }, 100);
  }
}

// 生成回复
const generateResponse = (message) => {
  const lowerMessage = message.toLowerCase()
  
  // 问候语
  if (lowerMessage.includes('你好') || lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('嗨')) {
    return '你好！很高兴为您服务。我是聚灵OPC社区的智能助手，有什么可以帮助您的吗？'
  }
  
  // 服务相关问题
  else if (lowerMessage.includes('service') || lowerMessage.includes('offer') || lowerMessage.includes('提供') || lowerMessage.includes('服务')) {
    return '我们提供多种服务，包括三维资产、AIGC设计、摄影与航拍、AI短视频和虚拟社区体验。我们的平台旨在帮助创意专业人士展示他们的作品并与他人建立联系。'
  } 
  
  // 社区加入问题
  else if (lowerMessage.includes('join') || lowerMessage.includes('community') || lowerMessage.includes('加入') || lowerMessage.includes('社区')) {
    return '加入我们的社区很简单！只需浏览我们的网站并参与我们的内容。您可以浏览我们的各个部分，如AIGC设计、摄影、AI短视频和虚拟社区。我们欢迎来自各种背景的创作者和爱好者。'
  } 
  
  // AIGC设计问题
  else if (lowerMessage.includes('aigc') || lowerMessage.includes('人工智能') || lowerMessage.includes('生成内容')) {
    return 'AIGC（人工智能生成内容）设计是使用人工智能创建视觉内容的过程，包括图像、视频和3D模型。我们的平台展示了AIGC技术和创意应用的最新成果，帮助设计师和艺术家利用AI工具进行项目创作。'
  } 
  
  // 摄影服务问题
  else if (lowerMessage.includes('photography') || lowerMessage.includes('摄影') || lowerMessage.includes('航拍')) {
    return '是的，我们提供专业摄影和航拍服务。我们的团队从独特的视角捕捉令人惊叹的视觉效果，非常适合营销、活动、房地产和创意项目。我们使用最新的设备和技术来提供高质量的结果。'
  } 
  
  // 视频服务问题
  else if (lowerMessage.includes('video') || lowerMessage.includes('视频') || lowerMessage.includes('短片')) {
    return '我们提供AI短视频制作服务，使用人工智能技术快速生成高质量的视频内容。无论是营销视频、产品展示还是创意短片，我们都能满足您的需求。'
  } 
  
  // 虚拟社区问题
  else if (lowerMessage.includes('virtual') || lowerMessage.includes('虚拟') || lowerMessage.includes('社区')) {
    return '我们的虚拟社区是一个沉浸式体验平台，连接全球用户，共享创意与灵感。在这里，您可以与志同道合的人交流，参与各种活动，展示您的作品。'
  } 
  
  // 关于我们的问题
  else if (lowerMessage.includes('about') || lowerMessage.includes('关于') || lowerMessage.includes('介绍')) {
    return '聚灵OPC社区是一个专注于创意技术和数字艺术的平台，致力于为创作者提供展示和交流的空间。我们融合了最新的AI技术和传统创意方法，为用户带来独特的体验。'
  } 
  
  // 联系我们的问题
  else if (lowerMessage.includes('contact') || lowerMessage.includes('联系') || lowerMessage.includes('电话') || lowerMessage.includes('邮箱')) {
    return '您可以通过网站上的联系表单与我们取得联系，或者关注我们的社交媒体账号。我们的团队会在24小时内回复您的咨询。'
  } 
  
  // 价格相关问题
  else if (lowerMessage.includes('price') || lowerMessage.includes('价格') || lowerMessage.includes('收费') || lowerMessage.includes('费用')) {
    return '我们的服务价格根据具体项目的需求而定。请联系我们的客服团队，他们会根据您的具体需求提供详细的报价方案。'
  } 
  
  // 技术相关问题
  else if (lowerMessage.includes('技术') || lowerMessage.includes('tech') || lowerMessage.includes('technology')) {
    return '我们使用最新的技术来提供服务，包括人工智能、3D建模、无人机航拍等。我们的团队不断学习和探索新技术，以确保为客户提供最优质的服务。'
  } 
  
  // 时间相关问题
  else if (lowerMessage.includes('时间') || lowerMessage.includes('多久') || lowerMessage.includes('完成') || lowerMessage.includes('交付')) {
    return '项目的完成时间取决于具体的需求和复杂度。简单的项目可能在几天内完成，而复杂的项目可能需要几周或更长时间。我们会在项目开始前提供详细的时间估计。'
  } 
  
  // 其他问题
  else {
    return `感谢您的提问！关于"${message}"，我可以为您提供更多信息。请问您想了解我们的哪项服务，如三维资产、AIGC设计、摄影、AI短视频或虚拟社区？`
  }
}

// 本地TTS服务集成
const useLocalTTS = async (text) => {
  console.log('=== 本地TTS服务 ===');
  
  try {
    const ttsUrl = 'http://localhost:5001/api/tts';
    console.log('调用本地TTS服务:', ttsUrl);
    console.log('使用语音ID:', 80, '(Junior - 儿童声音)');
    
    // 发送请求到本地TTS服务
    const response = await fetch(ttsUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        text: text,
        voice_id: 80 // 使用Junior语音（儿童声音）
      })
    });
    
    if (!response.ok) {
      throw new Error(`TTS服务错误: ${response.status} ${response.statusText}`);
    }
    
    // 获取音频数据
    const audioBlob = await response.blob();
    console.log('音频数据获取成功，大小:', audioBlob.size, '字节');
    console.log('音频类型:', audioBlob.type);
    
    // 验证音频数据
    if (audioBlob.size === 0) {
      throw new Error('获取到的音频数据为空');
    }
    
    // 尝试使用AudioContext播放音频（备选方案）
    try {
      console.log('尝试使用AudioContext播放音频...');
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const arrayBuffer = await audioBlob.arrayBuffer();
      console.log('转换为ArrayBuffer成功，大小:', arrayBuffer.byteLength, '字节');
      
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
      console.log('解码音频数据成功');
      console.log('音频时长:', audioBuffer.duration, '秒');
      console.log('音频通道数:', audioBuffer.numberOfChannels);
      
      // 创建音频源
      const source = audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioContext.destination);
      
      // 保存音频实例
      speechInstance = {
        context: audioContext,
        source: source
      };
      
      // 创建播放完成的Promise
      const playbackPromise = new Promise((resolve) => {
        source.onended = () => {
          isSpeaking.value = false;
          speechInstance = null;
          console.log('=== 本地TTS播放结束 (AudioContext) ===');
          resolve();
        };
      });
      
      // 播放音频
      console.log('开始播放本地TTS音频 (AudioContext)...');
      source.start();
      console.log('=== 本地TTS播放开始 (AudioContext) ===');
      console.log('正在播放Reed语音...');
      
      // 等待播放完成
      await playbackPromise;
    } catch (audioContextError) {
      console.error('AudioContext播放失败:', audioContextError);
      console.log('回退到使用Audio元素播放...');
      
      // 回退到使用Audio元素
      const audio = new Audio();
      const url = URL.createObjectURL(audioBlob);
      audio.src = url;
      console.log('音频元素创建成功，URL:', url);
      
      // 保存音频实例
      speechInstance = audio;
      
      // 创建播放完成的Promise
      const playbackPromise = new Promise((resolve, reject) => {
        audio.onplay = () => {
          console.log('=== 本地TTS播放开始 (Audio元素) ===');
        };
        
        audio.onended = () => {
          isSpeaking.value = false;
          speechInstance = null;
          console.log('=== 本地TTS播放结束 (Audio元素) ===');
          URL.revokeObjectURL(url);
          resolve();
        };
        
        audio.onerror = (event) => {
          isSpeaking.value = false;
          speechInstance = null;
          console.error('=== 本地TTS播放错误 (Audio元素) ===', event);
          URL.revokeObjectURL(url);
          reject(new Error('音频元素播放错误'));
        };
      });
      
      // 播放音频
      await audio.play();
      console.log('音频元素播放命令已发送');
      
      // 等待播放完成
      await playbackPromise;
    }
  } catch (error) {
    console.error('=== 本地TTS错误 ===', error);
    console.error('错误详情:', error.message);
    throw error;
  }
};

// 语音播放功能
const playVoice = async (text) => {
  try {
    // 首先停止正在播放的语音
    stopVoice();
    
    // 设置语音播报状态
    isSpeaking.value = true;
    console.log('Starting voice playback...');
    
    // 优先使用Edge TTS（高质量语音）
    console.log('Using Edge TTS...');
    await useEdgeTTS(text);
  } catch (edgeError) {
    console.error('Edge TTS failed:', edgeError);
    // Edge TTS失败时，尝试使用优化的浏览器内置语音合成
    try {
      console.log('Falling back to optimized browser TTS...');
      await optimizedBrowserTTS(text);
    } catch (browserError) {
      console.error('Browser TTS failed:', browserError);
      // 错误时使用基础的浏览器内置语音合成
      try {
        console.log('Falling back to basic browser TTS...');
        fallbackToBrowserTTS(text);
      } catch (basicError) {
        console.error('Basic browser TTS also failed:', basicError);
        // 最终尝试本地TTS服务
        try {
          console.log('Trying local TTS service as last resort...');
          await useLocalTTS(text);
        } catch (localError) {
          console.error('Local TTS also failed:', localError);
          // 所有方法都失败，重置状态
          isSpeaking.value = false;
        }
      }
    }
  }
};

// 停止语音播放
const stopVoice = () => {
  console.log('=== 开始停止语音播放 ===');
  
  // 立即强制重置语音状态
  isSpeaking.value = false;
  console.log('已设置isSpeaking为false');
  
  // 1. 停止浏览器内置的语音合成（多次尝试）
  console.log('停止浏览器内置的语音合成...');
  if ('speechSynthesis' in window) {
    try {
      // 多次调用cancel()确保停止
      for (let i = 0; i < 3; i++) {
        window.speechSynthesis.cancel();
        console.log(`第${i+1}次调用speechSynthesis.cancel()`);
      }
      console.log('浏览器语音合成已停止');
    } catch (error) {
      console.error('停止浏览器语音合成错误:', error);
    }
  }
  
  // 2. 特别处理speechInstance（各种语音实例）
  console.log('处理speechInstance...');
  if (speechInstance) {
    try {
      console.log('speechInstance类型:', typeof speechInstance);
      console.log('speechInstance结构:', speechInstance);
      
      // 处理AudioContext创建的音频实例
      if (speechInstance.context && speechInstance.source) {
        console.log('停止AudioContext语音实例...');
        try {
          if (speechInstance.source.stop) {
            speechInstance.source.stop();
            console.log('AudioContext语音实例已停止');
          }
          // 额外尝试关闭AudioContext
          if (speechInstance.context.close) {
            speechInstance.context.close();
            console.log('AudioContext已关闭');
          }
        } catch (e) {
          console.log('忽略停止错误:', e.message);
        }
      }
      // 处理Audio元素创建的音频实例
      else if (speechInstance.pause) {
        console.log('停止Audio元素语音实例...');
        try {
          // 多次尝试停止
          for (let i = 0; i < 3; i++) {
            speechInstance.pause();
            if (speechInstance.currentTime !== undefined) {
              speechInstance.currentTime = 0;
            }
            console.log(`第${i+1}次尝试停止Audio元素`);
          }
          console.log('Audio元素语音实例已停止');
        } catch (e) {
          console.error('停止Audio元素错误:', e);
        }
      }
      // 处理其他类型的语音实例
      else {
        console.log('停止其他类型语音实例...');
      }
    } catch (error) {
      console.error('停止speechInstance错误:', error);
    } finally {
      // 无论如何都重置speechInstance
      speechInstance = null;
      console.log('speechInstance已重置');
    }
  }
  
  // 3. 停止所有音频元素（更激进的方法）
  console.log('停止所有音频元素...');
  try {
    // 方法1: 获取所有音频元素并停止
    const audioElements = document.getElementsByTagName('audio');
    console.log('找到音频元素数量:', audioElements.length);
    for (let i = 0; i < audioElements.length; i++) {
      try {
        console.log('处理音频元素', i, ':', audioElements[i]);
        // 多次尝试停止
        for (let j = 0; j < 3; j++) {
          audioElements[i].pause();
          audioElements[i].currentTime = 0;
          // 额外设置src为null
          if (j === 2) {
            audioElements[i].src = '';
            console.log('已清空音频元素', i, '的src');
          }
          console.log(`第${j+1}次尝试停止音频元素`, i);
        }
        console.log('音频元素', i, '已停止');
      } catch (error) {
        console.error('停止音频元素', i, '错误:', error);
      }
    }
    
    // 方法2: 使用querySelectorAll获取所有音频元素
    const allAudioElements = document.querySelectorAll('audio');
    console.log('使用querySelectorAll找到音频元素数量:', allAudioElements.length);
    allAudioElements.forEach((audio, index) => {
      try {
        audio.pause();
        audio.currentTime = 0;
        console.log('使用querySelectorAll停止音频元素', index);
      } catch (error) {
        console.error('停止音频元素错误:', error);
      }
    });
  } catch (error) {
    console.error('获取音频元素错误:', error);
  }
  
  // 4. 尝试创建新的AudioContext来中断现有音频
  console.log('尝试创建新的AudioContext来中断现有音频...');
  try {
    const tempContext = new (window.AudioContext || window.webkitAudioContext)();
    tempContext.close();
    console.log('已创建并关闭临时AudioContext');
  } catch (error) {
    console.error('创建临时AudioContext错误:', error);
  }
  
  // 5. 强制重置状态（再次确保）
  setTimeout(() => {
    isSpeaking.value = false;
    speechInstance = null;
    console.log('延迟强制重置状态');
  }, 100);
  
  console.log('=== 语音播放停止操作完成 ===');
};

// 优化的浏览器内置语音合成
const optimizedBrowserTTS = async (text) => {
  console.log('=== 开始优化的浏览器TTS ===');
  
  // 检查语音合成是否可用
  if ('speechSynthesis' in window) {
    console.log('语音合成API可用');
    
    // 等待语音合成引擎完全加载
    await new Promise((resolve) => {
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = resolve;
      }
      // 立即检查是否已有语音
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        resolve();
      }
    });
    
    // 获取可用的语音列表
    const voices = window.speechSynthesis.getVoices();
    console.log('可用语音数量:', voices.length);
    
    // 打印所有可用语音
    console.log('所有可用语音:');
    voices.forEach((voice, index) => {
      console.log(`${index + 1}. ${voice.name} (${voice.lang})`);
    });
    
    // 尝试找到最佳的中文语音
    let selectedVoice = null;
    
    // 1. 优先选择微软的中文语音
    const microsoftChineseVoices = voices.filter(v => 
      v.name.includes('Microsoft') && v.lang.includes('zh')
    );
    console.log('微软中文语音数量:', microsoftChineseVoices.length);
    
    if (microsoftChineseVoices.length > 0) {
      selectedVoice = microsoftChineseVoices[0];
      console.log('选择的微软中文语音:', selectedVoice.name);
    }
    // 2. 其次选择其他中文语音
    else {
      const chineseVoices = voices.filter(v => v.lang.includes('zh'));
      console.log('其他中文语音数量:', chineseVoices.length);
      
      if (chineseVoices.length > 0) {
        selectedVoice = chineseVoices[0];
        console.log('选择的中文语音:', selectedVoice.name);
      }
      // 3. 最后选择默认语音
      else if (voices.length > 0) {
        selectedVoice = voices[0];
        console.log('选择的默认语音:', selectedVoice.name);
      }
    }
    
    // 创建语音实例
    const speech = new SpeechSynthesisUtterance(text);
    console.log('创建语音实例，文本长度:', text.length);
    
    // 设置语音参数
    if (selectedVoice) {
      speech.voice = selectedVoice;
      console.log('使用语音:', selectedVoice.name);
    }
    speech.lang = 'zh-CN';
    speech.rate = 0.9; // 稍微减慢语速，使语音更自然
    speech.pitch = 1.1; // 稍微提高音调，使语音更生动
    speech.volume = 1; // 最大音量
    console.log('语音参数设置完成');
    
    // 保存语音实例
    speechInstance = speech;
    console.log('保存语音实例:', speechInstance);
    
    // 创建播放完成的Promise
    const playbackPromise = new Promise((resolve, reject) => {
      speech.onstart = () => {
        console.log('=== 语音播放开始 ===');
      };
      
      speech.onend = () => {
        isSpeaking.value = false;
        speechInstance = null;
        console.log('=== 语音播放结束 ===');
        resolve();
      };
      
      speech.onerror = (event) => {
        isSpeaking.value = false;
        speechInstance = null;
        console.error('=== 语音播放错误 ===', event);
        reject(new Error('语音播放错误'));
      };
    });
    
    // 取消之前可能的语音
    window.speechSynthesis.cancel();
    console.log('取消之前的语音');
    
    // 播放语音
    try {
      window.speechSynthesis.speak(speech);
      console.log('调用speak()方法成功');
    } catch (error) {
      console.error('调用speak()方法失败:', error);
      reject(error);
    }
    
    // 等待播放完成
    await playbackPromise;
  } else {
    console.error('浏览器不支持语音合成功能');
    throw new Error('浏览器不支持语音合成功能');
  }
  
  console.log('=== 优化的浏览器TTS完成 ===');
};

// 使用Edge TTS (优化实现)
const useEdgeTTS = async (text) => {
  console.log('=== Edge TTS 初始化 ===');
  
  // 检查Edge TTS是否可用
  if (typeof EdgeTTS !== 'function') {
    console.error('Edge TTS库未正确加载');
    throw new Error('Edge TTS库未正确加载');
  }
  console.log('Edge TTS库加载成功');
  
  try {
    // 创建Edge TTS实例
    const edgeTTS = new EdgeTTS();
    console.log('Edge TTS实例创建成功');
    
    // 配置语音参数
    const voice = 'zh-CN-XiaoxiaoNeural'; // 高质量中文语音模型
    const options = {
      text: text,
      voice: voice,
      rate: '+0%',
      pitch: '+0%'
    };
    
    console.log('使用语音模型:', voice);
    console.log('生成音频参数:', options);
    
    // 生成音频
    console.time('Edge TTS音频生成');
    console.log('开始生成音频...');
    
    // 使用不同的方式调用speak方法
    let audioData;
    try {
      // 尝试直接调用
      audioData = await edgeTTS.speak(options);
      console.log('音频生成成功，大小:', audioData.length, '字节');
    } catch (speakError) {
      console.error('直接调用speak失败:', speakError);
      // 尝试使用更简单的参数
      console.log('尝试使用更简单的参数...');
      audioData = await edgeTTS.speak(text, voice);
      console.log('简化参数调用成功，大小:', audioData.length, '字节');
    }
    
    console.timeEnd('Edge TTS音频生成');
    
    // 验证音频数据
    if (!audioData || audioData.length === 0) {
      throw new Error('生成的音频数据为空');
    }
    
    // 创建音频元素
    const blob = new Blob([audioData], { type: 'audio/mp3' });
    const url = URL.createObjectURL(blob);
    const audio = new Audio(url);
    
    console.log('音频元素创建成功，URL:', url);
    console.log('音频元素:', audio);
    
    // 保存音频实例
    speechInstance = audio;
    
    // 创建播放完成的Promise
    const playbackPromise = new Promise((resolve, reject) => {
      audio.onloadedmetadata = () => {
        console.log('音频元数据加载完成，时长:', audio.duration, '秒');
      };
      
      audio.oncanplaythrough = () => {
        console.log('音频可以播放');
      };
      
      audio.onplay = () => {
        console.log('=== Edge TTS 播放开始 ===');
      };
      
      audio.onended = () => {
        isSpeaking.value = false;
        speechInstance = null;
        console.log('=== Edge TTS 播放结束 ===');
        resolve();
      };
      
      audio.onerror = (event) => {
        isSpeaking.value = false;
        speechInstance = null;
        console.error('=== Edge TTS 播放错误 ===', event);
        reject(new Error('Edge TTS播放错误'));
      };
    });
    
    // 播放音频
    console.log('开始播放Edge TTS音频...');
    await audio.play();
    console.log('Edge TTS音频播放命令已发送');
    
    // 等待播放完成
    await playbackPromise;
    console.log('=== Edge TTS 播放完成 ===');
  } catch (error) {
    console.error('=== Edge TTS 错误 ===', error);
    console.error('错误详情:', error.message);
    console.error('错误堆栈:', error.stack);
    throw error; // 抛出错误，让调用者知道Edge TTS失败
  }
};

// 浏览器内置的语音合成作为备用
const fallbackToBrowserTTS = (text) => {
  if ('speechSynthesis' in window) {
    // 创建语音实例
    const speech = new SpeechSynthesisUtterance(text);
    
    // 保存语音实例
    speechInstance = speech;
    
    // 设置语音参数
    speech.lang = 'zh-CN'; // 使用中文
    speech.rate = 1; // 语速
    speech.pitch = 1; // 音调
    speech.volume = 1; // 音量
    
    // 设置语音结束回调
    speech.onend = () => {
      isSpeaking.value = false;
      speechInstance = null;
      console.log('Voice playback ended');
    };
    
    // 设置语音错误回调
    speech.onerror = () => {
      isSpeaking.value = false;
      speechInstance = null;
      console.error('Voice playback error');
    };
    
    // 播放语音
    window.speechSynthesis.speak(speech);
    console.log('使用浏览器内置语音合成');
  } else {
    console.log('浏览器不支持语音合成功能');
    isSpeaking.value = false;
  }
};

// 点击外部关闭聊天窗口
const handleClickOutside = (event) => {
  const chatbotContainer = document.querySelector('.chatbot-container')
  if (chatbotContainer && !chatbotContainer.contains(event.target)) {
    isOpen.value = false
  }
}

// 处理全局点击事件，停止语音播放
const handleGlobalClick = (event) => {
  // 检查是否正在播放语音
  if (isSpeaking.value) {
    // 检查点击的是否不是聊天窗口内的元素
    const chatbotContainer = document.querySelector('.chatbot-container');
    if (chatbotContainer && !chatbotContainer.contains(event.target)) {
      console.log('点击了聊天窗口外，停止语音播放...');
      stopVoice();
    }
  }
};

// 生命周期钩子
onMounted(() => {
  document.addEventListener('click', handleClickOutside);
  // 添加全局点击事件监听器
  document.addEventListener('click', handleGlobalClick);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
  // 移除全局点击事件监听器
  document.removeEventListener('click', handleGlobalClick);
});
</script>

<style scoped>
.chatbot-container {
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 99999;
  pointer-events: auto;
}

/* 聊天按钮 */
.chatbot-button {
  position: relative;
  background: var(--card-bg);
  backdrop-filter: blur(25px);
  border: 2px solid var(--border-color);
  border-radius: 50%;
  width: 70px;
  height: 70px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 
    0 10px 30px rgba(0, 0, 0, 0.4),
    0 0 20px var(--primary-glow);
  overflow: visible;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99999;
  animation: pulse 2s infinite;
}

.chatbot-button:hover {
  transform: scale(1.1);
  box-shadow: 
    0 15px 40px rgba(0, 0, 0, 0.5),
    0 0 30px var(--primary-glow);
}

.chatbot-button-inner {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.chatbot-icon {
  font-size: 24px;
  transition: transform 0.3s ease;
}

.chatbot-button:hover .chatbot-icon {
  transform: scale(1.2);
}

.chatbot-badge {
  position: absolute;
  top: -5px;
  right: -5px;
  background: linear-gradient(45deg, #ff416c, #ff4b2b);
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  font-size: 12px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: pulse 2s infinite;
}

/* 聊天窗口 */
.chatbot-window {
  position: absolute;
  bottom: 80px;
  right: 0;
  width: 380px;
  max-height: 500px;
  background: var(--card-bg);
  backdrop-filter: blur(25px);
  border: 1px solid var(--border-color);
  border-radius: 20px;
  box-shadow: 
    0 20px 60px rgba(0, 0, 0, 0.5),
    0 0 40px var(--primary-glow);
  overflow: hidden;
  animation: slideUp 0.3s ease;
}

/* 聊天头部 */
.chatbot-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background: var(--primary-glow);
  border-bottom: 1px solid var(--border-color);
}

/* 聊天头部按钮容器 */
.chatbot-header-buttons {
  display: flex;
  align-items: center;
  gap: 8px;
}

/* 停止语音按钮 */
.chatbot-stop-button {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
  padding: 6px;
  border-radius: 8px;
  transition: background-color 0.3s ease;
}

.chatbot-stop-button:hover {
  background: rgba(255, 255, 255, 0.3);
}

.chatbot-header-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.chatbot-header-icon {
  font-size: 24px;
}

.chatbot-header-info {
  flex: 1;
}

.chatbot-header-title {
  font-size: 18px;
  font-weight: bold;
  color: white;
  margin: 0 0 4px 0;
}

.chatbot-header-subtitle {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
}

.chatbot-close-button {
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  padding: 4px;
  border-radius: 8px;
  transition: background-color 0.3s ease;
}

.chatbot-close-button:hover {
  background: rgba(255, 255, 255, 0.2);
}

/* 聊天消息 */
.chatbot-messages {
  padding: 20px;
  max-height: 300px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.chatbot-message {
  display: flex;
  gap: 12px;
  animation: messageSlideIn 0.3s ease;
}

.system-message {
  justify-content: center;
  margin: 0 -20px;
  padding: 10px 20px;
  background: rgba(102, 126, 234, 0.1);
  border-radius: 12px;
}

.user-message {
  justify-content: flex-end;
}

.user-message .chatbot-message-content {
  background: var(--primary-glow);
  color: white;
  border-radius: 16px 16px 4px 16px;
}

.bot-message {
  justify-content: flex-start;
}

.bot-message .chatbot-message-content {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border-radius: 16px 16px 16px 4px;
  display: flex;
  flex-direction: column;
}

.chatbot-message-avatar {
  font-size: 18px;
  flex-shrink: 0;
}

.chatbot-message-content {
  flex: 1;
  max-width: 80%;
  padding: 12px 16px;
  line-height: 1.4;
  font-size: 14px;
  position: relative;
}

/* 语音播放按钮 */
.chatbot-voice-button {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid var(--border-color);
  border-radius: 50%;
  width: 32px;
  height: 32px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  margin-top: 8px;
  align-self: flex-end;
}

.chatbot-voice-button:hover {
  background: var(--primary-glow);
  transform: scale(1.1);
  box-shadow: 0 2px 8px var(--primary-glow);
}

/* 加载动画 */
.chatbot-loading {
  display: flex;
  gap: 6px;
}

.chatbot-loading-dot {
  width: 8px;
  height: 8px;
  background: var(--primary-glow);
  border-radius: 50%;
  animation: loadingBounce 1.4s infinite ease-in-out both;
}

.chatbot-loading-dot:nth-child(1) {
  animation-delay: -0.32s;
}

.chatbot-loading-dot:nth-child(2) {
  animation-delay: -0.16s;
}

/* 快速问题 */
.chatbot-quick-questions {
  padding: 0 20px 20px;
  border-top: 1px solid var(--border-color);
  margin-top: 10px;
}

.chatbot-quick-questions-title {
  font-size: 14px;
  font-weight: bold;
  color: rgba(255, 255, 255, 0.8);
  margin: 0 0 12px 0;
}

.chatbot-quick-questions-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.chatbot-quick-question {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 10px 14px;
  color: white;
  font-size: 13px;
  text-align: left;
  cursor: pointer;
  transition: all 0.3s ease;
}

.chatbot-quick-question:hover {
  background: var(--primary-glow);
  transform: translateX(4px);
}

/* 加载动画 */
.chatbot-loading {
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
  padding: 12px;
}

.chatbot-loading-dot {
  width: 10px;
  height: 10px;
  background: var(--primary-glow);
  border-radius: 50%;
  animation: loadingBounce 1.4s infinite ease-in-out both;
}

.chatbot-loading-dot:nth-child(1) {
  animation-delay: -0.32s;
}

.chatbot-loading-dot:nth-child(2) {
  animation-delay: -0.16s;
}

@keyframes loadingBounce {
  0%, 80%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
}

/* 聊天输入 */
.chatbot-input-container {
  display: flex;
  gap: 10px;
  padding: 16px;
  border-top: 1px solid var(--border-color);
  background: rgba(0, 0, 0, 0.2);
}

.chatbot-input {
  flex: 1;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid var(--border-color);
  border-radius: 20px;
  padding: 12px 16px;
  color: white;
  font-size: 14px;
  outline: none;
  transition: all 0.3s ease;
}

.chatbot-input::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.chatbot-input:focus {
  border-color: var(--primary-glow);
  box-shadow: 0 0 10px var(--primary-glow);
}

.chatbot-send-button {
  background: var(--primary-glow);
  border: 1px solid var(--border-color);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  color: white;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.chatbot-send-button:hover:not(:disabled) {
  transform: scale(1.1);
  box-shadow: 0 4px 15px var(--primary-glow);
}

.chatbot-send-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* 动画 */
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes messageSlideIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes loadingBounce {
  0%, 80%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(255, 65, 108, 0.7);
  }
  50% {
    transform: scale(1.1);
    box-shadow: 0 0 0 10px rgba(255, 65, 108, 0);
  }
}

/* 滚动条样式 */
.chatbot-messages::-webkit-scrollbar {
  width: 4px;
}

.chatbot-messages::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
}

.chatbot-messages::-webkit-scrollbar-thumb {
  background: var(--primary-glow);
  border-radius: 2px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .chatbot-container {
    bottom: 20px;
    right: 20px;
  }
  
  .chatbot-button {
    width: 50px;
    height: 50px;
  }
  
  .chatbot-icon {
    font-size: 20px;
  }
  
  .chatbot-window {
    width: 320px;
    max-height: 450px;
  }
  
  .chatbot-messages {
    max-height: 250px;
  }
  
  .chatbot-header {
    padding: 16px;
  }
  
  .chatbot-messages {
    padding: 16px;
  }
  
  .chatbot-input-container {
    padding: 16px;
  }
}

@media (max-width: 480px) {
  .chatbot-window {
    width: 280px;
  }
}
</style>