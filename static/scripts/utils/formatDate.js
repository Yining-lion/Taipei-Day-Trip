// 只能選明天以後的日期
export function formatDate(date) {
    date.setDate(date.getDate() + 1);
    let yyyy = date.getFullYear();
    let mm = String(date.getMonth()+1).padStart(2, "0");
    let dd = String(date.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
}