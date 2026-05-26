document.addEventListener('DOMContentLoaded', () => {
    // 0. Inject premium style.css
    const styleLink = document.createElement('link');
    styleLink.rel = 'stylesheet';
    styleLink.href = 'style.css';
    document.head.appendChild(styleLink);

    // 1. Inject Mobile Menu HTML dynamically
    const mobileMenuHTML = `
    <div id="mobile-menu" class="fixed inset-0 bg-stone-900/50 backdrop-blur-md z-[100] transition-opacity duration-300 opacity-0 pointer-events-none">
        <div id="mobile-menu-drawer" class="fixed top-0 right-0 w-80 h-full bg-stone-50 dark:bg-teal-950 p-8 shadow-2xl flex flex-col justify-between transform translate-x-full transition-transform duration-300">
            <div>
                <div class="flex justify-between items-center mb-8 pb-4 border-b border-outline-variant/30">
                    <span class="font-headline text-xl font-bold text-primary dark:text-white">Menu IDDC</span>
                    <button id="close-menu" class="text-primary dark:text-white p-2 hover:bg-primary/5 rounded-full transition-colors flex items-center justify-center">
                        <span class="material-symbols-outlined text-2xl">close</span>
                    </button>
                </div>
                <nav class="flex flex-col gap-6">
                    <a href="index.html" class="nav-link-mobile text-teal-900/80 dark:text-stone-300/80 font-medium text-lg hover:text-secondary dark:hover:text-secondary-fixed transition-colors" data-page="index">Beranda</a>
                    <a href="profil.html" class="nav-link-mobile text-teal-900/80 dark:text-stone-300/80 font-medium text-lg hover:text-secondary dark:hover:text-secondary-fixed transition-colors" data-page="profil">Profil IDDC</a>
                    <a href="aktivitas-kuliah.html" class="nav-link-mobile text-teal-900/80 dark:text-stone-300/80 font-medium text-lg hover:text-secondary dark:hover:text-secondary-fixed transition-colors" data-page="aktivitas-kuliah">Aktifitas Kuliah</a>
                    <a href="kegiatan-ekstra.html" class="nav-link-mobile text-teal-900/80 dark:text-stone-300/80 font-medium text-lg hover:text-secondary dark:hover:text-secondary-fixed transition-colors" data-page="kegiatan-ekstra">Kegiatan Ekstra</a>
                    <a href="karya-kolaborasi.html" class="nav-link-mobile text-teal-900/80 dark:text-stone-300/80 font-medium text-lg hover:text-secondary dark:hover:text-secondary-fixed transition-colors" data-page="karya-kolaborasi">Karya & Kolaborasi</a>
                    <a href="pmb.html" class="nav-link-mobile text-teal-900/80 dark:text-stone-300/80 font-medium text-lg hover:text-secondary dark:hover:text-secondary-fixed transition-colors" data-page="pmb">PMB</a>
                    <a href="kata-alumni.html" class="nav-link-mobile text-teal-900/80 dark:text-stone-300/80 font-medium text-lg hover:text-secondary dark:hover:text-secondary-fixed transition-colors" data-page="kata-alumni">Kata Alumni</a>
                </nav>
            </div>
            <div class="flex flex-col gap-4">
                <a href="pmb.html" class="bg-primary text-on-primary text-center py-3 rounded-md font-semibold hover:bg-primary-container transition-all scale-100 active:scale-95">Daftar Sekarang</a>
            </div>
        </div>
    </div>
    `;

    document.body.insertAdjacentHTML('beforeend', mobileMenuHTML);

    // 2. DOM Elements for Menu
    const menuBtn = document.querySelector('button[aria-label="Menu"]');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileDrawer = document.getElementById('mobile-menu-drawer');
    const closeBtn = document.getElementById('close-menu');

    if (menuBtn && mobileMenu && mobileDrawer && closeBtn) {
        const openMenu = () => {
            mobileMenu.classList.remove('pointer-events-none', 'opacity-0');
            mobileMenu.classList.add('opacity-100');
            mobileDrawer.classList.remove('translate-x-full');
            document.body.style.overflow = 'hidden'; // prevent scroll
        };

        const closeMenu = () => {
            mobileMenu.classList.add('pointer-events-none', 'opacity-0');
            mobileMenu.classList.remove('opacity-100');
            mobileDrawer.classList.add('translate-x-full');
            document.body.style.overflow = ''; // restore scroll
        };

        menuBtn.addEventListener('click', openMenu);
        closeBtn.addEventListener('click', closeMenu);
        mobileMenu.addEventListener('click', (e) => {
            if (e.target === mobileMenu) {
                closeMenu();
            }
        });
    }

    // 3. Set Active Class on Current Page Nav Links
    const currentPath = window.location.pathname;
    const currentPage = currentPath.substring(currentPath.lastIndexOf('/') + 1) || 'index.html';
    
    // Highlight desktop links
    const desktopLinks = document.querySelectorAll('header nav a');
    desktopLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && currentPage.includes(href.replace('.html', ''))) {
            link.classList.remove('text-teal-900/70', 'dark:text-stone-300/70');
            link.classList.add('text-secondary', 'dark:text-secondary-fixed', 'font-semibold');
            
            // Add premium dot active indicator if it matches design token style
            const dot = document.createElement('span');
            dot.className = 'absolute bottom-[-6px] left-1/2 transform -translate-x-1/2 w-1 h-1 bg-secondary rounded-full';
            link.style.position = 'relative';
            link.appendChild(dot);
        }
    });

    // Highlight mobile links
    const mobileLinks = document.querySelectorAll('.nav-link-mobile');
    mobileLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && currentPage.includes(href.replace('.html', ''))) {
            link.classList.remove('text-teal-900/80', 'dark:text-stone-300/80');
            link.classList.add('text-secondary', 'dark:text-secondary-fixed', 'font-bold', 'pl-2', 'border-l-2', 'border-secondary');
        }
    });

    // 4. Smooth scroll/Fade load animations (Micro-animations)
    const animateElements = document.querySelectorAll('section, .group, header');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('opacity-100', 'translate-y-0');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    // CSS class overrides for seamless experience
    const style = document.createElement('style');
    style.innerHTML = `
        /* Premium transitions and animations */
        section {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .opacity-100 { opacity: 1 !important; }
        .translate-y-0 { transform: translateY(0) !important; }
    `;
    document.head.appendChild(style);

    animateElements.forEach(el => {
        // Skip header animation trigger
        if (el.tagName === 'HEADER') {
            el.style.opacity = '1';
            el.style.transform = 'none';
        } else {
            observer.observe(el);
        }
    });
});
