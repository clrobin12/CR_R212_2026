const filters = document.querySelectorAll('.btn-filter');
const cards = document.querySelectorAll('.card');

filters.forEach(button => {
  button.addEventListener('click', () => {
    
    document.querySelector('.btn-filter.active').classList.remove('active');
    button.classList.add('active');

    const filterValue = button.getAttribute('data-filter');

    cards.forEach(card => {
      if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
});



const detailButtons = document.querySelectorAll('.btn-detail');

detailButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const title = btn.parentElement.querySelector('h3').innerText;
    alert("Détails du projet : " + title + "\n(Cette interaction valide la Phase 3 du TP !)");
  });
});