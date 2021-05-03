// document.getElementById('test-button').addEventListener('click', function(){
//     const links = document.querySelectorAll('.titles a');
//     console.log('links:', links);
//   })
const titleClickHandler = function(event){
  event.preventDefault();
  console.log(event.currentTarget.getAttribute(`href`));
  //Remove the class active from all article links
  const activeLinks = document.querySelectorAll(`.titles a.active`);
  for (let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }
  //Add class active to the clicked link
  event.currentTarget.classList.add('active');
  //Remove class active from all articles
  const activeArticles = document.querySelectorAll('.post.active');
  for (let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }
  //Get 'href' attribute from the clicked link
  const linkHref = event.currentTarget.getAttribute(`href`);
  //Find the correct article using the selector
  const selectedArticle = document.querySelector(linkHref);
  //Add class active to the clicked article
  selectedArticle.classList.add('active');
};

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.author-name';

function generateTitleLinks(attribute = ''){
  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
  /* for each article */
  const articles = document.querySelectorAll(optArticleSelector + attribute);
  for(let article of articles){
    /* get the article id */
    const articleId = article.getAttribute(`id`);
    console.log(articleId);
    /* find the title element */
    /* get the title from the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    console.log(articleTitle);
    /* create HTML of the link */
    const linkHtml = `<li><a href="#` + articleId + `"><span>`+ articleTitle + `</span></a></li>`;
    console.log(linkHtml);
    titleList.insertAdjacentHTML('beforeend', linkHtml);
    const links = document.querySelectorAll('.titles a');
    /* insert link into titleList */
    for(let link of links){
      link.addEventListener('click', titleClickHandler);
    }
  }
}
generateTitleLinks();

function generateTags(){
  /* find all articles */
  const allArticles = document.querySelectorAll('.post');
  /* START LOOP: for every article: */
  for(let article of allArticles) {
    /* find tags wrapper */
    const tagsWrapper = article.querySelector(optArticleTagsSelector);
    /* make html variable with empty string */
    let html = '';
    /* get tags from data-tags attribute */
    const tags = article.dataset.tags;
    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    /* START LOOP: for each tag */
    for(let tag of articleTagsArray) {
      /* generate HTML of the link */
      /* add generated code to html variable */
      html += '<li><a href="#tag-'+ tag + '">' + tag + '</a></li>';
    /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    tagsWrapper.innerHTML = html;
  /* END LOOP: for every article: */
  }
}
generateTags();

function tagClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this; 
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute(`href`);
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace("#tag-","");
  /* find all tag links with class active */
  const tagLinks = document.querySelectorAll(`a.active[href^='#tag-']`);
  /* START LOOP: for each active tag link */
  for(let activeTagLink of tagLinks) {

    /* remove class active */
    activeTagLink.classList.remove('active');
  /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const foundTagLinks = document.querySelectorAll("a[href='" + href + "']");
  /* START LOOP: for each found tag link */
  for(let foundTagLink of foundTagLinks) {
    /* add class active */
    foundTagLink.classList.add('active');
  /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags(){
  /* find all links to tags */
  const tagLinks = document.querySelectorAll("a[href^='#tag-']");
  /* START LOOP: for each link */
  for (let link of tagLinks) {
    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click',tagClickHandler);
  /* END LOOP: for each link */
  }
}

addClickListenersToTags();

// function generateAuthors(){
//   /* find all articles */
//   const allArticles = document.querySelectorAll('.post');
//   /* START LOOP: for every article: */
//   for(let article of allArticles) {
//     /* find tags wrapper */
//     const tagsWrapper = article.querySelector(optArticleAuthorSelector);
//     /* make html variable with empty string */
//     let html = '';
//     /* get tags from data-author attribute */
//     const author = article.dataset.author;
    
//     /* insert HTML of all the links into the tags wrapper */
//     tagsWrapper.innerHTML = html;
//   /* END LOOP: for every article: */
//   }
// }

// generateTags();






