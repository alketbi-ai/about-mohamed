/* ============================================================
   بيانات الموقع: عدّل هنا فقط لإضافة محتوى جديد
   ------------------------------------------------------------
   - مدينة جديدة: أضف سطراً في CITIES وأنشئ صفحتها (انسخ mleiha.html).
   - معلم جديد:   أضف سطراً في LANDMARKS (map اختياري للخريطة، image اختياري).
   - كوفي/مطعم:   أضف سطراً في EATERIES (type: "كوفي" أو "مطعم"، map وinstagram وimage اختيارية).
   - أسرة منتجة:  أضف سطراً في FAMILIES (category مثل "أكل شعبي" أو "حلويات"، whatsapp برقم دولي بدون +).
   - صورة أرشيف:  ضع الصورة في مجلد archive/ وأضف سطراً في ARCHIVE.
   - شخصية جديدة: أضف سطراً في PEOPLE وأنشئ صفحتها (templates/person.html).
   ============================================================ */

const CITIES = [
  { name: "الذيد",   desc: "مدينة الزراعة والمزارع", url: "aldhaid.html", icon: "🏙️", tag: "مدينة" },
  { name: "مليحة",   desc: "المواقع الأثرية والطبيعة", url: "mleiha.html",  icon: "🏺", tag: "مدينة" },
  { name: "المدام",  desc: "من مدن المنطقة الوسطى",   url: "madam.html",   icon: "🏜️", tag: "مدينة" },
];

const LANDMARKS = [
  { name: "حصن الذيد", city: "الذيد", desc: "من معالم مدينة الذيد التاريخية.", icon: "🏰", map: "حصن الذيد، الشارقة" },
  { name: "المزارع والأسواق الزراعية", city: "الذيد", desc: "مزارع الذيد وأسواقها المعروفة بالخضار والفواكه.", icon: "🌴" },
  { name: "مركز مليحة للآثار", city: "مليحة", desc: "يعرّف بتاريخ مليحة ومواقعها الأثرية.", icon: "🏺", map: "مركز مليحة للآثار" },
];

/* كوفيات ومطاعم: { name, type: "كوفي"|"مطعم", city, desc, map, instagram, image } */
const EATERIES = [];

/* الأسر المنتجة: { name, category, city, desc, whatsapp: "9715xxxxxxxx", instagram, image } */
const FAMILIES = [];

/* صور الأرشيف: { src: "archive/اسم.jpg", caption: "الوصف", year: "1975", place: "الذيد" } */
const ARCHIVE = [];

const PEOPLE = [
  { name: "محمد الكتبي", desc: "نبذة عن شخصيته وسيرته", url: "mohammed/index.html", image: "images/people/mohammed/profile.jpg", tag: "شخصية من الذيد" },
];

const JOIN = { name: "شاركنا بشخصية", desc: "هل تعرف شخصية من الذيد؟ أضفها معنا", url: "participate.html", image: "images/thumbs/thumb-join.jpg", icon: "+", tag: "شارك", join: true };

const SECTIONS = [
  { name: "مدن المنطقة",       desc: "الذيد ومليحة والمدام وغيرها", url: "cities.html", image: "images/thumbs/thumb-cities.jpg",    icon: "🏙️", tag: "المدن",   kw: "مدن مدينة المنطقة الوسطى" },
  { name: "المعالم والأماكن",  desc: "حصون ومزارع وأسواق",         url: "landmarks.html", image: "images/thumbs/thumb-landmarks.jpg", icon: "🏰", tag: "الأماكن", kw: "معالم اماكن حصن مزارع اسواق خريطة" },
  { name: "كوفيات ومطاعم",    desc: "أماكن الأكل والقهوة في المنطقة", url: "eateries.html", image: "images/thumbs/thumb-eateries.jpg", icon: "☕", tag: "الأكل", kw: "كوفي كافيه قهوه مطعم مطاعم اكل" },
  { name: "الأسر المنتجة",    desc: "منتجات أسر من المنطقة", url: "families.html", image: "images/thumbs/thumb-families.jpg", icon: "🧺", tag: "الأسر", kw: "اسر اسره منتجه منتجات بيت حرف اكل شعبي حلويات" },
  { name: "الأرشيف المصوّر",   desc: "صور قديمة من المنطقة",       url: "archive.html", image: "images/thumbs/thumb-archive.jpg",   icon: "📷", tag: "الأرشيف", kw: "صور ارشيف قديمة تاريخ" },
];

/* ====== أدوات ====== */
const norm = s => (s || "").toString().toLowerCase()
  .replace(/[ً-ٰٟـ]/g, "").replace(/[أإآ]/g, "ا").replace(/ى/g, "ي").replace(/ة/g, "ه");
const mapURL = q => "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(q);
const here = location.pathname.split("/").pop() || "index.html";

function tileHTML(item) {
  if (item.join) return `<a class="tile join" href="${item.url}"><div class="cover"${item.image ? ` style="background-image:url('${item.image}')"` : ""}><span class="tag">${item.tag}</span>${item.image ? "" : `<span class="icon">${item.icon}</span>`}</div><div class="body"><h3>${item.name}</h3><p>${item.desc}</p><span class="go">شارك الآن ←</span></div></a>`;
  const cover = item.image
    ? `<div class="cover person" style="background-image:url('${item.image}')"><span class="tag">${item.tag || ""}</span></div>`
    : `<div class="cover place"><span class="tag">${item.tag || ""}</span><span class="icon">${item.icon || "📍"}</span></div>`;
  return `<a class="tile" href="${item.url}">${cover}<div class="body"><h3>${item.name}</h3><p>${item.desc || ""}</p><span class="go">زيارة ←</span></div></a>`;
}

function landmarkHTML(l) {
  const cover = l.image
    ? `<div class="cover person" style="background-image:url('${l.image}')"><span class="tag">${l.city}</span></div>`
    : `<div class="cover place"><span class="tag">${l.city}</span><span class="icon">${l.icon || "📍"}</span></div>`;
  const map = l.map ? `<a class="go" href="${mapURL(l.map)}" target="_blank" rel="noopener">📍 عرض الموقع على الخريطة</a>` : `<span class="go muted">الموقع قريباً</span>`;
  return `<div class="tile static">${cover}<div class="body"><h3>${l.name}</h3><p>${l.desc || ""}</p>${map}</div></div>`;
}

/* ====== الصفحة الرئيسية: البطاقات والبحث ====== */
const tilesEl = document.getElementById("tiles");
if (tilesEl) {
  const all = [JOIN, ...SECTIONS, ...PEOPLE];
  tilesEl.innerHTML = all.map(tileHTML).join("");

  const q = document.getElementById("q"), res = document.getElementById("results"), none = document.getElementById("noresult");
  const index = [
    ...SECTIONS.map(s => ({ html: tileHTML(s), text: [s.name, s.desc, s.kw] })),
    ...CITIES.map(c => ({ html: tileHTML(c), text: [c.name, c.desc, "مدينة"] })),
    ...LANDMARKS.map(l => ({ html: landmarkHTML(l), text: [l.name, l.city, l.desc, "معلم مكان"] })),
    ...EATERIES.map(e => ({ html: eateryHTML(e), text: [e.name, e.type, e.city, e.desc, "اكل قهوه"] })),
    ...FAMILIES.map(f => ({ html: familyHTML(f), text: [f.name, f.category, f.city, f.desc, "اسره منتجه"] })),
    ...PEOPLE.map(p => ({ html: tileHTML(p), text: [p.name, p.desc, "شخصية"] })),
  ];
  if (q) q.addEventListener("input", () => {
    const v = norm(q.value).trim();
    if (!v) { res.hidden = none.hidden = true; tilesEl.hidden = false; return; }
    const hits = index.filter(i => norm(i.text.join(" ")).includes(v));
    tilesEl.hidden = true;
    res.hidden = !hits.length; none.hidden = !!hits.length;
    res.innerHTML = hits.map(h => h.html).join("");
  });
}

function eateryHTML(e) {
  const icon = e.type === "مطعم" ? "🍽️" : "☕";
  const cover = e.image
    ? `<div class="cover person" style="background-image:url('${e.image}')"><span class="tag">${e.type}</span></div>`
    : `<div class="cover place"><span class="tag">${e.type}</span><span class="icon">${icon}</span></div>`;
  const links = [
    e.map ? `<a class="go" href="${mapURL(e.map)}" target="_blank" rel="noopener">📍 الموقع</a>` : "",
    e.instagram ? `<a class="go" href="https://instagram.com/${e.instagram}" target="_blank" rel="noopener">📷 إنستقرام</a>` : "",
  ].join(" ");
  return `<div class="tile static">${cover}<div class="body"><h3>${e.name}</h3><p>${e.city || ""}${e.desc ? " · " + e.desc : ""}</p>${links}</div></div>`;
}

function familyHTML(f) {
  const cover = f.image
    ? `<div class="cover person" style="background-image:url('${f.image}')"><span class="tag">${f.category || "أسرة منتجة"}</span></div>`
    : `<div class="cover place"><span class="tag">${f.category || "أسرة منتجة"}</span><span class="icon">🧺</span></div>`;
  const links = [
    f.whatsapp ? `<a class="go" href="https://wa.me/${f.whatsapp}" target="_blank" rel="noopener">💬 واتساب</a>` : "",
    f.instagram ? `<a class="go" href="https://instagram.com/${f.instagram}" target="_blank" rel="noopener">📷 إنستقرام</a>` : "",
  ].join(" ");
  return `<div class="tile static">${cover}<div class="body"><h3>${f.name}</h3><p>${f.city || ""}${f.desc ? " · " + f.desc : ""}</p>${links}</div></div>`;
}

/* ====== صفحة المعالم ====== */
const lmEl = document.getElementById("landmarks");
if (lmEl) {
  const chips = document.getElementById("chips");
  const cities = ["الكل", ...new Set(LANDMARKS.map(l => l.city))];
  const draw = c => {
    lmEl.innerHTML = LANDMARKS.filter(l => c === "الكل" || l.city === c).map(landmarkHTML).join("");
    chips.querySelectorAll("button").forEach(b => b.classList.toggle("on", b.dataset.c === c));
  };
  chips.innerHTML = cities.map(c => `<button data-c="${c}">${c}</button>`).join("");
  chips.addEventListener("click", e => { if (e.target.dataset.c) draw(e.target.dataset.c); });
  draw("الكل");
}

/* ====== صفحة الكوفيات والمطاعم ====== */
const eatEl = document.getElementById("eateries");
if (eatEl) {
  const chips = document.getElementById("chips"), empty = document.getElementById("eat-empty");
  let type = "الكل";
  const draw = () => {
    const list = EATERIES.filter(e => type === "الكل" || e.type === type);
    eatEl.innerHTML = list.map(eateryHTML).join("");
    empty.hidden = !!list.length;
    chips.querySelectorAll("button").forEach(b => b.classList.toggle("on", b.dataset.c === type));
  };
  chips.innerHTML = ["الكل", "كوفي", "مطعم"].map(c => `<button data-c="${c}">${c}</button>`).join("");
  chips.addEventListener("click", e => { if (e.target.dataset.c) { type = e.target.dataset.c; draw(); } });
  draw();
}

/* ====== صفحة الأسر المنتجة ====== */
const famEl = document.getElementById("families");
if (famEl) {
  const chips = document.getElementById("chips"), empty = document.getElementById("fam-empty");
  let cat = "الكل";
  const draw = () => {
    const list = FAMILIES.filter(f => cat === "الكل" || f.category === cat);
    famEl.innerHTML = list.map(familyHTML).join("");
    empty.hidden = !!list.length;
    chips.querySelectorAll("button").forEach(b => b.classList.toggle("on", b.dataset.c === cat));
  };
  const cats = ["الكل", ...new Set(FAMILIES.map(f => f.category).filter(Boolean))];
  chips.hidden = cats.length < 2;
  chips.innerHTML = cats.map(c => `<button data-c="${c}">${c}</button>`).join("");
  chips.addEventListener("click", e => { if (e.target.dataset.c) { cat = e.target.dataset.c; draw(); } });
  draw();
}

/* ====== صفحة المدن ====== */
const cityEl = document.getElementById("cities");
if (cityEl) cityEl.innerHTML = CITIES.map(tileHTML).join("");

/* ====== صفحة الأرشيف ====== */
const galEl = document.getElementById("gallery");
if (galEl) {
  if (!ARCHIVE.length) document.getElementById("archive-empty").hidden = false;
  galEl.innerHTML = ARCHIVE.map((a, i) => `<figure data-i="${i}"><img src="${a.src}" alt="${a.caption || ""}" loading="lazy"><figcaption>${a.caption || ""}${a.year ? " · " + a.year : ""}${a.place ? " · " + a.place : ""}</figcaption></figure>`).join("");
  const lb = document.getElementById("lightbox"), lbi = lb.querySelector("img"), lbc = lb.querySelector("p");
  galEl.addEventListener("click", e => {
    const f = e.target.closest("figure"); if (!f) return;
    const a = ARCHIVE[f.dataset.i]; lbi.src = a.src; lbc.textContent = f.querySelector("figcaption").textContent; lb.hidden = false;
  });
  lb.addEventListener("click", () => lb.hidden = true);
  document.addEventListener("keydown", e => { if (e.key === "Escape") lb.hidden = true; });
}

/* ====== شريط التنقل ====== */
const navEl = document.getElementById("nav");
if (navEl) {
  const cityPages = CITIES.map(c => c.url);
  const links = [
    { name: "الرئيسية", url: "index.html" },
    { name: "مدن المنطقة", url: "cities.html", also: cityPages },
    { name: "المعالم", url: "landmarks.html" },
    { name: "كوفيات ومطاعم", url: "eateries.html" },
    { name: "الأسر المنتجة", url: "families.html" },
    { name: "الأرشيف", url: "archive.html" },
    ...PEOPLE,
    { name: "شاركنا", url: JOIN.url },
  ];
  navEl.innerHTML = links.map(l => `<a href="${l.url}" class="${l.url === here || (l.also || []).includes(here) ? "active" : ""}">${l.name}</a>`).join("");
}

/* ====== عدّاد الزوار (يُحسب مرة لكل متصفح، وعلى الدومين الحقيقي فقط) ====== */
(async () => {
  const foot = document.querySelector("footer.founder");
  if (!foot) return;
  const live = location.hostname === "aldhaid.ae" || location.hostname === "www.aldhaid.ae";
  let counted = false;
  try { counted = localStorage.getItem("siteVisited") === "1"; } catch (e) {}
  const action = live && !counted ? "hit" : "get";
  try {
    const r = await fetch("https://abacus.jasoncameron.dev/" + action + "/aldhaid-ae/site");
    if (!r.ok) return;
    const { value } = await r.json();
    if (typeof value !== "number") return;
    if (action === "hit") { try { localStorage.setItem("siteVisited", "1"); } catch (e) {} }
    const el = document.createElement("div");
    el.className = "visits";
    el.innerHTML = `👀 عدد الزوار: <b>${value.toLocaleString("ar-AE")}</b>`;
    foot.appendChild(el);
  } catch (e) { /* العدّاد اختياري */ }
})();
