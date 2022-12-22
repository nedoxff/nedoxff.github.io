$(() => {
    createCard("christmas_happier.png", "this was my discord profile picture for a while");
    createCard("helloween.png", "also made as a discord profile picture, although for halloween");
    createCard("EEEEEEEEAAAAAAAAA.png", "trying out different styles");
    createCard("NEWYEAR_HOUSE.png", "some interior drawings for a christmas project i am working on");
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