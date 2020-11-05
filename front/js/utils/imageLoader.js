
export const loadImage = function (path, target_DOM_id) {
  const request = new XMLHttpRequest()
  request.open('GET', './subscribe/image' + path)
  request.responseType = 'blob'
  request.addEventListener('load', () => {
    const reader = new FileReader()

    reader.onloadend = function () {
      const DOM = document.getElementById(target_DOM_id)
      if (DOM) {
        DOM.src = reader.result

        d3.select('#' + target_DOM_id).attr('width', '100px')
          .transition().duration(400).style('opacity', 1)
      }
    }

    reader.readAsDataURL(request.response)
  })

  request.send()
}

export const previewImage = function () {
  const pos = d3.mouse(d3.select('.main-content').node())

  const leftContentSize = d3.select('#leftContent').node().getClientRects()[0].width

  d3.select(this).append('img')
    .attr('id', 'image-preview')
    .style('top', String(pos[1]) + 'px')
    .style('left', String(leftContentSize + 5) + 'px')
    .style('opacity', 0)

  const path = d3.select(this).attr('value')
  loadImage(path, 'image-preview')
}

export const deletePreviewImage = function () {
  d3.selectAll('#image-preview').remove()
}
