$(() => {
    createCard("christmas_happier.png", "this was my discord profile picture for a while");
    createCard("helloween.png", "also made as a discord profile picture, although for halloween");
    createCard("EEEEEEEEAAAAAAAAA.png", "trying out different styles");
    createCard("NEWYEAR_HOUSE.png", "some interior drawings for a christmas project i am working on");
    $(".card-container").append(`<div style="display: flex; flex-direction: row; align-content: baseline">
            <a href="/projects/anger"><img style="margin-top: 15px" class="card-img"
                                           src="assets/img/anger_thumb.png"></a>
                <button id="anger-settings-button" style="margin-top: 15px; margin-left: 5px;" onclick="window.location.href = window.location.href.substring(window.location.href.indexOf('art'), null) + 'projects/anger_settings';"><i class="material-icons" style="color: var(--bg_h); vertical-align: middle;">settings</i></button>
            </div>`);
});

const getCard = (filename, description) => `<div class="card">
            <div class="card-content">
                <a href="assets/img/gallery/${filename}" class="card-img-link"><img class="card-img" src="assets/img/gallery/${filename}"></a>
                <div class="card-description">
                    <h3 class="card-filename">${filename}</h3>
                    <p class="card-description">${description}</p>
                </div>
            </div>
        </div>`;

const createCard = (filename, description) => $(".card-container").append(getCard(filename, description));