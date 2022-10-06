/* Задания на урок:

1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.

2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки

3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)

4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
"Добавляем любимый фильм"

5) Фильмы должны быть отсортированы по алфавиту */

'use strict';

document.addEventListener("DOMContentLoaded", () => {
    const movieDB = {
        movies: []
    };

         const adv = document.querySelectorAll(".promo__adv img"),
            poster = document.querySelector(".promo__bg"),
            genre = poster.querySelector(".promo__genre"),
            movieList = document.querySelector(".promo__interactive-list"),
            inputForm = document.querySelector("form.add"),
            addInput = inputForm.querySelector(".adding__input"),
            checkbox = inputForm.querySelector("[type='checkbox']"),
            tabs = document.querySelectorAll(".promo__menu-item"),
            tabsParent = document.querySelector(".promo__menu-list");
    
        inputForm.addEventListener("submit", (event) => {
            event.preventDefault();
    
            let newFilm = addInput.value;
            const favorite = checkbox.checked;
            if (newFilm) {
    
                if (newFilm.length > 21) {
                    newFilm = `${newFilm.substring(0, 22)}...`;
                }
    
                if (favorite) {
                    console.log("Добавлен любимый фильм");
                }
    
                movieDB.movies.push(newFilm);
                sortArr(movieDB.movies);
                createMovieList(movieDB.movies, movieList);
                event.target.reset();
            }
        });

        tabsParent.addEventListener("click", event => {
            event.preventDefault();
            const target = event.target;

            if (target && target.classList.contains("promo__menu-item")) {
                tabs.forEach( (item, i) => {
                    if (item == target) {
                        makeTabInactive();
                        makeTabActive(i);
                    }
                }); 
            }
        });

        function makeTabInactive() {
            tabs.forEach(item => {
                item.classList.remove("promo__menu-item_active");
            });

        }

        function makeTabActive(i = 0) {
            tabs[i].classList.add("promo__menu-item_active");

        }
    
        const createMovieList = function (films, parent) {
            parent.innerHTML = "";
            sortArr(films);

            const obj = {
                name: films,
            };
    
            films.forEach((film, i) => {
    
                movieList.innerHTML += `
                <li class="promo__interactive-item">${i + 1}. ${film}
                    <div class="delete"></div>
                </li>`;
            });
    
            document.querySelectorAll(".delete").forEach( (btn, i) => {
                btn.addEventListener("click", () => {
                    btn.parentElement.remove();
                    movieDB.movies.splice(i, 1);
                    createMovieList(films, parent);
                });
            });
            fetch("http://localhost:3000/movies", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(obj)
            });
        };
    
    
        const deleteAdv = (arr) => {
            adv.forEach(item => {
                item.remove();
            });
        };
    
        const makeChanges = () => {
            genre.textContent = "драма";
            poster.style.backgroundImage = "url('img/bg.jpg')";
        };
    
        const sortArr = (arr) => {
            arr.sort();
        };
    
    
        createMovieList(movieDB.movies, movieList);
        deleteAdv(adv);
        makeChanges();
        makeTabInactive();
});

