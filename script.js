$(document).ready(function(){
    populateQuotes();
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
