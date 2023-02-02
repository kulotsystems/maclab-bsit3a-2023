import { useState } from 'react';
import { Lab } from './components/Lab';

function App() {
    const [count, setCount] = useState(0);

    return (
        <div className="App">
            <Lab/>
        </div>
    )
}

export default App;
