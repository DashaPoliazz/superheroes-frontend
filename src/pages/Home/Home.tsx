import { useEffect, useState } from "react";
import { Header } from "../../components/header/Header";
import { Loader } from "../../components/loader/Loader";
import { Modal } from "../../components/modal/Modal";
import { SuperheroCard } from "../../components/superheroCard/SuperheroCard";
import { useActions } from "../../hooks/useActions";
import { useAppSelector } from "../../hooks/useAppSelector";
import "./home.scoped.scss";

export const Home = () => {
  const { loadSuperheroes, toggleModal } = useActions();

  const { isModal } = useAppSelector(state => state.modal);
  const { isLoading, superheroes } = useAppSelector(state => state.superheroes);
  const { isLoading: isFileLoading } = useAppSelector(state => state.files);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  useEffect(() => {
    loadSuperheroes();
  }, []);

  useEffect(() => {
    loadSuperheroes();
  }, [isFileLoading]);

  if (isLoading) {
    return <Loader />;
  }

  const paginatedSupeheroes = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = currentPage * itemsPerPage;

    return superheroes.slice(startIndex, endIndex);
  };

  return (
    <div className="home">
      <Header />

      {isModal && <Modal />}
      <button onClick={e => toggleModal()} className="button add">
        Add new superhero
      </button>
      <div className="pagination">
        <button
          onClick={e => setCurrentPage(currentPage - 1)}
          className="button pagination__button"
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <span className="pagination__page">{currentPage}</span>
        <button
          onClick={e => setCurrentPage(currentPage + 1)}
          className="button pagination__button"
          disabled={Math.ceil(superheroes.length / itemsPerPage) <= currentPage}
        >
          Next
        </button>
      </div>
      <div className="cards">
        {superheroes.length > 0 ? (
          paginatedSupeheroes().map(superhero => (
            <SuperheroCard key={superhero._id} superHeroData={superhero} />
          ))
        ) : (
          <h1>Please, add superhero</h1>
        )}
      </div>
    </div>
  );
};
