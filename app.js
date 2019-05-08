var apiToken = '8990556237.0ccc168.e2df70f6db3f430dadd69f0ab2f64b17',
    photo_count = 12,
    parent = document.querySelector('#parent-post-container');

var userData;

        var EVENT_ARROW_LEFT, EVENT_ARROW_RIGHT;
  
        EVENT_ARROW_LEFT = "&#xf0d9";
        EVENT_ARROW_RIGHT = "&#xf0da";



        var DATA_DOT = "&#xf111";

var myTemplate = "<div class='column post-tiles' data-post-id='{{id}}'><figure class='imghvr-fade post-container'> <img data-size='{{width}}x{{height}}' class='post-photo {{orientation}}' src='{{image}}' alt='example-image'><figcaption class='caption-text' style=\"background-image: url('{{image}}')\"><p><span class='likes'><i class='fa fa-heart-o'></i> {{likes}}</span>&nbsp;&nbsp;&nbsp;<span class='comments'><i class='fa fa-comment-o'></i> {{comments}}</span></p><p class='captiontext'>{{caption}}</p></figcaption></figure></div>";


var optTag = '',
    optLocationId = '',
    optUserId = 'self',
    fetchBy = 'user';


//fetch access user data
$.ajax({
    url: 'https://api.instagram.com/v1/users/self/?access_token=' + apiToken + '',
    dataType: 'json',
    type: 'GET',
    success: function(result) {
        userData = result;

        var rPhoto = document.querySelector('#insta-user-photo');
        rPhoto.setAttribute('src', result.data.profile_picture);



        var rUsername = document.querySelector('#insta-username');
        rUsername.innerHTML = result.data.username;

        var rFoolowButton = document.querySelector('#insta-follow');
        rFoolowButton.setAttribute('href', 'https://www.instagram.com/' + result.data.username + '/');


    }
});



var currentCount = 0;
var userFeed = new Instafeed({
    get: fetchBy,
    tagName: optTag,
    locationId: optLocationId,
    userId: optUserId,
    accessToken: apiToken,
    limit: photo_count,
    resolution: 'standard_resolution',
    // sortBy: '',
    orientation: 'square',

    before: function() {
        currentCount = 0;



    },
    after: function() {




        $('.carousel').slick({
            dots: true,
            slidesPerRow: 3,
            rows: 1,
            arrows: true,
            autoplay: true,
            autoplaySpeed: 2000,
                          customPaging: function (i) {
                            return DATA_DOT + ';';
                          },
                          prevArrow:"<button data-arrow-left='" + EVENT_ARROW_LEFT +  "' data-arrow-right='" + EVENT_ARROW_RIGHT +  "' type='button' class='slick-prev pull-left'></button>",
                          nextArrow:"<button data-arrow-left='" + EVENT_ARROW_LEFT +  "' data-arrow-right='" + EVENT_ARROW_RIGHT +  "' type='button' class='slick-next pull-right'></button>"

        });




        //showpopup here


        //add event listener to all posts
        var classname = document.querySelectorAll('.post-tiles');

        for (var i = 0; i < classname.length; i++) {

            classname[i].addEventListener('click', function() {

                window.showAllPosts(this.getAttribute('data-post-id'));

            });
        }




    },
    success: function(result) {

        window.addLinksToContent = function(s) {
            var rx = /(?:^|\s)(#[a-z0-9]\w*)/gi;
            var m, res = [];
            while (m = rx.exec(s)) {
                res.push(m[1]);
            }

            var newStr = s;
            for (var i = 0; i <= res.length - 1; i++) {

                newStr = newStr.replace(res[i], "<a class='tag-link' href='https://www.instagram.com/explore/tags/" + res[i].replace("#", "") + "'>" + res[i] + "</a>");

            }
            return newStr;

        }


        window.showAllPosts = function(id) {

            var popupContainer = document.createElement('div');
            popupContainer.setAttribute('class', 'insta-popup-container');
            document.body.appendChild(popupContainer);

            var popupClose = document.createElement('div');
            popupClose.setAttribute('class', 'insta-popup-close');
            popupClose.innerHTML = "&times;";
            popupClose.onclick = function() {
                $('.insta-popup-close').parents('.insta-popup-container').remove();
            };
            popupContainer.appendChild(popupClose);

            var popupBody = document.createElement('div');
            popupBody.setAttribute('class', 'insta-popup-body');
            popupContainer.appendChild(popupBody);


            for (i in result.data) {
                if (id == result.data[i].id) {
                    var popupBodyChild = document.createElement('div');
                    popupBodyChild.setAttribute('class', 'insta-popup-body-child');
                    popupBody.appendChild(popupBodyChild);


                    var popupBodyContainer = document.createElement('div');
                    popupBodyContainer.setAttribute('class', 'insta-pbc-body');
                    popupBodyChild.appendChild(popupBodyContainer);


                    var popupImageContainer = document.createElement('div');
                    popupImageContainer.setAttribute('class', 'insta-pbcb-image');
                    popupImageContainer.innerHTML = "<img src='" + result.data[i].images.standard_resolution.url + "' >";
                    popupBodyContainer.appendChild(popupImageContainer);

                    var popupLikesContainer = document.createElement('div');
                    popupLikesContainer.setAttribute('class', 'insta-pbcb-likes');
                    popupLikesContainer.innerHTML = "<b>" + result.data[i].likes.count + " likes</b>";
                    popupBodyContainer.appendChild(popupLikesContainer);


                    var popupCaptionContainer = document.createElement('div');
                    popupCaptionContainer.setAttribute('class', 'insta-pbcb-caption');

                    popupCaptionContainer.innerHTML = addLinksToContent(result.data[i].caption.text);
                    popupBodyContainer.appendChild(popupCaptionContainer);


                    var popupCommentsContainer = document.createElement('div');
                    popupCommentsContainer.setAttribute('class', 'insta-pbcb-comments');
                    popupCommentsContainer.innerHTML = "<a href='" + result.data[i].link + "' class='view-all-comments'>View all " + result.data[i].comments.count + " comments</a>";
                    popupBodyContainer.appendChild(popupCommentsContainer);
                }


            }

            for (i in result.data) {
                if (id != result.data[i].id) {
                    var popupBodyChild = document.createElement('div');
                    popupBodyChild.setAttribute('class', 'insta-popup-body-child');
                    popupBody.appendChild(popupBodyChild);


                    var popupBodyContainer = document.createElement('div');
                    popupBodyContainer.setAttribute('class', 'insta-pbc-body');
                    popupBodyChild.appendChild(popupBodyContainer);


                    var popupImageContainer = document.createElement('div');
                    popupImageContainer.setAttribute('class', 'insta-pbcb-image');
                    popupImageContainer.innerHTML = "<img src='" + result.data[i].images.standard_resolution.url + "' >";
                    popupBodyContainer.appendChild(popupImageContainer);

                    var popupLikesContainer = document.createElement('div');
                    popupLikesContainer.setAttribute('class', 'insta-pbcb-likes');
                    popupLikesContainer.innerHTML = "<b>" + result.data[i].likes.count + " likes</b>";
                    popupBodyContainer.appendChild(popupLikesContainer);


                    var popupCaptionContainer = document.createElement('div');
                    popupCaptionContainer.setAttribute('class', 'insta-pbcb-caption');

                    popupCaptionContainer.innerHTML = addLinksToContent(result.data[i].caption.text);
                    popupBodyContainer.appendChild(popupCaptionContainer);


                    var popupCommentsContainer = document.createElement('div');
                    popupCommentsContainer.setAttribute('class', 'insta-pbcb-comments');
                    popupCommentsContainer.innerHTML = "<a href='" + result.data[i].link + "' class='view-all-comments'>View all " + result.data[i].comments.count + " comments</a>";
                    popupBodyContainer.appendChild(popupCommentsContainer);
                }
            }




        } //showallposts


        window.showAllPostsHorizontal = function(id) {

            var popupContainer = document.createElement('div');
            popupContainer.setAttribute('class', 'insta-popup-container');
            popupContainer.setAttribute('style', 'align-items: center !important;');
            document.body.appendChild(popupContainer);

            var popupClose = document.createElement('div');
            popupClose.setAttribute('class', 'insta-popup-close');
            popupClose.setAttribute('style', 'top: 50px !important;position: fixed !important;');
            popupClose.innerHTML = "&times;";
            popupClose.onclick = function() {
                $('.insta-popup-close').parents('.insta-popup-container').remove();
            };
            popupContainer.appendChild(popupClose);

            var popupBody = document.createElement('div');
            popupBody.setAttribute('class', 'insta-popup-body');
            popupBody.setAttribute('style', 'width: 100% !important; display: flex !important;');
            popupContainer.appendChild(popupBody);


            for (i in result.data) {
                if (id == result.data[i].id) {
                    var popupBodyChild = document.createElement('div');
                    popupBodyChild.setAttribute('class', 'insta-popup-body-child');
                    popupBodyChild.setAttribute('style', 'flex-basis: 460px !important;flex-grow: 0 !important;flex-shrink: 0 !important;border-top: 0px solid #f1f1f1 !important;border-right: 1px solid #f1f1f1 !important;');
                    popupBody.appendChild(popupBodyChild);


                    var popupBodyContainer = document.createElement('div');
                    popupBodyContainer.setAttribute('class', 'insta-pbc-body');
                    popupBodyChild.appendChild(popupBodyContainer);


                    var popupImageContainer = document.createElement('div');
                    popupImageContainer.setAttribute('class', 'insta-pbcb-image');
                    popupImageContainer.setAttribute('style', "height: 400px; width: 100%;background-size: cover; background-position: center center; background-image: url('" + result.data[i].images.standard_resolution.url + "')");
                    popupBodyContainer.appendChild(popupImageContainer);

                    var popupLikesContainer = document.createElement('div');
                    popupLikesContainer.setAttribute('class', 'insta-pbcb-likes');
                    popupLikesContainer.innerHTML = "<b>" + result.data[i].likes.count + " likes</b>";
                    popupBodyContainer.appendChild(popupLikesContainer);


                    var popupCaptionContainer = document.createElement('div');
                    popupCaptionContainer.setAttribute('class', 'insta-pbcb-caption');

                    popupCaptionContainer.innerHTML = addLinksToContent(result.data[i].caption.text);
                    popupBodyContainer.appendChild(popupCaptionContainer);


                    var popupCommentsContainer = document.createElement('div');
                    popupCommentsContainer.setAttribute('class', 'insta-pbcb-comments');
                    popupCommentsContainer.innerHTML = "<a href='" + result.data[i].link + "' class='view-all-comments'>View all " + result.data[i].comments.count + " comments</a>";
                    popupBodyContainer.appendChild(popupCommentsContainer);
                }


            }

            for (i in result.data) {
                if (id != result.data[i].id) {
                    var popupBodyChild = document.createElement('div');
                    popupBodyChild.setAttribute('class', 'insta-popup-body-child');
                    popupBodyChild.setAttribute('style', 'flex-basis: 460px !important;flex-grow: 0 !important;flex-shrink: 0 !important;border-top: 0px solid #f1f1f1 !important;border-right: 1px solid #f1f1f1 !important;');
                    popupBody.appendChild(popupBodyChild);


                    var popupBodyContainer = document.createElement('div');
                    popupBodyContainer.setAttribute('class', 'insta-pbc-body');
                    popupBodyChild.appendChild(popupBodyContainer);


                    var popupImageContainer = document.createElement('div');
                    popupImageContainer.setAttribute('class', 'insta-pbcb-image');
                    popupImageContainer.setAttribute('style', "height: 400px; width: 100%;background-size: cover; background-position: center center; background-image: url('" + result.data[i].images.standard_resolution.url + "')");
                    popupBodyContainer.appendChild(popupImageContainer);

                    var popupLikesContainer = document.createElement('div');
                    popupLikesContainer.setAttribute('class', 'insta-pbcb-likes');
                    popupLikesContainer.innerHTML = "<b>" + result.data[i].likes.count + " likes</b>";
                    popupBodyContainer.appendChild(popupLikesContainer);


                    var popupCaptionContainer = document.createElement('div');
                    popupCaptionContainer.setAttribute('class', 'insta-pbcb-caption');

                    popupCaptionContainer.innerHTML = addLinksToContent(result.data[i].caption.text);
                    popupBodyContainer.appendChild(popupCaptionContainer);


                    var popupCommentsContainer = document.createElement('div');
                    popupCommentsContainer.setAttribute('class', 'insta-pbcb-comments');
                    popupCommentsContainer.innerHTML = "<a href='" + result.data[i].link + "' class='view-all-comments'>View all " + result.data[i].comments.count + " comments</a>";
                    popupBodyContainer.appendChild(popupCommentsContainer);
                }
            }




        } //showallpostsHorizontal


    },
    //      template: "<div class='column post-tiles' data-post-id='{{id}}'><figure class='imghvr-fade post-container'> <img data-size='{{width}}x{{height}}' class='post-photo {{orientation}}' src='{{image}}' alt='example-image'><figcaption class='caption-text' style=\"background-image: url('{{image}}')\"><p><span class='likes'><i class='fa fa-heart-o'></i> {{likes}}</span>&nbsp;&nbsp;&nbsp;<span class='comments'><i class='fa fa-comment-o'></i> {{comments}}</span></p><p class='captiontext'>{{caption}}</p></figcaption></figure></div>",
    template: myTemplate,
});
userFeed.run();