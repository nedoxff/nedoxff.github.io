let chapter, page;

$(() => {
    $(window).click(e => {
       const width = $(window).width();
       const event = e.originalEvent;
       const href = window.location.href;
       if(event.x >= width / 2)
       {
           if(page + 1 > chaptersLength[chapter] - 1) {
               if(chaptersLength.length - 1 < chapter + 1)
                   window.location.href = "https://nedoxff.github.io";
               else {
                   window.location.href = href.substring(href.indexOf("?"), null) + `?c=${chapter + 1}&p=0`;
               }
           }
       }
       else
       {
           if(page - 1 < 0 && chapter - 1 < 0)
               window.location.href = "https://nedoxff.github.io";
           else if(page - 1 < 0 && chapter - 1 >= 0)
               window.location.href = href.substring(href.indexOf("?"), null) + `?c=${chapter - 1}&p=${chaptersLength[chapter - 1] - 1}`;
           else
               window.location.href = href.substring(href.indexOf("?"), null) + `?c=${chapter}&p=${page - 1}`;
       }
    });

    const href = window.location.href;
    if(localStorage.getItem("angerIndicatorType") == null)
        window.location.replace(href.substring(href.indexOf("anger"), null) + "anger_settings");
    
    if(localStorage.getItem("angerChapter") != null && !href.includes("?")) {
        chapter = parseInt(localStorage.getItem("angerChapter"));
        page = parseInt(localStorage.getItem("angerPage"));
        window.location.replace(href + `?c=${chapter}&p=${page}`);
    }
    
    const params = new URLSearchParams(window.location.search);
    if(!params.has("c"))
    {
        if(href.includes("?"))
            window.location.replace(href.substring(href.indexOf("?"), null) + "?c=0&p=0");
        else
            window.location.replace(href + "?c=0&p=0");
    }
    else
    {
        chapter = parseInt(params.get("c"));
        page = parseInt(params.get("p"));
        if((chapter > chaptersLength.length - 1 || chapter < 0) || (page > chaptersLength[chapter] - 1 || page < 0))
            window.location.replace("https://nedoxff.github.io");
        localStorage.setItem("angerChapter", chapter);
        localStorage.setItem("angerPage", page);

        const pageImage = $("#page");
        const chapterId = $("#chapter-id");
        
        pageImage.attr("src", `../assets/img/anger/c${chapter}/${page}.png`);
        pageImage.on('load', () => {
            chapterId.text(chapter.toString());
            console.log(localStorage.getItem("angerIndicatorType"));
            switch(localStorage.getItem("angerIndicatorType")) {
                case "small":
                    chapterId.addClass("smaller-id");
                    break;
                case "large":
                    console.log(pageImage.width);
                    chapterId.css("width", pageImage.width());
                    chapterId.css("height", pageImage.height());
                    textFit(document.getElementById("chapter-id"), {maxFontSize: 100000, alignHoriz: true, alignVert: true});
                    break;
            } 
        });
    }
});

const chaptersLength = [1];