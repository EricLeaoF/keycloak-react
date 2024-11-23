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
import { httpClient } from '../HttpClient';

interface User {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  createdTimestamp: string;
}

const AccessPage = () => {
  const [rows, setRows] = useState<User[]>([]);
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await httpClient.get('/users');
        console.log(response);
        setRows(response.data); // Atualiza o estado com os dados
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      }
    };
    
    fetchUsers(); // Chama a função para fazer a requisição
  }, []); 

  function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
  ) {
    return { name, calories, fat, carbs, protein };
  }

  return (
    <div className='grid'>
      <Card className=''>
        <p style={{ wordBreak: 'break-all', color: 'black' }} id='infoPanel'>
          Users
        </p>
        <br></br>
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
              {rows.map((row) => (
                <StyledTableRow key={row.firstName}>
                  <StyledTableCell component="th" scope="row">
                    {row.firstName}
                  </StyledTableCell>
                  <StyledTableCell align="left">{row.lastName}</StyledTableCell>
                  <StyledTableCell align="left">{row.username}</StyledTableCell>
                  <StyledTableCell align="left">{row.email}</StyledTableCell>
                  <StyledTableCell align="left">{row.createdTimestamp}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
  </div>
  )
}

export default AccessPage