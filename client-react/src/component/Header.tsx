

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './Redux/store';
import { logout } from './Redux/slices/authSlice';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Tooltip
} from '@mui/material';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const role=sessionStorage.getItem('userType')
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    handleMenuClose();
  };

  const handleProfile = () => {
    navigate('/Auth/profile');
    handleMenuClose();
  };

  const handleEdit = () => {
    navigate('/Auth/edit');
    handleMenuClose();
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#333' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        {/* לוגו */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <img
            src="/logo.jpg"
            alt="לוגו"
            style={{ height: 40, cursor: 'pointer', borderRadius: '50%' }}
            onClick={() => navigate('/')}
          />
          <Typography
            variant="h6"
            sx={{ color: '#40bebe', cursor: 'pointer' }}
            onClick={() => navigate('/')}
          >
          TEACHטק
          </Typography>
        </Box>

        {/* קישורים ממורכזים */}
        <Box sx={{
          display: 'flex',
          flexGrow: 1,
          justifyContent: 'center',
          gap: 4
        }}>
          {[
            { label: 'אודות', path: '/Auth/about' },
            ...(role === 'principal' ? [{ label: 'רשימת מורות', path: '/Auth/list' }] : []),
            { label: 'פרופיל', path: '/Auth/profile' },
            { label: 'עריכת פרופיל', path: '/Auth/edit' }
          ].map(link => (
            <Typography
              key={link.path}
              variant="button"
              sx={{
                cursor: 'pointer',
                color: '#eee',
                fontWeight: 500,
                transition: 'color 0.3s',
                '&:hover': { color: '#40bebe' }
              }}
              onClick={() => navigate(link.path)}
            >
              {link.label}
            </Typography>
          ))}
        </Box>

        {/* פרופיל */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title="אפשרויות">
            <IconButton onClick={handleAvatarClick} sx={{ p: 0 }}>
              <Avatar>{user?.name?.[0] || '?'}</Avatar>
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <MenuItem onClick={handleProfile} sx={{ color: '#333' }}>פרופיל</MenuItem>
            <MenuItem onClick={handleEdit} sx={{ color: '#333' }}>עריכת פרופיל</MenuItem>
            <MenuItem onClick={handleLogout} sx={{ color: '#333' }}>התנתקות</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
