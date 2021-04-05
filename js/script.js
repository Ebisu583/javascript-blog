// document.getElementById('test-button').addEventListener('click', function(){
//     const links = document.querySelectorAll('.titles a');
//     console.log('links:', links);
//   })
const titleClickHandler = function(event){
    event.preventDefault();
    console.log(event.currentTarget.getAttribute(`href`));
    //Remove the class active from all links
    const activeLinks = document.querySelectorAll(`.titles a.active`)
    for (let activeLink of activeLinks){
        activeLink.classList.remove("active")
    }
    //Add class active to the clicked link
    event.currentTarget.classList.add("active");
    //Remove the class active from all articles
    const activeArticles = document.querySelectorAll(".post.active")
    for (let activeArticle of activeArticles){
        activeArticle.classList.remove("active");
    }
    // get 'href' attribute from the clicked link
    const linkHref = event.currentTarget.getAttribute(`href`)
    //Select the article corresponding to the link
    const selectedArticle = document.querySelector(linkHref)
    //Add class active to the clicked article
    selectedArticle.classList.add("active");
}

const links = document.querySelectorAll('.titles a');

for(let link of links){
    link.addEventListener('click', titleClickHandler);
}