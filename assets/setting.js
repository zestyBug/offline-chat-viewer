//updateColorScheme

const setting_template = (new DOMParser()).parseFromString(`<div role="dialog" data-state="open" class="popover bg-token-main-surface-primary relative start-1/2 col-auto col-start-2 row-auto row-start-2 h-full w-full text-start ltr:-translate-x-1/2 rtl:translate-x-1/2 rounded-2xl shadow-long flex flex-col focus:outline-hidden overflow-hidden h-[100%] md:max-h-[600px] md:min-h-[600px] md:max-w-[680px]" tabindex="-1" style="pointer-events: auto;"><header class="min-h-header-height flex justify-between py-2.5 ps-4 pe-2 select-none"><div class="flex max-w-full items-center"><p class="flex max-w-full min-w-0 grow flex-col"></p></div><div class="flex h-[max-content] items-center gap-2"><button class="hover:bg-token-surface-hover dark:hover:bg-token-main-surface-tertiary keyboard-focused:bg-token-surface-hover flex h-8 w-8 items-center justify-center rounded-lg bg-transparent" title="Close" type="button"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" class="icon"><use href="/assets/images/sprites-core.svg#85f94b" fill="currentColor"></use></svg></button></div></header><div class="grow overflow-y-auto"><div id="radix-_R_676767_" class="flex max-h-[calc(100vh-150px)] w-full flex-col gap-3 overflow-y-auto md:min-h-[380px] p-4 pt-1"></div></div></div>`,"text/html");
const setting_first_child = setting_template.body.firstChild;
const setting_section = setting_template.getElementById("radix-_R_676767_");
const setting_close_btn = setting_template.querySelector("button");

setting_template.querySelector("p").innerText = "Settings";
setting_close_btn.addEventListener("click",(ev)=>{
    closePopup(ev,true);
});

const setting_section_3 = (new DOMParser()).parseFromString(`<div class="border-token-border-light flex min-h-15 items-center border-b py-2 last-of-type:border-none w-full justify-between"><div class="flex flex-col"><div>Color Scheme</div><div class="text-xs text-token-text-tertiary pe-12 my-1 pe-12!">Prefered interface scheme</div></div><select class="text-sm btn-secondary cursor-pointer h-min w-fit items-center rounded-lg border py-2 text-start" title="Select personality" type="button"></select></div>`,"text/html").body.firstElementChild;
const setting_section_3_select = setting_section_3.querySelector("select");
const setting_section_3_cb = (ev)=>{
    localStorage.setItem("prefered-color-scheme",setting_section_3_select.value);
    updateColorScheme();
}
setting_section.appendChild(setting_section_3);

const setting_section_2 = (new DOMParser()).parseFromString(`<div class="border-token-border-light flex min-h-15 items-center border-b py-2 last-of-type:border-none w-full justify-between"><div class="flex flex-col"><div>Color Theme</div><div class="text-xs text-token-text-tertiary pe-12 my-1 pe-12!">The conversation color theme</div></div><select class="text-message user-message-bubble-color text-sm btn-secondary cursor-pointer h-min w-fit items-center rounded-lg border py-2 text-start" title="Select personality" type="button"></select></div>`,"text/html").body.firstElementChild;
const setting_section_2_select = setting_section_2.querySelector("select");
const setting_section_2_cb = (ev)=>{
    document.documentElement.setAttribute("data-chat-theme",setting_section_2_select.value);
                     localStorage.setItem("data-chat-theme",setting_section_2_select.value);
};
setting_section.appendChild(setting_section_2);


const setting_section_1 = (new DOMParser()).parseFromString(`<div class="border-token-border-light flex min-h-15 border-b py-2 last-of-type:border-none w-full flex-col gap-2"><div class="text-body-small-emphasized [font-weight:500]">Pinned messages</div><textarea class="bg-token-main-surface-primary w-full focus:ring-transparent rounded-lg border text-sm focus-token-border-heavy border-token-border-default placeholder:text-gray-400 overflow-y-auto" placeholder="Please respect the JSON structure" rows="1" style="vertical-align: top; height: 78px;" type="button" aria-haspopup="dialog" aria-expanded="false"></textarea><div class="flex items-center justify-between"><div></div><div class="flex flex-row gap-2"><button class="btn relative btn-secondary btn-small"><div class="flex items-center justify-center">Save</div></button></div></div></div>`,"text/html").body.firstElementChild;
const setting_section_1_area = setting_section_1.querySelector("textarea");
const setting_section_1_btn  = setting_section_1.querySelector("button");
setting_section_1_btn.addEventListener("click",(ev)=>{
    ev.preventDefault();
    ev.stopPropagation();
    const str = setting_section_1_area.value;
    try {
        const res = JSON.stringify(str);
        if(res){
            localStorage.setItem("pins",str);
            renderToast("success",false);
        }else{
            renderToast("invalid input");
        }
    } catch (error) {
        renderToast(error);
    }
});
setting_section.appendChild(setting_section_1);


function setting_open(ev) {
    ev.preventDefault();
    ev.stopPropagation();

    setting_section_1_area.innerText = localStorage.getItem("pins") || "{}";  
    
    setting_section_3_select.removeEventListener("change",setting_section_3_cb);
    setting_section_3_select.replaceChildren();
    const current_scheme = localStorage.getItem("prefered-color-scheme") || "system";
    ["system", "dark", "light"].forEach((value)=>{
        const option = document.createElement("option");
        option.setAttribute("value",value);
        option.innerText = value;
        current_scheme == value && option.setAttribute("selected","");
        setting_section_3_select.appendChild(option);
    });
    setting_section_3_select.addEventListener("change",setting_section_3_cb);


    const current_theme = localStorage.getItem("data-chat-theme") || "default";
    setting_section_2_select.removeEventListener("change",setting_section_2_cb);
    setting_section_2_select.replaceChildren();
    ["default", "blue", "green", "yellow", "purple", "pink", "orange", "black", "custom"].forEach((value)=>{
        const option = document.createElement("option");
        option.setAttribute("value",value);
        option.innerText = value;
        current_theme == value && option.setAttribute("selected","");
        setting_section_2_select.appendChild(option);
    });
    setting_section_2_select.addEventListener("change",setting_section_2_cb);
    
    renderPopup(setting_first_child);
    setting_close_btn.focus();
}
