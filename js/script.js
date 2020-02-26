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
  const articleSelector = this.getAttribute('href');
  console.log(articleSelector);

  /* find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);
  console.log(targetArticle);

  /* add class 'active' to the correct article */
  targetArticle.classList.add('active');
}

 
const optArticleSelector = '.post';
const optTitleSelector = '.post-title';
const optTitleListSelector = '.titles'; 
const optArticleTagsSelector = ' .post-tags .list';
const optArticleAuthorSelector = '.post-author';

/* FUNCTION GENERATE TITLE LINKS - GENEROWANIE LISTY TYTULOW*/
function generateTitleLinks(customSelector = '') {
  console.log('Title was generated!');

  /* remove contents of titleList - wyczyszczenie listy linkow */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  /* for each article - deklaracja stałej articles i zapisanie do niej odniesienia pasującego do selektora ze stałej optArticleSelector */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  console.log(articles);

  for (let article of articles) {

    /* get the article id - odczytanie id artykułu */
    const articleId = article.getAttribute('id');
    console.log(article); 

    /* find the title element - znalezienie elementu z tytułem i zapisanie jego zawartości do stałej */
    /* get the title from the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
 
    /* create HTML of the link - stworzenie kodu HTML linka i zapisanie go do stałej*/
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>'; 
    console.log(linkHTML);

    /* insert link into titleList - wstawianie stworzonego kodu HTML do listy linków w lewej kolumnie*/
    titleList.insertAdjacentHTML('beforeend', linkHTML);
  }
}

generateTitleLinks();

const links = document.querySelectorAll('.titles a');
console.log(links);

for(let link of links){
  link.addEventListener('click', titleClickHandler);
}


/* FUNCTION GENERATE TAGS - GENEROWANIE TAGOW*/
function generateTags() {

  /* find all articles - znajdz wszystkie artykuly*/
  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */
  for (let article of articles) {

    /* find tags wrapper - znalezienie wrappera tagow w pojedynczym artykule*/
    const titleList = article.querySelector(optArticleTagsSelector);
    titleList.innerHTML = '';
    console.log(article);

    /* make html variable with empty string - stworzenie zmiennej html (pustej, aby dodawać kolejne fragm kodu html)*/
    let html = '';  

    /* get tags from data-tags attribute - odczyt tagow z atrybutu data-tags */
    const articleTags = article.getAttribute('data-tags');
    console.log(articleTags); 

    /* split tags into array - podzial grupy tagow na pojedyncze tagi */
    const articleTagsArray = articleTags.split(' ');
    console.log(articleTagsArray); 

    /* START LOOP: for each tag - zmienna tag jest trescia pojedynczego taga*/
    for (let tag of articleTagsArray) {
      console.log(tag);

      /* generate HTML of the link - generowanie linka dla taga */
      const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
      console.log(linkHTML); 

      /* add generated code to html variable - dodanie linka dla taga do html*/
      titleList.insertAdjacentHTML('beforeend', linkHTML);
      html = html + linkHTML + ' ';
      console.log(html);

    /* END LOOP: for each tag */
    }

    /* insert HTML of all the links into the tags wrapper - dodanie linkow do wrappera tagow */
    tagList.innerHTML = html;
    console.log('taglist', tagList); 

    /* END LOOP: for every article: */
    const tagList = document.querySelector('.tags');
  }
}
generateTags();


/* FUNCTION TAG CLICK HANDLER - DODANIE AKCJI PO KLIKNIECIU W TAG*/
function tagClickHandler(event) { 

  /* prevent default action for this event */
  event.preventDefault(); 

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this; 

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log('clickedelement', clickedElement);

  /* make a new constant "tag" and extract tag from the "href" constant - wydobycie fragmentu tekstu */
  const tag = href.replace('#tag-', '');

  /* find all tag links with class active */
  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');

  /* START LOOP: for each active tag link */
  for (let activeTag of activeTags) {

    /* remove class active */
    activeTag.classList.remove('active');

  /* END LOOP: for each active tag link */
  } 

  /* find all tag links with "href" attribute equal to the "href" constant */
  const TagLinks = document.querySelectorAll('a[href="' + href + '"]');

  /* START LOOP: for each found tag link */
  for (let tagLink of TagLinks) {

    /* add class active */
    tagLink.classList.add('active');

  /* END LOOP: for each found tag link - wyszukanie elementow ktore maja atrybut data-tags ktory ma w sobie sowo tag*/
  }

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}


/* FUNCTION ADD CLICK LISTENERS TO TAGS */
function addClickListenersToTags() {

  /* find all links to tags - znalezienie wszystkich linkow do aktywnego tagu*/
  const allTagLinks = document.querySelectorAll('a[href^="#tag"]');

  /* START LOOP: for each link */
  for (let tag of allTagLinks) {   

    /* add tagClickHandler as event listener for that link */
    tag.addEventListener('click', tagClickHandler);

  /* END LOOP: for each link */
  }
}
addClickListenersToTags();

 
/* FUNCTION GENERATE AUTHORS - DODANIE AUTORA DO ARTYKULU */
function generateAuthors() {

  /* find all authors - przypisanie do zmiennej wszystkich artykułów*/
  const articles = document.querySelectorAll(optArticleSelector);
  console.log(articles); 

  /* START LOOP: for every author: - przejście po każdym artykule */
  for(let article of articles) { 

    /* find authors wrapper */
    const titleList = article.querySelector(optArticleAuthorSelector);

    /* make html variable with empty string */
    let html = ''; 

    /* get author from data-author attribute */
    const authorName = article.getAttribute('data-author');
    console.log('authorName:', authorName);   

    /* generate HTML of the link */
    const linkHTML = '<a href="#author-' + authorName + '">' + 'by ' + authorName + '</a>';
    console.log(linkHTML);

    /* add generated code to html variable */
    titleList.insertAdjacentHTML('beforeend', linkHTML);
    document.querySelector('.list.authors').innerHTML +=
    '<li><a href="#author-' + authorName + '"><span>' + authorName + '</span></a></li>';
    html = html + linkHTML;
    console.log(html);

    /* END LOOP: for each tag */

    /* insert HTML of all the links into the authors wrapper */
    titleList.innerHTML = html;
  }
}
generateAuthors();


/* FUNCTION AUTHOR CLICK HANDLER - DODANIE AKCJI PO KLIKNIECIU W AUTORA*/  
function authorClickHandler(event) {

  /* prevent default action for this event */
  event.preventDefault();  

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log('clickedElement:', clickedElement);

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = this.getAttribute('href');

  /* make a new constant "author" and extract authors from the "href" constant */
  const author = href.replace('#author-', '');
  console.log('author:', author);

  /* find all author links with class active */
  const activeAuthorLinks = document.querySelectorAll('a.active[href^="#author-"]');
  console.log(activeAuthorLinks);

  /* START LOOP: for each active author link */
  for (let activeAuthorLink of activeAuthorLinks) {

    /* remove class active */
    activeAuthorLink.classList.remove('active');

  /* END LOOP: for each active author link */
  }

  /* find all author links with "href" attribute equal to the "href" constant */
  const equalAuthorLinks = document.querySelectorAll('a[href="' + href + '"]');
  console.log(equalAuthorLinks);

  /* START LOOP: for each found author link */
  for (let equalAuthorLink of equalAuthorLinks) {

    /* add class active */
    equalAuthorLink.classList.add('active'); 

  /* END LOOP: for each found author link */
  }

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + author + '"]');
}

/* FUNCTION ADD CLICK LISTENERS TO AUTHORS */ 
function addClickListenersToAuthors() { 

  /* find all links to authors */
  const authorLinks = document.querySelectorAll(optArticleAuthorSelector + '.post-author a, .list.authors a');
  console.log(authorLinks);

  /* START LOOP: for each link */
  for (let authorLink of authorLinks) {

    /* add authorClickHandler as event listener for that link */
    authorLink.addEventListener('click', authorClickHandler);

  /* END LOOP: for each link */
  }
}
addClickListenersToAuthors();