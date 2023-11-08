const logoEntry = document.querySelector(".logo-entry")
const mainSection = document.querySelector(".main-section")


function logoEntryFunction() {

    logoEntry.style.display = "flex";
    mainSection.style.display = "none";
    setTimeout(()=> {
    logoEntry.style.display = "none";
    mainSection.style.display = "block";

    },2000)

  }

document.addEventListener("DOMContentLoaded", logoEntryFunction)

