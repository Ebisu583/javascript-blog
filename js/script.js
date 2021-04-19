// document.getElementById('test-button').addEventListener('click', function(){
//     const links = document.querySelectorAll('.titles a');
//     console.log('links:', links);
//   })
const titleClickHandler = function(event){
  event.preventDefault();
  console.log(event.currentTarget.getAttribute(`href`));
  //Remove the class active from all links
  const activeLinks = document.querySelectorAll(`.titles a.active`);
  for (let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }
  //Add class active to the clicked link
  event.currentTarget.classList.add('active');
  //Remove the class active from all articles
  const activeArticles = document.querySelectorAll('.post.active');
  for (let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }
  // get 'href' attribute from the clicked link
  const linkHref = event.currentTarget.getAttribute(`href`);
  //Select the article corresponding to the link
  const selectedArticle = document.querySelector(linkHref);
  //Add class active to the clicked article
  selectedArticle.classList.add('active');
};

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';

function generateTitleLinks(){
  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
  
  /* for each article */
  const articles = document.querySelectorAll(optArticleSelector);
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







