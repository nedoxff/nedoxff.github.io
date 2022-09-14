const transitionTo = (url) => {
    anime({
        targets: "body",
        opacity: 0,
        duration: 250,
        easing: 'easeInOutQuad',
        autoplay: true,
        complete: () => {
            window.location.href = getUrlWithoutFile() + url;
        }
    });
};

const transitionOut = () => {
    anime({
        targets: "body",
        opacity: 1,
        duration: 250,
        easing: 'easeInOutQuad',
        autoplay: true
    })
}

const getUrlBeforeParameters = () => window.location.href.split("?")[0];
const getUrlWithoutFile = () => getUrlBeforeParameters().split("/").slice(0, -1).join("/");

$(document).ready(() => {
    window.onpageshow = (event) => {
        if (event.persisted)
            window.location.reload();
    };
    
    const params = new URLSearchParams(window.location.search);
    if(params.get("out") !== null) {
        document.getElementsByTagName("body")[0].style.opacity = 0;
        transitionOut();
    }
})