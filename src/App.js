
import './App.css';
import Form from './Form/Form';
import Table from './Table/Table';
function App() {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 '>
      <Form></Form>
      <Table></Table>
    </div>
  );
}

export default App;
