export async function verifyToken() {
    let token = getToken();
    if (!token) return null;

    try {
        const res = await fetch("/api/user/auth", {
            headers: { Authorization: `Bearer ${token}` }
        });

        if (res.ok) return token
        else {
            // removeToken()
            return null;
        };
        
    } catch(err) {
        console.error(err);
        return null;
    }
}

export function getToken() {
    return localStorage.getItem("token");
}

export function removeToken() {
    localStorage.removeItem("token");
}