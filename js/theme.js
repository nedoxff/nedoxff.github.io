$(() => {
    if(localStorage.getItem("theme") == null)
        localStorage.setItem("theme", "dark");
    setTheme(localStorage.getItem("theme"));
    $("#toggle-theme-button").click(() => {
        const newTheme = localStorage.getItem("theme") === "dark" ? "light": "dark";
        localStorage.setItem("theme", newTheme);
        setTheme(newTheme);
    });
});

const setTheme = (t) => {
    const link = $("#gruvbox-theme-link");
    let source;
    source = t === "light" ? "css/gruvbox_light.css": "css/gruvbox.css";
    link.attr("href", source);  
};