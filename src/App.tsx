import ButtonRow from './Components/ButtonRow';
import SelectSkip from './Components/SelectSkip';

function App() {

  return ( 
    <div className='min-h-screen bg-[#121212] text-white text-sm md:text-base'>
      <main className='max-w-7xl mx-auto px-4 py-8'>
        <ButtonRow />
        <SelectSkip />
      </main>
    </div>
  )
}

export default App
