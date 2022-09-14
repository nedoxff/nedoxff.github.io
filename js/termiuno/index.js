$(() => {
    localizeBody();
    anime({
        targets: "#fullscreen-loader",
        opacity: 0,
        duration: 250,
        easing: "easeInOutQuad",
        complete: () => $("#fullscreen-loader").css("display", "none")
    });
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        $("#mobile-alert").css("display", "flex")
    }
})

const localizeBody = () => {
    i18next
        .use(i18nextBrowserLanguageDetector)
        .init({
            fallbackLng: 'en',
            resources: {
                en: {
                    translation: en
                }
            }
        }, (err) => {
            if(err) return console.error(err);

            jqueryI18next.init(i18next, $, {useOptionsAttr: true});
            $('body').localize();
        });
}