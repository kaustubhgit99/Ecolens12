# 🌿 EcoLens — Civic Intelligence Platform

A full prototype of EcoLens built with **Next.js 15 · TypeScript · Tailwind CSS · Chart.js · Zustand**.

All data is mocked — no backend required. Auth is simulated with role switching.

---

## 🚀 Deploy to Vercel (Recommended)

### Option 1 — Vercel CLI (fastest)

```bash
npm install -g vercel
cd ecolens
npm install
vercel
```

Follow the prompts. Vercel auto-detects Next.js — no extra config needed.

### Option 2 — Vercel Dashboard (drag & drop)

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **"Import Git Repository"** or drag the project folder
3. Framework: **Next.js** (auto-detected)
4. Click **Deploy** — done in ~60 seconds

### Option 3 — GitHub → Vercel (auto-deploy)

```bash
git init
git add .
git commit -m "Initial EcoLens prototype"
gh repo create ecolens --public --push --source=.
```

Then connect the repo at [vercel.com/new](https://vercel.com/new).

---

## 💻 Run Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 🎭 Mock Auth — Roles

On the login screen, choose:

| Role | Access |
|------|--------|
| 🌱 **Citizen** | Dashboard, Report Issue, My Complaints, Leaderboard, EcoWallet |
| 🏛️ **Authority** | Authority Dashboard, Complaint Queue, Heatmap, Analytics, Resolution History |
| ⚡ **Admin** | City Metrics, Department Performance, Citizen Engagement |

---

## 📁 Structure

```
ecolens/
├── app/
│   ├── login/          # Mock login page
│   ├── citizen/        # Citizen pages
│   ├── authority/      # Authority pages
│   └── admin/          # Admin pages
├── components/
│   ├── layout/         # DashboardLayout + Sidebar
│   └── shared/         # Badges, reusable UI
├── lib/
│   ├── mockData.ts     # All mock data
│   └── utils.ts        # Badge helpers
└── stores/
    └── useAuthStore.ts # Zustand auth state
```

---

## 🔌 Wiring Up the Backend

When you're ready to integrate Supabase:

1. Add your env vars to Vercel dashboard or `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
   ```

2. Replace imports from `@/lib/mockData` with Supabase queries
3. Swap `useAuthStore` mock login with `supabase.auth.signInWithPassword()`

---

## 🛠 Tech Stack

- **Next.js 15** — App Router
- **TypeScript** — Full type safety
- **Tailwind CSS** — Utility styling
- **Chart.js** — All dashboard charts
- **Zustand** — Auth state (persisted)
- **Lucide React** — Icons (available, not yet used)
