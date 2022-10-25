import { Header } from "../../components/header/Header";
import { Modal } from "../../components/modal/Modal";
import { useActions } from "../../hooks/useActions";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useNavigate } from "react-router-dom";

import "./superhero.scoped.scss";
import { Loader } from "../../components/loader/Loader";
import { Editor } from "../../components/editor/Editor";
import { useState } from "react";

import { CCarousel } from "../../components/carousel/Carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export const Superhero = () => {
  const [isEditing, setIsEditing] = useState(false);
 
  const { toggleModal, removeSuperhero } = useActions();
  const navigate = useNavigate();

  const { activeSuperhero, superheroes, isLoading } = useAppSelector(
    state => state.superheroes,
  );
  const { isModal } = useAppSelector(state => state.modal);

  const currentSuperhero = superheroes.find(
    superhero => superhero._id === activeSuperhero,
  );

  if (!currentSuperhero) {
    return <h1>Please, choose your superherp</h1>
  }
  
  const removeHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (currentSuperhero?._id) {
      removeSuperhero(currentSuperhero?._id);
      navigate("/");
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      {isModal && <Modal />}
      { isEditing && (<div className="superhero__edit">
        <button onClick={e => setIsEditing(false)} className="superhero__close">X</button>
        <Editor keyToChange={'nickname'} />
        <Editor keyToChange={'real_name'} />
        <Editor keyToChange={'origin_description'} />
        <Editor keyToChange={'superpowers'} />
        <Editor keyToChange={'superpowers'} />
      </div>)
      
      }
      <Header />
      <div className="superhero">
        <h1 className="superhero__name">name</h1>
        <div className="superhero__carousel">
          <CCarousel />
        </div>
        <h2 className="superhero__title">Superhero's info:</h2>
        <div className="superhero__info">
          <div className="superhero__story">
            <p className="superhero__preface">
              Now, let's see the story of <span className="accent-text">{ currentSuperhero.nickname }</span>  which was named
              <span className="accent-text">{ currentSuperhero.real_name }</span> in his normal life.
            </p>
            <p className="superhero__description">
              <span className="accnet-text">
                {currentSuperhero.origin_description}
              </span>
            </p>
            <p className="superhero__question">
              Let's take a look at the abilities of <span className="accent-text">{currentSuperhero.nickname}</span>?
            </p>
            <br />
            <p className="superhero__abilities">
              <span className="accent-text">
                { currentSuperhero.superpowers.join(', ') }
              </span>
            </p>
          </div>
        </div>
        <div className="superhero__buttons">
          <button
            onClick={e => setIsEditing(!isEditing)}
            className="button superhero__configuire"
          >
            Configuire hero
          </button>
          <button
            onClick={e => removeHandler(e)}
            className="button superhero__remove"
          >
            Remove superhero
          </button>
        </div>
      </div>
    </>
  );
};
