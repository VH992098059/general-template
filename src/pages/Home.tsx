/**
 * @fileoverview 首页组件
 * @description 应用的主页面，展示产品特性、技术栈和快速开始指南
 * @author 开发团队
 * @version 1.0.0
 */

import React from 'react';
import { Card, Row, Col, Button, Typography, Space } from 'antd';
import {
  RocketOutlined,
  ThunderboltOutlined,
  SafetyOutlined,
  MobileOutlined,
} from '@ant-design/icons';

const { Title, Paragraph } = Typography;

/**
 * 首页组件
 * @description 应用的主页面，包含欢迎区域、特性介绍、技术栈展示和快速开始指南
 * @example
 * ```tsx
 * <Home />
 * ```
 */
const Home: React.FC = ()=> {
  /**
   * 产品特性配置
   * @description 展示产品核心特性的配置数组
   */
  const features = [
    {
      icon: <RocketOutlined style={{ fontSize: '32px', color: '#1890ff' }} />,
      title: '快速开发',
      description: '基于React + Ant Design，提供丰富的组件库，快速构建现代化界面',
    },
    {
      icon: <ThunderboltOutlined style={{ fontSize: '32px', color: '#52c41a' }} />,
      title: '高性能',
      description: '采用最新的前端技术栈，优化打包体积，提供流畅的用户体验',
    },
    {
      icon: <SafetyOutlined style={{ fontSize: '32px', color: '#faad14' }} />,
      title: '类型安全',
      description: '完整的TypeScript支持，提供类型检查，减少运行时错误',
    },
    {
      icon: <MobileOutlined style={{ fontSize: '32px', color: '#f5222d' }} />,
      title: '响应式设计',
      description: '完美适配桌面端、平板端和移动端，提供一致的用户体验',
    },
  ];

  return (
    <div>
      {/* 欢迎区域 */}
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <Title level={1} style={{ marginBottom: '16px' }}>
          通用Web页面模板
        </Title>
        <Paragraph style={{ fontSize: '18px', color: '#666', marginBottom: '32px' }}>
          基于React + Ant Design的现代化Web应用模板
          <br />
          支持商店页面、校园活动页面等多种业务场景
        </Paragraph>
        <Space size="large">
          <Button type="primary" size="large">
            开始使用
          </Button>
          <Button size="large">
            查看文档
          </Button>
        </Space>
      </div>

      {/* 特性介绍 */}
      <Title level={2} style={{ textAlign: 'center', marginBottom: '32px' }}>
        核心特性
      </Title>
      <Row gutter={[24, 24]}>
        {features.map((feature, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <Card
              hoverable
              style={{ height: '100%', textAlign: 'center' }}
            >
              <div style={{ marginBottom: '16px' }}>
                {feature.icon}
              </div>
              <Title level={4} style={{ marginBottom: '12px' }}>
                {feature.title}
              </Title>
              <Paragraph style={{ color: '#666', marginBottom: 0 }}>
                {feature.description}
              </Paragraph>
            </Card>
          </Col>
        ))}
      </Row>

      {/* 技术栈 */}
      <div style={{ marginTop: '64px', textAlign: 'center' }}>
        <Title level={2} style={{ marginBottom: '32px' }}>
          技术栈
        </Title>
        <Row gutter={[16, 16]} justify="center">
          {[
            'React 18',
            'TypeScript',
            'Ant Design',
            'React Router',
            'Redux Toolkit',
            'Vite',
            'Bun',
            'ESLint',
          ].map((tech) => (
            <Col key={tech}>
              <Card size="small" style={{ minWidth: '120px' }}>
                <div style={{ fontWeight: 500 }}>{tech}</div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* 快速开始 */}
      <Card
        style={{
          marginTop: '64px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          border: 'none',
        }}

        
      >
        <Title level={2} style={{ color: '#fff', marginBottom: '16px' }}>
          准备开始你的项目？
        </Title>
        <Paragraph style={{ color: 'rgba(255,255,255,0.85)', fontSize: '16px', marginBottom: '32px' }}>
          使用我们的模板快速搭建你的Web应用
        </Paragraph>
        <Button type="primary" size="large" ghost>
          立即开始
        </Button>
      </Card>
    </div>
  );
};

export default Home;