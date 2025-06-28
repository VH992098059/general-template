/**
 * @fileoverview 用户登录页面
 * @description 用户登录界面，包含表单验证、记住密码、快速登录等功能
 * @author 开发团队
 * @version 1.0.0
 */

import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, message, Divider, Space } from 'antd';
import { UserOutlined, LockOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../../components/AuthLayout';
import './index.css';

/**
 * 登录表单数据接口
 * @interface LoginFormData
 */
interface LoginFormData {
  /** 用户名 */
  username: string;
  /** 密码 */
  password: string;
  /** 是否记住登录状态 */
  remember: boolean;
}

/**
 * 用户登录组件
 * @description 提供用户登录功能，包含表单验证、记住密码、快速登录等特性
 * @example
 * ```tsx
 * <Login />
 * ```
 */
const Login: React.FC = ()=> {
  /** 表单实例 */
  const [form] = Form.useForm();
  /** 登录加载状态 */
  const [loading, setLoading] = useState(false);
  /** 路由导航钩子 */
  const navigate = useNavigate();

  /**
   * 处理登录表单提交
   * @description 验证用户凭据并执行登录逻辑
   * @param {LoginFormData} values - 表单数据
   */
  const handleSubmit = async (values: LoginFormData): Promise<void> => {
    setLoading(true);
    try {
      // 模拟登录API调用
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 这里应该调用实际的登录API
      console.log('登录数据:', values);
      
      // 模拟登录成功
      if (values.username && values.password) {
        message.success('登录成功！');
        
        // 保存用户信息到localStorage（实际项目中应该使用更安全的方式）
        const userInfo = {
          username: values.username,
          token: 'mock-jwt-token',
          loginTime: new Date().toISOString(),
        };
        
        if (values.remember) {
          localStorage.setItem('userInfo', JSON.stringify(userInfo));
        } else {
          sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
        }
        
        // 跳转到首页
        navigate('/');
      } else {
        message.error('用户名或密码错误！');
      }
    } catch (error) {
      console.error('登录失败:', error);
      message.error('登录失败，请稍后重试！');
    } finally {
      setLoading(false);
    }
  };

  /**
   * 处理忘记密码点击事件
   * @description 跳转到密码重置页面
   */
  const handleForgotPassword = (): void => {
    navigate('/reset-password');
  };

  /**
   * 处理快速登录
   * @description 使用预设的演示账号快速填充登录表单
   * @param {'demo' | 'admin'} type - 账号类型
   */
  const handleQuickLogin = (type: 'demo' | 'admin'): void => {
    const credentials = {
      demo: { username: 'demo', password: 'demo123' },
      admin: { username: 'admin', password: 'admin123' }
    };
    
    form.setFieldsValue(credentials[type]);
  };

  return (
    <AuthLayout
      title="用户登录"
      subtitle="欢迎回来，请输入您的账号信息"
      loading={loading}
    >
      <Form
        form={form}
        name="login"
        onFinish={handleSubmit}
        autoComplete="off"
        size="large"
        className="login-form"
      >
        <Form.Item
          name="username"
          rules={[
            { required: true, message: '请输入用户名！' },
            { min: 3, message: '用户名至少3个字符！' },
            { max: 20, message: '用户名最多20个字符！' }
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="用户名"
            allowClear
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            { required: true, message: '请输入密码！' },
            { min: 6, message: '密码至少6个字符！' }
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="密码"
            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          />
        </Form.Item>

        <Form.Item>
          <div className="login-options">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>记住我</Checkbox>
            </Form.Item>
            <Button
              type="link"
              onClick={handleForgotPassword}
              className="forgot-password-link"
            >
              忘记密码？
            </Button>
          </div>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className="login-submit-btn"
            block
          >
            {loading ? '登录中...' : '登录'}
          </Button>
        </Form.Item>

        <Divider plain>快速登录</Divider>
        
        <Form.Item>
          <Space className="quick-login-buttons" size="middle">
            <Button
              type="default"
              onClick={() => handleQuickLogin('demo')}
              disabled={loading}
            >
              演示账号
            </Button>
            <Button
              type="default"
              onClick={() => handleQuickLogin('admin')}
              disabled={loading}
            >
              管理员
            </Button>
          </Space>
        </Form.Item>

        <Divider plain>还没有账号？</Divider>
        
        <Form.Item>
          <div className="register-link">
            <span>还没有账号？</span>
            <Link to="/register" className="register-btn">
              立即注册
            </Link>
          </div>
        </Form.Item>
      </Form>
    </AuthLayout>
  );
};

export default Login;