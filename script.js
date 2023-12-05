$(document).ready(function(){
    populateQuotes();
    populateTutorials();
});

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

function populateTutorials() {
    $.ajax({
        url: "https://smileschool-api.hbtn.info/popular-tutorials",
        method: "GET",
        success: function(response) {
            const tutorialCarousel = $('#tutorial-carousel .carousel-inner');

            response.forEach(function(tutorial, index) {
                const carouselItem = createTutorialCarouselItem(tutorial, index === 0);
                tutorialCarousel.append(carouselItem);
            });

            // Initialize the Bootstrap carousel after items have been appended
            $('#tutorial-carousel').carousel();

            // Show the carousel and hide the loader
            $('#loading-tutorials').addClass('d-none');
            $('#tutorial-carousel').removeClass('d-none');
        },
        error: function() {
            alert("Error loading tutorials");
        }
    });
}




function createTutorialCarouselItem(tutorial, isActive) {
    const { thumb_url, title, 'sub-title': subTitle, author_pic_url, author, star, duration } = tutorial;

    const carouselItem = $('<div>', { class: `carousel-item col-12 col-sm-6 col-md-4 col-lg-3 ${isActive ? 'active' : ''}` });
    const card = $('<div>', { class: 'card mx-auto d-block' });

    const cardImage = $('<img>', { class: 'card-img-top position-relative', src: thumb_url, alt: 'Card image cap' });
    const cardImageOverlay = $('<div>', { class: 'card-image position-absolute' }).append($('<img>', { src: 'images/play.png', alt: '', width: '64px', height: '64px' }));

    const cardBody = $('<div>', { class: 'card-body py-3' });
    const cardTitle = $('<h4>', { class: 'card-title font-weight-bold color-text' }).text(title);
    const cardText = $('<p>', { class: 'card-text text-muted' }).text(subTitle);

    const authorBlock = $('<div>', { class: 'd-flex align-items-center' });
    const authorImage = $('<img>', { src: author_pic_url, class: 'rounded-circle', alt: '...', width: '40px', height: '40px' });
    const authorName = $('<div>').append($('<h4>', { class: 'font-weight-bold pl-3' }).append($('<span>', { class: 'color' }).text(author)));

    const ratingBlock = $('<div>', { class: 'd-flex mt-2 justify-content-between' });
    const ratingStars = $('<div>', { class: 'rating' });
    const minutes = $('<div>', { class: 'minutes' }).append($('<p>').append($('<span>', { class: 'color' }).text(duration)));

    cardBody.append(cardTitle, cardText, authorBlock, ratingBlock);
    authorBlock.append(authorImage, authorName);
    ratingBlock.append(ratingStars, minutes);

    for (let i = 0; i < 5; i++) {
        if (i < star) {
            ratingStars.append($('<img>', { src: 'images/star_on.png', alt: '', width: '15px', height: '15px' }));
        } else {
            ratingStars.append($('<img>', { src: 'images/star_off.png', alt: '', width: '15px', height: '15px' }));
        }
    }

    carouselItem.append(card.append(cardImage, cardImageOverlay, cardBody));
    return carouselItem;
}
