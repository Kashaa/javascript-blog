'use strict';

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author',
  //optTagsListSelector = '.tags .list',
  optCloudClassCount = 5,
  optCloudClassPrefix = 'tag-size-';


/* FUNCTION TITLE CLICK HANDLER - WYŚWIETLENIE TREŚCI ARYKUŁU PO KLIKNIĘCIU NA TYTUŁ*/
function titleClickHandler(event) {
  console.log('Link was clicked!');
  console.log(event);
  
  /* remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  event.preventDefault();
  
  /* add class 'active' to the clicked link */
  const clickedElement = this;
  this.classList.add('active');
  console.log('clickedElement:', clickedElement);
  
  /* remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts .active');

  for (let activeArticle of activeArticles) {
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
  console.log('clickedElement:', targetArticle);
}


/* FUNCTION GENERATE TITLE LINKS - GENEROWANIE LISTY TYTULOW*/
function generateTitleLinks(customSelector = ''){
  console.log('Titles was generated');
  
  /* remove contents of titleList */
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
    
    /* find the title element - znalezienie elementu z tytułem i zapisanie jego zawartości do stałej */
    /* get the title from the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    
    /* create HTML of the link - stworzenie kodu HTML linka i zapisanie go do stałej*/
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    console.log(linkHTML);
    
    /* insert link into titleList */
    // titleList.innerHTML = titleList.innerHTML + linkHTML;
    // titleList.innerHTML = titleList.insertAdjacentHTML('beforeend', linkHTML);
    html = html + linkHTML;
    console.log(html);
  }

  titleList.innerHTML = html;
}

generateTitleLinks();
const links = document.querySelectorAll('.titles a');
console.log(links);
for (let link of links) {
  link.addEventListener('click', titleClickHandler);
}

function calculateTagsParams(tags) {
  const params = {
    max: '0',
    min: '999999'
  };
  for (let tag in tags) {
    console.log(tag + ' is used ' + tags[tag] + ' times ');
    if (tags[tag] > params.max) {
      params.max = tags[tag];
    }
    if (tags[tag] < params.min) {
      params.min = tags[tag];
    }
  }
  return params;
}

function calculateAuthorsParams(authors) {
  const params = {
    max: '0',
    min: '999999'
  };
  for (let author in authors) {
    console.log(author + ' is used ' + authors[author] + ' times ');
    if (authors[author] > params.max) {
      params.max = authors[author];
    }
    if (authors[author] < params.min) {
      params.min = authors[author];
    }
  }
  return params;
}

function calculateTagClass(count, params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);
  return optCloudClassPrefix + classNumber;
}

/* FUNCTION GENERATE TAGS - GENEROWANIE TAGOW*/
function generateTags() {
  
  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};
  
  /* find all articles - znalezienie wszystkich artykułów*/
  const articles = document.querySelectorAll(optArticleSelector);
  
  /* START LOOP: for every article - pętla, w której pojedynczym elementem jest zmienna article*/
  for (let article of articles) {
    
    /* find tags wrapper - znalezienie wrappera tagów dla każdego artykułu */
    const tagsWrapper = article.querySelector(optArticleTagsSelector);
    console.log(article);
    
    /* make html variable with empty string - zmienna, do której będziemy dodawać kolejne fragm html*/
    let html = '';
    
    /* get tags from data-tags attribute - odczytanie tagów z atrybutu*/
    const articleTags = article.getAttribute('data-tags');
    // console.log(articleTags);
    
    /* split tags into array - rozdział tekstu na tablicę*/
    const articleTagsArray = articleTags.split(' ');
    console.log(articleTagsArray);
    
    /* START LOOP: for each tag */
    for (let tag of articleTagsArray) {
      console.log(tag);
      
      /* generate HTML of the link */
      const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li> ';
      console.log(linkHTML);
      
      /* add generated code to html variable */
      html = html + linkHTML;
      console.log(html);
      
      /* [NEW] check if this link is NOT already in allTags */
      // eslint-disable-next-line no-prototype-builtins
      if (!allTags.hasOwnProperty(tag)) {
        
        /* [NEW] add tag to allTags object */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
      
      /* END LOOP: for each tag */
    }
    
    /* insert HTML of all the links into the tags wrapper */
    tagsWrapper.innerHTML = html;
    
    /* END LOOP: for every article: */
  }
  
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector('.tags');
  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams', tagsParams);

  /*[NEW] create variable for all links HTML code */
  let allTagsHTML = '';
  
  /*[NEW] Start loop: for each tag in allTags: */
  for (let tag in allTags) {
    const tagLinkHTML = '<li><a class="' + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-' + tag + '">' + tag + ' (' + allTags[tag] + ')</a></li>';
    console.log('taglinkHTML:', tagLinkHTML);

    /*[NEW] generate code of a link and add it to allTagsHTML */
    allTagsHTML += tagLinkHTML;
    
    /*[NEW] End loop */
  }
  
  /* [NEW] add html from allTagsHTML to tagList */
  // tagList.innerHTML = allTags.join(' ');
  tagList.innerHTML = allTagsHTML;
  console.log(allTags);
}

generateTags();


/* FUNCTION TAG CLICK HANDLER - DODANIE AKCJI PO KLIKNIECIU W TAG*/
function tagClickHandler(event) {
  
  /* prevent default action for this event */
  event.preventDefault();
  
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log('clickedElement:', clickedElement);
  
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = this.getAttribute('href');
  
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  
  /* find all tag links with class active */
  const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  
  /* START LOOP: for each active tag link */
  for (let activeTagLink of activeTagLinks) {
    
    /* remove class active */
    activeTagLink.classList.remove('active');
    
    /* END LOOP: for each active tag link */
  }
  
  /* find all tag links with "href" attribute equal to the "href" constant */
  const equalTagLinks = document.querySelectorAll('a[href="' + href + '"]');
  console.log(equalTagLinks);
  
  /* START LOOP: for each found tag link */
  for (let equalTagLink of equalTagLinks) {
   
    /* add class active */
    equalTagLink.classList.add('active');
    
    /* END LOOP: for each found tag link */
  }
  
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}


/* FUNCTION ADD CLICK LISTENERS TO TAGS - NASŁUCHIWANIE*/
function addClickListenersToTags() {
  
  /* find all links to tags */
  const tagLinks = document.querySelectorAll('.post-tags .list a, .list.tags a');
  console.log(tagLinks);
  
  /* START LOOP: for each link */
  for (let tagLink of tagLinks) {

    /* add tagClickHandler as event listener for that link */
    tagLink.addEventListener('click', tagClickHandler);
    
    /* END LOOP: for each link */
  }
}

addClickListenersToTags();


/* FUNCTION GENERATE AUTHORS - GENEROWANIE AUTORÓW*/
function generateAuthors() {
  
  /* [NEW] create a new variable allAuthors with an empty object */
  let allAuthors = {};
  
  /* find all authors */
  const authors = document.querySelectorAll(optArticleSelector);
  console.log(authors);

  /* START LOOP: for every author: */
  for (let author of authors) {
    
    /* find authors wrapper */
    const authorsWrapper = author.querySelector(optArticleAuthorSelector);
    console.log(author);
    
    /* make html variable with empty string */
    let html = '';
    
    /* get author from data-author attribute */
    const articleAuthor = author.getAttribute('data-author');
    console.log('articleAuthor:', articleAuthor);
    
    /* generate HTML of the link */
    const linkHTML = '<p><a href="#author-' + articleAuthor + '">' + articleAuthor + '</a></p> ';
    console.log(linkHTML);
    
    /* add generated code to html variable */
    html = html + linkHTML;
    console.log(html);
    
    /* [NEW] check if this link is NOT already in allAuthors */
    // eslint-disable-next-line no-prototype-builtins
    if (!allAuthors.hasOwnProperty(articleAuthor)) {
      
      /* [NEW] add author to allAuthors object */
      allAuthors[articleAuthor] = 1;
    } else {
      allAuthors[articleAuthor]++;
    }

    /* insert HTML of all the links into the authors wrapper */
    authorsWrapper.innerHTML = html;
  }

  /* [NEW] find list of authors in right column */
  const authorList = document.querySelector('.authors');
  const authorParams = calculateAuthorsParams(allAuthors);
  console.log('authorParams', authorParams);
    
  /*[NEW] create variable for all links HTML code */
  let allAuthorsHTML = '';
    
  /*[NEW] Start loop: for each author in allAuthors: */
  for (let articleAuthor in allAuthors) {
    const authorLinkHTML = '<li><a class="' + calculateTagClass(allAuthors[articleAuthor], authorParams) + '" href="#author-' + articleAuthor + '">' + articleAuthor + ' (' + allAuthors[articleAuthor] + ')</a></li>';
    console.log('taglinkHTML:', authorLinkHTML);
      
    /*[NEW] generate code of a link and add it to allTagsHTML */
    allAuthorsHTML += authorLinkHTML;
      
    /*[NEW] End loop */
  }
    
  /* [NEW] add html from allTagsHTML to tagList */
  // tagList.innerHTML = allTags.join(' ');
  authorList.innerHTML = allAuthorsHTML;
  console.log(allAuthors);
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
  generateTitleLinks('[data-author~="' + author + '"]');
}


/* FUNCTION ADD CLICK LISTENERS TO AUTHORS - DODANIE AKCJI PO KLIKNIECIU W AUTORA*/
function addClickListenersToAuthors() {
  
  /* find all links to authors */
  const authorLinks = document.querySelectorAll(optArticleAuthorSelector + '.post-author a');
  console.log(authorLinks);
  
  /* START LOOP: for each link */
  for (let authorLink of authorLinks) {
    
    /* add tagClickHandler as event listener for that link */
    authorLink.addEventListener('click', authorClickHandler);

    /* END LOOP: for each link */
  }
}

addClickListenersToAuthors();