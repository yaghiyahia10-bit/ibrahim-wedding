document.addEventListener("DOMContentLoaded", function () {

    // موعد الزفاف: 20 حزيران 2027 الساعة 6 مساءً
    const weddingDate = new Date(2027, 5, 20, 18, 0, 0).getTime();

    // =========================
    // العداد التنازلي
    // =========================

    function updateCountdown() {

        const now = new Date().getTime();
        const difference = weddingDate - now;

        const countdownBox = document.querySelector(".countdown-box");

        if (difference <= 0) {

            if (countdownBox) {
                countdownBox.innerHTML =
                    "أهلاً بكم في ليلة العمر ✧";
            }

            clearInterval(countdownInterval);
            return;
        }

        const days = Math.floor(
            difference / (1000 * 60 * 60 * 24)
        );

        const hours = Math.floor(
            (difference / (1000 * 60 * 60)) % 24
        );

        const minutes = Math.floor(
            (difference / (1000 * 60)) % 60
        );

        const seconds = Math.floor(
            (difference / 1000) % 60
        );

        document.getElementById("days").textContent = days;

        document.getElementById("hours").textContent =
            String(hours).padStart(2, "0");

        document.getElementById("minutes").textContent =
            String(minutes).padStart(2, "0");

        document.getElementById("seconds").textContent =
            String(seconds).padStart(2, "0");
    }

    updateCountdown();

    const countdownInterval = setInterval(updateCountdown, 1000);


    // =========================
    // فتح الدعوة وتشغيل الموسيقى
    // =========================

    const openButton = document.getElementById("openInvitation");
    const cover = document.getElementById("invitationCover");
    const content = document.getElementById("invitationContent");
    const music = document.getElementById("weddingMusic");

    if (openButton && cover && content) {

        openButton.addEventListener("click", function () {

            openButton.disabled = true;

            // تشغيل الموسيقى بعد ضغط الزائر
            if (music) {

                music.currentTime = 0;

                music.play().catch(function (error) {
                    console.log("تعذر تشغيل الموسيقى:", error);
                });

            }

            // بدء حركة فتح الغلاف
            cover.classList.add("opening");

            setTimeout(function () {

                cover.style.display = "none";
                content.hidden = false;

                window.scrollTo({
                    top: 0,
                    behavior: "instant"
                });

            }, 950);

        });

    }


    // =========================
    // ظهور الأقسام عند التمرير
    // =========================

    const sections = document.querySelectorAll(
        ".gallery, .quotes-section, .countdown, .calendar-section, .venue-section"
    );

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    // الحركة مرة واحدة فقط
                    observer.unobserve(entry.target);

                }

            });

        }, {
            threshold: 0.12
        });

        sections.forEach(function (section) {
            observer.observe(section);
        });

    } else {

        sections.forEach(function (section) {
            section.classList.add("show");
        });

    }

});