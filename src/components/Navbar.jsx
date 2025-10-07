import React from 'react';
import { Avatar, Dropdown } from 'antd';
import { UserOutlined, LogoutOutlined, MailOutlined, CrownOutlined, EditOutlined, IdcardOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/authContext';
import { Crown } from 'lucide-react';

export default function Navbar() {
  const {user, logout} = useAuth();
  const navigate = useNavigate();

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
      label: <span className='text-black'>Profile</span>,
      icon: <IdcardOutlined/>,
      onClick: () => navigate("profile")
    },
    {
      key: "email",
      label: <span className="text-black">{user?.email}</span>,
      icon: <MailOutlined style={{ color: 'blue' }}/>,
    },
    {
      key: "role",
      label: <span className="text-black capitalze">{user?.role}</span>,
      icon: getRoleIcon(user?.role),
    },
    ...(user?.role === "admin"
      ? [
        {
          key: "adminpage",
          label: <span className="text-black">Tag & Kategori</span>,
          icon: <EditOutlined style={{ color: "green" }}/>,
          onClick: () => navigate("/admin")
        },
      ]
    :[]),
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
            <div className="flex flex-column gap-2">
              <Avatar style={{ backgroundColor: 'white', color: 'black' }} icon={<UserOutlined/>}
              />
              <p className="flex items-center text-white text-sm font-medium">{user.username}</p>
            </div>
          </Dropdown>
        )}
      </div>
    </nav>
  );
}