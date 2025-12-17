// Основной JavaScript файл для учебника HTML5 & CSS3

// DOM элементы
const sidebar = document.getElementById('sidebar');
const sidebarToggle = document.getElementById('sidebarToggle');
const sidebarClose = document.getElementById('sidebarClose');
const scrollToTopBtn = document.getElementById('scrollToTop');
const progressBar = document.getElementById('progressBar');

// Элементы для отображения текущих свойств Flexbox
const currentDirection = document.getElementById('currentDirection');
const currentJustify = document.getElementById('currentJustify');
const currentWrap = document.getElementById('currentWrap');

// Инициализация сайта
function initWebsite() {
    console.log("Инициализация сайта...");

    // Переключение боковой панели
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.add('active');
        });
    }

    if (sidebarClose) {
        sidebarClose.addEventListener('click', () => {
            sidebar.classList.remove('active');
        });
    }

    // Закрыть боковую панель при клике на ссылку (мобильные)
    document.querySelectorAll('.sidebar-nav a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 768) {
                sidebar.classList.remove('active');
            }
        });
    });

    // Обновление активной ссылки при скролле
    window.addEventListener('scroll', handleScroll);

    // Кнопка "наверх"
    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Инициализация Intersection Observer для анимаций
    initIntersectionObserver();

    // Инициализация всех демонстраций
    initBoxModelDemo();
    initDimensionDemo();
    initFontDemo();
    initAudioDemo();
    initAnimationDemo();
    initColorChangeDemo();
    initBorderDemo();
    initFlexboxDemo();
    initGridDemo();
    initModernCSSDemo();
    initImageDemo();
    initTransitionDemos();
    initDesignPrinciplesDemo(); // Добавлена новая функция

    // Инициализация кнопок показа кода
    initCodeExamples();

    // Обновление прогресс-бара при загрузке
    window.dispatchEvent(new Event('scroll'));
}

// Обработка скролла
function handleScroll() {
    // Обновление активной ссылки в навигации
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.sidebar-nav a');

    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;

        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });

    // Показать/скрыть кнопку "наверх"
    if (scrollToTopBtn) {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    }

    // Обновление прогресс-бара
    if (progressBar) {
        const winHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight;
        const scrollTop = window.scrollY;
        const trackLength = docHeight - winHeight;
        const progress = Math.floor((scrollTop / trackLength) * 100);
        progressBar.style.width = `${progress}%`;
    }
}

// Intersection Observer для анимаций
function initIntersectionObserver() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(element => {
        observer.observe(element);
    });
}

// Демонстрация Box Model
function initBoxModelDemo() {
    console.log("Инициализация Box Model демо...");
    const increasePaddingBtn = document.getElementById('increasePaddingBtn');
    const decreasePaddingBtn = document.getElementById('decreasePaddingBtn');
    const increaseMarginBtn = document.getElementById('increaseMarginBtn');
    const decreaseMarginBtn = document.getElementById('decreaseMarginBtn');
    const boxModelInner = document.querySelector('.box-model-inner');
    const boxModelContent = document.querySelector('.box-model-content');
    const boxModelOuter = document.querySelector('.box-model-outer');

    let padding = 30;
    let margin = 20;

    function updateBoxModel() {
        if (boxModelInner && boxModelContent && boxModelOuter) {
            boxModelInner.style.padding = `${padding}px`;
            boxModelContent.style.padding = `${padding}px`;
            boxModelOuter.style.margin = `${margin}px`;
        }
    }

    if (increasePaddingBtn) {
        increasePaddingBtn.addEventListener('click', () => {
            padding = Math.min(60, padding + 5);
            updateBoxModel();
        });
    }

    if (decreasePaddingBtn) {
        decreasePaddingBtn.addEventListener('click', () => {
            padding = Math.max(10, padding - 5);
            updateBoxModel();
        });
    }

    if (increaseMarginBtn) {
        increaseMarginBtn.addEventListener('click', () => {
            margin = Math.min(60, margin + 5);
            updateBoxModel();
        });
    }

    if (decreaseMarginBtn) {
        decreaseMarginBtn.addEventListener('click', () => {
            margin = Math.max(10, margin - 5);
            updateBoxModel();
        });
    }
}

// Демонстрация размеров
function initDimensionDemo() {
    console.log("Инициализация демо размеров...");
    const sizeBox = document.getElementById('sizeBox');
    const widthValue = document.getElementById('widthValue');
    const heightValue = document.getElementById('heightValue');
    const increaseSizeBtn = document.getElementById('increaseSizeBtn');
    const decreaseSizeBtn = document.getElementById('decreaseSizeBtn');
    const changeBackgroundBtn = document.getElementById('changeBackgroundBtn');

    let width = 300;
    let height = 200;
    let bgIndex = 0;
    const backgrounds = [
        'linear-gradient(135deg, #4361ee, #3a0ca3)',
        'linear-gradient(135deg, #f72585, #7209b7)',
        'linear-gradient(135deg, #4cc9f0, #4361ee)',
        'linear-gradient(135deg, #f8961e, #f94144)'
    ];

    function updateSizeBox() {
        if (sizeBox && widthValue && heightValue) {
            sizeBox.style.width = `${width}px`;
            sizeBox.style.height = `${height}px`;
            widthValue.textContent = width;
            heightValue.textContent = height;
        }
    }

    function changeBackground() {
        if (sizeBox) {
            bgIndex = (bgIndex + 1) % backgrounds.length;
            sizeBox.style.background = backgrounds[bgIndex];
        }
    }

    if (increaseSizeBtn) {
        increaseSizeBtn.addEventListener('click', () => {
            width += 30;
            height += 20;
            updateSizeBox();
        });
    }

    if (decreaseSizeBtn) {
        decreaseSizeBtn.addEventListener('click', () => {
            if (width > 150 && height > 100) {
                width -= 30;
                height -= 20;
                updateSizeBox();
            }
        });
    }

    if (changeBackgroundBtn) {
        changeBackgroundBtn.addEventListener('click', changeBackground);
    }

    updateSizeBox();
}

// Демонстрация шрифтов
function initFontDemo() {
    console.log("Инициализация демо шрифтов...");
    const fontFamilyElement = document.getElementById('fontFamily');
    const fontSizeElement = document.getElementById('fontSize');
    const fontStyleElement = document.getElementById('fontStyle');
    const fontWeightElement = document.getElementById('fontWeight');
    const changeFontFamilyBtn = document.getElementById('changeFontFamilyBtn');
    const changeFontSizeBtn = document.getElementById('changeFontSizeBtn');
    const toggleFontStyleBtn = document.getElementById('toggleFontStyleBtn');
    const toggleFontWeightBtn = document.getElementById('toggleFontWeightBtn');

    const fontFamilies = [
        "'Poppins', sans-serif",
        "'Georgia', serif",
        "'Courier New', monospace",
        "'Arial', sans-serif"
    ];

    let currentFontIndex = 0;
    let currentSize = 24;
    let isItalic = false;
    let isBold = false;

    function updateFontFamily() {
        if (fontFamilyElement) {
            currentFontIndex = (currentFontIndex + 1) % fontFamilies.length;
            fontFamilyElement.style.fontFamily = fontFamilies[currentFontIndex];
            fontFamilyElement.textContent = `font-family: ${fontFamilies[currentFontIndex]}`;
        }
    }

    function updateFontSize() {
        if (fontSizeElement) {
            currentSize = currentSize === 32 ? 16 : currentSize + 4;
            fontSizeElement.style.fontSize = `${currentSize}px`;
            fontSizeElement.textContent = `font-size: ${currentSize}px`;
        }
    }

    function toggleFontStyle() {
        if (fontStyleElement) {
            isItalic = !isItalic;
            fontStyleElement.style.fontStyle = isItalic ? 'italic' : 'normal';
            fontStyleElement.textContent = `font-style: ${isItalic ? 'italic' : 'normal'}`;
        }
    }

    function toggleFontWeight() {
        if (fontWeightElement) {
            isBold = !isBold;
            fontWeightElement.style.fontWeight = isBold ? 'bold' : 'normal';
            fontWeightElement.textContent = `font-weight: ${isBold ? 'bold' : 'normal'}`;
        }
    }

    if (changeFontFamilyBtn) changeFontFamilyBtn.addEventListener('click', updateFontFamily);
    if (changeFontSizeBtn) changeFontSizeBtn.addEventListener('click', updateFontSize);
    if (toggleFontStyleBtn) toggleFontStyleBtn.addEventListener('click', toggleFontStyle);
    if (toggleFontWeightBtn) toggleFontWeightBtn.addEventListener('click', toggleFontWeight);
}

// Демонстрация аудио
function initAudioDemo() {
    console.log("Инициализация аудио демо...");
    const audioPlayer = document.getElementById('audioPlayer');
    const playAudioBtn = document.getElementById('playAudioBtn');
    const pauseAudioBtn = document.getElementById('pauseAudioBtn');
    const restartAudioBtn = document.getElementById('restartAudioBtn');

    if (audioPlayer) {
        audioPlayer.volume = 0.5;
    }

    if (playAudioBtn) {
        playAudioBtn.addEventListener('click', () => {
            if (audioPlayer) audioPlayer.play();
        });
    }

    if (pauseAudioBtn) {
        pauseAudioBtn.addEventListener('click', () => {
            if (audioPlayer) audioPlayer.pause();
        });
    }

    if (restartAudioBtn) {
        restartAudioBtn.addEventListener('click', () => {
            if (audioPlayer) {
                audioPlayer.currentTime = 0;
                audioPlayer.play();
            }
        });
    }
}

// Демонстрация анимаций
function initAnimationDemo() {
    const animatedBox = document.getElementById('animatedBox');
    const startAnimationBtn = document.getElementById('startAnimationBtn');
    const pauseAnimationBtn = document.getElementById('pauseAnimationBtn');
    const resetAnimationBtn = document.getElementById('resetAnimationBtn');

    let isAnimating = true;

    function startAnimation() {
        if (animatedBox) {
            isAnimating = true;
            animatedBox.style.animationPlayState = 'running';
        }
    }

    function pauseAnimation() {
        if (animatedBox) {
            isAnimating = !isAnimating;
            animatedBox.style.animationPlayState = isAnimating ? 'running' : 'paused';
        }
    }

    function resetAnimation() {
        if (animatedBox) {
            animatedBox.style.animation = 'none';
            void animatedBox.offsetWidth; // Триггер перерисовки
            animatedBox.style.animation = 'bounce 2s infinite alternate';
        }
    }

    if (startAnimationBtn) startAnimationBtn.addEventListener('click', startAnimation);
    if (pauseAnimationBtn) pauseAnimationBtn.addEventListener('click', pauseAnimation);
    if (resetAnimationBtn) resetAnimationBtn.addEventListener('click', resetAnimation);
}

// Смена цвета
function initColorChangeDemo() {
    console.log("Инициализация демо смены цвета...");
    const colorChangeBtn = document.getElementById('colorChangeBtn');
    const toggleHighlightBtn = document.getElementById('toggleHighlightBtn');
    const uniqueSpan = document.getElementById('unique-span');
    const firstSpan = document.querySelector('.highlight');

    // 1. Кнопка "Переключить выделение" - исправлена
    if (toggleHighlightBtn && firstSpan) {
        toggleHighlightBtn.addEventListener('click', function (e) {
            e.preventDefault();
            console.log("Кнопка 'Переключить выделение' нажата");
            firstSpan.classList.toggle('highlight');

            // Если класс highlight удален, добавляем его обратно через секунду
            if (!firstSpan.classList.contains('highlight')) {
                setTimeout(() => {
                    firstSpan.classList.add('highlight');
                }, 1000);
            }
        });
    }

    if (colorChangeBtn && uniqueSpan) {
        colorChangeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const colors = ['#f72585', '#4361ee', '#4cc9f0', '#f8961e', '#2a9d8f', '#7209b7'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            uniqueSpan.style.color = randomColor;
            uniqueSpan.style.fontWeight = 'bold';
        });
    }
}

// Демонстрация границ
function initBorderDemo() {
    console.log("Инициализация демо границ...");
    const increaseBorderBtn = document.getElementById('increaseBorderBtn');
    const decreaseBorderBtn = document.getElementById('decreaseBorderBtn');
    const changeBorderColorBtn = document.getElementById('changeBorderColorBtn');
    const borderExamples = document.querySelectorAll('.border-example');

    let borderWidth = 3;
    let colorIndex = 0;
    const colors = ['#4361ee', '#f72585', '#4cc9f0', '#f8961e', '#2a9d8f'];

    function updateBorders() {
        borderExamples.forEach(box => {
            box.style.borderWidth = `${borderWidth}px`;
            box.style.borderColor = colors[colorIndex];
        });
    }

    if (increaseBorderBtn) {
        increaseBorderBtn.addEventListener('click', () => {
            borderWidth = Math.min(10, borderWidth + 1);
            updateBorders();
        });
    }

    if (decreaseBorderBtn) {
        decreaseBorderBtn.addEventListener('click', () => {
            borderWidth = Math.max(1, borderWidth - 1);
            updateBorders();
        });
    }

    if (changeBorderColorBtn) {
        changeBorderColorBtn.addEventListener('click', () => {
            colorIndex = (colorIndex + 1) % colors.length;
            updateBorders();
        });
    }

    updateBorders();
}

// Flexbox демонстрация
function initFlexboxDemo() {
    console.log("Инициализация Flexbox демо...");
    const flexDirectionBtn = document.getElementById('flexDirectionBtn');
    const justifyContentBtn = document.getElementById('justifyContentBtn');
    const flexWrapBtn = document.getElementById('flexWrapBtn');
    const flexContainer = document.getElementById('flexDemoContainer');

    let directionIndex = 0;
    let justifyIndex = 0;
    let wrapIndex = 0;

    const directions = ['row', 'row-reverse', 'column', 'column-reverse'];
    const directionNames = ['row', 'row-reverse', 'column', 'column-reverse'];

    const justifies = ['flex-start', 'center', 'flex-end', 'space-between', 'space-around', 'space-evenly'];
    const justifyNames = ['flex-start', 'center', 'flex-end', 'space-between', 'space-around', 'space-evenly'];

    const wraps = ['nowrap', 'wrap', 'wrap-reverse'];
    const wrapNames = ['nowrap', 'wrap', 'wrap-reverse'];

    // Функция для обновления отображения текущих свойств
    function updateCurrentProperties() {
        if (currentDirection) {
            currentDirection.textContent = `Направление: ${directionNames[directionIndex]}`;
        }
        if (currentJustify) {
            currentJustify.textContent = `Выравнивание: ${justifyNames[justifyIndex]}`;
        }
        if (currentWrap) {
            currentWrap.textContent = `Перенос: ${wrapNames[wrapIndex]}`;
        }
    }

    if (flexDirectionBtn && flexContainer) {
        flexDirectionBtn.addEventListener('click', () => {
            directionIndex = (directionIndex + 1) % directions.length;
            flexContainer.style.flexDirection = directions[directionIndex];
            updateCurrentProperties();
        });
    }

    if (justifyContentBtn && flexContainer) {
        justifyContentBtn.addEventListener('click', () => {
            justifyIndex = (justifyIndex + 1) % justifies.length;
            flexContainer.style.justifyContent = justifies[justifyIndex];

            // Наглядно показываем изменение выравнивания
            if (justifies[justifyIndex] === 'space-around') {
                flexContainer.style.gap = '20px';
            } else if (justifies[justifyIndex] === 'space-between') {
                flexContainer.style.gap = '10px';
            } else {
                flexContainer.style.gap = '10px';
            }

            updateCurrentProperties();
        });
    }

    if (flexWrapBtn && flexContainer) {
        flexWrapBtn.addEventListener('click', () => {
            wrapIndex = (wrapIndex + 1) % wraps.length;
            flexContainer.style.flexWrap = wraps[wrapIndex];

            // Наглядно показываем перенос
            if (wraps[wrapIndex] === 'wrap') {
                flexContainer.style.alignContent = 'flex-start';
                flexContainer.style.maxHeight = '200px';
                flexContainer.style.overflow = 'auto';
            } else if (wraps[wrapIndex] === 'wrap-reverse') {
                flexContainer.style.alignContent = 'flex-end';
                flexContainer.style.maxHeight = '200px';
                flexContainer.style.overflow = 'auto';
            } else {
                flexContainer.style.alignContent = 'stretch';
                flexContainer.style.maxHeight = 'none';
                flexContainer.style.overflow = 'visible';
            }

            updateCurrentProperties();
        });
    }

    // Инициализация начальных значений
    updateCurrentProperties();
}

// Grid демонстрация
function initGridDemo() {
    console.log("Инициализация Grid демо...");
    const gridTemplateBtn = document.getElementById('gridTemplateBtn');
    const gridGapBtn = document.getElementById('gridGapBtn');
    const gridContainer = document.querySelector('.grid-container');

    let templateIndex = 0;
    let hasGap = true;

    const templates = [
        // Шаблон 1: Простой вертикальный
        {
            areas: '"header" "main" "footer"',
            columns: '1fr',
            rows: 'auto 1fr auto',
            name: 'Простой вертикальный'
        },
        // Шаблон 2: Двухколоночный
        {
            areas: '"header header" "main main" "footer footer"',
            columns: '1fr 1fr',
            rows: 'auto 1fr auto',
            name: 'Двухколоночный'
        },
        // Шаблон 3: Трехколоночный
        {
            areas: '"header header header" "main main main" "footer footer footer"',
            columns: '1fr 1fr 1fr',
            rows: 'auto 1fr auto',
            name: 'Трехколоночный'
        },
        // Шаблон 4: Многострочный
        {
            areas: '"header header" "main main" "main main" "footer footer"',
            columns: '1fr 1fr',
            rows: 'auto 1fr 1fr auto',
            name: 'Многострочный'
        },
        // Шаблон 5: Асимметричный
        {
            areas: '"header header header" "main main ." "footer footer footer"',
            columns: '2fr 1fr 1fr',
            rows: 'auto 1fr auto',
            name: 'Асимметричный'
        },
        // Шаблон 6: Центрированный
        {
            areas: '". header ." ". main ." ". footer ."',
            columns: '1fr 2fr 1fr',
            rows: 'auto 1fr auto',
            name: 'Центрированный'
        }
    ];

    if (gridTemplateBtn && gridContainer) {
        gridTemplateBtn.addEventListener('click', () => {
            templateIndex = (templateIndex + 1) % templates.length;
            const template = templates[templateIndex];

            // Обновляем grid-шаблон
            gridContainer.style.gridTemplateAreas = template.areas;
            gridContainer.style.gridTemplateColumns = template.columns;
            gridContainer.style.gridTemplateRows = template.rows;

            // Обновляем текст кнопки
            gridTemplateBtn.textContent = `Шаблон (${template.name})`;
        });

        // Инициализируем первый шаблон
        gridTemplateBtn.textContent = `Шаблон (${templates[0].name})`;
    }

    if (gridGapBtn && gridContainer) {
        gridGapBtn.addEventListener('click', () => {
            hasGap = !hasGap;
            gridContainer.style.gap = hasGap ? '15px' : '0';
            gridContainer.style.padding = hasGap ? '1.5rem' : '1rem';
        });
    }
}

// Современный CSS демонстрация
function initModernCSSDemo() {
    console.log("Инициализация современного CSS демо...");
    const toggleVariablesBtn = document.getElementById('toggleVariablesBtn');
    const changeFilterBtn = document.getElementById('changeFilterBtn');
    const toggleShapeBtn = document.getElementById('toggleShapeBtn');
    const changeBlendBtn = document.getElementById('changeBlendBtn');

    const variableFeature = document.querySelector('.modern-feature.variable');
    const filterFeature = document.querySelector('.modern-feature.filter');
    const shapeFeature = document.querySelector('.modern-feature.shape');
    const blendFeature = document.querySelector('.modern-feature.blend');

    let variableIndex = 0;
    let filterIndex = 0;
    let shapeIndex = 0;
    let blendIndex = 0;

    const variables = [
        'linear-gradient(45deg, var(--primary-color), var(--secondary-color))',
        'linear-gradient(45deg, var(--accent-color), #7209b7)',
        'linear-gradient(45deg, var(--success-color), #1d7873)',
        'linear-gradient(45deg, var(--warning-color), #f3722c)'
    ];

    const filters = [
        'none',
        'blur(2px)',
        'brightness(150%)',
        'contrast(200%)',
        'grayscale(100%)'
    ];

    const shapes = [
        'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
        'circle(50%)',
        'polygon(0% 0%, 100% 0%, 100% 75%, 0% 100%)',
        'ellipse(25% 40% at 50% 50%)'
    ];

    const blends = [
        'normal',
        'multiply',
        'screen',
        'overlay',
        'darken',
        'lighten'
    ];

    if (toggleVariablesBtn && variableFeature) {
        toggleVariablesBtn.addEventListener('click', () => {
            variableIndex = (variableIndex + 1) % variables.length;
            variableFeature.style.background = variables[variableIndex];
        });
    }

    if (changeFilterBtn && filterFeature) {
        changeFilterBtn.addEventListener('click', () => {
            filterIndex = (filterIndex + 1) % filters.length;
            filterFeature.style.filter = filters[filterIndex];
        });
    }

    if (toggleShapeBtn && shapeFeature) {
        toggleShapeBtn.addEventListener('click', () => {
            shapeIndex = (shapeIndex + 1) % shapes.length;
            shapeFeature.style.clipPath = shapes[shapeIndex];
        });
    }

    if (changeBlendBtn && blendFeature) {
        changeBlendBtn.addEventListener('click', () => {
            blendIndex = (blendIndex + 1) % blends.length;
            blendFeature.style.backgroundBlendMode = blends[blendIndex];

            // Наглядно показываем наложение
            if (blends[blendIndex] === 'multiply') {
                blendFeature.style.background = 'linear-gradient(45deg, var(--warning-color), var(--primary-color))';
            } else if (blends[blendIndex] === 'screen') {
                blendFeature.style.background = 'linear-gradient(45deg, var(--success-color), var(--accent-color))';
            } else if (blends[blendIndex] === 'overlay') {
                blendFeature.style.background = 'linear-gradient(45deg, var(--primary-color), var(--warning-color))';
            } else {
                blendFeature.style.background = 'linear-gradient(45deg, var(--warning-color), #f3722c)';
            }
        });
    }
}

// Демонстрация изображений
function initImageDemo() {
    console.log("Инициализация демо изображений...");
    const changeImageBtn = document.getElementById('changeImageBtn');
    const toggleBorderBtn = document.getElementById('toggleBorderBtn');
    const demoImage = document.getElementById('demoImage');

    let imageIndex = 0;
    let hasBorder = false;

    const images = [
        'https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        'https://images.unsplash.com/photo-1516116216624-53e697fedbea?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        'https://images.unsplash.com/photo-1523437113738-bbd3cc89fb19?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    ];

    if (changeImageBtn && demoImage) {
        changeImageBtn.addEventListener('click', () => {
            imageIndex = (imageIndex + 1) % images.length;
            demoImage.src = images[imageIndex];
        });
    }

    if (toggleBorderBtn && demoImage) {
        toggleBorderBtn.addEventListener('click', () => {
            hasBorder = !hasBorder;
            demoImage.style.border = hasBorder ? '5px solid var(--primary-color)' : 'none';
            demoImage.style.borderRadius = hasBorder ? '15px' : '12px';
        });
    }
}

// Демонстрации переходов
function initTransitionDemos() {
    const transitionExamples = document.querySelectorAll('.transition-example');

    transitionExamples.forEach(example => {
        example.addEventListener('mouseenter', () => {
            if (example.classList.contains('color')) {
                example.style.background = 'linear-gradient(45deg, var(--accent-color), #7209b7)';
            }
        });

        example.addEventListener('mouseleave', () => {
            if (example.classList.contains('color')) {
                example.style.background = 'linear-gradient(45deg, var(--primary-color), var(--secondary-color))';
            }
        });
    });
}

// Функции для демонстрации принципов дизайна
function initDesignPrinciplesDemo() {
    console.log("Инициализация демо принципов дизайна...");

    // Цветовые палитры
    const colorPalettes = [
        { primary: '#4361ee', secondary: '#3a0ca3', accent: '#f72585', neutral: '#6c757d' },
        { primary: '#2a9d8f', secondary: '#1d7873', accent: '#e76f51', neutral: '#264653' },
        { primary: '#7209b7', secondary: '#560bad', accent: '#f15bb5', neutral: '#3a0ca3' },
        { primary: '#f8961e', secondary: '#f3722c', accent: '#f94144', neutral: '#495057' },
        { primary: '#4cc9f0', secondary: '#4361ee', accent: '#7209b7', neutral: '#1a1a2e' }
    ];

    // Шрифтовые пары
    const fontPairs = [
        { heading: "'Poppins', sans-serif", body: "'Poppins', sans-serif" },
        { heading: "'Roboto Mono', monospace", body: "'Roboto', sans-serif" },
        { heading: "'Georgia', serif", body: "'Arial', sans-serif" },
        { heading: "'Courier New', monospace", body: "'Verdana', sans-serif" }
    ];

    // Элементы
    const changePaletteBtn = document.querySelector('.change-palette-btn');
    const changeTypographyBtn = document.querySelector('.change-typography-btn');
    const adjustSpacingBtn = document.querySelector('.adjust-spacing-btn');
    const designQuizBtn = document.getElementById('designQuizBtn');

    let paletteIndex = 0;
    let fontIndex = 0;
    let spacingLevel = 1;

    // Смена цветовой палитры
    if (changePaletteBtn) {
        changePaletteBtn.addEventListener('click', function () {
            paletteIndex = (paletteIndex + 1) % colorPalettes.length;
            const palette = colorPalettes[paletteIndex];

            // Обновляем цветовые образцы
            const colorSwatches = document.querySelectorAll('.color-swatch');
            if (colorSwatches.length >= 4) {
                colorSwatches[0].style.backgroundColor = palette.primary;
                colorSwatches[1].style.backgroundColor = palette.secondary;
                colorSwatches[2].style.backgroundColor = palette.accent;
                colorSwatches[3].style.backgroundColor = palette.neutral;
            }

            // Наглядно меняем цвета для демонстрации
            const demoElement = document.getElementById('colorHarmonyDemo');
            if (demoElement) {
                demoElement.style.borderColor = palette.accent;
            }
        });
    }

    // Смена типографии
    if (changeTypographyBtn) {
        changeTypographyBtn.addEventListener('click', function () {
            fontIndex = (fontIndex + 1) % fontPairs.length;
            const fonts = fontPairs[fontIndex];

            // Обновляем пример типографии
            const typographyDemo = document.getElementById('typographyDemo');
            if (typographyDemo) {
                const heading = typographyDemo.querySelector('h5');
                const body = typographyDemo.querySelectorAll('p');

                if (heading) heading.style.fontFamily = fonts.heading;
                body.forEach(p => p.style.fontFamily = fonts.body);

                // Показываем название шрифта
                const fontName = fonts.heading.replace(/'/g, '');
                this.textContent = `Шрифт: ${fontName}`;

                setTimeout(() => {
                    this.textContent = 'Изменить шрифты';
                }, 1500);
            }
        });
    }

    // Настройка отступов
    if (adjustSpacingBtn) {
        adjustSpacingBtn.addEventListener('click', function () {
            spacingLevel = (spacingLevel + 1) % 4;
            const spacingValues = [10, 20, 30, 40];

            // Обновляем отступы в демо
            const spacingBoxes = document.querySelectorAll('.spacing-box');
            spacingBoxes.forEach(box => {
                box.style.margin = `0 ${spacingValues[spacingLevel]}px`;
                box.style.padding = `${spacingValues[spacingLevel] / 2}px`;
            });

            // Обновляем текст кнопки
            const spacingTexts = ['Маленькие', 'Стандартные', 'Большие', 'Очень большие'];
            this.textContent = `Отступы: ${spacingTexts[spacingLevel]}`;

            setTimeout(() => {
                this.textContent = 'Настроить отступы';
            }, 1500);
        });
    }

    // Кнопка проверки знаний
    if (designQuizBtn) {
        designQuizBtn.addEventListener('click', function () {
            // Простой тест по принципам дизайна
            const questions = [
                "Что такое адаптивный дизайн?",
                "Почему важна доступность веб-сайтов?",
                "Как цветовая гармония влияет на пользовательский опыт?",
                "Что такое визуальная иерархия?",
                "Почему важны производительность и скорость загрузки?",
                "Как UX/UI дизайн влияет на пользовательский опыт?"
            ];

            const randomQuestion = questions[Math.floor(Math.random() * questions.length)];

            // Показываем вопрос во всплывающем окне
            alert(`Вопрос по дизайну:\n\n${randomQuestion}\n\nПодумайте над ответом и проверьте свои знания в разделе!`);

            // Изменяем текст кнопки на время
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-check"></i> Вопрос показан!';
            this.style.background = 'linear-gradient(45deg, #2a9d8f, #1d7873)';

            setTimeout(() => {
                this.innerHTML = originalText;
                this.style.background = 'linear-gradient(45deg, var(--accent-color), #7209b7)';
            }, 2000);
        });
    }
}

// Инициализация кнопок для показа примеров кода
function initCodeExamples() {
    console.log("Инициализация кнопок показа кода...");

    // Простая функция для переключения видимости кода
    function toggleCodeVisibility(button, codeElementId) {
        console.log(`Переключение видимости для ${codeElementId}`);
        const codeElement = document.getElementById(codeElementId);
        if (!codeElement) {
            console.log("Элемент не найден:", codeElementId);
            return;
        }

        const isVisible = !codeElement.classList.contains('hidden');

        if (isVisible) {
            codeElement.classList.add('hidden');
            codeElement.classList.remove('visible');
            if (button) button.textContent = 'Показать пример кода';
        } else {
            codeElement.classList.remove('hidden');
            codeElement.classList.add('visible');
            if (button) button.textContent = 'Скрыть пример кода';
        }
    }

    // Функция для привязки кнопки к элементу кода
    function bindCodeButton(buttonSelector, codeElementId) {
        const button = document.querySelector(buttonSelector);
        if (button) {
            button.addEventListener('click', function (e) {
                e.preventDefault();
                toggleCodeVisibility(this, codeElementId);
            });
            console.log(`Кнопка ${codeElementId} инициализирована`);
            return true;
        }
        console.log(`Кнопка ${buttonSelector} не найдена`);
        return false;
    }

    // 1. Заголовки и параграфы
    bindCodeButton('[data-target="headings-code"]', 'headings-code');

    // 2. Выравнивание текста
    bindCodeButton('[data-target="text-align-code"]', 'text-align-code');

    // 3. Тег span и атрибут id
    bindCodeButton('[data-target="span-code"]', 'span-code');

    // 4. Свойства шрифтов
    bindCodeButton('[data-target="font-code"]', 'font-code');

    // 5. CSS Box Model
    bindCodeButton('[data-target="boxmodel-code"]', 'boxmodel-code');

    // 6. Ширина, высота и фон
    bindCodeButton('[data-target="dimension-code"]', 'dimension-code');

    // 7. Свойства границ
    bindCodeButton('[data-target="border-code"]', 'border-code');

    // 8. Изображения
    bindCodeButton('[data-target="image-code"]', 'image-code');

    // 9. Аудио
    bindCodeButton('[data-target="audio-code"]', 'audio-code');

    // 10. Flexbox верстка
    bindCodeButton('[data-target="flexbox-code"]', 'flexbox-code');

    // 11. CSS Grid верстка - создаем динамически
    const gridDemoControls = document.querySelector('.grid-demo .demo-controls');
    if (gridDemoControls) {
        // Проверяем, не существует ли уже кнопка
        let gridCodeButton = document.querySelector('[data-target="grid-code"]');

        if (!gridCodeButton) {
            gridCodeButton = document.createElement('button');
            gridCodeButton.className = 'show-code-btn demo-btn';
            gridCodeButton.textContent = 'Показать пример кода';
            gridCodeButton.setAttribute('data-target', 'grid-code');
            gridDemoControls.appendChild(gridCodeButton);

            // Создаем элемент с кодом для Grid, если его нет
            if (!document.getElementById('grid-code')) {
                const gridCodeElement = document.createElement('div');
                gridCodeElement.id = 'grid-code';
                gridCodeElement.className = 'code-example hidden';
                gridCodeElement.innerHTML = `
                    <pre><code class="css">/* Основные свойства CSS Grid */

/* 1. Создание grid-контейнера */
.grid-container {
    display: grid; /* Активация Grid */
}

/* 2. Определение колонок и строк */
.grid-container {
    grid-template-columns: 1fr 1fr 1fr; /* Три колонки равной ширины */
    grid-template-rows: auto 1fr auto; /* Три строки */
    
    /* Альтернативная запись */
    grid-template-columns: repeat(3, 1fr); /* Три колонки по 1fr */
    grid-template-rows: 100px 200px 100px; /* Фиксированные высоты */
}

/* 3. Создание областей (grid-template-areas) */
.grid-container {
    grid-template-areas:
        "header header header"
        "main main sidebar"
        "footer footer footer";
}

/* 4. Расположение элементов в областях */
.header {
    grid-area: header;
}
.main {
    grid-area: main;
}
.sidebar {
    grid-area: sidebar;
}
.footer {
    grid-area: footer;
}

/* 5. Промежутки между элементами (gap) */
.grid-container {
    gap: 20px; /* Промежутки между всеми элементами */
    row-gap: 10px; /* Промежутки между строками */
    column-gap: 15px; /* Промежутки между колонками */
}

/* 6. Выравнивание элементов */
.grid-container {
    justify-items: center; /* Выравнивание по горизонтали */
    align-items: center; /* Выравнивание по вертикали */
    place-items: center; /* Оба выравнивания */
}

/* Пример HTML для Grid */
&lt;div class="grid-container"&gt;
    &lt;div class="header"&gt;Шапка&lt;/div&gt;
    &lt;div class="main"&gt;Основной контент&lt;/div&gt;
    &lt;div class="footer"&gt;Футер&lt;/div&gt;
&lt;/div&gt;</code></pre>
                `;

                // Добавляем элемент с кодом после демо-контейнера
                const gridDemo = document.querySelector('.grid-demo');
                if (gridDemo) {
                    gridDemo.appendChild(gridCodeElement);
                }
            }
        }

        // Привязываем обработчик
        gridCodeButton.addEventListener('click', function (e) {
            e.preventDefault();
            toggleCodeVisibility(this, 'grid-code');
        });
        console.log("Кнопка Grid инициализирована");
    }

    console.log("Все кнопки показа кода инициализированы");
}

// Инициализация сайта при загрузке DOM
document.addEventListener('DOMContentLoaded', initWebsite);