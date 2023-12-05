$(document).ready(function(){
    populateQuotes();
    loadVideos('https://smileschool-api.hbtn.info/popular-tutorials', '#carouselExampleControls2');
    loadVideos('https://smileschool-api.hbtn.info/latest-videos', '#carouselExampleControls3');
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

/** Popular Carousel Loader */
function createVideoCard(video) {
    let stars = '';
    for (let i = 0; i < 5; i++) {
        if (i < video.star) {
            stars += '<img src="images/star_on.png" alt="Star On" width="15px" />';
        } else {
            stars += '<img src="images/star_off.png" alt="Star Off" width="15px" />';
        }
    }
    let cardCol = $('<div>').addClass('col-12 col-sm-6 col-md-6 col-lg-3 d-flex justify-content-center justify-content-md-end justify-content-lg-center');

    // Create card HTML
    let cardHtml = `
        <div class="card">
            <img src="${video.thumb_url}" class="card-img-top" alt="Video thumbnail" />
            <div class="card-img-overlay text-center">
                <img src="images/play.png" alt="Play" width="64px" class="align-self-center play-overlay" />
            </div>
            <div class="card-body">
                <h5 class="card-title font-weight-bold">${video.title}</h5>
                <p class="card-text text-muted">${video['sub-title']}</p>
                <div class="creator d-flex align-items-center">
                    <img src="${video.author_pic_url}" alt="Creator of Video" width="30px" class="rounded-circle" />
                    <h6 class="pl-3 m-0 main-color">${video.author}</h6>
                </div>
                <div class="info pt-3 d-flex justify-content-between">
                    <div class="rating ">${video.star > 0 ? stars : ''}
                    </div>
                    <span class="main-color">${video.duration}</span>
                </div>
            </div>
        </div>
    `;
    cardCol.append(cardHtml);

    return cardCol;
}

function getItemsPerSlide() {
    const width = $(window).width();
    if (width >= 1200) {
        return 4; //Show 4 at a time
    } else if (width >= 768) {
        return 2; //Show 2 on medium screens
    } else {
        return 1; //Show 1 on small screens
    }
}

function loadVideos(url, idSelector) {
    const carouselInner = $(idSelector + ' .carousel-inner');
    $('.loader2').show();

    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        success: function (videos) {
            $('.loader2').hide();
            carouselInner.empty();

            let itemsPerSlide = getItemsPerSlide();

            $.each(videos, function (index, video) {
                const carouselItem = $('<div>').addClass('carousel-item');
                const videoCard = createVideoCard(video);
                carouselItem.append(videoCard);

                if (index % itemsPerSlide === 0) {
                    carouselInner.append(carouselItem);
                    if (index === 0) {
                        carouselItem.addClass('active');
                    }
                }
            });
        },
        error: function (error) {
            $('.loader2').hide();
            console.error('Error:', error);
        },
    });
}
