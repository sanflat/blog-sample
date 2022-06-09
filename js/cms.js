const { createClient } = microcms;
const client = createClient({
  serviceDomain: 'blogsample0609', // service-domain ‚Í XXXX.microcms.io ‚Ì XXXX •”•ª
  apiKey: '5a1d3442ca1a4233b7296eeeaa060c24e6bc',
})
client.get({ endpoint: 'blogs'}).then((res) => {
  document.querySelector('#title').textContent = res.contents[0].title
  document.querySelector('#image').src = res.contents[0].eyecatch.url
  document.querySelector('#content').innerHTML = res.contents[0].content
})
