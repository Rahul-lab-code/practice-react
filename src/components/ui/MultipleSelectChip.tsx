import React, { useEffect, useState } from 'react';
import {
  Autocomplete,
  Box,
  Chip,
  TextField,
  CircularProgress,
  Typography,
} from '@mui/material';
import { getUsers } from '../../services/admin';
import type { fetchedUserType } from '../../types';
import { useAuth } from '../../contexts/AuthContext';

interface Props {
  setAssignees: React.Dispatch<React.SetStateAction<fetchedUserType[]>>;
}

export default function MultipleSelectChipAutocomplete({ setAssignees }: Props) {
  const { isLoading: authLoading } = useAuth();
  const [users, setUsers] = useState<fetchedUserType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading) {
      fetchUsers();
    }
  }, [authLoading]);

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch users';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const memberOptions = users.filter((user) => user.role === 'member');

  const handleChange = (_: React.SyntheticEvent, newValue: fetchedUserType[]) => {
    setAssignees(newValue);
  };

  if (authLoading) {
    return (
      <Box sx={{ width: 400, m: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress size={24} />
      </Box>
    );
  }

  return (
    <Box sx={{ width: 400, m: 1 }}>
      <Autocomplete
        multiple
        options={memberOptions}
        getOptionLabel={(option) => option.username}
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
      {error && (
        <Typography color="error" variant="body2" sx={{ mt: 1 }}>
          {error}
        </Typography>
      )}
    </Box>
  );
}
