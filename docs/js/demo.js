// Script for setting up demo.
$(document).ready(function() {
    //console.log("is this working?");
    /*wowStylesBackgroundSet("primary", {
        default: "primary",
        lighter: "primary-tint",
        darker: "primary-shade",
        saturated: "primary-strong",
        desaturated: "primary-weak",
        transparent: "primary-transparent"
    });*/
    var palette = {
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
    };

    $.each(palette, function() {
        wowStylesBackgroundSet(this);
    });
    //wowStylesBackgroundSet("primary");
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJkZW1vLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIFNjcmlwdCBmb3Igc2V0dGluZyB1cCBkZW1vLlxyXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcclxuICAgIC8vY29uc29sZS5sb2coXCJpcyB0aGlzIHdvcmtpbmc/XCIpO1xyXG4gICAgLyp3b3dTdHlsZXNCYWNrZ3JvdW5kU2V0KFwicHJpbWFyeVwiLCB7XHJcbiAgICAgICAgZGVmYXVsdDogXCJwcmltYXJ5XCIsXHJcbiAgICAgICAgbGlnaHRlcjogXCJwcmltYXJ5LXRpbnRcIixcclxuICAgICAgICBkYXJrZXI6IFwicHJpbWFyeS1zaGFkZVwiLFxyXG4gICAgICAgIHNhdHVyYXRlZDogXCJwcmltYXJ5LXN0cm9uZ1wiLFxyXG4gICAgICAgIGRlc2F0dXJhdGVkOiBcInByaW1hcnktd2Vha1wiLFxyXG4gICAgICAgIHRyYW5zcGFyZW50OiBcInByaW1hcnktdHJhbnNwYXJlbnRcIlxyXG4gICAgfSk7Ki9cclxuICAgIHZhciBwYWxldHRlID0ge1xyXG4gICAgICAgIGdyYXlzY2FsZToge1xyXG4gICAgICAgICAgICB3aGl0ZTogXCJ3aGl0ZVwiLFxyXG4gICAgICAgICAgICB0cmFuc3BhcmVudFdoaXRlOiBcIndoaXRlLXRyYW5zcGFyZW50XCIsXHJcbiAgICAgICAgICAgIGdyYXk6IFwiZ3JheVwiLFxyXG4gICAgICAgICAgICBsaWdodGVyR3JheTogXCJncmF5LXRpbnRcIixcclxuICAgICAgICAgICAgZGFya2VyR3JheTogXCJncmF5LXNoYWRlXCIsXHJcbiAgICAgICAgICAgIHRyYW5zcGFyZW50R3JheTogXCJncmF5LXRyYW5zcGFyZW50XCIsXHJcbiAgICAgICAgICAgIGJsYWNrOiBcImJsYWNrXCIsXHJcbiAgICAgICAgICAgIHRyYW5zcGFyZW50QmxhY2s6IFwiYmxhY2stdHJhbnNwYXJlbnRcIlxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHByaW1hcnk6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogXCJwcmltYXJ5XCIsXHJcbiAgICAgICAgICAgIGxpZ2h0ZXI6IFwicHJpbWFyeS10aW50XCIsXHJcbiAgICAgICAgICAgIGRhcmtlcjogXCJwcmltYXJ5LXNoYWRlXCIsXHJcbiAgICAgICAgICAgIHNhdHVyYXRlZDogXCJwcmltYXJ5LXN0cm9uZ1wiLFxyXG4gICAgICAgICAgICBkZXNhdHVyYXRlZDogXCJwcmltYXJ5LXdlYWtcIixcclxuICAgICAgICAgICAgdHJhbnNwYXJlbnQ6IFwicHJpbWFyeS10cmFuc3BhcmVudFwiXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgc2Vjb25kYXJ5OiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFwic2Vjb25kYXJ5XCIsXHJcbiAgICAgICAgICAgIGxpZ2h0ZXI6IFwic2Vjb25kYXJ5LXRpbnRcIixcclxuICAgICAgICAgICAgZGFya2VyOiBcInNlY29uZGFyeS1zaGFkZVwiLFxyXG4gICAgICAgICAgICBzYXR1cmF0ZWQ6IFwic2Vjb25kYXJ5LXN0cm9uZ1wiLFxyXG4gICAgICAgICAgICBkZXNhdHVyYXRlZDogXCJzZWNvbmRhcnktd2Vha1wiLFxyXG4gICAgICAgICAgICB0cmFuc3BhcmVudDogXCJzZWNvbmRhcnktdHJhbnNwYXJlbnRcIlxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGFsdGVybmF0ZToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBcImFsdGVybmF0ZVwiLFxyXG4gICAgICAgICAgICBsaWdodGVyOiBcImFsdGVybmF0ZS10aW50XCIsXHJcbiAgICAgICAgICAgIGRhcmtlcjogXCJhbHRlcm5hdGUtc2hhZGVcIixcclxuICAgICAgICAgICAgc2F0dXJhdGVkOiBcImFsdGVybmF0ZS1zdHJvbmdcIixcclxuICAgICAgICAgICAgZGVzYXR1cmF0ZWQ6IFwiYWx0ZXJuYXRlLXdlYWtcIixcclxuICAgICAgICAgICAgdHJhbnNwYXJlbnQ6IFwiYWx0ZXJuYXRlLXRyYW5zcGFyZW50XCJcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBhY2NlbnQ6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogXCJhY2NlbnRcIixcclxuICAgICAgICAgICAgbGlnaHRlcjogXCJhY2NlbnQtdGludFwiLFxyXG4gICAgICAgICAgICBkYXJrZXI6IFwiYWNjZW50LXNoYWRlXCIsXHJcbiAgICAgICAgICAgIHNhdHVyYXRlZDogXCJhY2NlbnQtc3Ryb25nXCIsXHJcbiAgICAgICAgICAgIGRlc2F0dXJhdGVkOiBcImFjY2VudC13ZWFrXCIsXHJcbiAgICAgICAgICAgIHRyYW5zcGFyZW50OiBcImFjY2VudC10cmFuc3BhcmVudFwiXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgc3VjY2Vzczoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBcInN1Y2Nlc3NcIixcclxuICAgICAgICAgICAgbGlnaHRlcjogXCJzdWNjZXNzLXRpbnRcIixcclxuICAgICAgICAgICAgZGFya2VyOiBcInN1Y2Nlc3Mtc2hhZGVcIixcclxuICAgICAgICAgICAgc2F0dXJhdGVkOiBcInN1Y2Nlc3Mtc3Ryb25nXCIsXHJcbiAgICAgICAgICAgIGRlc2F0dXJhdGVkOiBcInN1Y2Nlc3Mtd2Vha1wiLFxyXG4gICAgICAgICAgICB0cmFuc3BhcmVudDogXCJzdWNjZXNzLXRyYW5zcGFyZW50XCJcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICB3YXJuaW5nOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFwid2FybmluZ1wiLFxyXG4gICAgICAgICAgICBsaWdodGVyOiBcIndhcm5pbmctdGludFwiLFxyXG4gICAgICAgICAgICBkYXJrZXI6IFwid2FybmluZy1zaGFkZVwiLFxyXG4gICAgICAgICAgICBzYXR1cmF0ZWQ6IFwid2FybmluZy1zdHJvbmdcIixcclxuICAgICAgICAgICAgZGVzYXR1cmF0ZWQ6IFwid2FybmluZy13ZWFrXCIsXHJcbiAgICAgICAgICAgIHRyYW5zcGFyZW50OiBcIndhcm5pbmctdHJhbnNwYXJlbnRcIlxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGFsZXJ0OiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFwiYWxlcnRcIixcclxuICAgICAgICAgICAgbGlnaHRlcjogXCJhbGVydC10aW50XCIsXHJcbiAgICAgICAgICAgIGRhcmtlcjogXCJhbGVydC1zaGFkZVwiLFxyXG4gICAgICAgICAgICBzYXR1cmF0ZWQ6IFwiYWxlcnQtc3Ryb25nXCIsXHJcbiAgICAgICAgICAgIGRlc2F0dXJhdGVkOiBcImFsZXJ0LXdlYWtcIixcclxuICAgICAgICAgICAgdHJhbnNwYXJlbnQ6IFwiYWxlcnQtdHJhbnNwYXJlbnRcIlxyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgJC5lYWNoKHBhbGV0dGUsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHdvd1N0eWxlc0JhY2tncm91bmRTZXQodGhpcyk7XHJcbiAgICB9KTtcclxuICAgIC8vd293U3R5bGVzQmFja2dyb3VuZFNldChcInByaW1hcnlcIik7XHJcbn0pO1xyXG4iXSwiZmlsZSI6ImRlbW8uanMifQ==
