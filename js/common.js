// START - all let
const pathName = location.pathname;
// END - all let

// START - header.html and footer.html include
let headerPath = 'include/header.html';
let footerPath = 'include/footer.html';
let countDirectory = pathName.match('/').length;

if (countDirectory == 3) {
  headerPath = '../../include/header.html';
  footerPath = '../../include/footer.html';
}else if (countDirectory < 3){
  headerPath = '../../../include/header.html';
  footerPath = '../../../include/footer.html';
}

fetch(headerPath)
  .then(response => {
    return response.text()
  })
  .then(data => {
    document.getElementById("header").innerHTML = data;
  });

fetch(footerPath)
  .then(response => {
    return response.text()
  })
  .then(data => {
    document.getElementById("footer").innerHTML = data;
  });
// END - header.html and footer.html include

// START - MicroCMS API
const { createClient } = microcms;
const client = createClient({
  serviceDomain: 'blogsample0609',
  apiKey: '5a1d3442ca1a4233b7296eeeaa060c24e6bc',
})
client.get({ endpoint: 'blogs'}).then((res) => {
  document.querySelector('#title').textContent = res.contents[0].title
  document.querySelector('#image').src = res.contents[0].eyecatch.url
  document.querySelector('#content').innerHTML = res.contents[0].content
})
// END - MicroCMS API
