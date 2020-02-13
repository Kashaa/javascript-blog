'use strict';

 

/* FUNCTION TITLE CLICK HANDLER - WYŚWIETLENIE TREŚCI ARYKUŁU PO KLIKNIĘCIU NA TYTUŁ*/
function titleClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');

  /* remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  /* add class 'active' to the clicked link */
  console.log('clickedElement:', clickedElement);
  clickedElement.classList.add('active');


  /* remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts .active');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }

  /* get 'href' attribute from the clicked link */
  const articleSelector = this.getAttribute("href");
  console.log(articleSelector);

  /* find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);
  console.log(targetArticle);

  /* add class 'active' to the correct article */
  targetArticle.classList.add('active');
}

const links = document.querySelectorAll('.titles a');
console.log(links);

for(let link of links){
  link.addEventListener('click', titleClickHandler);
}

 
/* FUNCTION TITLE CLICK HANDLER - GENEROWANIE LISTY TYTULOW*/
const optArticleSelector = ‘.post’,
  optTitleSelector = ‘.post-title’,
  optTitleListSelector = ‘.titles’; 

function generateTitleLinks(customSelector = '') {
  console.log('Titles was generated');

  /* remove contents of titleList - wyczyszczenie listy linkow */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  /* for each article - deklaracja stałej articles i zapisanie do niej odniesienia pasującego do selektora ze stałej optArticleSelector */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  console.log(customSelector);

  let html = '';

  for (let article of articles) {

    /* get the article id - odczytanie id artykułu */
    const articleId = article.getAttribute('id');
    console.log(article); 

    /* find the title element - odczytanie tytułu artykułu (odnalezienie elementu i odczytanie jego zawartości) */
    /* get the title from the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
 
    /* create HTML of the link */
    console.log(linkHTML);
    const linkHTML = ‘<li><a href=”#’ + articleId + ‘”><span>’ + articleTitle + ‘</span></a></li>’; 


    /* insert link into titleList */
    titleList.insertAdjacentHTML('beforeend', linkHTML);

    /* insert link into html variable */

    html = html + linkHTML;
    console.log(html);
  }

  titleList.innerHTML = html;

}
generateTitleLinks();