var pathname = location.pathname;
var headerpath = 'include/header.html';
var footerpath = 'include/footer.html';
var countdirectory = pathname.match('/').length;

if (countdirectory == 3) {
  headerpath = '../../include/header.html';
  footerpath = '../../include/footer.html';
}else if (countdirectory < 3){
  headerpath = '../../../include/header.html';
  footerpath = '../../../include/footer.html';
}

fetch(headerpath)
  .then(response => {
    return response.text()
  })
  .then(data => {
    document.getElementById("header").innerHTML = data;
  });

fetch(footerpath)
  .then(response => {
    return response.text()
  })
  .then(data => {
    document.getElementById("footer").innerHTML = data;
  });
