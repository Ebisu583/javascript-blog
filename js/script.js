// document.getElementById('test-button').addEventListener('click', function(){
//     const links = document.querySelectorAll('.titles a');
//     console.log('links:', links);
//   })
const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
  authorListLink: Handlebars.compile(document.querySelector('#template-author-list-link').innerHTML)
};
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
  optArticleAuthorSelector = '.author-name',
  optCloudClassCount = 5,
  optCloudClassPrefix = 'tag-size-';


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
    // const linkHtml = `<li><a href="#` + articleId + `"><span>`+ articleTitle + `</span></a></li>`;
    // console.log(linkHtml);
    const linkHTMLData = {id: articleId, title: articleTitle};
    const linkHTML = templates.articleLink(linkHTMLData);
    titleList.insertAdjacentHTML('beforeend', linkHTML);
    const links = document.querySelectorAll('.titles a');
    /* insert link into titleList */
    for(let link of links){
      link.addEventListener('click', titleClickHandler);
    }
  }
}
generateTitleLinks();

function calculateTagsParams(tags) {
  const allTagsValues = Object.values(tags);
  let max = 0;
  for(let value of allTagsValues) {
    max = Math.max(max, value); 
  }
  let min = max;
  for(let value of allTagsValues) {
    min = Math.min(min, value);
  }
  return {
    min: min,
    max: max
  };
}
function calculateTagClass(count, params) {
  const level = Math.floor((count-params.min)/(params.max - params.min)*4 + 1);
  return 'tag-size-' + level;
}
function generateTags(){
  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {}; 
  /* find all articles */
  const allArticles = document.querySelectorAll('.post');
  /* START LOOP: for every article: */
  for(let article of allArticles) {
    /* find tags wrapper */
    const tagsWrapper = article.querySelector(optArticleTagsSelector);
    /* make html variable with empty string */
    let html = '';
    /* get tags from data-tags attribute */
    const articleTags = article.dataset.tags;
    let articleTagsArray = [];
    if (articleTags) {
      /* split tags into array */
      articleTagsArray = articleTags.split(' ');
    }
    /* START LOOP: for each tag */
    for(let tag of articleTagsArray) {
      /* generate HTML of the link */
      // const linkHTML = '<li><a href="#tag-'+ tag + '">' + tag + '</a></li>';
      const linkHTMLData = {tag: tag};
      const linkHTML = templates.tagLink(linkHTMLData);
      /* add generated code to html variable */
      html += linkHTML;
      /* [NEW] check if this link is NOT already in allTags */
      if(!allTags[tag]) {
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

  /* [NEW] add html from allTags to tagList */
  // tagList.innerHTML = allTags.join(' ');
  // console.log(allTags);
  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams:', tagsParams)
  /* [NEW] create variable for all links HTML code */
  // let allTagsHTML = '';
  const allTagsData = {tags: []};

  /* [NEW] START LOOP: for each tag in allTags: */
  for(let tag in allTags){
    /* [NEW] generate code of a link and add it to allTagsHTML */
    // allTagsHTML +=  '<li><a class="' + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-'+ tag + '">' + tag + '(' + allTags[tag] + ')</a></li>';
    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParams)
    });
  }
  /* [NEW] END LOOP: for each tag in allTags: */

  /*[NEW] add HTML from allTagsHTML to tagList */
  // tagList.innerHTML = allTagsHTML;
  tagList.innerHTML = templates.tagCloudLink(allTagsData);
  console.log(allTagsData);
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

function generateAuthors(){
  const allAuthors = [];
  /* find all articles */
  const allArticles = document.querySelectorAll('.post');
  /* START LOOP: for every article: */
  for(let article of allArticles) {
    /* find tags wrapper */
    const authorsWrapper = article.querySelector(optArticleAuthorSelector);
    /* make html variable with empty string */
    let html = '';
    /* get tags from data-author attribute */
    const author = article.dataset.author;
    allAuthors.push(author);
    
    /* insert HTML of authors name into the authors wrapper */
    // html = "<span>" + author + "</span>"
    const linkHTMLData = {name: author};
    html = templates.authorLink(linkHTMLData);
    if (authorsWrapper) {
      authorsWrapper.innerHTML = html;
    }
  /* END LOOP: for every article: */
  }

  // Generate the author list
  const authorList = document.querySelector('.list.authors');
  const allAuthorsData = {authors: []};
  console.log(allAuthors)
  for(let author of allAuthors){
    allAuthorsData.authors.push({
      author: author,
    });
  }
  authorList.innerHTML = templates.authorListLink(allAuthorsData);
  console.log(allAuthorsData)
}
generateAuthors();

function authorsClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this; 
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  // const href = clickedElement.getAttribute(`href`);
  // /* make a new constant "tag" and extract tag from the "href" constant */
  // const tag = href.replace("#tag-","");
  // /* find all tag links with class active */
  // const tagLinks = document.querySelectorAll(`a.active[href^='#tag-']`);
  // /* START LOOP: for each active tag link */
  // for(let activeTagLink of tagLinks) {

  //   /* remove class active */
  //   activeTagLink.classList.remove('active');
  // /* END LOOP: for each active tag link */
  // }
  // /* find all tag links with "href" attribute equal to the "href" constant */
  // const foundTagLinks = document.querySelectorAll("a[href='" + href + "']");
  // /* START LOOP: for each found tag link */
  // for(let foundTagLink of foundTagLinks) {
  //   /* add class active */
  //   foundTagLink.classList.add('active');
  // /* END LOOP: for each found tag link */
  // }
  /* execute function "generateTitleLinks" with article selector as argument */
  const author = clickedElement.innerText;
  generateTitleLinks('[data-author="' + author + '"]');
}

function addClickListenersToAuthors(){
  /* find all links to authors */
  const authorsLinks = document.querySelectorAll("a[href^='#author']");
  /* START LOOP: for each link */
  for (let link of authorsLinks) {
    /* add tauthorClickHandler as event listener for that link */
    link.addEventListener('click',authorsClickHandler);
  /* END LOOP: for each link */
  }
}
addClickListenersToAuthors();





