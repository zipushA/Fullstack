import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './Redux/store';
import { logout } from './Redux/slices/authSlice';
import { Avatar, Menu, MenuItem, IconButton, Tooltip, AppBar, Toolbar, Typography, Box } from '@mui/material';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

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

  return (
    <AppBar position="static" sx={{ background: '#2c3e50' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <img
            src="/logo.jpg"
            alt="Logo"
            style={{ height: 40, cursor: 'pointer' }}
            onClick={() => navigate('/')}
          />
          <Typography
            variant="h6"
            component="div"
            sx={{ cursor: 'pointer' }}
            onClick={() => navigate('/')}
          >
            מורה בלחיצת כפתור
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <Typography
            variant="button"
            sx={{ cursor: 'pointer', color: 'white' }}
            onClick={() => navigate('/Auth/about')}

          >
            אודות
          </Typography>
              <Typography
            variant="button"
            sx={{ cursor: 'pointer', color: 'white' }}
            onClick={() => navigate('/Auth/list')}

          >
            רשימת מורות
          </Typography>

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
            <MenuItem onClick={handleProfile}>פרופיל</MenuItem>
            <MenuItem onClick={handleLogout}>התנתקות</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
