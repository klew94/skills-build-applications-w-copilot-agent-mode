import { Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <div className="container py-4">
      <header className="mb-4">
        <h1 className="display-5">OctoFit Tracker</h1>
        <p className="lead">Modern multi-tier fitness tracking with React, Express, and MongoDB.</p>
      </header>

      <nav>
        <Link to="/" className="me-3">Home</Link>
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
    </div>
  );
}

function Home() {
  return (
    <div>
      <h2>Welcome to OctoFit Tracker</h2>
      <p>Use this app to build user profiles, log workouts, and track teams.</p>
    </div>
  );
}

export default App;
