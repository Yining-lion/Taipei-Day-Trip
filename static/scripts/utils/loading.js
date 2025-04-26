import { $ } from "./selector.js"

let spinnerHTML = `<div class="cssload-spin-box hidden"></div>`
document.body.insertAdjacentHTML("afterbegin", spinnerHTML)

let loadingTimer;

export function showLoading(delay = 300) {
    loadingTimer = setTimeout(() => {
                    $(".cssload-spin-box").classList.remove("hidden")
                }, delay)
}

export function hideLoading() {
    clearTimeout(loadingTimer);
    $(".cssload-spin-box").classList.add("hidden");
}

export function showLoadingBtn(element) {
    element.classList.add('loading');
}

export function deleteLoadingBtn(element) {
    element.classList.remove('loading');
}