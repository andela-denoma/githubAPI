var gituserAPI = {
  submitBtn:document.getElementById('submit'),
  githubAPI:"https://api.github.com/search/users",
  searchField:$('#search'),
  output: function(status){
    $('#output').html(status)
  },
  initialize: function() {
    gituserAPI.submitBtn.addEventListener("click", function(e){
    e.preventDefault();
    var users = gituserAPI.searchField.val();
      if(users === ""){
        gituserAPI.output("Please enter a name or username...");
      } else {
        githubUser = {
        q: users,
        sort: "repositories",
        order: "desc"
      },
     $.getJSON(gituserAPI.githubAPI, githubUser, gituserAPI.userInfo);
      };
    });
  }, 
  userInfo: function(data){
    var userHTML = '<ul>';
      $.each(data.items,function(i,user) {
        userHTML += '<li class="grid-25 tablet-grid-50">';
        userHTML += '<img src="' + user.avatar_url + '" class="image">';
        userHTML += '<p class="list"> USERNAME: ' + user.login + '</p>';
        userHTML += '<p class="list"> USERSCORE: ' + user.score + '</p>';
        userHTML+= '</li>';
      }); // end each
      userHTML += '</ul>';
      $('#users').html(userHTML);
      gituserAPI.searchField.val(""); 
      gituserAPI.searchField.prop("disabled", false);
  },
};

$(document).ready(function(){
  gituserAPI.initialize();
});
