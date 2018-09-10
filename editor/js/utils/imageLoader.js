
export const loadImage = function (path, target_DOM_id) {
    const request = new XMLHttpRequest();
    request.open("GET", "./subscribe/image" + path);
    request.responseType = 'blob';
    request.addEventListener("load", () => {
        const reader = new FileReader();

        reader.onloadend = function() {
            document.getElementById(target_DOM_id).src = reader.result;

            d3.select("#" + target_DOM_id).attr("width", "100px")
        };

        reader.readAsDataURL(request.response);
    });

    request.send();
};

export const previewImage = function () {
    const pos = d3.mouse(d3.select("#centerContent").node());

    d3.select(this).append("img")
        .attr("id", "image-preview")
        .style("top", String(pos[1] - 30) + "px")
        .style("left", "50px");

    const path = d3.select(this).attr("value");
    loadImage(path, "image-preview");
};

export const deletePreviewImage = function () {
    d3.selectAll("#image-preview").remove();
};
