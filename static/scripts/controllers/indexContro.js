import { $ } from "../utils/selector.js";
import { escapeHTML } from "../utils/escapeHTML.js";
import { fetchMRTList, fetchAttractions } from "../models/indexModel.js";
import { renderMRTList, scrollMRTList, renderAttractions } from "../views/indexView.js";

let next_page = 0;
let current_keyword = "";

// IntersectionObserver(callback, options)
let observer = new IntersectionObserver(async (entries) => {
    let entry = entries[0];
    if (entry.isIntersecting && next_page !== null) {
        observer.unobserve(entry.target); // 載入後就不要再觀察，避免重複載入
        await loadAttractions(next_page, current_keyword);
    }
}, { rootMargin: "250px" });// 擴大根元素的邊界 // root 用來設置觀察的根元素，若不設置默認為 viewport

export function initPage() {
    renderInitialData();
    bindEvents();
}

async function renderInitialData() {
    let mrtList = await fetchMRTList();
    renderMRTList(mrtList);
    await loadAttractions(0);
}

function bindEvents() {
    $(".arrow_left").addEventListener("click", () => scrollMRTList("left"));
    $(".arrow_right").addEventListener("click", () => scrollMRTList("right"));
    $(".search_btn").addEventListener("click", handleSearch);
    $(".search_input").addEventListener("keydown", (e) => {
        if (e.key === "Enter") handleSearch();
    });
    $(".mrt_list").addEventListener("click", (e) => {
        let keyword = e.target.textContent;
        current_keyword = keyword;
        observer.disconnect();// 先停止監聽，避免 observer 觸發額外請求
        loadAttractions(0, keyword);
    });
}

async function handleSearch() {
    let keyword = $(".search_input").value.trim();
    $(".search_input").value = "";
    if (!keyword) return; // 沒有關鍵字禁止觸發請求
    current_keyword = keyword;
    observer.disconnect(); // 先停止監聽，避免 observer 觸發額外請求
    await loadAttractions(0, keyword);
}

async function loadAttractions(page, keyword = "") {
    try {
        let data = await fetchAttractions(page, keyword);
        if (page === 0 && keyword) {$(".content").innerHTML = "";};

        let attractionList = data.data.map(attraction => {
            return {
                id: attraction.id,
                img: attraction.images[0],
                name: escapeHTML(attraction.name || ""),
                mrt: escapeHTML(attraction.mrt || ""),
                category: escapeHTML(attraction.category || "")
            };
        });

        renderAttractions(attractionList);
        next_page = data.nextPage;

        if (next_page !== null) {
            observer.observe($(".footer"));
        }
    } catch (err) {
        console.error("加載景點數據出錯:", err);
    }
}
