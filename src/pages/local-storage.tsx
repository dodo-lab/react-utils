import {Box, Button, Container, TextField} from '@mui/material';
import {useLocalStorage} from 'hooks/useLocalStorage';
import type {NextPage} from 'next';

const initialValue = 'initial name';

const Page: NextPage = () => {
  const [name, setName] = useLocalStorage('name', initialValue);

  return (
    <Container maxWidth="xl">
      <Box sx={{mt: 2}}>
        <TextField label="name" value={name} onChange={e => setName(e.target.value)} />
        <Button variant="contained" onClick={() => setName(initialValue)}>
          CLEAR
        </Button>
      </Box>
    </Container>
  );
};

export default Page;
