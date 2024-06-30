let passwordField = document.getElementById("password_field")
let copyPassBtn = document.getElementById("copy_pass")
let characterNumDisplay = document.getElementById("character_num_display")
let characterNumField = document.getElementById("character_num")
let upperCheckField = document.getElementById("upper_check")
let lowerCheckField = document.getElementById("lower_check")
let numsCheckField = document.getElementById("nums_check")
let symsCheckField = document.getElementById("syms_check")
let strengthDisplayText = document.querySelector(".strength-display .strength-text")
let strengthDisplayPoints = [...document.querySelectorAll(".strength-points .point")]
let generateBtn = document.getElementById("generate_pass");
let controlBox = document.querySelector(".control-box")
let successMessage = document.querySelector(".success-message")

let upperCheck = upperCheckField.checked;
let lowerCheck = lowerCheckField.checked
let numsCheck = numsCheckField.checked;
let symsCheck = symsCheckField.checked;
let characterNum = parseInt(characterNumField.value);

let abcLower = "abcdefghijklmnopqrstuvwyz"
let abcUpper = abcLower.toUpperCase()
let nums = "123456789"
let syms = "@!#$%&?/"; // There are other symbols but I use these the most commun in passwords

function updateVars() {
  upperCheck = upperCheckField.checked;
  lowerCheck = lowerCheckField.checked
  numsCheck = numsCheckField.checked;
  symsCheck = symsCheckField.checked;
  characterNum = parseInt(characterNumField.value);
}

function checkTrueInput(input) {
  updateVars()

  if (!upperCheck && !lowerCheck && !numsCheck && !symsCheck) input.checked = "true"
}

function calculateStrength() {
  updateVars()

  let strength = 0

  if (upperCheck) strength += 0.5
  if (lowerCheck) strength += 0.5
  if (numsCheck) strength += 0.5
  if (symsCheck) strength += 0.5

  if (characterNum > 4 && characterNum <= 7) strength += 1
  else if (characterNum > 7 && characterNum <= 9) strength += 2
  else if (characterNum > 9) strength  += 3

  strength = Math.ceil(strength)

  if (strength <= 2) strengthDisplayText.textContent = "Weak"
  else if (strength < 4) strengthDisplayText.textContent = "Medium"
  else strengthDisplayText.textContent = "Strong"

  strengthDisplayPoints.forEach((el, i) => {
    if (i + 1 <= strength) el.classList.add("active")
    else el.classList.remove("active")
  })
}

function checkInputListener(e) {
  checkTrueInput(e.currentTarget)
  generatePass()
  calculateStrength()
}

function generatePass() {
  updateVars()

  let res = ""
  let charset = ""

  if (upperCheck) charset += abcUpper
  if (lowerCheck) charset += abcLower
  if (numsCheck) charset += nums
  if (symsCheck) charset += syms

  for (let i = 0, j = charset.length; i < characterNum; i++) {
    res += charset.charAt(Math.floor(Math.random() * j));
  }

  passwordField.textContent = res;
}

characterNumField.addEventListener("input", (e) => {
  characterNumDisplay.textContent = e.currentTarget.value;
  generatePass();
  calculateStrength();
})

upperCheckField.addEventListener("input", checkInputListener);

lowerCheckField.addEventListener("input", checkInputListener);

numsCheckField.addEventListener("input", checkInputListener);

symsCheckField.addEventListener("input", checkInputListener);

generateBtn.addEventListener("click", generatePass);

copyPassBtn.addEventListener("click", () => {
  let copied = navigator.clipboard.writeText(passwordField.textContent)
  copied.then(() => {
    successMessage.classList.add("active")
    controlBox.style.transform = `translateY(${successMessage.clientHeight - 20}px)`
    setTimeout(() => {
      successMessage.classList.remove("active")
      controlBox.style.transform = ""
    }, 3000)
  })
})

generatePass();