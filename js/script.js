/* ==========================================================
   BODY LOADING STATE
========================================================== */

document.body.classList.add('loading');



/* ==========================================================
   PROJECT DATA
========================================================== */

/*
    Para adicionar projeto novo:

    1. Copie um objeto.
    2. Altere textos.
    3. Coloque o repositório.
    4. Coloque a URL publicada em demoUrl.
    5. Se quiser screenshot real:
       image: "./img/nome-da-imagem.png"

    Se image ficar vazio,
    o site cria um visual automaticamente.
*/

const PROJECTS = [

    {
        number: '01',

        category:
            'WEB / SYSTEM',

        titleEn:
            'Room Reservation System',

        titlePt:
            'Sistema de Reservas de Salas',

        descriptionEn:
            'A room reservation system developed for Centro Universitário Facid, created to organize and manage room bookings through a practical web application.',

        descriptionPt:
            'Sistema de reservas de salas desenvolvido para o Centro Universitário Facid, criado para organizar e gerenciar reservas por meio de uma aplicação web.',

        tags: [
            'Python',
            'SQL',
            'Django'
        ],

        repoUrl:
            'https://github.com/carusovictor/Sistema-de-Reservas',

        demoUrl:
            '',

        image:
            './img/facid.jpg'
    }

];



/* ==========================================================
   ELEMENTS
========================================================== */

const html =
    document.documentElement;


const loader =
    document.getElementById(
        'loader'
    );


const loaderPercent =
    document.getElementById(
        'loaderPercent'
    );


const loaderStatus =
    document.getElementById(
        'loaderStatus'
    );


const loaderProgressBar =
    document.getElementById(
        'loaderProgressBar'
    );


const languageButton =
    document.getElementById(
        'languageButton'
    );


const menuButton =
    document.getElementById(
        'menuButton'
    );


const mobileNav =
    document.getElementById(
        'mobileNav'
    );


const projectsList =
    document.getElementById(
        'projectsList'
    );


const projectDialog =
    document.getElementById(
        'projectDialog'
    );


const dialogTitle =
    document.getElementById(
        'dialogTitle'
    );


const dialogContent =
    document.getElementById(
        'dialogContent'
    );


const closeDialog =
    document.getElementById(
        'closeDialog'
    );



/* ==========================================================
   CURRENT LANGUAGE
========================================================== */

function getCurrentLanguage() {

    return (
        html.dataset.lang ||
        'en'
    );

}



/* ==========================================================
   LANGUAGE TRANSLATION
========================================================== */

function translatePage(lang) {

    html.dataset.lang =
        lang;


    html.lang =
        lang === 'pt'
            ? 'pt-BR'
            : 'en';


    document
        .querySelectorAll(
            '[data-en][data-pt]'
        )
        .forEach(
            element => {

                element.textContent =
                    lang === 'pt'
                        ? element.dataset.pt
                        : element.dataset.en;

            }
        );


    languageButton.textContent =
        lang === 'en'
            ? 'PT'
            : 'EN';


    languageButton.setAttribute(

        'aria-label',

        lang === 'en'
            ? 'Mudar para português'
            : 'Switch to English'

    );


    renderProjects();

}



/* ==========================================================
   LANGUAGE BUTTON
========================================================== */

languageButton.addEventListener(

    'click',

    () => {

        const newLanguage =

            getCurrentLanguage()
            === 'en'

                ? 'pt'
                : 'en';


        localStorage.setItem(
            'portfolio-language',
            newLanguage
        );


        translatePage(
            newLanguage
        );

    }

);



/* ==========================================================
   PROJECT FALLBACK VISUAL
========================================================== */

function createProjectFallback(
    project,
    title
) {

    return `

        <div class="project-placeholder">

            <span>
                ${project.category}
            </span>

            <strong>
                ${title}
            </strong>

        </div>

    `;

}



/* ==========================================================
   RENDER PROJECTS
========================================================== */

function renderProjects() {

    const language =
        getCurrentLanguage();


    projectsList.innerHTML =
        PROJECTS
            .map(
                project => {


                    const title =

                        language === 'pt'
                            ? project.titlePt
                            : project.titleEn;


                    const description =

                        language === 'pt'
                            ? project.descriptionPt
                            : project.descriptionEn;


                    const visual =

                        project.image

                            ? `

                                <img
                                    src="${project.image}"
                                    alt="${title}"
                                    loading="lazy"
                                >

                              `

                            : createProjectFallback(
                                project,
                                title
                              );


                    const previewText =

                        language === 'pt'
                            ? 'VER PRÉVIA'
                            : 'LIVE PREVIEW';


                    const sourceText =

                        language === 'pt'
                            ? 'CÓDIGO-FONTE'
                            : 'SOURCE CODE';


                    return `

                        <article class="project">


                            <div class="project-number">

                                ${project.number}

                            </div>



                            <div class="project-visual">

                                ${visual}

                            </div>



                            <div class="project-info">


                                <div>

                                    <span class="project-meta">

                                        ${project.category}

                                    </span>


                                    <h3>

                                        ${title}

                                    </h3>


                                    <p>

                                        ${description}

                                    </p>


                                    <div class="project-tags">

                                        ${
                                            project.tags
                                                .map(
                                                    tag =>
                                                        `<span>${tag}</span>`
                                                )
                                                .join('')
                                        }

                                    </div>

                                </div>



                                <div class="project-actions">


                                    <a
                                        class="project-button source"
                                        href="${project.repoUrl}"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >

                                        ${sourceText} ↗

                                    </a>


                                    <button
                                        class="project-button preview-trigger"
                                        type="button"
                                        data-project="${project.number}"
                                    >

                                        ${previewText}

                                    </button>


                                </div>

                            </div>

                        </article>

                    `;

                }
            )
            .join('');



    document
        .querySelectorAll(
            '.preview-trigger'
        )
        .forEach(
            button => {

                button.addEventListener(

                    'click',

                    () => {

                        openProjectPreview(
                            button.dataset.project
                        );

                    }

                );

            }
        );

}



/* ==========================================================
   PROJECT PREVIEW
========================================================== */

function openProjectPreview(
    projectNumber
) {

    const project =
        PROJECTS.find(
            item =>
                item.number
                === projectNumber
        );


    if (!project) {
        return;
    }


    const language =
        getCurrentLanguage();


    const title =

        language === 'pt'
            ? project.titlePt
            : project.titleEn;


    dialogTitle.textContent =
        title;



    if (project.demoUrl) {

        dialogContent.innerHTML = `

            <iframe
                src="${project.demoUrl}"
                title="${title}"
                loading="lazy"
            ></iframe>

        `;

    }

    else {

        dialogContent.innerHTML = `

            <div class="preview-unavailable">

                <div>

                    <span>
                        STATUS / OFFLINE
                    </span>

                    <h3>

                        ${
                            language === 'pt'

                                ? 'Este projeto ainda não possui uma versão publicada.'

                                : 'This project does not have a live version yet.'
                        }

                    </h3>

                </div>

            </div>

        `;

    }


    projectDialog.showModal();

}



/* ==========================================================
   CLOSE DIALOG
========================================================== */

closeDialog.addEventListener(

    'click',

    () => {

        projectDialog.close();

    }

);



projectDialog.addEventListener(

    'click',

    event => {

        if (
            event.target
            === projectDialog
        ) {

            projectDialog.close();

        }

    }

);



projectDialog.addEventListener(

    'close',

    () => {

        dialogContent.innerHTML =
            '';

    }

);



/* ==========================================================
   MOBILE MENU
========================================================== */

menuButton.addEventListener(

    'click',

    () => {

        const isOpen =

            menuButton.getAttribute(
                'aria-expanded'
            )
            === 'true';


        menuButton.setAttribute(

            'aria-expanded',

            String(!isOpen)

        );


        mobileNav.hidden =
            isOpen;

    }

);



document
    .querySelectorAll(
        '.mobile-nav a'
    )
    .forEach(
        link => {

            link.addEventListener(

                'click',

                () => {

                    mobileNav.hidden =
                        true;


                    menuButton.setAttribute(

                        'aria-expanded',

                        'false'

                    );

                }

            );

        }
    );



/* ==========================================================
   YEAR
========================================================== */

document
    .getElementById(
        'year'
    )
    .textContent =
        new Date()
            .getFullYear();



/* ==========================================================
   INITIAL LANGUAGE
========================================================== */

/*
    Inglês é o padrão.

    Português só aparece automaticamente
    se o usuário já tiver escolhido PT antes.
*/

const savedLanguage =
    localStorage.getItem(
        'portfolio-language'
    );


translatePage(

    savedLanguage === 'pt'
        ? 'pt'
        : 'en'

);



/* ==========================================================
   LOADING SCREEN
========================================================== */

let loadingValue =
    0;


const loadingMessages = [

    {
        max: 20,
        text:
            'INITIALIZING PORTFOLIO'
    },

    {
        max: 45,
        text:
            'CHECKING FLIGHT SYSTEMS'
    },

    {
        max: 70,
        text:
            'LOADING PROJECT DATA'
    },

    {
        max: 90,
        text:
            'FINAL APPROACH'
    },

    {
        max: 100,
        text:
            'LANDING'
    }

];



function updateLoadingMessage(
    value
) {

    const message =

        loadingMessages.find(
            item =>
                value <= item.max
        );


    if (message) {

        loaderStatus.textContent =
            message.text;

    }

}



/*
    A barra não depende somente
    da internet.

    Isso garante que a animação
    tenha tempo de acontecer.
*/

const loadingInterval =
    setInterval(

        () => {

            const increment =

                loadingValue < 70
                    ? Math.random() * 5
                    : Math.random() * 2.5;


            loadingValue +=
                increment;


            if (
                loadingValue >= 100
            ) {

                loadingValue =
                    100;


                clearInterval(
                    loadingInterval
                );


                finishLoading();

            }


            const roundedValue =
                Math.floor(
                    loadingValue
                );


            loaderPercent.textContent =
                `${roundedValue}%`;


            loaderProgressBar.style.width =
                `${roundedValue}%`;


            updateLoadingMessage(
                roundedValue
            );

        },

        80

    );



/* ==========================================================
   FINISH LOADING
========================================================== */

function finishLoading() {

    loaderStatus.textContent =
        'LANDING COMPLETE // WELCOME';


    loaderPercent.textContent =
        '100%';


    loaderProgressBar.style.width =
        '100%';


    setTimeout(

        () => {

            loader.classList.add(
                'hidden'
            );


            document.body.classList.remove(
                'loading'
            );

        },

        650

    );

}



/* ==========================================================
   REDUCED MOTION
========================================================== */

const reducedMotion =
    window.matchMedia(
        '(prefers-reduced-motion: reduce)'
    );


if (
    reducedMotion.matches
) {

    loadingValue =
        100;


    clearInterval(
        loadingInterval
    );


    finishLoading();

}