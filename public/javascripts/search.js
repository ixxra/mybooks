function open(e){var n=new XMLHttpRequest;n.open("get",e,!0),n.send()}document.addEventListener("DOMContentLoaded",function(e){for(var n=document.getElementsByClassName("book-ref"),t=0;t<n.length;t++){var o=n[t];o.addEventListener("click",function(e){e.preventDefault(),open(e.currentTarget.href)},!1)}});