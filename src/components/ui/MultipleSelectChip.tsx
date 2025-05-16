import React, { useEffect, useState } from 'react';
import {
  Autocomplete, Box, Chip, TextField, CircularProgress,
} from '@mui/material';
import { getUsers } from '../../services/admin';
import type { fetchedUserType } from '../../types';
import { useAuth } from '../../contexts/AuthContext'; 

export default function MultipleSelectChipAutocomplete({ setAssignees }: { setAssignees: React.Dispatch<React.SetStateAction<fetchedUserType[]>> }) {
  const { isLoading: authLoading } = useAuth(); 
  const [users, setUsers] = useState<fetchedUserType[]>([]);
  // const [selectedUsers, setSelectedUsers] = useState<fetchedUserType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading) { 
      const fetchUsers = async () => {
        try {
          const data: fetchedUserType[] = await getUsers();
          setUsers(data);
          setLoading(false);
        } catch (err) {
          setError((err as Error).message);
          setLoading(false);
        }
      };

      fetchUsers();
    }
  }, [authLoading]);

  const memberOptions = users.filter((user) => user.role === 'member');

  const handleChange = (
    event: React.SyntheticEvent,
    newValue: fetchedUserType[]
  ) => {
    setAssignees(newValue);
    console.log('Selected Users:', newValue);
  };

  return (
    <Box sx={{ width: 400, m: 1 }}>
      <Autocomplete
        multiple
        options={memberOptions}
        getOptionLabel={(option) => option.username}
        // value={selectedUsers}
        onChange={handleChange}
        filterSelectedOptions
        disableCloseOnSelect
        clearOnBlur={false}
        isOptionEqualToValue={(option, value) => option._id === value._id}
        loading={loading}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => {
            const { key, ...tagProps } = getTagProps({ index });
            return (
              <Chip
                key={option._id}
                label={option.username}
                {...tagProps}
              />
            );
          })
        }
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label="Assignees"
            placeholder="Select or type name"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading && <CircularProgress size={20} />}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />
      {error && <Box sx={{ color: 'red', mt: 1 }}>{error}</Box>}
    </Box>
  );
}
