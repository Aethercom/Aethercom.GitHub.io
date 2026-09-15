/* =========================================
   AETHERCOM CORE JAVASCRIPT
   ========================================= */

/* ---------- Page transition ---------- */
function runPageTransition(event, url) {
    const transition = document.getElementById("page-transition");
    if (!transition) {
        window.location.href = url;
        return;
    }

    const x = event && Number.isFinite(event.clientX) ? event.clientX : window.innerWidth / 2;
    const y = event && Number.isFinite(event.clientY) ? event.clientY : window.innerHeight / 2;

    transition.style.left = x + "px";
    transition.style.top = y + "px";

    const size = Math.max(window.innerWidth, window.innerHeight) * 2;
    transition.style.width = size + "px";
    transition.style.height = size + "px";
    transition.style.transform = "translate(-50%, -50%) scale(1)";

    setTimeout(() => {
        window.location.href = url;
    }, 700);
}

function openProfile(event) {
    runPageTransition(event, "profile.html");
}

function openProfile2(event) {
    runPageTransition(event, "../profile.html");
}

/* ---------- Slider ---------- */
let currentSlide = 0;
let sliderTimer = null;

function getSlides() {
    return document.querySelectorAll(".slide");
}

function getDots() {
    return document.querySelectorAll(".dot");
}

function showSlide(index) {
    const slides = getSlides();
    const dots = getDots();

    if (!slides.length) return;

    currentSlide = ((index % slides.length) + slides.length) % slides.length;

    slides.forEach((slide, i) => {
        slide.classList.toggle("active", i === currentSlide);
    });

    dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === currentSlide);
    });
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function previousSlide() {
    showSlide(currentSlide - 1);
}

function startSlider() {
    if (sliderTimer) clearInterval(sliderTimer);
    if (getSlides().length > 1) {
        sliderTimer = setInterval(nextSlide, 5000);
    }
}

/* ---------- Stories ---------- */
function openStory(story) {
    const viewer = document.getElementById("story-viewer");
    const image = document.getElementById("story-image");
    const video = document.getElementById("story-video");

    if (!viewer || !image || !video) return;

    viewer.style.display = "flex";
    image.style.display = "none";
    video.style.display = "none";
    image.removeAttribute("src");
    video.pause();
    video.removeAttribute("src");

    const stories = {
        story1: { type: "image", src: "assets/images/Story 1.jpg", alt: "Coding" },
        story2: { type: "video", src: "assets/video/story2.mkv", alt: "Story video" },
        story3: { type: "image", src: "assets/images/Aethercom Studio.png", alt: "Aethercom Studio" }
    };

    const selected = stories[story];
    if (!selected) {
        closeStory();
        return;
    }

    if (selected.type === "image") {
        image.src = selected.src;
        image.alt = selected.alt;
        image.style.display = "block";
    } else {
        video.src = selected.src;
        video.style.display = "block";
        video.play().catch(() => {});
    }
}

function closeStory() {
    const viewer = document.getElementById("story-viewer");
    const image = document.getElementById("story-image");
    const video = document.getElementById("story-video");

    if (video) {
        video.pause();
        video.removeAttribute("src");
        video.load();
    }
    if (image) image.removeAttribute("src");
    if (viewer) viewer.style.display = "none";
}

/* ---------- Back to top ---------- */
function backToTop() {
    const startPosition = window.scrollY;
    const duration = 900;
    const startTime = performance.now();

    function scrollAnimation(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        window.scrollTo(0, startPosition * (1 - ease));

        if (progress < 1) requestAnimationFrame(scrollAnimation);
    }

    requestAnimationFrame(scrollAnimation);
}

/* =========================================
   AETHERCOM APPLICATION
   ========================================= */
document.addEventListener("DOMContentLoaded", () => {

    /* ---------- Theme ---------- */
    const themeToggle = document.getElementById("themeToggle");
    const savedTheme = localStorage.getItem("aethercom-theme") || localStorage.getItem("theme");

    if (savedTheme === "light") {
        document.body.classList.add("light-mode");
    }

    if (themeToggle) {
        const setThemeButtonState = () => {
            const isLight = document.body.classList.contains("light-mode");
            themeToggle.classList.toggle("active", isLight);
            themeToggle.setAttribute("aria-pressed", String(isLight));
        };

        setThemeButtonState();

        themeToggle.addEventListener("click", () => {
            const isLight = document.body.classList.toggle("light-mode");
            themeToggle.classList.toggle("active", isLight);
            themeToggle.setAttribute("aria-pressed", String(isLight));
            localStorage.setItem("aethercom-theme", isLight ? "light" : "dark");
        });
    }

    /* ---------- Notifications ---------- */
    const notificationToggle = document.getElementById("notificationToggle");
    if (notificationToggle) {
        let enabled = localStorage.getItem("aethercom-notifications");
        if (enabled === null) {
            enabled = "true";
            localStorage.setItem("aethercom-notifications", enabled);
        }

        const setNotificationState = value => {
            notificationToggle.classList.toggle("active", value);
            notificationToggle.setAttribute("aria-pressed", String(value));
        };

        setNotificationState(enabled === "true");

        notificationToggle.addEventListener("click", () => {
            const next = !notificationToggle.classList.contains("active");
            setNotificationState(next);
            localStorage.setItem("aethercom-notifications", String(next));
        });
    }

    /* ---------- Interface button ---------- */
    const interfaceButton = document.getElementById("interfaceButton");
    if (interfaceButton) {
        interfaceButton.addEventListener("click", () => {
            interfaceButton.classList.toggle("active");
        });
    }

    /* ---------- Language + SVG flags ---------- */
    const languageSelect = document.getElementById("languageSelect");
    const languageFlag = document.getElementById("languageFlag");

    const flags = {
        en: `<svg viewBox="0 0 36 24" role="img" aria-label="United States flag"><rect width="36" height="24" rx="2" fill="#fff"/><path fill="#d22f27" d="M0 0h36v2H0zm0 4h36v2H0zm0 4h36v2H0zm0 4h36v2H0zm0 4h36v2H0zm0 4h36v2H0z"/><rect width="16" height="13" rx="1" fill="#234a91"/></svg>`,
        fa: `<svg viewBox="0 0 36 24" role="img" aria-label="Iran flag"><rect width="36" height="8" rx="2 2 0 0" fill="#239f40"/><rect y="8" width="36" height="8" fill="#fff"/><rect y="16" width="36" height="8" rx="0 0 2 2" fill="#da0000"/><g fill="#da0000"><path d="M16 10h4v1h-4zM16 13h4v1h-4z"/></g></svg>`,
        da: `<svg viewBox="0 0 36 24" role="img" aria-label="Afghanistan Islamic Republic flag"><rect width="36" height="24" rx="2" fill="#000"/><rect x="12" width="12" height="24" fill="#d32027"/><rect x="24" width="12" height="24" rx="0 2 2 0" fill="#007a3d"/><circle cx="18" cy="12" r="3.2" fill="none" stroke="#f5d76e" stroke-width=".7"/><path d="M15.5 12h5M18 9.5v5" stroke="#f5d76e" stroke-width=".55"/></svg>`
    };

    function updateLanguageFlag(value) {
        if (languageFlag) {
            languageFlag.innerHTML = flags[value] || flags.en;
        }
    }

    if (languageSelect) {
        const savedLanguage = localStorage.getItem("aethercom-language") || "en";
        languageSelect.value = [...languageSelect.options].some(o => o.value === savedLanguage) ? savedLanguage : "en";
        updateLanguageFlag(languageSelect.value);

        languageSelect.addEventListener("change", () => {
            localStorage.setItem("aethercom-language", languageSelect.value);
            updateLanguageFlag(languageSelect.value);
        });
    }

    /* ---------- Search ---------- */
    const searchButton = document.getElementById("aetherSearchButton");
    const searchPanel = document.getElementById("aetherSearchPanel");
    const searchOverlay = document.getElementById("aetherSearchOverlay");
    const searchClose = document.getElementById("aetherSearchClose");
    const searchInput = document.getElementById("aetherSearchInput");
    const searchClear = document.getElementById("aetherSearchClear");
    const searchResults = document.getElementById("aetherSearchResults");

    const baseSearchData = [
        { title: "Qualcomm", description: "Qualcomm announces its next two flagship chips on September 22", keywords: "Qualcomm Chip کوالکام", url: "News/Qualcomm announces its next two flagship chips on September 22.html", type: "News" },
        { title: "Aethercom website", description: "Aethercom digital technology and creation project.", keywords: "aethercom website company technology digital creation", url: "index.html", type: "Page" },
        { title: "About Aethercom", description: "Learn more about Aethercom, its vision and ideas.", keywords: "about aethercom company vision technology", url: "about.html", type: "Page" },
        { title: "Projects", description: "Explore Aethercom projects and digital creations.", keywords: "projects project creations software development", url: "projects.html", type: "Page" },
        { title: "Support", description: "Get help and find support information.", keywords: "support help assistance contact", url: "support.html", type: "Page" },
        { title: "Profile", description: "Manage your Aethercom profile and preferences.", keywords: "profile account user settings", url: "profile.html", type: "Page" },
        { title: "Settings", description: "Manage language, theme and interface preferences.", keywords: "settings language theme light dark interface", url: "settings.html", type: "Page" }
    ];

    function normalizeText(text) {
        return String(text || "").toLowerCase().trim().replace(/\s+/g, " ");
    }

    function escapeHTML(text) {
        const div = document.createElement("div");
        div.textContent = String(text ?? "");
        return div.innerHTML;
    }

    function getStoredNews() {
        try {
            const parsed = JSON.parse(localStorage.getItem("aethercom-news") || "[]");
            return Array.isArray(parsed) ? parsed : [];
        } catch {
            return [];
        }
    }

    function getSearchData() {
        const custom = getStoredNews()
            .filter(post => post.status === "published")
            .map(post => ({
                title: post.title,
                description: post.summary,
                keywords: `${post.category} ${(post.tags || []).join(" ")} ${post.source || ""}`,
                url: `#news-${post.id}`,
                type: `News · ${post.category}`
            }));

        return [...custom, ...baseSearchData];
    }

    function showInitialSearchState() {
        if (!searchResults) return;
        searchResults.innerHTML = `<div class="aether-search-state"><div class="aether-search-state-icon"><svg viewBox="0 0 24 24"><circle cx="10.8" cy="10.8" r="6.8" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M16 16L21 21" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg></div><h3>Search Aethercom</h3><p>Find pages, projects, news and other content.</p></div>`;
    }

    function showNoSearchResults(query) {
        if (!searchResults) return;
        searchResults.innerHTML = `<div class="aether-search-no-results"><strong>No results found</strong><span>Nothing matched "${escapeHTML(query)}".</span></div>`;
    }

    function performSearch(query) {
        if (!searchResults) return;
        const normalizedQuery = normalizeText(query);
        if (!normalizedQuery) {
            showInitialSearchState();
            return;
        }

        const words = normalizedQuery.split(" ");
        const results = getSearchData().filter(item => {
            const searchableText = normalizeText(`${item.title} ${item.description} ${item.keywords} ${item.type}`);
            return words.every(word => searchableText.includes(word));
        });

        if (!results.length) {
            showNoSearchResults(query);
            return;
        }

        searchResults.innerHTML = results.map(item => `<a class="aether-search-result" href="${escapeHTML(item.url)}"><h3 class="aether-search-result-title">${escapeHTML(item.title)}</h3><p class="aether-search-result-description">${escapeHTML(item.description)}</p><span class="aether-search-result-type">${escapeHTML(item.type)}</span></a>`).join("");
    }

    function openSearch() {
        if (!searchPanel || !searchOverlay) return;
        searchPanel.classList.add("search-visible");
        searchOverlay.classList.add("search-visible");
        searchButton?.classList.add("search-open");
        searchPanel.setAttribute("aria-hidden", "false");
        searchOverlay.setAttribute("aria-hidden", "false");
        searchButton?.setAttribute("aria-expanded", "true");
        document.body.classList.add("aether-search-active");
        setTimeout(() => searchInput?.focus(), 250);
    }

    function closeSearch() {
        if (!searchPanel || !searchOverlay) return;
        searchPanel.classList.remove("search-visible");
        searchOverlay.classList.remove("search-visible");
        searchButton?.classList.remove("search-open");
        searchPanel.setAttribute("aria-hidden", "true");
        searchOverlay.setAttribute("aria-hidden", "true");
        searchButton?.setAttribute("aria-expanded", "false");
        document.body.classList.remove("aether-search-active");
    }

    if (searchButton && searchPanel && searchOverlay && searchClose && searchInput && searchClear && searchResults) {
        searchButton.addEventListener("click", openSearch);
        searchClose.addEventListener("click", closeSearch);
        searchOverlay.addEventListener("click", closeSearch);

        searchClear.addEventListener("click", () => {
            searchInput.value = "";
            searchClear.classList.remove("visible");
            showInitialSearchState();
            searchInput.focus();
        });

        searchInput.addEventListener("input", () => {
            const hasText = searchInput.value.trim().length > 0;
            searchClear.classList.toggle("visible", hasText);
            performSearch(searchInput.value);
        });

        showInitialSearchState();
    }

    document.addEventListener("keydown", event => {
        if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
            event.preventDefault();
            if (searchPanel?.classList.contains("search-visible")) searchInput?.focus();
            else openSearch();
        }
        if (event.key === "Escape" && searchPanel?.classList.contains("search-visible")) closeSearch();
    });

    /* =========================================
       AETHERCOM FRONT-END NEWS ADMIN
       ========================================= */
    const adminOpenButton = document.getElementById("adminOpenButton");
    const adminCloseButton = document.getElementById("adminCloseButton");
    const adminOverlay = document.getElementById("aetherAdminOverlay");
    const adminPanel = document.getElementById("aetherAdminPanel");
    const adminForm = document.getElementById("adminNewsForm");

    const admin = {
        id: document.getElementById("adminNewsId"),
        title: document.getElementById("adminTitle"),
        category: document.getElementById("adminCategory"),
        status: document.getElementById("adminStatus"),
        image: document.getElementById("adminImage"),
        summary: document.getElementById("adminSummary"),
        content: document.getElementById("adminContent"),
        tags: document.getElementById("adminTags"),
        readingTime: document.getElementById("adminReadingTime"),
        date: document.getElementById("adminDate"),
        source: document.getElementById("adminSource"),
        hot: document.getElementById("adminHot"),
        formTitle: document.getElementById("adminFormTitle"),
        publishButton: document.getElementById("adminPublishButton"),
        statusText: document.getElementById("adminFormStatus"),
        previewImage: document.getElementById("adminPreviewImage"),
        previewCategory: document.getElementById("adminPreviewCategory"),
        previewDate: document.getElementById("adminPreviewDate"),
        previewTitle: document.getElementById("adminPreviewTitle"),
        previewSummary: document.getElementById("adminPreviewSummary"),
        previewContent: document.getElementById("adminPreviewContent"),
        previewTags: document.getElementById("adminPreviewTags"),
        list: document.getElementById("adminNewsList"),
        count: document.getElementById("adminLibraryCount")
    };

    function setAdminOpen(isOpen) {
        if (!adminPanel || !adminOverlay) return;
        adminPanel.classList.toggle("admin-visible", isOpen);
        adminOverlay.classList.toggle("admin-visible", isOpen);
        adminPanel.setAttribute("aria-hidden", String(!isOpen));
        adminOverlay.setAttribute("aria-hidden", String(!isOpen));
        document.body.classList.toggle("aether-admin-active", isOpen);
        if (isOpen) updateAdminPreview();
    }

    function defaultDateValue() {
        const now = new Date();
        const offset = now.getTimezoneOffset();
        return new Date(now.getTime() - offset * 60000).toISOString().slice(0, 16);
    }

    function resetAdminForm() {
        if (!adminForm) return;
        adminForm.reset();
        admin.id.value = "";
        admin.category.value = "Technology";
        admin.status.value = "published";
        admin.readingTime.value = "2 min";
        admin.source.value = "Aethercom";
        admin.date.value = defaultDateValue();
        admin.hot.checked = false;
        admin.formTitle.textContent = "Create News";
        admin.publishButton.textContent = "Publish News";
        if (admin.statusText) admin.statusText.textContent = "";
        updateAdminPreview();
    }

    function loadAdminPost(id) {
        const post = getStoredNews().find(item => item.id === id);
        if (!post) return;

        admin.id.value = post.id;
        admin.title.value = post.title || "";
        admin.category.value = post.category || "Technology";
        admin.status.value = post.status || "draft";
        admin.image.value = post.image || "";
        admin.summary.value = post.summary || "";
        admin.content.value = post.content || "";
        admin.tags.value = (post.tags || []).join(", ");
        admin.readingTime.value = post.readingTime || "2 min";
        admin.date.value = toLocalDateTime(post.date);
        admin.source.value = post.source || "Aethercom";
        admin.hot.checked = Boolean(post.hot);
        admin.formTitle.textContent = "Edit News";
        admin.publishButton.textContent = post.status === "published" ? "Update News" : "Publish News";
        if (admin.statusText) admin.statusText.textContent = "Editing selected post.";
        updateAdminPreview();
    }

    function toLocalDateTime(value) {
        const date = new Date(value || Date.now());
        if (Number.isNaN(date.getTime())) return defaultDateValue();
        const offset = date.getTimezoneOffset();
        return new Date(date.getTime() - offset * 60000).toISOString().slice(0, 16);
    }

    function collectAdminPost(forceStatus = null) {
        const title = admin.title.value.trim();
        const summary = admin.summary.value.trim();
        const content = admin.content.value.trim();

        if (!title || !summary || !content) {
            if (admin.statusText) admin.statusText.textContent = "Title, summary and content are required.";
            return null;
        }

        const existingId = admin.id.value.trim();
        const postId = existingId || `news-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
        const dateValue = admin.date.value ? new Date(admin.date.value).toISOString() : new Date().toISOString();

        return {
            id: postId,
            title,
            category: admin.category.value,
            status: forceStatus || admin.status.value,
            image: admin.image.value.trim(),
            summary,
            content,
            tags: admin.tags.value.split(",").map(tag => tag.trim()).filter(Boolean).slice(0, 10),
            readingTime: admin.readingTime.value.trim() || "2 min",
            date: dateValue,
            source: admin.source.value.trim() || "Aethercom",
            hot: admin.hot.checked,
            updatedAt: new Date().toISOString()
        };
    }

    function saveAdminPost(forceStatus = null) {
        const post = collectAdminPost(forceStatus);
        if (!post) return;

        const posts = getStoredNews();
        const index = posts.findIndex(item => item.id === post.id);
        if (index >= 0) posts[index] = post;
        else posts.unshift(post);

        localStorage.setItem("aethercom-news", JSON.stringify(posts));
        renderCustomNews();
        renderAdminLibrary();
        refreshSearchIfOpen();

        admin.id.value = post.id;
        admin.status.value = post.status;
        admin.formTitle.textContent = "Edit News";
        admin.publishButton.textContent = post.status === "published" ? "Update News" : "Publish News";
        if (admin.statusText) admin.statusText.textContent = post.status === "published" ? "Published locally in this browser." : "Draft saved locally in this browser.";
    }

    function deleteAdminPost(id) {
        const posts = getStoredNews().filter(post => post.id !== id);
        localStorage.setItem("aethercom-news", JSON.stringify(posts));
        renderCustomNews();
        renderAdminLibrary();
        refreshSearchIfOpen();

        if (admin.id.value === id) resetAdminForm();
    }

    function formatDate(value) {
        const date = new Date(value || Date.now());
        if (Number.isNaN(date.getTime())) return "";
        return new Intl.DateTimeFormat("en-US", { year: "numeric", month: "short", day: "numeric" }).format(date);
    }

    function formatDateTime(value) {
        const date = new Date(value || Date.now());
        if (Number.isNaN(date.getTime())) return "";
        return new Intl.DateTimeFormat("en-US", { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }).format(date);
    }

    function contentToParagraphs(content, limit = 3) {
        return String(content || "")
            .split(/\n\s*\n/)
            .map(p => p.trim())
            .filter(Boolean)
            .slice(0, limit);
    }

    function updateAdminPreview() {
        if (!admin.previewTitle) return;
        admin.previewTitle.textContent = admin.title.value.trim() || "Your headline will appear here";
        admin.previewCategory.textContent = admin.category.value || "Technology";
        admin.previewDate.textContent = admin.date.value ? formatDateTime(admin.date.value) : "Today";
        admin.previewSummary.textContent = admin.summary.value.trim() || "Your news summary will appear here.";

        const paragraphs = contentToParagraphs(admin.content.value, 3);
        admin.previewContent.innerHTML = paragraphs.length
            ? paragraphs.map(text => `<p>${escapeHTML(text)}</p>`).join("")
            : "<p>Your full article preview will appear here.</p>";

        const tags = admin.tags.value.split(",").map(tag => tag.trim()).filter(Boolean).slice(0, 10);
        admin.previewTags.innerHTML = tags.map(tag => `<span>#${escapeHTML(tag)}</span>`).join("");

        const image = admin.image.value.trim();
        admin.previewImage.src = image || "assets/images/Aethercom low quality.jpg";
        admin.previewImage.alt = admin.title.value.trim() || "News preview";
    }

    function renderCustomNews() {
        const newsList = document.querySelector(".news-list");
        if (!newsList) return;

        newsList.querySelectorAll(".custom-news-card").forEach(card => card.remove());

        const published = getStoredNews().filter(post => post.status === "published");
        if (!published.length) return;

        const fragment = document.createDocumentFragment();

        published.forEach(post => {
            const card = document.createElement("article");
            card.className = "news-card custom-news-card";
            card.id = `news-${post.id}`;

            const image = post.image || "assets/images/Aethercom low quality.jpg";
            const hot = post.hot ? `<span class="custom-news-hot">HOT</span>` : "";
            const tags = (post.tags || []).slice(0, 3).map(tag => `<span class="custom-news-tag">#${escapeHTML(tag)}</span>`).join("");

            card.innerHTML = `
                <div class="news-background" style="background-image:url('${escapeHTML(image).replace(/'/g, "&#39;")}');"></div>
                <div class="news-content">
                    <img src="${escapeHTML(image)}" alt="${escapeHTML(post.title)}" class="news-image" onerror="this.src='assets/images/Aethercom low quality.jpg';">
                    <div class="news-info">
                        <div class="custom-news-label-row"><span class="custom-news-category">${escapeHTML(post.category)}</span>${hot}</div>
                        <h3>${escapeHTML(post.title)}</h3>
                        <time>${escapeHTML(formatDateTime(post.date))} · ${escapeHTML(post.readingTime)}</time>
                        <p>${escapeHTML(post.summary)}</p>
                        <div class="custom-news-tags">${tags}</div>
                    </div>
                </div>`;

            fragment.appendChild(card);
        });

        newsList.prepend(fragment);
    }

    function renderAdminLibrary() {
        if (!admin.list) return;
        const posts = getStoredNews();
        admin.count.textContent = `${posts.length} ${posts.length === 1 ? "post" : "posts"}`;

        if (!posts.length) {
            admin.list.innerHTML = `<div class="admin-empty-library"><strong>No custom news yet</strong><span>Create your first post above. Published posts appear in the Aethercom NEWS feed.</span></div>`;
            return;
        }

        admin.list.innerHTML = posts.map(post => `
            <article class="admin-library-item">
                <div class="admin-library-thumb"><img src="${escapeHTML(post.image || "assets/images/Aethercom low quality.jpg")}" alt="" onerror="this.src='assets/images/Aethercom low quality.jpg';"></div>
                <div class="admin-library-info">
                    <div class="admin-library-top"><span class="admin-library-category">${escapeHTML(post.category)}</span><span class="admin-library-status ${post.status === "published" ? "published" : "draft"}">${escapeHTML(post.status)}</span></div>
                    <h4>${escapeHTML(post.title)}</h4>
                    <p>${escapeHTML(post.summary)}</p>
                    <small>${escapeHTML(formatDateTime(post.date))}</small>
                </div>
                <div class="admin-library-actions">
                    <button type="button" class="admin-edit-button" data-admin-edit="${escapeHTML(post.id)}">Edit</button>
                    <button type="button" class="admin-delete-button" data-admin-delete="${escapeHTML(post.id)}">Delete</button>
                </div>
            </article>`).join("");
    }

    function refreshSearchIfOpen() {
        if (searchPanel?.classList.contains("search-visible") && searchInput?.value.trim()) {
            performSearch(searchInput.value);
        }
    }

    if (adminOpenButton && adminCloseButton && adminOverlay && adminPanel && adminForm) {
        adminOpenButton.addEventListener("click", () => setAdminOpen(true));
        adminCloseButton.addEventListener("click", () => setAdminOpen(false));
        adminOverlay.addEventListener("click", () => setAdminOpen(false));

        document.getElementById("adminNewButton")?.addEventListener("click", resetAdminForm);
        document.getElementById("adminDraftButton")?.addEventListener("click", () => saveAdminPost("draft"));

        adminForm.addEventListener("submit", event => {
            event.preventDefault();
            saveAdminPost("published");
        });

        [admin.title, admin.category, admin.image, admin.summary, admin.content, admin.tags, admin.readingTime, admin.date, admin.source, admin.hot].forEach(field => {
            field?.addEventListener("input", updateAdminPreview);
            field?.addEventListener("change", updateAdminPreview);
        });

        admin.list?.addEventListener("click", event => {
            const editButton = event.target.closest("[data-admin-edit]");
            const deleteButton = event.target.closest("[data-admin-delete]");

            if (editButton) {
                loadAdminPost(editButton.dataset.adminEdit);
                adminPanel.scrollTo({ top: 0, behavior: "smooth" });
            }

            if (deleteButton) {
                const id = deleteButton.dataset.adminDelete;
                const post = getStoredNews().find(item => item.id === id);
                if (post && window.confirm(`Delete “${post.title}” from this browser?`)) deleteAdminPost(id);
            }
        });

        resetAdminForm();
        renderAdminLibrary();
        renderCustomNews();
    }

    /* ---------- Slider ---------- */
    showSlide(0);
    startSlider();
});
/* =========================================
   AETHERCOM VIDEO PLAYER
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const player = document.getElementById("aetherPlayer");

    if (!player) return;


    /* =====================================
       ELEMENTS
       ===================================== */

    const video = document.getElementById("acVideo");

    const playButton = document.getElementById("acPlay");
    const centerPlay = document.getElementById("acCenterPlay");

    const backwardButton = document.getElementById("acBackward");
    const forwardButton = document.getElementById("acForward");

    const muteButton = document.getElementById("acMute");
    const volumeSlider = document.getElementById("acVolume");

    const progressBar = document.getElementById("acProgressBar");
    const progressFilled = document.getElementById("acProgressFilled");
    const progressBuffer = document.getElementById("acProgressBuffer");
    const progressThumb = document.getElementById("acProgressThumb");

    const currentTimeElement = document.getElementById("acCurrentTime");
    const durationElement = document.getElementById("acDuration");

    const fullscreenButton = document.getElementById("acFullscreen");
    const pipButton = document.getElementById("acPip");

    const speedButton = document.getElementById("acSpeedButton");
    const speedWrapper = document.querySelector(".ac-speed-wrapper");
    const speedMenu = document.getElementById("acSpeedMenu");

    const loader = document.getElementById("acLoader");


    /* =====================================
       STATE
       ===================================== */

    let controlsTimer;

    const CONTROL_TIMEOUT = 2500;


    /* =====================================
       FORMAT TIME
       ===================================== */

    function formatTime(seconds) {

        if (!Number.isFinite(seconds)) {
            return "00:00";
        }

        seconds = Math.max(0, Math.floor(seconds));

        const hours = Math.floor(seconds / 3600);

        const minutes = Math.floor(
            (seconds % 3600) / 60
        );

        const remainingSeconds = seconds % 60;

        if (hours > 0) {

            return (
                String(hours).padStart(2, "0") +
                ":" +
                String(minutes).padStart(2, "0") +
                ":" +
                String(remainingSeconds).padStart(2, "0")
            );

        }

        return (
            String(minutes).padStart(2, "0") +
            ":" +
            String(remainingSeconds).padStart(2, "0")
        );
    }


    /* =====================================
       PLAY / PAUSE
       ===================================== */

    function togglePlay() {

        if (video.paused || video.ended) {

            video.play().catch(() => {});

        } else {

            video.pause();

        }

    }


    playButton.addEventListener(
        "click",
        togglePlay
    );

    centerPlay.addEventListener(
        "click",
        togglePlay
    );

    video.addEventListener(
        "click",
        togglePlay
    );


    /* =====================================
       PLAY EVENT
       ===================================== */

    video.addEventListener("play", () => {

        player.classList.add("ac-playing");

        showControls();

    });


    /* =====================================
       PAUSE EVENT
       ===================================== */

    video.addEventListener("pause", () => {

        player.classList.remove("ac-playing");

        player.classList.add("ac-active");

    });


    /* =====================================
       END EVENT
       ===================================== */

    video.addEventListener("ended", () => {

        player.classList.remove("ac-playing");

        player.classList.add("ac-active");

        progressFilled.style.width = "100%";

        progressThumb.style.left = "100%";

    });


    /* =====================================
       SKIP BACKWARD
       ===================================== */

    backwardButton.addEventListener(
        "click",
        () => {

            video.currentTime = Math.max(
                0,
                video.currentTime - 10
            );

            showControls();

        }
    );


    /* =====================================
       SKIP FORWARD
       ===================================== */

    forwardButton.addEventListener(
        "click",
        () => {

            video.currentTime = Math.min(
                video.duration || Infinity,
                video.currentTime + 10
            );

            showControls();

        }
    );


    /* =====================================
       TIME UPDATE
       ===================================== */

    video.addEventListener(
        "timeupdate",
        updateProgress
    );


    function updateProgress() {

        if (!Number.isFinite(video.duration)) {
            return;
        }

        const percentage =
            (video.currentTime / video.duration) * 100;

        progressFilled.style.width =
            `${percentage}%`;

        progressThumb.style.left =
            `${percentage}%`;

        currentTimeElement.textContent =
            formatTime(video.currentTime);

    }


    /* =====================================
       DURATION
       ===================================== */

    video.addEventListener(
        "loadedmetadata",
        () => {

            durationElement.textContent =
                formatTime(video.duration);

            currentTimeElement.textContent =
                "00:00";

        }
    );


    /* =====================================
       PROGRESS CLICK
       ===================================== */

    progressBar.addEventListener(
        "click",
        (event) => {

            if (!Number.isFinite(video.duration)) {
                return;
            }

            const rect =
                progressBar.getBoundingClientRect();

            const position =
                (event.clientX - rect.left) /
                rect.width;

            const percentage =
                Math.max(
                    0,
                    Math.min(1, position)
                );

            video.currentTime =
                percentage * video.duration;

            updateProgress();

            showControls();

        }
    );


    /* =====================================
       PROGRESS DRAGGING
       ===================================== */

    let isDragging = false;


    progressBar.addEventListener(
        "pointerdown",
        (event) => {

            isDragging = true;

            progressBar.setPointerCapture(
                event.pointerId
            );

            seekFromPointer(event);

        }
    );


    progressBar.addEventListener(
        "pointermove",
        (event) => {

            if (!isDragging) return;

            seekFromPointer(event);

        }
    );


    progressBar.addEventListener(
        "pointerup",
        () => {

            isDragging = false;

        }
    );


    function seekFromPointer(event) {

        if (!Number.isFinite(video.duration)) {
            return;
        }

        const rect =
            progressBar.getBoundingClientRect();

        const position =
            (event.clientX - rect.left) /
            rect.width;

        const percentage =
            Math.max(
                0,
                Math.min(1, position)
            );

        video.currentTime =
            percentage * video.duration;

        updateProgress();

    }


    /* =====================================
       BUFFER PROGRESS
       ===================================== */

    video.addEventListener(
        "progress",
        updateBuffer
    );


    function updateBuffer() {

        if (
            !video.buffered.length ||
            !Number.isFinite(video.duration)
        ) {
            return;
        }

        try {

            const bufferedEnd =
                video.buffered.end(
                    video.buffered.length - 1
                );

            const percentage =
                (bufferedEnd / video.duration) * 100;

            progressBuffer.style.width =
                `${Math.min(100, percentage)}%`;

        } catch (error) {

            /* Ignore invalid buffer ranges */

        }

    }


    /* =====================================
       VOLUME
       ===================================== */

    volumeSlider.addEventListener(
        "input",
        () => {

            const volume =
                Number(volumeSlider.value);

            video.volume = volume;

            if (volume === 0) {

                video.muted = true;

            } else {

                video.muted = false;

            }

            updateMuteState();

        }
    );


    muteButton.addEventListener(
        "click",
        () => {

            video.muted =
                !video.muted;

            updateMuteState();

        }
    );


    function updateMuteState() {

        player.classList.toggle(
            "ac-muted",
            video.muted || video.volume === 0
        );

        if (video.muted) {

            volumeSlider.value = 0;

        } else {

            volumeSlider.value =
                video.volume;

        }

    }


    /* =====================================
       PLAYBACK SPEED
       ===================================== */

    speedButton.addEventListener(
        "click",
        (event) => {

            event.stopPropagation();

            speedWrapper.classList.toggle(
                "open"
            );

        }
    );


    speedMenu
        .querySelectorAll("button")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const speed =
                        Number(
                            button.dataset.speed
                        );

                    video.playbackRate =
                        speed;

                    speedButton.textContent =
                        `${speed}×`;

                    speedMenu
                        .querySelectorAll("button")
                        .forEach(item => {

                            item.classList.remove(
                                "active"
                            );

                        });

                    button.classList.add(
                        "active"
                    );

                    speedWrapper.classList.remove(
                        "open"
                    );

                }
            );

        });


    /* =====================================
       CLOSE SPEED MENU
       ===================================== */

    document.addEventListener(
        "click",
        (event) => {

            if (
                !speedWrapper.contains(
                    event.target
                )
            ) {

                speedWrapper.classList.remove(
                    "open"
                );

            }

        }
    );


    /* =====================================
       FULLSCREEN
       ===================================== */

    fullscreenButton.addEventListener(
        "click",
        toggleFullscreen
    );


    async function toggleFullscreen() {

        try {

            if (!document.fullscreenElement) {

                if (player.requestFullscreen) {

                    await player.requestFullscreen();

                } else if (
                    player.webkitRequestFullscreen
                ) {

                    player.webkitRequestFullscreen();

                }

            } else {

                if (document.exitFullscreen) {

                    await document.exitFullscreen();

                } else if (
                    document.webkitExitFullscreen
                ) {

                    document.webkitExitFullscreen();

                }

            }

        } catch (error) {

            console.warn(
                "Fullscreen unavailable:",
                error
            );

        }

    }


    /* =====================================
       PICTURE IN PICTURE
       ===================================== */

    pipButton.addEventListener(
        "click",
        async () => {

            try {

                if (
                    document.pictureInPictureElement
                ) {

                    await document.exitPictureInPicture();

                    return;
                }

                if (
                    document.pictureInPictureEnabled &&
                    video.requestPictureInPicture
                ) {

                    await video.requestPictureInPicture();

                }

            } catch (error) {

                console.warn(
                    "Picture in Picture unavailable:",
                    error
                );

            }

        }
    );


    /* =====================================
       KEYBOARD CONTROLS
       ===================================== */

    player.addEventListener(
        "keydown",
        handleKeyboard
    );


    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.target.tagName === "INPUT" ||
                event.target.tagName === "TEXTAREA"
            ) {
                return;
            }

            if (
                document.activeElement ===
                document.body
            ) {
                handleKeyboard(event);
            }

        }
    );


    function handleKeyboard(event) {

        switch (event.key.toLowerCase()) {

            case " ":
            case "k":

                event.preventDefault();

                togglePlay();

                break;


            case "arrowleft":

                event.preventDefault();

                video.currentTime =
                    Math.max(
                        0,
                        video.currentTime - 5
                    );

                showControls();

                break;


            case "arrowright":

                event.preventDefault();

                video.currentTime =
                    Math.min(
                        video.duration || Infinity,
                        video.currentTime + 5
                    );

                showControls();

                break;


            case "m":

                event.preventDefault();

                video.muted =
                    !video.muted;

                updateMuteState();

                break;


            case "f":

                event.preventDefault();

                toggleFullscreen();

                break;

        }

    }


    /* =====================================
       CONTROLS VISIBILITY
       ===================================== */

    function showControls() {

        player.classList.add(
            "ac-active"
        );

        clearTimeout(
            controlsTimer
        );

        if (!video.paused) {

            controlsTimer =
                setTimeout(() => {

                    player.classList.remove(
                        "ac-active"
                    );

                }, CONTROL_TIMEOUT);

        }

    }


    player.addEventListener(
        "mousemove",
        showControls
    );

    player.addEventListener(
        "touchstart",
        showControls,
        {
            passive: true
        }
    );


    /* =====================================
       LOADING
       ===================================== */

    video.addEventListener(
        "waiting",
        () => {

            player.classList.add(
                "ac-loading"
            );

        }
    );


    video.addEventListener(
        "canplay",
        () => {

            player.classList.remove(
                "ac-loading"
            );

        }
    );


    video.addEventListener(
        "playing",
        () => {

            player.classList.remove(
                "ac-loading"
            );

        }
    );


    /* =====================================
       INITIAL STATE
       ===================================== */

    video.volume = 1;

    video.muted = false;

    video.playbackRate = 1;

    volumeSlider.value = 1;

    updateMuteState();

});