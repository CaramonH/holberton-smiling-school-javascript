$(document).ready(function(){
    PopulateQuotes();
});

function PopulateQuotes() {
    $.ajax({
        url: "https://smileschool-api.hbtn.info/quotes",
        method: "GET",
        success: function(response){
            const quoteCarousel = $('#quote-carousel');

            response.forEach(function makeCarouselItem(quote, index) {
                const carouselItem = $('<div>').addClass('carousel-item');
                const rowItem = $('<div>').addClass('row mx-auto align-items-center');
                const picDiv = $('<div>').addClass('col-12 col-sm-2 col-lg-2 offset-lg-1 text-center');
                const quoteImg = $('<img>').addClass('d-block align-self-center').attr('src', quote['pic_url']);
                const quoteDiv = $('<div>').addClass('col-12 col-sm-7 offset-sm-2 col-lg-9 offset-lg-0');
                const quoteTextDiv = $('<div>').addClass('quote-text');
                const quotePrg = $('<p>').addClass('text-white').text(quote['text']);
                const quoteeName = $('<h4>').addClass('text-white font-weight-bold').text(quote['name']);
                const quoteeTitle = $('<span>').addClass('text-white').text(quote['title']);
                
                quoteTextDiv.append(quotePrg, quoteeName, quoteeTitle);
                quoteDiv.append(quoteTextDiv);
                picDiv.append(quoteImg);
                rowItem.append(picDiv, quoteDiv);
                carouselItem.append(rowItem);
                quoteCarousel.append(carouselItem);

                if (index === 0) {
                    carouselItem.addClass('active');
                }
            });
            $('#loading-quotes').addClass('d-none');
            $('#quotes-container').removeClass('d-none');
        },
        error: function() {
            alert("Error loading quotes");
        }
    })
}