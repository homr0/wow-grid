// Script for setting up demo.
$(document).ready(function() {
    // Sets the background color classes.
    wowStylesBackgroundSet({
        grayscale: {
            white: "white",
            transparentWhite: "white-transparent",
            gray: "gray",
            lighterGray: "gray-tint",
            darkerGray: "gray-shade",
            transparentGray: "gray-transparent",
            black: "black",
            transparentBlack: "black-transparent"
        },

        primary: {
            default: "primary",
            lighter: "primary-tint",
            darker: "primary-shade",
            saturated: "primary-strong",
            desaturated: "primary-weak",
            transparent: "primary-transparent"
        },

        secondary: {
            default: "secondary",
            lighter: "secondary-tint",
            darker: "secondary-shade",
            saturated: "secondary-strong",
            desaturated: "secondary-weak",
            transparent: "secondary-transparent"
        },

        alternate: {
            default: "alternate",
            lighter: "alternate-tint",
            darker: "alternate-shade",
            saturated: "alternate-strong",
            desaturated: "alternate-weak",
            transparent: "alternate-transparent"
        },

        accent: {
            default: "accent",
            lighter: "accent-tint",
            darker: "accent-shade",
            saturated: "accent-strong",
            desaturated: "accent-weak",
            transparent: "accent-transparent"
        },

        success: {
            default: "success",
            lighter: "success-tint",
            darker: "success-shade",
            saturated: "success-strong",
            desaturated: "success-weak",
            transparent: "success-transparent"
        },

        warning: {
            default: "warning",
            lighter: "warning-tint",
            darker: "warning-shade",
            saturated: "warning-strong",
            desaturated: "warning-weak",
            transparent: "warning-transparent"
        },

        alert: {
            default: "alert",
            lighter: "alert-tint",
            darker: "alert-shade",
            saturated: "alert-strong",
            desaturated: "alert-weak",
            transparent: "alert-transparent"
        }
    });

    // Gets the correct prompts.
    wow.strings = "https://homr0.github.io/wow-grid/js/grid.html";

    // Initiates editor.
    $('.ou-btn.button').on('click', function() {
        $(this).parent().addClass('ou-justedit-region mce-content-body mce-edit-focus');
    });

    // Emulates the save functionality.
    $('[aria-label="Save and Exit"]').on('click', function() {
        console.log("Saved the document.");
    });

    // Emulates the exit without saving functionality
    $('[aria-label="Exit Without Saving"]').on('click', function() {
        $('.ou-justedit-region.mce-content-body').removeClass('ou-justedit-region mce-content-body');
    });
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJkZW1vLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIFNjcmlwdCBmb3Igc2V0dGluZyB1cCBkZW1vLlxyXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcclxuICAgIC8vIFNldHMgdGhlIGJhY2tncm91bmQgY29sb3IgY2xhc3Nlcy5cclxuICAgIHdvd1N0eWxlc0JhY2tncm91bmRTZXQoe1xyXG4gICAgICAgIGdyYXlzY2FsZToge1xyXG4gICAgICAgICAgICB3aGl0ZTogXCJ3aGl0ZVwiLFxyXG4gICAgICAgICAgICB0cmFuc3BhcmVudFdoaXRlOiBcIndoaXRlLXRyYW5zcGFyZW50XCIsXHJcbiAgICAgICAgICAgIGdyYXk6IFwiZ3JheVwiLFxyXG4gICAgICAgICAgICBsaWdodGVyR3JheTogXCJncmF5LXRpbnRcIixcclxuICAgICAgICAgICAgZGFya2VyR3JheTogXCJncmF5LXNoYWRlXCIsXHJcbiAgICAgICAgICAgIHRyYW5zcGFyZW50R3JheTogXCJncmF5LXRyYW5zcGFyZW50XCIsXHJcbiAgICAgICAgICAgIGJsYWNrOiBcImJsYWNrXCIsXHJcbiAgICAgICAgICAgIHRyYW5zcGFyZW50QmxhY2s6IFwiYmxhY2stdHJhbnNwYXJlbnRcIlxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHByaW1hcnk6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogXCJwcmltYXJ5XCIsXHJcbiAgICAgICAgICAgIGxpZ2h0ZXI6IFwicHJpbWFyeS10aW50XCIsXHJcbiAgICAgICAgICAgIGRhcmtlcjogXCJwcmltYXJ5LXNoYWRlXCIsXHJcbiAgICAgICAgICAgIHNhdHVyYXRlZDogXCJwcmltYXJ5LXN0cm9uZ1wiLFxyXG4gICAgICAgICAgICBkZXNhdHVyYXRlZDogXCJwcmltYXJ5LXdlYWtcIixcclxuICAgICAgICAgICAgdHJhbnNwYXJlbnQ6IFwicHJpbWFyeS10cmFuc3BhcmVudFwiXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgc2Vjb25kYXJ5OiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFwic2Vjb25kYXJ5XCIsXHJcbiAgICAgICAgICAgIGxpZ2h0ZXI6IFwic2Vjb25kYXJ5LXRpbnRcIixcclxuICAgICAgICAgICAgZGFya2VyOiBcInNlY29uZGFyeS1zaGFkZVwiLFxyXG4gICAgICAgICAgICBzYXR1cmF0ZWQ6IFwic2Vjb25kYXJ5LXN0cm9uZ1wiLFxyXG4gICAgICAgICAgICBkZXNhdHVyYXRlZDogXCJzZWNvbmRhcnktd2Vha1wiLFxyXG4gICAgICAgICAgICB0cmFuc3BhcmVudDogXCJzZWNvbmRhcnktdHJhbnNwYXJlbnRcIlxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGFsdGVybmF0ZToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBcImFsdGVybmF0ZVwiLFxyXG4gICAgICAgICAgICBsaWdodGVyOiBcImFsdGVybmF0ZS10aW50XCIsXHJcbiAgICAgICAgICAgIGRhcmtlcjogXCJhbHRlcm5hdGUtc2hhZGVcIixcclxuICAgICAgICAgICAgc2F0dXJhdGVkOiBcImFsdGVybmF0ZS1zdHJvbmdcIixcclxuICAgICAgICAgICAgZGVzYXR1cmF0ZWQ6IFwiYWx0ZXJuYXRlLXdlYWtcIixcclxuICAgICAgICAgICAgdHJhbnNwYXJlbnQ6IFwiYWx0ZXJuYXRlLXRyYW5zcGFyZW50XCJcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBhY2NlbnQ6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogXCJhY2NlbnRcIixcclxuICAgICAgICAgICAgbGlnaHRlcjogXCJhY2NlbnQtdGludFwiLFxyXG4gICAgICAgICAgICBkYXJrZXI6IFwiYWNjZW50LXNoYWRlXCIsXHJcbiAgICAgICAgICAgIHNhdHVyYXRlZDogXCJhY2NlbnQtc3Ryb25nXCIsXHJcbiAgICAgICAgICAgIGRlc2F0dXJhdGVkOiBcImFjY2VudC13ZWFrXCIsXHJcbiAgICAgICAgICAgIHRyYW5zcGFyZW50OiBcImFjY2VudC10cmFuc3BhcmVudFwiXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgc3VjY2Vzczoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBcInN1Y2Nlc3NcIixcclxuICAgICAgICAgICAgbGlnaHRlcjogXCJzdWNjZXNzLXRpbnRcIixcclxuICAgICAgICAgICAgZGFya2VyOiBcInN1Y2Nlc3Mtc2hhZGVcIixcclxuICAgICAgICAgICAgc2F0dXJhdGVkOiBcInN1Y2Nlc3Mtc3Ryb25nXCIsXHJcbiAgICAgICAgICAgIGRlc2F0dXJhdGVkOiBcInN1Y2Nlc3Mtd2Vha1wiLFxyXG4gICAgICAgICAgICB0cmFuc3BhcmVudDogXCJzdWNjZXNzLXRyYW5zcGFyZW50XCJcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICB3YXJuaW5nOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFwid2FybmluZ1wiLFxyXG4gICAgICAgICAgICBsaWdodGVyOiBcIndhcm5pbmctdGludFwiLFxyXG4gICAgICAgICAgICBkYXJrZXI6IFwid2FybmluZy1zaGFkZVwiLFxyXG4gICAgICAgICAgICBzYXR1cmF0ZWQ6IFwid2FybmluZy1zdHJvbmdcIixcclxuICAgICAgICAgICAgZGVzYXR1cmF0ZWQ6IFwid2FybmluZy13ZWFrXCIsXHJcbiAgICAgICAgICAgIHRyYW5zcGFyZW50OiBcIndhcm5pbmctdHJhbnNwYXJlbnRcIlxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGFsZXJ0OiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFwiYWxlcnRcIixcclxuICAgICAgICAgICAgbGlnaHRlcjogXCJhbGVydC10aW50XCIsXHJcbiAgICAgICAgICAgIGRhcmtlcjogXCJhbGVydC1zaGFkZVwiLFxyXG4gICAgICAgICAgICBzYXR1cmF0ZWQ6IFwiYWxlcnQtc3Ryb25nXCIsXHJcbiAgICAgICAgICAgIGRlc2F0dXJhdGVkOiBcImFsZXJ0LXdlYWtcIixcclxuICAgICAgICAgICAgdHJhbnNwYXJlbnQ6IFwiYWxlcnQtdHJhbnNwYXJlbnRcIlxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8vIEdldHMgdGhlIGNvcnJlY3QgcHJvbXB0cy5cclxuICAgIHdvdy5zdHJpbmdzID0gXCJodHRwczovL2hvbXIwLmdpdGh1Yi5pby93b3ctZ3JpZC9qcy9ncmlkLmh0bWxcIjtcclxuXHJcbiAgICAvLyBJbml0aWF0ZXMgZWRpdG9yLlxyXG4gICAgJCgnLm91LWJ0bi5idXR0b24nKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAkKHRoaXMpLnBhcmVudCgpLmFkZENsYXNzKCdvdS1qdXN0ZWRpdC1yZWdpb24gbWNlLWNvbnRlbnQtYm9keSBtY2UtZWRpdC1mb2N1cycpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gRW11bGF0ZXMgdGhlIHNhdmUgZnVuY3Rpb25hbGl0eS5cclxuICAgICQoJ1thcmlhLWxhYmVsPVwiU2F2ZSBhbmQgRXhpdFwiXScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiU2F2ZWQgdGhlIGRvY3VtZW50LlwiKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIEVtdWxhdGVzIHRoZSBleGl0IHdpdGhvdXQgc2F2aW5nIGZ1bmN0aW9uYWxpdHlcclxuICAgICQoJ1thcmlhLWxhYmVsPVwiRXhpdCBXaXRob3V0IFNhdmluZ1wiXScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQoJy5vdS1qdXN0ZWRpdC1yZWdpb24ubWNlLWNvbnRlbnQtYm9keScpLnJlbW92ZUNsYXNzKCdvdS1qdXN0ZWRpdC1yZWdpb24gbWNlLWNvbnRlbnQtYm9keScpO1xyXG4gICAgfSk7XHJcbn0pO1xyXG4iXSwiZmlsZSI6ImRlbW8uanMifQ==
