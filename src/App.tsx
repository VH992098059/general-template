
/**
 * @fileoverview 应用程序主组件
 * @description 这是整个应用的根组件，负责配置全局状态、国际化设置和主要布局
 * @author 开发团队
 * @version 1.0.0
 */
import React, { useState } from 'react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import Layout from './components/Home/Layout';
import Home from './pages/Home';
import type { MenuProps } from 'antd';
import './App.css';

function App() {
  /**
   * 用户状态管理
   * @description 存储当前登录用户的信息，包括用户名和头像
   */
  const [user, setUser] = useState<{ name: string; avatar?: string } | undefined>(undefined);

  /**
   * 导航菜单配置
   * @description 定义顶部导航栏的菜单项
   */
  const menuItems: MenuProps['items'] = [
    {
      key: 'home',
      label: '首页',
    },
    {
      key: 'products',
      label: '产品',
    },
    {
      key: 'activities',
      label: '活动',
    },
    {
      key: 'about',
      label: '关于',
    },
  ];

  /**
   * 处理用户登录
   * @description 模拟用户登录过程，设置用户信息
   */
  const handleLogin = (): void => {
    // 模拟登录，实际项目中应该调用登录API
    setUser({
      name: '用户名',
      avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=1',
    });
  };

  /**
   * 处理用户登出
   * @description 清除用户登录状态
   */
  const handleLogout = (): void => {
    setUser(undefined);
  };

  /**
   * 处理菜单点击事件
   * @param {string} key - 被点击的菜单项的key
   * @description 处理顶部导航菜单的点击事件，可以在此添加路由跳转逻辑
   */
  const handleMenuClick = (key: string): void => {
    console.log('Menu clicked:', key);
    // TODO: 添加路由跳转逻辑
  };

  return (
    <ConfigProvider locale={zhCN}>
      <Layout
        headerProps={{
          title: '通用模板',
          menuItems,
          user,
          onLogin: handleLogin,
          onLogout: handleLogout,
          onMenuClick: handleMenuClick,
        }}
        footerProps={{
          companyName: '通用模板',
          contactInfo: {
            email: 'contact@example.com',
            phone: '+86 123-4567-8900',
            address: '北京市朝阳区示例大厦',
          },
          socialLinks: [
            {
              type: 'github',
              url: 'https://github.com',
              title: 'GitHub',
            },
          ],
        }}
      >
        <Home />
      </Layout>
    </ConfigProvider>
  );
}

export default App;
