$(document).ready(function(){
    populateQuotes();
    populateTutorials();
    populateLatest();
});

/** Quotes Carousel Loader */

function fetchQuotes() {
    return $.ajax({
        url: "https://smileschool-api.hbtn.info/quotes",
        method: "GET",
    });
}

function createCarouselItem(quote, isActive) {
    const { pic_url, text, name, title } = quote;

    const carouselItem = $('<div>', { class: `carousel-item ${isActive ? 'active' : ''}` });
    const rowItem = $('<div>', { class: 'row mx-auto align-items-center' });
    const picDiv = $('<div>', { class: 'col-12 col-sm-2 col-lg-2 offset-lg-1 text-center' });
    const quoteImg = $('<img>', { class: 'd-block align-self-center', src: pic_url });
    const quoteDiv = $('<div>', { class: 'col-12 col-sm-7 offset-sm-2 col-lg-9 offset-lg-0' });
    const quoteTextDiv = $('<div>', { class: 'quote-text' });
    const quotePrg = $('<p>', { class: 'text-white' }).text(text);
    const quoteeName = $('<h4>', { class: 'text-white font-weight-bold' }).text(name);
    const quoteeTitle = $('<span>', { class: 'text-white' }).text(title);

    quoteTextDiv.append(quotePrg, quoteeName, quoteeTitle);
    quoteDiv.append(quoteTextDiv);
    picDiv.append(quoteImg);
    rowItem.append(picDiv, quoteDiv);
    carouselItem.append(rowItem);

    return carouselItem;
}

function displayQuotes(quotes) {
    const quoteCarousel = $('#quote-carousel');
    quotes.forEach((quote, index) => {
        const isActive = index === 0;
        const carouselItem = createCarouselItem(quote, isActive);
        quoteCarousel.append(carouselItem);
    });

    $('#loading-quotes').addClass('d-none');
    $('#quotes-container').removeClass('d-none');
}

function handleFetchError() {
    alert("Error loading quotes");
}

function populateQuotes() {
    fetchQuotes()
        .then(displayQuotes)
        .catch(handleFetchError);
}

/** Videos Carousel Loader */
function populateTutorials() {
    $.ajax({
        url: "https://smileschool-api.hbtn.info/popular-tutorials",
        method: "GET",
        success: function (response) {
            const carousel = $('#tutorial-carousel');

            response.forEach((tutorial, index) => {
                const card = createCard(tutorial);
                carousel.append(card);

                // If first item, add active class
                if (index === 0) {
                    card.addClass('active');
                }
            });

            initializeCarousel(carousel);

            $('#loading-tutorials').addClass('d-none');
            $('#tutorial-carousel').removeClass('d-none');
        },
        error: function () {
            alert("Error loading tutorials");
        },
    });
}

function createCard(tutorial) {
    const card = $('<div>').addClass('card p-3');
    const thumbnail = $('<img>').addClass('card-img-top').attr('src', tutorial['thumb_url']);

    const overlay = $('<div>').addClass('card-img-overlay d-flex justify-content-center align-items-center text-center');
    const playButton = $('<img>').addClass('play-overlay').attr('src', 'images/play.png').attr('width', '64px');
    overlay.append(playButton);

    const body = $('<div>').addClass('card-body');
    const title = $('<h5>').addClass('card-title font-weight-bold').text(tutorial['title']);
    const description = $('<p>').addClass('card-text text-muted').text(tutorial['sub-title']);

    const author = $('<div>').addClass('creator d-flex align-items-center');
    const authorImage = $('<img>').addClass('rounded-circle').attr('src', tutorial['author_pic_url']).attr('width', '30px');
    const authorName = $('<h6>').addClass('pl-3 m-0 main-color').text(tutorial['author']);
    author.append(authorImage, authorName);

    const footer = $('<div>').addClass('info pt-3 d-flex justify-content-between');
    const rating = $('<div>').addClass('rating d-flex');
    for (let i = 1; i < 6; i++) {
        const star = i <= tutorial['star'] ? $('<img>').attr('src', 'images/star_on.png') : $('<img>').attr('src', 'images/star_off.png');
        star.attr('width', '15px').attr('height', '15px');
        rating.append(star);
    }
    const time = $('<span>').addClass('main-color').text(tutorial['duration']);

    footer.append(rating, time);

    body.append(title, description, author, footer);
    card.append(thumbnail, overlay, body);
    return card;
}

function initializeCarousel(carousel) {
    carousel.slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        prevArrow: $('.prev1'),
        nextArrow: $('.next1'),
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    });
}

/** Latest Video Carousel */

function populateLatest() {
    $.ajax({
        url: "https://smileschool-api.hbtn.info/latest-videos",
        method: "GET",
        success: function (response) {
            const carousel = $('#latest-carousel');

            response.forEach((tutorial, index) => {
                const card = createCard(tutorial);
                carousel.append(card);

                // If first item, add active class
                if (index === 0) {
                    card.addClass('active');
                }
            });

            initializeCarousel2(carousel);

            $('#loading-latest').addClass('d-none');
            $('#latest-carousel').removeClass('d-none');
        },
        error: function () {
            alert("Error loading tutorials");
        },
    });
}

function createCard(tutorial) {
    const card = $('<div>').addClass('card p-3');
    const thumbnail = $('<img>').addClass('card-img-top').attr('src', tutorial['thumb_url']);

    const overlay = $('<div>').addClass('card-img-overlay d-flex justify-content-center align-items-center text-center');
    const playButton = $('<img>').addClass('play-overlay').attr('src', 'images/play.png').attr('width', '64px');
    overlay.append(playButton);

    const body = $('<div>').addClass('card-body');
    const title = $('<h5>').addClass('card-title font-weight-bold').text(tutorial['title']);
    const description = $('<p>').addClass('card-text text-muted').text(tutorial['sub-title']);

    const author = $('<div>').addClass('creator d-flex align-items-center');
    const authorImage = $('<img>').addClass('rounded-circle').attr('src', tutorial['author_pic_url']).attr('width', '30px');
    const authorName = $('<h6>').addClass('pl-3 m-0 main-color').text(tutorial['author']);
    author.append(authorImage, authorName);

    const footer = $('<div>').addClass('info pt-3 d-flex justify-content-between');
    const rating = $('<div>').addClass('rating d-flex');
    for (let i = 1; i < 6; i++) {
        const star = i <= tutorial['star'] ? $('<img>').attr('src', 'images/star_on.png') : $('<img>').attr('src', 'images/star_off.png');
        star.attr('width', '15px').attr('height', '15px');
        rating.append(star);
    }
    const time = $('<span>').addClass('main-color').text(tutorial['duration']);

    footer.append(rating, time);

    body.append(title, description, author, footer);
    card.append(thumbnail, overlay, body);
    return card;
}

function initializeCarousel2(carousel) {
    carousel.slick({
        slidesToShow: 3.99, // Adjusted for consistent display across different screen sizes
        slidesToScroll: 1,
        prevArrow: $('.prev2'),
        nextArrow: $('.next2'),
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    });
}
