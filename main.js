window.addEventListener('load', () => {
  setCardSizeToEqual();
  setUpSocialHoverEvents();
  document.getElementById('formSubmit').addEventListener('click', e => {
    e.preventDefault();
    sendEmail();
  })
})

window.addEventListener('resize', () => {
  setCardSizeToEqual();
})

function setCardSizeToEqual() {
  const cards = document.querySelectorAll('.card-container .row .col-lg-4 .card');
  let cardHeight = cards[0].offsetHeight;
  cards.forEach(elem => {
    if (cardHeight < elem.offsetHeight) {
      cardHeight = elem.offsetHeight;
    }
  })
  cards.forEach(elem => {
    elem.style.minHeight = cardHeight + 'px';
  })
}

function sendEmail() {
  const valid = true;
  const nameField = document.getElementById('formName');
  const emailField = document.getElementById('formEmail');
  const contentField = document.getElementById('formContent');
  if (!nameField) {
    nameField.classList.add('.is-invalid');
    valid = false;
  }
  if (!emailField) {
    emailField.classList.add('.is-invalid');
    valid = false;
  }
  if (!contentField) {
    contentField.classList.add('.is-invalid');
    valid = false;
  }
  if (!valid) return;
  fetch("https://formsubmit.co/ajax/8b3482af8b247f2c4e9f06b6c4e028da", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      name: nameField.value,
      email: emailField.value,
      _replyto: emailField.value,
      _subject: "Someone Has Reached Out To You From rogerenand.com",
      message: contentField.value
    })
  })
    .then(response => response.json())
    .then(data => {
      nameField.classList.remove('.is-invalid');
      emailField.classList.remove('.is-invalid');
      contentField.classList.remove('.is-invalid');
    })
    .catch(error => console.error('OOPS. SOMETHING WENT WRONG'));
}

function setUpSocialHoverEvents() {
  const socialLinks = document.querySelectorAll('.socials a');
  const tagLine = document.querySelector('.header-contents h3');
  const tagLineInitialText = tagLine.innerHTML;
  socialLinks.forEach((link, i) => {
    let newText = tagLineInitialText;
    switch (i) {
      case 0:
        newText = 'View My LinkedIn'
        break;
      case 1:
        newText = 'View My GitHub'
        break;
      case 2:
        newText = 'View My Codepen'
        break;
      case 3:
        newText = 'View My Resume'
        break;
      default:
        break;
    }
    link.addEventListener('mouseenter', e => {
      tagLine.innerHTML = newText;
    })
    link.addEventListener('mouseleave', e => {
      tagLine.innerHTML = tagLineInitialText;
    })
  })
}
