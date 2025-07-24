interface ChatRequest {
  conversation_id: string;
  query: string;
}

interface ChatResponse {
  success: boolean;
  content: string;
  conversation_id: string;
  error?: string;
}

// 尝试多种方法解决CORS问题
const API_ENDPOINTS = {
  // 方法1: 使用代理（需要重启开发服务器）
  proxy: '',
  // 方法2: 直接调用（会有CORS问题）
  direct: 'https://advx25api.erledge.com',
  // 方法3: 使用CORS代理
  corsProxy: 'https://cors-anywhere.herokuapp.com/https://advx25api.erledge.com'
};

export class ChatAPIService {
  private static instance: ChatAPIService;

  static getInstance(): ChatAPIService {
    if (!ChatAPIService.instance) {
      ChatAPIService.instance = new ChatAPIService();
    }
    return ChatAPIService.instance;
  }

  async sendMessage(query: string, conversationId: string = ''): Promise<ChatResponse> {
    // 尝试多种方法调用API
    const methods = [
      { name: '代理调用', url: `${API_ENDPOINTS.proxy}/chat` },
      { name: '直接调用', url: `${API_ENDPOINTS.direct}/chat` },
      { name: 'CORS代理', url: `${API_ENDPOINTS.corsProxy}/chat` }
    ];

    for (const method of methods) {
      try {
        console.log(`🚀 尝试${method.name}...`);
        console.log('📤 请求地址:', method.url);
        console.log('📤 查询内容:', query.substring(0, 100) + '...');
        
        const headers: HeadersInit = {
          'Content-Type': 'application/json',
          'Accept': 'text/event-stream',
          'Cache-Control': 'no-cache',
        };

        // 为CORS代理添加额外头
        if (method.name === 'CORS代理') {
          headers['X-Requested-With'] = 'XMLHttpRequest';
          headers['Origin'] = window.location.origin;
        }

        // 添加超时控制
        const controller = new AbortController();
        const timeoutId = setTimeout(() => {
          controller.abort();
          console.log('⏰ 请求超时，将尝试下一种方法');
        }, 30000); // 30秒超时

        const response = await fetch(method.url, {
          method: 'POST',
          headers,
          mode: method.name === 'CORS代理' ? 'cors' : undefined,
          cache: 'no-cache',
          signal: controller.signal,
          body: JSON.stringify({
            conversation_id: conversationId,
            query: query
          } as ChatRequest)
        });

        clearTimeout(timeoutId); // 清除超时定时器

        console.log(`📡 ${method.name}响应状态:`, response.status);
        console.log(`📡 内容类型:`, response.headers.get('content-type'));
        console.log(`📡 传输编码:`, response.headers.get('transfer-encoding'));
        console.log(`📡 缓存控制:`, response.headers.get('cache-control'));

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        if (!response.body) {
          throw new Error('Response body is null');
        }

        console.log(`✅ ${method.name}成功！开始处理流式响应...`);
        return await this.handleStreamResponse(response);
        
      } catch (error) {
        console.error(`❌ ${method.name}失败:`, error);
        
        // 如果不是最后一个方法，继续尝试
        if (method !== methods[methods.length - 1]) {
          console.log('🔄 尝试下一种方法...');
          continue;
        }
        
        // 所有方法都失败
        return {
          success: false,
          content: '',
          conversation_id: '',
          error: error instanceof Error ? error.message : 'Unknown error'
        };
      }
    }

    // 这里不会进入，但TypeScript需要
    return {
      success: false,
      content: '',
      conversation_id: '',
      error: 'All methods failed'
    };
  }

  private async handleStreamResponse(response: Response): Promise<ChatResponse> {
    const reader = response.body!.getReader();
    const decoder = new TextDecoder();
    
    let content = '';
    let conversationId = '';
    let buffer = '';
    let isStreamComplete = false;
    let chunkCount = 0;

    console.log('📡 开始接收流式数据...');

    try {
      while (true) {
        const { done, value } = await reader.read();
        
        if (done) {
          console.log('🏁 数据流结束，共接收', chunkCount, '个数据块');
          break;
        }

        chunkCount++;
        // 解码新数据并添加到缓冲区
        const chunk = decoder.decode(value, { stream: true });
        buffer += chunk;
        console.log(`📥 数据块 #${chunkCount}:`, chunk.length, '字符');
        console.log(`📋 数据块内容:`, JSON.stringify(chunk.substring(0, 200)));
        
        // 按行处理数据
        const lines = buffer.split('\n');
        buffer = lines.pop() || ''; // 保留不完整的行

        for (const line of lines) {
          const trimmedLine = line.trim();
          
          if (trimmedLine.startsWith('data: ')) {
            const data = trimmedLine.substring(6); // 移除 "data: " 前缀
            
            if (data === '[DONE]') {
              console.log('🏁 接收到 [DONE] 标记，数据传输完成');
              isStreamComplete = true;
            } else if (data) {
              content += data;
              console.log('💬 接收内容:', data.length, '字符 -', data.substring(0, 50) + '...');
            }
          } else if (trimmedLine.startsWith('END_')) {
            conversationId = trimmedLine.substring(4); // 移除 "END_" 前缀
            console.log('🎯 获取到conversation_id:', conversationId);
            isStreamComplete = true;
          } else if (trimmedLine && trimmedLine !== '') {
            console.log('🔍 未处理的行:', JSON.stringify(trimmedLine));
          }
        }

        // 如果接收到结束标记，继续读取直到数据流真正结束
        if (isStreamComplete) {
          console.log('🔄 检测到结束标记，继续读取剩余数据...');
        }
      }

      // 处理缓冲区中剩余的数据
      if (buffer.trim()) {
        console.log('📋 处理缓冲区剩余数据:', JSON.stringify(buffer.trim()));
        
        const remainingLines = buffer.trim().split('\n');
        for (const line of remainingLines) {
          const trimmedLine = line.trim();
          if (trimmedLine.startsWith('data: ')) {
            const data = trimmedLine.substring(6);
            if (data && data !== '[DONE]') {
              content += data;
              console.log('💬 从缓冲区添加内容:', data.length, '字符');
            }
          } else if (trimmedLine.startsWith('END_')) {
            conversationId = trimmedLine.substring(4);
            console.log('🎯 从缓冲区获取conversation_id:', conversationId);
          }
        }
      }

      // 输出完整结果
      console.log('\n' + '='.repeat(80));
      console.log('🤖 完整AI分析结果 (总长度: ' + content.length + ' 字符)');
      console.log('='.repeat(80));
      
      if (content.length > 0) {
        console.log(content);
      } else {
        console.log('⚠️ 没有接收到内容，可能是流式响应被提前结束');
      }
      
      console.log('='.repeat(80));
      console.log('🆔 Conversation ID:', conversationId || '未获取到');
      console.log('📋 数据流状态:', isStreamComplete ? '完成' : '未完成');
      console.log('✅ 分析完成！\n');

      return {
        success: true,
        content: content.trim(),
        conversation_id: conversationId
      };

    } catch (error) {
      console.error('❌ 流式数据处理失败:', error);
      console.error('已接收的内容长度:', content.length, '字符');
      console.error('部分内容:', content.substring(0, 500));
      throw error;
    } finally {
      reader.releaseLock();
    }
  }

  // 格式化技能测评数据为AI分析查询
  formatSkillAssessmentQuery(answers: any[]): string {
    const answersText = JSON.stringify(answers, null, 2);
    
    return `请分析以下技能测评结果，并提供详细的个人能力评估和商业化建议：

=== 技能测评数据 ===
${answersText}

=== 分析要求 ===
请基于以上测评结果，提供以下分析：

1. **个人技能画像**
   - 主要技能特点和优势
   - 性格和工作偏好总结

2. **市场机会分析**
   - 基于技能的市场需求评估
   - 潜在的商业化方向

3. **变现方法建议**
   - 短期可实施的变现方式
   - 长期发展建议

4. **具体行动计划**
   - 近期可执行的3-5个具体步骤
   - 每个步骤的预期时间和资源需求

请以结构化的方式组织回答，便于理解和执行。`;
  }
}

export default ChatAPIService;