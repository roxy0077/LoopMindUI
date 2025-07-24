#!/usr/bin/env node

const https = require('https');
const http = require('http');

console.log('🧪 开始API测试...\n');

// 模拟技能测评数据
const mockAnswers = [
  {
    "questionId": 1,
    "question": "哪种活动最能让你感到充实感和成就感？",
    "selectedOption": "A: 帮助别人解决问题"
  },
  {
    "questionId": 2, 
    "question": "如果你可以选择一种方式度过一个自由的下午，你会选择？",
    "selectedOption": "B: 写下你的想法或创作点子"
  },
  {
    "questionId": 3,
    "question": "朋友最常因为哪种事情来请教你？",
    "selectedOption": "A: 心理支持或情感建议"
  }
];

// 格式化查询文本
const formatQuery = (answers) => {
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
};

// API调用函数
const callAPI = (query) => {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({
      conversation_id: '',
      query: query
    });

    const options = {
      hostname: 'advx25api.erledge.com',
      port: 443,
      path: '/chat',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
        'User-Agent': 'Node.js API Test Client',
        'Accept': 'text/event-stream'
      }
    };

    console.log('📤 发送请求到:', `https://${options.hostname}${options.path}`);
    console.log('📦 请求头:', options.headers);
    console.log('📄 请求体长度:', postData.length, '字符');
    console.log('📄 查询内容预览:', query.substring(0, 100) + '...\n');

    const req = https.request(options, (res) => {
      console.log('📡 响应状态:', res.statusCode);
      console.log('📡 响应头:', res.headers);
      console.log('📡 内容类型:', res.headers['content-type']);
      console.log('\n=== 开始接收流式数据 ===');

      let fullContent = '';
      let conversationId = '';

      res.setEncoding('utf8');
      
      let buffer = '';
      
      res.on('data', (chunk) => {
        console.log('📥 接收数据块:', chunk.length, '字符');
        
        // 将新数据添加到缓冲区
        buffer += chunk;
        
        // 按行处理数据
        const lines = buffer.split('\n');
        buffer = lines.pop() || ''; // 保留不完整的行
        
        for (const line of lines) {
          const trimmedLine = line.trim();
          
          if (trimmedLine.startsWith('data: ')) {
            const data = trimmedLine.substring(6);
            if (data && data !== '[DONE]') {
              fullContent += data;
              process.stdout.write('💬 '); // 实时进度指示
            }
          } else if (trimmedLine.startsWith('END_')) {
            conversationId = trimmedLine.substring(4);
            console.log('\n🎯 获取到conversation_id:', conversationId);
          }
        }
      });

      res.on('end', () => {
        console.log('\n=== 数据接收完成 ===');
        console.log('📊 总内容长度:', fullContent.length, '字符');
        console.log('🆔 Conversation ID:', conversationId);
        
        resolve({
          success: true,
          content: fullContent,
          conversationId: conversationId,
          statusCode: res.statusCode
        });
      });
    });

    req.on('error', (error) => {
      console.error('❌ 请求错误:', error.message);
      console.error('🔍 错误详情:', error);
      reject(error);
    });

    req.on('timeout', () => {
      console.error('⏰ 请求超时');
      req.destroy();
      reject(new Error('Request timeout'));
    });

    // 设置超时时间
    req.setTimeout(30000);

    // 发送请求体
    req.write(postData);
    req.end();
  });
};

// 主测试函数
async function testAPI() {
  try {
    console.log('🚀 开始API调用测试...\n');
    
    const query = formatQuery(mockAnswers);
    const result = await callAPI(query);
    
    if (result.success) {
      console.log('\n' + '='.repeat(60));
      console.log('✅ API调用成功！');
      console.log('📊 状态码:', result.statusCode);
      console.log('🆔 会话ID:', result.conversationId);
      console.log('='.repeat(60));
      console.log('🤖 AI分析结果:');
      console.log('='.repeat(60));
      console.log(result.content);
      console.log('='.repeat(60));
      console.log('✅ 测试完成！');
    } else {
      console.log('❌ API调用返回了错误结果');
    }
    
  } catch (error) {
    console.error('\n' + '='.repeat(60));
    console.error('❌ API调用失败:', error.message);
    console.error('🔍 错误类型:', error.constructor.name);
    console.error('🔍 错误代码:', error.code);
    console.error('='.repeat(60));
    
    if (error.code === 'ENOTFOUND') {
      console.error('💡 可能的原因: DNS解析失败，请检查网络连接');
    } else if (error.code === 'ECONNREFUSED') {
      console.error('💡 可能的原因: 服务器拒绝连接，请检查API地址');
    } else if (error.code === 'ETIMEDOUT') {
      console.error('💡 可能的原因: 连接超时，请检查网络或服务器状态');
    }
  }
}

// 运行测试
if (require.main === module) {
  testAPI();
}

module.exports = { testAPI, formatQuery };