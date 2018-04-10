// form submit event
document.getElementById('myForm').addEventListener('submit', BookmarkSave);

// to show all bookmark list
InitialBookmark(); 

//to clear input field
function clear() {
    document.getElementById('title').value = '';
    document.getElementById('url').value = '';
}
// to save new bookmark
function BookmarkSave(e) {
    var title = document.getElementById('title').value;
    var url = document.getElementById('url').value;

    // empty field submit control condition
    if(title != '' && url != '') {
        var obj = {
            title: title,
            url: url,
        };
        
        if(localStorage.getItem('bookmarks') === null) {
            // default bookmark list
            var bookmarks = [];
            bookmarks.push(obj);

            localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
        } else {
            var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

            bookmarks.push(obj);
            localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

        }
    }   
    // show bookmark data
    InitialBookmark();

    // clear input field after add bookmark
    clear();

    // remove event bubble
    e.preventDefault();
}

// to show all bookmark data
function InitialBookmark() {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    var colorArray = ['success', 'info', 'warning', 'danger'];
    var colorIndex;
    var innerValue = '';
    for (var i = 0; i < bookmarks.length; i++) {
        colorIndex = Math.floor(Math.random()*colorArray.length);
        innerValue += '<div class="col-md-6"><div class="alert alert-' + colorArray[colorIndex] + '"><strong><a href="' + bookmarks[i].url + '" target="_blank">' + bookmarks[i].title + '</a></strong><button type="button" class="close" onclick="DeleteBookmark('+"'"+ bookmarks[i].url+ "'"+')">&times;</button></div></div>';
    }
    // assign bookmark data to DOM
    document.getElementById('savedBookmark').innerHTML = innerValue;

    // empty data message condition
    if(bookmarks != '') {
        document.getElementById('empty_data').innerHTML = '';
    } else {
        document.getElementById('empty_data').innerHTML = "{ you haven't added bookmark }";
    }
    
}
// to delete bookmark
function DeleteBookmark(url) {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    for (var i = 0; i < bookmarks.length; i++) {
        if (url === bookmarks[i].url) {
            bookmarks.splice(i, 1);
        }
        
    }
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    // show bookmark data
    InitialBookmark();
}
