import { Header } from "../../components/header/Header";
import { Modal } from "../../components/modal/Modal";
import { useActions } from "../../hooks/useActions";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useNavigate } from "react-router-dom";

import "./superhero.scoped.scss";
import { Loader } from "../../components/loader/Loader";
import { Editor } from "../../components/editor/Editor";
import React, { useState } from "react";

import { CCarousel } from "../../components/carousel/Carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export const Superhero = () => {
  const [isEditing, setIsEditing] = useState(false);
 
  const { toggleModal, removeSuperhero, setCurrentImage, removeCurrentImage } = useActions();
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

  const onChangeHandler = (e: any) => {
    console.log(e.target.files[0]);

    if (currentSuperhero._id && e.target.files[0]) {
      setCurrentImage({
        imageToSet: e.target.files[0],
        superheroId: currentSuperhero._id,
      });
    }
  };

  const onRemoveImageHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!currentSuperhero.currentImage?.public_id) {
      return;
    }

    const currentImageIndex = currentSuperhero.Images.indexOf(currentSuperhero.currentImage);

    const preparedSuperhero = {
      ...currentSuperhero,
      currentImage: currentSuperhero.Images[currentImageIndex - 1] || {},
      Images: currentSuperhero.Images.filter(image => image.public_id !== currentSuperhero.currentImage?.public_id)
    }

    removeCurrentImage({
      imagePublicId: currentSuperhero.currentImage?.public_id,
      superheroToUpdate: preparedSuperhero
    })
  }

  if (isLoading) {
    return <Loader />;
  }

  console.log(currentSuperhero.superpowers)

  return (
    <section className="superhero-section">
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
        <h1 className="superhero__name">{currentSuperhero.nickname}</h1>
        <div className="superhero__file-manager">
          <div className="file-input">
            <label className="file-input__label">
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="upload"
                className="svg-inline--fa fa-upload fa-w-16"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"
                />
              </svg>
              <span>Upload file</span>
              <input
                onChange={e => onChangeHandler(e)}
                type="file"
                name="file-input"
                id="file-input"
                className="file-input__input"
              />
            </label>
          </div>
          <button onClick={e => onRemoveImageHandler(e)} className="button">Remove image</button>
        </div>
        <div className="superhero__carousel">
          <CCarousel />
        </div>
        <h2 className="superhero__title">Superhero's info:</h2>
        <div className="superhero__info">
          <div className="superhero__story">
            <p className="superhero__preface">
              Now, let's see the story of <span className="accent-text">{ currentSuperhero.nickname }</span>  which was named 
               <span className="accent-text">{' ' + currentSuperhero.real_name }</span> in his normal life.
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
                { currentSuperhero.superpowers }
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
    </section>
  );
};
