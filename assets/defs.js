const USERNAME = "Aether";
const isIe = (navigator.userAgent.toLowerCase().indexOf("msie") != -1 || navigator.userAgent.toLowerCase().indexOf("trident") != -1);

const scrollable       = document.getElementById('scrollable');
const main             = document.getElementById('main');
const name_holder      = document.getElementById('name-holder');
const sidebar          = document.getElementById("stage-slideover-sidebar");
const sidebar_exp_btn  = sidebar?.querySelector('button[onclick="defaultExpand()"]');
const sidebar_col_btn  = sidebar?.querySelector('button[onclick="defaultColapse()"]');
const sidebar_colapsed = document.getElementById("stage-sidebar-colapse-bar");
const sidebar_history  = document.getElementById("history");
const header_btns      = document.getElementById("header-btns");
const sidebar_expanded = sidebar_colapsed ? sidebar_colapsed.nextElementSibling : null;

// Templates and precompiled elements
const popup_background        = (new DOMParser()).parseFromString(`<div class="absolute inset-0" data-ignore-for-page-load="true"><div data-state="open" class="fixed inset-0 z-70 before:starting:backdrop-blur-0 before:absolute before:inset-0 before:bg-gray-200/50 before:backdrop-blur-[1px] before:transition before:duration-250 dark:before:bg-black/50 before:starting:opacity-0" style="pointer-events: auto;"><div class="z-70 h-full w-full grid grid-cols-[10px_1fr_10px] grid-rows-[minmax(10px,1fr)_auto_minmax(10px,1fr)] md:grid-rows-[minmax(20px,0.8fr)_auto_minmax(20px,1fr)]"></div></div></div>`,"text/html").body.firstElementChild;
const popup_section           = popup_background.firstElementChild.firstElementChild;
const toast_section           = (new DOMParser()).parseFromString(`<span class="pointer-events-none fixed inset-0 z-100 mx-auto my-2 flex max-w-[728px] flex-col items-stretch justify-start md:pb-5"><div data-state="entered" class="toast-root" style="height: 50px; margin-bottom: 0px;"></div></span>`,"text/html").body.firstElementChild;
const toast_list              = toast_section.querySelector("div");
const __search_section        = (new DOMParser()).parseFromString(`<div role="dialog" data-state="open" tabindex="-1" style="pointer-events: auto;" class="popover bg-token-main-surface-primary relative start-1/2 col-auto col-start-2 row-auto row-start-2 h-full w-full text-start ltr:-translate-x-1/2 rtl:translate-x-1/2 rounded-2xl grow flex flex-col focus:outline-hidden max-w-md border-token-border-default border bg-clip-padding shadow-[0_14px_62px_0_rgba(0,0,0,0.25)] max-h-[440px] min-h-[440px] md:max-w-[680px] md:min-w-[680px]"><div class="ms-3 me-4 flex max-h-[64px] min-h-[64px] items-center justify-between"><input type="input" contenteditable="true" class="placeholder:text-token-text-tertiary w-full border-none bg-transparent focus:border-transparent focus:ring-0 focus:outline-hidden" placeholder="Search the word..." value=""><button onclick="closePopup(event,this)" class="hover:bg-token-main-surface-secondary focus-visible:ring-token-text-quaternary dark:hover:bg-token-main-surface-tertiary flex items-center justify-center rounded-full bg-transparent p-1 focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-offset-transparent focus-visible:outline-hidden ms-4" aria-label="Close"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon text-token-text-tertiary hover:text-token-text-primary"><use href="/assets/images/sprites-core.svg#85f94b" fill="currentColor"></use></svg></button></div><hr class="border-token-border-default"><ol tabindex="-1" class="p-1 grow overflow-y-auto"></ol><div class="grow flex flex-col ]"></div></div>`,"text/html").body.firstElementChild;
const __search_section_input  = __search_section.querySelector("input");
const __search_section_result = __search_section.querySelector("ol");
const __search_empty_result   = (new DOMParser()).parseFromString(`<div class="cursor-pointer group relative flex items-center rounded-xl px-4 py-3"><div class="loading-results-shimmer bg-token-main-surface-secondary h-[14px] w-[14px] rounded-full"></div><div class="relative grow overflow-hidden whitespace-nowrap ps-2"><div class="flex min-h-[40px] flex-col justify-center"><div class="loading-results-shimmer bg-token-main-surface-secondary h-2 w-1/4 rounded-full"></div><div class="loading-results-shimmer bg-token-main-surface-secondary mt-3 h-2 w-1/2 rounded-full"></div></div></div></div>`,"text/html").body.firstElementChild;
const __prompt_search_bar = (new DOMParser()).parseFromString(`<div class="text-base [--thread-content-margin:--spacing(4)] thread-sm:[--thread-content-margin:--spacing(6)] thread-lg:[--thread-content-margin:--spacing(16)] px-(--thread-content-margin)"><div class="[--thread-content-max-width:40rem] thread-lg:[--thread-content-max-width:48rem] mx-auto max-w-(--thread-content-max-width) flex-1"><div class="pointer-events-auto relative z-1 flex h-[var(--composer-container-height,100%)] max-w-full flex-[var(--composer-container-flex,1)] flex-col sm:grow"><div class="bg-token-bg-primary/1.1 cursor-text overflow-clip bg-clip-padding p-2.5 contain-inline-size dark:bg-[#303030] grid grid-cols-[auto_1fr_auto] [grid-template-areas:'header_header_header'_'leading_primary_trailing'_'._footer_.'] group-data-expanded/composer:[grid-template-areas:'header_header_header'_'primary_primary_primary'_'leading_footer_trailing'] shadow-short" style="border-radius: 28px;"><div class="-my-2.5 flex min-h-14 items-center overflow-x-hidden px-4 [grid-area:primary] group-data-expanded/composer:mb-0 group-data-expanded/composer:px-2.5"><input type="input" style="border:none;" contenteditable="true" id="prompt-textarea" placeholder="Say the word" class="ProseMirror _prosemirror-parent_1b49g_2 text-token-text-primary max-h-[max(30svh,5rem)] max-h-52 flex-1 overflow-auto [scrollbar-width:thin] vertical-scroll-fade-mask default-browser"></input></div></div><div class="absolute start-0 z-[-1] box-border w-full ps-0 max-sm:bottom-full sm:top-full"><div id="prompt-result" class="bg-token-bg-primary w-full block"></div></div></div></div></div>`,"text/html");
const prompt_search_bar= __prompt_search_bar.body.firstElementChild;
const prompt_result    = __prompt_search_bar.getElementById("prompt-result");
const prompt_text      = __prompt_search_bar.getElementById("prompt-textarea");
const hide_switch      = (new DOMParser()).parseFromString(`<button class="not-printable btn relative answer-switch btn-ghost text-token-text-primary" style="view-transition-name: var(--vt_share_chat_wide_button);" onclick="hideAnswers(event)"></button>`,"text/html").body.firstElementChild;
const scroll_switch    = (new DOMParser()).parseFromString(`<button class="not-printable btn relative scroll-swtich btn-ghost text-token-text-primary" style="view-transition-name: var(--vt_share_chat_wide_button);" onclick="scrollMode(event)"></button>`,"text/html").body.firstElementChild;
const end_btn      = (new DOMParser()).parseFromString(`<div class="not-printable" style="opacity: 1;"><button onclick="scroll_down()" class="transparence select-none btn-secondary sm:shadow-md dark:shadow-none! cursor-pointer absolute z-1 rounded-full end-1/2 translate-x-1/2 w-8 h-8 flex items-center justify-center bottom-[calc(var(--composer-overlap-px)+--spacing(6))]"></button></div>`,"text/html").body.firstElementChild;
const __home_page = (new DOMParser()).parseFromString(`<div class="max-sm:grow justify-end max-sm:justify-center sm:min-h-[calc(42svh-var(--header-height))] flex flex-col"><div style="align-self: center;" class="mb-5.5 align-end text-center leading-9"><p id="MOTD-HOLDER" class="text-2xl text-page-header min-h-10.5 whitespace-pre-wrap"></p></div></div>`,"text/html");
const home_page   = __home_page.body.firstElementChild;
const motd_holder = __home_page.getElementById("MOTD-HOLDER");

end_btn.querySelector("button")?.replaceChildren(SVGS[6]);

if(name_holder)
    name_holder.innerText = USERNAME;

if(sidebar && sidebar_expanded && sidebar_colapsed){
    /**
     * @param {PointerEvent} e 
     */
    const expandEvent = (e) => {
        if(sidebar_colapsed.isSameNode(e.target)){
            e.preventDefault();
            e.stopPropagation();
            defaultExpand();
        }
    }
    sidebar_colapsed.addEventListener('click'     ,expandEvent);
    sidebar_colapsed.addEventListener('touchstart',expandEvent,{passive : true});
}
sidebar?.addEventListener("click",(ev)=>{
    if(ev.target == ev.currentTarget){
        defaultColapse();
        ev.preventDefault();
        ev.stopPropagation();
    }
});
{
    const svg1 = SVGS[12].cloneNode(true);
    svg1.classList.add("screen-arch:hidden");
    scroll_switch.appendChild(svg1);
    const svg2 = SVGS[13].cloneNode(true);
    svg2.classList.add("screen-arch:visible");
    scroll_switch.appendChild(svg2);
    scroll_switch.title = "Scroll mode";
    header_btns?.appendChild(scroll_switch);
}
{
    hide_switch.appendChild(SVGS[1]);
    hide_switch.appendChild(SVGS[0]);
    hide_switch.title = "Answers";
    header_btns?.appendChild(hide_switch);
}
/**
 * 
 * @param {string} a 
 * @param {string} b 
 * @returns {number}
 */
function score(a, b) {
    /** total score */
    let score = 0;
    /** current index in the string b */
    let current_index = -1;
    for (let j = 0; j < a.length; j++) {
        const character = a[j];
        /** best score so far (defaults worst possible: not found) */
        let min_score = (-1 - current_index - 1) / b.length;
        /** best index for next word (in the string b) so far */
        let index_temp = current_index;
        for (let i = (b.length-1); i >= 0; i--){
            // temporary
            if(character === b[i]) {
                const p_distance = b.length - current_index;
                const c_score = (current_index < i) ? 
                    /** positive score for correct next word negative correlation with distance */
                    (p_distance - (i - current_index) + 1) / p_distance : 
                    /** negative distance score */
                    (i - current_index - 1) / b.length ;
                if(min_score <= c_score){
                    min_score = c_score;
                    index_temp = i;
                } else
                    break;
            }
        }
        current_index = index_temp;
        score += min_score;
    }
    /** a very small score to float the shorter length text up */
    return score - (Math.abs(b.length - a.length) / (b.length + a.length));
}

/**
 * Subsequent search function
 * @param {string} input 
 * @param {Map<string,Array<Array<number>>>} dictionary 
 * @param {number} topN 
 * @returns {{key: string,value: any,distance: number}[]}
 */
function searchDictionary(input, dictionary, topN = 6) {
    input = input.toLowerCase();
    const filtered = Object.keys(dictionary).filter((key) => key.startsWith(input));
    const resource = filtered.length ? filtered : Object.keys(dictionary);
    const results = resource.map((key) => {
        return {
            key,
            value: dictionary[key],
            distance: score(input, key)
        };
    });
    // Sort by smallest distance
    //results.sort((a, b) => a.distance - b.distance);
    results.sort((a, b) => b.distance - a.distance);
    // Return top N similar values
    return results.slice(0, topN);
}
let search_timeout = undefined;
__search_section_input.addEventListener("input",(ev)=>{
    if(search_timeout){
        clearTimeout(search_timeout);
        search_timeout = undefined;
    }
    const v = ev.currentTarget.value;
    if(typeof v != "string" || v.length < 2){
        __search_section_result.replaceChildren();
        return;
    }
    if(!__search_section_result.childNodes.length){
        const li = document.createElement("li");
        li.classList.add("w-full");
        [0,0,0,0,0].forEach(()=>{
            li.appendChild(__search_empty_result.cloneNode(true));
        });
        __search_section_result.appendChild(li);
    }
    search_timeout = setTimeout(()=>{
        search_timeout = undefined;
        dict.then((value)=>{
            __search_section_result.replaceChildren();
            searchDictionary(v,value).forEach((res)=>{
                res.value.forEach((link)=>{
                    const li = document.createElement("li");
                    const a=(new DOMParser()).parseFromString(`<a class="cursor-pointer group relative flex items-center rounded-xl px-4 py-3" href="${HTML_FILE_ADDRESS}?c=${link[0]}#${link[1]}" data-link><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon"><use href="/assets/images/sprites-core.svg#003104" fill="currentColor"></use></svg><div class="relative grow overflow-hidden whitespace-nowrap ps-2"><div class="flex items-center"><div class="relative grow overflow-hidden whitespace-nowrap"><div class="text-sm"><div class="truncate">${res.key}</div></div><div class="pt-1 text-xs text-token-text-tertiary"><div class="truncate">${link[0]}.json</div></div></div></div></div></a>`,"text/html").body.firstElementChild;
                    a.addEventListener("click",onClick);
                    li.appendChild(a);
                    __search_section_result.appendChild(li);
                });
            });
        });
    },500);
});
prompt_text.addEventListener("input",(ev)=>{
    if(search_timeout){
        clearTimeout(search_timeout);
        search_timeout = undefined;
    }
    const v = ev.currentTarget.value;
    if(typeof v != "string" || v.length < 2){
        prompt_result.replaceChildren();
        return;
    }
    search_timeout = setTimeout(()=>{
        search_timeout = undefined;
        const ul = document.createElement("ul");
        ul.style.opacity="0";
        ul.classList.add("divide-token-border-light","w-full","flex-col","divide-y","p-2.5","max-sm:px-0","flex");
        dict.then((value)=>{
            searchDictionary(v,value).forEach((res)=>{
                const li = document.createElement("li");
                li.classList.add("w-full");
                res.value.forEach((link)=>{
                    const a=(new DOMParser()).parseFromString(`<a href="${HTML_FILE_ADDRESS}?c=${link[0]}#${link[1]}" class="inline-block cursor-pointer items-center justify-start rounded-lg p-2.5 py-3 text-start whitespace-pre-wrap bg-token-main-surface-primary" data-link><span class="text-sm whitespace-pre-wrap" title="${res.distance}">${res.key} (${link[0]})</span></a>`,"text/html").body.firstElementChild;
                    a.addEventListener("click",onClick);
                    li.appendChild(a);
                });
                ul.appendChild(li);
            });
        });
        prompt_result.replaceChildren(ul);
        setTimeout(()=>{
            ul.style.opacity="1";
        },1);
    },500);
});

function getArticles() {
    return document.querySelector("article")?.parentNode;
}
const _m_motd = [
    `ChatGPT`,
    `Hey, ${USERNAME}. Ready to dive in?`,
    `Good to see you, ${USERNAME}.`,
    `Ready when you are.`,

    //`Ask ChatGPT anything`,
    //`Ask ChatGPT anything, ${USERNAME}`,
    `How can I help?`,
    `How can I help, ${USERNAME}?`,

    `What can I help with?`,
    `What can I help with, ${USERNAME}?`,
    `Where should we start?`,
    `Where should we start, ${USERNAME}?`,
    `What’s on the agenda today?`,
    `What’s on your mind today?`,
    `What are you working on?`,
    `What are you researching?`,
    `What can I do for you?`,
    `Where should we begin?`,
// DLC:
    //`Just type in.`,
    `Just say the word.`,
    `If you’d like, I could help.`,
    //`If you want, I can help.`,
    //`Alright ${USERNAME}, let’s do this`,
    `What do you want me to do?`,
    `I’d be happy to help.`,
];

let _p_motd = -1;
function getMOTD() {
    let rand = _p_motd;
    while (_p_motd == rand) {
        rand = Math.floor(Math.random() * (_m_motd.length));
    }
    _p_motd = rand;
    return _m_motd[rand];
}
/**
 * 
 * @param {HTMLElement} element to be shown
 */
function renderPopup(element) {
    if(document.contains(popup_background))
        popup_background.remove();
    popup_section.replaceChildren(element);
    document.body.appendChild(popup_background);
}
function isPopupOpen(){
    return document.contains(popup_background);
}
/**
 * 
 * @param {Event?} event 
 * @param {boolean?} ignoreTarget
 */
function closePopup(event,ignoreTarget) {
    if(event){
        if(!ignoreTarget && event.target != event.currentTarget)
            return;
        event.preventDefault();
        event.stopPropagation();
    }
    popup_section.replaceChildren();
    popup_background.remove();
}
popup_background.firstElementChild.addEventListener("click",closePopup);

function renderToast(message,error=true) {
    const doc = (new DOMParser()).parseFromString(`<div class="z-60 w-full p-1 text-center md:w-auto md:text-justify"><div class="px-3 py-2 rounded-lg inline-flex flex-row border pointer-events-auto gap-2 border-${error?"red":"green"}-500 text-white bg-${error?"red":"green"}-500" role="alert">${error?'<div class="mt-1 shrink-0 grow-0"></div>':''}<div class="flex-1 justify-center gap-2"><div class="text-start whitespace-pre-wrap">${message}</div></div></div></div>`,"text/html").body.firstElementChild;
    if(error){
        const svg = SVGS[5]?.cloneNode(true);
        svg.classList.add("icon-sm")
        doc?.firstElementChild?.firstElementChild?.replaceChildren(svg);
    }
    if(!document.contains(toast_section))
        document.body.appendChild(toast_section);
    toast_list.insertBefore(doc,toast_list.firstElementChild);
    setTimeout(()=>{
        toast_list.removeChild(doc);
        if(!toast_list.childElementCount)
            toast_section.remove();
    },2000);
}

/**
 * Is sidebar expanded
 * @returns {boolean}
 */
function isSidebarFocused() {
    if(sidebar_expanded)
        return !sidebar.classList.contains("unfocused");
    return false;
}



/**
 * @param {string} name 
 * @returns {HTMLElement | null}
 */
function creatHistoryButton(id=0,name="") {
    const a = (new DOMParser()).parseFromString(`<a href="${HTML_FILE_ADDRESS}?c=${id}" data-route="${id}" class="group __menu-item hoverable" data-link=""><div class="flex min-w-0 grow items-center gap-2.5 group-data-no-contents-gap:gap-0"><div class="truncate"><span class="" dir="auto">${name}</span></div></div></a>`,"text/html");
    const btn = a.body.firstElementChild;
    btn.addEventListener("click",onClick);
    return btn;
}


function initScrollTimelineInline() {
    try {
        if (CSS.supports("animation-timeline: --works"))
            return;
        var t = new Map;
        document.addEventListener("animationstart", (n => {
            if (!(n.target instanceof HTMLElement))
                return;
            const e = n.target.getAnimations().filter((t => t.animationName === n.animationName));
            t.set(n.target, e);
        })),
        document.addEventListener("scrolltimelineload", (n => {
            t.forEach(((t, e) => {
                t.forEach((t => {
                    n.detail.upgradeAnimation(t, e);
                }))
            })),
            t.clear();
        }), { once: !0 })
    } catch { }
};

function renderHomePage() {
    motd_holder.innerText = getMOTD();
    if(scrollable){
        if(!document.contains(prompt_search_bar)){
            prompt_text.value = "";
            prompt_text.dispatchEvent(new Event("input"));
        }
        scrollable.replaceChildren(home_page,prompt_search_bar);
        prompt_text.focus();
        history.replaceState("", "", `/`);
        document.title = "ChatGPT Offline";
    }
}

/**
 * fetch and render a chat
 * @param {number | undefined} chatId
 * @param {string | undefined} title
 * @param {number | undefined} article_id
 */
function fetchData(chatId = undefined,title=undefined,article_id=undefined) {
    scrollable?.replaceChildren(template_loading);
    if(chatId)
    fetch(`/chats/${chatId}.json`).then((respond) => {
        if(respond.ok)
            respond.json().then((doc)=>{
                processDoc(doc,article_id);
            }, renderToast);
        else
            renderToast(`unexpected respond from server`);
    }, renderToast);
    else
    dict.then(processList,renderToast);
};

/**
 * Callbacks
 */


function sidebarSwitch() {
    if(sidebar.classList.contains("unfocused")){
        defaultExpand();
    }else{
        defaultColapse();
    }
}

function defaultExpand () {
    sidebar.style.width = "var(--sidebar-width)";
    sidebar         .classList.remove("unfocused");
    sidebar_colapsed.classList.add("hidden!");
    sidebar_expanded.classList.remove("hidden!");
    sidebar_col_btn?.focus();
};


function defaultColapse () {
    sidebar.style.width = "var(--sidebar-rail-width)";
    sidebar         .classList.add("unfocused");
    sidebar_expanded.classList.add("hidden!");
    sidebar_colapsed.classList.remove("hidden!"); 
    scrollable?.focus();
};

scrollable.addEventListener("scroll",(ev)=>{
    if(ev.currentTarget){
        if(ev.currentTarget.scrollTopMax > (ev.currentTarget.scrollTop + 150)){
            end_btn.style.display = "block";
        }else{
            end_btn.style.display = "none";
        }
    }else{
        // default mode?
        end_btn.style.display = "block";
    }
});

/**
 * 
 * @param {Event} event 
 * @param {HTMLElement} thiz 
 */
function popup_searchbar() {
    renderPopup(__search_section);
    __search_section_input.value = "";
    __search_section_input.focus();
    __search_section_input.dispatchEvent(new Event("input"));
}