import React, { useState } from 'react';
import { Button } from '@nextui-org/react';

const APITest: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string>('');

  // 测试1: 直接使用完整URL（绕过代理）
  const testDirectAPI = async () => {
    setIsLoading(true);
    setResult('');
    console.log('🧪 测试1: 直接调用完整URL');
    
    try {
      const response = await fetch('https://advx25api.erledge.com/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          conversation_id: '',
          query: '测试连接'
        })
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body!.getReader();
      const decoder = new TextDecoder();
      let content = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value, { stream: true });
        content += chunk;
        console.log('Received chunk:', chunk);
      }

      setResult(`✅ 直接API调用成功!\n${content}`);
    } catch (error) {
      console.error('直接API调用失败:', error);
      setResult(`❌ 直接API调用失败: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  // 测试2: 使用代理路径
  const testProxyAPI = async () => {
    setIsLoading(true);
    setResult('');
    console.log('🧪 测试2: 使用代理路径');
    
    try {
      const response = await fetch('/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          conversation_id: '',
          query: '测试代理连接'
        })
      });

      console.log('Proxy response status:', response.status);
      console.log('Proxy response headers:', response.headers);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body!.getReader();
      const decoder = new TextDecoder();
      let content = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value, { stream: true });
        content += chunk;
        console.log('Received proxy chunk:', chunk);
      }

      setResult(`✅ 代理API调用成功!\n${content}`);
    } catch (error) {
      console.error('代理API调用失败:', error);
      setResult(`❌ 代理API调用失败: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  // 测试3: 使用CORS代理服务
  const testCORSProxy = async () => {
    setIsLoading(true);
    setResult('');
    console.log('🧪 测试3: 使用CORS代理服务');
    
    try {
      const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
      const targetUrl = 'https://advx25api.erledge.com/chat';
      
      const response = await fetch(proxyUrl + targetUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
        body: JSON.stringify({
          conversation_id: '',
          query: '测试CORS代理连接'
        })
      });

      console.log('CORS Proxy response status:', response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body!.getReader();
      const decoder = new TextDecoder();
      let content = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value, { stream: true });
        content += chunk;
        console.log('Received CORS proxy chunk:', chunk);
      }

      setResult(`✅ CORS代理调用成功!\n${content}`);
    } catch (error) {
      console.error('CORS代理调用失败:', error);
      setResult(`❌ CORS代理调用失败: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  // 测试4: 简单的fetch测试
  const testSimpleFetch = async () => {
    setIsLoading(true);
    setResult('');
    console.log('🧪 测试4: 简单fetch测试');
    
    try {
      // 先测试GET请求到一个公开API
      console.log('测试网络连接...');
      const testResponse = await fetch('https://httpbin.org/get');
      console.log('网络连接正常:', testResponse.status);

      // 然后测试目标API
      console.log('测试目标API...');
      const response = await fetch('https://advx25api.erledge.com/chat', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          conversation_id: '',
          query: '简单测试'
        })
      });

      console.log('目标API响应状态:', response.status);
      
      // 转换headers为普通对象
      const headers: { [key: string]: string } = {};
      response.headers.forEach((value, key) => {
        headers[key] = value;
      });
      
      console.log('响应头:', headers);
      setResult(`Response status: ${response.status}\nHeaders: ${JSON.stringify(headers, null, 2)}`);
    } catch (error) {
      console.error('简单fetch测试失败:', error);
      setResult(`❌ 简单fetch测试失败: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">API 调用测试</h2>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Button
          onClick={testDirectAPI}
          disabled={isLoading}
          className="bg-blue-500 text-white"
        >
          测试1: 直接调用API
        </Button>
        
        <Button
          onClick={testProxyAPI}
          disabled={isLoading}
          className="bg-green-500 text-white"
        >
          测试2: 代理调用
        </Button>
        
        <Button
          onClick={testCORSProxy}
          disabled={isLoading}
          className="bg-purple-500 text-white"
        >
          测试3: CORS代理
        </Button>
        
        <Button
          onClick={testSimpleFetch}
          disabled={isLoading}
          className="bg-orange-500 text-white"
        >
          测试4: 简单Fetch
        </Button>
      </div>

      {isLoading && (
        <div className="mb-4 p-4 bg-blue-50 rounded-lg">
          <p className="text-blue-700">🔄 正在测试API调用...</p>
        </div>
      )}

      {result && (
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="font-bold mb-2">测试结果:</h3>
          <pre className="whitespace-pre-wrap text-sm">{result}</pre>
        </div>
      )}

      <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
        <h3 className="font-bold mb-2">🔍 调试信息:</h3>
        <p className="text-sm text-gray-600">
          • 请打开浏览器开发者工具的Console和Network标签页查看详细日志<br/>
          • 测试1: 尝试直接调用API（会遇到CORS问题）<br/>
          • 测试2: 使用React代理（需要重启开发服务器生效）<br/>
          • 测试3: 使用公共CORS代理服务<br/>
          • 测试4: 测试基本网络连接和API响应
        </p>
      </div>
    </div>
  );
};

export default APITest;