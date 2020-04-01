photo = {
    page: 1,
    offset: 100,
    init: function () {
        var that = this;
        $.getJSON("/photos/photoslist.json", function (data) {
            that.render(that.page, data);
            //that.scroll(data);
        });
    },
    render: function (page, data) {
        var begin = (page - 1) * this.offset;
        var end = page * this.offset;
        if (begin >= data.length) return;
        var html, imgNameWithPattern, imgName, imageSize, imageX, imageY, li = "";
        for (var i = begin; i < end && i < data.length; i++) {
           imgNameWithPattern = data[i].split(' ')[1];
           imgName = imgNameWithPattern.split('.')[0]
           imageSize = data[i].split(' ')[0];
           imageX = imageSize.split('.')[0];
           imageY = imageSize.split('.')[1];
            li += '<div class="card" style="width:213px">' +
                    '<div class="ImageInCard" style="height:'+ 213 * imageY / imageX + 'px">' +
                      '<a data-fancybox="gallery" href="https://web-1256060851.file.myqcloud.com/images/photos/' + imgNameWithPattern + '" data-caption="' + imgName + '" title="' +  imgName + '">' +
                        '<img data-src="https://web-1256060851.file.myqcloud.com/images/photos/' + imgNameWithPattern + '!213x" src="https://web-1256060851.file.myqcloud.com/images/photos/' + imgNameWithPattern + '!213x" data-loaded="true">' +
                      '</a>' +
                    '</div>' +
                  '</div>'
        }
        $(".ImageGrid").append(li);
        this.minigrid();
    },
    minigrid: function() {
        var grid = new Minigrid({
            container: '.ImageGrid',
            item: '.card',
            gutter: 12
        });
        grid.mount();
        $(window).resize(function() {
           grid.mount();
        });
    }
}
photo.init();