import React from 'react';
import Chart from './pages/Chart'
import BackEndCheck from './components/BackEndCheck'
const App = () => {
    return (
        <div className='App'>
            <h1>Charts</h1>
            <div>
                <Chart />
            </div>
            <BackEndCheck />
        </div>
    );
}

export default App;