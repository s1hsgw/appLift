$(document).ready(function() {
  createCB();
  $("#submit").click(
    function() {
      storeComment();
    });
});

function storeComment() {
  console.log("hello")
  var key;
  var time = gettime();
  for (var i = 0, len = localStorage.length; i < len; i++) {
    key = i + 1;
  }
  var text = $("#comment");
  var tag = $("#tag");
  console.log(text);
  localStorage.setItem(key, tag.val() + ":" + text.val() + time);
  // テキストボックスを空にする
  text.val("");
  tag.val("");
}

function createCB() {
  var cb = $("#CB");
  var html = [];
  var key;
  for (var i = 0, len = localStorage.length; i < len; i++) {
    key = localStorage.key(i);
    if (key.match(/[^0-9]+$/)) {
      value = localStorage.getItem(key);
      console.log(value + key);
      html.push($('<p><input type="checkbox" id="tag" name="tag" value="' + value + '">' + value + '</p>'));
    }
  }
  cb.append(html);
}

function gettime() {
  var hiduke = new Date();
  var month = hiduke.getMonth() + 1;
  var day = hiduke.getDate();
  return (month + "月" + day + "日");
}
