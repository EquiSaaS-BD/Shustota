# Handoff & Context Document: Shustota AI

## ১. প্রজেক্টের বর্তমান অবস্থা (Current Project State)
Shustota AI-এর জন্য একটি প্রোডাকশন-গ্রেড, স্কেলেবল এবং সিকিউর ব্যাকএন্ড আর্কিটেকচার তৈরি করার কাজ চলছে। আমরা পুরানো SQLite-ভিত্তিক প্রোটোটাইপ থেকে সরে এসে **FastAPI, PostgreSQL (asyncpg), SQLAlchemy 2.0, এবং JWT-ভিত্তিক Authentication** সমৃদ্ধ একটি এন্টারপ্রাইজ আর্কিটেকচার তৈরি করেছি।

**ফ্রন্টএন্ডের অগ্রগতি:** ফ্রন্টএন্ডে (`Frontend/src/app/(auth)/register/page.tsx`) একটি প্রিমিয়াম, ৩-স্টেপ রেজিস্ট্রেশন ফর্ম এবং (`Frontend/src/app/(auth)/login/page.tsx`) লগইন পেজের UI ডিজাইন সম্পূর্ণ করা হয়েছে। এছাড়াও ল্যান্ডিং পেজে একটি প্রোমোশনাল ডেমো ভিডিও অ্যাড করা হয়েছে। 

**সর্বশেষ অবস্থা (১১ জুলাই):** Doctor, Hospital এবং Patient-এর জন্য আলাদা আলাদা পোল্টাল ও ড্যাশবোর্ড তৈরি করা হয়েছে। গ্লোবাল সাইডবার লজিক ফিক্স করা হয়েছে। Doctor Settings-এর Notifications পেজ রিডিজাইন করা হয়েছে এবং ড্যাশবোর্ডে Fullscreen অপশন যুক্ত করা হয়েছে। Turbopack এবং React `use client` সংক্রান্ত সকল Build Error সমাধান করা হয়েছে।

---

## [আপডেট: ১৪ জুলাই, ২০২৬] লাইভ ডোমেইন সংশোধন, ক্লিনআপ, ওজি ফিক্স এবং গুগল লগইন সিমুলেশন

### ১. কাজের ইতিহাস ও তারিখ (Changelog & Date)
**তারিখ:** ১৪ জুলাই, ২০২৬
আজকের সেশনে মূলত ডোমেইন কনফিগারেশন, অপ্রয়োজনীয় লাইব্রেরি রিমুভ্যাল, এসেট অপ্টিমাইজেশন এবং ডেমো ইন্টারেক্টিভ লজিক এড করা হয়েছে।

**ধাপে ধাপে সম্পন্ন কাজ:**
1. ✅ **লাইভ ডোমেইন ও মেটাডেটা আপডেট:** `layout.tsx`, `robots.ts` এবং `sitemap.ts` ফাইলে থাকা ভুল ডোমেইনটি রিমোভ করে সঠিক লাইভ লিঙ্কসমূহ যুক্ত করা হয়েছে (কাস্টম ডোমেইন: `https://shushthota.equisaas-bd.com`)।
2. ✅ **ফায়ারবেস ও ক্লাউডফ্লেয়ার ক্লিনআপ:** প্রজেক্টে ফায়ারবেসের ব্যবহার না থাকায় `src/lib/firebase.ts`, `firebase.json` এবং `.firebaserc` ফাইলগুলো মুছে ফেলা হয়েছে। এছাড়া `package.json` থেকে ক্লাউডফ্লেয়ার ও র‍্যাングラスমূহ প্যাকেজগুলো রিমোভ করা হয়েছে।
3. ✅ **ইউজ কেস ডায়াগ্রামের সিনট্যাক্স ফিক্স:** গিটহাবের README-তে Use Case Diagram রেন্ডারিং এরর ফিক্স করতে মারমেইডের স্ট্যান্ডার্ড ফ্লোচার্ট লেআউটে (`flowchart LR`) এটি রিরাইট করা হয়েছে।
4. ✅ **EquiSaaS BD ব্যাকলিংক যুক্ত করা:** ফ্রন্টএন্ডের `Footer.tsx` ফাইলে EquiSaaS BD-র জন্য একটি এসিও (SEO) অপ্টিমাইজড ব্যাকলিংক যুক্ত করা হয়েছে।
5. ✅ **ফ্যাভিকন এবং ওপেন গ্রাফ (OG) ইমেজ রেজোলিউশন:** Next.js App Router-এর নেটিভ স্ট্রাকচার অনুযায়ী ফ্যাভিকন ও ওজি ইমেজকে যথাক্রমে `src/app/icon.png` এবং `src/app/opengraph-image.png` এ শিফট করা হয়েছে এবং `metadataBase` ঠিক করা হয়েছে।
6. ✅ **গুগল লগইন সিমুলেশন (SSO Simulation):** লগইন পেজে সরাসরি গুগল সাইন-ইন সচল করার জন্য ডেমো ইন্টারেক্টিভ সিমুলেশন যুক্ত করা হয়েছে, যা ওয়ান-ক্লিকে "EquiSaaS Tester" হিসেবে ড্যাশবোর্ডে লগইন করায়।
7. ✅ **ক্লিন গিট হিস্ট্রি রিসেট:** গিটহাব রিপোজিটরিতে একদম ফ্রেশ ও প্রথম কমিট (`Initial commit: Production release`) ফোর্স পুশ করা হয়েছে যাতে পূর্ববর্তী সকল অপ্রয়োজনীয় কমিট ক্লিন থাকে।

### ২. ফাইল ও লজিক আপডেট

#### ডিলিট করা ফাইলসমূহ:
* **`src/lib/firebase.ts`** [DELETE]
* **`firebase.json`** [DELETE]
* **`.firebaserc`** [DELETE]
* রুট ডিরেক্টরিতে পূর্বে তৈরি হওয়া অতিরিক্ত টেম্পোরারি পাইথন ও জাভাস্ক্রিপ্ট ফাইল।

#### নতুন ও স্থানান্তরিত ফাইলসমূহ:
* **`src/app/icon.png`** [NEW] - ফ্যাভিকন রি-লোকেশন।
* **`src/app/opengraph-image.png`** [NEW] - ওপেন গ্রাফ সোশ্যাল মিডিয়া প্রিভিউ ইমেজ।

#### সম্পাদিত ফাইল:
* **`README.md`** - ইউজ কেস মারমেইড ডায়াগ্রাম সংশোধন।
* **`src/app/layout.tsx`** - `metadataBase` এবং JSON-LD স্কিমা ডোমেইন আপডেট।
* **`src/app/robots.ts`** & **`src/app/sitemap.ts`** - সitemap জেনারেশন বেস ইউআরএল আপডেট।
* **`src/components/layout/Footer.tsx`** - EquiSaaS BD-র ব্যাকলিংক যুক্ত করা।
* **`src/app/(auth)/login/page.tsx`** - গুগল লগইন বাটনে ইন্টারেক্টিভ মক অথেনটিকেশন ফাংশনালিটি যুক্ত।

---

## [আপডেট: ১১ জুলাই, ২০২৬] Role-Based Portals, Notifications & Fullscreen UI

### ১. কাজের ইতিহাস ও তারিখ (Changelog & Date)
**তারিখ:** ১১ জুলাই, ২০২৬ (রাত)
আজকের সেশনে মূলত ড্যাশবোর্ডগুলোর অ্যাক্সেস কন্ট্রোল, আলাদা পোর্টাল তৈরি, ইউজার রিডাইরেক্ট ফ্লো এবং কিছু স্পেসিফিক UI/UX সমস্যা সমাধান করা হয়েছে। 

**ধাপে ধাপে সম্পন্ন কাজ:**
1. ✅ **Role-Based Portals তৈরি:** Hospital এবং Patient-এর জন্য আলাদা Sidebar, Header এবং Dashboard Layout তৈরি করা হয়েছে যাতে এগুলো Doctor ড্যাশবোর্ডের সাথে কনফ্লিক্ট না করে।
2. ✅ **Global Sidebar Routing Bug Fix:** `/doctors` এবং `/hospitals` পাবলিক পেজে গেলে সাইডবার গায়েব হয়ে যেত (কারণ `.startsWith()` লজিক ভুল ছিল)। এটি ফিক্স করে এক্স্যাক্ট রাউট ম্যাচিং (`/doctor/` বা `/hospital/`) যুক্ত করা হয়েছে।
3. ✅ **Patient Redirect Flow:** পেশেন্টরা সাইনআপ বা লগইন করলে তাদের এখন সরাসরি `/chat` (AI Chat) পেজে রিডাইরেক্ট করা হচ্ছে।
4. ✅ **Notifications Settings Redesign:** Doctor Settings-এর নোটিফিকেশন পেজে React-এর অ্যান্টি-প্যাটার্ন (component inside component) ফিক্স করা হয়েছে। আইটেমগুলো (Push Notifications, Appointment Reminders ইত্যাদি) সুন্দরভাবে অ্যালাইন করা হয়েছে এবং বড় টেক্সটের ক্ষেত্রে ২য় লাইনে ট্রাঙ্কেট (truncate) করা হয়েছে।
5. ✅ **Fullscreen Dashboard:** `DoctorHeader`-এ একটি প্রফেশনাল Fullscreen টগল বাটন যুক্ত করা হয়েছে যা HTML5 Fullscreen API ব্যবহার করে ড্যাশবোর্ডকে ফুল-স্ক্রিন করে।
6. ✅ **Build Errors Fixed:** Next.js Turbopack-এর `CssSyntaxError` এবং `use client` মিসিং এররগুলো ফিক্স করে প্রোজেক্টকে বিল্ড-রেডি করা হয়েছে।

### ২. পূর্বের অবস্থা বনাম বর্তমান আপডেট

| বিষয় | আগের অবস্থা | বর্তমান আপডেট |
|---|---|---|
| **Role Dashboards** | সব রোল একই ড্যাশবোর্ড শেয়ার করছিল | Hospital এবং Patient-এর জন্য আলাদা ড্যাশবোর্ড ও সাইডবার |
| **Global Sidebar Bug** | `/doctors` পেজে গেলে গ্লোবাল সাইডবার গায়েব হয়ে যেত | শুধুমাত্র স্পেসিফিক ড্যাশবোর্ড রাউটে সাইডবার হাইড হয় |
| **Patient Login/Signup** | লগইন করলে `/patient/dashboard`-এ যেত | সরাসরি `/chat` পেজে রিডাইরেক্ট করা হচ্ছে |
| **Notifications UI** | টগল বাটন এবং লেখাগুলো এলোমেলো ছিল | Title উপরে এবং Description নিচে সুন্দরভাবে এক লাইনে সাজানো |
| **Dashboard Layout** | রেগুলার ব্রাউজার ভিউ | `DoctorHeader`-এ Fullscreen টগল যুক্ত করা হয়েছে |
| **Build State** | Next.js build ফেইল করছিল | `next build` সফলভাবে কমপ্লিট হচ্ছে |

### ৩. ফাইল ও লজিক আপডেট

#### নতুন ফাইল তৈরি:
* **`Frontend/src/components/hospital/*`** - `HospitalSidebar.tsx`, `HospitalHeader.tsx` তৈরি।
* **`Frontend/src/app/(app)/hospital/dashboard/*`** - Hospital-এর জন্য আলাদা লেআউট ও পেজ।
* **`Frontend/src/components/patient/*`** - `PatientSidebar.tsx`, `PatientHeader.tsx` তৈরি।
* **`Frontend/src/app/(app)/patient/dashboard/*`** - Patient-এর জন্য আলাদা লেআউট ও পেজ।

#### সম্পাদিত ফাইল:
* **`Frontend/src/app/(app)/layout.tsx`** - `isSpecialRoute` লজিক আপডেট করা হয়েছে (`=== "/doctor" || .startsWith("/doctor/")` ইত্যাদি)।
* **`Frontend/src/context/AuthContext.tsx`** - Patient লগইন রিডাইরেক্ট `/patient/dashboard` থেকে `/chat`-এ পরিবর্তন।
* **`Frontend/src/app/(app)/doctor/settings/notifications/page.tsx`** - `NotificationToggle` কম্পোনেন্টটি পেজের বাইরে বের করা হয়েছে এবং ফ্লেক্সবক্স (`truncate`, `flex-col`) ব্যবহার করে UI ঠিক করা হয়েছে।
* **`Frontend/src/components/doctor/DoctorHeader.tsx`** - `isFullscreen` স্টেট এবং `toggleFullscreen` ফাংশন যুক্ত করে Maximize/Minimize বাটন অ্যাড করা হয়েছে।
* **`Frontend/src/app/(auth)/register/*/page.tsx`** - সার্ভার-সাইড এরর এড়াতে `"use client"` ডিরেক্টিভ যুক্ত করা হয়েছে।

---

## [আপডেট: ১০ জুলাই, ২০২৬ - রাত] Patient Dashboard সম্পূর্ণ UI Build

### ১. কাজের ইতিহাস ও তারিখ (Changelog & Date)
**তারিখ:** ১০ জুলাই, ২০২৬ (সন্ধ্যা থেকে রাত পর্যন্ত)
আজকের সেশনে ব্যাপক পরিমাণ নতুন পেজ তৈরি এবং বিদ্যমান পেজগুলোর UX উন্নয়ন করা হয়েছে।

**ধাপে ধাপে সম্পন্ন কাজ:**
1. ✅ **Medicines পেজের সার্চ বার ফাংশনাল করা হয়েছে** - আগে সার্চ বার শুধু ভিজ্যুয়াল ছিল, এখন medicine name, generic name, বা company দিয়ে রিয়েল-টাইম ফিল্টার কাজ করে। Popular Searches ট্যাগে ক্লিক করলেও সেটি সার্চে যায়।
2. ✅ **Prescription Scanner-এ ফাইল আপলোড ফাংশনালিটি যুক্ত** - আগে শুধু ক্লিক করলেই ডেমো স্ক্যানিং শুরু হতো, এখন আসল ছবি আপলোড করতে হয়। আপলোড করা ছবি ব্যাকগ্রাউন্ডে দেখা যায় এবং তার উপর স্ক্যান অ্যানিমেশন চলে।
3. ✅ **Skeleton Loading (Shimmer Effect) সকল পেজে যুক্ত** - Medicines, Doctors, Hospitals পেজে 1.5 সেকেন্ডের প্রিমিয়াম Skeleton Loading ইফেক্ট।
4. ✅ **AI Nutrition Dashboard তৈরি** - ১৭টি সেকশনসহ একটি বিশাল, প্রিমিয়াম ড্যাশবোর্ড `/nutrition` রাউটে তৈরি।
5. ✅ **Reports পেজ তৈরি** - `/reports` রাউটে Lab Result, Prescription, Bill ক্যাটাগরি ফিল্টারসহ মেডিক্যাল রিপোর্ট ম্যানেজমেন্ট পেজ।
6. ✅ **Saved Items পেজ তৈরি** - `/saved` রাউটে বুকমার্ক করা ডাক্তার, হাসপাতাল, ওষুধ এবং আর্টিকেল দেখার পেজ।
7. ✅ **Booking Page Bug Fix** - `doctors/[id]/book/page.tsx`-এ `<option selected>` থেকে React warning ফিক্স করা হয়েছে `defaultValue` ব্যবহার করে।

### ২. পূর্বের অবস্থা বনাম বর্তমান আপডেট

| বিষয় | আগের অবস্থা | বর্তমান আপডেট |
|---|---|---|
| **Medicines সার্চ** | সার্চ বার শুধু ভিজ্যুয়াল, কোনো ফাংশন ছিল না | রিয়েল-টাইম ফিল্টারিং কাজ করে, Popular tags ক্লিকেবল |
| **Prescription Scanner** | ক্লিক করলেই ডেমো ডেটা দেখাতো | আসল ফাইল আপলোড (image/*), ছবির প্রিভিউ দেখায় |
| **Loading States** | কোনো loading UI ছিল না, সরাসরি ডেটা দেখাতো | সকল পেজে প্রিমিয়াম Skeleton Shimmer (1.5s) |
| **Nutrition Dashboard** | পেজটি ছিল না | সম্পূর্ণ নতুন 17-section ড্যাশবোর্ড তৈরি |
| **Reports পেজ** | ছিল না | নতুন তৈরি - সার্চ + ক্যাটাগরি ফিল্টার সহ |
| **Saved পেজ** | ছিল না | নতুন তৈরি - গ্রিড ভিউ, ক্যাটাগরি ফিল্টার সহ |
| **Booking Page** | Console warning ছিল (`selected` on `<option>`) | `defaultValue` দিয়ে ফিক্স করা হয়েছে |

### ৩. ফাইল ও লজিক আপডেট

#### নতুন ফাইল তৈরি:
* **`Frontend/src/app/(app)/nutrition/page.tsx`** - [NEW]
  - ১৭টি সেকশন: Nutrition Score, Calorie Progress, AI Food Scanner, Today's Meals, Body Goal Planner, Healthy Alternatives, Health Impact Analysis, AI Insights, Achievements
  - Desktop Right Sticky Panel (340px): Daily Snapshot, Reminders, Consult Nutritionist CTA
  - Mobile Sticky Bottom Bar (74px): Score, Calories, Book Expert button
  - Custom SVG Circular Progress bar
  - সম্পূর্ণ Skeleton Loading UI component
  - Primary Color: `#6DDA6E`

* **`Frontend/src/app/(app)/reports/page.tsx`** - [NEW]
  - ক্যাটাগরি: All, Lab Result, Prescription, Bill
  - প্রতিটি রিপোর্ট কার্ডে: Title, Date, Doctor, Size, Type Badge, View/Download buttons
  - সার্চ ফাংশনালিটি
  - Empty state UI

* **`Frontend/src/app/(app)/saved/page.tsx`** - [NEW]
  - ক্যাটাগরি: All, Doctor, Hospital, Medicine, Article
  - কার্ড গ্রিড (3-col desktop, 2-col tablet, 1-col mobile)
  - Remove (Trash) button, View/External link button
  - Image cover, Type badge, Rating/Price display

#### সম্পাদিত ফাইল:
* **`Frontend/src/app/(app)/medicines/page.tsx`** - [MODIFIED]
  - `searchQuery` state যুক্ত, input-এ `value` ও `onChange` bind
  - Popular tags-এ `onClick={() => setSearchQuery(tag)}` যুক্ত
  - `ECOMMERCE_MEDICINES.filter()` লজিক যুক্ত - name, generic, company দিয়ে ফিল্টার করে
  - Empty state ("No medicines found") UI যুক্ত
  - `isLoading` state ও `useEffect` দিয়ে 1.5s Skeleton Loading যুক্ত
  - Prescription Scanner: `<input type="file" accept="image/*">` যুক্ত, `URL.createObjectURL()` দিয়ে প্রিভিউ, আপলোড করা ছবি ব্যাকগ্রাউন্ডে `opacity-30` দিয়ে দেখায়

* **`Frontend/src/app/(app)/doctors/page.tsx`** - [MODIFIED]
  - `useEffect` import যুক্ত
  - `isLoading` state ও 1.5s timeout Skeleton Loading যুক্ত
  - 6টি ডাক্তার স্কেলিটন কার্ড (avatar circle + text bars)

* **`Frontend/src/app/(app)/hospitals/page.tsx`** - [MODIFIED]
  - `useEffect` import যুক্ত
  - `isLoading` state ও 1.5s timeout Skeleton Loading যুক্ত
  - 6টি হাসপাতাল স্কেলিটন কার্ড (image area + content bars)

* **`Frontend/src/app/(app)/doctors/[id]/book/page.tsx`** - [MODIFIED]
  - Gender `<select>`: `selected` attribute রিমুভ, `defaultValue=""` যুক্ত

---

## [আপডেট: ১০ জুলাই, ২০২৬] ফ্রন্টএন্ড পলিশিং এবং ভিডিও ইন্টিগ্রেশন

### ১. কাজের ইতিহাস ও তারিখ (Changelog & Date)
**তারিখ:** ১০ জুলাই, ২০২৬
আজকে মূলত ইউজার ইন্টারফেস (UI) এবং ইউজার এক্সপেরিয়েন্স (UX) এর ওপর কাজ করা হয়েছে। লগইন, রেজিস্ট্রেশন এবং ল্যান্ডিং পেজে প্রিমিয়াম লুক আনার জন্য বেশ কিছু পরিবর্তন করা হয়েছে।

### ২. পূর্বের অবস্থা বনাম বর্তমান আপডেট
- **আগের অবস্থা:** রেজিস্ট্রেশন এবং লগইন পেজে একটি মেডিকেল ব্যাকগ্রাউন্ড ইমেজ ছিল এবং কন্টেইনার উইডথ ফিক্সড ছিল। রেজিস্ট্রেশন পেজের ডিজাইন ছিল সাধারণ এবং এক পৃষ্ঠার। ল্যান্ডিং পেজে একটি AI চ্যাট মকআপ ছিল এবং ন্যাভবারে অতিরিক্ত ফাঁকা জায়গা ছিল।
- **বর্তমান আপডেট:** অথেনটিকেশন লেআউট থেকে ব্যাকগ্রাউন্ড ইমেজ সরিয়ে সম্পূর্ণ সাদা (White) ব্যাকগ্রাউন্ড এবং ফুল-স্ক্রিন করা হয়েছে। রেজিস্ট্রেশন পেজকে ৩-ধাপের (Who are you? -> Personal Info -> Password) ডাইনামিক পেজে রূপান্তর করা হয়েছে। ল্যান্ডিং পেজের চ্যাট মকআপ সরিয়ে সেখানে ইউজারের দেওয়া `video.mp4` যুক্ত করা হয়েছে এবং ন্যাভবারের এলাইনমেন্ট ঠিক করা হয়েছে। 

### ৩. ফাইল ও লজিক আপডেট
*   **`Frontend/src/app/(auth)/register/page.tsx`**: 
    *   সম্পূর্ণ নতুন করে লেখা হয়েছে। 
    *   ৩-স্টেপ সাইন আপ সিস্টেম ইমপ্লিমেন্ট করা হয়েছে। 
    *   ডেস্কটপে ২-কলাম এবং মোবাইলে ১-কলাম লেআউট করা হয়েছে।
    *   প্রাইমারি কালার হিসেবে `#70DE71` ব্যবহার করা হয়েছে এবং লোগো বড় করা হয়েছে। 
*   **`Frontend/src/app/(auth)/login/page.tsx`**: 
    *   রেজিস্ট্রেশন পেজের সাথে সামঞ্জস্য রেখে ব্যাকগ্রাউন্ড সাদা এবং লোগো বড় করা হয়েছে। 
*   **`Frontend/src/app/(auth)/layout.tsx`**: 
    *   পূর্বের ব্যাকগ্রাউন্ড ইমেজ (`auth-bg.png`) এবং `max-w-4xl` কনস্ট্রেইন্ট রিমুভ করে ফুল-স্ক্রিন করা হয়েছে। 
*   **`Frontend/src/components/layout/Navbar.tsx`**: 
    *   অতিরিক্ত ফাঁকা জায়গা (Gap) কমানোর জন্য লোগো এবং ডেস্কটপ মেনু লিংকগুলোকে বাম পাশে একত্রে (Group) এলাইন করা হয়েছে। 
*   **`Frontend/src/components/landing/HeroSection.tsx`**: 
    *   ডানদিকের AI Chat Mockup রিমুভ করে `video.mp4` যুক্ত করা হয়েছে। 
    *   ভিডিওটিতে একটি ইউনিক 3D হোভার ইফেক্ট (`rotateY`, `rotateX`), বর্ডার এবং শ্যাডো যুক্ত করা হয়েছে। 

---

## [পূর্ববর্তী আপডেট] ব্যাকএন্ড সেটআপ এবং আর্কিটেকচার

### ফাইল স্ট্রাকচার এবং পরিবর্তন (File Structure and Changes)
এই সেশনে `Backend/` ডিরেক্টরিতে ব্যাপক পরিবর্তন আনা হয়েছে। নিচে গুরুত্বপূর্ণ ফাইলগুলোর তালিকা দেয়া হলো:

*   **`main.py`**: অ্যাপ্লিকেশন এন্ট্রি পয়েন্ট হিসেবে নতুন করে লেখা হয়েছে। এখানে CORS, গ্লোবাল এক্সেপশন হ্যান্ডলার এবং রাউটারগুলো (Auth, Health) যুক্ত করা হয়েছে।
*   **`requirements.txt`**: প্রোডাকশন ডিপেন্ডেন্সিগুলো (fastapi, sqlalchemy[asyncio], asyncpg, alembic, argon2-cffi, python-jose, pydantic) নির্দিষ্ট ভার্সনসহ আপডেট করা হয়েছে।
*   **`app/core/`**: 
    *   `config.py`: Pydantic BaseSettings ব্যবহার করে এনভায়রনমেন্ট ভ্যারিয়েবল ম্যানেজমেন্ট।
    *   `database.py`: Async SQLAlchemy ইঞ্জিন এবং সেশন মেকার সেটআপ।
    *   `security.py`: Argon2 দিয়ে পাসওয়ার্ড হ্যাশিং এবং JWT টোকেন জেনারেশন/ভ্যালিডেশন।
    *   `exceptions.py` & `response.py`: কাস্টম এক্সেপশন এবং স্ট্যান্ডার্ড API রেসপন্স (JSONResponse) হ্যান্ডলিং।
*   **`app/models/`**: ডাটাবেস টেবিলগুলো তৈরি করা হয়েছে। 
    *   `user.py`, `patient_profile.py`, `doctor_profile.py`, `hospital_profile.py`: ইউজার এবং তাদের রোল-ভিত্তিক প্রোফাইল মডেল।
    *   `session.py`, `audit_log.py`: রিফ্রেশ টোকেন সেশন ট্র্যাকিং এবং অডিট লগিং মডেল।
*   **`app/schemas/`**: `auth.py`, `user.py`, `common.py` ইত্যাদি ফাইলে Pydantic v2 ব্যবহার করে রিকোয়েস্ট/রেসপন্স ভ্যালিডেশন স্কিমা লেখা হয়েছে।
*   **`app/auth/`**: 
    *   `service.py`: রেজিস্ট্রেশন, লগইন, টোকেন রিফ্রেশ এবং পাসওয়ার্ড পরিবর্তনের মূল বিজনেস লজিক।
    *   `dependencies.py`: API রাউট প্রোটেক্ট করার জন্য `get_current_user` এবং Role-Based Access Control (RBAC) ডিপেন্ডেন্সি।
*   **`app/api/v1/auth.py`**: Auth সার্ভিসের জন্য এন্ডপয়েন্টগুলো (register, login, logout, refresh, me) তৈরি করা হয়েছে।
*   **`alembic.ini` ও `alembic/env.py`**: Asyncpg ব্যবহার করে স্কিমা মাইগ্রেশনের জন্য Alembic কনফিগার করা হয়েছে।

### মূল লজিক এবং আর্কিটেকচার (Core Logic and Architecture)
*   **Authentication & Security**: আমরা HTTP-Only Cookie এবং Bearer Token উভয় মাধ্যমেই JWT (Access & Refresh) সাপোর্ট রেখেছি। পাসওয়ার্ড স্টোর করার জন্য Argon2id অ্যালগরিদম ব্যবহৃত হচ্ছে যা অত্যন্ত সুরক্ষিত।
*   **Session Management**: একটি `sessions` টেবিল তৈরি করা হয়েছে, যেখানে প্রতিটি লগইনের জন্য রিফ্রেশ টোকেন, আইপি অ্যাড্রেস এবং ইউজার-এজেন্ট স্টোর করা হচ্ছে। এর মাধ্যমে ইউজার চাইলে নির্দিষ্ট সেশন রিমুভ (Revoke) করতে পারবে।
*   **Role-Based Access Control (RBAC)**: ইউজার রেজিস্ট্রেশনের সময় `patient`, `doctor`, অথবা `hospital` রোল নির্ধারণ করা হচ্ছে এবং সেই অনুযায়ী আলাদা প্রোফাইল টেবিলে ডেটা রাখা হচ্ছে। API রাউটে পারমিশন চেক করার জন্য `RoleChecker` ক্লাস তৈরি করা হয়েছে।
*   **Standardized API Response**: ফ্রন্টএন্ডের সুবিধার জন্য প্রতিটি API থেকে একটি নির্দিষ্ট কাঠামোর JSON রেসপন্স পাঠানো হচ্ছে (`success`, `message`, `data`, `errors`, `timestamp`, `request_id`)।

### ডিপেন্ডেন্সি এবং কনফিগারেশন (Dependencies and Configuration)
*   **ডাটাবেস**: PostgreSQL ব্যবহার করার সিদ্ধান্ত নেয়া হয়েছে এবং `asyncpg` ড্রাইভার ইনস্টল করা হয়েছে। 
*   **প্যাকেজ**: `orjson` এবং `psycopg2` ইনস্টলেশনে সমস্যা হওয়ায় সেগুলোর বদলে স্ট্যান্ডার্ড `JSONResponse` এবং `asyncpg` ব্যবহার করা হয়েছে।
*   **এনভায়রনমেন্ট ভ্যারিয়েবল (`.env`)**: 
    *   `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`, `SECRET_KEY`, `ALGORITHM` ইত্যাদি ভ্যারিয়েবল সেট করা হয়েছে।

---

## ৪. পরবর্তী কাজ (Next Steps)
পরবর্তী AI এজেন্ট বা ডেভেলপারকে নিচের কাজগুলো সম্পন্ন করতে হবে:

### উচ্চ অগ্রাধিকার (High Priority)
1.  **Dashboard Content Implementation**: Hospital এবং Patient ড্যাশবোর্ডের লেআউট তৈরি হয়েছে, কিন্তু ভেতরের কন্টেন্ট (Widgets, Tables, Charts) ডেভেলপ করতে হবে।
2.  **Settings Panels**: Doctor-এর মতো Hospital এবং Patient-এর Settings পেজগুলোর UI তৈরি করা বাকি আছে।
3.  **Prescription Scanner Backend Integration**: `/medicines` পেজে Prescription Upload বর্তমানে ডেমো ডেটা দেখায়। এটিকে আসল OCR/AI API-এর সাথে কানেক্ট করতে হবে।
4.  **ডাটাবেস ইনিশিয়ালাইজেশন ও মাইগ্রেশন**: লোকাল PostgreSQL-এ `shustota_db` তৈরি করে `alembic upgrade head` রান করা।

### মাঝারি অগ্রাধিকার (Medium Priority)
5.  **Frontend-Backend Integration**: 
    *   `Frontend/src/context/AuthContext.tsx` আপডেট করে ব্যাকএন্ডের JWT (Access & Refresh token) সিস্টেমের সাথে কানেক্ট করা।
    *   রেজিস্ট্রেশন ডেটা `/api/v1/auth/register` এন্ডপয়েন্টে পাঠানো।
6.  **Sidebar Navigation আপডেট**: নতুন পেজগুলো (`/nutrition`, `/reports`, `/saved`) Sidebar-এ লিংক হিসেবে যুক্ত করতে হবে।
7.  **অতিরিক্ত এন্ডপয়েন্ট তৈরি**: Auth সম্পূর্ণ হওয়ার পর User Dashboard, Doctor, এবং Medicine API গুলোর কাজ শুরু করতে হবে।

### নিম্ন অগ্রাধিকার (Low Priority)
8.  **Reports পেজে PDF Viewer**: View বাটনে ক্লিক করলে ইন-ব্রাউজার PDF প্রিভিউ দেখানো।
9.  **Saved পেজে Bookmark API**: আসল bookmark/unbookmark API যুক্ত করা।
10. **Nutrition Dashboard**: Food Scanner-কে আসল AI image recognition API-এর সাথে যুক্ত করা।
