export default function DoctorSettingsPage() {
  return (
    <>

{/*  TopNavBar  */}
<nav className="bg-surface/80 backdrop-blur-md dark:bg-surface-dim/80 fixed top-0 w-full z-50 border-b border-outline-variant/30 shadow-sm">
<div className="flex justify-between items-center h-16 px-gutter max-w-7xl mx-auto">
<div className="flex items-center gap-md">
<span className="font-display text-headline-md font-bold text-primary dark:text-primary-fixed-dim tracking-tight">Shustota</span>
</div>
<div className="hidden md:flex gap-lg font-body-md text-body-md">
<a className="text-on-surface-variant dark:text-on-surface-variant hover:text-primary hover:bg-primary-container/10 transition-colors duration-200 active:scale-95 transition-transform px-sm py-xs rounded" href="#">Dashboard</a>
<a className="text-on-surface-variant dark:text-on-surface-variant hover:text-primary hover:bg-primary-container/10 transition-colors duration-200 active:scale-95 transition-transform px-sm py-xs rounded" href="#">Patients</a>
<a className="text-on-surface-variant dark:text-on-surface-variant hover:text-primary hover:bg-primary-container/10 transition-colors duration-200 active:scale-95 transition-transform px-sm py-xs rounded" href="#">AI Insights</a>
<a className="text-on-surface-variant dark:text-on-surface-variant hover:text-primary hover:bg-primary-container/10 transition-colors duration-200 active:scale-95 transition-transform px-sm py-xs rounded" href="#">Protocols</a>
<a className="text-primary dark:text-primary-fixed-dim font-semibold border-b-2 border-primary pb-1 px-sm py-xs" href="#">Profile</a>
</div>
<div className="flex items-center gap-sm">
<button className="font-label-md text-label-md text-primary bg-primary-container/10 hover:bg-primary-container/20 px-md py-sm rounded-lg transition-colors duration-200">Login</button>
<button className="font-label-md text-label-md bg-primary text-on-primary hover:bg-primary/90 px-md py-sm rounded-lg transition-colors duration-200 shadow-sm">Sign Up</button>
</div>
</div>
</nav>
{/*  Main Content Canvas  */}
<main className="flex-grow pt-[88px] pb-3xl px-gutter max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-lg items-start">
{/*  Sidebar Navigation  */}
<aside className="lg:col-span-3 bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-md flex flex-col gap-sm sticky top-[104px]">
<h2 className="font-headline-sm text-headline-sm text-on-surface mb-sm px-sm">Settings</h2>
<button className="flex items-center gap-sm px-md py-sm rounded-lg bg-primary-container/10 text-primary font-body-md text-body-md font-semibold text-left w-full transition-colors">
<span className="material-symbols-outlined icon-filled">person</span>
                ব্যক্তিগত তথ্য
            </button>
<button className="flex items-center gap-sm px-md py-sm rounded-lg text-on-surface-variant hover:bg-surface-container-low hover:text-primary font-body-md text-body-md text-left w-full transition-colors">
<span className="material-symbols-outlined">calendar_month</span>
                চেম্বার ও সময়সূচী
            </button>
<button className="flex items-center gap-sm px-md py-sm rounded-lg text-on-surface-variant hover:bg-surface-container-low hover:text-primary font-body-md text-body-md text-left w-full transition-colors">
<span className="material-symbols-outlined">school</span>
                ডিগ্রি ও সনদ
            </button>
<button className="flex items-center gap-sm px-md py-sm rounded-lg text-on-surface-variant hover:bg-surface-container-low hover:text-primary font-body-md text-body-md text-left w-full transition-colors">
<span className="material-symbols-outlined">payments</span>
                পরামর্শ ফি
            </button>
</aside>
{/*  Main Form Area  */}
<section className="lg:col-span-9 flex flex-col gap-lg">
{/*  Profile Header  */}
<div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-lg flex flex-col md:flex-row items-center md:items-start gap-lg relative overflow-hidden">
<div className="w-32 h-32 rounded-full overflow-hidden border-4 border-surface bg-surface-container-low shadow-sm flex-shrink-0 relative group">
<img className="w-full h-full object-cover" data-alt="A professional headshot of a doctor in a modern clinical setting, soft natural lighting, light blue scrubs, high resolution, trustworthy appearance." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAhUEFa9TQf7pjwVs_3kRSeyHf_hJWRftKR8QiftEvhC5EVaKej7GUy7w5CEGGHSkK3u7ABGmNww14qf2PlTPO26G22DhL83S8kWp9NP9bP2Vvs5mDhTvchamU1x6wrihYpmgz57KiZQImpuHNXYmzUxVtGFGMJYmFd1CRL218weH2JzPOVefvtHmJnA9Ta6aZu4DBO5_9yT7Z0RGMB3wezhjufxWbNFYvY3ADk78jCNxYxaEbrS8zJcOp2fRswcSDyDMNHk3NDlMHl"/>
<div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
<span className="material-symbols-outlined text-white">photo_camera</span>
</div>
</div>
<div className="flex-grow text-center md:text-left flex flex-col justify-center h-full pt-sm">
<div className="flex items-center justify-center md:justify-start gap-sm mb-xs">
<h1 className="font-headline-lg text-headline-lg text-on-surface">ডাঃ নাফিস আহমেদ</h1>
<span className="material-symbols-outlined text-tertiary-container icon-filled" title="Verified Professional">verified</span>
</div>
<p className="font-body-lg text-body-lg text-on-surface-variant mb-md">হৃদরোগ বিশেষজ্ঞ (Cardiologist)</p>
<div className="flex items-center justify-center md:justify-start gap-sm">
<label className="relative inline-flex items-center cursor-pointer">
<input defaultChecked={false} className="sr-only peer" type="checkbox" value=""/>
<div className="w-11 h-6 bg-outline-variant rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-outline-variant after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-tertiary-container"></div>
<span className="ms-3 font-label-md text-label-md text-on-surface-variant">অনলাইনে আছেন</span>
</label>
</div>
</div>
{/*  Decorative element  */}
<div className="absolute top-0 right-0 w-64 h-64 bg-secondary-container/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
</div>
{/*  Personal Info Form  */}
<div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-lg flex flex-col gap-lg">
<h3 className="font-headline-md text-headline-md text-on-surface border-b border-outline-variant/20 pb-sm">ব্যক্তিগত তথ্য</h3>
<div className="grid grid-cols-1 md:grid-cols-2 gap-md">
<div className="flex flex-col gap-xs">
<label className="font-label-md text-label-md text-on-surface-variant">সম্পূর্ণ নাম</label>
<input className="form-input rounded-lg border-outline-variant focus:border-primary focus:ring focus:ring-primary/20 font-body-md text-on-surface bg-surface-bright" type="text" value="ডাঃ নাফিস আহমেদ"/>
</div>
<div className="flex flex-col gap-xs">
<label className="font-label-md text-label-md text-on-surface-variant">বিশেষজ্ঞতা</label>
<select className="form-select rounded-lg border-outline-variant focus:border-primary focus:ring focus:ring-primary/20 font-body-md text-on-surface bg-surface-bright">
<option>হৃদরোগ বিশেষজ্ঞ (Cardiology)</option>
<option>স্নায়ুরোগ বিশেষজ্ঞ (Neurology)</option>
<option>শিশু বিশেষজ্ঞ (Pediatrics)</option>
</select>
</div>
<div className="flex flex-col gap-xs">
<label className="font-label-md text-label-md text-on-surface-variant">অভিজ্ঞতা (বছর)</label>
<input className="form-input rounded-lg border-outline-variant focus:border-primary focus:ring focus:ring-primary/20 font-body-md text-on-surface bg-surface-bright" type="number" value="12"/>
</div>
<div className="flex flex-col gap-xs">
<label className="font-label-md text-label-md text-on-surface-variant">রেজিস্ট্রেশন নম্বর (BMDC)</label>
<input className="form-input rounded-lg border-outline-variant focus:border-primary focus:ring focus:ring-primary/20 font-body-md text-on-surface bg-surface-bright" type="text" value="A-45678"/>
</div>
</div>
<div className="flex flex-col gap-xs">
<label className="font-label-md text-label-md text-on-surface-variant">সংক্ষিপ্ত জীবনী</label>
<textarea className="form-textarea rounded-lg border-outline-variant focus:border-primary focus:ring focus:ring-primary/20 font-body-md text-on-surface bg-surface-bright resize-none" rows={4}>ডাঃ নাফিস আহমেদ একজন স্বনামধন্য হৃদরোগ বিশেষজ্ঞ। তিনি গত ১২ বছর ধরে সফলতার সাথে হৃদরোগীদের চিকিৎসা প্রদান করে আসছেন।</textarea>
</div>
</div>
{/*  Action Bar  */}
<div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-md flex flex-col sm:flex-row justify-end items-center gap-md sticky bottom-md z-40 shadow-[0_-4px_12px_rgba(9,30,66,0.05)]">
<button className="w-full sm:w-auto font-label-md text-label-md text-primary border border-primary hover:bg-primary/5 px-xl py-sm rounded-lg transition-colors duration-200">প্রিভিউ দেখুন</button>
<button className="w-full sm:w-auto font-label-md text-label-md bg-primary text-on-primary hover:bg-primary/90 px-xl py-sm rounded-lg transition-colors duration-200 shadow-sm flex items-center justify-center gap-xs">
<span className="material-symbols-outlined text-[18px]">save</span>
                    পরিবর্তন সেভ করুন
                </button>
</div>
</section>
</main>
{/*  Footer  */}
<footer className="bg-surface-container-low dark:bg-surface-container-lowest border-t border-outline-variant/20 w-full mt-auto">
<div className="flex flex-col md:flex-row justify-between items-center py-xl px-gutter gap-md max-w-7xl mx-auto">
<span className="font-display text-headline-sm font-semibold text-primary">Shustota</span>
<p className="font-body-sm text-body-sm text-secondary dark:text-secondary-fixed-dim text-center md:text-left">© 2024 Shustota AI Healthcare. For professional use only.</p>
<div className="flex flex-wrap justify-center gap-md font-body-sm text-body-sm text-on-surface-variant dark:text-on-surface-variant">
<a className="hover:text-primary dark:hover:text-primary-fixed transition-colors opacity-100 hover:opacity-80" href="#">Medical Disclaimer</a>
<a className="hover:text-primary dark:hover:text-primary-fixed transition-colors opacity-100 hover:opacity-80" href="#">Privacy Policy</a>
<a className="hover:text-primary dark:hover:text-primary-fixed transition-colors opacity-100 hover:opacity-80" href="#">Terms of Service</a>
<a className="hover:text-primary dark:hover:text-primary-fixed transition-colors opacity-100 hover:opacity-80" href="#">Regulatory Compliance</a>
</div>
</div>
</footer>

    </>
  );
}
