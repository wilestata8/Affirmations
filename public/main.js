const trash = document.getElementsByClassName("fa-trash");
const thumbUp = document.getElementsByClassName("fa-thumbs-up");
const thumbDown = document.getElementsByClassName("fa-thumbs-down");

Array.from(thumbUp).forEach(function(element) {
  element.addEventListener('click', function(){
    const name = this.parentNode.parentNode.childNodes[1].innerText
    const msg = this.parentNode.parentNode.childNodes[3].innerText
    const mood = this.parentNode.parentNode.childNodes[5].innerText
    const likes = parseFloat(this.parentNode.parentNode.childNodes[7].innerText)


  fetch('thumbsUp', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'name': name,
        'msg': msg,
        'mood': mood,
        'likes': likes,
        'action': "like"
      })
    })
    .then(response => {
      if (response.ok) return response.json()
    })
    .then(data => {
      console.log(data)
      window.location.reload(true)
    }) 
  });
});
Array.from(thumbDown).forEach(function(element) {
  element.addEventListener('click', function(){
    const name = this.parentNode.parentNode.childNodes[1].innerText
    const msg = this.parentNode.parentNode.childNodes[3].innerText
    const mood = this.parentNode.parentNode.childNodes[5].innerText
    const likes = parseFloat(this.parentNode.parentNode.childNodes[7].innerText)
    fetch('thumbsDown', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'name': name,
        'msg': msg,
        'mood': mood,
        "likes": likes,
        'action': 'dislike'
      })
    })
    .then(response => {
      if (response.ok) return response.json()
    })
    .then(data => {
      console.log(data)
      window.location.reload(true)
    })
  });
});

Array.from(trash).forEach(function(element) {
  element.addEventListener('click', function(){
    const name = this.parentNode.parentNode.childNodes[1].innerText
    const msg = this.parentNode.parentNode.childNodes[3].innerText
    const mood = this.parentNode.parentNode.childNodes[5].innerText

    fetch('/affirmations', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'name': name,
        'msg': msg,
        'mood': mood,
      })
    }).then(function (response) {
      window.location.reload()
    })
  });
});