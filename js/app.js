// default bookmark list
var bookmarks = [
    {
        title: 'Google',
        url: 'https://google.com/'
    },
    {
        title: 'Facebook',
        url: 'https://facebook.com/'
    },
    {
        title: 'Yahoo',
        url: 'https://yahoo.com/'
    },
    {
        title: 'Linked In',
        url: 'https://linkedin.com/'
    },
    {
        title: 'Github',
        url: 'https://github.com/'
    },
    {
        title: 'Twitter',
        url: 'https://twitter.com/'
    },

]
// to clear input field
function clear() {
    document.getElementById('title').value = '';
    document.getElementById('url').value = '';
}
// to save new bookmark
function BookmarkSave() {
    var title = document.getElementById('title').value;
    var url = document.getElementById('url').value;
    if(title != '' && url != '') {
        var obj = {
            title: title,
            url: url,
        }
        bookmarks.push(obj);
        InitialBookmark();
        clear();
    } 
}
// to show all bookmark list
InitialBookmark() 
function InitialBookmark() {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    var output = JSON.parse(localStorage.getItem('bookmarks'));
    var colorArray = ['success', 'info', 'warning', 'danger'];
    var colorIndex = Math.floor(Math.random()*colorArray.length);
    var innerValue = '';
    for (let i = 0; i < bookmarks.length; i++) {
        console.log(bookmarks[i].title);
        innerValue += '<div class="col-md-6"><div class="alert alert-' + colorArray[colorIndex] + '"><strong><a href="' + bookmarks[i].url + '" target="_blank">' + bookmarks[i].title + '</a></strong><button type="button" class="close" onclick="DeleteBookmark('+"'"+ bookmarks[i].url+ "'"+')">&times;</button></div></div>'
    }
    document.getElementById('savedBookmark').innerHTML = innerValue;
    
}
//to delete bookmark
function DeleteBookmark(url) {
    for (let i = 0; i < bookmarks.length; i++) {
        if (url === bookmarks[i].url) {
            bookmarks.splice(i, 1);
        }
        
    }
    InitialBookmark() 
}
