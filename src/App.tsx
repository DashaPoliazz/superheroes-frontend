import { useAppSelector } from "./hooks/useAppSelector";

import { Routes, Route } from "react-router-dom";

import "./styles/app.scss";
import { Home } from "./pages/Home/Home";
import { Superhero } from "./pages/Superhero/Superhero";
import { Modal } from "./components/modal/Modal";
import { Loader } from "./components/loader/Loader";

function App() {
  const { isModal } = useAppSelector(state => state.modal);
  const { isLoading } = useAppSelector(state => state.superheroes);

  return (
    <div className="container">
      {isModal && <Modal />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/superhero" element={<Superhero />} />
      </Routes>
    </div>
  );
}

export default App;
