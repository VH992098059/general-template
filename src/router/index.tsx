/**
 * @fileoverview 路由配置文件
 * @description 定义应用的路由结构，包括路由守卫、懒加载、布局包装等功能
 * @author 开发团队
 * @version 1.0.0
 */

import React, { Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Spin } from 'antd';
import Layout from '../components/Home/Layout';
import type { MenuProps } from 'antd';

/**
 * 懒加载页面组件
 * @description 使用React.lazy实现代码分割，提高应用性能
 */
const Home = React.lazy(() => import('../pages/Home'));
const About = React.lazy(() => import('../pages/About'));
const Products = React.lazy(() => import('../pages/Products'));
const Activities = React.lazy(() => import('../pages/Activities'));
const NotFound = React.lazy(() => import('../pages/NotFound'));
const Login = React.lazy(() => import('../pages/Login'));
const Register = React.lazy(() => import('../pages/Register'));
const ResetPassword = React.lazy(() => import('../pages/Auth/ResetPassword'));

/**
 * 加载中组件
 * @description 在懒加载组件加载过程中显示的loading界面

 */
const LoadingComponent: React.FC = ()=> (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '200px' 
  }}>
    <Spin size="large" tip="页面加载中..." />
  </div>
);

/**
 * 路由守卫组件属性接口
 * @interface RouteGuardProps
 */
interface RouteGuardProps {
  /** 子组件 */
  children: React.ReactNode;
  /** 是否需要身份验证 */
  requireAuth?: boolean;
}

/**
 * 路由守卫组件
 * @description 用于控制页面访问权限，可以根据用户认证状态决定是否允许访问
 * @param {RouteGuardProps} props - 组件属性
 * @example
 * ```tsx
 * <RouteGuard requireAuth={true}>
 *   <ProtectedPage />
 * </RouteGuard>
 * ```
 */
const RouteGuard: React.FC<RouteGuardProps> = ({ children, requireAuth = false })=> {
  // 这里可以添加认证逻辑
  // const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  
  // 暂时不实现认证逻辑，直接返回子组件
  if (requireAuth) {
    // 如果需要认证但未登录，可以重定向到登录页
    // if (!isAuthenticated) {
    //   return <Navigate to="/login" replace />;
    // }
  }
  
  return <>{children}</>;
};

/**
 * 布局包装组件属性接口
 * @interface LayoutWrapperProps
 */
interface LayoutWrapperProps {
  /** 子组件 */
  children: React.ReactNode;
}

/**
 * 带布局的页面包装组件
 * @description 为页面提供统一的布局结构，包括头部导航、底部信息等
 * @param {LayoutWrapperProps} props - 组件属性
 */
const LayoutWrapper: React.FC<LayoutWrapperProps> = ({ children }) => {
  /**
   * 导航菜单项配置
   * @description 定义头部导航菜单的结构和内容
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
   * 用户状态
   * @description 模拟用户登录状态，后续可以从Redux或Context获取
   */
  const [user, setUser] = React.useState<{ name: string; avatar?: string } | undefined>(undefined);

  /**
   * 处理用户登出
   * @description 清除用户登录状态
   */
  const handleLogout = (): void => {
    setUser(undefined);
  };

  /**
   * 处理菜单点击事件
   * @description 处理导航菜单的点击事件，路由跳转在Layout组件内部处理
   * @param {string} key - 菜单项的key值
   */
  const handleMenuClick = (key: string): void => {
    console.log('Menu clicked:', key);
  };

  return (
    <Layout
      headerProps={{
        title: '通用模板',
        menuItems,
        user,
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
      {children}
    </Layout>
  );
};

/**
 * 应用路由配置
 * @description 使用React Router创建的浏览器路由配置，包含所有页面路由
 * @exports router
 */
export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <LayoutWrapper>
        <Suspense fallback={<LoadingComponent />}>
          <RouteGuard>
            <Home />
          </RouteGuard>
        </Suspense>
      </LayoutWrapper>
    ),
  },
  {
    path: '/home',
    element: <Navigate to="/" replace />,
  },
  {
    path: '/products',
    element: (
      <LayoutWrapper>
        <Suspense fallback={<LoadingComponent />}>
          <RouteGuard>
            <Products />
          </RouteGuard>
        </Suspense>
      </LayoutWrapper>
    ),
  },
  {
    path: '/activities',
    element: (
      <LayoutWrapper>
        <Suspense fallback={<LoadingComponent />}>
          <RouteGuard>
            <Activities />
          </RouteGuard>
        </Suspense>
      </LayoutWrapper>
    ),
  },
  {
    path: '/about',
    element: (
      <LayoutWrapper>
        <Suspense fallback={<LoadingComponent />}>
          <RouteGuard>
            <About />
          </RouteGuard>
        </Suspense>
      </LayoutWrapper>
    ),
  },
  // 认证相关页面（不使用主布局）
  {
    path: '/login',
    element: (
      <Suspense fallback={<LoadingComponent />}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: '/register',
    element: (
      <Suspense fallback={<LoadingComponent />}>
        <Register />
      </Suspense>
    ),
  },
  {
    path: '/reset-password',
    element: (
      <Suspense fallback={<LoadingComponent />}>
        <ResetPassword />
      </Suspense>
    ),
  },
  // 404页面
  {
    path: '/404',
    element: (
      <LayoutWrapper>
        <Suspense fallback={<LoadingComponent />}>
          <NotFound />
        </Suspense>
      </LayoutWrapper>
    ),
  },
  // 捕获所有未匹配的路由
  {
    path: '*',
    element: <Navigate to="/404" replace />,
  },
]);

export default router;