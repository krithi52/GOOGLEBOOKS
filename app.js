$(document).ready(function()
{
  var item,title,author,publisher,bookLink,bookImg;
  var outputList=document.getElementById("list-output");
  var bookuUrl="https://www.googleapis.com/books/v1/volumes?q="
  var placeHldr='<img src="https://via.placeholder.com/15">'
  var searchData;
  $("#search").click(function()
  {
    outputList.innerHTML=""
    searchData=$("#search-box").val();
    if(searchData=== "" || searchData===null)
    {
      displayError();
    }
    else
    {
      $.ajax(
      {
        url:bookuUrl+searchData,
        dataType: "json",
        success:function(res) {
        console.log(res)
        if(res.totalItem ===0)
        {
          alert("!!!!  TRY AGAIN....NO REULTS");
        }
        else
        {
          $("#title").animate({'margin-top': '10px'},1000);
          $(".book-list").css('visibility:visible');
          displayResults(res);
        }
      },
      error: function ()
      {
      alert("OOPS!! SOMETHING WENT WRONG.. ");
      }
      });
    }
    $("#search-box").val("");
  });
  function displayResults(res)
  {
  for(var i=0;i<res.items.length;i++){
  item1=res.items[i];
  title1=item1.volumeInfo.title;
  author1=item1.volumeInfo.author;
  publisher1=item1.volumeInfo.publisher;
  bookLink1=item1.volumeInfo.previewLink;
  bookIsbn=item1.volumeInfo.industryIdentifiers[1].identifier;
  bookImg1=(item1.volumeInfo.imageLinks) ? item1.volumeInfo.imageLinks.thumbnail:placeHldr;

  // item2=res.items[i+1];
  // title2=item2.volumeInfo.title;
  // author2=item2.volumeInfo.author;
  // publisher2=item2.volumeInfo.publisher;
  // bookLink2=item2.volumeInfo.previewLink;
  // bookIsbn2=item2.volumeInfo.industryIdentifiers[1].identifier;
  // bookImg2=(item2.volumeInfo.imageLinks) ? item2.volumeInfo.imageLinks.thumbnail:placeHldr;

  outputList.innerHTML+='<div class="row mt-4">' +
  formatOutput(bookImg1,title1,author1,publisher1,bookLink1,) +
  // formatOutput(bookImg2,title2,author2,publisher2,bookLink2,)
  '</div>';
  console.log(outputList);
  }
  }
  function formatOutput(bookImg, title, author, publisher, bookLink,bookIsbn)
  {
  var viewerUrl='index.html?isbn='+bookIsbn;
  var htmlCard = `<div class="col-1g-6">
     <div class="row no-gutters">
      <div class="col-md-4">
        <img src="${bookImg}" class="card-img" alt="..."/>
       </div>
       <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">${title}</h5>
          <p class="card-text">Author: ${author}</p>
        <p class="card-text">Publisher: ${publisher}</p>
          <a target="_blank" href="${viewerUrl}" class="btn btn-secondary">Read book</a>
         </div>
        </div>
       </div>
     </div>
    </div>`
  return htmlCard;
  }
  function displayError()
  {
  alert("search can be empty");
  }
});