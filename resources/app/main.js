const input_main = document.getElementById('input-main');
const textarea_main = document.getElementById('textarea-main');
// const button_save = document.getElementById('button-save');
// const button_reset = document.getElementById('button-reset');
const svg_container_main = document.getElementById('svg-container-main');

const fs = require("fs");
const gerberToSvg = require("gerber-to-svg");


const randomColor = () => {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

const label_main = document.getElementById('label-main');



const gbr2Svg = (outPath) => {
  const layerName = outPath.replace(/^.*[\\\/]/, "").replace(/\.[^/.]+$/, "")
  const out = layerName + ".svg"

  fs.readFile(outPath, (err, gbr) => {
    if (err) {
      return console.error('read error.')
    }
    gerberToSvg(gbr, (err, svg) => {
      if (err) {
        return console.error("gbr to svg error. " + error.message);
      }
      else {
        // return svg
        fs.writeFile(out, svg, (err, data) => {
          if (err) console.log(err)
          else console.log('Done.')
        })
        const checkbox = document.createElement("INPUT")
        checkbox.setAttribute("type", "checkbox")
        checkbox.setAttribute("id", "checkbox" + "1")
        checkbox.setAttribute("checked", "checked")
        const color = document.createElement("INPUT")
        color.setAttribute("type", "color")
        color.value = randomColor()
        color.setAttribute("value", color.value)


        // var xmlns = "http://www.w3.org/2000/svg"
        // const svg_main = document.createElementNS(xmlns, "svg");
        // svg_main.innerHTML = svg

        const parser = new DOMParser();
        const svg_main_doc = parser.parseFromString(svg, "image/svg+xml");
        const svg_main = svg_main_doc.documentElement
        textarea_main.value = gbr
        // const svg_container_main = document.createElement("div");
        // area_content.appendChild(svg_container_main)
        svg_main.lastElementChild.setAttribute("fill", color.value)
        svg_main.lastElementChild.setAttribute("stroke", color.value)
        svg_container_main.appendChild(svg_main)
        label_main.appendChild(checkbox)
        label_main.appendChild(color)
        label_main.insertAdjacentHTML('beforeend', layerName + '<br>')

        checkbox.addEventListener('change', () => {
          if (checkbox.checked) {
            svg_main.setAttribute("visibility", "visible")
          } else {
            svg_main.setAttribute("visibility", "collapse")
          }
        });

        color.addEventListener('change', () => {
          svg_main.lastElementChild.setAttribute("fill", color.value)
          svg_main.lastElementChild.setAttribute("stroke", color.value)
        });

      }
    })

  })
}

input_main.addEventListener("change", () => {
  const file_main = input_main.files[0];
  gbr2Svg(file_main.path);
});



// button_save.addEventListener("click", () => {
//   fs.writeFile(out, svg, (err, data) => {
//     if (err) console.log(err)
//     else console.log('Done.')
//   })
// })

// button_reset.addEventListener("click", () => {
//   textarea_main.value = "";
// });
