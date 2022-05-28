import {Container, Divider, TextField, Typography} from '@mui/material';
import type {NextPage} from 'next';
import {createUseContextAndStateProvider} from 'utils/context';

const initialValue = {
  name: 'Bob',
  age: 20,
};
const [usePerson, Person] = createUseContextAndStateProvider(initialValue);

const PersonEdit: React.FC = () => {
  const {state, update} = usePerson();
  return (
    <>
      <Typography variant="h4">Edit</Typography>
      <TextField label="name" value={state.name} onChange={e => update(v => ({name: e.target.value, age: v.age}))} />
      <TextField
        label="age"
        type="number"
        value={state.age}
        onChange={e => update(v => ({name: v.name, age: Number(e.target.value)}))}
      />
    </>
  );
};

const PersonView: React.FC = () => {
  const {state} = usePerson();

  return (
    <>
      <Typography variant="h4">View</Typography>
      <Typography>Name：{state.name}</Typography>
      <Typography>Age：{state.age}</Typography>
    </>
  );
};

const Page: NextPage = () => {
  return (
    <Container maxWidth="xl">
      <Person>
        <PersonEdit />
        <Divider sx={{my: 2}} />
        <PersonView />
      </Person>
    </Container>
  );
};

export default Page;
