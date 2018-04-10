document.getElementById('myForm').addEventListener('submit', BookmarkSave);

//to clear input field
function clear() {
    document.getElementById('title').value = '';
    document.getElementById('url').value = '';
}
//to save new bookmark
function BookmarkSave(e) {
    var title = document.getElementById('title').value;
    var url = document.getElementById('url').value;
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
        InitialBookmark();
        clear();
    e.preventDefault();
}
//to show all bookmark list
InitialBookmark(); 
function InitialBookmark() {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    var colorArray = ['success', 'info', 'warning', 'danger'];
    var innerValue = '';
    for (var i = 0; i < bookmarks.length; i++) {
        var colorIndex = Math.floor(Math.random()*colorArray.length);
        innerValue += '<div class="col-md-6"><div class="alert alert-' + colorArray[colorIndex] + '"><strong><a href="' + bookmarks[i].url + '" target="_blank">' + bookmarks[i].title + '</a></strong><button type="button" class="close" onclick="DeleteBookmark('+"'"+ bookmarks[i].url+ "'"+')">&times;</button></div></div>';
    }
    document.getElementById('savedBookmark').innerHTML = innerValue;
    if(bookmarks != '') {
        document.getElementById('empty_data').innerHTML = '';
    } else {
        document.getElementById('empty_data').innerHTML = "{ you haven't added bookmark }";
    }
    
}
//to delete bookmark
function DeleteBookmark(url) {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    for (var i = 0; i < bookmarks.length; i++) {
        if (url === bookmarks[i].url) {
            bookmarks.splice(i, 1);
        }
        
    }
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    InitialBookmark();
}
