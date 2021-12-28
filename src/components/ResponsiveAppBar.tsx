import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import { IUser } from '../types';
import { Fab } from '@mui/material';
import PaidIcon from '@mui/icons-material/Paid';
import { connect } from 'react-redux';
import { RootState } from '../store';
import { bindActionCreators } from 'redux';
import { Creators as userActions } from "./../store/ducks/currentUser";

const settings = ['Sair'];

interface Props {
  currentUser?: IUser,
  setLogoffAction: () => void
}

const ResponsiveAppBar = ({ currentUser, setLogoffAction }: Props) => {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1 }}>
            <Typography
              variant="h6"
              noWrap
              component="div"
            >
              <Link to="/">NERD-GAMES</Link>
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Fab variant="extended" size="small" style={{ marginRight: 8 }} >
              <PaidIcon style={{ marginRight: 8 }} />
              {currentUser?.gems || 0}
            </Fab>
            <Tooltip title={currentUser?.name || ""}>
              <IconButton onClick={(e) => setAnchorElUser(e.currentTarget)} sx={{ p: 0 }}>
                <Avatar
                  alt={currentUser?.name || ""}
                  src={currentUser?.photoURL || ""}
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={() => setAnchorElUser(null)}
            >
              <MenuItem component={Link} to="/admin"
                onClick={() => {
                  setAnchorElUser(null)
                }}
              >
                <Typography textAlign="center">Admin</Typography>
              </MenuItem>
              <MenuItem onClick={() => {
                setLogoffAction()
                setAnchorElUser(null)
              }}>
                <Typography textAlign="center">Sair</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

function mapStateToProps(state: RootState) {
  return {
    currentUser: state.currentUser
  }
}

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators({
    setLogoffAction: userActions.setLogoffAction
  }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResponsiveAppBar)
