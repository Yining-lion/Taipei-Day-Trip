import { $ } from "../utils/selector.js";

export function renderMRTList(mrtList) {
    mrtList.forEach(mrt => {
        const p = document.createElement("p");
        p.textContent = mrt;
        p.className = "mrt_list_text";
        $(".mrt_list").appendChild(p);
    });
}

export function scrollMRTList(direction) {
    const scrollAmount = 200;
    if (direction === "left") {$(".mrt_list").scrollLeft -= scrollAmount};
    if (direction === "right") {$(".mrt_list").scrollLeft += scrollAmount};
}

export function renderAttractions(attractionList) {
    attractionList.forEach(({ id, img, name, mrt, category }) => {
        const attractionHTML = `
            <div class="attraction">
                <a href="/attraction/${id}">
                    <div class="attraction_top" style="background-image: url(${img})">
                        <p class="attraction_name body-bold">${name}</p>
                    </div>
                </a>
                <div class="attraction_buttom body-medium">
                    <p class="attraction_mrt">${mrt}</p>
                    <p class="attraction_category">${category}</p>
                </div>
            </div>
        `;
        $(".content").insertAdjacentHTML("beforeend", attractionHTML);
    });
}
