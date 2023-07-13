// let params = {v:'5.131', callback:'callbackFunc'}
function VKRequestConstructor(method, params){

  let requestString = '';
  for (let param in params){
    if(params[param] === ''){continue}
    requestString += param +'='+ params[param] +'&';
  }
  requestString = requestString.slice(0,-1)

  AddScript('https://api.vk.com/method/'+method+'?'+requestString)
}

let Users = new class UserBuffer{
  constructor(){
    this.dataBuffer = {};
    this.rendered = {};
  }
  Save(userData){
    this.dataBuffer[userData.id] = userData
    return userData.id
  };
  Get(id){
    if(id){
      return this.dataBuffer[id]
    }else{
      return this.dataBuffer
    }
  };
  
  Render(id, x,y,z){
    this.rendered[id] = [x,y,z]
    if(this.dataBuffer[id].photo_100 != 'https://vk.com/images/photo_100'){    
      SpriteLoad(this.dataBuffer[id].photo_100, x,y,z)
    }
  }
  // initRender(target){
  //   let fri = this.Get(target).friends;
    
  //   for (let i = 0; i < fri.length; i++) {
  //     VKRequestConstructor('friends.get', {
  //       user_id: fri[i], callback:'Users.friend',
  //       access_token:'bfed9fa1bfed9fa1bfed9fa10dbcf99d8fbbfedbfed9fa1dbb076e664ea8f987ca6a7f7', v:'5.131',
  //       fields:`screen_name,first_name,last_name,deactivated,is_closed,status,city,country,sex,nickname,activities,about,books,bdate,career,connections,contacts,domain,education,exports,followers_count,friend_status,has_photo,has_mobile,home_town,photo_100,photo_400_orig,photo_max_orig,site,schools,verified,games,interests,last_seen,maiden_name,military,movies,music,occupation,online,personal,quotes,relation,relatives,timezone,tv,universities`
  //     })
  //   }
  //   // this.Render
  //   // let gruoups
  // }
  /** Generate n coordinates on figure in a different points*/
  FibSp(n){
    const goldenRatio = (1 + Math.sqrt(5) / 2)
    const theta = []
    const phi = []

    for (let i = 0; i < n; i++) {
      theta.push((2 * Math.PI * i) / goldenRatio)
      phi.push(Math.acos(1 - (2 * (i + 3)) / n))
      
    }
    const xyz = []
    
    for(let i=0; i<n; i++){
      xyz[i] = [
        Math.cos(theta[i]) * Math.sin(phi[i]),
        Math.sin(theta[i]) * Math.sin(phi[i]),
        Math.cos(phi[i])
      ]
    }
    return xyz
  }
}

VKRequestConstructor('users.get', {
  user_ids:target, callback:'generateFirstUser',
  access_token:'bfed9fa1bfed9fa1bfed9fa10dbcf99d8fbbfedbfed9fa1dbb076e664ea8f987ca6a7f7', v:'5.131',
  fields:`screen_name,first_name,last_name,deactivated,is_closed,status,city,country,sex,nickname,activities,about,books,bdate,career,connections,contacts,domain,education,exports,followers_count,friend_status,has_photo,has_mobile,home_town,photo_100,photo_400_orig,photo_max_orig,site,schools,verified,games,interests,last_seen,maiden_name,military,movies,music,occupation,online,personal,quotes,relation,relatives,timezone,tv,universities`
})

function responseFriends(result){
  let users = result.response;

  let fib = Users.FibSp(users.count);
  const r = users.count / 10;       ////// ??????


  for(let i=0; i< users.count; i++) {
    let id = users.items[i].id;
    let userdata = Users.Get(id);
    if (!userdata){
      userdata = users.items[i]
      Users.Get(target).friends.push(id)
      Users.Save(userdata);
    }
    Users.Render(id, fib[i][0]*r, fib[i][1]*r, fib[i][2]*r);
  }
  // Users.initRender(target)
}

function generateFirstUser(result){
  let userData = result.response[0];
  userData.friends = [];
  target = Users.Save(userData)
  
  VKRequestConstructor('friends.get', {
    user_id:target, callback:'responseFriends',
    access_token:'bfed9fa1bfed9fa1bfed9fa10dbcf99d8fbbfedbfed9fa1dbb076e664ea8f987ca6a7f7', v:'5.131',
    fields:`screen_name,first_name,last_name,deactivated,is_closed,status,city,country,sex,nickname,activities,about,books,bdate,career,connections,contacts,domain,education,exports,followers_count,friend_status,has_photo,has_mobile,home_town,photo_100,photo_400_orig,photo_max_orig,site,schools,verified,games,interests,last_seen,maiden_name,military,movies,music,occupation,online,personal,quotes,relation,relatives,timezone,tv,universities`
  })
  Users.Render(target)
}
