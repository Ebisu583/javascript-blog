// document.getElementById('test-button').addEventListener('click', function(){
//     const links = document.querySelectorAll('.titles a');
//     console.log('links:', links);
//   })
const titleClickHandler = function(event){
    console.log(event.target);
    //Remove the class active from all links
    //Add class active to the clicked link
    //Remove the class active from all articles
    // get 'href' attribute from the clicked link
    //Select the article corresponding to the link
    //Add class active to the clicked article
}

const links = document.querySelectorAll('.titles a');

for(let link of links){
    link.addEventListener('click', titleClickHandler);
}