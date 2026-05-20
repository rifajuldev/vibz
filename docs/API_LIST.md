# vBiz / vibz — API contract (frontend-aligned)

This document lists the REST-style resources the **Next.js dashboard + public profile app** expect, so the backend can mirror payloads and query parameters. Until APIs exist, the UI persists **vCards** and **design settings** in **Redux + `localStorage`** via `redux-persist`.

Conventions:

- Base URL placeholder: `NEXT_PUBLIC_API_URL` (e.g. `https://api.example.com/v1`).
- Auth: `Authorization: Bearer <access_token>` after login; refresh flow already stubbed in RTK Query (`419` / `401` handling in `src/redux/api/api.ts`).
- JSON bodies unless noted; timestamps ISO-8601 strings.
- IDs: UUID strings for vCards and related entities.

---

## 1. Auth & session

| Method | Path                  | Purpose                                                                                 |
| ------ | --------------------- | --------------------------------------------------------------------------------------- |
| `POST` | `/auth/login`         | Email/password login; returns user + tokens.                                            |
| `POST` | `/auth/register`      | Sign up.                                                                                |
| `POST` | `/auth/logout`        | Invalidate session / cookies.                                                           |
| `POST` | `/auth/refresh-token` | Rotate access token (used by RTK base query).                                           |
| `GET`  | `/auth/me`            | Current user profile (shape compatible with `IUser` + Firebase-style fields if needed). |

**`GET /auth/me` response (example)**

```json
{
  "id": "uuid",
  "email": "user@example.com",
  "name": "Jane Doe",
  "role": "user",
  "createdAt": "2026-05-20T12:00:00.000Z",
  "updatedAt": "2026-05-20T12:00:00.000Z"
}
```

---

## 2. vCards (CRUD + public resolve)

The in-app type is `VCardRecord` = **`VCardData`** + list metadata (`views`, `saves`, `avatarImageUrl`, `isActive`, `id`, `createdAt`, `updatedAt`).

### 2.1 `VCardData` (core payload)

```json
{
  "slug": "zakir",
  "isPublic": true,
  "personal": {
    "fullName": "Zakir Hosen",
    "email": "…",
    "dob": "",
    "gender": "Male",
    "relationship": "Single",
    "profession": "",
    "designation": "FrontEnd Developer",
    "company": "",
    "phone": "",
    "whatsapp": "",
    "address": "",
    "about": "",
    "explainerVideoUrl": "https://cdn.example.com/explainer.mp4"
  },
  "theme": {
    "primaryColor": "#6366f1",
    "accentColor": "#f43f5e",
    "darkMode": true,
    "fontFamily": "inter"
  },
  "services": [],
  "portfolio": [],
  "socials": []
}
```

| Method   | Path                           | Purpose                                                                                            |
| -------- | ------------------------------ | -------------------------------------------------------------------------------------------------- |
| `GET`    | `/vcards`                      | List current user’s vCards (summary or full).                                                      |
| `POST`   | `/vcards`                      | Create; body = `VCardData` (server assigns `id`, stats, timestamps).                               |
| `GET`    | `/vcards/:id`                  | Fetch one by id.                                                                                   |
| `PATCH`  | `/vcards/:id`                  | Partial update (same paths as dashboard `updateData`, e.g. `personal.designation`).                |
| `PUT`    | `/vcards/:id`                  | Full replace of `VCardData` + accepted meta fields.                                                |
| `DELETE` | `/vcards/:id`                  | Delete.                                                                                            |
| `GET`    | `/public/vcards/by-slug/:slug` | Resolve **public** card by slug (for `/v/[slug]` SSR or edge cache). Returns `VCardRecord` or 404. |

**Query ideas**

- `GET /vcards?search=` — server-side search (dashboard passes search string).

**Analytics (optional)**

- `POST /vcards/:id/events` — `{ "type": "view" | "save", "metadata": {} }` to increment dashboard stats.

---

## 3. Account design settings (Settings → Template / Appearance)

Persisted in Redux as `designSettings` today; backend should store per user.

| Field               | Type                                                  | Notes                                                                            |
| ------------------- | ----------------------------------------------------- | -------------------------------------------------------------------------------- |
| `vcardPrimaryColor` | `string` (hex)                                        | **Highest priority** for public vCard theming when merged with per-card `theme`. |
| `vcardAccentColor`  | `string` (hex)                                        | Same.                                                                            |
| `dashboardAccent`   | `"indigo" \| "emerald" \| "amber" \| "rose" \| "sky"` | Drives dashboard CSS variables (`ThemeProvider`).                                |
| `fontFamily`        | `string`                                              | e.g. `inter`, `outfit`, `mono`, `serif` — maps to template typography.           |
| `layoutStyle`       | `string`                                              | e.g. `classic`, `hero`.                                                          |
| `buttonStyle`       | `string`                                              | e.g. `solid`, `glass`, `outline`, `soft`.                                        |
| `cornerStyle`       | `string`                                              | `square`, `soft`, `round`, `pill`.                                               |

| Method | Path                        | Purpose                   |
| ------ | --------------------------- | ------------------------- |
| `GET`  | `/users/me/design-settings` | Load.                     |
| `PUT`  | `/users/me/design-settings` | Replace all fields above. |

---

## 4. Media uploads (future)

The editor uses **blob URLs** locally; production APIs typically return HTTPS URLs.

| Method   | Path              | Purpose                                                                                                   |
| -------- | ----------------- | --------------------------------------------------------------------------------------------------------- |
| `POST`   | `/media/upload`   | Multipart `file` + `purpose` (`avatar`, `background`, `explainer`, …); returns `{ url, mimeType, size }`. |
| `DELETE` | `/media/:assetId` | Remove asset.                                                                                             |

After upload, frontend PATCHes `vcards/:id` with the returned `url` (e.g. `avatarImageUrl`, `personal.explainerVideoUrl`, or nested media fields when you extend the schema).

---

## 5. Push notifications (profile app)

The embedded profile app calls:

| Method | Path                  | Body                                                                          |
| ------ | --------------------- | ----------------------------------------------------------------------------- |
| `POST` | `/api/push/subscribe` | `{ subscription, cardOwnerId, subscriberInfo }` (Web Push subscription JSON). |

Backend should validate `cardOwnerId`, associate subscription with visitor, and store VAPID handling server-side.

---

## 6. AI / Live agent (optional)

Profile `LiveAgent` uses `@google/genai` client-side today. For production, proxy through your API:

| Method | Path               | Purpose                                                           |
| ------ | ------------------ | ----------------------------------------------------------------- |
| `POST` | `/ai/live-session` | Start/receive streaming tokens; body TBD from agent product spec. |

---

## 7. Slug rules & conflicts

- Slug: **lowercase**, `[a-z0-9-]` (frontend strips other chars).
- `409 Conflict` if slug already taken for another user (or globally, per product rules).
- Public URL pattern: `/v/:slug` on the marketing/host domain; dashboard may show `vbiz.me/:slug` as display only until DNS/routing is wired.

---

## 8. Migration from local Redux

When APIs go live:

1. On app init after login: `GET /vcards` + `GET /users/me/design-settings` → hydrate Redux (or replace slices with RTK Query caches).
2. Replace `replaceVCardData` / `addVCard` dispatches with optimistic RTK mutations + rollback.
3. Keep `redux-persist` only for offline cache or remove once reliable.

---

## 9. Error shape (recommended)

```json
{
  "statusCode": 400,
  "message": "Slug already taken",
  "errors": [{ "path": "slug", "code": "duplicate" }]
}
```

The existing RTK `fetchBaseQuery` layer can map this to user-visible toasts later.
