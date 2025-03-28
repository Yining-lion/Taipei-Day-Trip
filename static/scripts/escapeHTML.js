// 對特定符號進行轉義，防止 XSS 攻擊
export function escapeHTML(str) {
    return str.replace(/[&<>"']/g, function (char) {
        return {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        }[char];
    });
};