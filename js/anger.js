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
    
    const params = new URLSearchParams(window.location.search);
    if(!params.has("c"))
    {
        const href = window.location.href;
        if(href.includes("?"))
            window.location.href = href.substring(href.indexOf("?"), null) + "?c=0&p=0";
        else
            window.location.href = href + "?c=0&p=0";
    }
    else
    {
        chapter = parseInt(params.get("c"));
        page = parseInt(params.get("p"));
        if((chapter > chaptersLength.length - 1 || chapter < 0) || (page > chaptersLength[chapter] - 1 || page < 0))
            window.location.href = "https://nedoxff.github.io";
        $("#page").attr("src", `../assets/img/anger/c${chapter}/${page}.png`);
    }
});

const chaptersLength = [1];