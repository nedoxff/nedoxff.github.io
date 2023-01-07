$(() => {
    createCard("UwurandomSharp", "aaaaaaaaa >///< uwu >////< aww shronkus,,n then the scrunkly the widdle the tie.. ittle like scrunge.. boinky tienpsy adornale a *purrs* afgahjlkjhjkafjhglkgjdkajdjegflfgjkfkafglkfg;algh");
    createCard("ScratchScript", "a programming language that compiles to scratch (dont ask why)")
    createCard("WAL", "a programming language intended for creating <a style='color: var(--fg)' href='https://www.youtube.com/watch?v=5BZLz21ZS_Y'>windows error</a> videos");
    createCard("nedoxff.github.io", "this website! :)")
});

const escape = (name) => name.replaceAll(".", "");

const getCard = (name, description) => `<div class="card">
            <div class="card-content">
                <div class="card-description" id="card-description-${escape(name)}">
                    <a style="text-decoration: none" href="https://github.com/nedoxff/${name}"><h3 class="card-title">${name}</h3></a>
                    <p class="card-description">${description}</p>
                    <progress value="" id="loading-${escape(name)}" class="card-data-loading"></progress>
                </div>
            </div>
        </div>`;

const createCard = (name, description) => {
    $(".card-container").append(getCard(name, description));
    
    (async () => {
        const result = await (await fetch(`https://api.github.com/repos/nedoxff/${name}`, )).json();
        $(`#loading-${escape(name)}`).remove();
        if (result == null)
            $(`#card-description-${escape(name)}`).append(`<div class="card-stats">
                    failed to fetch stats :(
                    </div>`);
        else $(`#card-description-${escape(name)}`).append(`<div class="card-stats">
                    ${result.language} | ⭐ ${result.stargazers_count}
                    </div>`);
    })();
};
