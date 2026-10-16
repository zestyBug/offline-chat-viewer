const template_assistant = (new DOMParser()).parseFromString(`<article class="text-token-text-primary w-full focus:outline-none [--shadow-height:45px] has-data-writing-block:pointer-events-none has-data-writing-block:-mt-(--shadow-height) has-data-writing-block:pt-(--shadow-height) [&amp;:has([data-writing-block])&gt;*]:pointer-events-auto scroll-mt-[calc(var(--header-height)+min(200px,max(70px,20svh)))]" tabindex="-1" dir="auto" data-turn="assistant"><h6 class="sr-only">ChatGPT said:</h6><div class="my-auto mx-auto [--thread-content-margin:--spacing(4)] thread-sm:[--thread-content-margin:--spacing(6)] thread-lg:[--thread-content-margin:--spacing(16)] px-(--thread-content-margin)"><div tabindex="-1" class="[--thread-content-max-width:40rem] thread-lg:[--thread-content-max-width:48rem] mx-auto max-w-(--thread-content-max-width) flex-1 group/turn-messages focus-visible:outline-hidden relative flex w-full min-w-0 flex-col agent-turn"><div class="min-h-8 text-message relative markdown prose dark:prose-invert w-full wrap-break-word markdown-new-styling text-start break-words whitespace-normal [.text-message+&amp;]:mt-1" dir="auto">Loading...</div><div class="touch:-me-2 touch:-ms-3.5 -ms-2.5 -me-1 -mt-1 p-1 flex flex-wrap items-center justify-start gap-y-4 select-none touch:w-[calc(100%+--spacing(3.5))] w-[calc(100%+--spacing(2.5))] min-h-[46px]"></div></div></div><span class="sr-only"><br></span></article>`,"text/html").body.firstElementChild;
const template_user      = (new DOMParser()).parseFromString(`<article class="text-token-text-primary w-full focus:outline-none [--shadow-height:45px] has-data-writing-block:pointer-events-none has-data-writing-block:-mt-(--shadow-height) has-data-writing-block:pt-(--shadow-height) [&amp;:has([data-writing-block])&gt;*]:pointer-events-auto scroll-mt-(--header-height)" tabindex="-1" dir="auto" data-turn="user"><h5 class="sr-only">You said:</h5><div class="my-auto mx-auto pt-12 [--thread-content-margin:--spacing(4)] thread-sm:[--thread-content-margin:--spacing(6)] thread-lg:[--thread-content-margin:--spacing(16)] px-(--thread-content-margin)"><div tabindex="-1" class="[--thread-content-max-width:40rem] thread-lg:[--thread-content-max-width:48rem] mx-auto max-w-(--thread-content-max-width) flex-1 group/turn-messages focus-visible:outline-hidden relative flex w-full min-w-0 flex-col"><div class="min-h-8 flex max-w-full flex-col grow text-message text-start items-end rtl:items-start"><div class="user-message-bubble-color corner-superellipse/1.1 relative rounded-[18px] px-4 py-1.5 data-[multiline]:py-3 max-w-[var(--user-chat-width,70%)] break-words user-message-bubble-color whitespace-pre-wrap">Loading...</div></div><div class="justify-end touch:-me-2 touch:-ms-3.5 -ms-2.5 -me-1 flex flex-wrap items-center gap-y-4 p-1 select-none"></div></div></div><span class="sr-only"><br></span></article>`,"text/html").body.firstElementChild;
const template_loading   = (new DOMParser()).parseFromString(`<div aria-hidden="true" class="pointer-events-none fixed inset-0 flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="motion-safe:animate-spin text-token-text-tertiary h-5 w-5 transition-opacity delay-[2000ms] duration-[350ms] ease-out motion-reduce:duration-0 starting:opacity-0"><use href="/assets/images/sprites-core.svg#4944fe" fill="currentColor"></use></svg></div>`,"text/html").body.firstElementChild;
const template_link      = (new DOMParser()).parseFromString(`<article class="text-token-text-primary w-full [--shadow-height:45px] scroll-mt-(--header-height)" dir="auto" data-turn="user"><div class="my-auto mx-auto pt-3 [--thread-content-margin:--spacing(4)] thread-sm:[--thread-content-margin:--spacing(6)] thread-lg:[--thread-content-margin:--spacing(16)] px-(--thread-content-margin)"><div class="[--thread-content-max-width:40rem] thread-lg:[--thread-content-max-width:48rem] mx-auto max-w-(--thread-content-max-width) flex-1 group/turn-messages focus-visible:outline-hidden relative flex w-full min-w-0 flex-col"><div class="flex max-w-full flex-col grow"><div data-message-author-role="user" dir="auto" class="min-h-8 text-message relative flex w-full flex-col items-end gap-2 text-start break-words whitespace-normal [.text-message+&amp;]:mt-1"><div class="flex w-full flex-col gap-1 empty:hidden items-end rtl:items-start"><div class="user-message-bubble-color relative rounded-[18px] px-4 py-1.5 data-[multiline]:py-3 max-w-[var(--user-chat-width,70%)]"><div class="markdown whitespace-pre-wrap"><a target="_blank" href="${HTML_FILE_ADDRESS}?c=0"></a></div></div></div></div></div><div data-control="" class="z-0 flex justify-end"></div></div></div></article>`,"text/html").body.firstElementChild;
const pin_message_btn  = (new DOMParser()).parseFromString(`<button class="not-printable text-token-text-secondary hover:bg-token-bg-secondary rounded-lg"><span class="flex items-center justify-center touch:w-10 h-8 w-8"></span></button>`,"text/html").body.firstElementChild;
const copy_message_btn = (new DOMParser()).parseFromString(`<button class="not-printable text-token-text-secondary hover:bg-token-bg-secondary rounded-lg" title="Copy"><span class="flex items-center justify-center touch:w-10 h-8 w-8"></span></button>`,"text/html").body.firstElementChild;
const copy_answer_btn  = (new DOMParser()).parseFromString(`<button class="not-printable text-token-text-secondary hover:bg-token-bg-secondary rounded-lg" title="Copy"><span class="flex items-center justify-center touch:w-10 h-8 w-8"></span></button>`,"text/html").body.firstElementChild;
const share_btn        = (new DOMParser()).parseFromString(`<button class="not-printable text-token-text-secondary hover:bg-token-bg-secondary rounded-lg" title="Share"><span class="flex items-center justify-center touch:w-10 h-8 w-8"></span></button>`,"text/html").body.firstElementChild;
const copy_table_btn   = (new DOMParser()).parseFromString(`<div class="sticky h-0 select-none end-(--thread-content-margin) self-end"><div class="absolute end-0 flex items-end"><button onclick="copyTable(this)" title="Copy table" class="not-printable hover:bg-token-bg-tertiary text-token-text-secondary my-1 rounded-sm p-1 transition-opacity group-[:not(:hover):not(:focus-within)]:pointer-events-none group-[:not(:hover):not(:focus-within)]:opacity-0"></button></div></div>`,"text/html").body.firstElementChild;
const answer_switch_btn= (new DOMParser()).parseFromString(`<div class="text-token-text-secondary flex items-center justify-center"><div class="px-0.5 font-semibold tabular-nums">N/A</div></div>`,"text/html").body.firstElementChild;
const SVGS = [
    // 0. hidden
    (new DOMParser()).parseFromString(`<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" class="icon"><path fill-rule="evenodd" clip-rule="evenodd" d="M2.29291 2.29289C2.68343 1.90237 3.3166 1.90237 3.70712 2.29289L21.7071 20.2929C22.0976 20.6834 22.0976 21.3166 21.7071 21.7071C21.3166 22.0976 20.6834 22.0976 20.2929 21.7071L17.7785 19.1927C16.2039 20.2404 14.274 21 12 21C8.84584 21 6.36062 19.541 4.5586 17.8792C2.76162 16.222 1.58481 14.312 1.01235 13.2562C0.585075 12.4681 0.585779 11.5305 1.01269 10.7432C1.5904 9.67778 2.79205 7.72646 4.63588 6.05008L2.29291 3.70711C1.90238 3.31658 1.90238 2.68342 2.29291 2.29289ZM6.05192 7.46612C4.40725 8.93862 3.30718 10.7074 2.77085 11.6965C2.66598 11.8899 2.66608 12.1102 2.77055 12.3029C3.28868 13.2585 4.34193 14.9588 5.91447 16.4089C7.48198 17.8545 9.50575 19 12 19C13.6494 19 15.09 18.5001 16.3303 17.7445L14.396 15.8102C12.6575 16.9057 10.3324 16.6963 8.81803 15.182C7.3037 13.6676 7.09428 11.3425 8.18977 9.60397L6.05192 7.46612ZM9.67223 11.0864L12.9136 14.3278C12.0164 14.6793 10.9571 14.4927 10.2322 13.7678C9.50734 13.0429 9.32067 11.9836 9.67223 11.0864Z" fill="currentColor"></path><path d="M10.2234 5.19987C10.7835 5.07151 11.3753 5 12 5C14.4943 5 16.5181 6.1455 18.0856 7.59105C19.6581 9.04124 20.7114 10.7415 21.2295 11.6971C21.3335 11.8889 21.3338 12.1105 21.2285 12.3047C20.9449 12.8276 20.496 13.5829 19.8836 14.4005C19.5526 14.8426 19.6425 15.4693 20.0846 15.8004C20.5266 16.1315 21.1534 16.0415 21.4844 15.5995C22.1677 14.6872 22.6678 13.8459 22.9866 13.2582C23.4131 12.4717 23.4154 11.5327 22.9877 10.7438C22.4152 9.68799 21.2384 7.77798 19.4414 6.1208C17.6394 4.45899 15.1542 3 12 3C11.2211 3 10.4795 3.08934 9.77664 3.25041C9.23831 3.37379 8.90192 3.9102 9.02529 4.44853C9.14866 4.98686 9.68508 5.32325 10.2234 5.19987Z" fill="currentColor"></path></svg>`,"text/html").body.firstElementChild,
    // 1. visible
    (new DOMParser()).parseFromString(`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" class="icon"><use href="/assets/images/sprites-core.svg#d4bd76" fill="currentColor"></use></svg>`,"text/html").body.firstElementChild,
    // 2. copy
    (new DOMParser()).parseFromString(`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" class="icon"><use href="/assets/images/sprites-core.svg#ce3544" fill="currentColor"></use></svg>`,"text/html").body.firstElementChild,
    // 3. cross
    (new DOMParser()).parseFromString(`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" class="icon"><use href="/assets/images/sprites-core.svg#85f94b" fill="currentColor"></use></svg>`,"text/html").body.firstElementChild,
    // 4. tick
    (new DOMParser()).parseFromString(`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" class="icon"><use href="/assets/images/sprites-core.svg#249d41" fill="currentColor"></use></svg>`,"text/html").body.firstElementChild,
    // 5. error
    (new DOMParser()).parseFromString(`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"><use href="/assets/images/sprites-core.svg#c6470e" fill="currentColor"></use></svg>`,"text/html").body.firstElementChild,
    // 6. down
    (new DOMParser()).parseFromString(`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" class="icon text-token-text-primary"><use href="/assets/images/sprites-core.svg#eed976" fill="currentColor"></use></svg>`,"text/html").body.firstElementChild,
    // 7. hidden 
    (new DOMParser()).parseFromString(`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"><use href="/assets/images/sprites-core.svg#b81341" fill="currentColor"></use></svg>`,"text/html").body.firstElementChild,
    // 8. share 
    (new DOMParser()).parseFromString(`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" class="icon"><use href="/assets/images/sprites-core.svg#630ca2" fill="currentColor"></use></svg>`,"text/html").body.firstElementChild,
    // 9. blank
    (new DOMParser()).parseFromString(`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" class="icon"></svg>`,"text/html").body.firstElementChild,
    // 10. pin
    (new DOMParser()).parseFromString(`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" class="icon"><use href="/assets/images/sprites-core.svg#23d2ff" fill="currentColor"></use></svg>`,"text/html").body.firstElementChild,
    // 11. unpin
    (new DOMParser()).parseFromString(`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" class="icon"><use href="/assets/images/sprites-core.svg#13322a" fill="currentColor"></use></svg>`,"text/html").body.firstElementChild,
    // 12. scroll
    (new DOMParser()).parseFromString(`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" class="icon"><use href="/assets/images/sprites-core.svg#bc480f" fill="currentColor"></use></svg>`,"text/html").body.firstElementChild,
    // 13. scroll
    (new DOMParser()).parseFromString(`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" class="icon"><use href="/assets/images/sprites-core.svg#a9e984" fill="currentColor"></use></svg>`,"text/html").body.firstElementChild,
    // 14. left
    (new DOMParser()).parseFromString(`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" data-rtl-flip="" class="icon"><use href="/assets/images/sprites-core.svg#8ee2e9" fill="currentColor"></use></svg>`,"text/html").body.firstElementChild,
    // 15. right
    (new DOMParser()).parseFromString(`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" data-rtl-flip="" class="icon"><use href="/assets/images/sprites-core.svg#b140e7" fill="currentColor"></use></svg>`,"text/html").body.firstElementChild,
];

copy_message_btn.querySelector("span")?.replaceChildren(SVGS[2].cloneNode(true));
copy_answer_btn.querySelector("span")?.replaceChildren(SVGS[2].cloneNode(true));
share_btn.querySelector("span")?.replaceChildren(SVGS[8].cloneNode(true));
copy_table_btn.querySelector("button")?.replaceChildren(SVGS[2].cloneNode(true));


/**
 * @param {PointerEvent} e 
 */
function scroll_down (e) {
    scrollable.scrollTo({
        top: scrollable.scrollHeight,
        behavior: 'smooth'
    });
};

/**
 * @param {HTMLElement} a1 
 * @param {HTMLElement} a2 
 */
const __cb1 = (a1,a2)=>{
    scrollable.removeChild(a1);
    scrollable.removeChild(a2);
};
/**
 * @param {HTMLElement} a1
 */
const __cb2 = a1 => {
    scrollable.removeChild(a1);
};

/**
 * 
 * @param {HTMLButtonElement} element
 */
function hideMessage(element) {
    const article = element?.closest("article");
    const nextArticle = article?.nextElementSibling;
    const Turn1 = article?.getAttribute("data-turn");
    const Turn2 = nextArticle?.getAttribute("data-turn");
    if(Turn1 == "user" && Turn2 == "assistant"){
        setTimeout(__cb1,100,article,nextArticle);
    }else{
        setTimeout(__cb2,100,article);
    }
}

function scrollMode() {
    document.documentElement.classList.toggle("screen-arch")
}

/**
 * 
 * @param {HTMLButtonElement} element
 * @param {number} id
 */
function pinunpinMessage(element,id){
    const debug_array_2 = JSON.parse(localStorage.getItem("pins") || "{}");
    const span = element?.querySelector("span");
    try {
        if(debug_array_2[id]) {
            debug_array_2[id]=undefined;
            setTimeout(()=>{ span?.replaceChildren(SVGS[10].cloneNode(true));element?.setAttribute("title","Pin"); },1000);
        }else{
            debug_array_2[id]=true;
            setTimeout(()=>{ span?.replaceChildren(SVGS[11].cloneNode(true));element?.setAttribute("title","Unpin"); },1000);
        }
        localStorage.setItem("pins",JSON.stringify(debug_array_2));
        span?.replaceChildren(SVGS[4].cloneNode(true));
    } catch (e) {
        span?.replaceChildren(SVGS[3].cloneNode(true));
    }
};

function hideAnswers() {
    main.classList.toggle("hide-answer");
}

/**
 * 
 * @param {HTMLButtonElement} element
 */
function copyAnswer(element){
    const article = element?.closest("article");
    const span = element?.querySelector("span");
    const markdown = article?.querySelector("div.markdown");
    try {
        if(!markdown) throw Error("");
        const textToPutOnClipboard = toMarkdown(markdown);
        if(!markdown) throw Error("");
        if (isIe) window.clipboardData.setData('Text', textToPutOnClipboard);
        else      navigator.clipboard.writeText(textToPutOnClipboard);
        if(span) span.replaceChildren(SVGS[4].cloneNode(true));
    } catch (e) {
        if(span) span.replaceChildren(SVGS[3].cloneNode(true));
    }
    if(span)
        setTimeout(()=>{ if(span) span.replaceChildren(SVGS[2].cloneNode(true)); },1000);
};

/**
 * 
 * @param {HTMLButtonElement} element
 */
function copyMessage(element) {
    const article = element?.closest("article");
    const span = element?.querySelector("span");
    const message =  article?.querySelector("div.user-message-bubble-color");
    try {
        if(!message) throw Error("");
        if (isIe) window.clipboardData.setData('Text', message.textContent);
        else      navigator.clipboard.writeText(message.textContent);
        if(span) span.replaceChildren(SVGS[4].cloneNode(true));
    } catch (e) {
        if(span) span.replaceChildren(SVGS[3].cloneNode(true));
    }
    if(span)
        setTimeout(()=>{ span.replaceChildren(SVGS[2].cloneNode(true)); },1000);
};

/**
 * 
 * @param {HTMLButtonElement} element
 * @param {number} id
 */
function share(element,id) {
    const article = element?.closest("article");
    const span = element?.querySelector("span");
    const identifier =  article?.id;
    try {
        if(!identifier || !id) throw Error("!!!");
        const message = `${location.host}/?c=${id}#${identifier}`;
        if (isIe) window.clipboardData.setData('Text', message);
        else      navigator.clipboard.writeText(message);
        if(span) span.replaceChildren(SVGS[4].cloneNode(true));
    } catch (e) {
        if(span) span.replaceChildren(SVGS[3].cloneNode(true));
    }
    if(span)
        setTimeout(()=>{ span.replaceChildren(SVGS[8].cloneNode(true)); },1000);
};

/**
 * 
 * @param {{title:string, conversation_id:number, current_node:string, mapping: Map<string,{message: {author: {role:"assistant"|"user"}, metadata:{model_slug?:string, resolved_model_slug?:string}, content:{content_type: "text", parts:string[]}, parent:string, children:string[]}}>}} doc 
 */
const processDoc = (doc,article_id)=>{
    if(!scrollable)
        return;
    if(typeof doc != "object")
        return;
    if(
        typeof doc.data == "object" &&
        typeof doc.data.biz_data == "object" &&
        typeof doc.data.biz_data.chat_session == "object" &&
        typeof doc.data.biz_data.chat_messages == "object"
    )
        doc = translateDS(doc,article_id);
    if(typeof doc.mapping != "object")
        return;
    scrollable.replaceChildren();
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                /**
                 * @type {HTMLElement}
                 */
                const element = entry.target;
                observer.unobserve(element);
                const message = doc.mapping[element.getAttribute("data-id")].message;
                let html = "";
                message.content.parts.forEach((value)=>{
                    html += value;
                });
                if(html == "")
                    html = "N/A";
                if(element.getAttribute("data-turn") != "assistant"){
                    element.querySelector("div.whitespace-pre-wrap").innerHTML = html;
                }else{
                    html = html.replace(/entity\["[a-zA-Z_]*","(.*?)","(.*?)"\]/g, "[$1](#)");
                    html = html.replace(/url(.*?)(.*?)/g, "[$1]($2)");
                    html = html.replace(/image_group(.*?)/g, "");
                    html = html.replace(/cite(.*?)(.*?)/g, "[#](#)");
                    html = html.replace(/cite(.*?)/g, "[#](#)");
                    html = html.replace(/genui{"pronunciation_block_widget_v4_audio_fix_v2":{"content":"(.*?)","pronunciation_hint":"(.*?)","pronunciation_language":"(.*?)"}}/g, "$1 ($2)");    
                    element.querySelector("div.markdown").innerHTML = marked.parse(html);
                }
            }
        });
    });
    /**
     * 
     * @param {Event} ev press event, attached to a button.
     */
    const btnEvent = (ev)=>{
        ev.preventDefault();
        /**
         * @type {HTMLElement}
         */
        const elm = ev.currentTarget;
        const span = elm.querySelector("span");
        try {
            const id = elm.closest("article").getAttribute("data-id");
            const message = doc.mapping[id].message;
            let html = "";
            message.content.parts.forEach((value)=>{
                html += value;
            });
            if (isIe) window.clipboardData.setData('Text', html);
            else      navigator.clipboard.writeText(html);
            span.replaceChildren(SVGS[4].cloneNode(true));
        } catch (e) {
            span.replaceChildren(SVGS[3].cloneNode(true));
        }
        if(span)
            setTimeout(()=>{ span.replaceChildren(SVGS[2].cloneNode(true)); },1000);
    }
    const render = (message,key, index = NaN) => {
            const article = 
                (message.author.role == "assistant") ?
                template_assistant.cloneNode(true):
                template_user     .cloneNode(true);
            const btn_holder = article.querySelector((message.author.role == "assistant")?"div.justify-start":"div.justify-end");
            observer.observe(article);   
            article.setAttribute("data-id",key);
            const btn1 = copy_answer_btn?.cloneNode(true);
            btn1.addEventListener("click",btnEvent);
            btn_holder.appendChild(btn1);
            if(!isNaN(index)){
                const indicator = answer_switch_btn.cloneNode(true);
                indicator.querySelector("div").innerText = `${index}/`;
                btn_holder.appendChild(indicator);
            }
            scrollable.appendChild(article);
    };
    let list = [];
    let firstKey = null;
    let lastNode = doc.current_node;
    while(lastNode){
        if(list.includes(lastNode))
            break;
        list = list.concat(lastNode);
        const node = doc.mapping[lastNode];
        firstKey = lastNode;
        lastNode = node.parent;
    }
    if(!firstKey){
        const [firstKeyTemp] = Object.keys(doc.mapping);
        firstKey = firstKeyTemp;
    }
    const renderTree = (key, index = NaN) => {
        if (!Object.hasOwn(doc.mapping, key))
            return;
        const content = doc.mapping[key];
        const message = content.message;
        if(message && message.content && message.content.content_type == "text")
            if(message.author.role == "assistant" || message.author.role == "user")
                if(list.length == 0 || list.includes(key))
        {
            render(message,key,index);
        }
        if(content.children.length > 1){
            for (let index = 0; index < content.children.length; index++) {
                const element = content.children[index];
                renderTree(element,index);
            }
        }else if(content.children.length){
            const element = content.children[0];
            renderTree(element);
        }
    }

    if(article_id && Object.hasOwn(doc.mapping, article_id)){
        /**
         * @type {{author: { role: "assistant" | "user" }, metadata: { model_slug?: string | undefined, resolved_model_slug?: string | undefined }, content: {content_type: "text",parts: string[]}, parent: string, children: string[]}}
         */
        let entry = doc.mapping[article_id];
        render(entry.message,article_id);
        do {
            article_id = entry.children.at(0);
            if(entry)
                entry = doc.mapping[article_id]
            else
                break;
        } while (entry.message.author.role != "assistant" || !entry.message.content || entry.message.content.content_type != "text");
        if(entry)
            render(entry.message,article_id);
    } else
        renderTree(firstKey);
    scrollable.firstElementChild?.querySelector("div.pt-12")?.classList.replace("pt-12","pt-3");
    scrollable.append(end_btn);
    scrollable.dispatchEvent(new Event("scroll"));
    scrollable.focus();
    document.title = doc.title;
};

/**
 * 
 * @param {{code:number, msg:string,data:{biz_code:number, biz_msg:string, biz_data:{chat_session:{title:string,current_message_id:number},chat_messages:{message_id:number,parent_id:number|null,role:"USER"|"ASSISTANT",fragments:{id:number,type:"REQUEST"|"THINK"|"RESPONSE"|"TIP",content:string}[]}[]}}}} doc 
 */
const translateDS = (doc,article_id)=>{
    /** @type {{title:string ,conversation_id:number ,mapping: Map<string,{message: {author: {role:"assistant"|"user"}, metadata:{model_slug?:string, resolved_model_slug?:string}, content:{content_type: "text", parts:string[]}, parent:string, children:string[]}}>}} */
    let ret = {};
    ret.title = doc.data.biz_data.chat_session.title;
    ret.current_node = doc.data.biz_data.chat_session.current_message_id;
    ret.conversation_id = 0;
    ret.mapping = {};
    const chat_messages = doc.data.biz_data.chat_messages;
    chat_messages.forEach((value)=>{
        let parts = [];
        value.fragments.forEach((value)=>{
            if(value.type == "RESPONSE" || value.type == "REQUEST"){
                parts = parts.concat(value.content);
            }
        })
        ret.mapping[value.message_id] = {
            "message": {
                "author": {
                    "role": value.role.toLowerCase()
                },
                "content": {
                    "content_type": "text",
                    parts
                }
            },
            "parent": value.parent_id,
            "children": []
        };
    });
    for (const key in ret.mapping) {
        if (!Object.hasOwn(ret.mapping, key)) continue;
        const element = ret.mapping[key];
        if(element.parent){
            const parent = ret.mapping[element.parent];
            parent.children = parent.children.concat(Number(key));
        }
        
    }
    return ret;
};

/**
 * 
 * @param {any} data 
 */
const processList = (data)=>{
    const debug_array_2 = JSON.parse(localStorage.getItem("pins") || "{}");
    if(!scrollable)
        return;
    scrollable.replaceChildren();
    for (const key in data) {
        if (!Object.hasOwn(data, key)) continue;
        /**
         * @type {string[]}
         */
        const links = data[key];
        const pinned_only = location.hash.startsWith("#pin");
        for (let index = 0; index < links.length; index++) {
            const link = links[index];
            if(pinned_only)
                if(!debug_array_2[`${link[0]}:${link[1]}`])
                    continue;
            const clone = template_link.cloneNode(true);
            const controls = clone?.querySelector("div[data-control]");
            if(pinned_only)
                if(controls)
                    controls.innerHTML = `<div class="touch:-me-2 touch:-ms-3.5 -ms-2.5 -me-1 flex flex-wrap items-center gap-y-4 p-1 select-none" style="mask-position: 0% 0%;"><button class="text-token-text-secondary hover:bg-token-bg-secondary rounded-lg" onclick="pinunpinMessage(this,'${link[0]}:${link[1]}')"><span class="flex items-center justify-center touch:w-10 h-8 w-8"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" class="icon"><use href="/assets/images/sprites-core.svg#13322a" fill="currentColor"></use></svg></span></button></div>`;
            const atag = clone.querySelector("a");
            atag.innerText = key;
            atag.href = `/?c=${link[0]}#${link[1]}`;
            scrollable.append(clone);
        }
    }
    scrollable.append(end_btn);
    scrollable.dispatchEvent(new Event("scroll"));
    scrollable.focus();
    document.title = title || "ChatGPT";
};