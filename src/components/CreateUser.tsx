import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';
import { httpClient } from '../HttpClient';

interface CreateUserProps {
  onCloseCancel: () => void;
  onCloseSucess: () => void;
}

const CreateUser: React.FC<CreateUserProps> = ({ onCloseCancel, onCloseSucess }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [ username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const save = async () => {
    try {
      // const response = await httpClient.put(`/users/${user.id}`, {
      //   firstName,
      //   lastName,
      //   email
      // });
      // console.log(response);
      onCloseSucess();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Dialog open onClose={onCloseCancel}>
      <DialogTitle>Create User</DialogTitle>
      <DialogContent>
        <TextField
          label="First Name"
          value={firstName}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setFirstName(event.target.value);
          }}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Last Name"
          value={lastName}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setLastName(event.target.value);
          }}          fullWidth
          margin="normal"
        />
        <TextField
          label="Username"
          value={username}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setUsername(event.target.value);
          }}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          value={email}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setEmail(event.target.value);
          }}
          fullWidth
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onCloseCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={save} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateUser