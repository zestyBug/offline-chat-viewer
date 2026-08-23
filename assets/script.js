function router(search = window.location.search, title = undefined) {
    const param = new URLSearchParams(search);
    if (location.pathname === HTML_FILE_ADDRESS){
                const cb = (value)=>{
                    sidebar_history?.childNodes.forEach((v)=>{
                        v.removeAttribute("data-active");
                    });
                    const id= param.has("c") ? parseInt(param.get("c")) : NaN;
                    const a = !isNaN(id) ? sidebar_history?.querySelector(`a[data-route="${id}"]`) : undefined;
                    a?.setAttribute("data-active","true");
                    if(!title)
                        title = id ? (a?a.innerText:"ChatGPT Offline") : "Words";
                    if(!isNaN(id))
                    {
                        if(location.hash)
                        {
                            fetchData(id,title,location.hash.substring(1));
                        }else
                            fetchData(id,title);
                    }
                    else
                        renderHomePage();
                };
                chat_list.then(cb,cb);
                return;
    }else
        window.location.href = HTML_FILE_ADDRESS;
}
/**
 * @this {Window} the this context
 * @param {PointerEvent} e event context
 */
function onClick(e) {
    if (e.currentTarget.matches("[data-link]")) {
        e.preventDefault();
        history.pushState("", "", e.currentTarget.href);
        closePopup();
        router();
    }
}
document.addEventListener('keydown', (e) => {
    if(e.code == "Escape" && isPopupOpen()){
        closePopup();
        e.preventDefault();
        e.stopPropagation();
    }
    else if (e.code == "KeyK" && e.ctrlKey && !e.shiftKey) {
        popup_searchbar();
        e.preventDefault();
        e.stopPropagation();
    }
    else if (e.code == "KeyO" && e.ctrlKey && e.shiftKey) {
        history.pushState("", "", HTML_FILE_ADDRESS);
        closePopup();
        router();
        e.preventDefault();
        e.stopPropagation();
    }
    else if (e.code == "KeyS" && e.ctrlKey && e.shiftKey) {
        sidebarSwitch();
        e.preventDefault();
        e.stopPropagation();
    }
    else if (document.contains(prompt_text) && !document.contains(__search_section) && document.activeElement !== prompt_text)
        if (/Key[A-Z]/g.test(e.code))
            prompt_text.focus();
});


// Handle navigation
//window.addEventListener("click", onClick);

window.addEventListener("popstate", () => router());
window.addEventListener("DOMContentLoaded", () => router());


const dict = new Promise((resolve,reject)=>{
    fetch(`/chats/0.json`).then((respond) => {
        if(respond.ok)
            respond.json().then((blob)=>{
                resolve(blob);
            });
        else
            reject();
    }, (err)=>{reject();});
});

const chat_list = new Promise((resolve,reject)=>{
    sidebar_history?.replaceChildren();
    fetch("/chats/index.json").then((respond) => {
        if(respond.ok)
            respond.json().then((value)=>{
                if(value.chats) {
                    /**
                     * @type { {name:string,id:number}[] }
                     */
                    const res = value.chats;
                    res.forEach((value)=>{
                        const btn = creatHistoryButton(value.id,value.name);
                        btn && sidebar_history?.appendChild(btn);
                    });
                }
                resolve(value);
            }, reject);
        else
            reject(`unexpected respond from server`);
    }, reject);
});
defaultColapse();
initScrollTimelineInline();
