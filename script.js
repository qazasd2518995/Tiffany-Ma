/* ============================================================
   Tiffany ｜ 英語教育見習成果展示  互動腳本
   ============================================================ */
(function () {
  "use strict";

  var PHOTOS = [
    { src: "photo-01.jpg", cap: "黑板板書與課堂筆記" },
    { src: "photo-03.jpg", cap: "學生專注上課的側影" },
    { src: "photo-02.jpg", cap: "電子白板搭配電子書教學" },
    { src: "photo-04.jpg", cap: "電子白板上的教學影片" },
    { src: "photo-05.jpg", cap: "學生討論與互動" },
    { src: "photo-06.jpg", cap: "課堂中的影片教學" },
    { src: "photo-07.jpg", cap: "電子白板教學現場" },
    { src: "photo-08.jpg", cap: "外師協同教學現場" },
    { src: "photo-09.jpg", cap: "A Million Dreams 歌詞講義" },
    { src: "photo-10.jpg", cap: "全班一起練唱" },
    { src: "photo-11.jpg", cap: "黑板教學與板書示範" },
    { src: "photo-12.jpg", cap: "電子白板課堂一隅" },
    { src: "photo-13.jpg", cap: "學生上課實況" },
    { src: "photo-14.jpg", cap: "試教現場：學生與簡報" },
    { src: "photo-15.jpg", cap: "課堂教學一隅" },
    { src: "photo-16.jpg", cap: "電子白板上的教學內容" }
  ];

  document.addEventListener("DOMContentLoaded", function () {
    buildGallery();
    initNavScroll();
    initMobileMenu();
    initAccordion();
    initReveal();
    initHeroReveal();
    initScrollSpy();
    initLightbox();
    initCountUp();
  });

  function buildGallery() {
    var grid = document.getElementById("galleryGrid");
    if (!grid) return;
    var html = "";
    PHOTOS.forEach(function (p, i) {
      html += '<div class="gal__item reveal" data-index="' + i + '">' +
        '<img src="assets/photos/' + p.src + '" alt="' + p.cap + '" loading="lazy"></div>';
    });
    grid.innerHTML = html;
  }

  function initNavScroll() {
    var nav = document.getElementById("nav");
    if (!nav) return;
    var onScroll = function () {
      if (window.scrollY > 14) nav.classList.add("is-scrolled");
      else nav.classList.remove("is-scrolled");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  function initMobileMenu() {
    var toggle = document.getElementById("navToggle");
    var links = document.querySelector(".nav__links");
    if (!toggle || !links) return;
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "關閉選單" : "開啟選單");
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  function initAccordion() {
    document.querySelectorAll(".obs__bar").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var card = btn.closest(".obs");
        var open = card.classList.toggle("is-open");
        btn.setAttribute("aria-expanded", open ? "true" : "false");
      });
    });
  }

  function initReveal() {
    var els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      els.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    els.forEach(function (el) { io.observe(el); });
  }

  /* Hero 標題 staggered 進場（載入即觸發） */
  function initHeroReveal() {
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        document.querySelectorAll(".reveal-up").forEach(function (el) {
          el.classList.add("is-visible");
        });
      });
    });
  }

  function initScrollSpy() {
    var sections = document.querySelectorAll("main section[id]");
    var linkMap = {};
    document.querySelectorAll(".nav__links a").forEach(function (a) {
      linkMap[a.getAttribute("href").slice(1)] = a;
    });
    if (!("IntersectionObserver" in window)) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          Object.keys(linkMap).forEach(function (k) { linkMap[k].classList.remove("is-active"); });
          var link = linkMap[e.target.id];
          if (link) link.classList.add("is-active");
        }
      });
    }, { threshold: 0, rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(function (s) { io.observe(s); });
  }

  /* 數字 count-up */
  function initCountUp() {
    var nums = document.querySelectorAll(".hero__stats b[data-count]");
    if (!nums.length || !("IntersectionObserver" in window)) return;
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target;
        io.unobserve(el);
        var target = parseInt(el.getAttribute("data-count"), 10);
        if (reduce) { el.textContent = target; return; }
        var start = null, dur = 900;
        function tick(ts) {
          if (!start) start = ts;
          var p = Math.min((ts - start) / dur, 1);
          el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
          if (p < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      });
    }, { threshold: 0.5 });
    nums.forEach(function (n) { io.observe(n); });
  }

  /* 學生作答學習單圖集 */
  var WORKS = [
    { src: "work-01.jpg", cap: "學生作答學習單" },
    { src: "work-02.jpg", cap: "學生作答學習單" },
    { src: "work-03.jpg", cap: "學生作答學習單" },
    { src: "work-04.jpg", cap: "學生作答學習單" },
    { src: "work-05.jpg", cap: "學生作答學習單" },
    { src: "work-06.jpg", cap: "學生作答學習單" }
  ];

  /* Chit-chat 完整版 14 頁圖集 */
  var CHITCHAT = [];
  for (var ci = 1; ci <= 14; ci++) {
    var cn = ci < 10 ? "0" + ci : "" + ci;
    CHITCHAT.push({ src: "page-" + cn + ".jpg", cap: "Chit-chat 完整版" });
  }

  function initLightbox() {
    var lb = document.getElementById("lightbox");
    var lbImg = document.getElementById("lbImg");
    var lbCap = document.getElementById("lbCap");
    var current = 0;
    var album = PHOTOS;
    var dir = "assets/photos/";

    function open(i) {
      current = (i + album.length) % album.length;
      lbImg.src = dir + album[current].src;
      lbImg.alt = album[current].cap;
      lbCap.textContent = album[current].cap + " ｜ " + (current + 1) + " / " + album.length;
      lb.classList.add("is-open");
      lb.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    }
    function close() {
      lb.classList.remove("is-open");
      lb.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }
    function step(d) { open(current + d); }

    document.getElementById("galleryGrid").addEventListener("click", function (e) {
      var item = e.target.closest(".gal__item");
      if (!item) return;
      album = PHOTOS; dir = "assets/photos/";
      open(parseInt(item.getAttribute("data-index"), 10));
    });
    var worksGrid = document.getElementById("worksGrid");
    if (worksGrid) {
      worksGrid.addEventListener("click", function (e) {
        var item = e.target.closest(".works__item");
        if (!item) return;
        album = WORKS; dir = "assets/students/";
        open(parseInt(item.getAttribute("data-windex"), 10));
      });
    }
    function openChitchat() {
      album = CHITCHAT; dir = "assets/chitchat/";
      open(0);
    }
    var ccCover = document.getElementById("ccCover");
    var ccBrowse = document.getElementById("ccBrowse");
    if (ccCover) {
      ccCover.addEventListener("click", openChitchat);
      ccCover.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openChitchat(); }
      });
    }
    if (ccBrowse) ccBrowse.addEventListener("click", openChitchat);
    document.getElementById("lbClose").addEventListener("click", close);
    document.getElementById("lbPrev").addEventListener("click", function () { step(-1); });
    document.getElementById("lbNext").addEventListener("click", function () { step(1); });
    lb.addEventListener("click", function (e) { if (e.target === lb) close(); });
    document.addEventListener("keydown", function (e) {
      if (!lb.classList.contains("is-open")) return;
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") step(-1);
      else if (e.key === "ArrowRight") step(1);
    });
  }
})();
