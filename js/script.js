/* =========================================
   AETHERCOM CORE JAVASCRIPT
   ========================================= */

/* =========================================
   Aethercom Paper Media
   ========================================= */

const papers = [

        {
        title: "Aethercom 1.5.1 Alpha; Whats new?",
        cover: "../assets/images/Aethercom-1-5-1-Alpha-cover.avif",
        link: "../news/Aethercom-1.5.1-Alpha.html"
    },

    {
        title: "Aethercom now is online!",
        cover: "../assets/images/Aethercom-now-is-online.avif",
        link: "https://Aethercom.github.io"
    },

    {
        title: "10 Best Movies About Coding",
        cover: "../assets/images/top10-movies-movies-for-coding-and-hacking.avif",
        link: "../news/Top-10-Movies-Coding-and-Hacking.html"
    },

    {
        title: "What is the Satellite Internet?",
        cover: "../assets/images/satellite-internet.avif",
        link: "../News/Satellite-Internet-from-space-relays-to-a-global-broadband-race.html"
    },

    {
        title: "Snapdragon Summit 2026",
        cover: "../assets/images/qualcomm-snapdragon.avif",
        link: "../News/Qualcomm announces its next two flagship chips on September 22.html"
    },

];


/* =========================================
   Apply Paper Data
   ========================================= */

papers.forEach((paper, index) => {

    const number = index + 1;

    // Title
    document.querySelectorAll(`.paper-title${number}`).forEach(el => {
        el.textContent = paper.title;
    });

    // Image
    document.querySelectorAll(`.paper-img${number}`).forEach(el => {
        if (paper.cover) {
            el.src = paper.cover;
        }
    });

    // Link
    document.querySelectorAll(`.paper-link${number}`).forEach(el => {
        if (paper.link) {
            el.href = paper.link;
        }
    });

});

/* =========================================
   Page Transition
   ========================================= */
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
window.addEventListener("pageshow", function () {
    const transition = document.getElementById("page-transition");

    if (transition) {
        transition.style.transition = "none";
        transition.style.transform = "translate(-50%, -50%) scale(0)";
        transition.style.width = "20px";
        transition.style.height = "20px";
        requestAnimationFrame(() => {
            transition.style.transition = "";
        });
    }
});
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
        story1: { type: "video", src: "assets/video/Honor-new-logo.mp4", alt: "Honor new logo" },
        story2: { type: "video", src: "assets/video/honor-robotic-camera.mp4", alt: "honor robotic phone" },
        story3: { type: "video", src: "assets/video/Qualcomm-snapdragon-summit-2026.mp4", alt: "Qualcomm" },
        story4: { type: "video", src: "assets/video/3D - Dolby Atmos.mp4", alt: "Dolby Atmos"}
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

/* ------------ Back to top ------------ */
function backToTop() {
    const startPosition = window.scrollY;
    const duration = 350;
    const startTime = performance.now();

    function scrollAnimation(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Smooth ease-out
        const ease = 1 - Math.pow(1 - progress, 3);

        window.scrollTo(
            0,
            startPosition * (1 - ease)
        );

        if (progress < 1) {
            requestAnimationFrame(scrollAnimation);
        }
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
/* Aethercom Edit Profile */

/* Aethercom profile sync */
(function () {
    const PROFILE_KEY = "aethercom-profile";

    function getStoredProfile() {
        try {
            return JSON.parse(localStorage.getItem(PROFILE_KEY)) || null;
        } catch {
            return null;
        }
    }

    function applyProfileToPage() {
        const data = getStoredProfile();
        if (!data) return;

        const headerImage = document.querySelector(".profile-btn .profile-pic");
        if (headerImage) {
            if (data.avatar) {
                headerImage.src = data.avatar;
                headerImage.removeAttribute("data-profile-default");
            } else {
                headerImage.src = "assets/images/profile.avif";
                headerImage.setAttribute("data-profile-default", "true");
            }
        }

        const name = document.getElementById("previewName");
        const username = document.getElementById("previewUsername");
        const bio = document.getElementById("previewBio");
        const location = document.getElementById("previewLocation");
        const avatar = document.getElementById("previewAvatar");
        const initial = document.getElementById("avatarInitial");
        const cover = document.getElementById("previewCover");
        const links = document.getElementById("previewLinks");

        if (name) name.textContent = data.name || "Aethercom User";
        if (username) username.textContent = data.username || "@username";
        if (bio) bio.textContent = data.bio || "";
        if (location) {
            location.textContent = data.location || "";
            location.style.display = data.showLocation && data.location ? "" : "none";
        }

        if (avatar && initial) {
            if (data.avatar) {
                avatar.src = data.avatar;
                avatar.style.display = "block";
                initial.style.display = "none";
            } else {
                avatar.removeAttribute("src");
                avatar.style.display = "none";
                initial.style.display = "block";
                initial.textContent = (data.name || "A").trim().charAt(0).toUpperCase();
            }
        }

        if (cover) {
            cover.style.backgroundImage = data.cover
                ? `linear-gradient(to bottom,transparent 35%,rgba(1,1,15,.9)),url("${data.cover}")`
                : "linear-gradient(to bottom,transparent 35%,rgba(1,1,15,.9)),linear-gradient(135deg,#02618d,#01db8d)";
        }

        if (links) {
            links.innerHTML = "";

            const addLink = (href, text) => {
                if (!href) return;
                const a = document.createElement("a");
                a.href = href;
                a.target = "_blank";
                a.rel = "noopener noreferrer";
                a.textContent = text;
                links.appendChild(a);
            };

            if (data.showWebsite && data.website) {
                try {
                    const u = new URL(data.website);
                    if (/^https?:$/.test(u.protocol)) addLink(u.href, "WEB");
                } catch {}
            }

            if (data.telegram) {
                const value = data.telegram;
                addLink(
                    /^https?:\/\//i.test(value)
                        ? value
                        : "https://t.me/" + value.replace(/^@/, ""),
                    "TG"
                );
            }

            if (data.instagram) {
                const value = data.instagram;
                addLink(
                    /^https?:\/\//i.test(value)
                        ? value
                        : "https://instagram.com/" + value.replace(/^@/, ""),
                    "IG"
                );
            }
        }
    }

    applyProfileToPage();

    window.addEventListener("storage", function (event) {
        if (event.key === PROFILE_KEY) applyProfileToPage();
    });

    window.addEventListener("aethercom-profile-updated", applyProfileToPage);
})();

/*  =============================
    Profile Fixing
    ============================= */
(() => {
const KEY="aethercom-profile";
const defaults={name:"",username:"",bio:"",location:"",website:"",telegram:"",instagram:"",avatar:"",cover:"",showLocation:true,showWebsite:true};
const $=id=>document.getElementById(id);

function read(){try{return {...defaults,...(JSON.parse(localStorage.getItem(KEY))||{})}}catch{return {...defaults}}}
function persist(d){localStorage.setItem(KEY,JSON.stringify(d))}
function toast(t){const e=$("toast");e.textContent=t;e.classList.add("show");clearTimeout(window._t);window._t=setTimeout(()=>e.classList.remove("show"),2200)}
function username(v){v=v.trim();return v?(v.startsWith("@")?v:"@"+v):"@username"}
function url(v){try{const u=new URL(v);return /^https?:$/.test(u.protocol)?u.href:""}catch{return""}}
function social(v,type){if(!v)return"";return /^https?:\/\//i.test(v)?v:(type==="telegram"?"https://t.me/":"https://instagram.com/")+v.replace(/^@/,"")}
function sw(id,on){$(id).classList.toggle("on",!!on)}

function render(d){
$("name").value=d.name;$("username").value=d.username;$("bio").value=d.bio;$("location").value=d.location;$("website").value=d.website;$("telegram").value=d.telegram;$("instagram").value=d.instagram;
$("avatarUrl").value=d.avatar.startsWith("data:")?"":d.avatar;$("coverUrl").value=d.cover.startsWith("data:")?"":d.cover;
sw("showLocation",d.showLocation);sw("showWebsite",d.showWebsite);
$("previewName").textContent=d.name||defaults.name;$("previewUsername").textContent=username(d.username);$("previewBio").textContent=d.bio||"";
$("previewLocation").textContent=d.location;$("previewLocation").style.display=d.showLocation&&d.location?"":"none";
const av=$("previewAvatar"),initial=$("avatarInitial");
if(d.avatar){av.src=d.avatar;av.style.display="block";initial.style.display="none"}else{av.removeAttribute("src");av.style.display="none";initial.style.display="block";initial.textContent=(d.name||"A").trim().charAt(0).toUpperCase()}
$("previewCover").style.backgroundImage=d.cover?`linear-gradient(to bottom,transparent 35%,rgba(1,1,15,.9)),url("${d.cover}")`:"linear-gradient(to bottom,transparent 35%,rgba(1,1,15,.9)),linear-gradient(135deg,#02618d,#01db8d)";
const links=$("previewLinks");links.innerHTML="";
if(d.showWebsite&&url(d.website))add(links,d.website,"WEB");
if(d.telegram)add(links,social(d.telegram,"telegram"),"TG");
if(d.instagram)add(links,social(d.instagram,"instagram"),"IG");
}
function add(p,h,t){const a=document.createElement("a");a.href=h;a.target="_blank";a.rel="noopener noreferrer";a.textContent=t;p.appendChild(a)}
function current(){return{name:$("name").value.trim()||defaults.name,username:username($("username").value),bio:$("bio").value.trim()||defaults.bio,location:$("location").value.trim(),website:$("website").value.trim(),telegram:$("telegram").value.trim(),instagram:$("instagram").value.trim(),avatar:$("avatarUrl").dataset.value||$("avatarUrl").value.trim(),cover:$("coverUrl").dataset.value||$("coverUrl").value.trim(),showLocation:$("showLocation").classList.contains("on"),showWebsite:$("showWebsite").classList.contains("on")}}
function update(){render(current())}
function file(input,target){
const f=input.files&&input.files[0];if(!f)return;
if(!f.type.startsWith("image/"))return toast("The selected file is not an image.");
if(f.size>4*1024*1024){input.value="";return toast("Image size should be less than 4MB")}
const r=new FileReader();r.onload=()=>{$(target).dataset.value=r.result;update();persist(current());window.dispatchEvent(new Event("aethercom-profile-updated"))};r.readAsDataURL(f)
}
$("avatarFile").addEventListener("change",()=>file($("avatarFile"),"avatarUrl"));
$("coverFile").addEventListener("change",()=>file($("coverFile"),"coverUrl"));
["name","username","bio","location","website","telegram","instagram","avatarUrl","coverUrl"].forEach(id=>$(id).addEventListener("input",()=>{update();persist(current());window.dispatchEvent(new Event("aethercom-profile-updated"));}));
["showLocation","showWebsite"].forEach(id=>$(id).addEventListener("click",()=>{$(id).classList.toggle("on");update();persist(current());window.dispatchEvent(new Event("aethercom-profile-updated"));}));
$("save").addEventListener("click",()=>{const d=current();persist(d);render(d);toast("Profile saved successfully!")});
$("reset").addEventListener("click",()=>{render(read());toast("Saved info was loaded")});
$("clear").addEventListener("click",()=>{if(!confirm("Delete profile info from this browser?"))return;localStorage.removeItem(KEY);$("avatarUrl").dataset.value="";$("coverUrl").dataset.value="";$("avatarFile").value="";$("coverFile").value="";render({...defaults});toast("Profile info has been deleted.")});
render(read());
})();