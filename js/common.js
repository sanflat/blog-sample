document.addEventListener('DOMContentLoaded', () => {
  // START - MicroCMS API
  const getCmsData = (arg, value) => {
    const { createClient } = microcms;
    const client = createClient({
      serviceDomain: 'blogsample0609',
      apiKey: '5a1d3442ca1a4233b7296eeeaa060c24e6bc',
    })
    client.getList(
      {
        endpoint: 'blogs',
      }).then((res) => {
        if(arg == "index"){
          postListInsertHtml(res,value);
          includeHtml(res);
        }
        if(arg == "list"){
          postListInsertHtml(res,value);
          includeHtml(res);
        }
        if(arg == "post"){
          postListInsertHtml(res,value);
          includeHtml(res);
        }
    })
  }
  // END - MicroCMS API
  // START - Function
  const postListInsertHtml = (arg, value) => {
    for (var i = 0; i < arg.totalCount; i++) {
      if (value == undefined || value == arg.contents[i].category.name) {
        const insertPosts = document.getElementById("insertPosts");
        const div = document.createElement("div");
        createListHtml(div, arg.contents[i]);
        insertPosts.insertAdjacentHTML('afterbegin', div.outerHTML);
      }
      if (value == arg.contents[i].id){
        document.querySelector('#title').textContent = arg.contents[i].title;
        document.querySelector('#image').src = arg.contents[i].eyecatch.url;
        document.querySelector('#content').innerHTML = arg.contents[i].content;
      }
    }
  }
  const createListHtml = (div, content) =>{
    const anchor  = document.createElement("a");
    const img  = document.createElement("img");
    anchor.href = "/posts/post.html?&id=" + content.id;
    img.src = content.eyecatch.url;
    div.appendChild(anchor);
    anchor.appendChild(img);
  }
  const getHeaderPath = () => {
    let path = getPath();
    return path + "include/header.html";
  }
  const getPath = () => {
    let pathDirectory = "";
    const countDirectory = location.pathname.match('/').length;
    for (var i = 0; i < countDirectory; i++) {
      pathDirectory = "../";
    }
    return pathDirectory;
  }
  const createHeaderHtml = (date,arg) => {
    document.getElementById("header").innerHTML = date;
    const insertHeaderMenu = document.getElementById("headerMenu");
    let array = [];
    for (let i = 0; i < arg.totalCount; i++) {
      array.push(arg.contents[i].category.name);
    }
    const array2 = Array.from(new Set(array))
    for (var i = 0; i < array2.length; i++) {
      const anchor  = document.createElement("a");
      anchor.href = "/?list=" + array2[i];
      anchor.textContent = array2[i];
      insertHeaderMenu.insertAdjacentHTML('afterbegin', anchor.outerHTML);
    }
  }
  const getFooterPath = () => {
    let path = getPath();
    return path + "include/footer.html";
  }
  const createFooterHtml = (date) => {
    document.getElementById("footer").innerHTML = date;
  }
  const includeHtml = (arg) =>{
    let resultList = [];
    const headerPath = getHeaderPath();
    const footerPath = getFooterPath();
    fetch(headerPath)
      .then(response =>{
        return response.text();
      })
      .then(date => {
        createHeaderHtml(date, arg);
        return fetch(footerPath).then((response) => response.text()
          .then(date => {
            createFooterHtml(date);
          })
      )})
  }
  // END - Function

  // START - OTHER
  let params = [];
  let param = location.search.substring(1);
  if(param !== '') {
    param = param.split('&');
  }
  for(let i = 0; i < param.length; i++) {
    params[i] = param[i].split('=');
  }
  let pageTp = "index";
  let value = "";
  const pageAllList = "index";
  const pageCategoryList = "list";
  const pageView = "post";
  for(var i = 0; i < params.length; i++) {
    if(params[i][0] == "list") {
      value = decodeURI(params[i][1]);
      pageTp = "list";
      break;
    }
    if(params[i][0] == "id") {
      value = decodeURI(params[i][1]);
      pageTp = "post";
      break;
    }
  }
  if(pageTp == pageAllList){
    getCmsData(pageTp);
  }else if(pageTp == pageCategoryList){
    getCmsData(pageTp, value);
  }else if(pageTp == pageView){
    getCmsData(pageTp, value);
  }
  // END - OTHER

});
