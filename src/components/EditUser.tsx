import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';
import { httpClient } from '../HttpClient';

interface EditUserProps {
  user: { id: string, firstName: string; lastName: string; username: string; email: string; createdTimestamp: string };
  onClose: () => void;
}

const EditUser: React.FC<EditUserProps> = ({ user, onClose }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);

  const save = async () => {
    try {
      const response = await httpClient.put(`/users/${user.id}`, {
        firstName,
        lastName,
        email
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>Edit User</DialogTitle>
      <DialogContent>
        <TextField
          label="First Name"
          defaultValue={user.firstName}
          onChange={(e) => setFirstName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Last Name"
          defaultValue={user.lastName}
          onChange={(e) => setLastName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Username"
          defaultValue={user.username}
          fullWidth
          margin="normal"
          disabled
        />
        <TextField
          label="Email"
          defaultValue={user.email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={save} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditUser