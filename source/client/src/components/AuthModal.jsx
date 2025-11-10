import { useState } from 'react';
import { Button, Modal, Form, Input, Spin, Row, Col, Typography, message } from 'antd';
import { UserOutlined, LockOutlined, IdcardOutlined, UserAddOutlined, LoginOutlined } from '@ant-design/icons';
import { useUserStore } from '../components/stores/users';
import styles from './AuthModal.module.css';

export default function AuthModal({ isLogin }) {
  const [visible, setVisible] = useState(false);
  const userStore = useUserStore();
  const { errorMessage, loading, user } = userStore; // Zustand state

  const [userCredentials, setUserCredentials] = useState({
    full_name: '',
    username: '',
    password: '',
    re_password: '',
  });

  const showModal = () => setVisible(true);

  const clearUserCredentialsInput = () => {
    setUserCredentials({ full_name: '', username: '', password: '', re_password: '' });
    userStore.clearErrorMessage();
  };

  const handleOk = async () => {
    if (isLogin) {
      await userStore.handleLogin({
        username: userCredentials.username,
        password: userCredentials.password,
      });
    } else {
      await userStore.handleSignup(userCredentials);
    }

    if (user) {
      clearUserCredentialsInput();
      setVisible(false);
      message.success(user.status + ' thành công!', 3);
    }
  };

  const handleCancel = () => {
    clearUserCredentialsInput();
    setVisible(false);
  };

  const title = isLogin ? 'Đăng nhập' : 'Đăng ký';

  return (
    <div>
      <Button type="primary" onClick={showModal} className={styles.bttn}>
        {!isLogin ? <UserAddOutlined /> : <LoginOutlined />}
        {title}
      </Button>
      <Modal
        className={styles.modal}
        open={visible}
        title={title}
        onOk={handleOk}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Thoát
          </Button>,
          <Button key="submit" type="primary" loading={loading} disabled={loading} onClick={handleOk}>
            {isLogin ? 'Đăng nhập' : 'Đăng ký'}
          </Button>,
        ]}
      >
        {!loading ? (
          <div className={styles.inputContainer}>
            <Form layout="vertical">
              {!isLogin && (
                <Row>
                  <Col span={24}>
                    <Form.Item
                      label="Họ và tên"
                      name="full_name"
                      rules={[{ required: true, message: 'Hãy nhập họ và tên!' }]}
                    >
                      <Input
                        value={userCredentials.full_name}
                        onChange={(e) => setUserCredentials({ ...userCredentials, full_name: e.target.value })}
                        prefix={<IdcardOutlined />}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              )}

              <Row>
                <Col span={24}>
                  <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Hãy nhập username!' }]}
                  >
                    <Input
                      value={userCredentials.username}
                      onChange={(e) => setUserCredentials({ ...userCredentials, username: e.target.value })}
                      prefix={<UserOutlined />}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col span={24}>
                  <Form.Item
                    label="Mật khẩu"
                    name="password"
                    rules={[{ required: true, message: 'Hãy nhập mật khẩu!' }]}
                  >
                    <Input.Password
                      value={userCredentials.password}
                      onChange={(e) => setUserCredentials({ ...userCredentials, password: e.target.value })}
                      prefix={<LockOutlined />}
                    />
                  </Form.Item>
                </Col>
              </Row>

              {!isLogin && (
                <Row>
                  <Col span={24}>
                    <Form.Item
                      label="Xác nhận"
                      name="re_password"
                      rules={[{ required: true, message: 'Hãy nhập mật khẩu!' }]}
                    >
                      <Input.Password
                        value={userCredentials.re_password}
                        onChange={(e) => setUserCredentials({ ...userCredentials, re_password: e.target.value })}
                        prefix={<LockOutlined />}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              )}

              {errorMessage && (
                <Row>
                  <Typography.Text type="danger" style={{ width: '100%', textAlign: 'center' }}>
                    {errorMessage}
                  </Typography.Text>
                </Row>
              )}
            </Form>
          </div>
        ) : (
          <div className={styles.spinner}>
            <Spin />
          </div>
        )}
      </Modal>
    </div>
  );
}