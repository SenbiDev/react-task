import React, { useEffect, useState } from 'react';
import { Avatar, Dropdown, Switch } from 'antd';
import { UserOutlined, LogoutOutlined, MailOutlined, CrownOutlined, EditOutlined, IdcardOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/authContext';
import { useProfileStore } from '../store/useProfileStore';

export default function Navbar() {
  const {user, logout} = useAuth();
  const navigate = useNavigate();
  const {avatarUrl, theme, setTheme} = useProfileStore();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const handleThemeChange = (checked) => {
    setTheme(checked ? "dark" : "light");
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case "admin":
        return <CrownOutlined style={{ color: 'gold' }}/>;
      default:
        return <UserOutlined style={{ color: 'blue' }}/>;
    }
  };
  
  const handleLogOut = () => {
    logout();
    navigate("/login")
  }

  const items = [
    {
      key: "profile",
      label: <span>Profile</span>,
      icon: <IdcardOutlined/>,
      onClick: () => navigate("/profile")
    },
    {
      key: "email",
      label: <span>{user?.email}</span>,
      icon: <MailOutlined style={{ color: 'blue' }}/>,
    },
    {
      key: "role",
      label: <span className="capitalze">{user?.role}</span>,
      icon: getRoleIcon(user?.role),
    },
    ...(user?.role === "admin"
      ? [
        {
          key: "adminpage",
          label: <span>Tag & Kategori</span>,
          icon: <EditOutlined style={{ color: "green" }}/>,
          onClick: () => navigate("/admin")
        },
      ]
    :[]),
    {
      key: "theme", 
      label: (
        <div className='flex items-center justify-between'>
          <Switch
            checked={theme === "dark"}
            onChange={handleThemeChange}
            checkedChildren={"\u{1F319}"}
            unCheckedChildren={"\u2600"}
          />
        </div>
      ),
    },
    {
      type:"divider",
    },
    {
      key: "logout",
      label : <span style={{ color: 'red', font: 'bold'}}>Logout</span>,
      icon: <LogoutOutlined style={{ color: 'red' }}/>,
      onClick: handleLogOut,
    },
  ];

  return (
    <nav className="flex justify-between bg-gray-800 p-4">
      <div className="container mx-auto flex space-x-4">
        <Link to="/" className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium">
          Home
        </Link>
        <Link to="/about" className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium">
          About
        </Link>
        <Link to="/artikel" className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium">
          Artikel_API
        </Link>
      </div>
      <div>
        {user && (
          <Dropdown menu={{items}} placement='bottomRight' trigger={["click"]}>
            <div className="flex gap-2">
              <Avatar 
                size={40}
                src={avatarUrl||null}
                icon={!avatarUrl&&<UserOutlined/>}
                style={{ backgroundColor: 'white', color: 'black' }}
              />
              <p className="flex items-center text-sm font-medium">{user.username}</p>
            </div>
          </Dropdown>
        )}
      </div>
    </nav>
  );
}