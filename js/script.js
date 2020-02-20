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

 
const optArticleSelector = '.post';
const optTitleSelector = '.post-title';
const optTitleListSelector = '.titles'; 
const optArticleTagsSelector = ' .post-tags .list';
const optArticleAuthorSelector = '.post-author',

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

    /* get tags from data-tags attribute - odczyt tagow z atrybutu data-tags*/
    const articleTags = article.getAttribute("data-tags");
    console.log(articleTags);

    /* split tags into array - podzial grupy tagow na pojedyncze tagi */
    const articleTagsArray = articleTags.split(' ');
    console.log(articleTagsArray); 

    /* START LOOP: for each tag - zmienna tag jest trescia pojedynczego taga*/
    for (let tag of articleTagsArray) {
    console.log(tag);

      /* generate HTML of the link - generowanie linka dla taga */
      // const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li> ';
      const linkHTMLData = { id: tag, title: tag };
      const linkHTML = templates.tagLink(linkHTMLData);
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
  const href = clickedElement.getAttribute("href");
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
  generateTitleLinks('[data-tags~="' + tag + '"]');
  }

  /* execute function "generateTitleLinks" with article selector as argument */
}

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
 

function tagClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute("href");
  console.log('clickedelement', clickedElement);

  /* make a new constant "tag" and extract tag from the "href" constant */
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
  for (let tagLink of TagLinks)

    /* add class active */
    tagLink.classList.add('active');

  /* END LOOP: for each found tag link */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

/* execute function "generateTitleLinks" with article selector as argument */
function addClickListenersToTags() {

  /* find all links to tags */
  const allTagLinks = document.querySelectorAll('a[href^="#tag"]');

  /* START LOOP: for each link */
  for (let tag of allTagLinks) {

    /* add tagClickHandler as event listener for that link */
    tag.addEventListener('click', tagClickHandler);

  /* END LOOP: for each link */
  }
}
addClickListenersToTags();


/* Function generateAuthors */
function generateAuthors() {

  // Przypisanie do zmiennej wszystkich artykulow
    const articles = document.querySelectorAll(optArticleSelector);
    
  // Przejscie pokazdym artykule 
    for(let article of articles) {
  
      /* find author wrapper */
      const authorWrapper = article.querySelector(optArticleAuthorSelector);
    titleList.innerHTML = '';
      console.log(article);
    
    /* make html variable with empty string */
      let html = '';
  
      /* get tags from data-tags attribute */
      const articleAuthor = article.getAttribute('data-author');
    console.log(articleAuthor);
  
      for (let author of articleAuthors) {
      console.log(articleAuthor);	
    
      /* generate HTML of the link */
      const linkHTMLData = {id: articleAuthor, title: articleAuthor};
      const linkHTML = templatesAuthors.authorLink(linkHTMLData);
      console.log(linkHTML);
  
      titleList.insertAdjacentHTML('beforeend', linkHTML);
      html = html + linkHTML + ' ';
      console.log(html);
  
     /* END LOOP: for each tag */
      }
  
      /* insert HTML of all the links into the tags wrapper - dodanie linkow do wrappera tagow */
      authorList.innerHTML = html;
      console.log('authorlist', authorList); 
  
    /* END LOOP: for every article: */
    const authorList = document.querySelector('.authors');
    }
  }
  generateAuthors();
  
  /* Function generateAuthors  */
  function authorClickHandler(event){
    event.preventDefault();
    const clickedElement = this;
  
    const href = clickedElement.getAttribute('href');
  
    const author = href.replace('#author-', '');
  
    const activeLinks = document.querySelectorAll('a.active[href^="#author-"]');
  
    for(let activeLink of activeLinks){
  
      activeLink.classList.remove('active');
    }
  
    const tagLinks = document.querySelectorAll('a.active[href^="#author-"]');
  
    for(let tagLink of tagLinks){
  
      tagLink.classList.add('active');
    }
    generateTitleLinks('[data-author="' + author + '"]');
  }
  
  function addClickListenersToAuthors(){
    const links = document.querySelectorAll('.authors a');
    for(let link of links){
        
      link.addEventListener('click', authorClickHandler);
    }
  }
  addClickListenersToAuthors();  