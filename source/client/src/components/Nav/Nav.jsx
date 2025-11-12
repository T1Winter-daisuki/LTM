import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Dropdown, Menu, message, Layout } from 'antd';
import { LogoutOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { useUserStore } from "../stores/users";
import AuthModal from '../AuthModal/AuthModal';
import styles from './Nav.module.css';

export default function Nav() {
  const navigate = useNavigate();
  const userStore = useUserStore();
  const { user } = userStore;

  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const checkResponsive = () => {
    setIsMobile(window.innerWidth < 700);
  };

  useEffect(() => {
    checkResponsive();
    window.addEventListener('resize', checkResponsive);
    return () => window.removeEventListener('resize', checkResponsive);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const logout = async () => {
    await userStore.handleLogout();
    message.success('Đăng xuất thành công!', 2);
    navigate(`/`);
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  const menuContent = !user ? (
    <Menu>
      <Menu.Item key="1">
        <AuthModal isLogin={false} />
      </Menu.Item>
      <Menu.Item key="2">
        <AuthModal isLogin={true} />
      </Menu.Item>
    </Menu>
  ) : (
    <Menu>
      <Menu.Item key="1">
        <Button type="primary" onClick={logout} icon={<LogoutOutlined />}>
          Đăng xuất
        </Button>
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout.Header style={{ width: '100%' }}>
      <div className={styles['nav-container']}>
        <div className={styles['left-content']}>
          <Link to="/" style={{ fontSize: 25 }}>ChatApp</Link>
        </div>

        <div className={styles['right-content']}>
          {!isMobile ? (
            !user ? (
              <div className={styles['menu-buttons']}>
                <AuthModal isLogin={false} />
                <AuthModal isLogin={true} />
              </div>
            ) : (
              <div className={styles['menu-buttons']}>
                <Button type="primary" onClick={logout} icon={<LogoutOutlined />}>
                  Đăng xuất
                </Button>
              </div>
            )
          ) : (
            <Dropdown overlay={menuContent} trigger={['click']}>
              <Button type="primary" onClick={toggleMenu} icon={<UnorderedListOutlined />} />
            </Dropdown>
          )}
        </div>
      </div>
    </Layout.Header>
  );
}