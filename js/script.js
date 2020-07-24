$(document).ready(function(){
    // jQuery for onscroll change active class
    let scrollTop, activeSection;

    let sectionHomeOffsetTop = $('#home').offset().top;
    let sectionAboutOffsetTop = $('#aboutMe').offset().top;
    let sectionProjectsOffsetTop = $('#projects').offset().top;
    let sectionEducationOffsetTop = $('#education').offset().top;

    $(document).on('scroll', function(){
        scrollTop = $(document).scrollTop();
        if(scrollTop <= sectionAboutOffsetTop){
            activeSection = $('.navbar-nav>li:nth-child(1)');
        } else if(scrollTop <= sectionProjectsOffsetTop){
            activeSection = $('.navbar-nav>li:nth-child(2)');
        } else if(scrollTop <= sectionEducationOffsetTop){
            activeSection = $('.navbar-nav>li:nth-child(3)');
        } else {
            activeSection = $('.navbar-nav>li:nth-child(4)');
        }

        activeSection.addClass('active');
        $('.navbar-nav>li').not(activeSection).removeClass('active');
    });

    // jQuery for onclick change active class
    $(document).on('click', '.navbar-nav .navbar-item', function(){
        $(this).addClass('active').siblings().removeClass('active');
    });
});