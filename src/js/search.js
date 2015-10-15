function open(ref){
  var req = new XMLHttpRequest();
  req.open('get', ref, true);
  req.send();
}

document.addEventListener("DOMContentLoaded", function(event) {
  var refs = document.getElementsByClassName('book-ref');

  for (var i=0; i<refs.length; i++){
      var ref = refs[i];
      ref.addEventListener('click', function inhibitFollow(event){
        event.preventDefault();
        open(event.currentTarget.href);
      }, false);
  }
});
