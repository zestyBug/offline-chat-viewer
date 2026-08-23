const shcemeQuery = '(prefers-color-scheme: dark)';
function getPreferredColorScheme() {
    const scheme = localStorage.getItem("prefered-color-scheme") || "system";
    if(scheme == "system")
        if (window.matchMedia) {
            let m = window.matchMedia(shcemeQuery);
            if(m.media !== shcemeQuery || m.matches){
                return 'dark';
            } else {
                return 'light';
            }
        }else{
            return 'light';
        }
    return scheme;
}
function updateColorScheme() {
    const scheme = getPreferredColorScheme();
    var d = document.documentElement,
        c = d.classList;
    c.remove('light', 'dark');
    if (scheme)
        c.add(scheme || '');
    if (scheme === 'light' || scheme === 'dark')
        d.style.colorScheme = scheme;
}
if (window.matchMedia) {
    var colorSchemeQuery = window.matchMedia(shcemeQuery);
    colorSchemeQuery.addEventListener('change', updateColorScheme);
}

updateColorScheme();

document.documentElement.setAttribute("data-chat-theme",localStorage.getItem("data-chat-theme") || "default");