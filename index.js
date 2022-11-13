const hexInput = document.getElementById("hexinput");
const inputColor = document.getElementById("inputcolor");
const alteredColor = document.getElementById("alteredcolor");
const alteredColorText = document.getElementById("alteredcolortext");
const sliderText = document.getElementById("slidertext");
const slider = document.getElementById("slider");
const lightenText = document.getElementById("lightentext");
const darkenText = document.getElementById("darkentext");
const toggleBtn = document.getElementById("togglebtn");

toggleBtn.addEventListener("click", () => {
  /*
  toggleBtn.classList.toggle("toggled");
  lightenText.classList.toggle("unselected");
  darkenText.classList.toggle("unselected");
 */
  if (toggleBtn.classList.contains("toggled")) {
    toggleBtn.classList.remove("toggled");
    lightenText.classList.remove("unselected");
    darkenText.classList.add("unselected");
  }
  else {
    toggleBtn.classList.add("toggled");
    lightenText.classList.add("unselected");
    darkenText.classList.remove("unselected");
  }
  reset();
});

hexInput.addEventListener("keyup", () => {
  const hex = hexInput.value;
  if (!isValidHex(hex)) return;

  const strippedHex = hex.replace("#", "");

  inputColor.style.backgroundColor = "#" + strippedHex;
  reset();
});

const isValidHex = (hex) => {
  if (!hex) return false;

  const strippedHex = hex.replace("#", "");
  return strippedHex.length === 3 || strippedHex.length === 6;
};

const convertHexToRGB = (hex) => {
  if (!isValidHex(hex)) return null;

  let strippedHex = hex.replace("#", "");

  if (strippedHex.length === 3) {
    strippedHex =
      strippedHex[0] +
      strippedHex[0] +
      strippedHex[1] +
      strippedHex[1] +
      strippedHex[2] +
      strippedHex[2];
  }

  const r = parseInt(strippedHex.substring(0, 2), 16);
  const g = parseInt(strippedHex.substring(2, 4), 16);
  const b = parseInt(strippedHex.substring(4, 6), 16);

  return { r, g, b };
};

const convertRGBToHex = (r, g, b) => {
  /*
    let h = r.toString(16);
    let e = g.toString(16);
    let x = b.toString(16);
    
    if (h.length === 1){
     h = h[0]+h[0]
    }
    if (e.length === 1){
    e = e[0]+e[0]
    }
    if (x.length === 1){
    x = x[0] +x[0]
    }
    const hex = "#"+h+e+x
    */
  const firstPair = ("0" + r.toString(16)).slice(-2);
  const secondPair = ("0" + g.toString(16)).slice(-2);
  const thirdPair = ("0" + b.toString(16)).slice(-2);

  const hex = "#" + firstPair + secondPair + thirdPair;

  return hex;
};

const alterColor = (hex, percentage) => {
  const { r, g, b } = convertHexToRGB(hex);

  const amount = Math.floor((percentage / 100) * 255);

  const newR = increaseWithin0To255(r, amount);
  const newG = increaseWithin0To255(g, amount);
  const newB = increaseWithin0To255(b, amount);

  return convertRGBToHex(newR, newG, newB);
};

const increaseWithin0To255 = (hex, amount) => {
  // const newHex = hex + amount;
  // if(newHex > 255) return 255;
  // if(newHex < 0) return 0;
  // return newHex;
  return Math.min(255, Math.max(0, hex + amount));
};

slider.addEventListener("input", () => {
  if (!isValidHex(hexInput.value)) return;

  sliderText.textContent = `${slider.value}%`;

  const valueAddition = toggleBtn.classList.contains("toggled")? -slider.value : slider.value

  const alteredHex = alterColor(hexInput.value, valueAddition);
  alteredColor.style.backgroundColor = alteredHex;
  alteredColorText.innerText = `Altered Color ${alteredHex}`;
});

const reset = ()=> {
  
    slider.value = 0;
    sliderText.textContent = "0%";
    alteredColor.style.backgroundColor = "#" + hexInput.value.replace("#", "");
    alteredColorText.innerText = "Altered Color " + "#" + hexInput.value.replace("#", "");
    
}