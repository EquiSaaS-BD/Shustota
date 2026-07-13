const API_BASE_URL = "http://127.0.0.1:8000/api/v1";

// Helper for fetch with credentials
async function fetchWithCreds(endpoint: string, options: RequestInit = {}) {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    credentials: "include", // Important for sending/receiving HTTP-only cookies
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "An error occurred");
  }

  return await res.json();
}

export async function apiRegister(data: any) {
  return fetchWithCreds("/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function apiLogin(data: any) {
  return fetchWithCreds("/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function apiLogout() {
  return fetchWithCreds("/auth/logout", {
    method: "POST",
  });
}

export async function apiGetMe() {
  return fetchWithCreds("/auth/me", {
    method: "GET",
  });
}

export async function apiGetProfile() {
  return fetchWithCreds("/profile/me", {
    method: "GET",
  });
}

export async function apiUpdateProfile(data: any) {
  return fetchWithCreds("/profile/me", {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function fetchDoctors() {
  try {
    return await fetchWithCreds("/doctors");
  } catch (error) {
    // Return mock data for UI demonstration if backend is down
    return [
      {
        id: 1,
        name: "Dr. Anisur Rahman",
        specialty: "Cardiologist",
        degree: "MBBS, MD (Cardiology)",
        hospital: "National Heart Foundation",
        rating: 4.8,
        image: "https://i.pravatar.cc/150?u=anis",
        fees: 1000
      },
      {
        id: 2,
        name: "Dr. Salma Begum",
        specialty: "Neurologist",
        degree: "MBBS, FCPS (Neurology)",
        hospital: "Square Hospital",
        rating: 4.9,
        image: "https://i.pravatar.cc/150?u=salma",
        fees: 1200
      }
    ];
  }
}

export async function fetchMedicines() {
  try {
    return await fetchWithCreds("/medicines");
  } catch (error) {
    // Return mock data for UI demonstration if backend is down
    return [
      {
        id: 1,
        name: "Napa Extra",
        generic: "Paracetamol + Caffeine",
        company: "Beximco Pharmaceuticals Ltd.",
        price: 2.50,
        type: "Tablet"
      },
      {
        id: 2,
        name: "Sergel 20",
        generic: "Esomeprazole",
        company: "Healthcare Pharmaceuticals Ltd.",
        price: 7.00,
        type: "Capsule"
      }
    ];
  }
}

export async function fetchDashboardStats() {
  try {
    return await fetchWithCreds("/dashboard/stats");
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function analyzeChatSymptoms(text: string, language: string = "bn") {
  try {
    return await fetchWithCreds("/chat/analyze", {
      method: "POST",
      body: JSON.stringify({ text, language }),
    });
  } catch (error) {
    console.error(error);
    return null;
  }
}
