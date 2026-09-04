document.addEventListener("DOMContentLoaded", function () {


    /* =================================================
       ELEMENTS
    ================================================= */

    const searchInput =
        document.getElementById("guideSearch");

    const clearSearch =
        document.getElementById("clearSearch");

    const filterButtons =
        document.querySelectorAll(".filter-button");

    const destinationCards =
        document.querySelectorAll(".destination-card");

    const regionSections =
        document.querySelectorAll(".region-section");

    const guideCards =
        Array.from(
            document.querySelectorAll(".guide-card")
        );

    const loadMoreButton =
        document.getElementById("loadMore");

    const noResults =
        document.getElementById("noResults");

    const resultCount =
        document.getElementById("resultCount");

    const browseButton =
        document.getElementById("browseGuidesButton");

    const mobileMenuButton =
        document.getElementById("mobileMenuButton");

    const mobileMenu =
        document.getElementById("mobileMenu");


    /* =================================================
       VARIABLES
    ================================================= */

    let activeRegion = "all";

    let searchTerm = "";

    const itemsPerLoad = 6;

    let visibleGuideCount = itemsPerLoad;


    /* =================================================
       MOBILE MENU
    ================================================= */

    /* =================================================
   MOBILE MENU
================================================= */

const menuTrigger =
    document.querySelector(".menu-trigger");

const nav =
    document.querySelector(".main-nav .nav");


if (menuTrigger && nav) {

    menuTrigger.addEventListener(
        "click",
        function () {

            menuTrigger.classList.toggle("active");

            nav.classList.toggle("active");

        }
    );


    /* Close menu after clicking a link */

    const navLinks =
        nav.querySelectorAll("a");

    navLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function () {

                menuTrigger.classList.remove(
                    "active"
                );

                nav.classList.remove(
                    "active"
                );

            }
        );

    });

}


    /* =================================================
       BROWSE ALL GUIDES
    ================================================= */

    browseButton.addEventListener(
        "click",
        function () {

            document
                .getElementById("guidesLibrary")
                .scrollIntoView({
                    behavior: "smooth"
                });

        }
    );


    /* =================================================
       FILTER BUTTONS
    ================================================= */

    filterButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                filterButtons.forEach(
                    function (btn) {

                        btn.classList.remove(
                            "active"
                        );

                    }
                );


                button.classList.add("active");


                activeRegion =
                    button.dataset.region;


                visibleGuideCount =
                    itemsPerLoad;


                applyFilters();

            }
        );

    });


    /* =================================================
       SEARCH
    ================================================= */

    searchInput.addEventListener(
        "input",
        function () {

            searchTerm =
                searchInput.value
                    .trim()
                    .toLowerCase();


            clearSearch.style.display =
                searchTerm ? "block" : "none";


            visibleGuideCount =
                itemsPerLoad;


            applyFilters();

        }
    );


    /* =================================================
       CLEAR SEARCH
    ================================================= */

    clearSearch.addEventListener(
        "click",
        function () {

            searchInput.value = "";

            searchTerm = "";

            clearSearch.style.display =
                "none";

            visibleGuideCount =
                itemsPerLoad;

            applyFilters();

        }
    );


    /* =================================================
       APPLY FILTERS
    ================================================= */

    function applyFilters() {


        /* ---------------------------------------------
           DESTINATION CARDS
        --------------------------------------------- */

        let visibleDestinations = 0;


        destinationCards.forEach(
            function (card) {

                const cardRegion =
                    card.dataset.region;

                const cardSearch =
                    (
                        card.dataset.search || ""
                    ).toLowerCase();


                const matchesRegion =
                    activeRegion === "all" ||
                    cardRegion === activeRegion;


                const matchesSearch =
                    !searchTerm ||
                    cardSearch.includes(searchTerm);


                if (
                    matchesRegion &&
                    matchesSearch
                ) {

                    card.style.display = "";

                    visibleDestinations++;

                } else {

                    card.style.display =
                        "none";

                }

            }
        );


        /* ---------------------------------------------
           REGION SECTIONS
        --------------------------------------------- */

        regionSections.forEach(
            function (section) {

                const sectionRegion =
                    section.dataset.regionSection;


                const matchingCards =
                    section.querySelectorAll(
                        ".destination-card:not([style*='display: none'])"
                    );


                if (
                    matchingCards.length > 0
                ) {

                    section.style.display =
                        "";

                } else {

                    section.style.display =
                        "none";

                }

            }
        );


        /* ---------------------------------------------
           GUIDE CARDS
        --------------------------------------------- */

        const matchingGuides =
            guideCards.filter(
                function (card) {

                    const region =
                        card.dataset.region;

                    const text =
                        (
                            card.dataset.search || ""
                        ).toLowerCase();


                    const matchesRegion =
                        activeRegion === "all" ||
                        region === activeRegion;


                    const matchesSearch =
                        !searchTerm ||
                        text.includes(searchTerm);


                    return (
                        matchesRegion &&
                        matchesSearch
                    );

                }
            );


        guideCards.forEach(
            function (card) {

                card.style.display =
                    "none";

            }
        );


        matchingGuides.forEach(
            function (card, index) {

                if (
                    index < visibleGuideCount
                ) {

                    card.style.display =
                        "";

                }

            }
        );


        /* ---------------------------------------------
           RESULT COUNT
        --------------------------------------------- */

        if (searchTerm) {

            resultCount.textContent =
                `${matchingGuides.length} guide${
                    matchingGuides.length === 1
                        ? ""
                        : "s"
                } found`;

        } else {

            resultCount.textContent =
                `${matchingGuides.length} guides`;

        }


        /* ---------------------------------------------
           NO RESULTS
        --------------------------------------------- */

        if (
            matchingGuides.length === 0 &&
            visibleDestinations === 0
        ) {

            noResults.style.display =
                "block";

        } else {

            noResults.style.display =
                "none";

        }


        /* ---------------------------------------------
           LOAD MORE
        --------------------------------------------- */

        if (
            matchingGuides.length >
            visibleGuideCount
        ) {

            loadMoreButton.style.display =
                "block";

        } else {

            loadMoreButton.style.display =
                "none";

        }

    }


    /* =================================================
       LOAD MORE
    ================================================= */

    loadMoreButton.addEventListener(
        "click",
        function () {

            visibleGuideCount +=
                itemsPerLoad;

            applyFilters();

        }
    );


    /* =================================================
       REGION BUTTONS
    ================================================= */

    document
        .querySelectorAll(".region-button")
        .forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        const region =
                            button.dataset.region;


                        activeRegion =
                            region;


                        filterButtons.forEach(
                            function (filter) {

                                filter.classList
                                    .remove(
                                        "active"
                                    );


                                if (
                                    filter.dataset.region ===
                                    region
                                ) {

                                    filter.classList
                                        .add(
                                            "active"
                                        );

                                }

                            }
                        );


                        visibleGuideCount =
                            itemsPerLoad;


                        applyFilters();


                        document
                            .getElementById(
                                "guidesLibrary"
                            )
                            .scrollIntoView({
                                behavior:
                                    "smooth"
                            });

                    }
                );

            }
        );


    /* =================================================
       DESTINATION CARD CLICK
    ================================================= */



    /* =================================================
       INITIAL LOAD
    ================================================= */

    clearSearch.style.display = "none";

    applyFilters();

});

