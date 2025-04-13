export async function signup({ name, email, password }) {
    try {
        let res = await fetch("/api/user", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password })
        });
        return await res.json();
    } catch (err) {
        console.error(err);
    }
}

export async function signin({ email, password }) {
    try {
        let res = await fetch("/api/user/auth", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });
        return await res.json();
    } catch (err) {
        console.error(err);
    }
}

export async function getCurrentUser(token) {
    try {
        let res = await fetch("/api/user/auth", {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });
        return await res.json();
    } catch (err) {
        console.error(err);
    }
}