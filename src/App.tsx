import SelectTestBase from './components/SelectTestBase';
import SelectApiTest from './components/SelectApiTest';

const App = () => {
  return (
    <div className="h-screen flex justify-center items-center flex-col gap-4">
      <h1 className="text-4xl font-bold">Select Base</h1>
      <SelectTestBase />
      <h1 className="text-4xl font-bold">Select R&M Api</h1>
      <SelectApiTest />
    </div>
  );
};

export default App;
