import React from "react";
import "./AboutMe.css";
import student from "../../images/student.png";

const AboutMe = () => {
  return (
    <section id={"student"} className="about-me page__about-me">
      <h2 className="about-me__title">Студент</h2>
      <div className="about-me__description">
        <div className="about-me__info">
          <h3 className="about-me__name">Александр</h3>
          <p className="about-me__subtitle">Фронтенд-разработчик, 22 года</p>
          <p className="about-me__text">
            Люблю создавать что-то новое. Меня интересует дизайн и
            проектирование интерфейсов, мне нравится сразу видеть результат
            своей работы. Меня волнует то, как будет выглядеть конечный продукт,
            но при этом, мне хочется сильно влиять на проект и разрабатывать
            функциональность. Помимо всего прочего, я хочу находиться ближе к
            пользователю. Именно по этим причинам мною был выбран Front-end.
            Люблю смотреть сериалы С большим увлечением смотрю travel-blog
            Антона Птушкина, в обозримом будущем тоже хочу начать
            путешествовать.
          </p>
          <ul className="about-me__social-links">
            <li className="about-me__social-item">
              <a
                href="https://www.linkedin.com/in/aldolzhenko/"
                className="about-me__social-link hover-link"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
            </li>
            <li className="about-me__social-item">
              <a
                href="https://github.com/alraskalov"
                className="about-me__social-link hover-link"
                target="_blank"
                rel="noreferrer"
              >
                Github
              </a>
            </li>
          </ul>
        </div>

        <img src={student} alt="Student" className="about-me__photo-student" />
      </div>
    </section>
  );
};

export default AboutMe;
