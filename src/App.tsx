import SelectTestBase from './components/SelectTestBase';
import SelectApiTest from './components/SelectApiTest';

const App = () => {
  return (
    <div className="h-screen flex justify-center items-center flex-col gap-4">
      <h1 className="text-4xl font-bold">Select Base</h1>
      <div className="max-w-96">
        <SelectTestBase />
      </div>
      <h1 className="text-4xl font-bold">Select R&M Api</h1>
      <div className="max-w-96">
        <SelectApiTest />
      </div>
    </div>
  );
};

export default App;
