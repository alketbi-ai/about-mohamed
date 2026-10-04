/* ====== بيانات الموقع ======
   لإضافة شخص جديد: أضف سطراً داخل PEOPLE (ثم أنشئ صفحته، انظر templates/person.html).
   لإضافة مكان جديد: أضف سطراً داخل PLACES.
   image اختياري: مسار صورة تظهر في غلاف البطاقة. */
const PLACES = [
  { name: "مدينة الذيد", desc: "تعرّف على المدينة وتاريخها ومعالمها", url: "aldhaid.html", icon: "🏙️", tag: "المدينة" },
];

const PEOPLE = [
  { name: "محمد الكتبي", desc: "نبذة عن شخصيته وسيرته", url: "mohammed/index.html", image: "mohammed/images/profile.jpg", tag: "شخصية من الذيد" },
];

/* بطاقة المشاركة (تظهر دائماً أولاً من اليمين) */
const JOIN = { name: "شاركنا بشخصية", desc: "هل تعرف شخصية من الذيد؟ أضفها معنا", url: "participate.html", icon: "+", tag: "شارك", join: true };

/* ====== رسم الصفحة ====== */
function tileHTML(item, kind) {
  if (item.join) return `<a class="tile join" href="${item.url}"><div class="cover"><span class="tag">${item.tag}</span><span class="icon">${item.icon}</span></div><div class="body"><h3>${item.name}</h3><p>${item.desc}</p><span class="go">شارك الآن ←</span></div></a>`;
  const cover = item.image
    ? `<div class="cover person" style="background-image:url('${item.image}')"><span class="tag">${item.tag || ""}</span></div>`
    : `<div class="cover place"><span class="tag">${item.tag || ""}</span><span class="icon">${item.icon || "📍"}</span></div>`;
  return `<a class="tile" href="${item.url}">${cover}<div class="body"><h3>${item.name}</h3><p>${item.desc || ""}</p><span class="go">زيارة ←</span></div></a>`;
}
const tilesEl = document.getElementById("tiles");
if (tilesEl) tilesEl.innerHTML = [JOIN, ...PLACES, ...PEOPLE].map(tileHTML).join("");

const navEl = document.getElementById("nav");
if (navEl) {
  const here = location.pathname.split("/").pop() || "index.html";
  const links = [{ name: "الرئيسية", url: "index.html" }, ...PLACES, ...PEOPLE, { name: "شاركنا", url: JOIN.url }];
  navEl.innerHTML = links.map(l => `<a href="${l.url}" class="${l.url === here ? "active" : ""}">${l.name}</a>`).join("");
}
