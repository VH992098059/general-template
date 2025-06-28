import React from 'react';
import { Typography, Card, Row, Col, Tag, Button } from 'antd';
import { ShoppingCartOutlined, EyeOutlined, StarOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;
const { Meta } = Card;

const Products: React.FC = () => {
  const products = [
    {
      id: 1,
      title: '通用Web模板',
      description: '基于React + Ant Design的通用Web页面模板，支持多种业务场景。',
      price: '¥299',
      image: 'https://via.placeholder.com/300x200?text=Web+Template',
      tags: ['React', 'TypeScript', 'Ant Design'],
      rating: 4.8,
    },
    {
      id: 2,
      title: '电商解决方案',
      description: '完整的电商平台解决方案，包含商品管理、订单处理、用户系统等。',
      price: '¥1999',
      image: 'https://via.placeholder.com/300x200?text=E-commerce',
      tags: ['电商', '全栈', 'Node.js'],
      rating: 4.9,
    },
    {
      id: 3,
      title: '企业管理系统',
      description: '适用于中小企业的管理系统模板，包含权限管理、数据统计等功能。',
      price: '¥1599',
      image: 'https://via.placeholder.com/300x200?text=Management+System',
      tags: ['管理系统', 'Dashboard', 'Charts'],
      rating: 4.7,
    },
  ];

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      <Title level={1} style={{ textAlign: 'center', marginBottom: '48px' }}>
        产品中心
      </Title>
      
      <Paragraph style={{ textAlign: 'center', fontSize: '16px', marginBottom: '48px' }}>
        我们提供多种高质量的Web解决方案，满足不同业务需求
      </Paragraph>
      
      <Row gutter={[24, 24]}>
        {products.map((product) => (
          <Col xs={24} sm={12} lg={8} key={product.id}>
            <Card
              hoverable
              style={{ height: '100%' }}
              cover={
                <img
                  alt={product.title}
                  src={product.image}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
              }
              actions={[
                <EyeOutlined key="view" />,
                <ShoppingCartOutlined key="cart" />,
                <StarOutlined key="favorite" />,
              ]}
            >
              <Meta
                title={
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>{product.title}</span>
                    <span style={{ color: '#f5222d', fontWeight: 'bold' }}>{product.price}</span>
                  </div>
                }
                description={
                  <div>
                    <Paragraph ellipsis={{ rows: 2 }} style={{ marginBottom: '12px' }}>
                      {product.description}
                    </Paragraph>
                    <div style={{ marginBottom: '12px' }}>
                      {product.tags.map((tag) => (
                        <Tag key={tag} color="blue" style={{ marginBottom: '4px' }}>
                          {tag}
                        </Tag>
                      ))}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span>
                        <StarOutlined style={{ color: '#faad14' }} /> {product.rating}
                      </span>
                      <Button type="primary" size="small">
                        查看详情
                      </Button>
                    </div>
                  </div>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Products;