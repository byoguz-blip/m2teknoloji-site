# M2 Teknoloji — Statik Site + Decap CMS (GitHub tabanlı)

Bu paket **CMS kavgası olmadan**, profesyonel, hızlı ve stabil bir kurulum sağlar:
- Statik site (HTML/CSS/JS)
- TR/EN (bayrak butonları)
- Sticky blur header + shop icon
- Bölüm sırası: Menü → Hero → Hizmetler → Partner slider → Çözümler → Projeler → Blog → Referans slider → Hakkımızda → İletişim → Alt banner
- Google Maps embed (admin panelden)
- İçerikler GUI’den (Decap CMS /admin)

> Not: Decap CMS'nin GitHub'a yazabilmesi için en pratik yol **Netlify** + **Git Gateway**'dir (ücretsiz). Site kodu GitHub'da durur.

---

## 1) GitHub Repo oluştur
1. GitHub’da yeni repo aç: `m2teknoloji-site`
2. Bu paketin içeriğini repoya yükle (main branch).

## 2) Netlify ile yayınla (GitHub bağlantılı)
1. Netlify → “Add new site” → “Import from Git”
2. GitHub repo’yu seç
3. Build command boş, publish `.` (netlify.toml zaten hazır)
4. Deploy

## 3) Admin paneli aç (Decap CMS)
1. Netlify → Site settings → Identity → **Enable**
2. Identity → Settings → Registration → “Invite only” önerilir
3. Identity → Services → **Enable Git Gateway**
4. Deploy tekrar
5. Admin: `https://SENIN-SITE.netlify.app/admin/`


sdasdads

## 4) İçerikleri düzenle
Admin panelden:
- Üst/Alt banner yüksekliği (vh/px)
- Başlıklar ve yazılar TR/EN
- Hizmetler/Çözümler/Projeler/Blog
- Partner & Referans slider logoları
- Harita embed URL

## 5) Demo Reset (en temiz yöntem)
Admin’de yapılan değişiklikleri demo haline döndürmek için:
- GitHub → “Releases” veya “Tags” kullan
- veya “Revert” ile `content/` klasörünü ilk commit’e geri al

---

## Lokal test
Dosyaları doğrudan açabilirsin:
- `index.html` (tarayıcıda)

Not: Tarayıcı güvenliği nedeniyle bazı durumlarda `file://` ile JSON fetch engellenir.
En pratik:
- VSCode Live Server
- veya basit http server:
  - `python -m http.server 8080`
