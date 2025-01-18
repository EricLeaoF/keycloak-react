import { Card } from 'primereact/card';
import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import { httpClient } from '../HttpClient';
import EditUser from '../components/EditUser';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';

interface User {
  id: string,
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  createdTimestamp: string;
}

const AccessPage = () => {
  const [rows, setRows] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    }
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
    '&:hover': {
      backgroundColor: '#e0e0e0',
      cursor: 'pointer'
    }
  }));

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await httpClient.get('/users');
      console.log(response);
      setRows(response.data);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSuccess = () => {
    setOpen(true);
    setSelectedUser(null);
    setOpenEditModal(false);
    fetchUsers();
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleRowClick = (user: User) => {
    setSelectedUser(user);
    setOpenEditModal(true);
  }

  const handleCloseModal = () => {
    setSelectedUser(null);
    setOpenEditModal(false);
  }

  return (
    <div className='grid'>
      <Snackbar
        open={open}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Data saved successfully
        </Alert>
      </Snackbar>
      <Card>
        <Button variant="contained" style={{ display: 'flex', marginLeft: 'auto' }} >New user</Button>        
        <p style={{ wordBreak: 'break-all', color: 'black' }} id='infoPanel'>
          Users
        </p>
        <br />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>First name</StyledTableCell>
                <StyledTableCell align="left">Last name</StyledTableCell>
                <StyledTableCell align="left">Username</StyledTableCell>
                <StyledTableCell align="left">Email</StyledTableCell>
                <StyledTableCell align="left">Created at</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} style={{ textAlign: 'center' }}>
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : (
                rows.map((row) => (
                  <StyledTableRow onClick={() => handleRowClick(row)} key={row.firstName}>
                    <StyledTableCell component="th" scope="row">
                      {row.firstName}
                    </StyledTableCell>
                    <StyledTableCell align="left">{row.lastName}</StyledTableCell>
                    <StyledTableCell align="left">{row.username}</StyledTableCell>
                    <StyledTableCell align="left">{row.email}</StyledTableCell>
                    <StyledTableCell align="left">{row.createdTimestamp}</StyledTableCell>
                  </StyledTableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {openEditModal && selectedUser && (
        <EditUser user={selectedUser} onCloseSucess={handleSuccess} onCloseCancel={handleCloseModal} />
      )}
    </div>
  );
}

export default AccessPage;
