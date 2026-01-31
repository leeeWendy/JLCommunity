from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import pyttsx3
import io
import wave
import os

app = Flask(__name__)
CORS(app)  # 允许跨域请求

# 初始化TTS引擎
print("正在初始化TTS引擎...")
tts_engine = pyttsx3.init()
print("TTS引擎初始化完成")

# 获取可用的语音
voices = tts_engine.getProperty('voices')
print(f"可用语音数量: {len(voices)}")
for i, voice in enumerate(voices):
    print(f"{i}: {voice.name}")

@app.route('/api/tts', methods=['POST'])
def generate_tts():
    try:
        data = request.json
        text = data.get('text', '')
        voice_id = data.get('voice_id', 0)  # 默认使用第一个可用语音
        
        if not text:
            return jsonify({"error": "Text is required"}), 400
        
        print(f"生成TTS: {text} (voice_id: {voice_id})")
        
        # 设置语音
        if 0 <= voice_id < len(voices):
            tts_engine.setProperty('voice', voices[voice_id].id)
            print(f"使用语音: {voices[voice_id].name}")
        else:
            print("无效的语音ID，使用默认语音")
        
        # 设置语音参数
        tts_engine.setProperty('rate', 150)  # 语速
        tts_engine.setProperty('volume', 1.0)  # 音量
        
        # 创建音频文件
        audio_buffer = io.BytesIO()
        
        # 保存音频到内存
        def save_audio():
            # 使用临时文件
            temp_file = 'temp_output.wav'
            
            # 确保之前的临时文件被删除
            if os.path.exists(temp_file):
                os.remove(temp_file)
            
            # 保存到文件并运行
            tts_engine.save_to_file(text, temp_file)
            tts_engine.runAndWait()
            
            # 检查临时文件是否存在
            if not os.path.exists(temp_file):
                raise Exception("临时音频文件未创建")
            
            # 检查文件大小
            file_size = os.path.getsize(temp_file)
            if file_size == 0:
                raise Exception("生成的音频文件为空")
            
            print(f"临时音频文件大小: {file_size} 字节")
            
            # 读取临时文件到内存
            with open(temp_file, 'rb') as f:
                audio_data = f.read()
                print(f"读取到的音频数据大小: {len(audio_data)} 字节")
                # 验证数据
                if len(audio_data) == 0:
                    raise Exception("读取到的音频数据为空")
                # 写入到缓冲区
                audio_buffer.write(audio_data)
            
            # 删除临时文件
            if os.path.exists(temp_file):
                os.remove(temp_file)
        
        save_audio()
        audio_buffer.seek(0)
        
        # 检查内存中的音频数据大小
        audio_size = len(audio_buffer.getvalue())
        if audio_size == 0:
            raise Exception("内存中的音频数据为空")
        
        print(f"音频生成完成，大小: {audio_size} 字节")
        
        # 设置正确的响应头
        from flask import send_file, make_response
        response = make_response(audio_buffer.getvalue())
        response.headers['Content-Type'] = 'audio/wav'
        response.headers['Content-Disposition'] = 'inline; filename=tts_output.wav'
        response.headers['Content-Length'] = str(audio_size)
        
        return response
        
    except Exception as e:
        print(f"错误: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route('/api/voices', methods=['GET'])
def get_voices():
    try:
        voice_list = []
        for i, voice in enumerate(voices):
            voice_list.append({
                "id": i,
                "name": voice.name
            })
        return jsonify({"voices": voice_list})
    except Exception as e:
        print(f"错误: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({"status": "ok", "message": "TTS service is running"})

if __name__ == '__main__':
    print("启动TTS服务...")
    app.run(host='0.0.0.0', port=5001, debug=False)
